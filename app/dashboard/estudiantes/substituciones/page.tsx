"use client"

import { useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Users, MapPin, Plus, Edit, Trash2 } from "lucide-react"

interface FieldTrip {
  id: string
  title: string
  date: string
  location: string
  affectedGroups: string[]
  teacherInCharge: string
  status: "planned" | "confirmed" | "completed"
  substitutionsAssigned: number
  totalTeachersFreed: number
}

interface SubstitutionDuty {
  id: string
  date: string
  subject: string
  group: string
  reason: "absence" | "fieldtrip" | "other"
  originalTeacher: string
  substitureTeacher: string
  status: "assigned" | "completed" | "pending"
}

export default function SubstitucionsPage() {
  const [activeTab, setActiveTab] = useState("fieldtrips")
  const [fieldTrips, setFieldTrips] = useState<FieldTrip[]>([
    {
      id: "trip_1",
      title: "Visita al Museu Nacional",
      date: "25/02/2025",
      location: "Barcelona",
      affectedGroups: ["1A", "1B"],
      teacherInCharge: "Raquel Martínez",
      status: "confirmed",
      substitutionsAssigned: 8,
      totalTeachersFreed: 6,
    },
    {
      id: "trip_2",
      title: "Sortida a l'Ajuntament",
      date: "22/01/2025",
      location: "Ajuntament Local",
      affectedGroups: ["4A"],
      teacherInCharge: "Pere Sáez",
      status: "completed",
      substitutionsAssigned: 5,
      totalTeachersFreed: 4,
    },
  ])

  const [substitutions, setSubstitutions] = useState<SubstitutionDuty[]>([
    {
      id: "sub_1",
      date: "20/01/2025",
      subject: "Matemàtiques",
      group: "1A",
      reason: "absence",
      originalTeacher: "Joan Pérez",
      substitureTeacher: "Maria García",
      status: "completed",
    },
    {
      id: "sub_2",
      date: "25/02/2025",
      subject: "Llengua Catalana",
      group: "1B",
      reason: "fieldtrip",
      originalTeacher: "Josep Lluís Valencia",
      substitureTeacher: "Anna Morales",
      status: "assigned",
    },
  ])

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      planned: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      confirmed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      assigned: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      pending: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  const getReasonLabel = (reason: string) => {
    const labels: Record<string, string> = {
      absence: "Absència docent",
      fieldtrip: "Sortida didàctica",
      other: "Altres",
    }
    return labels[reason] || reason
  }

  return (
    <PageLayout
      title="Substitucions i Sortides"
      description="Gestiona les substitucions docents i les sortides didàctiques"
    >
      <div className="space-y-6">
        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sortides Planejades</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {fieldTrips.filter((f) => f.status !== "completed").length}
              </div>
              <p className="text-xs text-muted-foreground">actives o confirmades</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Substitucions Assignades</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{substitutions.filter((s) => s.status === "assigned").length}</div>
              <p className="text-xs text-muted-foreground">en curs</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Docents Alliberats</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {fieldTrips.reduce((sum, f) => sum + f.totalTeachersFreed, 0)}
              </div>
              <p className="text-xs text-muted-foreground">en sortides actuals</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Historial Complert</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {substitutions.filter((s) => s.status === "completed").length}
              </div>
              <p className="text-xs text-muted-foreground">substitucions realitzades</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="fieldtrips">Sortides Didàctiques</TabsTrigger>
            <TabsTrigger value="substitutions">Substitucions Docents</TabsTrigger>
          </TabsList>

          {/* Field Trips Tab */}
          <TabsContent value="fieldtrips" className="space-y-4 mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Sortides Didàctiques</CardTitle>
                  <CardDescription>Gestiona les sortides i les substitucions automàtiques</CardDescription>
                </div>
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Sortida
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fieldTrips.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No hi ha sortides planificades</p>
                    </div>
                  ) : (
                    fieldTrips.map((trip) => (
                      <div key={trip.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-bold text-lg">{trip.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              📍 {trip.location} • 📅 {trip.date}
                            </p>
                          </div>
                          <span className={`inline-block px-3 py-1 rounded text-xs font-medium ${getStatusColor(trip.status)}`}>
                            {trip.status === "planned"
                              ? "Planejada"
                              : trip.status === "confirmed"
                                ? "Confirmada"
                                : "Completada"}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-3 py-3 border-y">
                          <div>
                            <p className="text-xs text-muted-foreground">Docent Responsable</p>
                            <p className="font-medium">{trip.teacherInCharge}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Grups Afectats</p>
                            <p className="font-medium">{trip.affectedGroups.join(", ")}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Substitucions Assignades</p>
                            <p className="font-medium">{trip.substitutionsAssigned}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Docents Alliberats</p>
                            <p className="font-medium">{trip.totalTeachersFreed}</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </Button>
                          <Button variant="outline" size="sm">
                            <Users className="h-4 w-4 mr-2" />
                            Gestionar Substitucions
                          </Button>
                          <Button variant="outline" size="sm" className="ml-auto">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Substitutions Tab */}
          <TabsContent value="substitutions" className="space-y-4 mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Substitucions Docents</CardTitle>
                  <CardDescription>Registra i gestiona les substitucions per absència o sortida</CardDescription>
                </div>
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Substitució
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {substitutions.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No hi ha substitucions registrades</p>
                    </div>
                  ) : (
                    substitutions.map((sub) => (
                      <div key={sub.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-bold">{sub.subject}</h4>
                            <p className="text-sm text-muted-foreground">
                              Grup {sub.group} • {sub.date}
                            </p>
                          </div>
                          <span className={`inline-block px-3 py-1 rounded text-xs font-medium ${getStatusColor(sub.status)}`}>
                            {sub.status === "assigned"
                              ? "Assignada"
                              : sub.status === "completed"
                                ? "Completada"
                                : "Pendent"}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 py-3 border-y mb-3">
                          <div>
                            <p className="text-xs text-muted-foreground">Docent Original</p>
                            <p className="font-medium">{sub.originalTeacher}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Docent Substitut</p>
                            <p className="font-medium">{sub.substitureTeacher}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-xs text-muted-foreground">Motiu</p>
                            <p className="font-medium">{getReasonLabel(sub.reason)}</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </Button>
                          <Button variant="outline" size="sm" className="ml-auto">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detectar Docents Alliberats</CardTitle>
                <CardDescription>Per a sortides didàctiques planificades</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="select-trip">Selecciona una sortida</Label>
                  <select
                    id="select-trip"
                    className="w-full mt-2 p-2 border rounded-lg dark:bg-slate-950 dark:text-white"
                  >
                    <option value="">Escull una sortida...</option>
                    {fieldTrips.map((trip) => (
                      <option key={trip.id} value={trip.id}>
                        {trip.title} ({trip.date})
                      </option>
                    ))}
                  </select>
                </div>
                <Button className="w-full">Generar Substitucions Automàticament</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}
