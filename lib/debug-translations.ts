// Utilidad para depurar traducciones
import caTrans from "../translations/ca.json"
import esTrans from "../translations/es.json"

export function debugTranslations() {
  console.log("=== TRANSLATION DEBUG ===")

  // Verificar que los archivos de traducción se cargan correctamente
  console.log("CA translations loaded:", Object.keys(caTrans).length > 0)
  console.log("ES translations loaded:", Object.keys(esTrans).length > 0)

  // Mostrar las claves de primer nivel
  console.log("CA root keys:", Object.keys(caTrans))
  console.log("ES root keys:", Object.keys(esTrans))

  // Verificar claves específicas
  const keysToCheck = [
    "sidebar.dashboard",
    "sidebar.attendance",
    "sidebar.substitutions",
    "sidebar.spaces",
    "sidebar.tutors",
    "sidebar.exits",
    "sidebar.guards",
    "sidebar.equipment",
    "sidebar.inventory",
    "sidebar.reservable",
    "sidebar.center",
    "sidebar.organization",
    "sidebar.positions",
    "sidebar.departments",
    "sidebar.profile",
  ]

  console.log("=== CHECKING SPECIFIC KEYS ===")
  keysToCheck.forEach((key) => {
    const parts = key.split(".")
    let caValue = caTrans
    let esValue = esTrans
    let caFound = true
    let esFound = true

    for (const part of parts) {
      if (caValue && typeof caValue === "object" && part in caValue) {
        caValue = caValue[part]
      } else {
        caFound = false
        break
      }

      if (esValue && typeof esValue === "object" && part in esValue) {
        esValue = esValue[part]
      } else {
        esFound = false
        break
      }
    }

    console.log(`Key: ${key}`)
    console.log(`  CA: ${caFound ? caValue : "NOT FOUND"}`)
    console.log(`  ES: ${esFound ? esValue : "NOT FOUND"}`)
  })

  console.log("=== END TRANSLATION DEBUG ===")
}
