import type React from "react"
import type { Metadata } from "next"
import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { UserMenu } from "@/components/user-menu"

export const metadata: Metadata = {
  title: "EduGestió - Tauler de Control",
  description: "Sistema integral per a la gestió de centres educatius",
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <MobileNav />
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <LanguageToggle />
              <ThemeToggle />
              <UserMenu />
            </nav>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <Sidebar className="hidden md:block w-64 shrink-0" />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
