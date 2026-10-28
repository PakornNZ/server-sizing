import fs from "node:fs/promises"
import path from "node:path"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const output = path.resolve(process.cwd(), "..", "metadata_completion_queue.md")
const supported = ["decoder_mha", "decoder_gqa", "decoder_mqa"]

function missingFields(model) {
    const missing = []
    if (model.totalParameters == null) missing.push("totalParameters")
    if (!supported.includes(model.architecture)) missing.push("architecture")
    for (const key of ["numHiddenLayers", "numAttentionHeads", "numKeyValueHeads"]) if (model[key] == null) missing.push(key)
    if (model.headDim == null && !(model.hiddenSize != null && model.numAttentionHeads != null && model.hiddenSize % model.numAttentionHeads === 0)) missing.push("headDim/hiddenSize")
    return missing
}

const models = await prisma.llmModel.findMany({
    where: { isActive: true, modelType: "llm" },
    orderBy: [{ parametersB: "desc" }, { model: "asc" }],
    select: { id: true, model: true, parametersB: true, totalParameters: true, architecture: true, numHiddenLayers: true, numAttentionHeads: true, numKeyValueHeads: true, headDim: true, hiddenSize: true, contextTokens: true, maxContextTokens: true, hfUrl: true },
})

const incomplete = models.filter((model) => missingFields(model).length)
const contextIssues = models.filter((model) => model.contextTokens != null && model.maxContextTokens != null && model.contextTokens > model.maxContextTokens)
const parameterIssues = models.filter((model) => model.totalParameters != null && Math.abs(model.totalParameters / 1e9 - model.parametersB) / model.parametersB > 0.2)
const source = (url) => url && url !== "--" ? `[source](${url})` : "Unknown"
const row = (model, fields, note = "เติม/ตรวจสอบ") => `| ${model.id} | ${model.model} | ${model.parametersB} | ${fields.join(", ")} | ${source(model.hfUrl)} | ${note} |`

const lines = [
    "# Metadata Completion Queue",
    "",
    "> Generated 2026-09-07 from active LLM catalog. Values must be verified against the cited first-party model config before updating the database.",
    "> `contextTokens` is the catalog/reference value. `maxContextTokens` is the model-config limit.",
    "",
    `## Missing Metadata (${incomplete.length})`,
    "",
    "| ID | Model | Parameters (B) | Missing fields | First-party source | Action |",
    "|---:|---|---:|---|---|---|",
    ...incomplete.map((model) => row(model, missingFields(model))),
    "",
    `## Context Conflicts (${contextIssues.length})`,
    "",
    "| ID | Model | Current catalog | Model max | First-party source | Action |",
    "|---:|---|---:|---:|---|---|",
    ...contextIssues.map((model) => `| ${model.id} | ${model.model} | ${model.contextTokens} | ${model.maxContextTokens} | ${source(model.hfUrl)} | Corrected to model max in DB |`),
    "",
    `## Parameter Conflicts (${parameterIssues.length})`,
    "",
    "| ID | Model | Catalog (B) | Metadata total (B) | First-party source | Action |",
    "|---:|---|---:|---:|---|---|",
    ...parameterIssues.map((model) => `| ${model.id} | ${model.model} | ${model.parametersB} | ${(model.totalParameters / 1e9).toFixed(2)} | ${source(model.hfUrl)} | Verify model ID/source mapping |`),
    "",
]

await fs.writeFile(output, `${lines.join("\n")}\n`, "utf8")
console.log(`Wrote ${output}`)
await prisma.$disconnect()
