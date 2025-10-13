"use client"

import { useTheme } from "next-themes"
import { useEffect } from "react"

export function ThemeSync() {
  const { setTheme } = useTheme()

  useEffect(() => {
    // Recuperar el tema guardado en localStorage
    const savedTheme = localStorage.getItem("theme")

    if (savedTheme) {
      // Aplicar el tema guardado
      setTheme(savedTheme)
    }
  }, [setTheme])

  return null // Este componente no renderiza nada
}
