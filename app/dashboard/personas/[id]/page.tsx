"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Mail, Phone, MapPin, Edit, Trash2, Plus } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

export default function PersonDetailPage() {
  const { t } = useI18n()
  const router = useRouter()
  const params = useParams()
  const personId = params.id as string
  const [activeTab, setActiveTab] = useState("general")

  // Sample person data - in production, fetch from database
  const person = {
    id: personId,
    name: "María López García",
    email: "maria.lopez@example.com",
    phone: "612345678",
    address: "Carrer de la Pau, 15, Barcelona",
    type: "teacher", // teacher, student, family
    status: "active",
    role: "Docent de Matemàtiques",
    department: "Matemàtiques",
    startDate: "15/09/2022",
    subjects: ["Matemàtiques 1A", "Matemàtiques 1B", "Matemàtiques 4A"],
  }

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      teacher: "Docent",
      student: "Estudiant",
      family: "Família",
    }
    return labels[type] || type
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      inactive: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
      onleave: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      suspended: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  return (
    <PageLayout title={person.name} description={`${getTypeLabel(person.type)} • ${person.email}`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{person.name}</h1>
            <div className="flex items-center gap-3 mt-2">
              <p className="text-muted-foreground">{person.role}</p>
              <Badge className={getStatusColor(person.status)}>
                {person.status === "active"
                  ? "Actiu"
                  : person.status === "inactive"
                    ? "Inactiu"
                    : person.status === "onleave"
                      ? "En llicència"
                      : "Suspès"}
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
            <Button variant="outline" size="sm" className="text-red-600">
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="contact">Contacte</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="assignments">Assignacions</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          {/* General Tab */}
          <TabsContent value="general" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Informació Personal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Nom</Label>
                    <p className="text-lg mt-1">{person.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Tipus de Persona</Label>
                    <p className="text-lg mt-1">{getTypeLabel(person.type)}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">ID</Label>
                    <p className="text-lg mt-1">{person.id}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Estat</Label>
                    <div className="mt-1">
                      <Badge className={getStatusColor(person.status)}>
                        {person.status === "active"
                          ? "Actiu"
                          : person.status === "inactive"
                            ? "Inactiu"
                            : "Altres"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {person.type === "teacher" && (
              <Card>
                <CardHeader>
                  <CardTitle>Informació Laboral</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Carrec</Label>
                      <p className="text-lg mt-1">{person.role}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Departament</Label>
                      <p className="text-lg mt-1">{person.department}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Data d'Inici</Label>
                      <p className="text-lg mt-1">{person.startDate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Informació de Contacte</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Correu Electrònic</p>
                      <p className="font-medium">{person.email}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Copiar
                    </Button>
                  </div>

                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Telèfon</p>
                      <p className="font-medium">{person.phone}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Copiar
                    </Button>
                  </div>

                  <div className="flex items-start gap-3 p-3 border rounded-lg">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-1" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Adreça</p>
                      <p className="font-medium">{person.address}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Editar Contacte</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email">Correu Electrònic</Label>
                  <Input id="email" defaultValue={person.email} className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="phone">Telèfon</Label>
                  <Input id="phone" defaultValue={person.phone} className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="address">Adreça</Label>
                  <Input id="address" defaultValue={person.address} className="mt-2" />
                </div>
                <Button className="w-full">Guardar Canvis</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Professional Tab */}
          <TabsContent value="professional" className="space-y-4 mt-6">
            {person.type === "teacher" && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Assignatures Docents</CardTitle>
                    <CardDescription>Assignatures que imparteix aquest docent</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {person.subjects.map((subject, i) => (
                        <div key={i} className="p-3 border rounded flex items-center justify-between">
                          <p className="font-medium">{subject}</p>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Assignacions Especials</CardTitle>
                      <CardDescription>Tutoria, coordinació, etc.</CardDescription>
                    </div>
                    <Button size="sm" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Nova
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="p-3 border rounded">
                        <p className="font-medium">Tutor de 1A</p>
                        <p className="text-sm text-muted-foreground">Grup: 1 A</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Horari</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      <p>Consulta l'horari complet en la secció d'horaris</p>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {person.type === "student" && (
              <Card>
                <CardHeader>
                  <CardTitle>Informació Acadèmica</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Grup</Label>
                    <p className="text-lg mt-1">1 A</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Programa d'Inscripció</Label>
                    <p className="text-lg mt-1">Cicle Formatiu de Grau Mitjà</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {person.type === "family" && (
              <Card>
                <CardHeader>
                  <CardTitle>Relació Familiar</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Tipus de Relació</Label>
                    <p className="text-lg mt-1">Pare/Mare</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Estudiant Relacionat</Label>
                    <p className="text-lg mt-1">Pedro Sánchez Ruiz</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Assignments Tab */}
          <TabsContent value="assignments" className="space-y-4 mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Assignacions</CardTitle>
                  <CardDescription>Grups, matèries, tutories, etc.</CardDescription>
                </div>
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Assignació
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {person.type === "teacher" && (
                    <>
                      {person.subjects.map((subject, i) => (
                        <div key={i} className="p-4 border rounded-lg">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-bold">{subject}</p>
                              <p className="text-sm text-muted-foreground">Matèria: Docència</p>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-bold">Tutor de 1A</p>
                            <p className="text-sm text-muted-foreground">Tutoria: Grup 1 A</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                {person.type !== "teacher" && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No hi ha assignacions</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-4 mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Documents</CardTitle>
                  <CardDescription>Certificats, títols, autoritzacions, etc.</CardDescription>
                </div>
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Pujar Document
                </Button>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <p>No hi ha documents carregats</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}
