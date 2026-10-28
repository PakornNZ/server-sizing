import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const supportedTypes = new Set(["qwen2", "qwen3", "qwen3_moe", "llama", "mistral", "mistral3", "ministral3", "mixtral", "gpt_oss"])

function findConfig(value) {
    if (!value || typeof value !== "object") return null
    if (value.num_hidden_layers != null && value.num_attention_heads != null) return value
    for (const child of Object.values(value)) {
        const found = findConfig(child)
        if (found) return found
    }
    return null
}

function architecture(root, config) {
    const type = String(config.model_type ?? root.model_type ?? "")
    if (!supportedTypes.has(type)) return null
    const q = Number(config.num_attention_heads)
    const kv = Number(config.num_key_value_heads)
    if (!Number.isSafeInteger(q) || !Number.isSafeInteger(kv) || kv < 1 || q % kv !== 0) return null
    return q === kv ? "decoder_mha" : kv === 1 ? "decoder_mqa" : "decoder_gqa"
}

const models = await prisma.llmModel.findMany({
    where: { isActive: true, modelType: "llm", hfUrl: { startsWith: "https://huggingface.co/" }, revision: { not: null } },
    select: { id: true, model: true, hfUrl: true, revision: true },
})
let fetched = 0
let updated = 0
for (const model of models) {
    const base = model.hfUrl.endsWith("/") ? model.hfUrl.slice(0, -1) : model.hfUrl
    const metadataSource = `${base}/resolve/${model.revision}/config.json`
    const response = await fetch(metadataSource)
    if (!response.ok) continue
    const root = await response.json()
    const config = findConfig(root)
    const normalizedArchitecture = config && architecture(root, config)
    if (!config || !normalizedArchitecture) continue
    fetched += 1
    const q = Number(config.num_attention_heads)
    const hiddenSize = Number(config.hidden_size)
    const headDim = Number(config.head_dim)
    const data = {
        architecture: normalizedArchitecture,
        numHiddenLayers: Number(config.num_hidden_layers),
        numAttentionHeads: q,
        numKeyValueHeads: Number(config.num_key_value_heads),
        ...(Number.isSafeInteger(headDim) && headDim > 0 ? { headDim } : {}),
        ...(Number.isSafeInteger(hiddenSize) && hiddenSize > 0 ? { hiddenSize } : {}),
        ...(Number.isSafeInteger(Number(config.max_position_embeddings)) ? { maxContextTokens: Number(config.max_position_embeddings) } : {}),
        metadataSource,
        verifiedAt: "2026-09-07",
    }
    await prisma.llmModel.update({ where: { id: model.id }, data })
    updated += 1
}
console.log(JSON.stringify({ models: models.length, completeConfigs: fetched, updated }, null, 2))
await prisma.$disconnect()
