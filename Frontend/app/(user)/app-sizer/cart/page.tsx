'use client'

import { useEffect, useMemo, useState } from "react"
import { ArrowLeft, History, Save, Server, Trash2, TrendingUp } from "lucide-react"
import Link from "next/link"
import Drawer from "@/app/components/Drawer"
import InlineLoader from "@/app/components/InlineLoader"
import Loading from "@/app/components/Loading"
import { AppLogo } from "@/app/components/ProviderLogo"
import { roundAppSizing } from "@/app/lib/calculators"

type ServerApp = { id: number, name: string, category: string | null, iconName?: string | null, iconBackground?: string | null, cpuCores: number, ramGb: number, storageGb: number, networkGbps?: number | null, note?: string | null }

const CART_KEY = "app-sizer-cart"

export default function AppSizerCartPage() {
    const [apps, setApps] = useState<ServerApp[]>([])
    const [cart, setCart] = useState<number[]>(() => {
        if (typeof window === "undefined") return []
        return JSON.parse(localStorage.getItem(CART_KEY) || "[]")
    })
    const [growMode, setGrowMode] = useState<"single" | "advanced">("single")
    const [growPercent, setGrowPercent] = useState("20")
    const [cpuGrowPercent, setCpuGrowPercent] = useState("20")
    const [ramGrowPercent, setRamGrowPercent] = useState("20")
    const [storageGrowPercent, setStorageGrowPercent] = useState("20")
    const [networkGrowPercent, setNetworkGrowPercent] = useState("20")
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [historyOpen, setHistoryOpen] = useState(false)
    const [history, setHistory] = useState<Record<string, unknown>[]>([])

    useEffect(() => {
        fetch("/api/catalog")
            .then((response) => response.json())
            .then((data) => setApps(data.apps))
            .finally(() => setLoading(false))
    }, [])

    const selectedApps = apps.filter((app) => cart.includes(app.id))
    const result = useMemo(() => {
        const baseCpu = selectedApps.reduce((sum, app) => sum + app.cpuCores, 0)
        const baseRamGb = selectedApps.reduce((sum, app) => sum + app.ramGb, 0)
        const baseStorageGb = selectedApps.reduce((sum, app) => sum + app.storageGb, 0)
        const baseNetworkGbps = selectedApps.reduce((sum, app) => sum + (app.networkGbps ?? 0), 0)
        const cpuGrow = growMode === "single" ? Number(growPercent) : Number(cpuGrowPercent)
        const ramGrow = growMode === "single" ? Number(growPercent) : Number(ramGrowPercent)
        const storageGrow = growMode === "single" ? Number(growPercent) : Number(storageGrowPercent)
        const networkGrow = growMode === "single" ? Number(growPercent) : Number(networkGrowPercent)
        return {
            baseCpu,
            baseRamGb,
            baseStorageGb,
            baseNetworkGbps,
            recommendedCpu: Math.ceil(baseCpu * (1 + cpuGrow / 100)),
            recommendedRamGb: roundAppSizing(baseRamGb * (1 + ramGrow / 100), 4),
            recommendedStorageGb: roundAppSizing(baseStorageGb * (1 + storageGrow / 100), 10),
            recommendedNetworkGbps: roundAppSizing(baseNetworkGbps * (1 + networkGrow / 100), 1),
        }
    }, [selectedApps, growMode, growPercent, cpuGrowPercent, ramGrowPercent, storageGrowPercent, networkGrowPercent])

    function remove(id: number) {
        const next = cart.filter((item) => item !== id)
        setCart(next)
        localStorage.setItem(CART_KEY, JSON.stringify(next))
    }

    async function loadHistory() {
        const data = await fetch("/api/history/app-sizer").then((response) => response.json())
        setHistory(data)
    }

    async function saveHistory() {
        if (!selectedApps.length) return
        const name = window.prompt("History name")?.trim()
        if (!name) return
        setSaving(true)
        await fetch("/api/history/app-sizer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                growMode,
                growPercent: Number(growPercent),
                cpuGrowPercent: growMode === "advanced" ? Number(cpuGrowPercent) : null,
                ramGrowPercent: growMode === "advanced" ? Number(ramGrowPercent) : null,
                storageGrowPercent: growMode === "advanced" ? Number(storageGrowPercent) : null,
                networkGrowPercent: growMode === "advanced" ? Number(networkGrowPercent) : null,
                appCount: selectedApps.length,
                ...result,
                status: "Recommended",
                recommendationText: "Recommended server size calculated from selected applications.",
                items: selectedApps.map((app) => ({
                    appId: app.id,
                    name: app.name,
                    category: app.category,
                    cpuCores: app.cpuCores,
                    ramGb: app.ramGb,
                    storageGb: app.storageGb,
                })),
            }),
        })
        setSaving(false)
    }

    if (loading) return <Loading />

    return (
        <section className="page-stack">
            <div className="page-title-row">
                <div className="flex items-center gap-3">
                    <Link href="/app-sizer" className="button secondary" style={{ padding: "6px 10px" }} title="Back to App Sizer">
                        <ArrowLeft size={16} />
                    </Link>
                    <div>
                        <h1>App Sizing Cart & Growth Forecast</h1>
                        <p className="muted">{selectedApps.length} workload applications selected for server resource aggregation.</p>
                    </div>
                </div>
                <div className="button-row">
                    <button type="button" className="button secondary" onClick={() => { setHistoryOpen(true); loadHistory() }}>
                        <History size={16} /> History
                    </button>
                    <button type="button" id="confirm" onClick={saveHistory} disabled={!selectedApps.length || saving}>
                        {saving ? <InlineLoader /> : <><Save size={16} /> Save Forecast</>}
                    </button>
                </div>
            </div>

            <div className="grid-2">
                {/* Selected Workloads List */}
                <div className="panel page-stack">
                    <div className="panel-header">
                        <h2><Server size={18} className="text-blue-500" /> Selected Applications ({selectedApps.length})</h2>
                    </div>
                    {selectedApps.length ? (
                        <div className="table-scroll">
                            <table className="comparison-table">
                                <thead>
                                    <tr>
                                        <th>Application</th>
                                        <th>CPU</th>
                                        <th>RAM</th>
                                        <th>Storage</th>
                                        <th>Network</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedApps.map((app) => (
                                        <tr key={app.id}>
                                            <td><AppName app={app} /></td>
                                            <td className="font-mono">{app.cpuCores} Cores</td>
                                            <td className="font-mono">{app.ramGb} GB</td>
                                            <td className="font-mono">{app.storageGb} GB</td>
                                            <td className="font-mono text-xs">{app.networkGbps ? `${app.networkGbps} Gbps` : "-"}</td>
                                            <td className="text-right">
                                                <button type="button" className="button secondary" style={{ padding: "4px 8px" }} onClick={() => remove(app.id)} title="Remove application">
                                                    <Trash2 size={14} className="text-rose-500" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-10 text-slate-400">
                            <p>No applications currently in cart.</p>
                            <Link href="/app-sizer" className="button mt-3">Browse App Catalog</Link>
                        </div>
                    )}
                </div>

                {/* Capacity & Growth Projection */}
                <div className="panel page-stack">
                    <div className="panel-header">
                        <h2><TrendingUp size={18} className="text-emerald-500" /> Growth & Buffer Projection</h2>
                        <div className="switch">
                            <button type="button" className={growMode === "single" ? "active" : ""} onClick={() => setGrowMode("single")}>Flat %</button>
                            <button type="button" className={growMode === "advanced" ? "active" : ""} onClick={() => setGrowMode("advanced")}>Component %</button>
                        </div>
                    </div>

                    <div className="mt-2">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Current Total</span>
                        <div className="metric-grid">
                            <MetricCard label="CPU Cores" value={result.baseCpu} unit="CPU" />
                            <MetricCard label="RAM" value={result.baseRamGb} unit="GB" />
                            <MetricCard label="Storage" value={result.baseStorageGb} unit="GB" />
                            <MetricCard label="Network" value={result.baseNetworkGbps} unit="Gbps" />
                        </div>
                    </div>

                    {growMode === "single" ? (
                        <NumberField label="Uniform Growth / Safety Buffer %" value={growPercent} onChange={setGrowPercent} />
                    ) : (
                        <div className="grid-3">
                            <NumberField label="CPU Growth %" value={cpuGrowPercent} onChange={setCpuGrowPercent} />
                            <NumberField label="RAM Growth %" value={ramGrowPercent} onChange={setRamGrowPercent} />
                            <NumberField label="Storage Growth %" value={storageGrowPercent} onChange={setStorageGrowPercent} />
                            <NumberField label="Network Growth %" value={networkGrowPercent} onChange={setNetworkGrowPercent} />
                        </div>
                    )}

                    <div className="mt-2">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">After Growth & Buffer</span>
                        <div className="metric-grid">
                            <MetricCard label="CPU Cores" value={result.recommendedCpu} unit="CPU" />
                            <MetricCard label="RAM" value={result.recommendedRamGb} unit="GB" />
                            <MetricCard label="Storage" value={result.recommendedStorageGb} unit="GB" />
                            <MetricCard label="Network" value={result.recommendedNetworkGbps} unit="Gbps" />
                        </div>
                    </div>
                </div>
            </div>

            {/* History Drawer */}
            <Drawer title="App Sizing History" open={historyOpen} onClose={() => setHistoryOpen(false)}>
                <div className="page-stack">
                    {history.map((item) => (
                        <div className="item-card" key={String(item.id)}>
                            <h3>{String(item.name)}</h3>
                            <p className="muted">{String(item.appCount)} apps · {new Date(String(item.createdAt)).toLocaleString()}</p>
                            <div className="text-xs font-mono text-slate-600 dark:text-slate-400 mt-1">
                                Rec: {String(item.recommendedCpu)} CPU · {String(item.recommendedRamGb)}GB RAM · {String(item.recommendedStorageGb)}GB Disk{item.recommendedNetworkGbps ? ` · ${String(item.recommendedNetworkGbps)}Gbps Network` : ""}
                            </div>
                        </div>
                    ))}
                    {history.length === 0 && (
                        <p className="muted text-center py-6">No saved history records found.</p>
                    )}
                </div>
            </Drawer>
        </section>
    )
}

function NumberField({ label, value, onChange }: { label: string, value: string, onChange: (value: string) => void }) {
    return (
        <div className="field">
            <label>{label}</label>
            <input className="input" type="number" min="0" max="500" value={value} onChange={(event) => onChange(event.target.value)} />
        </div>
    )
}

function MetricCard({ label, value, unit }: { label: string, value: number, unit: string }) {
    return (
        <div className="metric-card">
            <span>{label}</span>
            <strong>{value} <span className="text-xs font-normal text-slate-500">{unit}</span></strong>
        </div>
    )
}

function AppName({ app }: { app: ServerApp }) {
    return (
        <span className="name-with-logo">
            <AppLogo iconName={app.iconName} iconBackground={app.iconBackground} />
            <span className="font-medium text-slate-900 dark:text-slate-100">{app.name}</span>
        </span>
    )
}
