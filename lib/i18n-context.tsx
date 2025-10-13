"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { useAuth } from "@/lib/auth-context"
import esTranslations from "@/translations/es.json"
import caTranslations from "@/translations/ca.json"

// Idiomas disponibles
export const LANGUAGES = {
  CA: "ca",
  ES: "es",
}

// Mapa de traducciones
const translationsMap = {
  [LANGUAGES.CA]: caTranslations,
  [LANGUAGES.ES]: esTranslations,
}

// Tipo para el contexto
type I18nContextType = {
  language: string
  setLanguage: (lang: string) => void
  t: (key: string, params?: Record<string, any>) => string
  isLoading: boolean
  detectedLanguage: string | null
  forceUpdate: () => void
}

// Crear el contexto
const I18nContext = createContext<I18nContextType | undefined>(undefined)

// Función para detectar el idioma del navegador
const detectBrowserLanguage = (): string => {
  if (typeof window === "undefined") {
    return LANGUAGES.CA // Valor predeterminado para SSR
  }

  // Obtener el idioma del navegador
  const browserLanguages = window.navigator.languages || [window.navigator.language]
  console.log("Browser languages:", browserLanguages)

  // Buscar coincidencias con los idiomas soportados
  for (const lang of browserLanguages) {
    const langCode = lang.substring(0, 2).toLowerCase()

    if (langCode === "ca") {
      return LANGUAGES.CA
    }

    if (langCode === "es") {
      return LANGUAGES.ES
    }
  }

  // Si no hay coincidencias, usar catalán como predeterminado
  return LANGUAGES.CA
}

// Proveedor del contexto
export function I18nProvider({ children }: { children: ReactNode }) {
  const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null)
  const [language, setLanguage] = useState(LANGUAGES.CA) // Valor inicial temporal
  const [isLoading, setIsLoading] = useState(true)
  const [updateCounter, setUpdateCounter] = useState(0)
  const auth = useAuth()
  const user = auth?.user

  // Función para forzar la actualización de todos los componentes que usan el contexto
  const forceUpdate = useCallback(() => {
    setUpdateCounter((prev) => prev + 1)
  }, [])

  // Detectar el idioma del navegador y establecer el idioma inicial
  useEffect(() => {
    const detectAndSetLanguage = () => {
      try {
        setIsLoading(true)

        // Prioridad de selección de idioma:
        // 1. Preferencia guardada del usuario (si está autenticado)
        // 2. Preferencia guardada en localStorage
        // 3. Idioma detectado del navegador
        // 4. Catalán como predeterminado

        const storedLanguage = localStorage.getItem("language")
        const browserLang = detectBrowserLanguage()
        setDetectedLanguage(browserLang)

        const selectedLanguage = user?.language || storedLanguage || browserLang
        console.log("Language selection:", {
          userPreference: user?.language,
          storedPreference: storedLanguage,
          browserLanguage: browserLang,
          selected: selectedLanguage,
        })

        setLanguage(selectedLanguage)

        // Si no hay preferencia guardada, guardar el idioma detectado
        if (!storedLanguage) {
          localStorage.setItem("language", selectedLanguage)
        }
      } catch (error) {
        console.error("Error detecting language:", error)
      } finally {
        setIsLoading(false)
      }
    }

    detectAndSetLanguage()
  }, [user])

  // Función para cambiar el idioma
  const changeLanguage = (lang: string) => {
    console.log(`Changing language to ${lang}...`)
    setLanguage(lang)
    localStorage.setItem("language", lang)

    // Forzar actualización de todos los componentes
    forceUpdate()

    // Intentar actualizar el idioma del usuario si está autenticado
    if (auth?.user && auth.updateUserLanguage) {
      auth.updateUserLanguage(lang)
    }

    // Actualizar el atributo lang del documento HTML
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang
    }
  }

  // Función para obtener una traducción
  const t = (key: string, params?: Record<string, any>) => {
    if (isLoading) {
      return key // Devolver la clave mientras se carga
    }

    try {
      const currentTranslations = translationsMap[language] || translationsMap[LANGUAGES.CA]

      const keys = key.split(".")
      let value = currentTranslations
      let found = true

      for (const k of keys) {
        if (value && typeof value === "object" && k in value) {
          value = value[k]
        } else {
          found = false
          console.warn(`Translation key not found: ${key} (failed at ${k})`)
          break
        }
      }

      if (found && typeof value === "string") {
        // Reemplazar parámetros si existen
        if (params) {
          let result = value
          for (const [paramKey, paramValue] of Object.entries(params)) {
            const regex = new RegExp(`\\{${paramKey}\\}`, "g")
            result = result.replace(regex, String(paramValue))
          }
          return result
        }
        return value
      }

      // Si no se encuentra la traducción, intentar buscar en las traducciones directamente
      if (key in currentTranslations) {
        return currentTranslations[key]
      }

      console.warn(`Translation not found for key: ${key}`)
      return key // Devolver la clave si no se encuentra la traducción
    } catch (error) {
      console.error(`Error translating key: ${key}`, error)
      return key // En caso de error, devolver la clave
    }
  }

  const contextValue = {
    language,
    setLanguage: changeLanguage,
    t,
    isLoading,
    detectedLanguage,
    forceUpdate,
  }

  return <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>
}

// Hook para usar el contexto
export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error("useI18n debe ser usado dentro de un I18nProvider")
  }
  return context
}
