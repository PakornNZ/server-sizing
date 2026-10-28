/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/app/lib/prisma"
import { CALCULATION_VERSION, calculateInference } from "@/app/lib/calculators"

function modelFor(type: string) {
    if (type === "llm-pick-model") return prisma.llmPickModelHistory
    if (type === "llm-server") return prisma.llmServerHistory
    if (type === "app-sizer") return prisma.appSizerHistory
    return null
}

export async function GET(_request: NextRequest, { params }: { params: Promise<{ type: string }> }) {
    const { type } = await params
    if (type === "llm-server") {
        const data = await prisma.llmServerHistory.findMany({
            where: { deletedAt: null },
            include: { matchedModels: true },
            orderBy: { createdAt: "desc" },
        })
        return NextResponse.json(data)
    }
    if (type === "app-sizer") {
        const data = await prisma.appSizerHistory.findMany({
            where: { deletedAt: null },
            include: { items: true },
            orderBy: { createdAt: "desc" },
        })
        return NextResponse.json(data)
    }
    const model = modelFor(type)
    if (!model) return NextResponse.json({ message: "Unknown history type" }, { status: 404 })
    const data = await (model as { findMany: Function }).findMany({ where: { deletedAt: null }, orderBy: { createdAt: "desc" } })
    return NextResponse.json(data)
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ type: string }> }) {
    const { type } = await params
    const body = await request.json()

    if (type === "llm-server" || type === "llm-pick-model") {
        try {
            if (body.calculationVersion !== CALCULATION_VERSION || typeof body.calculationSnapshot !== "string" || body.calculationSnapshot.length > 2_000_000) throw new Error("A v2 sizing snapshot is required")
            const snapshot = JSON.parse(body.calculationSnapshot)
            if (snapshot.version !== CALCULATION_VERSION || !Array.isArray(snapshot.calculations) || !snapshot.calculations.length || snapshot.calculations.length > 500) throw new Error("Invalid snapshot calculations")
            for (const calculation of snapshot.calculations) {
                const result = calculateInference(calculation.input)
                if (JSON.stringify(result) !== JSON.stringify(calculation.result)) throw new Error("Snapshot result does not match its inputs")
            }
            if (typeof body.name !== "string" || !body.name.trim()) throw new Error("History name is required")
            const first = snapshot.calculations[0].input
            if (body.contextTokens !== first.inputTokens + first.maxOutputTokens || body.concurrent !== first.concurrentSequences || body.quant !== first.weightFormat) throw new Error("History fields do not match snapshot")
            if (type === "llm-pick-model" && (snapshot.calculations.length !== 1 || body.status !== snapshot.calculations[0].result.memoryStatus)) throw new Error("Invalid model history status")
            if (type === "llm-server" && (body.matchedCount !== snapshot.calculations.length || !Array.isArray(body.matchedModels) || body.matchedModels.length !== body.matchedCount || body.matchedModels.some((row: { status: string }, index: number) => row.status !== snapshot.calculations[index].result.memoryStatus))) throw new Error("Matched models do not match snapshot")
        } catch (error) {
            return NextResponse.json({ message: error instanceof Error ? error.message : "Invalid history snapshot" }, { status: 400 })
        }
    }

    if (type === "llm-server") {
        const { matchedModels, ...data } = body
        const saved = await prisma.llmServerHistory.create({
            data: {
                ...data,
                matchedModels: { create: matchedModels ?? [] },
            },
        })
        return NextResponse.json(saved)
    }

    if (type === "app-sizer") {
        const { items, ...data } = body
        const saved = await prisma.appSizerHistory.create({
            data: {
                ...data,
                items: { create: items ?? [] },
            },
        })
        return NextResponse.json(saved)
    }

    const model = modelFor(type)
    if (!model) return NextResponse.json({ message: "Unknown history type" }, { status: 404 })
    const saved = await (model as { create: Function }).create({ data: body })
    return NextResponse.json(saved)
}
