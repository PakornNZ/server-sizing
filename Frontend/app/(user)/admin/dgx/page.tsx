import AdminCrudPage from "@/app/components/AdminCrudPage"

export default function AdminDgxPage() {
    return (
        <section className="page-stack">
            <AdminCrudPage title="DGX Profiles" resource="dgxProfiles" fields={[
                { key: "stackCount", label: "Stack", type: "number", required: true },
                { key: "label", label: "Label", required: true },
                { key: "unifiedMemoryGb", label: "Total Physical Unified Memory (GB, all nodes)", type: "number", required: true },
                { key: "usableAiMemoryGb", label: "Total Final Usable Budget (GB, all nodes)", type: "number", required: true },
                { key: "maxModelB", label: "Reference Claim (B, not a hard limit)", type: "number", required: true },
                { key: "interconnect", label: "Interconnect" },
            ]} />
            <p className="muted">Legacy buckets below have no benchmark provenance and are excluded from sizing. Editing them does not verify performance or supported concurrency.</p>
            <AdminCrudPage title="Legacy DGX Capacity (Unused)" resource="dgxCapacities" fields={[
                { key: "profileId", label: "Profile ID", type: "number", required: true },
                { key: "modelBucketB", label: "Model Bucket B", type: "number", required: true },
                { key: "useCase", label: "Use Case", required: true },
                { key: "supportedConcurrent", label: "Legacy Unverified Concurrency", type: "number", required: true },
            ]} />
        </section>
    )
}
