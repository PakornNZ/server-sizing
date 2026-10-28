import { CheckCircle2, XCircle, AlertTriangle, Sparkles } from "lucide-react"

export default function StatusBadge({ 
    status, 
    size = "md", 
    iconOnly = false,
    tooltip
}: { 
    status: string, 
    size?: "sm" | "md" | "lg", 
    iconOnly?: boolean,
    tooltip?: string
}) {
    const s = status.toLowerCase().trim()
    
    let chipColor = "table-chip-gray"
    let icon = null
    let display = status

    if (s.includes("partition")) {
        chipColor = "table-chip-yellow"
        icon = <AlertTriangle size={size === "lg" ? 15 : size === "sm" ? 12 : 13} />
        display = "Needs Partition"
    } else if (s.includes("fit") && !s.includes("does not fit") && !s.includes("not fit")) {
        chipColor = "table-chip-green"
        icon = <CheckCircle2 size={size === "lg" ? 15 : size === "sm" ? 12 : 13} />
        display = s.includes("estimated") ? "Fits (Estimated)" : "Fits"
    } else if (s.includes("does not fit") || s.includes("not fit") || s.includes("not supported") || s.includes("not-recommended") || s.includes("invalid") || s.includes("error")) {
        chipColor = "table-chip-red"
        icon = <XCircle size={size === "lg" ? 15 : size === "sm" ? 12 : 13} />
        display = s.includes("invalid") ? "Invalid Inputs" : "Does Not Fit"
    } else if (s.includes("unknown") || s.includes("validation") || s.includes("borderline")) {
        chipColor = "table-chip-yellow"
        icon = <AlertTriangle size={size === "lg" ? 15 : size === "sm" ? 12 : 13} />
        display = s.includes("validation") ? "Needs Validation" : "Unknown"
    } else if (s.includes("v2") || s.includes("snapshot")) {
        chipColor = "table-chip-blue"
        icon = <Sparkles size={size === "lg" ? 15 : size === "sm" ? 12 : 13} />
    }

    const tooltipText = tooltip || (s.includes("partition") ? "Needs Partition: Multi-GPU inference requires an explicit tensor/pipeline partition plan" : "")

    if (iconOnly) {
        const dimClass = size === "lg" ? "w-7 h-7" : size === "sm" ? "w-[22px] h-[22px]" : "w-6 h-6"
        return (
            <span 
                className={`table-chip ${chipColor} ${dimClass} p-0 inline-flex items-center justify-center shrink-0 cursor-help transition-transform hover:scale-105 ${tooltipText ? "has-tooltip" : ""}`}
                data-tooltip={tooltipText || undefined}
            >
                {icon}
            </span>
        )
    }

    const sizeClasses = size === "lg" 
        ? "px-3 py-1 text-sm font-semibold gap-1.5 h-7" 
        : size === "sm" 
        ? "px-2 py-0.5 text-[11px] font-medium gap-1 h-[22px]" 
        : "px-2.5 py-0.5 text-xs font-medium gap-1.5 h-6"

    return (
        <span 
            className={`table-chip ${chipColor} ${sizeClasses} inline-flex items-center shrink-0 leading-none ${tooltipText ? "has-tooltip" : ""}`}
            data-tooltip={tooltipText || undefined}
        >
            {icon && <span className="inline-flex shrink-0 items-center justify-center">{icon}</span>}
            <span className="truncate">{display}</span>
        </span>
    )
}
