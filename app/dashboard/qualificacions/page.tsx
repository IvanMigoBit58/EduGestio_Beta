"use client"

import { useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useI18n } from "@/lib/i18n-context"

export default function QualificacionsPage() {
  const { t } = useI18n()
  const [selectedGroup, setSelectedGroup] = useState<string>("")
  const [selectedSubject, setSelectedSubject] = useState<string>("")

  const students = [
    { id: "1a_001", name: "Marc García" },
    { id: "1a_002", name: "Laura Martínez" },
    { id: "1a_003", name: "Pau López" },
    { id: "1a_004", name: "Marta Ruiz" },
    { id: "1a_005", name: "Jordi Fernández" },
  ]

  const grades: Record<string, string> = {}

  return (
    <PageLayout title="Qualificacions" description="Gestiona les qualificacions dels teus estudiants">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Selecciona un grup i una assignatura</CardTitle>
            <CardDescription>Selecciona el grup i l'assignatura per veure i editar les qualificacions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <select
                className="flex-1 border border-gray-300 p-2 rounded"
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
              >
                <option disabled value="">
                  Grups
                </option>
                <option value="1a">1 A</option>
                <option value="1b">1 B</option>
                <option value="4a">4 A</option>
                <option value="4b">4 B</option>
                <option value="1bta">BT1 A</option>
                <option value="1btb">BT1 B</option>
              </select>

              <select
                className="flex-1 border border-gray-300 p-2 rounded"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option disabled value="">
                  Assignatures
                </option>
                <option value="catala">Llengua Catalana</option>
                <option value="castella">Llengua Castellana</option>
                <option value="matematiques">Matemàtiques</option>
                <option value="historia">Història</option>
                <option value="musica">Música</option>
                <option value="biologia">Biologia</option>
              </select>

              <Button>{t("common.search") || "Cercar"}</Button>
            </div>
          </CardContent>
        </Card>

        {selectedGroup && selectedSubject && (
          <Card>
            <CardHeader>
              <CardTitle>Qualificacions per a {selectedSubject}</CardTitle>
              <CardDescription>Edita les qualificacions dels estudiants del grup {selectedGroup.toUpperCase()}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold">Estudiant</th>
                        <th className="text-center py-3 px-4 font-semibold">Qualificació</th>
                        <th className="text-center py-3 px-4 font-semibold">Accions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student) => (
                        <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium">{student.name}</p>
                              <p className="text-xs text-gray-500">{student.id}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Input
                              type="number"
                              placeholder="0"
                              min="0"
                              max="10"
                              step="0.5"
                              className="w-20 text-center mx-auto"
                              defaultValue={grades[student.id] || ""}
                            />
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Button variant="outline" size="sm">
                              Guardar
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end space-x-2 mt-6">
                  <Button variant="outline">Esborrar</Button>
                  <Button>Guardar qualificacions</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {!selectedGroup || !selectedSubject ? (
          <Card>
            <CardContent className="py-8">
              <p className="text-center text-muted-foreground">Selecciona un grup i una assignatura per veure les qualificacions</p>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </PageLayout>
  )
}
