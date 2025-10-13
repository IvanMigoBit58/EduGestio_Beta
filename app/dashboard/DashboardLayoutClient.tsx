"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { UserMenu } from "@/components/user-menu"
import { useAuth } from "@/lib/auth-context"
import { useI18n } from "@/lib/i18n-context"
import { LanguageToggle } from "@/components/language-toggle"
import { ThemeToggle } from "@/components/theme-toggle"

export default function DashboardLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { user, isLoading } = useAuth()
  const { t } = useI18n()
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">{t("common.loading")}</div>
  }

  if (!user) {
    return <div className="flex h-screen items-center justify-center">{t("auth.notAuthenticated")}</div>
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <MobileNav />
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <LanguageToggle />
              <ThemeToggle />
              <UserMenu user={user} />
            </nav>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <Sidebar className="hidden lg:block" />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
