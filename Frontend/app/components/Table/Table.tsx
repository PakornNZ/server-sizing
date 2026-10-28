'use client'

import { flexRender, type Header, type Row, type Table as TanTable } from "@tanstack/react-table"
import { ChevronLeft, ChevronRight, ChevronUp, ChevronsUpDown } from "lucide-react"
import { createPortal } from "react-dom"
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react"
import "@/app/style/table.css"

type ColumnMeta = {
    align?: "left" | "center" | "right"
    headerClassName?: string
    cellClassName?: string
    minWidth?: number | string
    width?: number | string
    maxWidth?: number | string
}

const getAlignClass = (align?: ColumnMeta["align"]) => align ? `table-align-${align}` : ""

export default function Table<TData,>({
    table,
    header,
    onRowClick,
}: {
    table: TanTable<TData>
    header?: ReactNode
    onRowClick?: (row: Row<TData>) => void
}) {
    const rows = table.getRowModel().rows
    const leafColumns = table.getAllLeafColumns()
    const [pageSizeOpen, setPageSizeOpen] = useState(false)
    const [pageSizePos, setPageSizePos] = useState<{ top: number; left: number } | null>(null)
    const pageSizeRef = useRef<HTMLDivElement | null>(null)

    const updatePageSizePos = () => {
        const el = pageSizeRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        setPageSizePos({ top: rect.top - 6, left: rect.right })
    }

    useEffect(() => {
        if (!pageSizeOpen) return
        updatePageSizePos()

        const onPointerDown = (event: PointerEvent) => {
            const target = event.target as HTMLElement | null
            if (!target) return
            if (pageSizeRef.current?.contains(target)) return
            if (document.querySelector(".table-page-size-popup")?.contains(target)) return
            setPageSizeOpen(false)
        }
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setPageSizeOpen(false)
        }
        const onReposition = () => updatePageSizePos()

        document.addEventListener("pointerdown", onPointerDown)
        document.addEventListener("keydown", onKeyDown)
        window.addEventListener("resize", onReposition)
        window.addEventListener("scroll", onReposition, true)
        return () => {
            document.removeEventListener("pointerdown", onPointerDown)
            document.removeEventListener("keydown", onKeyDown)
            window.removeEventListener("resize", onReposition)
            window.removeEventListener("scroll", onReposition, true)
        }
    }, [pageSizeOpen])

    useLayoutEffect(() => {
        if (!pageSizeOpen || !pageSizePos) return
        const popup = document.querySelector(".table-page-size-popup") as HTMLElement | null
        if (!popup) return
        popup.style.top = `${pageSizePos.top}px`
        popup.style.left = `${pageSizePos.left}px`
    }, [pageSizeOpen, pageSizePos])

    const handleSortClick = (header: Header<TData, unknown>) => {
        const currentSort = header.column.getIsSorted()
        if (!currentSort) header.column.toggleSorting(false)
        else if (currentSort === "asc") header.column.toggleSorting(true)
        else header.column.toggleSorting(false)
    }

    const tableCount = table.getPrePaginationRowModel().rows.length

    return (
        <div className="table-container">
            <div className="table-wrapper">
                {header ? <div className="table-header">{header}</div> : null}
            <div className="table-scroll">
                <table className="table">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    const canSort = header.column.getCanSort()
                                    const sortDir = header.column.getIsSorted()
                                    const meta = header.column.columnDef.meta as ColumnMeta | undefined
                                    const headerClass = [getAlignClass(meta?.align ?? "left"), meta?.headerClassName, canSort ? "table-header-sortable" : ""].filter(Boolean).join(" ")

                                    return (
                                        <th
                                            key={header.id}
                                            onClick={canSort ? () => handleSortClick(header) : undefined}
                                            className={headerClass}
                                            style={{ width: meta?.width, minWidth: meta?.minWidth, maxWidth: meta?.maxWidth }}
                                        >
                                            <div className="table-header-inner">
                                                <span>{header.isPlaceholder ? "" : flexRender(header.column.columnDef.header, header.getContext())}</span>
                                                {canSort ? (
                                                    <span className={`table-sort-control soft-svg ${sortDir ? "active" : ""}`}>
                                                        {sortDir ? <ChevronUp className={`table-sort-icon ${sortDir === "asc" ? "table-sort-icon--asc" : ""}`} /> : <ChevronsUpDown />}
                                                    </span>
                                                ) : null}
                                            </div>
                                        </th>
                                    )
                                })}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {rows.length === 0 ? (
                            <tr>
                                <td colSpan={leafColumns.length} className="table-cell-empty">No data</td>
                            </tr>
                        ) : rows.map((row) => (
                            <tr key={row.id} className={onRowClick ? "table-row-clickable" : ""} onClick={onRowClick ? () => onRowClick(row) : undefined}>
                                {row.getVisibleCells().map((cell) => {
                                    const meta = cell.column.columnDef.meta as ColumnMeta | undefined
                                    const cellClass = [getAlignClass(meta?.align ?? "left"), meta?.cellClassName].filter(Boolean).join(" ")
                                    return (
                                        <td key={cell.id} className={cellClass} style={{ width: meta?.width, minWidth: meta?.minWidth, maxWidth: meta?.maxWidth }}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    )
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="table-pagination">
                <div>
                    <button type="button" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} aria-label="Previous page"><ChevronLeft /></button>
                    <p>
                        <input
                            type="number"
                            min={1}
                            max={Math.max(table.getPageCount(), 1)}
                            value={table.getState().pagination.pageIndex + 1}
                            onChange={(event) => {
                                const maxPage = Math.max(table.getPageCount() - 1, 0)
                                let page = Number(event.target.value) - 1
                                if (Number.isNaN(page)) page = 0
                                table.setPageIndex(Math.min(Math.max(page, 0), maxPage))
                            }}
                            aria-label="Page number"
                        />
                        / {Math.max(table.getPageCount(), 1)}
                    </p>
                    <button type="button" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} aria-label="Next page"><ChevronRight /></button>
                </div>
                <div>
                    <span>{tableCount} {tableCount === 1 ? "item" : "items"}</span>
                    <div className="table-page-size" ref={pageSizeRef}>
                        <span className="table-page-size-label">Rows per page</span>
                        <button type="button" className="table-page-size-btn" onClick={() => setPageSizeOpen((current) => !current)} aria-label="Rows per page">
                            {table.getState().pagination.pageSize}
                        </button>
                    </div>
                </div>
            </div>

            {pageSizeOpen && pageSizePos ? createPortal(
                <ul className="table-page-size-popup" role="menu">
                    {[20, 50, 100, 200].map((size) => (
                        <li key={size} role="menuitem" className={`table-page-size-item ${table.getState().pagination.pageSize === size ? "active" : ""}`} onClick={() => { table.setPageSize(size); setPageSizeOpen(false) }}>
                            {size}
                        </li>
                    ))}
                </ul>,
                document.body,
            ) : null}
            </div>
        </div>
    )
}
