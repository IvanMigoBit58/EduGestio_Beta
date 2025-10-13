"use client"

import { useI18n, LANGUAGES } from "@/lib/i18n-context"
import { Button } from "@/components/ui/button"
import { Check, Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useEffect } from "react"

export function LanguageToggle() {
  const { language, setLanguage, t, forceUpdate } = useI18n()

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang)
    // Forzar actualización de todos los componentes que usan el contexto
    forceUpdate()
  }

  // Forzar actualización cuando cambia el idioma
  useEffect(() => {
    forceUpdate()
  }, [language, forceUpdate])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{t("common.language")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleLanguageChange(LANGUAGES.CA)}>
          <span>Català</span>
          {language === LANGUAGES.CA && <Check className="ml-2 h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange(LANGUAGES.ES)}>
          <span>Castellano</span>
          {language === LANGUAGES.ES && <Check className="ml-2 h-4 w-4" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
