/**
 * Verifica si una clave de traducción existe en un objeto de traducciones
 * @param key Clave de traducción (puede ser anidada con puntos)
 * @param translations Objeto de traducciones
 * @returns true si la clave existe, false en caso contrario
 */
export function keyExists(key: string, translations: any): boolean {
  const keys = key.split(".")
  let current = translations

  for (const k of keys) {
    if (current && typeof current === "object" && k in current) {
      current = current[k]
    } else {
      return false
    }
  }

  return true
}

/**
 * Obtiene todas las claves de traducción de un objeto de traducciones
 * @param translations Objeto de traducciones
 * @param prefix Prefijo para las claves (usado internamente para recursión)
 * @returns Array de claves de traducción
 */
export function getAllTranslationKeys(translations: any, prefix = ""): string[] {
  let keys: string[] = []

  for (const key in translations) {
    const newKey = prefix ? `${prefix}.${key}` : key
    if (translations[key] && typeof translations[key] === "object") {
      keys = [...keys, ...getAllTranslationKeys(translations[key], newKey)]
    } else {
      keys.push(newKey)
    }
  }

  return keys
}

/**
 * Verifica si todas las claves de traducción existen en ambos objetos de traducción
 * @param translations1 Primer objeto de traducciones
 * @param translations2 Segundo objeto de traducciones
 * @returns Objeto con las claves que faltan en cada objeto
 */
export function verifyAllTranslations(
  translations1: any,
  translations2: any,
): {
  missingInFirst: string[]
  missingInSecond: string[]
} {
  const keys1 = getAllTranslationKeys(translations1)
  const keys2 = getAllTranslationKeys(translations2)

  const missingInFirst = keys2.filter((key) => !keyExists(key, translations1))
  const missingInSecond = keys1.filter((key) => !keyExists(key, translations2))

  return {
    missingInFirst,
    missingInSecond,
  }
}

/**
 * Obtiene una traducción con sistema de fallback
 * @param key Clave de traducción
 * @param translations Objeto de traducciones principal
 * @param fallbackTranslations Objeto de traducciones de respaldo
 * @returns La traducción o la clave si no se encuentra
 */
export function getTranslation(key: string, translations: any, fallbackTranslations?: any): string {
  const keys = key.split(".")
  let value = translations
  let found = true

  // Intentar encontrar la traducción en el objeto principal
  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = value[k]
    } else {
      found = false
      break
    }
  }

  // Si se encontró y es una cadena, devolverla
  if (found && typeof value === "string") {
    return value
  }

  // Si no se encontró y hay traducciones de respaldo, intentar ahí
  if (!found && fallbackTranslations) {
    value = fallbackTranslations
    found = true

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k]
      } else {
        found = false
        break
      }
    }

    if (found && typeof value === "string") {
      return value
    }
  }

  // Si no se encontró en ningún lado, devolver la clave
  return key
}
