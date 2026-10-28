'use client'

import { Check, Plus, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import Loading from "@/app/components/Loading"
import { AppLogo } from "@/app/components/ProviderLogo"

type ServerApp = { id: number, name: string, category: string | null, iconName?: string | null, iconBackground?: string | null, cpuCores: number, ramGb: number, storageGb: number, networkGbps?: number | null }

const CART_KEY = "app-sizer-cart"

export default function AppSizerPage() {
    const [apps, setApps] = useState<ServerApp[]>([])
    const [cart, setCart] = useState<number[]>(() => {
        if (typeof window === "undefined") return []
        return JSON.parse(localStorage.getItem(CART_KEY) || "[]")
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("/api/catalog")
            .then((response) => response.json())
            .then((data) => setApps(data.apps))
            .finally(() => setLoading(false))
    }, [])

    function toggle(id: number) {
        const next = cart.includes(id) ? cart.filter((item) => item !== id) : [...cart, id]
        setCart(next)
        localStorage.setItem(CART_KEY, JSON.stringify(next))
    }

    if (loading) return <Loading />

    return (
        <section className="page-stack">
            <div className="page-title-row">
                <div>
                    <h1>Enterprise App Sizer</h1>
                    <p className="muted">Select application workloads to compute aggregated CPU, Memory, Storage, and Growth sizing.</p>
                </div>
                <Link className="button" href="/app-sizer/cart">
                    <ShoppingCart size={16} /> Cart ({cart.length} {cart.length === 1 ? "app" : "apps"})
                </Link>
            </div>
            <div className="card-grid">
                {apps.map((app) => {
                    const isSelected = cart.includes(app.id)
                    return (
                        <div className={`item-card ${isSelected ? "selected-card" : ""}`} key={app.id}>
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex items-center gap-3">
                                    <AppLogo iconName={app.iconName} iconBackground={app.iconBackground} small={false} />
                                    <div>
                                        <h3 className="font-semibold text-slate-900 dark:text-slate-100">{app.name}</h3>
                                        <span className="text-xs text-slate-500">{app.category ?? "Application"}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-1 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-mono text-slate-600 dark:text-slate-400">
                                <div>
                                    <span className="block text-[10px] uppercase text-slate-400">Cores</span>
                                    <strong>{app.cpuCores} CPU</strong>
                                </div>
                                <div>
                                    <span className="block text-[10px] uppercase text-slate-400">Memory</span>
                                    <strong>{app.ramGb}GB</strong>
                                </div>
                                <div>
                                    <span className="block text-[10px] uppercase text-slate-400">Disk</span>
                                    <strong>{app.storageGb}GB</strong>
                                </div>
                            </div>
                            <button
                                type="button"
                                className={`button mt-3 ${isSelected ? "secondary" : ""}`}
                                onClick={() => toggle(app.id)}
                            >
                                {isSelected ? <Check size={16} className="text-emerald-500" /> : <Plus size={16} />}
                                {isSelected ? "Selected" : "Add to Sizing"}
                            </button>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
