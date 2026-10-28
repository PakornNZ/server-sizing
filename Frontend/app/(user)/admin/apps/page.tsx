import AdminCrudPage from "@/app/components/AdminCrudPage"

export default function AdminAppsPage() {
    return <AdminCrudPage title="Apps" resource="apps" fields={[
        { key: "name", label: "Name", required: true },
        { key: "category", label: "Category" },
        { key: "iconName", label: "Icon Name", placeholder: "nginx" },
        { key: "iconBackground", label: "Icon Background", placeholder: "auto, light, or dark" },
        { key: "networkGbps", label: "Network Requirement (Gbps)", type: "number" },
        { key: "cpuCores", label: "CPU", type: "number", required: true },
        { key: "ramGb", label: "RAM GB", type: "number", required: true },
        { key: "storageGb", label: "Storage GB", type: "number", required: true },
        { key: "note", label: "Note", type: "textarea" },
    ]} />
}
