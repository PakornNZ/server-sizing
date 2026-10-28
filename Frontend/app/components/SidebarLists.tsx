'use client'

import { Bot, Cpu, Database, Gauge, LayoutGrid, Server, Sparkles, Trash2 } from "lucide-react"
import { usePathname } from "next/navigation"
import SidebarList from "./SidebarList"
import { SidebarState } from "../types/interface"

export default function SidebarLists({ isOpen }: SidebarState) {
    const pathname = usePathname()
    const tools = [
        { name: "LLM Sizer", href: "/", icon: <Bot /> },
        { name: "App Sizer", href: "/app-sizer", icon: <Server /> },
        { name: "Models", href: "/models", icon: <LayoutGrid /> },
    ]
    const admin = [
        { name: "Model Data", href: "/admin/models", icon: <Database /> },
        { name: "GPUs", href: "/admin/gpus", icon: <Cpu /> },
        { name: "DGX", href: "/admin/dgx", icon: <Sparkles /> },
        { name: "Apps", href: "/admin/apps", icon: <Gauge /> },
        { name: "Deleted Records", href: "/admin/deleted", icon: <Trash2 /> },
    ]

    return (
        <div className="sidebar-list-container">
            <span className="sidebar-list-title">Tools</span>
            <SidebarList isOpen={isOpen} list={tools} active={pathname} />
            <span className="sidebar-list-title">Admin</span>
            <SidebarList isOpen={isOpen} list={admin} active={pathname} />
        </div>
    )
}
