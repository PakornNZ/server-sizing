'use client'

import { useEffect, useId, useState } from "react"
import { Activity, History, CheckCircle2, XCircle, AlertTriangle, AlertCircle, Info, Cpu, HardDrive, Zap, Layers, Server, Sparkles, ShieldCheck } from "lucide-react"
import CustomSelect from "@/app/components/CustomSelect"
import Drawer from "@/app/components/Drawer"
import Loading from "@/app/components/Loading"
import ProviderLogo from "@/app/components/ProviderLogo"
import StatusBadge from "@/app/components/StatusBadge"
import { automaticRam, CALCULATION_VERSION, calculateDgxSpark, calculateStandardGpu, GB, MEMORY_LABELS, USE_CASES, WEIGHT_BITS, type ModelMetadata, type Partition } from "@/app/lib/calculators"

type Model = ModelMetadata & { id: number, model: string, provider: string, parametersB: number, rank: number | null, modelType?: string | null, contextTokens: number | null, intelligence: number | null, coding: number | null, agentic: number | null }
type Gpu = { id: string, vendor: string, name: string, vramGb: number }
type DgxProfile = { id: number, stackCount: number, label: string, unifiedMemoryGb: number, usableAiMemoryGb: number, maxModelB: number }
type Catalog = { models: Model[], gpus: Gpu[], dgxProfiles: DgxProfile[] }
type Mode = "pick-model" | "pick-server" | "dgx-spark"
type Result = ReturnType<typeof calculateStandardGpu>
type Evaluation = { result: Result | null, error: string }
const parameterPresets = [{ label: "20-40B", min: 20, max: 40 }, { label: "40-80B", min: 40, max: 80 }, { label: "80-140B", min: 80, max: 140 }, { label: "140-220B", min: 140, max: 220 }, { label: "220B+", min: 220, max: 10000 }]
const rank = { fits: 0, unknown: 1, does_not_fit: 2 }

async function request(url: string, options?: RequestInit) {
    const response = await fetch(url, options)
    const data = await response.json()
    if (!response.ok) throw new Error(data.message ?? `Request failed (${response.status})`)
    return data
}

