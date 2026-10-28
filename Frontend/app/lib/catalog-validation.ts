import { metadataNumbers, metadataStrings, validateModelMetadata, type ModelMetadata } from "./calculators"

export function validateCatalogData(resource: string, data: Record<string, unknown>) {
    if (resource === "models") {
        validateModelMetadata(data as ModelMetadata)
        for (const key of ["model", "modelType", "provider"]) if (typeof data[key] !== "string" || !String(data[key]).trim()) throw new Error(`${key} is required`)
        for (const key of ["parametersB", "contextTokens", ...metadataNumbers]) {
            const value = data[key]
            if (value != null && (typeof value !== "number" || !Number.isFinite(value) || value <= 0)) throw new Error(`${key} must be positive or null`)
        }
        if (data.parametersB == null) throw new Error("parametersB is required for catalog display/filtering")
        for (const key of metadataStrings) if (data[key] === "") throw new Error(`${key}: use null for missing metadata`)
    }
    if (resource === "gpus" || resource === "dgxProfiles") {
        for (const key of resource === "gpus" ? ["vramGb"] : ["stackCount", "unifiedMemoryGb", "usableAiMemoryGb", "maxModelB"]) {
            const value = data[key]
            if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) throw new Error(`${key} must be positive`)
        }
        if (resource === "dgxProfiles" && (!Number.isSafeInteger(data.stackCount) || Number(data.usableAiMemoryGb) > Number(data.unifiedMemoryGb))) throw new Error("Invalid DGX stack count or final budget")
    }
}
