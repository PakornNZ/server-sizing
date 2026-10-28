'use client'

import { ChevronDown } from "lucide-react"
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react"

export type SelectOption = {
    value: string
    label: string
    icon?: ReactNode
}

export default function CustomSelect({
    value,
    options,
    placeholder = "Select",
    searchable = false,
    onChange,
}: {
    value: string
    options: SelectOption[]
    placeholder?: string
    searchable?: boolean
    onChange: (value: string) => void
}) {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState("")
    const ref = useRef<HTMLDivElement | null>(null)
    const selected = options.find((option) => option.value === value)
    const filtered = useMemo(() => {
        const query = search.trim().toLowerCase()
        if (!query) return options
        return options.filter((option) => option.label.toLowerCase().includes(query))
    }, [options, search])

    useEffect(() => {
        function onPointerDown(event: PointerEvent) {
            if (!ref.current?.contains(event.target as Node)) setOpen(false)
        }
        document.addEventListener("pointerdown", onPointerDown)
        return () => document.removeEventListener("pointerdown", onPointerDown)
    }, [])

    return (
        <div className="custom-select" ref={ref}>
            <button
                type="button"
                className="custom-select-button"
                onClick={() => setOpen((current) => !current)}
            >
                <span className="custom-select-value">{selected?.icon}{selected?.label ?? placeholder}</span>
                <ChevronDown size={18} />
            </button>
            {open ? (
                <div className="custom-select-menu">
                    {searchable ? (
                        <input
                            className="input"
                            value={search}
                            placeholder="Search"
                            onChange={(event) => setSearch(event.target.value)}
                        />
                    ) : null}
                    {filtered.map((option) => (
                        <button
                            type="button"
                            key={option.value}
                            className={`custom-select-option ${option.value === value ? "active" : ""}`}
                            onClick={() => {
                                onChange(option.value)
                                setOpen(false)
                                setSearch("")
                            }}
                        >
                            <span className="custom-select-value">{option.icon}{option.label}</span>
                        </button>
                    ))}
                    {filtered.length === 0 ? <div className="custom-select-option muted">No data</div> : null}
                </div>
            ) : null}
        </div>
    )
}
