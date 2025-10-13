"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Asegurarse de que el tema se persiste correctamente
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Evitar problemas de hidratación
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <NextThemesProvider {...props} enableSystem enableColorScheme storageKey="theme">
      {children}
    </NextThemesProvider>
  )
}
