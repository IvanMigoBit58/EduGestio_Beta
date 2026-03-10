"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Users, Search } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"
import studentsData from "../asistencia/data.json"

interface Student {
  id: string
  name: string
  surname: string
}

interface Group {
  id: string
  name: string
  students: Student[]
}

export default function EstudiantesPage() {
  const { t } = useI18n()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGroup, setSelectedGroup] = useState<string>("")
  const [sortBy, setSortBy] = useState<"name" | "id">("name")

  // Flatten all students from groups
  const allStudents: (Student & { groupId: string; groupName: string })[] = useMemo(() => {
    return (studentsData.groups as Group[]).flatMap((group) =>
      group.students.map((student) => ({
        ...student,
        groupId: group.id,
        groupName: group.name,
      }))
    )
  }, [])

  // Filter students based on search and group
  const filteredStudents = useMemo(() => {
    let filtered = allStudents.filter((student) => {
      const fullName = `${student.name} ${student.surname}`.toLowerCase()
      const matchesSearch =
        fullName.includes(searchTerm.toLowerCase()) || student.id.includes(searchTerm.toLowerCase())
      const matchesGroup = !selectedGroup || student.groupId === selectedGroup

      return matchesSearch && matchesGroup
    })

    // Sort students
    filtered.sort((a, b) => {
      if (sortBy === "name") {
        const aName = `${a.name} ${a.surname}`.toLowerCase()
        const bName = `${b.name} ${b.surname}`.toLowerCase()
        return aName.localeCompare(bName)
      } else {
        return a.id.localeCompare(b.id)
      }
    })

    return filtered
  }, [allStudents, searchTerm, selectedGroup, sortBy])

  const groups = (studentsData as { groups: Group[] }).groups

  const handleStudentClick = (studentId: string) => {
    router.push(`/dashboard/estudiantes/${studentId}`)
  }

  return (
    <PageLayout title="Fitxers d'Estudiants" description="Gestiona els dossiers dels estudiants">
      <div className="space-y-6">
        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total d'Estudiants</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{allStudents.length}</div>
              <p className="text-xs text-muted-foreground">{groups.length} grups</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Estudiants Filtrats</CardTitle>
              <Search className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredStudents.length}</div>
              <p className="text-xs text-muted-foreground">resultats de cerca</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter Section */}
        <Card>
          <CardHeader>
            <CardTitle>Cercar Estudiants</CardTitle>
            <CardDescription>Busca per nom, cognom o ID de l'estudiant</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cercar per nom, cognom o ID..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="border border-gray-300 p-2 rounded dark:bg-slate-950 dark:text-white"
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
              >
                <option value="">Tots els Grups</option>
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
              <select
                className="border border-gray-300 p-2 rounded dark:bg-slate-950 dark:text-white"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "name" | "id")}
              >
                <option value="name">Ordenar per Nom</option>
                <option value="id">Ordenar per ID</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Students List */}
        <Card>
          <CardHeader>
            <CardTitle>Estudiants</CardTitle>
            <CardDescription>
              {filteredStudents.length} {filteredStudents.length === 1 ? "estudiant" : "estudiants"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredStudents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No s'han trobat estudiants</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredStudents.map((student) => (
                  <button
                    key={student.id}
                    onClick={() => handleStudentClick(student.id)}
                    className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-slate-50 dark:hover:bg-slate-900 dark:border-gray-700 transition-colors flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">
                        {student.name} {student.surname}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ID: {student.id} • Grup: {student.groupName}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Veure Fitxer
                    </Button>
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}
