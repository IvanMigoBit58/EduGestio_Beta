"use client"

import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Evitar problemas de hidratación
  useEffect(() => {
    setMounted(true)
  }, [])

  // Persistir el tema en localStorage
  useEffect(() => {
    if (mounted && theme) {
      localStorage.setItem("theme", theme)
    }
  }, [theme, mounted])

  // Recuperar el tema de localStorage al montar el componente
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme && mounted) {
      setTheme(savedTheme)
    }
  }, [mounted, setTheme])

  if (!mounted) {
    return <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0" />
  }

  // Usar resolvedTheme para mostrar el icono correcto
  const displayTheme = resolvedTheme || theme

  return (
    <TooltipProvider>
      <Tooltip>
        <DropdownMenu>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
                <Sun
                  className={`h-[1.2rem] w-[1.2rem] transition-all ${displayTheme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"}`}
                />
                <Moon
                  className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${displayTheme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"}`}
                />
                <span className="sr-only">Cambiar tema</span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Cambiar tema</p>
          </TooltipContent>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")} className={theme === "light" ? "bg-secondary" : ""}>
              <Sun className="mr-2 h-4 w-4" />
              <span>Claro</span>
              {theme === "light" && <span className="ml-auto text-xs opacity-60">(Activo)</span>}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")} className={theme === "dark" ? "bg-secondary" : ""}>
              <Moon className="mr-2 h-4 w-4" />
              <span>Oscuro</span>
              {theme === "dark" && <span className="ml-auto text-xs opacity-60">(Activo)</span>}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")} className={theme === "system" ? "bg-secondary" : ""}>
              <Monitor className="mr-2 h-4 w-4" />
              <span>Sistema</span>
              {theme === "system" && <span className="ml-auto text-xs opacity-60">(Activo)</span>}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Tooltip>
    </TooltipProvider>
  )
}
