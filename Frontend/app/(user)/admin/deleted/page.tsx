'use client'

import { useEffect, useState } from "react"
import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnDef,
    type ColumnFiltersState,
    type RowSelectionState,
    type SortingState,
} from "@tanstack/react-table"
import Loading from "@/app/components/Loading"
import Table from "@/app/components/Table/Table"

type DeletedRecord = {
    resource: string
    type: string
    id: string | number
    name: string
    summary: string
}

export default function DeletedRecordsPage() {
    const [rows, setRows] = useState<DeletedRecord[]>([])
    const [loading, setLoading] = useState(true)
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [globalFilter, setGlobalFilter] = useState("")
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

    async function load() {
        setLoading(true)
        const data = await fetch("/api/admin/deleted").then((response) => response.json())
        setRows(data)
        setLoading(false)
    }

    useEffect(() => {
        load()
    }, [])

    async function restoreSelected() {
        const selected = table.getSelectedRowModel().rows.map((row) => row.original)
        if (selected.length === 0 || !window.confirm(`Restore ${selected.length} selected record(s)?`)) return
        await Promise.all(selected.map((row) => fetch(`/api/admin/${row.resource}/${row.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isActive: true }),
        })))
        setRowSelection({})
        await load()
    }

    const columns: ColumnDef<DeletedRecord>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <input
                    type="checkbox"
                    className="table-checkbox"
                    checked={table.getIsAllPageRowsSelected()}
                    onChange={table.getToggleAllPageRowsSelectedHandler()}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <input
                    type="checkbox"
                    className="table-checkbox"
                    checked={row.getIsSelected()}
                    onChange={row.getToggleSelectedHandler()}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            meta: { width: 48, align: "center" },
        },
        { accessorKey: "type", header: "Type", cell: ({ row }) => <span className="table-chip table-chip-gray">{String(row.original.type).toUpperCase()}</span> },
        { accessorKey: "id", header: "ID", cell: ({ row }) => <span className="font-mono text-slate-500 text-xs">#{row.original.id}</span> },
        { accessorKey: "name", header: "Name" },
        { accessorKey: "summary", header: "Summary" },
        { id: "status", header: "Status", cell: () => <span className="table-chip table-chip-gray">Inactive</span> },
    ]

    const table = useReactTable({
        data: rows,
        columns,
        state: { sorting, columnFilters, globalFilter, rowSelection },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        onRowSelectionChange: setRowSelection,
        getRowId: (row) => `${row.resource}:${row.id}`,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    if (loading) return <Loading />

    return (
        <section className="page-stack table-page">
            <div className="page-title-row"><h1>Deleted Records</h1></div>
            <Table
                table={table}
                header={<>
                    <div className="table-search"><input className="table-search-input" placeholder="Search" value={globalFilter} onChange={(event) => setGlobalFilter(event.target.value)} /></div>
                    {Object.keys(rowSelection).length > 0 ? <button type="button" id="confirm" onClick={restoreSelected}>Restore selected</button> : null}
                </>}
            />
        </section>
    )
}
