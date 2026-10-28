import { NextResponse } from "next/server"
import { prisma } from "@/app/lib/prisma"

export async function GET() {
    const [models, gpus, dgxProfiles, apps] = await Promise.all([
        prisma.llmModel.findMany({ where: { isActive: true }, orderBy: [{ rank: "asc" }, { intelligence: "desc" }] }),
        prisma.gpu.findMany({ where: { isActive: true }, orderBy: [{ vendor: "asc" }, { vramGb: "asc" }] }),
        prisma.dgxProfile.findMany({ where: { isActive: true }, orderBy: { stackCount: "asc" } }),
        prisma.serverApp.findMany({ where: { isActive: true }, orderBy: { name: "asc" } }),
    ])

    models.sort((a, b) => (a.rank === null ? 1 : b.rank === null ? -1 : a.rank - b.rank) || (b.intelligence ?? -1) - (a.intelligence ?? -1))

    return NextResponse.json({ models, gpus, dgxProfiles, apps })
}
