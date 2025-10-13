"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

interface AuthGuardProps {
  children: React.ReactNode
  requiredPermission?: string
}

export function AuthGuard({ children, requiredPermission }: AuthGuardProps) {
  const { isAuthenticated, isLoading, hasPermission } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // No redirigir durante la carga para evitar redirecciones innecesarias
    if (isLoading) return

    // Si no está autenticado, redirigir al login
    if (!isAuthenticated) {
      router.push(`/login?returnUrl=${encodeURIComponent(pathname)}`)
      return
    }

    // Si se requiere un permiso específico y el usuario no lo tiene, redirigir al dashboard
    if (requiredPermission && !hasPermission(requiredPermission)) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, isLoading, router, pathname, requiredPermission, hasPermission])

  // Mostrar nada durante la carga o si no está autenticado
  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  // Si se requiere un permiso específico y el usuario no lo tiene, no mostrar nada
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return null
  }

  // Si está autenticado y tiene los permisos necesarios, mostrar los hijos
  return <>{children}</>
}
