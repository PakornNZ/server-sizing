'use client'

import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type ThemeMode = "system" | "light" | "dark";
type ResolvedThemeMode = "light" | "dark";

type ThemeOption = {
    value: ThemeMode;
    label: string;
    icon: React.ReactNode;
}

const THEME_STORAGE_KEY = "theme-mode";
const THEME_CHANGE_EVENT = "theme-mode-change";

const themeOptions: ThemeOption[] = [
    { value: "system", label: "System", icon: <Monitor /> },
    { value: "light", label: "Light", icon: <Sun /> },
    { value: "dark", label: "Dark", icon: <Moon /> },
];

function isThemeMode(value: string | null): value is ThemeMode {
    return value === "system" || value === "light" || value === "dark";
}

function getStoredThemeMode(): ThemeMode {
    if (typeof window === "undefined") {
        return "system";
    }

    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isThemeMode(storedTheme) ? storedTheme : "system";
}

function saveThemeMode(mode: ThemeMode) {
    window.localStorage.setItem(THEME_STORAGE_KEY, mode);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

function subscribeToThemeChange(onStoreChange: () => void) {
    window.addEventListener("storage", onStoreChange);
    window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);

    return () => {
        window.removeEventListener("storage", onStoreChange);
        window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
    }
}

function resolveThemeMode(mode: ThemeMode): ResolvedThemeMode {
    if (mode !== "system") {
        return mode;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ThemeModeToggle({ isOpen }: { isOpen: boolean }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const controlRef = useRef<HTMLDivElement>(null);
    const themeMode = useSyncExternalStore<ThemeMode>(
        subscribeToThemeChange,
        getStoredThemeMode,
        () => "system"
    );
    const activeOption = themeOptions.find(option => option.value === themeMode) ?? themeOptions[0];

    useEffect(() => {
        const root = window.document.documentElement;
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        function applyTheme() {
            const resolvedTheme = resolveThemeMode(themeMode);
            root.dataset.theme = resolvedTheme;
            root.dataset.themeMode = themeMode;
            root.style.colorScheme = resolvedTheme;
        }

        applyTheme();

        if (themeMode === "system") {
            mediaQuery.addEventListener("change", applyTheme);
        }

        return () => {
            mediaQuery.removeEventListener("change", applyTheme);
        }
    }, [themeMode]);

    useEffect(() => {
        function handlePointerDown(event: PointerEvent) {
            if (!controlRef.current?.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setIsDropdownOpen(false);
            }
        }

        window.document.addEventListener("pointerdown", handlePointerDown);
        window.document.addEventListener("keydown", handleKeyDown);

        return () => {
            window.document.removeEventListener("pointerdown", handlePointerDown);
            window.document.removeEventListener("keydown", handleKeyDown);
        }
    }, []);

    function handleSelectTheme(mode: ThemeMode) {
        saveThemeMode(mode);
        setIsDropdownOpen(false);
    }

    return (
        <div
            ref={controlRef}
            className="theme-mode-select-control"
            data-open={isOpen}
            data-dropdown-open={isDropdownOpen}
            data-tooltip={`Theme: ${activeOption.label}`}
        >
            <button
                type="button"
                className="theme-mode-select-trigger"
                aria-label="Theme mode"
                onClick={() => setIsDropdownOpen(prev => !prev)}
            >
                <span className="theme-mode-select-icon" aria-hidden="true">
                    {activeOption.icon}
                </span>
                <span className="theme-mode-select-text">{activeOption.label}</span>
                <span className="theme-mode-select-arrow" aria-hidden="true" />
            </button>

            {isDropdownOpen ? (
                <div className="theme-mode-select-menu" aria-label="Theme mode options">
                {themeOptions.map(option => (
                    <button
                        key={option.value}
                        type="button"
                        className="theme-mode-select-option"
                        data-active={themeMode === option.value}
                        onClick={() => handleSelectTheme(option.value)}
                    >
                        <span className="theme-mode-option-icon" aria-hidden="true">{option.icon}</span>
                        <span>{option.label}</span>
                    </button>
                ))}
                </div>
            ) : null}
        </div>
    )
}
