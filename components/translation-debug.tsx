"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useI18n } from "@/lib/i18n-context"
import { verifyAllTranslations, getAllTranslationKeys } from "@/lib/i18n-utils"
import esTranslations from "@/translations/es.json"
import caTranslations from "@/translations/ca.json"

export function TranslationDebug() {
  const { language, setLanguage } = useI18n()
  const [missingKeys, setMissingKeys] = useState<{
    missingInEs: string[]
    missingInCa: string[]
  }>({
    missingInEs: [],
    missingInCa: [],
  })
  const [allKeys, setAllKeys] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("missing")

  useEffect(() => {
    const { missingInFirst, missingInSecond } = verifyAllTranslations(esTranslations, caTranslations)
    setMissingKeys({
      missingInEs: missingInFirst,
      missingInCa: missingInSecond,
    })

    // Obtener todas las claves únicas
    const esKeys = getAllTranslationKeys(esTranslations)
    const caKeys = getAllTranslationKeys(caTranslations)
    const uniqueKeys = Array.from(new Set([...esKeys, ...caKeys]))
    setAllKeys(uniqueKeys)
  }, [])

  const filteredKeys = allKeys.filter((key) => key.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Depuración de Traducciones</CardTitle>
        <CardDescription>
          Herramienta para verificar y depurar las traducciones de la aplicación. Idioma actual: {language}
        </CardDescription>
        <div className="flex space-x-2 mt-2">
          <Button variant="outline" size="sm" onClick={() => setLanguage("es")}>
            Español
          </Button>
          <Button variant="outline" size="sm" onClick={() => setLanguage("ca")}>
            Catalán
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="missing" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="missing">Claves Faltantes</TabsTrigger>
            <TabsTrigger value="all">Todas las Claves</TabsTrigger>
          </TabsList>
          <TabsContent value="missing">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Faltantes en Español</CardTitle>
                  <CardDescription>
                    {missingKeys.missingInEs.length} claves faltan en las traducciones en español
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-2">
                      {missingKeys.missingInEs.map((key) => (
                        <Badge key={key} variant="outline" className="mr-2 mb-2">
                          {key}
                        </Badge>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Faltantes en Catalán</CardTitle>
                  <CardDescription>
                    {missingKeys.missingInCa.length} claves faltan en las traducciones en catalán
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-2">
                      {missingKeys.missingInCa.map((key) => (
                        <Badge key={key} variant="outline" className="mr-2 mb-2">
                          {key}
                        </Badge>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="all">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Buscar claves..."
                className="w-full p-2 border rounded"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <ScrollArea className="h-[400px]">
              <div className="space-y-2">
                {filteredKeys.map((key) => {
                  const existsInEs = !missingKeys.missingInEs.includes(key)
                  const existsInCa = !missingKeys.missingInCa.includes(key)
                  return (
                    <div key={key} className="p-2 border rounded mb-2">
                      <div className="font-medium">{key}</div>
                      <div className="flex space-x-2 mt-1">
                        <Badge variant={existsInEs ? "default" : "destructive"}>ES: {existsInEs ? "✓" : "✗"}</Badge>
                        <Badge variant={existsInCa ? "default" : "destructive"}>CA: {existsInCa ? "✓" : "✗"}</Badge>
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
