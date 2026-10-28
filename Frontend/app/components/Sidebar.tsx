'use client'

import { Menu, PanelRightClose, PanelRightOpen } from "lucide-react"
import SidebarLists from "./SidebarLists"
import { useEffect, useRef, useState } from "react"
import ThemeModeToggle from "./ThemeModeToggle"

const SIDEBAR_STORAGE_KEY = "sidebar-open"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365
const SIDEBAR_TRANSITION_EVENT = "sidebar-transition"
const SIDEBAR_TRANSITION_MS = 300
const SIDEBAR_HEADER = "LLM"

function saveSidebarState(isOpen: boolean) {
    const value = String(isOpen)
    window.localStorage.setItem(SIDEBAR_STORAGE_KEY, value)
    window.document.cookie = `${SIDEBAR_STORAGE_KEY}=${value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}; SameSite=Lax`
}

function notifySidebarTransition() {
    window.dispatchEvent(new CustomEvent(SIDEBAR_TRANSITION_EVENT, { detail: { duration: SIDEBAR_TRANSITION_MS } }))
}

export default function Sidebar({ initialIsOpen = false }: { initialIsOpen?: boolean }) {
    const [isOpen, setIsOpen] = useState<boolean>(initialIsOpen)
    const [isCollapsed, setIsCollapsed] = useState<boolean>(!initialIsOpen)
    const collapseTimeoutRef = useRef<number | null>(null)

    useEffect(() => {
        const frameId = window.requestAnimationFrame(() => {
            saveSidebarState(initialIsOpen)
        })
        return () => {
            window.cancelAnimationFrame(frameId)
            if (collapseTimeoutRef.current !== null) {
                window.clearTimeout(collapseTimeoutRef.current)
            }
        }
    }, [initialIsOpen])

    function openSidebar() {
        if (collapseTimeoutRef.current !== null) {
            window.clearTimeout(collapseTimeoutRef.current)
        }
        notifySidebarTransition()
        saveSidebarState(true)
        setIsCollapsed(false)
        setIsOpen(true)
    }

    function closeSidebar() {
        if (collapseTimeoutRef.current !== null) {
            window.clearTimeout(collapseTimeoutRef.current)
        }
        notifySidebarTransition()
        saveSidebarState(false)
        setIsOpen(false)
        collapseTimeoutRef.current = window.setTimeout(() => {
            setIsCollapsed(true)
            collapseTimeoutRef.current = null
        }, 300)
    }

    function toggleSidebar() {
        if (isOpen) {
            closeSidebar()
            return
        }
        openSidebar()
    }

    return (
        <>
            <button
                type="button"
                className="mobile-sidebar-button"
                aria-label="Open sidebar"
                data-open={isOpen}
                onClick={openSidebar}
            >
                <Menu />
            </button>
            <button
                type="button"
                className="sidebar-backdrop"
                aria-label="Close sidebar"
                data-open={isOpen}
                onClick={closeSidebar}
            />
            <div className="sidebar" data-open={isOpen} data-collapsed={isCollapsed}>
                <div className="sidebar-header">
                    {isOpen ? (
                        <>
                            <div className="sidebar-logo-toggle">
                                {/* <span className="sidebar-logo-mark">L</span> */}
                                <h1 className="sidebar-title" data-open={isOpen}>
                                    {SIDEBAR_HEADER}
                                </h1>
                            </div>
                            <button
                                type="button"
                                className="toggle-button"
                                aria-label="sidebar-button"
                                onClick={toggleSidebar}
                            >
                                <PanelRightOpen />
                            </button>
                        </>
                    ) : (
                        <div className="sidebar-logo-toggle">
                            <button
                                type="button"
                                className="toggle-button sidebar-logo-button"
                                aria-label="sidebar-button"
                                onClick={toggleSidebar}
                            >
                                    {/* <span className="sidebar-logo-mark">L</span> */}
                                    <PanelRightClose />
                                </button>
                        </div>
                    )}
                </div>
                <SidebarLists isOpen={isOpen} />
                <div className="sidebar-footer">
                    <ThemeModeToggle isOpen={isOpen} />
                </div>
            </div>
        </>
    )
}
