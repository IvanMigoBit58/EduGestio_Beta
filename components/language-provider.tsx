"use client"

import { useEffect } from "react"
import { useI18n } from "@/lib/i18n-context"
import { useAuth } from "@/lib/auth-context"

export function LanguageSync() {
  const { language, setLanguage } = useI18n()
  const { user } = useAuth()

  // Sincronizar el idioma con el usuario autenticado
  useEffect(() => {
    if (user?.language && user.language !== language) {
      console.log(`Syncing language from user: ${user.language}`)
      setLanguage(user.language)
    }
  }, [user, language, setLanguage])

  return null
}
