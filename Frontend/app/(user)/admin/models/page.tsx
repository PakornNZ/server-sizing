import AdminCrudPage from "@/app/components/AdminCrudPage"
import { metadataNumbers, metadataStrings } from "@/app/lib/calculators"

export default function AdminModelsPage() {
    return <AdminCrudPage title="Model Data" resource="models" fields={[
        { key: "rank", label: "Rank", type: "number" },
        { key: "model", label: "Model", required: true },
        { key: "modelType", label: "Type", required: true },
        { key: "provider", label: "Provider", required: true },
        { key: "contextTokens", label: "Context", type: "number" },
        { key: "parametersB", label: "Parameters B", type: "number", required: true },
        { key: "intelligence", label: "Intelligence", type: "number" },
        { key: "coding", label: "Coding", type: "number" },
        { key: "agentic", label: "Agentic", type: "number" },
        { key: "gpqa", label: "GPQA", type: "number" },
        { key: "hle", label: "HLE", type: "number" },
        { key: "lcr", label: "LCR", type: "number" },
        { key: "hfDownloads", label: "HF Downloads", type: "number" },
        { key: "hfLikes", label: "HF Likes", type: "number" },
        { key: "hfUrl", label: "HF URL", type: "url" },
        ...metadataNumbers.map((key) => ({ key, label: `${key} (nullable)`, type: "number" as const, hiddenInTable: true })),
        ...metadataStrings.map((key) => ({ key, label: `${key} (nullable)`, placeholder: key === "architecture" ? "decoder_mha, decoder_gqa, decoder_mqa, mla, sliding_window, hybrid, encoder, multimodal" : undefined, hiddenInTable: true })),
    ]} />
}
