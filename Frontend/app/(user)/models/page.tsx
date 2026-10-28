'use client'

import { useEffect, useMemo, useState } from "react"
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table"
import CustomSelect from "@/app/components/CustomSelect"
import Loading from "@/app/components/Loading"
import ProviderLogo, { NameWithLogo } from "@/app/components/ProviderLogo"
import Table from "@/app/components/Table/Table"

type Model = {
    id: number
    rank: number | null
    model: string
    provider: string
    contextTokens: number | null
    parametersB: number
    intelligence: number | null
    coding: number | null
    agentic: number | null
    modelType?: string | null
    gpqa?: number | null
    hle?: number | null
    lcr?: number | null
    hfUrl?: string | null
    hfLikes?: number | null
}

const ranges = [
    { label: "20-40B", min: 20, max: 40 },
    { label: "40-80B", min: 40, max: 80 },
    { label: "80-140B", min: 80, max: 140 },
    { label: "140-220B", min: 140, max: 220 },
    { label: "220B+", min: 220, max: 10000 },
]

export default function ModelsPage() {
    const [models, setModels] = useState<Model[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [provider, setProvider] = useState("")
    const [modelType, setModelType] = useState("")
    const [range, setRange] = useState("")
    const [min, setMin] = useState("")
    const [max, setMax] = useState("")

    useEffect(() => {
        fetch("/api/catalog")
            .then((response) => response.json())
            .then((data) => setModels(data.models))
            .finally(() => setLoading(false))
    }, [])

    const providers = Array.from(new Set(models.map((model) => model.provider))).sort()
    const filtered = useMemo(() => {
        const preset = range ? ranges[Number(range)] : null
        const minValue = min ? Number(min) : preset?.min
        const maxValue = max ? Number(max) : preset?.max
        return models.filter((model) => {
            if (search && !model.model.toLowerCase().includes(search.toLowerCase())) return false
            if (provider && model.provider !== provider) return false
            if (modelType && (model.modelType || "llm").toLowerCase() !== modelType.toLowerCase()) return false
            if (minValue !== undefined && model.parametersB < minValue) return false
            if (maxValue !== undefined && model.parametersB > maxValue) return false
            return true
        })
    }, [models, search, provider, modelType, range, min, max])

    const columns = useMemo<ColumnDef<Model>[]>(() => [
        { 
            accessorKey: "rank", 
            header: "Rank",
            cell: ({ row }) => <span className="font-mono text-slate-500 text-xs">#{row.original.rank ?? "-"}</span>
        },
        { 
            accessorKey: "model", 
            header: "Model",
            cell: ({ row }) => <span className="font-medium text-slate-900 dark:text-slate-100">{row.original.model}</span>
        },
        {
            accessorKey: "modelType",
            header: "Type",
            cell: ({ row }) => {
                const type = (row.original.modelType || "llm").toLowerCase()
                const chipColor = type === "ocr" ? "table-chip-yellow" : type === "embedding" ? "table-chip-blue" : "table-chip-gray"
                return <span className={`table-chip ${chipColor}`}>{type.toUpperCase()}</span>
            }
        },
        { accessorKey: "provider", header: "Provider", cell: ({ row }) => <NameWithLogo name={row.original.provider} /> },
        { 
            accessorKey: "parametersB", 
            header: "Parameters", 
            cell: ({ row }) => <span className="font-mono font-medium">{row.original.parametersB}B</span> 
        },
        { 
            accessorKey: "contextTokens", 
            header: "Context",
            cell: ({ row }) => row.original.contextTokens ? <span className="font-mono text-xs text-slate-600 dark:text-slate-400">{row.original.contextTokens.toLocaleString()}</span> : "-"
        },
        { accessorKey: "intelligence", header: "Intelligence", cell: ({ row }) => <span className="font-mono">{row.original.intelligence ?? "-"}</span> },
        { accessorKey: "coding", header: "Coding", cell: ({ row }) => <span className="font-mono">{row.original.coding ?? "-"}</span> },
        { accessorKey: "agentic", header: "Agentic", cell: ({ row }) => <span className="font-mono">{row.original.agentic ?? "-"}</span> },
        { accessorKey: "gpqa", header: "GPQA", cell: ({ row }) => <span className="font-mono">{row.original.gpqa != null ? row.original.gpqa.toFixed(2) : "-"}</span> },
        { accessorKey: "hle", header: "HLE", cell: ({ row }) => <span className="font-mono">{row.original.hle != null ? row.original.hle.toFixed(2) : "-"}</span> },
        { accessorKey: "lcr", header: "LCR", cell: ({ row }) => <span className="font-mono">{row.original.lcr != null ? row.original.lcr.toFixed(2) : "-"}</span> },
        {
            accessorKey: "hfUrl",
            header: "Hugging Face",
            cell: ({ row }) => row.original.hfUrl ? (
                <a
                    href={row.original.hfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="table-chip table-chip-gray hover:text-blue-600 dark:hover:text-blue-400 transition inline-flex items-center gap-1"
                    title={row.original.hfUrl}
                    onClick={(e) => e.stopPropagation()}
                >
                    <span>HF</span>
                    <span className="text-[10px]">↗</span>
                </a>
            ) : "-",
            enableSorting: false,
        },
    ], [])

    const table = useReactTable({
        data: filtered,
        columns,
        initialState: {
            pagination: { pageSize: 25 },
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    if (loading) return <Loading />

    return (
        <section className="page-stack table-page">
            <div className="page-title-row">
                <div>
                    <h1>Models Catalog</h1>
                    <p className="muted">Explore open-weights and proprietary AI models with benchmark metrics and parameter specifications.</p>
                </div>
            </div>
            <Table
                table={table}
                header={<>
                    <div className="table-search">
                        <input className="table-search-input" placeholder="Search model name..." value={search} onChange={(event) => setSearch(event.target.value)} />
                    </div>
                    <div className="field">
                        <CustomSelect
                            value={modelType}
                            options={[
                                { value: "", label: "All Types" },
                                { value: "llm", label: "LLM" },
                                { value: "ocr", label: "OCR" },
                                { value: "embedding", label: "Embedding" },
                            ]}
                            onChange={setModelType}
                        />
                    </div>
                    <div className="field">
                        <CustomSelect value={provider} options={[{ value: "", label: "All Providers" }, ...providers.map((item) => ({ value: item, label: item, icon: <ProviderLogo name={item} /> }))]} searchable onChange={setProvider} />
                    </div>
                    <div className="field">
                        <CustomSelect value={range} options={[{ value: "", label: "All Parameter Sizes" }, ...ranges.map((item, index) => ({ value: String(index), label: item.label }))]} onChange={setRange} />
                    </div>
                    <div className="grid-2" style={{ gap: "0.5rem" }}>
                        <input className="input" type="number" placeholder="Min B" value={min} onChange={(event) => setMin(event.target.value)} style={{ width: "80px" }} />
                        <input className="input" type="number" placeholder="Max B" value={max} onChange={(event) => setMax(event.target.value)} style={{ width: "80px" }} />
                    </div>
                </>}
            />
        </section>
    )
}
