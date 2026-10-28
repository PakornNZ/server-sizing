import type { Metadata } from "next";
import { Google_Sans } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import "./style/dashboard.css";
import Providers from "./providers";
import ThemeInitializer from "./components/ThemeInitializer";

type ThemeMode = "system" | "light" | "dark";

function isThemeMode(value: string | undefined): value is ThemeMode {
  return value === "system" || value === "light" || value === "dark";
}

const googleSans = Google_Sans({
  subsets: ["latin", "thai"],
  variable: "--font-google-sans",
  weight: ["400", "500", "700"],
  adjustFontFallback: false
});

export const metadata: Metadata = {
  title: "Server",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const storedThemeMode = cookieStore.get("theme-mode")?.value;
  const themeMode = isThemeMode(storedThemeMode) ? storedThemeMode : "system";
  const resolvedTheme = themeMode === "system" ? undefined : themeMode;
  
  return (
    <html 
      lang="th" 
      suppressHydrationWarning 
      data-theme={resolvedTheme}
      data-theme-mode={themeMode}
    >
      <body className={`${googleSans.variable} antialiased`} suppressHydrationWarning>
        <ThemeInitializer />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
