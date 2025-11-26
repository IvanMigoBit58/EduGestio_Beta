"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n-context"
import groupsData from "./data.json"

interface Convalidacion {
  studentId: string
  groupId: string
  subject: string
}

interface GroupData {
  id: string
  name: string
  students: Array<{
    id: string
    name: string
    surname: string
  }>
}

const SUBJECTS = [
  { id: "catala", name: "Llengua Catalana" },
  { id: "castella", name: "Llengua Castellana" },
  { id: "matematiques", name: "Matemàtiques" },
  { id: "historia", name: "Història" },
  { id: "musica", name: "Música" },
  { id: "biologia", name: "Biologia" },
]

export function ConvalidacionesContent() {
  const { t } = useI18n()
  const [selectedGroup, setSelectedGroup] = useState<string>("")
  const [selectedSubject, setSelectedSubject] = useState<string>("")
  const [convalidaciones, setConvalidaciones] = useState<Convalidacion[]>([])
  const [view, setView] = useState<"groups" | "subjects">("groups")

  useEffect(() => {
    // Load from localStorage on component mount
    try {
      const stored = localStorage.getItem("convalidaciones")
      if (stored) {
        setConvalidaciones(JSON.parse(stored))
      }
    } catch (error) {
      console.error("Failed to load convalidaciones", error)
    }
  }, [])

  const currentGroup = selectedGroup ? (groupsData.groups as GroupData[]).find((g) => g.id === selectedGroup) : null

  const handleToggleConvalidacion = (studentId: string) => {
    const key = `${studentId}_${selectedGroup}_${selectedSubject}`
    const exists = convalidaciones.some(
      (c) => c.studentId === studentId && c.groupId === selectedGroup && c.subject === selectedSubject
    )

    let newConvalidaciones: Convalidacion[]
    if (exists) {
      newConvalidaciones = convalidaciones.filter(
        (c) => !(c.studentId === studentId && c.groupId === selectedGroup && c.subject === selectedSubject)
      )
    } else {
      newConvalidaciones = [
        ...convalidaciones,
        { studentId, groupId: selectedGroup, subject: selectedSubject },
      ]
    }

    setConvalidaciones(newConvalidaciones)
    // Save to localStorage
    localStorage.setItem("convalidaciones", JSON.stringify(newConvalidaciones))
  }

  const isConvalidated = (studentId: string) => {
    return convalidaciones.some(
      (c) => c.studentId === studentId && c.groupId === selectedGroup && c.subject === selectedSubject
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{t("attendance.convalidationsTitle")}</CardTitle>
          <CardDescription>{t("attendance.manageConvalidations")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={view === "groups" ? "default" : "outline"}
              onClick={() => setView("groups")}
              className="flex-1"
            >
              {t("attendance.groups") || "Grups"}
            </Button>
            <Button
              variant={view === "subjects" ? "default" : "outline"}
              onClick={() => setView("subjects")}
              className="flex-1"
            >
              {t("attendance.subjects") || "Assignatures"}
            </Button>
          </div>

          {view === "groups" && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Selecciona un grup:</label>
              <select
                value={selectedGroup}
                onChange={(e) => {
                  setSelectedGroup(e.target.value)
                  setSelectedSubject("")
                }}
                className="w-full border border-gray-300 rounded p-2"
              >
                <option value="">Selecciona un grup</option>
                {(groupsData.groups as GroupData[]).map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {view === "subjects" && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Selecciona una assignatura:</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
              >
                <option value="">Selecciona una assignatura</option>
                {SUBJECTS.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedGroup && selectedSubject && (
            <div className="space-y-2 mt-4">
              <div className="text-sm font-medium">
                Estudiants de {currentGroup?.name} - {SUBJECTS.find((s) => s.id === selectedSubject)?.name}
              </div>
              {currentGroup?.students.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  <div>
                    <p className="font-medium">
                      {student.name} {student.surname}
                    </p>
                  </div>
                  <Button
                    variant={isConvalidated(student.id) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleToggleConvalidacion(student.id)}
                    className={isConvalidated(student.id) ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    {isConvalidated(student.id) ? "✓ Convalidat" : "Convalidat"}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
