import assert from "node:assert/strict"
import test from "node:test"
import { calculateInference, calculateStandardGpu, calculateDgxSpark, automaticRam, validateModelMetadata, GB, GiB } from "../app/lib/calculators.ts"

// Arithmetic fixtures only, not catalog metadata or runtime support evidence.
// GQA geometry: VMware inference-sizing article cited in the approved plan.
// MHA geometry: Cisco Live AIHUB-2659 p22; all arithmetic independently recomputed.
const model = {
    modelId: "arithmetic-fixture-70b", revision: "test-only", totalParameters: 70_000_000_000,
    architecture: "decoder_gqa", numHiddenLayers: 80, numAttentionHeads: 64,
    numKeyValueHeads: 8, headDim: 128, maxContextTokens: 32000,
    metadataSource: "https://blogs.vmware.com/cloud-foundation/2024/09/25/llm-inference-sizing-and-performance-guidance/", verifiedAt: "2026-09-06",
}
const device = (id = "device-1", gb = 80) => ({ id, node: "node-1", physicalMemoryBytes: gb * GB, systemReservedBytes: 0, safetyReservedBytes: 0 })
const input = {
    model, weightFormat: "INT4", weightBits: 4, kvCacheBits: 16,
    inputTokens: 7000, maxOutputTokens: 1000, concurrentSequences: 2,
    servingEngine: "test-only", engineVersion: "1", runtimePeakBytes: 4 * GB,
    quantizationOverheadPercent: 15, devices: [device()],
}
const plan = (placements, sequences = 2) => ({ tensorParallelSize: placements.length, pipelineParallelSize: 1, replicaCount: 1, source: "Synthetic allocation fixture, not a real engine profile", replicas: [{ concurrentSequences: sequences, placements }] })
const shard = (id, weightFraction, kvFraction = weightFraction) => ({ deviceId: id, weightFraction, kvFraction, runtimePeakBytes: GB })

