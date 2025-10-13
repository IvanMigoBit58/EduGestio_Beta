"use client"

import { useEffect, useState } from "react"
import { useI18n, LANGUAGES } from "@/lib/i18n-context"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export function LanguageDetectionBanner() {
  const { language, setLanguage, detectedLanguage, t } = useI18n()
  const [showBanner, setShowBanner] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  // Determinar si se debe mostrar el banner
  useEffect(() => {
    // Solo mostrar si:
    // 1. Hay un idioma detectado
    // 2. El idioma detectado es diferente al idioma actual
    // 3. No se ha descartado el banner
    // 4. No hay una preferencia de idioma guardada en localStorage
    const shouldShow =
      detectedLanguage &&
      detectedLanguage !== language &&
      !dismissed &&
      !localStorage.getItem("languageBannerDismissed")

    setShowBanner(!!shouldShow)
  }, [detectedLanguage, language, dismissed])

  // Obtener los nombres de los idiomas
  const getLanguageName = (langCode: string) => {
    if (langCode === LANGUAGES.CA) {
      return t("language.catalan")
    }
    if (langCode === LANGUAGES.ES) {
      return t("language.spanish")
    }
    return langCode
  }

  const detectedLanguageName = detectedLanguage ? getLanguageName(detectedLanguage) : ""
  const currentLanguageName = getLanguageName(language)

  // Manejar el cambio de idioma
  const handleSwitchLanguage = () => {
    if (detectedLanguage) {
      setLanguage(detectedLanguage)
    }
    handleDismiss()
  }

  // Manejar el descarte del banner
  const handleKeepLanguage = () => {
    handleDismiss()
  }

  // Marcar el banner como descartado
  const handleDismiss = () => {
    setDismissed(true)
    localStorage.setItem("languageBannerDismissed", "true")
  }

  if (!showBanner) {
    return null
  }

  return (
    <Alert className="fixed bottom-4 right-4 max-w-md z-50 bg-background shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <AlertTitle>{t("language.detected")}</AlertTitle>
          <AlertDescription>{t("language.detectedDescription", { language: detectedLanguageName })}</AlertDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={handleDismiss} className="h-8 w-8">
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex gap-2 mt-2">
        <Button onClick={handleSwitchLanguage} size="sm">
          {t("language.switchTo", { language: detectedLanguageName })}
        </Button>
        <Button variant="outline" onClick={handleKeepLanguage} size="sm">
          {t("language.keepCurrent", { language: currentLanguageName })}
        </Button>
      </div>
    </Alert>
  )
}