export default function LlmSizerPage() {
    const [catalog, setCatalog] = useState<Catalog | null>(null)
    const [error, setError] = useState("")
    const [mode, setMode] = useState<Mode>("pick-model")
    const [modelId, setModelId] = useState("")
    const [gpuId, setGpuId] = useState("")
    const [gpuCount, setGpuCount] = useState("1")
    const [ram, setRam] = useState("0")
    const [ramDirty, setRamDirty] = useState(false)
    const [ramMultiplier, setRamMultiplier] = useState("2")
    const [stack, setStack] = useState("1")
    const [useCase, setUseCase] = useState<keyof typeof USE_CASES>("chat")
    const [weightFormat, setWeightFormat] = useState<keyof typeof WEIGHT_BITS>("FP16")
    const [quantizationFormat, setQuantizationFormat] = useState("")
    const [kvBits, setKvBits] = useState("16")
    const [inputTokens, setInputTokens] = useState("3000")
    const [outputTokens, setOutputTokens] = useState("1000")
    const [concurrent, setConcurrent] = useState("1")
    const [engine, setEngine] = useState("")
    const [engineVersion, setEngineVersion] = useState("")
    const [runtimeGb, setRuntimeGb] = useState("4")
    const [overhead, setOverhead] = useState("15")
    const [systemReserve, setSystemReserve] = useState("0")
    const [safetyReserve, setSafetyReserve] = useState("15")
    const [sparkBudget, setSparkBudget] = useState("")
    const [partitionJson, setPartitionJson] = useState("")
    const [ttft, setTtft] = useState("")
    const [tpot, setTpot] = useState("")
    const [tps, setTps] = useState("")
    const [search, setSearch] = useState("")
    const [provider, setProvider] = useState("")
    const [preset, setPreset] = useState("")
    const [minParameters, setMinParameters] = useState("")
    const [maxParameters, setMaxParameters] = useState("")
    const [showCount, setShowCount] = useState(12)
    const [selectedCard, setSelectedCard] = useState<Model | null>(null)
    const [historyOpen, setHistoryOpen] = useState(false)
    const [historyTab, setHistoryTab] = useState("llm-pick-model")
    const [history, setHistory] = useState<Record<string, unknown>[]>([])
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        request("/api/catalog").then((data: Catalog) => {
            setCatalog(data)
            setModelId(String(data.models.find((item) => isMemoryReady(item) && matchesUseCase(item, "chat"))?.id ?? data.models[0]?.id ?? ""))
            setGpuId(data.gpus[0]?.id ?? "")
            setRam(String((data.gpus[0]?.vramGb ?? 0) * 2))
        }).catch((e) => setError(e.message))
    }, [])

    const gpu = catalog?.gpus.find((item) => item.id === gpuId)
    const model = catalog?.models.find((item) => String(item.id) === modelId)
    const profile = catalog?.dgxProfiles.find((item) => String(item.stackCount) === stack)
    const providers = [...new Set(catalog?.models.map((item) => item.provider) ?? [])].sort()
    const range = preset ? parameterPresets[Number(preset)] : null
    const filteredModels = catalog?.models.filter((item) => matchesUseCase(item, useCase)
        && (!search || item.model.toLowerCase().includes(search.toLowerCase()))
        && (!provider || item.provider === provider)
        && item.parametersB >= (minParameters !== "" ? Number(minParameters) : range?.min ?? 0)
        && item.parametersB <= (maxParameters !== "" ? Number(maxParameters) : range?.max ?? Infinity)) ?? []

    function evaluate(item: Model, selectedGpu = gpu, count = Number(gpuCount), dgx = mode === "dgx-spark", usePartition = true): Evaluation {
        try {
            if (!dgx && !selectedGpu) throw new Error("Select a GPU")
            if (dgx && !profile) throw new Error("Select a DGX profile")
            if (!dgx && (ram === "" || !Number.isFinite(Number(ram)) || Number(ram) < 0)) throw new Error("Host RAM must be a finite nonnegative number")
            const numericFields = [inputTokens, outputTokens, concurrent, kvBits, runtimeGb, overhead, ...(!dgx ? [systemReserve, safetyReserve, gpuCount] : [])]
            if (numericFields.some((value) => !value.trim())) throw new Error("Complete the numeric workload and policy inputs")
            const partition: Partition | null = usePartition && partitionJson.trim() ? JSON.parse(partitionJson) : null
            const input = {
                model: item, weightFormat: quantizationFormat.trim() || weightFormat, weightBits: WEIGHT_BITS[weightFormat], kvCacheBits: Number(kvBits),
                inputTokens: Number(inputTokens), maxOutputTokens: Number(outputTokens), concurrentSequences: Number(concurrent),
                servingEngine: engine, engineVersion, runtimePeakBytes: Number(runtimeGb) * GB,
                quantizationOverheadPercent: Number(overhead), partition,
                targetTTFTMs: ttft ? Number(ttft) : null, targetTPOTMs: tpot ? Number(tpot) : null,
                targetOutputTokensPerSecondPerRequest: tps ? Number(tps) : null,
                hardware: {
                    memoryGb: dgx ? profile!.unifiedMemoryGb / profile!.stackCount : selectedGpu!.vramGb,
                    deviceCount: dgx ? profile!.stackCount : count,
                    systemReservedGb: Number(systemReserve), safetyReservePercent: Number(safetyReserve),
                    finalBudgetGb: sparkBudget !== "" ? Number(sparkBudget) : profile ? profile.usableAiMemoryGb / profile.stackCount : 100,
                },
            }
            return { result: dgx ? calculateDgxSpark(input) : calculateStandardGpu(input), error: "" }
        } catch (e) {
            return { result: null, error: e instanceof Error ? e.message : "Invalid sizing input" }
        }
    }

    const live = model ? evaluate(model) : null
    const rows = filteredModels.map((item) => ({ model: item, ...evaluate(item) })).sort((a, b) => (rank[a.result?.memoryStatus ?? "unknown"] - rank[b.result?.memoryStatus ?? "unknown"]) || (a.model.rank ?? 9999) - (b.model.rank ?? 9999))
    // Candidate search intentionally has no invented partition. Multi-device candidates remain Unknown.
    const candidates = mode === "pick-model" && model ? (catalog?.gpus.flatMap((item) => [1, 2, 4, 8].map((count) => ({ gpu: item, count, ...evaluate(model, item, count, false, false) }))) ?? [])
        .sort((a, b) => (rank[a.result?.memoryStatus ?? "unknown"] - rank[b.result?.memoryStatus ?? "unknown"]) || a.gpu.vramGb * a.count - b.gpu.vramGb * b.count).slice(0, 3) : []

    function changeHardware(id: string, count: string) {
        setGpuId(id)
        setGpuCount(count)
        const selected = catalog?.gpus.find((item) => item.id === id)
        if (selected) setRam(automaticRam(ram, ramDirty, selected.vramGb, Number(count), Number(ramMultiplier)))
    }

    async function loadHistory(type = historyTab) {
        setHistoryTab(type)
        try { setHistory(await request(`/api/history/${type}`)) } catch (e) { setError(e instanceof Error ? e.message : "History failed") }
    }

    async function save() {
        const savedRows = mode === "pick-model" && model && live?.result ? [{ model, result: live.result }] : rows.slice(0, showCount)
        if (saving || !savedRows.length || savedRows.some((row) => !row.result)) return
        const name = window.prompt("History name")?.trim()
        if (!name) return
        setSaving(true)
        setError("")
        try {
            const result = savedRows[0].result!
            const shared = {
                name, hardwareType: mode === "dgx-spark" ? "dgx-spark" : "standard", useCase,
                contextTokens: Number(inputTokens) + Number(outputTokens), quant: result.inputSnapshot.weightFormat, concurrent: Number(concurrent),
                gpuId: mode === "dgx-spark" ? null : gpu?.id, gpuName: mode === "dgx-spark" ? null : gpu?.name,
                gpuCount: mode === "dgx-spark" ? null : Number(gpuCount), systemRamGb: mode === "dgx-spark" ? null : Number(ram),
                stackCount: mode === "dgx-spark" ? Number(stack) : null,
                calculationVersion: CALCULATION_VERSION,
                calculationSnapshot: JSON.stringify({ version: CALCULATION_VERSION, mode, ram, ramMultiplier, filters: { search, provider, preset, minParameters, maxParameters }, calculations: savedRows.map((row) => ({ modelName: row.model.model, input: row.result!.inputSnapshot, result: row.result })) }),
            }
            const body = mode === "pick-model" ? {
                ...shared, modelId: model!.id, modelName: model!.model, modelProvider: model!.provider,
                modelParametersB: model!.parametersB, status: result.memoryStatus,
                recommendationText: "Memory estimate only; compatibility unknown; performance not benchmarked.",
                weightGb: result.breakdown.weights === null ? null : result.breakdown.weights / GB,
                kvGb: result.breakdown.kvCache === null ? null : result.breakdown.kvCache / GB,
            } : {
                ...shared, search: search || null, provider: provider || null,
                minParametersB: minParameters ? Number(minParameters) : null, maxParametersB: maxParameters ? Number(maxParameters) : null,
                matchedCount: savedRows.length, status: "Memory estimates only",
                matchedModels: savedRows.map((row) => ({ modelId: row.model.id, modelName: row.model.model, provider: row.model.provider, parametersB: row.model.parametersB, rank: row.model.rank, intelligence: row.model.intelligence, status: row.result!.memoryStatus })),
            }
            await request(`/api/history/${mode === "pick-model" ? "llm-pick-model" : "llm-server"}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
        } catch (e) { setError(e instanceof Error ? e.message : "Save failed") } finally { setSaving(false) }
    }

    if (!catalog) return error ? <p role="alert">{error}</p> : <Loading />
    return (
        <section className="page-stack">
            <div className="page-title-row">
                <div><h1>LLM Hardware Sizer</h1><p className="muted">Inference memory estimates, not validated configurations or performance guarantees.</p></div>
                <div className="button-row">
                    <div className="switch">
                        {([['pick-model', 'Size by Model'], ['pick-server', 'Size by Server'], ['dgx-spark', 'DGX Spark']] as const).map(([value, label]) => <button key={value} type="button" className={mode === value ? "active" : ""} onClick={() => setMode(value)}>{label}</button>)}
                    </div>
                    <button type="button" className="button secondary" onClick={() => { setHistoryOpen(true); loadHistory() }}><History size={16} /> History</button>
                </div>
            </div>
            {error ? <p role="alert">{error}</p> : null}
            <div className={`workbench-grid ${mode !== "pick-model" ? "workbench-grid-server" : ""}`}>
                <div className="page-stack">
                    <div className="panel page-stack sizing-parameters-card">
                        <h2>Sizing Parameters</h2>
                        {mode === "pick-model" ? <div className="field"><label>Target Model</label><CustomSelect value={modelId} searchable options={catalog.models.filter((item) => matchesUseCase(item, useCase)).map((item) => ({ value: String(item.id), label: `${item.model} (${item.parametersB}B)${metadataStatus(item) === "ready" ? "" : ` - ${metadataStatus(item)}`}`, icon: <ProviderLogo name={item.provider} /> }))} onChange={setModelId} /></div> : (
                            <div className="grid-2">
                                <TextField label="Search Model" value={search} onChange={setSearch} />
                                <div className="field"><label>Provider</label><CustomSelect value={provider} searchable options={[{ value: "", label: "All Providers" }, ...providers.map((value) => ({ value, label: value, icon: <ProviderLogo name={value} /> }))]} onChange={setProvider} /></div>
                                <div className="field"><label>Parameter Preset</label><CustomSelect value={preset} options={[{ value: "", label: "All Sizes" }, ...parameterPresets.map((item, i) => ({ value: String(i), label: item.label }))]} onChange={setPreset} /></div>
                                <TextField label="Min Parameters (B)" value={minParameters} onChange={setMinParameters} numeric />
                                <TextField label="Max Parameters (B)" value={maxParameters} onChange={setMaxParameters} numeric />
                            </div>
                        )}
                        <div className="grid-3">
                            <div className="field"><label>Use Case Preset</label><CustomSelect value={useCase} options={Object.entries(USE_CASES).map(([value, item]) => ({ value, label: item.label }))} onChange={(value) => { const key = value as keyof typeof USE_CASES; setUseCase(key); setInputTokens(String(USE_CASES[key].contextTokens - 1000)); setOutputTokens("1000"); if (model && !matchesUseCase(model, key)) setModelId(String(catalog.models.find((item) => matchesUseCase(item, key))?.id ?? "")) }} /></div>
                            <div className="field"><label>Weight Precision</label><CustomSelect value={weightFormat} options={Object.keys(WEIGHT_BITS).map((value) => ({ value, label: value === "FP16" ? "FP16 (Half precision)" : value }))} onChange={(value) => setWeightFormat(value as keyof typeof WEIGHT_BITS)} /></div>
                            <div className="field"><label>KV Precision</label><CustomSelect value={kvBits} options={[{ value: "16", label: "FP16/BF16 (16 bit)" }, { value: "8", label: "FP8 (arithmetic only)" }, { value: "32", label: "FP32 (32 bit)" }]} onChange={setKvBits} /></div>
                            <TextField label="Input Tokens" value={inputTokens} onChange={setInputTokens} numeric />
                            <TextField label="Max Output Tokens" value={outputTokens} onChange={setOutputTokens} numeric />
                            <TextField label="Concurrent Sequences" value={concurrent} onChange={setConcurrent} numeric />
                        </div>
                        <span className="field-hint"><Info size={12} /> Active sequences, not idle users. KV dtype depends on serving runtime.</span>
                        {mode === "dgx-spark" ? <>
                            <div className="dgx-profile-grid">{catalog.dgxProfiles.map((item) => <button key={item.id} type="button" className={`dgx-profile-card ${stack === String(item.stackCount) ? "selected-profile" : ""}`} onClick={() => setStack(String(item.stackCount))}><div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}><ProviderLogo name="nvidia" /><span className="profile-name">{item.label}</span></div><span>{item.unifiedMemoryGb / item.stackCount} GB physical / node</span><span>{item.maxModelB}B vendor reference claim, not a limit</span></button>)}</div>
                            <TextField label={`Final usable GB per node (preset ${profile ? profile.usableAiMemoryGb / profile.stackCount : 100})`} value={sparkBudget} onChange={setSparkBudget} numeric />
                            <span className="field-hint"><Info size={12} /> 100 GB/node policy includes OS & safety reserves. Separate Spark nodes do not share memory pool.</span>
                        </> : <>
                            <div className="grid-3">
                                <div className="field"><label>GPU Model</label><CustomSelect value={gpuId} searchable options={catalog.gpus.map((item) => ({ value: item.id, label: `${item.name} (${item.vramGb} GB)`, icon: <ProviderLogo name={item.vendor} /> }))} onChange={(id) => changeHardware(id, gpuCount)} /></div>
                                <TextField label="GPU Count" value={gpuCount} onChange={(count) => changeHardware(gpuId, count)} numeric />
                                <TextField label="Host RAM (GB)" value={ram} onChange={(value) => { setRamDirty(true); setRam(value) }} numeric />
                            </div>
                            <div className="field"><label>Host RAM Guideline</label><CustomSelect value={ramMultiplier} options={[{ value: "2", label: "2 x total GPU memory" }, { value: "3", label: "3 x total GPU memory" }]} onChange={(value) => { setRamMultiplier(value); setRam(automaticRam(ram, ramDirty, gpu?.vramGb ?? 0, Number(gpuCount), Number(value))) }} /></div>
                            <span className="field-hint"><Info size={12} /> Guideline: Host RAM 2-3x GPU memory, 6 cores/GPU. Multi-GPU requires a partition plan.</span>
                        </>}
                        <details>
                            <summary>Runtime, policies and partition plan</summary>
                            <div className="grid-2">
                                <TextField label="Serving Engine" value={engine} onChange={setEngine} />
                                <TextField label="Engine Version" value={engineVersion} onChange={setEngineVersion} />
                                <TextField label="Quantization Format (optional, e.g. AWQ)" value={quantizationFormat} onChange={setQuantizationFormat} />
                                <TextField label="Runtime Peak (GB, estimated)" value={runtimeGb} onChange={setRuntimeGb} numeric />
                                <TextField label="Weight Overhead (%)" value={overhead} onChange={setOverhead} numeric />
                                {mode !== "dgx-spark" ? <><TextField label="GPU System Reserve (GB/device)" value={systemReserve} onChange={setSystemReserve} numeric /><TextField label="Safety Reserve (% physical/device)" value={safetyReserve} onChange={setSafetyReserve} numeric /></> : null}
                                <TextField label="Target TTFT (ms, optional)" value={ttft} onChange={setTtft} numeric />
                                <TextField label="Target TPOT (ms, optional)" value={tpot} onChange={setTpot} numeric />
                                <TextField label="Target Output Tokens/s/request (optional)" value={tps} onChange={setTps} numeric />
                            </div>
                            <div className="field">
                                <label className="field-label">Explicit Partition JSON (optional)</label>
                                <textarea className="textarea" value={partitionJson} onChange={(event) => setPartitionJson(event.target.value)} rows={8} />
                            </div>
                            <span className="field-hint"><Info size={12} /> Blank means Unknown for multiple devices. Each replica needs TP x PP placements.</span>
                            <pre style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>{JSON.stringify({ tensorParallelSize: 2, pipelineParallelSize: 1, replicaCount: 1, source: "Your measured/engine partition profile", replicas: [{ concurrentSequences: 1, placements: [{ deviceId: "device-1", weightFraction: 0.5, kvFraction: 1, runtimePeakBytes: 4000000000 }, { deviceId: "device-2", weightFraction: 0.5, kvFraction: 1, runtimePeakBytes: 4000000000 }] }] }, null, 2)}</pre>
                        </details>
                    </div>
                    {candidates.length ? (
                        <div className="panel page-stack" style={{ gap: "0.75rem" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
                                <h2 style={{ fontSize: "1rem" }}><Server size={16} /> Recommended GPU Configurations</h2>
                                <span className="field-hint"><Info size={12} /> Ranked by memory capacity</span>
                            </div>
                            <div className="card-grid recommendation-grid">
                                {candidates.map((item, i) => {
                                    const isSelected = gpuId === item.gpu.id && Number(gpuCount) === item.count
                                    const headroom = item.result?.breakdown.headroom
                                    const isFits = item.result?.memoryStatus === "fits"
                                    const headroomGb = headroom != null ? headroom / GB : null

                                    return (
                                        <button
                                            key={`${item.gpu.id}-${item.count}`}
                                            type="button"
                                            className={`item-card ${isSelected ? "selected-card" : ""}`}
                                            style={{ display: "flex", flexDirection: "column", gap: "0.5rem", textAlign: "left", padding: "0.85rem" }}
                                            onClick={() => changeHardware(item.gpu.id, String(item.count))}
                                        >
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", minWidth: 0, gap: "0.5rem" }}>
                                                <span className={`table-chip ${isFits ? (i === 0 ? "table-chip-blue" : "table-chip-gray") : "table-chip-gray"} inline-flex items-center shrink-0 leading-none px-2 py-0.5 text-[11px] font-medium h-[22px] gap-1`}>
                                                    {isFits ? (i === 0 ? <><Sparkles size={11} /> Minimum Fit</> : <><Layers size={11} /> Alternative Fit</>) : <><Server size={11} /> Multi-GPU Plan</>}
                                                </span>
                                                {isFits ? (
                                                    <StatusBadge status="Fits" size="sm" />
                                                ) : (
                                                    <StatusBadge 
                                                        status="Needs Partition" 
                                                        size="sm" 
                                                        iconOnly 
                                                        tooltip="Needs Partition: Multi-GPU inference requires an explicit tensor/pipeline partition plan" 
                                                    />
                                                )}
                                            </div>
                                            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", margin: "0.2rem 0 0", minWidth: 0 }}>
                                                <ProviderLogo name={item.gpu.vendor} />
                                                <div style={{ minWidth: 0, flex: 1 }}>
                                                    <h3 style={{ margin: 0, fontSize: "0.925rem", lineHeight: 1.25, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={`${item.gpu.name} x ${item.count}`}>
                                                        {item.gpu.name}
                                                    </h3>
                                                    <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>Quantity: × {item.count}</span>
                                                </div>
                                            </div>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.75rem", marginTop: "auto", width: "100%" }}>
                                                <span className="text-[var(--color-text-secondary)] font-mono">{item.gpu.vramGb * item.count} GB Total</span>
                                                {headroomGb != null ? (
                                                    <span className={`headroom-delta ${headroomGb >= 0 ? "surplus" : "deficit"}`} style={{ fontSize: "11px" }}>
                                                        {headroomGb >= 0 ? "+" : ""}{headroomGb.toFixed(1)} GB
                                                    </span>
                                                ) : null}
                                            </div>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    ) : null}
                </div>
                <div className="panel page-stack">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
                        <h2><Activity size={18} /> {mode === "pick-model" ? "Selected Hardware Estimate" : "Model Memory Comparison"}</h2>
                        <span className="field-hint"><Info size={12} /> Inference memory estimates only</span>
                    </div>
                    {mode === "pick-model" ? live ? <SizingDetails evaluation={live} gpu={gpu} gpuCount={gpuCount} /> : <p>Select a model.</p> : <>
                        <p className="text-xs text-[var(--color-text-muted)]">{rows.length} models evaluated for this hardware configuration.</p>
                        <div className="table-scroll">
                            <table className="comparison-table">
                                <thead>
                                    <tr>
                                        <th>Model</th>
                                        <th>Size</th>
                                        <th>Workload</th>
                                        <th>Headroom</th>
                                        <th>Status</th>
                                        <th>Benchmark</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.slice(0, showCount).map((row) => {
                                        const headroom = row.result?.breakdown.headroom
                                        const workload = row.result?.breakdown.workload
                                        const headroomGb = headroom != null ? headroom / GB : null
                                        const isSurplus = headroomGb !== null && headroomGb >= 0

                                        return (
                                            <tr key={row.model.id}>
                                                <td>
                                                    <button type="button" className="button secondary" onClick={() => setSelectedCard(row.model)}>
                                                        <ProviderLogo name={row.model.provider} />
                                                        {row.model.model}
                                                    </button>
                                                </td>
                                                <td><span className="font-mono font-medium">{row.model.parametersB}B</span></td>
                                                <td><span className="font-mono">{workload != null ? `${(workload / GB).toFixed(1)} GB` : "-"}</span></td>
                                                <td>
                                                    {headroomGb != null ? (
                                                        <span className={`headroom-delta ${isSurplus ? "surplus" : "deficit"}`}>
                                                            {isSurplus ? "+" : ""}{headroomGb.toFixed(1)} GB
                                                        </span>
                                                    ) : (
                                                        <span className="text-slate-400 font-mono">-</span>
                                                    )}
                                                </td>
                                                <td>
                                                    <StatusBadge status={row.error ? "Invalid inputs" : MEMORY_LABELS[row.result?.memoryStatus ?? "unknown"]} size="sm" />
                                                </td>
                                                <td>
                                                    <span className="table-chip table-chip-gray text-xs">Unbenchmarked</span>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        {rows.length > showCount ? <button type="button" className="button secondary" onClick={() => setShowCount(showCount + 12)}>Show more ({rows.length - showCount} remaining)</button> : null}
                    </>}
                    <button type="button" id="confirm" disabled={saving || (mode === "pick-model" ? !live?.result : !rows.length || rows.slice(0, showCount).some((row) => !row.result))} onClick={save}>{saving ? "Saving..." : "Save Sizing Snapshot"}</button>
                </div>
            </div>
            <Drawer title={selectedCard?.model ?? "Model Details"} open={Boolean(selectedCard)} onClose={() => setSelectedCard(null)}>
                {selectedCard ? <><p>{selectedCard.provider} | {selectedCard.parametersB}B | Intelligence {selectedCard.intelligence ?? "Unknown"} | Coding {selectedCard.coding ?? "Unknown"} | Agentic {selectedCard.agentic ?? "Unknown"}</p><SizingDetails evaluation={evaluate(selectedCard)} /></> : null}
            </Drawer>
            <Drawer title="Sizing History" open={historyOpen} onClose={() => setHistoryOpen(false)}>
                <div className="switch"><button type="button" onClick={() => loadHistory("llm-pick-model")}>Size by Model</button><button type="button" onClick={() => loadHistory("llm-server")}>Size by Server / DGX</button></div>
                {history.map((item) => <div className="item-card" key={String(item.id)}><h3>{String(item.name)}</h3><StatusBadge status={item.calculationVersion === CALCULATION_VERSION ? "v2 snapshot" : "Legacy (old calculation)"} /><p>{new Date(String(item.createdAt)).toLocaleString()} | {String(item.hardwareType)}</p>{item.calculationVersion === CALCULATION_VERSION ? <details><summary>Saved inputs, metadata, policies and results</summary><pre style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>{String(item.calculationSnapshot)}</pre></details> : <p className="muted">Historical result only; not recomputed or comparable to v2 memory estimates.</p>}</div>)}
                {!history.length ? <p>No saved history records.</p> : null}
            </Drawer>
        </section>
    )
}

function TextField({ label, value, onChange, numeric = false }: { label: string, value: string, onChange: (value: string) => void, numeric?: boolean }) {
    const id = useId()
    return (
        <div className="field">
            <label className="field-label" htmlFor={id}>{label}</label>
            <input id={id} className="input" type={numeric ? "number" : "text"} min={numeric ? 0 : undefined} step={numeric ? "any" : undefined} value={value} onChange={(event) => onChange(event.target.value)} />
        </div>
    )
}
function SizingDetails({ evaluation, gpu, gpuCount }: { evaluation: Evaluation, gpu?: Gpu, gpuCount?: string }) {
    const result = evaluation.result
    if (!result) {
        return (
            <div className="sizer-hero status-does_not_fit">
                <div className="sizer-hero-content">
                    <div className="sizer-hero-icon"><AlertCircle size={24} /></div>
                    <div className="sizer-hero-text">
                        <h3>Evaluation Error</h3>
                        <p>{evaluation.error}</p>
                    </div>
                </div>
            </div>
        )
    }

    const { breakdown, memoryStatus, perDevice, inputSnapshot, confidence, missingInputs, assumptions, evidence } = result
    const model = inputSnapshot.model
    const status = memoryStatus
    const isFit = status === "fits"
    const isOverflow = status === "does_not_fit"

    const workloadGb = breakdown.workload !== null ? (breakdown.workload / GB) : null
    const budgetGb = breakdown.usableBudget !== null ? (breakdown.usableBudget / GB) : null
    const physicalGb = breakdown.physicalMemory !== null ? (breakdown.physicalMemory / GB) : null
    const headroomGb = breakdown.headroom !== null ? (breakdown.headroom / GB) : null
    const weightsGb = breakdown.weights !== null ? (breakdown.weights / GB) : null
    const kvGb = breakdown.kvCache !== null ? (breakdown.kvCache / GB) : null
    const runtimeGb = breakdown.runtimePeak !== null ? (breakdown.runtimePeak / GB) : null

    const totalRef = Math.max(budgetGb ?? 0, workloadGb ?? 0, 1)
    const weightsPct = weightsGb !== null ? Math.min((weightsGb / totalRef) * 100, 100) : 0
    const kvPct = kvGb !== null ? Math.min((kvGb / totalRef) * 100, 100) : 0
    const runtimePct = runtimeGb !== null ? Math.min((runtimeGb / totalRef) * 100, 100) : 0
    const freePct = headroomGb !== null && headroomGb > 0 ? Math.min((headroomGb / totalRef) * 100, 100) : 0
    const overflowPct = headroomGb !== null && headroomGb < 0 ? Math.min((Math.abs(headroomGb) / totalRef) * 100, 100) : 0

    return (
        <div className="page-stack">
            {/* Hero Status Banner */}
            <div className={`sizer-hero status-${status}`}>
                <div className="sizer-hero-content">
                    <div className="sizer-hero-icon">
                        {isFit ? <CheckCircle2 size={26} /> : isOverflow ? <XCircle size={26} /> : <AlertTriangle size={26} />}
                    </div>
                    <div className="sizer-hero-text">
                        <h3>
                            {isFit ? "Memory Fit (Estimated)" : isOverflow ? "Does Not Fit (Overflow)" : "Needs Validation / Partition"}
                        </h3>
                        <p>
                            {isFit
                                ? `Inference workload fits in memory with ${headroomGb?.toFixed(2)} GB free headroom.`
                                : isOverflow
                                ? `Workload exceeds budget by ${headroomGb !== null ? Math.abs(headroomGb).toFixed(2) : "-"} GB. More VRAM needed.`
                                : "Multi-GPU inference requires an explicit tensor/pipeline partition plan."}
                        </p>
                    </div>
                </div>
                <div className="sizer-hero-tags">
                    {gpu ? (
                        <span className="table-chip table-chip-gray" style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                            <ProviderLogo name={gpu.vendor} size="xs" /> {gpu.name} × {gpuCount ?? 1}
                        </span>
                    ) : null}
                    <span className="table-chip table-chip-blue">
                        <Cpu size={12} /> {model.totalParameters ? `${(model.totalParameters / 1e9).toFixed(model.totalParameters % 1e9 === 0 ? 0 : 1)}B` : "Weights"} ({inputSnapshot.weightFormat})
                    </span>
                    <span className={`table-chip ${metadataStatus(model) === "ready" ? "table-chip-green" : "table-chip-yellow"}`}>
                        <ShieldCheck size={12} /> {metadataStatus(model)}
                    </span>
                    <span className="table-chip table-chip-gray">
                        <Sparkles size={12} /> {confidence}
                    </span>
                </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="sizer-stats-grid">
                <div className="sizer-stat-card">
                    <span className="sizer-stat-label"><Layers size={13} /> Workload</span>
                    <span className="sizer-stat-value">{workloadGb !== null ? `${workloadGb.toFixed(1)} GB` : "Unknown"}</span>
                    <span className="sizer-stat-subtext">Weights + KV + Peak</span>
                </div>
                <div className="sizer-stat-card">
                    <span className="sizer-stat-label"><Cpu size={13} /> Usable Budget</span>
                    <span className="sizer-stat-value">{budgetGb !== null ? `${budgetGb.toFixed(1)} GB` : "Unknown"}</span>
                    <span className="sizer-stat-subtext">{physicalGb ? `${physicalGb.toFixed(0)} GB physical VRAM` : "Capacity"}</span>
                </div>
                <div className="sizer-stat-card">
                    <span className="sizer-stat-label"><Zap size={13} /> Headroom</span>
                    <span className={`sizer-stat-value ${headroomGb !== null ? (headroomGb >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400") : ""}`}>
                        {headroomGb !== null ? `${headroomGb >= 0 ? "+" : ""}${headroomGb.toFixed(1)} GB` : "Unknown"}
                    </span>
                    <span className="sizer-stat-subtext">{headroomGb !== null && headroomGb >= 0 ? "Available margin" : "Memory deficit"}</span>
                </div>
                <div className="sizer-stat-card">
                    <span className="sizer-stat-label"><HardDrive size={13} /> Context / Concur</span>
                    <span className="sizer-stat-value">{inputSnapshot.inputTokens + inputSnapshot.maxOutputTokens} t</span>
                    <span className="sizer-stat-subtext">{inputSnapshot.concurrentSequences} sequence(s)</span>
                </div>
            </div>

            {/* Visual Memory Allocation Bar */}
            <div className="sizer-meter-container">
                <div className="sizer-meter-header">
                    <span>Memory Allocation Breakdown</span>
                    <span className="text-xs font-mono text-[var(--color-text-secondary)]">
                        {workloadGb !== null ? `${workloadGb.toFixed(1)} GB` : "0 GB"} / {budgetGb !== null ? `${budgetGb.toFixed(1)} GB` : "0 GB"} ({budgetGb && workloadGb ? Math.round((workloadGb / budgetGb) * 100) : 0}%)
                    </span>
                </div>
                <div className="sizer-meter-bar" title="Memory Allocation Visualizer">
                    <div className="sizer-meter-segment weights" style={{ width: `${weightsPct}%` }} title={`Weights: ${weightsGb?.toFixed(1)} GB`} />
                    <div className="sizer-meter-segment kv" style={{ width: `${kvPct}%` }} title={`KV Cache: ${kvGb?.toFixed(1)} GB`} />
                    <div className="sizer-meter-segment runtime" style={{ width: `${runtimePct}%` }} title={`Runtime Peak: ${runtimeGb?.toFixed(1)} GB`} />
                    {freePct > 0 ? (
                        <div className="sizer-meter-segment headroom" style={{ width: `${freePct}%` }} title={`Free Headroom: ${headroomGb?.toFixed(1)} GB`} />
                    ) : null}
                    {overflowPct > 0 ? (
                        <div className="sizer-meter-segment overflow" style={{ width: `${overflowPct}%` }} title={`Overflow: ${headroomGb?.toFixed(1)} GB`} />
                    ) : null}
                </div>
                <div className="sizer-meter-legend">
                    <span className="sizer-legend-item">
                        <span className="sizer-legend-dot weights" /> Weights: <strong className="font-mono">{weightsGb?.toFixed(1) ?? "-"} GB</strong>
                    </span>
                    <span className="sizer-legend-item">
                        <span className="sizer-legend-dot kv" /> KV Cache: <strong className="font-mono">{kvGb?.toFixed(1) ?? "-"} GB</strong>
                    </span>
                    <span className="sizer-legend-item">
                        <span className="sizer-legend-dot runtime" /> Runtime: <strong className="font-mono">{runtimeGb?.toFixed(1) ?? "-"} GB</strong>
                    </span>
                    {headroomGb !== null && headroomGb >= 0 ? (
                        <span className="sizer-legend-item">
                            <span className="sizer-legend-dot headroom" /> Free: <strong className="font-mono text-emerald-600 dark:text-emerald-400">+{headroomGb.toFixed(1)} GB</strong>
                        </span>
                    ) : headroomGb !== null ? (
                        <span className="sizer-legend-item">
                            <span className="sizer-legend-dot overflow" /> Deficit: <strong className="font-mono text-red-600 dark:text-red-400">{headroomGb.toFixed(1)} GB</strong>
                        </span>
                    ) : null}
                </div>
            </div>

            {/* Per Device Breakdown (Multi-GPU) */}
            {perDevice.length > 1 ? (
                <div className="page-stack" style={{ gap: "0.5rem" }}>
                    <h3 style={{ fontSize: "0.85rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.02em", color: "var(--color-text-secondary)" }}>
                        Device Placements ({perDevice.length} GPUs)
                    </h3>
                    <div className="grid-2" style={{ gap: "0.5rem" }}>
                        {perDevice.map((device) => {
                            const devWorkload = (device.workloadBytes / GB).toFixed(1)
                            const devBudget = (device.budgetBytes / GB).toFixed(1)
                            const devHeadroom = (device.headroomBytes / GB).toFixed(1)
                            const isDevFit = device.headroomBytes >= 0
                            return (
                                <div className="sizer-stat-card" key={device.id} style={{ padding: "0.6rem 0.75rem" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <span style={{ fontWeight: 600, fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                                            {gpu ? <ProviderLogo name={gpu.vendor} size="xs" /> : <Server size={14} />} {device.node} / {device.id}
                                        </span>
                                        <span className={`table-chip ${isDevFit ? "table-chip-green" : "table-chip-red"}`} style={{ padding: "1px 6px", fontSize: "10px" }}>
                                            {isDevFit ? `+${devHeadroom} GB` : `${devHeadroom} GB`}
                                        </span>
                                    </div>
                                    <span className="text-xs text-[var(--color-text-secondary)] font-mono">
                                        {devWorkload} GB / {devBudget} GB budget
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            ) : null}

            {/* Missing Inputs Alert */}
            {missingInputs.length ? (
                <div className="table-chip table-chip-yellow" style={{ padding: "0.6rem 0.85rem", borderRadius: "var(--radius-min)", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.35rem", width: "100%" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontWeight: 600 }}>
                        <AlertTriangle size={14} /> Missing Required Metadata:
                    </div>
                    <ul style={{ margin: "0 0 0 1.25rem", padding: 0, fontSize: "0.775rem" }}>
                        {missingInputs.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                </div>
            ) : null}

            {/* Collapsible Assumptions & Reference Notes */}
            <details className="sizer-accordion">
                <summary><Info size={14} /> Technical Assumptions & Operational Provenance</summary>
                <div className="sizer-accordion-content page-stack" style={{ gap: "0.6rem" }}>
                    <div>
                        <strong>Storage Heuristic:</strong>{" "}
                        {breakdown.weights === null ? "Unknown" : `${((breakdown.weights * 2 + 200 * GB) / GB).toFixed(1)} GB`} (covers 2 weight copies + 200 GB operational workspace).
                    </div>
                    <div>
                        <strong>Assumptions:</strong>
                        <ul style={{ margin: "0.25rem 0 0 1.25rem", padding: 0 }}>
                            {assumptions.map((item) => <li key={item}>{item}</li>)}
                        </ul>
                    </div>
                    {evidence.length ? (
                        <div>
                            <strong>Evidence Sources:</strong>
                            <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap", marginTop: "0.25rem" }}>
                                {evidence.map((item) => (
                                    <a key={item} href={item} target="_blank" rel="noreferrer" className="table-chip table-chip-gray hover:text-blue-500" style={{ wordBreak: "break-all" }}>
                                        {item}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>
            </details>
        </div>
    )
}
function matchesUseCase(model: Model, useCase: string) {
    const type = model.modelType?.toLowerCase(), name = model.model.toLowerCase()
    if (useCase === "ocr") return !type || type === "ocr" || name.includes("ocr")
    if (useCase === "embedding") return !type || type === "embedding" || name.includes("bge") || name.includes("embed")
    return !type || ["llm", "chat", "coding", "agentic", useCase].includes(type)
}

function isMemoryReady(model: Model) {
    return metadataStatus(model) === "ready"
}

function metadataStatus(model: ModelMetadata) {
    if (!model.totalParameters || !model.numHiddenLayers || !model.numAttentionHeads || !model.numKeyValueHeads || (!model.headDim && !model.hiddenSize)) return "incomplete"
    if (!model.architecture || !["decoder_mha", "decoder_gqa", "decoder_mqa"].includes(model.architecture)) return "unsupported architecture"
    return "ready"
}
