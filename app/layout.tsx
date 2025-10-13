import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/auth-context"
import { I18nProvider } from "@/lib/i18n-context"
import { Toaster } from "@/components/ui/toaster"
import { LanguageDetectionBanner } from "@/components/language-detection-banner"
import { ResizeObserverFix } from "@/components/resize-observer-fix"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EduGestió - Sistema de Gestió Escolar",
  description: "Sistema integral per a la gestió de centres educatius",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ca" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <I18nProvider>
              <ResizeObserverFix />
              {children}
              <LanguageDetectionBanner />
              <Toaster />
            </I18nProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
