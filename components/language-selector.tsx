"use client"

import { useI18n, LANGUAGES } from "@/lib/i18n-context"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Check, Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function LanguageSelector() {
  const { language, setLanguage, t } = useI18n()
  const { user, updateUserLanguage } = useAuth()

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang)
    if (user) {
      updateUserLanguage(lang)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{t("profile.language")}</span>
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
