# LLM Sizing Calculation Summary

Implemented calculation version: **2**, verified locally 2026-09-06.
Scope: GPU-resident inference, not training, fine-tuning, offload, a vendor-validated configuration, or a performance guarantee.

## Implementation and Catalog Audit

- `FRONTEND/app/lib/calculators.ts` owns all inference memory arithmetic. Both standard modes call `calculateStandardGpu`; Spark calls `calculateDgxSpark`; both delegate to `calculateInference`.
- `FRONTEND/app/(user)/page.tsx` handles editable workload/policy inputs, filtering, memory candidates, model comparison, details and versioned history. It does not implement a separate KV formula.
- Existing partial v2 source, nullable Prisma fields and arithmetic tests were already present when this retry started. They were inspected and completed rather than replaced with another implementation.
- `hardware_sizing_data.json` is the **legacy seed/reference artifact**, not the live calculation policy. Its old formulas and capacity matrix are not consumed by the v2 engine. `scripts/seed.js` imports hardware values and legacy capacity records from it; it was not run.
- Catalog columns use `Gb` and source labels say GB, but contain no measured byte counts or GB/GiB provenance. V2 explicitly interprets these as **decimal GB**, displays both GB and GiB, and requires actual hardware capacity to be checked before procurement. No unit conversion from a claimed measurement has been invented.
- Legacy `supportedConcurrent` values came from that JSON's model/use-case capacity matrix, with no profile-matched benchmark provenance. The 44 existing database rows are preserved, excluded from `/api/catalog`, unused by sizing and labeled legacy in admin.
- `maxModelB` comes from the Spark catalog's 200B/405B reference claims. It is displayed as a conditional reference, never a parameter hard blocker or performance predictor.
- The local runtime has 160 models. The metadata audit matched 154 rows to supplied Hugging Face repositories; 152 now have sourced `totalParameters` and 84 have a normalized MHA/GQA/MQA architecture. Remaining incomplete or unavailable rows keep missing fields and correctly show **Unknown**. No values were inferred from model names, ranks or rounded `parametersB`.
- Catalog `contextTokens` parsing accepts decimal `k`, `M` and `B` suffixes. The local backfill corrected 158 source rows; one model without a source remains null. This catalog column is display/reference data, while v2 sizing uses user workload tokens and validates them against sourced `maxContextTokens`.

## Units and Formula

All arithmetic is in bytes; display rounds to two decimals only after the fit decision.

```text
GB  = bytes / 1,000,000,000
GiB = bytes / 1,073,741,824
rawWeightBytes = totalParameters * weightBits / 8
quantizationOverheadBytes = rawWeightBytes * overheadPercent / 100
weightBytes = rawWeightBytes + quantizationOverheadBytes

kvBytesPerToken = 2 * numHiddenLayers * numKeyValueHeads * headDim * kvCacheBits / 8
tokensPerSequence = inputTokens + maxOutputTokens
kvCacheBytes = kvBytesPerToken * tokensPerSequence * concurrentSequences

workloadBytes = weightBytes + kvCacheBytes + runtimePeakBytes
usableBudgetBytes = physicalMemoryBytes - systemReservedBytes - safetyReservedBytes
headroomBytes = usableBudgetBytes - workloadBytes
fits = headroomBytes >= 0
```

- Supported full-attention architectures: `decoder_mha`, `decoder_gqa`, `decoder_mqa`. MHA requires query heads = KV heads; MQA requires one KV head; KV heads must divide query heads.
- Use explicit `headDim`; derive from `hiddenSize / numAttentionHeads` only for supported architectures with an integral quotient.
- Missing required metadata, MLA, sliding-window, hybrid/state-space, encoder and multimodal profiles produce Unknown, not a fallback factor.
- KV is a conservative logical full-context estimate, with no assumed prefix sharing, sliding window reduction or expert-count multiplier. Physical cache block rounding still requires an engine allocation profile.
- `totalParameters`, not MoE `activeParameters`, determines resident weights. Active parameters are informational only.
- Matching measured resident weights replace estimated weights without adding overhead again. They require model identity/revision, format/bits, engine/version, source and verification date; selected format/bits and engine/version must match the metadata record. Artifact file size is not automatically treated as resident memory.
- FP16 means **Half precision**. Weight precision options are FP16/BF16/INT8/FP8/INT4/FP4; KV precision is independently selected as 8/16/32 bits. An optional quantization format name (for example AWQ) identifies a runtime format separately from its nominal bit width. Lower KV precision describes arithmetic, not runtime support.