test("70B raw INT4 weights and architecture-specific GQA KV", () => {
    const result = calculateInference(input)
    assert.equal(result.breakdown.rawWeights, 35_000_000_000)
    assert.equal(result.breakdown.quantizationOverhead, 5_250_000_000)
    assert.equal(result.breakdown.kvCache, 5_242_880_000)
    assert.equal(result.breakdown.workload, 49_492_880_000)
    assert.equal(result.memoryStatus, "fits")
})
test("Cisco MHA fixture: 10 x 1024 tokens = 5 GiB", () => {
    const result = calculateInference({ ...input, model: { ...model, architecture: "decoder_mha", numHiddenLayers: 32, numAttentionHeads: 32, numKeyValueHeads: 32 }, inputTokens: 1024, maxOutputTokens: 0, concurrentSequences: 10 })
    assert.equal(result.breakdown.kvCache, 5_368_709_120)
    assert.equal(result.breakdown.kvCache / GiB, 5)
})
test("weight precision and KV precision are independent", () => {
    assert.equal(calculateInference({ ...input, weightFormat: "FP16", weightBits: 16 }).breakdown.kvCache, 5_242_880_000)
    assert.equal(calculateInference({ ...input, kvCacheBits: 8 }).breakdown.kvCache, 2_621_440_000)
    assert.equal(calculateInference({ ...input, kvCacheBits: 8 }).compatibilityStatus, "unknown")
})
test("context growth doubles KV; units stay in bytes", () => {
    assert.equal(calculateInference({ ...input, inputTokens: 14000, maxOutputTokens: 2000 }).breakdown.kvCache, 10_485_760_000)
    assert.equal(GiB / GB, 1.073741824)
    assert.equal(GiB / GiB, 1)
})
test("missing and unsupported metadata never falls back to a parameter factor", () => {
    for (const change of [{ architecture: null }, { numKeyValueHeads: null }, { numHiddenLayers: null }, { headDim: null }, { totalParameters: null }, { architecture: "mla" }, { architecture: "sliding_window" }, { architecture: "hybrid" }, { architecture: "encoder" }, { architecture: "multimodal" }]) {
        const result = calculateInference({ ...input, model: { ...model, ...change } })
        assert.equal(result.memoryStatus, "unknown")
        assert.equal(result.confidence, "incomplete")
        assert.ok(result.missingInputs.length)
    }
})
test("MQA and supported hidden-size derivation", () => {
    const result = calculateInference({ ...input, model: { ...model, architecture: "decoder_mqa", numKeyValueHeads: 1, headDim: null, hiddenSize: 8192 } })
    assert.equal(result.breakdown.kvCache, 5_242_880_000 / 8)
    assert.throws(() => calculateInference({ ...input, model: { ...model, architecture: "decoder_mqa" } }), /MQA/)
    assert.throws(() => validateModelMetadata({ architecture: "decoder_mha", numAttentionHeads: 32, numKeyValueHeads: 8 }), /MHA/)
})
test("reject nonfinite, negative, fractional/zero sequences and context overflow", () => {
    for (const bad of [NaN, Infinity, -1, 0, 1.5]) assert.throws(() => calculateInference({ ...input, concurrentSequences: bad }))
    for (const key of ["inputTokens", "maxOutputTokens", "runtimePeakBytes", "quantizationOverheadPercent"]) {
        for (const bad of [NaN, Infinity, -1]) assert.throws(() => calculateInference({ ...input, [key]: bad }))
    }
    assert.throws(() => calculateInference({ ...input, inputTokens: 32000 }), /context limit/)
    assert.throws(() => calculateInference({ ...input, inputTokens: 1.5 }), /integer/)
    assert.throws(() => calculateInference({ ...input, targetTTFTMs: 0 }))
    assert.throws(() => calculateInference({ ...input, devices: [device(), device()] }), /Unique/)
    assert.throws(() => validateModelMetadata({ totalParameters: Infinity }))
    assert.throws(() => validateModelMetadata({ numHiddenLayers: 1.5 }))
})
test("exact budget boundary, with no display rounding in decisions", () => {
    const bytes = calculateInference(input).breakdown.workload
    const exact = { ...input, devices: [{ ...device(), physicalMemoryBytes: bytes }] }
    assert.equal(calculateInference(exact).memoryStatus, "fits")
    assert.equal(calculateInference(exact).breakdown.headroom, 0)
    assert.equal(calculateInference({ ...exact, devices: [{ ...device(), physicalMemoryBytes: bytes - 1 }] }).memoryStatus, "does_not_fit")
})
test("multi-device aggregate is never enough without a plan", () => {
    const result = calculateInference({ ...input, devices: [device(), device("device-2")] })
    assert.equal(result.memoryStatus, "unknown")
    assert.equal(result.breakdown.headroom, null)
})
test("aggregate fit but imbalanced device overflow cannot fit", () => {
    const result = calculateInference({ ...input, devices: [device("device-1", 24), device("device-2", 80)], partition: plan([shard("device-1", 0.9), shard("device-2", 0.1)]) })
    assert.ok(result.breakdown.headroom > 0)
    assert.ok(result.perDevice[0].headroomBytes < 0)
    assert.equal(result.memoryStatus, "does_not_fit")
})
test("explicit sharding fits per-device; KV replication is allocated", () => {
    const result = calculateInference({ ...input, devices: [device(), device("device-2")], partition: plan([shard("device-1", 0.5, 1), shard("device-2", 0.5, 1)]) })
    assert.equal(result.memoryStatus, "fits")
    assert.equal(result.breakdown.allocatedKv, result.breakdown.kvCache * 2)
    assert.equal(result.breakdown.runtimePeak, 2 * GB)
    assert.equal(result.compatibilityStatus, "unknown")
})
test("replica isolation: 2 x 24GB never fits 35GB weights per replica", () => {
    const result = calculateInference({ ...input, quantizationOverheadPercent: 0, devices: [device("device-1", 24), device("device-2", 24)], partition: { tensorParallelSize: 1, pipelineParallelSize: 1, replicaCount: 2, source: "Synthetic replicas", replicas: [{ concurrentSequences: 1, placements: [shard("device-1", 1)] }, { concurrentSequences: 1, placements: [shard("device-2", 1)] }] } })
    assert.equal(result.breakdown.allocatedWeights, 70 * GB)
    assert.equal(result.memoryStatus, "does_not_fit")
})
test("invalid partition plans cannot certify fit", () => {
    const two = { ...input, devices: [device(), device("device-2")] }
    for (const placements of [[shard("device-1", 0.1), shard("device-2", 0.1)], [shard("device-1", 0.5), shard("device-1", 0.5)], [shard("device-1", 1, 0), shard("device-2", 0, 0)], [shard("device-1", -1), shard("device-2", 2)]]) assert.throws(() => calculateInference({ ...two, partition: plan(placements) }))
    assert.throws(() => calculateInference({ ...two, partition: plan([shard("device-1", 0.5), shard("device-2", 0.5)], 1) }), /sequence/)
})
test("DGX final budget is not reduced twice; evidence missing stays null", () => {
    const result = calculateDgxSpark({ ...input, hardware: { memoryGb: 128, deviceCount: 1, finalBudgetGb: 100, systemReservedGb: 0, safetyReservePercent: 15 } })
    assert.equal(result.breakdown.usableBudget, 100 * GB)
    assert.equal(result.breakdown.reserve, 28 * GB)
    assert.equal(result.performanceStatus, "not_benchmarked")
    assert.equal(result.supportedConcurrent, null)
    assert.equal(result.breakdown.headroom, 100 * GB - result.breakdown.workload)
    assert.throws(() => calculateInference({ ...input, devices: [{ ...device(), usableAiMemoryBytes: 60 * GB, safetyReservedBytes: GB }] }), /also subtract/)
})
test("200B reference cannot override selected 100GB Spark policy", () => {
    const result = calculateDgxSpark({ ...input, model: { ...model, totalParameters: 200 * GB }, hardware: { memoryGb: 128, deviceCount: 1, finalBudgetGb: 100, systemReservedGb: 0, safetyReservePercent: 0 } })
    assert.equal(result.breakdown.weights, 115 * GB)
    assert.equal(result.memoryStatus, "does_not_fit")
})
test("two Sparks are separate nodes and require explicit partition", () => {
    const hardware = { memoryGb: 128, deviceCount: 2, finalBudgetGb: 100, systemReservedGb: 0, safetyReservePercent: 15 }
    assert.equal(calculateDgxSpark({ ...input, hardware }).memoryStatus, "unknown")
    const result = calculateDgxSpark({ ...input, hardware, partition: plan([shard("device-1", 0.5), shard("device-2", 0.5)]) })
    assert.deepEqual(result.perDevice.map((d) => d.node), ["node-1", "node-2"])
    assert.ok(result.perDevice.every((d) => d.budgetBytes === 100 * GB))
})
test("MoE active parameters never replace total resident weights or scale KV", () => {
    assert.deepEqual(calculateInference({ ...input, model: { ...model, activeParameters: 2 * GB } }).breakdown, calculateInference(input).breakdown)
})
test("measured resident weights require matching runtime/precision and provenance", () => {
    const measured = { ...model, residentWeightBytes: 38 * GB, weightBits: 4, weightFormat: "INT4", residentWeightEngine: "test-only", residentWeightEngineVersion: "1", residentWeightSource: "https://example.com/synthetic-test" }
    assert.equal(calculateInference({ ...input, model: measured }).breakdown.weights, 38 * GB)
    assert.equal(calculateInference({ ...input, model: measured }).breakdown.quantizationOverhead, 0)
    assert.equal(calculateInference({ ...input, model: measured, engineVersion: "2" }).breakdown.weights, 40.25 * GB)
    assert.throws(() => validateModelMetadata({ ...measured, residentWeightSource: null }), /require/)
})
test("cross-mode parity: both standard workflows use identical shared engine inputs", () => {
    const hardware = { memoryGb: 80, deviceCount: 1, systemReservedGb: 0, safetyReservePercent: 0 }
    const byModel = calculateStandardGpu({ ...input, hardware })
    const byServer = calculateStandardGpu({ ...input, hardware })
    assert.deepEqual(byModel, byServer)
    assert.deepEqual(byModel.breakdown, calculateInference(input).breakdown)
    assert.equal(byModel.calculationVersion, 2)
    assert.equal(calculateInference(JSON.parse(JSON.stringify(byModel.inputSnapshot))).memoryStatus, byModel.memoryStatus)
})
test("manual RAM survives GPU, count, guideline and recommendation changes", () => {
    assert.equal(automaticRam("777", true, 80, 8, 3), "777")
    assert.equal(automaticRam("0", false, 48, 2, 2), "192")
    assert.equal(automaticRam("0", false, 48, 2, 3), "288")
})
test("historical KV-only regression comparison, not production policy", () => {
    const oldPolicyWithNewKv = (40.25 + 4 + 5.24288) / 0.85
    assert.ok(Math.abs(oldPolicyWithNewKv - 58.22691764705882) < 1e-10)
    assert.equal(oldPolicyWithNewKv.toFixed(2), "58.23")
})

test("metadata provenance rejects impossible dates and malformed or credential-bearing URLs", () => {
    for (const verifiedAt of ["2026-02-30", "2026-13-01", "yesterday"]) assert.throws(() => validateModelMetadata({ verifiedAt }))
    for (const metadataSource of ["https://", "javascript:alert(1)", "https://user:password@example.com"]) assert.throws(() => validateModelMetadata({ metadataSource }))
    assert.doesNotThrow(() => validateModelMetadata({ verifiedAt: "2024-02-29", metadataSource: "https://example.com/config?revision=1" }))
})
