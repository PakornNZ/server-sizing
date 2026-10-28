'use client'

import { Cpu } from "lucide-react"
import { Server } from "lucide-react"
import Image from "next/image"
import type { ComponentType, SVGProps } from "react"
import { useState } from "react"
import {
    Alibaba,
    Anthropic,
    Baai,
    Deepseek,
    Google,
    HuggingFace,
    Intel,
    Meta,
    Microsoft,
    Mistral,
    Nginx,
    Nvidia,
    Openai,
    Postgresql,
    Qwen,
    Amd,
    Apple,
    Qdrant,
} from "@thesvg/react"

type SvgComponent = ComponentType<SVGProps<SVGSVGElement>>

const logoMap: Record<string, SvgComponent> = {
    alibaba: Alibaba,
    baai: Baai,
    anthropic: Anthropic,
    deepseek: Deepseek,
    google: Google,
    huggingface: HuggingFace,
    meta: Meta,
    microsoft: Microsoft,
    mistral: Mistral,
    mistralai: Mistral,
    nvidia: Nvidia,
    openai: Openai,
    qwen: Qwen,
    amd: Amd,
    intel: Intel,
    apple: Apple,
    nginx: Nginx,
    nginxproxy: Nginx,
    postgresql: Postgresql,
    postgres: Postgresql,
    qdrant: Qdrant,
    vectordb: Qdrant,
}

function keyFor(name: string) {
    const key = name.toLowerCase().replace(/[^a-z0-9]+/g, "")
    if (key === "typhoon" || key === "scb10x") return ""
    return key
}

function LogoBox({ name, size = "sm" }: { name: string | null | undefined, size?: "xs" | "sm" | "md" }) {
    const Logo = name ? logoMap[keyFor(name)] : undefined
    const sizeClass = size === "xs" ? "xs-logo" : size === "sm" ? "small-logo" : ""
    const iconSize = size === "xs" ? 11 : size === "sm" ? 14 : 18
    return (
        <span className={`logo-box ${sizeClass}`}>
            {Logo ? <Logo aria-hidden="true" /> : <Cpu size={iconSize} />}
        </span>
    )
}

export default function ProviderLogo({ name, small = true, size }: { name: string | null | undefined, small?: boolean, size?: "xs" | "sm" | "md" }) {
    const resolvedSize = size ?? (small ? "sm" : "md")
    return <LogoBox name={name} size={resolvedSize} />
}

export function AppLogo({ iconName, iconBackground = "auto", small = true }: { iconName: string | null | undefined, iconBackground?: string | null, small?: boolean }) {
    const [failed, setFailed] = useState(false)
    const cleanIconName = iconName?.trim().toLowerCase()
    const background = ["auto", "light", "dark"].includes(String(iconBackground)) ? iconBackground : "auto"
    return (
        <span className={`logo-box app-logo-bg-${background} ${small ? "small-logo" : ""}`}>
            {cleanIconName && !failed ? (
                <Image src={`https://thesvg.org/icons/${cleanIconName}/default.svg`} alt="" width={small ? 18 : 24} height={small ? 18 : 24} onError={() => setFailed(true)} />
            ) : <Server size={small ? 14 : 18} />}
        </span>
    )
}

export function NameWithLogo({ name, showText = false }: { name: string | null | undefined, showText?: boolean }) {
    return (
        <span className="name-with-logo" title={name ?? undefined}>
            <ProviderLogo name={name} small={true} />
            {showText && <span>{name ?? "-"}</span>}
        </span>
    )
}

export function AppNameWithLogo({ name, iconName, iconBackground }: { name: string | null | undefined, iconName?: string | null, iconBackground?: string | null }) {
    return (
        <span className="name-with-logo">
            <AppLogo iconName={iconName} iconBackground={iconBackground} small={true} />
            <span>{name ?? "-"}</span>
        </span>
    )
}