## Inputs and Validation

Nullable metadata is stored on `LlmModel` and editable in Admin / Models. Fields cover identity/revision, total/active parameters, architecture, layers, query/KV heads, head dimension/hidden size, verified context limit, weight format/bits, KV bits, resident weights and runtime/provenance.

Model POST and PATCH validate the merged record so partial updates cannot bypass cross-field checks. Blank optional admin values become null. Numeric values must be finite and positive where required; dimension/count metadata is integral. Sources must be valid HTTP(S) URLs without credentials; verification dates must be real YYYY-MM-DD dates.

The engine rejects NaN, Infinity, negative inputs, zero/fractional concurrency, empty total context, fractional tokens, context beyond `maxContextTokens`, invalid precision, impossible reserves and inconsistent partitions. Missing metadata is distinct from invalid metadata. Optional TTFT, TPOT and output tokens/s/request targets must be positive; without evidence they do not create a performance verdict.

`concurrentSequences` means actively processed sequences, not online accounts. Multiple sequences per request must be counted. Input + maximum output tokens is the full reserved context for each sequence.

Use-case presets remain editable: Chat/OCR 4,000, Coding 8,000, Agentic 16,000, Embedding 2,000 tokens. Default concurrency is 1. Selecting a preset resets input/output tokens, not model metadata; incompatible model-type selections are cleared or replaced with a matching catalog item.

## Runtime and Reserve Policy

Defaults are visible, editable **estimates**, not measured vendor constants:

| Policy | Default | Scope |
| --- | ---: | --- |
| Weight overhead | 15% of raw weights | Quantization/residency estimate |
| Runtime peak | 4 GB | Single device buffers, activations and workspace |
| GPU system reserve | 0 GB/device | Other processes using GPU memory, not host RAM |
| GPU safety reserve | 15% physical/device | Subtracted from physical memory |
| Spark final usable budget | 100 GB/node | Conservative preset including OS/CPU and safety reserve |

An explicit partition's runtime bytes per placement **replace**, rather than add to, the single-device runtime estimate. No runtime/benchmark profile is guessed. A final usable budget is used directly; the engine rejects devices that also specify nonzero reserves with that final budget.

## Multiple Devices and Nodes

Aggregate VRAM is only a preliminary bound. More than one device/node without a partition plan has memoryStatus `unknown`, even if the aggregate would fit.

The optional JSON partition specifies TP, PP, replica count, source, sequence distribution, and device placements. Every replica must have TP x PP placements covering full weights and KV; fractions can represent replication. Each configured device must appear exactly once, and replica sequences must sum to workload concurrency. Each placement declares its runtime peak.

```text
placementWeights = weightBytes * weightFraction
placementKV = kvBytesPerToken * tokensPerSequence * replicaSequences * kvFraction
placementWorkload = placementWeights + placementKV + placementRuntimePeak
```

Fit requires **every device/node pool** to have nonnegative headroom. An overflowing device cannot be rescued by another device's free memory. Each data-parallel replica contains its own full weights. The breakdown distinguishes logical weights/KV from allocated weights/KV and total runtime across placements.

Standard presets use separate device pools on node-1. Spark uses one unified CPU/GPU pool per node. Two Sparks are not one coherent cross-network memory pool. Engine/distributed communication compatibility remains Unknown even when a user-supplied partition fits.

