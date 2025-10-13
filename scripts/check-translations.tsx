/**
 * Script para verificar que todas las claves de traducción estén presentes en todos los idiomas
 *
 * Uso: node scripts/check-translations.js
 */

import fs from "fs"
import path from "path"

// Rutas a los archivos de traducción
const translationsDir = path.join(process.cwd(), "translations")
const caTranslationsPath = path.join(translationsDir, "ca.json")
const esTranslationsPath = path.join(translationsDir, "es.json")

// Función para leer un archivo JSON
function readJsonFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, "utf8")
    return JSON.parse(fileContent)
  } catch (error) {
    console.error(`Error al leer el archivo ${filePath}:`, error)
    process.exit(1)
  }
}

// Función para obtener todas las claves de un objeto anidado
function getAllKeys(obj, prefix = "") {
  let keys = []

  for (const key in obj) {
    const newPrefix = prefix ? `${prefix}.${key}` : key

    if (typeof obj[key] === "object" && obj[key] !== null) {
      keys = [...keys, ...getAllKeys(obj[key], newPrefix)]
    } else {
      keys.push(newPrefix)
    }
  }

  return keys
}

// Función para verificar si una clave existe en un objeto anidado
function keyExists(obj, key) {
  const parts = key.split(".")
  let current = obj

  for (const part of parts) {
    if (current[part] === undefined) {
      return false
    }
    current = current[part]
  }

  return true
}

// Función principal
function checkTranslations() {
  console.log("Verificando traducciones...")

  // Leer archivos de traducción
  const caTranslations = readJsonFile(caTranslationsPath)
  const esTranslations = readJsonFile(esTranslationsPath)

  // Obtener todas las claves
  const caKeys = getAllKeys(caTranslations)
  const esKeys = getAllKeys(esTranslations)

  // Verificar claves que faltan en catalán
  const missingInCa = esKeys.filter((key) => !keyExists(caTranslations, key))

  // Verificar claves que faltan en español
  const missingInEs = caKeys.filter((key) => !keyExists(esTranslations, key))

  // Mostrar resultados
  console.log(`Total de claves en catalán: ${caKeys.length}`)
  console.log(`Total de claves en español: ${esKeys.length}`)

  if (missingInCa.length > 0) {
    console.log("\nClaves que faltan en catalán:")
    missingInCa.forEach((key) => console.log(`- ${key}`))
  } else {
    console.log("\nNo faltan claves en catalán.")
  }

  if (missingInEs.length > 0) {
    console.log("\nClaves que faltan en español:")
    missingInEs.forEach((key) => console.log(`- ${key}`))
  } else {
    console.log("\nNo faltan claves en español.")
  }

  // Resumen
  if (missingInCa.length === 0 && missingInEs.length === 0) {
    console.log("\n✅ Todas las traducciones están completas.")
  } else {
    console.log(`\n❌ Faltan ${missingInCa.length + missingInEs.length} traducciones en total.`)
  }
}

// Ejecutar la función principal
checkTranslations()
