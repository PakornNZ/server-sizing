import { NextResponse } from "next/server"
import { prisma } from "@/app/lib/prisma"

type DeletedRecord = {
    resource: string
    type: string
    id: string | number
    name: string
    summary: string
}

export async function GET() {
    const [models, gpus, dgxProfiles, dgxCapacities, apps] = await Promise.all([
        prisma.llmModel.findMany({ where: { isActive: false }, orderBy: { id: "asc" } }),
        prisma.gpu.findMany({ where: { isActive: false }, orderBy: { id: "asc" } }),
        prisma.dgxProfile.findMany({ where: { isActive: false }, orderBy: { id: "asc" } }),
        prisma.dgxCapacity.findMany({ where: { isActive: false }, orderBy: { id: "asc" } }),
        prisma.serverApp.findMany({ where: { isActive: false }, orderBy: { id: "asc" } }),
    ])

    const rows: DeletedRecord[] = [
        ...models.map((row) => ({
            resource: "models",
            type: "Model",
            id: row.id,
            name: row.model,
            summary: `${row.modelType} · ${row.provider} · ${row.parametersB}B`,
        })),
        ...gpus.map((row) => ({
            resource: "gpus",
            type: "GPU",
            id: row.id,
            name: row.name,
            summary: `${row.vendor} · ${row.vramGb}GB`,
        })),
        ...dgxProfiles.map((row) => ({
            resource: "dgxProfiles",
            type: "DGX Profile",
            id: row.id,
            name: row.label,
            summary: `${row.stackCount} stack · ${row.usableAiMemoryGb}GB usable`,
        })),
        ...dgxCapacities.map((row) => ({
            resource: "dgxCapacities",
            type: "DGX Capacity",
            id: row.id,
            name: `${row.useCase} ${row.modelBucketB}B`,
            summary: `Profile ${row.profileId} · ${row.supportedConcurrent} concurrent`,
        })),
        ...apps.map((row) => ({
            resource: "apps",
            type: "App",
            id: row.id,
            name: row.name,
            summary: [row.category, row.networkGbps ? `${row.networkGbps}Gbps` : null, `${row.cpuCores} CPU`, `${row.ramGb}GB RAM`].filter(Boolean).join(" · "),
        })),
    ]

    return NextResponse.json(rows)
}