## Independent Results and UI

| Dimension | Implemented outcomes |
| --- | --- |
| Memory | `fits`, `does_not_fit`, `unknown` |
| Compatibility | `unknown` until actual engine/hardware evidence exists |
| Performance | `not_benchmarked`; `supportedConcurrent = null` |
| Confidence | `estimated` or `incomplete` |

Results include breakdown, per-device/node checks, assumptions, missing inputs, evidence URLs/profile source, calculation version and input snapshot. A measured weight component does not make the entire workload measured.

No memory ratio produces Recommended, no capacity bucket drives concurrency, no PFLOPS value becomes user capacity, and no 1.35 multiplier invents Borderline performance. Failure means **Does not fit this configuration**, not universal lack of support.

Size by Model evaluates memory candidates for 1/2/4/8 GPUs and offers the first three ranked by memory status then aggregate memory. Candidate search never invents a partition. Selecting a candidate changes hardware and preserves manual RAM. Size by Server and Spark preserve search/provider/parameter preset/min/max filters and show incomplete/failed models too. Model rows sort by memory status then existing catalog rank, not by invented throughput.

Host RAM defaults to 2x total GPU memory with an editable 2x/3x guideline. Once manually edited, changes to GPUs, quantity, candidates or multiplier do not overwrite RAM. RAM is not a universal loading minimum or part of the GPU memory-fit verdict. Cisco's 6 **physical** CPU cores/GPU is labeled a reference baseline, not a concurrency guarantee. Spark does not apply the separate host RAM multiplier to its unified pool.

Storage remains explicitly heuristic: two resident weight copies + 200 GB, when weights are known. Actual model artifact versions, containers, OS, datasets, vector indexes and operational reserve need an inventory. Host loading strategy, physical cache rounding, measured runtime peak and performance require real deployment data.

## Worked Examples

Synthetic 70B GQA arithmetic fixture: 80 layers, 64 query heads, 8 KV heads, head dimension 128; INT4 weights, FP16 KV; 2 sequences x (7,000 input + 1,000 output tokens).

```text
raw weights = 70,000,000,000 * 4 / 8 = 35,000,000,000 bytes
overhead = 5,250,000,000 bytes
resident weight estimate = 40,250,000,000 bytes
KV = 2 * 80 * 8 * 128 * 2 * 16,000 = 5,242,880,000 bytes
runtime = 4,000,000,000 bytes
workload = 49,492,880,000 bytes = 49.49288 GB

80 GB device, 15% safety, no system reserve:
final budget = 68 GB; headroom = 18.50712 GB; memory fits (estimated)
compatibility = Unknown; performance = Not benchmarked
```

Changing weight bits to 16 does not change KV. Changing KV to 8 bits yields 2,621,440,000 bytes. Cisco's 32-layer/32-KV-head/128-dimension MHA fixture with FP16 KV and 10 x 1,024 tokens gives 5,368,709,120 bytes = exactly 5 GiB.

For a 200B INT4 fixture on Spark, raw weights alone are 100 GB; 15% overhead makes weights 115 GB before KV/runtime. This fails the selected 100 GB final budget, not the vendor's conditional reference claim. Two nodes require an explicit partition and individual node checks.

Historical comparison only: keeping the old division-by-0.85 policy but correcting only KV gives `(40.25 + 4 + 5.24288) / 0.85 = 58.226917647... GB`, displayed as 58.23 GB versus the former 53.64 GB. This comparison is not a second production policy.

## History and Local Schema

New history stores `calculationVersion = 2` and a JSON snapshot containing workload, metadata, device budgets, partition, policy, targets, results, RAM and filters. The API recalculates each submitted snapshot and rejects mismatched results. Existing null-version rows are labeled **Legacy (old calculation)** and are never recomputed or shown as current estimates.

The configured SQLite runtime was inspected before changing it: `FRONTEND/data/model_dashboard.sqlite`, not `prisma/dev.db` or `prisma/data/model_dashboard.sqlite`.

