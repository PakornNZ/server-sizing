import { NextResponse } from "next/server"
import { prisma } from "@/app/lib/prisma"

export async function DELETE(_request: Request, { params }: { params: Promise<{ type: string, id: string }> }) {
    const { type, id } = await params
    const where = { id: Number(id) }
    const data = { deletedAt: new Date() }

    if (type === "llm-pick-model") return NextResponse.json(await prisma.llmPickModelHistory.update({ where, data }))
    if (type === "llm-server") return NextResponse.json(await prisma.llmServerHistory.update({ where, data }))
    if (type === "app-sizer") return NextResponse.json(await prisma.appSizerHistory.update({ where, data }))

    return NextResponse.json({ message: "Unknown history type" }, { status: 404 })
}
