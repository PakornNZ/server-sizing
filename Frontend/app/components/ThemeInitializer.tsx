'use client'

import { useEffect } from "react"

type ThemeMode = "system" | "light" | "dark"

const THEME_STORAGE_KEY = "theme-mode"
const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365

function isThemeMode(value: string | null): value is ThemeMode {
    return value === "system" || value === "light" || value === "dark"
}

function resolveThemeMode(mode: ThemeMode) {
    if (mode !== "system") return mode
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

export default function ThemeInitializer() {
    useEffect(() => {
        const serverTheme = document.documentElement.getAttribute("data-theme-mode")
        const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
        const themeMode = isThemeMode(storedTheme) ? storedTheme : isThemeMode(serverTheme) ? serverTheme : "system"
        
        const resolvedTheme = resolveThemeMode(themeMode)
        const root = window.document.documentElement

        root.dataset.theme = resolvedTheme
        root.dataset.themeMode = themeMode
        root.style.colorScheme = resolvedTheme
        window.localStorage.setItem(THEME_STORAGE_KEY, themeMode)
        window.document.cookie = `${THEME_STORAGE_KEY}=${themeMode}; path=/; max-age=${THEME_COOKIE_MAX_AGE}; SameSite=Lax`
    }, [])

    return null
}