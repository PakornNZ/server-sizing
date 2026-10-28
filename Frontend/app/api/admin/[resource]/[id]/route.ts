/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/app/lib/prisma"
import { validateCatalogData } from "@/app/lib/catalog-validation"

const models = {
    models: prisma.llmModel,
    gpus: prisma.gpu,
    apps: prisma.serverApp,
    dgxProfiles: prisma.dgxProfile,
    dgxCapacities: prisma.dgxCapacity,
} as const

function delegate(resource: string) {
    return models[resource as keyof typeof models]
}

function parseId(resource: string, id: string) {
    return resource === "gpus" ? id : Number(id)
}

function normalizeData(resource: string, data: Record<string, unknown>) {
    if (resource !== "apps") return data
    return {
        ...data,
        iconName: data.iconName === "" ? null : data.iconName,
        iconBackground: ["auto", "light", "dark"].includes(String(data.iconBackground)) ? data.iconBackground : "auto",
    }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ resource: string, id: string }> }) {
    const { resource, id } = await params
    const model = delegate(resource)
    if (!model) return NextResponse.json({ message: "Unknown resource" }, { status: 404 })
    const saved = await (model as any).update({ where: { id: parseId(resource, id) }, data: { isActive: false } })
    return NextResponse.json(saved)
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ resource: string, id: string }> }) {
    const { resource, id } = await params
    const model = delegate(resource)
    if (!model) return NextResponse.json({ message: "Unknown resource" }, { status: 404 })
    const body = await request.json()
    try {
        const existing = await (model as any).findUnique({ where: { id: parseId(resource, id) } })
        if (!existing) return NextResponse.json({ message: "Record not found" }, { status: 404 })
        validateCatalogData(resource, { ...existing, ...body })
    } catch (error) {
        return NextResponse.json({ message: error instanceof Error ? error.message : "Invalid catalog data" }, { status: 400 })
    }
    const saved = await (model as any).update({ where: { id: parseId(resource, id) }, data: normalizeData(resource, body) })
    return NextResponse.json(saved)
}