A completed one-time migration added 20 nullable model columns and two nullable version/snapshot columns to each LLM history table. It used a consistent `VACUUM INTO` backup before a transactional additive ALTER and did not reset or reseed the database.

Backup created locally: `FRONTEND/data/model_dashboard.sqlite.before-sizing-v2-1788710486035.bak`.

Post-migration `PRAGMA integrity_check` returned `ok`. The metadata importer changed only the new nullable model metadata fields for matched Hugging Face sources; it did not reset, reseed or alter existing catalog identity/score fields. Prisma Client was regenerated successfully after closing the inspection process that temporarily held its Windows DLL lock.

## Verification

From `FRONTEND`:

```powershell
npm.cmd test
npm.cmd run lint
npx.cmd tsc --noEmit
npm.cmd run build
npm.cmd run test:browser -- file:///C:/Users/pakorn/AppData/Local/Temp/opencode/sizing-browser-check/node_modules/playwright/index.mjs
```

- Deterministic Node tests cover the plan's arithmetic, missing/unsupported metadata, validation, boundaries, partition overflow/replication, MoE isolation, DGX budgets/evidence, RAM override and the legacy numeric comparison.
- Browser smoke uses an external Playwright installation and installed Edge, a loopback-only server on port 3007, synthetic test credentials and a temporary SQLite copy. It does not write fixtures or history to the real database. Run after building; Node 24 supports its built-in SQLite backup and TypeScript test imports.
- Browser checks exercise metadata POST/PATCH validation, nullable updates, actual UI Model/Server snapshot parity, search/provider/parameter filters, manual RAM, missing metadata, Spark one/two-node states, history API tamper rejection, current/Legacy history, and all three modes at 1440px/390px without horizontal page overflow or uncaught page errors.
- Known tooling warnings: three existing TanStack/React Compiler `incompatible-library` lint warnings, Google Sans fallback metrics warning during build, and Node's typeless-package warning for direct TypeScript test imports. These are not failed checks; changing the package module type would break the existing CommonJS seed script and was not necessary.

## Sources and Evidence Limits

1. [Cisco Live AIHUB-2659 (2025)](https://www.ciscolive.com/c/dam/r/ciscolive/emea/docs/2025/pdf/AIHUB-2659.pdf): p19 CPU/RAM guidelines, p21 properties, p22 MHA example. Arithmetic is independently recomputed; inconsistent example GPU multiplication is not copied.
2. [Cisco Connect AI-ready data centers](https://www.cisco.com/c/dam/global/en_uk/training-events/events/pdf/securely-build-your-ai-infrastructure-from-cisco-connect-ai-ready-data-centers.pdf): head-specific KV explanation.
3. [HPE model compression](https://community.hpe.com/t5/ai-unlocked/model-compression-for-modern-ai-quantization-makes-llms-smaller/ba-p/7263647): weight precision principle, not validation of the complete calculator.
4. [HPE Private Cloud AI QuickSpecs](https://www.hpe.com/us/en/collaterals/collateral.a50009216enw.html): configurations/workload tiers, not a universal public sizing formula.
5. [NVIDIA DGX Spark hardware](https://docs.nvidia.com/dgx/dgx-spark/hardware.html): hardware/reference claims; 100 GB usable/node is our conservative policy, not an official usable-memory measurement.
6. [VMware inference sizing guidance](https://blogs.vmware.com/cloud-foundation/2024/09/25/llm-inference-sizing-and-performance-guidance/): GQA fixture geometry. Units are recomputed consistently; KV is not multiplied by active MoE experts.

The metadata audit is sourced from first-party Hugging Face API/config records, not a benchmark. No benchmark ingestion/matching subsystem, architecture-specific MLA/hybrid allocator, offload model or throughput prediction is supplied without evidence. Compatibility remains unverified and performance remains not benchmarked even when estimated memory fits.
