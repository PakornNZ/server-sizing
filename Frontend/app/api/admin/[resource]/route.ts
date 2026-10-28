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

function normalizeData(resource: string, data: Record<string, unknown>) {
    if (resource !== "apps") return data
    return {
        ...data,
        iconName: data.iconName === "" ? null : data.iconName,
        iconBackground: ["auto", "light", "dark"].includes(String(data.iconBackground)) ? data.iconBackground : "auto",
    }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ resource: string }> }) {
    const { resource } = await params
    const model = delegate(resource)
    if (!model) return NextResponse.json({ message: "Unknown resource" }, { status: 404 })
    const includeInactive = request.nextUrl.searchParams.get("includeInactive") === "true"
    const data = await (model as any).findMany({
        where: includeInactive ? undefined : { isActive: true },
        orderBy: { id: "asc" },
    })
    return NextResponse.json(data)
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ resource: string }> }) {
    const { resource } = await params
    const model = delegate(resource)
    if (!model) return NextResponse.json({ message: "Unknown resource" }, { status: 404 })
    const body = await request.json()
    const { id, ...data } = body
    const normalized = normalizeData(resource, data)
    try {
        const existing = id ? await (model as any).findUnique({ where: { id } }) : {}
        validateCatalogData(resource, { ...existing, ...normalized })
    } catch (error) {
        return NextResponse.json({ message: error instanceof Error ? error.message : "Invalid catalog data" }, { status: 400 })
    }
    const saved = id
        ? await (model as any).update({ where: { id }, data: normalized })
        : await (model as any).create({ data: normalized })
    return NextResponse.json(saved)
}
