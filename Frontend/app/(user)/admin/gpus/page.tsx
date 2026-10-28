import AdminCrudPage from "@/app/components/AdminCrudPage"

export default function AdminGpusPage() {
    return <AdminCrudPage title="GPUs" resource="gpus" fields={[
        { key: "id", label: "ID", required: true },
        { key: "vendor", label: "Vendor", required: true },
        { key: "name", label: "Name", required: true },
        { key: "className", label: "Class", required: true },
        { key: "vramGb", label: "VRAM GB", type: "number", required: true },
    ]} />
}
