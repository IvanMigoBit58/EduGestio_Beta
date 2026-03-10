"use client"

import { useState, useMemo } from "react"
import { useRouter, useParams } from "next/navigation"
import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Plus, Edit, Trash2, Mail, AlertCircle } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"
import studentsData from "../../asistencia/data.json"

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

export default function StudentDetailPage() {
  const { t } = useI18n()
  const router = useRouter()
  const params = useParams()
  const studentId = params.studentId as string
  const [activeTab, setActiveTab] = useState("general")

  // Find student
  const student = useMemo(() => {
    for (const group of (studentsData as { groups: Group[] }).groups) {
      const found = group.students.find((s) => s.id === studentId)
      if (found) {
        return {
          ...found,
          groupId: group.id,
          groupName: group.name,
        }
      }
    }
    return null
  }, [studentId])

  if (!student) {
    return (
      <PageLayout title="Estudiant no trobat" description="">
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">L'estudiant no s'ha trobat</p>
          <Button onClick={() => router.back()}>Tornar enrere</Button>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout
      title={`${student.name} ${student.surname}`}
      description={`ID: ${student.id} • Grup: ${student.groupName}`}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">
              {student.name} {student.surname}
            </h1>
            <p className="text-muted-foreground">
              ID: {student.id} • Grup: {student.groupName}
            </p>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="pagament">Pagament</TabsTrigger>
            <TabsTrigger value="incidents">Incidents</TabsTrigger>
            <TabsTrigger value="comentaris">Comentaris</TabsTrigger>
            <TabsTrigger value="qualificacions">Qualificacions</TabsTrigger>
            <TabsTrigger value="assistencia">Assistència</TabsTrigger>
            <TabsTrigger value="comunicacio">Comunicació</TabsTrigger>
            <TabsTrigger value="substitucions">Substitucions</TabsTrigger>
          </TabsList>

          {/* General Data Tab */}
          <TabsContent value="general" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Dades Personals</CardTitle>
                <CardDescription>Informació general de l'estudiant</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Nom</Label>
                    <p className="text-lg mt-1">{student.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Cognom</Label>
                    <p className="text-lg mt-1">{student.surname}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">ID Estudiant</Label>
                    <p className="text-lg mt-1">{student.id}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Grup</Label>
                    <p className="text-lg mt-1">{student.groupName}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informació de Contacte</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Correu Electrònic</Label>
                    <Input id="email" placeholder="email@example.com" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telèfon</Label>
                    <Input id="phone" placeholder="+34 XXX XXX XXX" className="mt-2" />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="address">Adreça</Label>
                    <Input id="address" placeholder="Carrer, número, ciutat" className="mt-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informació d'Inscripció</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Data d'Inscripció</Label>
                    <p className="text-lg mt-1">01/09/2024</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Programa d'Inscripció</Label>
                    <p className="text-lg mt-1">Cicle Formatiu de Grau Mitjà</p>
                  </div>
                </div>
                <Button variant="outline">Editar Informació</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Details Tab */}
          <TabsContent value="pagament" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Detalls de Pagament</CardTitle>
                <CardDescription>Gestiona les quotes i els mètodes de pagament</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <Label className="text-sm font-medium text-muted-foreground">Quota Pública</Label>
                    <p className="text-2xl font-bold mt-2">€0,00</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <Label className="text-sm font-medium text-muted-foreground">Cuota Material</Label>
                    <p className="text-2xl font-bold mt-2">€150,00</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Opcions de Pagament en Quotes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="p-3 border rounded flex items-center gap-3">
                    <input type="radio" id="option1" name="installment" defaultChecked />
                    <label htmlFor="option1" className="cursor-pointer flex-1">
                      <span className="font-medium">Pagament Únic (Desembre)</span>
                      <p className="text-sm text-muted-foreground">€150,00</p>
                    </label>
                  </div>
                  <div className="p-3 border rounded flex items-center gap-3">
                    <input type="radio" id="option2" name="installment" />
                    <label htmlFor="option2" className="cursor-pointer flex-1">
                      <span className="font-medium">3 Pagaments (Nov, Des, Gen)</span>
                      <p className="text-sm text-muted-foreground">3 × €50,00</p>
                    </label>
                  </div>
                  <div className="p-3 border rounded flex items-center gap-3">
                    <input type="radio" id="option3" name="installment" />
                    <label htmlFor="option3" className="cursor-pointer flex-1">
                      <span className="font-medium">5 Pagaments (Oct-Feb)</span>
                      <p className="text-sm text-muted-foreground">5 × €30,00</p>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bonificacions i Exencions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border rounded flex items-center gap-3">
                  <input type="checkbox" id="bonus1" defaultChecked />
                  <label htmlFor="bonus1" className="cursor-pointer flex-1">
                    <span className="font-medium">Germà/a escolaritzat/a</span>
                    <p className="text-sm text-muted-foreground">-20%</p>
                  </label>
                </div>
                <div className="p-3 border rounded flex items-center gap-3">
                  <input type="checkbox" id="bonus2" />
                  <label htmlFor="bonus2" className="cursor-pointer flex-1">
                    <span className="font-medium">Família nombrosa</span>
                    <p className="text-sm text-muted-foreground">-15%</p>
                  </label>
                </div>
                <div className="p-3 border rounded flex items-center gap-3">
                  <input type="checkbox" id="bonus3" />
                  <label htmlFor="bonus3" className="cursor-pointer flex-1">
                    <span className="font-medium">Renda baixa (justificant)</span>
                    <p className="text-sm text-muted-foreground">-50%</p>
                  </label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accés a Gestió Extern</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Obrir Sistema de Gestió de Pagaments
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Incidents Tab */}
          <TabsContent value="incidents" className="space-y-4 mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Incidents Registrats</CardTitle>
                  <CardDescription>Historial d'incidents de l'estudiant</CardDescription>
                </div>
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Nou Incident
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-4 border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-medium">Absència Injustificada - Matemàtiques</p>
                        <p className="text-sm text-muted-foreground mt-1">15/01/2025 - Notificat als pares</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 border border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-medium">Comportament Disruptiu - Classe 10:30</p>
                        <p className="text-sm text-muted-foreground mt-1">12/01/2025</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                {false && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No hi ha incidents registrats</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Comments Tab */}
          <TabsContent value="comentaris" className="space-y-4 mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Comentaris Acumulats</CardTitle>
                  <CardDescription>Comentaris de tutors, consellers i altres docents</CardDescription>
                </div>
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Nou Comentari
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">Raquel Martínez (Tutora)</p>
                      <p className="text-xs text-muted-foreground">20/01/2025</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="mt-2 text-sm">
                    L'estudiant mostra bona actitud a classe però necessita millorar la puntualitat. Ha crescut
                    motivacionallement en les últimes setmanes.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">Joan Pérez (Conseller)</p>
                      <p className="text-xs text-muted-foreground">18/01/2025</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="mt-2 text-sm">Reunió amb els pares: Han estat informats sobre el baixo rendiment en matemàtiques. Acordat posar tutor.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Afegir Comentari</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="comment">Comentari</Label>
                  <textarea
                    id="comment"
                    placeholder="Escriu el teu comentari..."
                    className="w-full mt-2 p-3 border rounded-lg min-h-24 dark:bg-slate-950 dark:text-white"
                  />
                </div>
                <Button className="w-full">Guardar Comentari</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Grades Tab */}
          <TabsContent value="qualificacions" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Expedient Acadèmic</CardTitle>
                <CardDescription>Qualificacions del curs actual</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-2">Assignatura</th>
                        <th className="text-center py-2 px-2">Nota Final</th>
                        <th className="text-center py-2 px-2">Estat</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { subject: "Matemàtiques", grade: 6.5, status: "Aprovat" },
                        { subject: "Llengua Catalana", grade: 7.8, status: "Aprovat" },
                        { subject: "Llengua Castellana", grade: 7.2, status: "Aprovat" },
                        { subject: "Història", grade: 5.5, status: "Aprovat" },
                        { subject: "Música", grade: 8.0, status: "Aprovat" },
                        { subject: "Biologia", grade: 4.2, status: "Suspès" },
                      ].map((item, i) => (
                        <tr key={i} className="border-b hover:bg-slate-50 dark:hover:bg-slate-900">
                          <td className="py-2 px-2">{item.subject}</td>
                          <td className="text-center py-2 px-2 font-medium">{item.grade}</td>
                          <td className="text-center py-2 px-2">
                            <span
                              className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                                item.status === "Aprovat"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attendance Tab */}
          <TabsContent value="assistencia" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Dades d'Assistència</CardTitle>
                <CardDescription>Seguimiento del registre d'hores per Learning Outcome (LO)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <Label className="text-sm font-medium text-muted-foreground">Absències Injustificades</Label>
                    <p className="text-2xl font-bold mt-2">3</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <Label className="text-sm font-medium text-muted-foreground">Taxa d'Assistència</Label>
                    <p className="text-2xl font-bold mt-2">94%</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Hores Dedicades per Learning Outcome</h4>
                  <div className="space-y-2">
                    {[
                      { lo: "LO1 - Competencies digitals", hours: 24 },
                      { lo: "LO2 - Comunicació efectiva", hours: 18 },
                      { lo: "LO3 - Treball en equip", hours: 20 },
                      { lo: "LO4 - Resolució de problemes", hours: 16 },
                    ].map((item, i) => (
                      <div key={i} className="p-3 border rounded flex items-center justify-between">
                        <span className="font-medium text-sm">{item.lo}</span>
                        <span className="text-sm text-muted-foreground">{item.hours}h</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Registre Diari</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <p>Visualització del registre diari d'assistència</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Communication Tab */}
          <TabsContent value="comunicacio" className="space-y-4 mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Comunicació</CardTitle>
                  <CardDescription>Missatges individuals i comunicacions de grup</CardDescription>
                </div>
                <Button size="sm" variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Enviar Missatge
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">Notificació d'Assistència Baixa</p>
                      <p className="text-xs text-muted-foreground">Grup 1 A - 18/01/2025</p>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded dark:bg-blue-900 dark:text-blue-200">
                      Enviada
                    </span>
                  </div>
                  <p className="mt-2 text-sm">
                    L'estudiant ha assolit el 85% d'assistència. Si es continua amb aquesta tendència...
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configuració de Notificacions Automàtiques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 border rounded">
                    <input type="checkbox" id="notif1" defaultChecked />
                    <label htmlFor="notif1" className="cursor-pointer flex-1">
                      <span className="font-medium text-sm">Notificar si absència és inferior a 90%</span>
                    </label>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded">
                    <input type="checkbox" id="notif2" defaultChecked />
                    <label htmlFor="notif2" className="cursor-pointer flex-1">
                      <span className="font-medium text-sm">Notificar si absència és inferior a 80%</span>
                    </label>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded">
                    <input type="checkbox" id="notif3" />
                    <label htmlFor="notif3" className="cursor-pointer flex-1">
                      <span className="font-medium text-sm">Notificar si absència és inferior a 70%</span>
                    </label>
                  </div>
                </div>
                <Button className="w-full">Guardar Configuració</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Substitutions Tab */}
          <TabsContent value="substitucions" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Substitucions i Permisos</CardTitle>
                <CardDescription>Informació sobre substitucions assignades a aquest estudiant</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <p className="font-medium">Sortida Didàctica - Museu Nacional</p>
                      <p className="text-sm text-muted-foreground mt-1">25/02/2025</p>
                      <p className="text-sm mt-2">
                        Professor substitut assignat: <span className="font-medium">Pere Sáez</span>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sortides i Activitats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-4 border rounded flex items-center justify-between">
                    <div>
                      <p className="font-medium">Sortida a l'Ajuntament</p>
                      <p className="text-sm text-muted-foreground">22/01/2025</p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded dark:bg-green-900 dark:text-green-200">
                      Confirmada
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}
