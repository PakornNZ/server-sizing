'use client'

import Link from "next/link"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

type SidebarItem = {
    name: string
    href: string
    icon: React.ReactNode
    subItems?: { name: string, href: string, icon: React.ReactNode }[]
}

interface SidebarListProps {
    isOpen: boolean
    list: SidebarItem[]
    active: string
}

function isRouteActive(active: string, href: string) {
    if (href === "/") return active === "/"
    return active === href || active.startsWith(`${href}/`)
}

function getActiveSubItemHref(active: string, subItems: SidebarItem["subItems"]) {
    return subItems
        ?.filter((subItem) => isRouteActive(active, subItem.href))
        .sort((a, b) => b.href.length - a.href.length)[0]?.href
}

function SidebarListItem({ isOpen, item, active }: { isOpen: boolean, item: SidebarItem, active: string }) {
    const hasSubItems = Boolean(item.subItems?.length)
    const activeSubItemHref = getActiveSubItemHref(active, item.subItems)
    const hasActiveSubItem = Boolean(activeSubItemHref)
    const isActive = isRouteActive(active, item.href) || hasActiveSubItem
    const [isSublistOpen, setIsSublistOpen] = useState(false)
    const isExpanded = isOpen && hasSubItems && isSublistOpen
    const href = hasSubItems ? item.subItems![0].href : item.href
    
    function handleParentClick() {
        if (!hasSubItems) return
        setIsSublistOpen(!isExpanded)
    }

    function handleChevronClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault()
        event.stopPropagation()
        setIsSublistOpen(!isExpanded)
    }

    return (
        <div className="sidebar-list-item" data-has-subitems={hasSubItems} data-expanded={isExpanded}>
            <div className="sidebar-parent-row">
                <Link
                    href={href}
                    className={`sidebar-link ${isActive ? 'active' : ''}`}
                    data-tooltip={item.name}
                    aria-label={item.name}
                    aria-expanded={hasSubItems ? isExpanded : undefined}
                    onClick={handleParentClick}
                >
                    <span className="sidebar-icon">{item.icon}</span>
                    {isOpen ? (
                        <span className="sidebar-text" aria-hidden="false">{item.name}</span>
                    ) : (
                        <span className="sidebar-text" aria-hidden="true">{item.name}</span>
                    )}
                </Link>

                {isOpen && hasSubItems && (
                    <button
                        type="button"
                        className="sidebar-chevron"
                        aria-label={`${isExpanded ? "Close" : "Open"} ${item.name} submenu`}
                        aria-expanded={isExpanded}
                        onClick={handleChevronClick}
                    >
                        <ChevronDown />
                    </button>
                )}
            </div>

            {isExpanded && item.subItems && (
                <ul className="sidebar-sublist">
                    {item.subItems.map((subItem) => {
                        const isSubActive = activeSubItemHref === subItem.href

                        return (
                            <li key={subItem.href}>
                                <Link
                                    href={subItem.href}
                                    className={`sidebar-sublink ${isSubActive ? 'active' : ''}`}
                                    aria-label={subItem.name}
                                >
                                    <span className="sidebar-icon">{subItem.icon}</span>
                                    <span className="sidebar-subtext">{subItem.name}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}

export default function SidebarList({ isOpen, list, active }: SidebarListProps) {
    return (
        <div className="sidebar-list">
            {list.map((item) => (
                <SidebarListItem key={`${item.href}-${isOpen}`} isOpen={isOpen} item={item} active={active} />
            ))}
        </div>
    )
}
