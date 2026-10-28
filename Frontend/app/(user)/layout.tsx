import { cookies } from "next/headers"
import Sidebar from "@/app/components/Sidebar"
import "@/app/style/sections.css"

export default async function UserPageLayout ({ children }: Readonly<{ children: React.ReactNode; }>) {
    const cookieStore = await cookies()
    const initialSidebarOpen = cookieStore.get("sidebar-open")?.value === "true"

    return (
        <section className="app-shell">
            <Sidebar initialIsOpen={initialSidebarOpen} />
            <main className="app-main">
                {children}
            </main>
        </section>
    )
}