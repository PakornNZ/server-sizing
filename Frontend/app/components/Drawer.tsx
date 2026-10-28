'use client'

import { X } from "lucide-react"

export default function Drawer({
    title,
    actions,
    open,
    children,
    onClose,
}: {
    title: string
    actions?: React.ReactNode
    open: boolean
    children: React.ReactNode
    onClose: () => void
}) {
    if (!open) return null

    return (
        <>
            <button
                type="button"
                aria-label="Close drawer"
                className="drawer-backdrop"
                onClick={onClose}
            />
            <aside className="drawer" aria-label={title}>
                <div className="drawer-header">
                    <h2>{title}</h2>
                    <button type="button" className="drawer-close-button" onClick={onClose} aria-label="Close">
                        <X size={20} />
                    </button>
                </div>
                <div className="drawer-body">
                    {children}
                </div>
                {actions ? (
                    <div className="drawer-footer">
                        {actions}
                    </div>
                ) : null}
            </aside>
        </>
    )
}
