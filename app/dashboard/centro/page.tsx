"use client"

import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Building,
  GraduationCap,
  Clock,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Globe,
  Plus,
  Pencil,
  Save,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { useState } from "react"
import { useI18n } from "@/lib/i18n-context"

export default function CentroPage() {
  const [showTimeSlots, setShowTimeSlots] = useState(false)
  const { t } = useI18n()

  return (
    <PageLayout
      title={t("center.title")}
      description={t("center.description")}
      actions={
        <Button>
          <Save className="mr-2 h-4 w-4" />
          {t("center.saveChanges")}
        </Button>
      }
    >
      <Tabs defaultValue="general">
        <TabsList className="mb-6">
          <TabsTrigger value="general">{t("center.generalInfo")}</TabsTrigger>
          <TabsTrigger value="estudios">{t("center.studies")}</TabsTrigger>
          <TabsTrigger value="horarios">{t("center.schedulesAndSlots")}</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>{t("center.centerData")}</CardTitle>
              <CardDescription>{t("center.centerDataDescription")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("center.centerName")}</label>
                  <Input defaultValue="IES Ejemplo" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("center.centerCode")}</label>
                  <Input defaultValue="12345678" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("common.phone")}</label>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <Input defaultValue="912 345 678" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("common.email")}</label>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <Input defaultValue="info@iesejemplo.edu" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("center.website")}</label>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <Input defaultValue="https://www.iesejemplo.edu" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("center.address")}</label>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <Input defaultValue="Calle Ejemplo, 123, 08001 Barcelona" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("center.description")}</label>
                <Textarea
                  defaultValue="El IES Ejemplo es un centro educativo público que ofrece educación secundaria obligatoria, bachillerato y ciclos formativos. Nuestro objetivo es proporcionar una educación de calidad que prepare a nuestros estudiantes para su futuro académico y profesional."
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("center.centerLogo")}</label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 border rounded-md flex items-center justify-center bg-muted">
                    <Building className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <Button variant="outline">{t("center.changeLogo")}</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>{t("center.additionalContactInfo")}</CardTitle>
              <CardDescription>{t("center.specificCenterContacts")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{t("center.direction")}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="font-medium">{t("common.name")}:</span> Ana García Martínez
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">{t("common.email")}:</span> direccion@iesejemplo.edu
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">{t("common.phone")}:</span> 912 345 679
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button variant="outline" size="sm" className="w-full">
                        <Pencil className="h-3 w-3 mr-1" /> {t("center.edit")}
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{t("center.headOfStudies")}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="font-medium">{t("common.name")}:</span> Carlos Rodríguez López
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">{t("common.email")}:</span> jefatura@iesejemplo.edu
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">{t("common.phone")}:</span> 912 345 680
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button variant="outline" size="sm" className="w-full">
                        <Pencil className="h-3 w-3 mr-1" /> {t("center.edit")}
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{t("center.secretary")}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="font-medium">{t("common.name")}:</span> María Sánchez Pérez
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">{t("common.email")}:</span> secretaria@iesejemplo.edu
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">{t("common.phone")}:</span> 912 345 681
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button variant="outline" size="sm" className="w-full">
                        <Pencil className="h-3 w-3 mr-1" /> {t("center.edit")}
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="estudios">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>{t("center.offeredStudies")}</CardTitle>
                  <CardDescription>{t("center.manageStudiesOffered")}</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  {t("center.addNewStudy")}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Educación Secundaria Obligatoria (ESO)",
                    levels: ["1º ESO", "2º ESO", "3º ESO", "4º ESO"],
                    groups: 12,
                    students: 320,
                  },
                  {
                    name: "Bachillerato",
                    levels: ["1º Bachillerato", "2º Bachillerato"],
                    groups: 6,
                    students: 180,
                  },
                  {
                    name: "Ciclo Formativo de Grado Medio - Sistemas Microinformáticos y Redes",
                    levels: ["1º SMR", "2º SMR"],
                    groups: 2,
                    students: 60,
                  },
                  {
                    name: "Ciclo Formativo de Grado Superior - Desarrollo de Aplicaciones Web",
                    levels: ["1º DAW", "2º DAW"],
                    groups: 2,
                    students: 60,
                  },
                ].map((study, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{study.name}</CardTitle>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Pencil className="h-3 w-3 mr-1" /> {t("center.edit")}
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">{t("center.levels")}</h4>
                          <div className="flex flex-wrap gap-2">
                            {study.levels.map((level, i) => (
                              <Badge key={i} variant="outline">
                                {level}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">{t("center.groups")}</h4>
                          <div className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {study.groups} {t("center.groups")}
                            </span>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">{t("center.students")}</h4>
                          <div className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {study.students} {t("center.students")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="horarios">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>{t("center.shifts")}</CardTitle>
                    <CardDescription>{t("center.manageShifts")}</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    {t("center.addNewShift")}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: t("center.morningShift"),
                      startTime: "08:00",
                      endTime: "14:30",
                      studies: ["ESO", "Bachillerato"],
                    },
                    {
                      name: t("center.afternoonShift"),
                      startTime: "15:00",
                      endTime: "21:30",
                      studies: ["Ciclos Formativos"],
                    },
                  ].map((turn, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-base">{turn.name}</CardTitle>
                          <Button variant="outline" size="sm">
                            <Pencil className="h-3 w-3 mr-1" /> {t("center.edit")}
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              {turn.startTime} - {turn.endTime}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {turn.studies.map((study, i) => (
                              <Badge key={i} variant="outline">
                                {study}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>{t("center.timeSlots")}</CardTitle>
                    <CardDescription>{t("center.manageTimeSlots")}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setShowTimeSlots(!showTimeSlots)}>
                      {showTimeSlots ? (
                        <>
                          <ChevronUp className="h-4 w-4 mr-2" />
                          {t("center.hideSlots")}
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4 mr-2" />
                          {t("center.showSlots")}
                        </>
                      )}
                    </Button>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      {t("center.addSlot")}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {showTimeSlots ? (
                  <div className="space-y-4">
                    <div className="rounded-md border">
                      <div className="p-4 border-b bg-muted/50">
                        <div className="grid grid-cols-4 gap-4 font-medium">
                          <div>{t("center.name")}</div>
                          <div>{t("center.startTime")}</div>
                          <div>{t("center.endTime")}</div>
                          <div className="text-right">{t("center.actions")}</div>
                        </div>
                      </div>
                      <div className="divide-y">
                        {[
                          { name: "1ª hora", start: "08:00", end: "09:00", isBreak: false },
                          { name: "2ª hora", start: "09:00", end: "10:00", isBreak: false },
                          { name: "3ª hora", start: "10:00", end: "11:00", isBreak: false },
                          { name: "Recreo", start: "11:00", end: "11:30", isBreak: true },
                          { name: "4ª hora", start: "11:30", end: "12:30", isBreak: false },
                          { name: "5ª hora", start: "12:30", end: "13:30", isBreak: false },
                          { name: "6ª hora", start: "13:30", end: "14:30", isBreak: false },
                        ].map((slot, index) => (
                          <div className="p-4" key={index}>
                            <div className="grid grid-cols-4 gap-4">
                              <div className="flex items-center gap-2">
                                {slot.name}
                                {slot.isBreak && (
                                  <Badge variant="outline" className="ml-2">
                                    {t("center.break")}
                                  </Badge>
                                )}
                              </div>
                              <div>{slot.start}</div>
                              <div>{slot.end}</div>
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline" size="sm">
                                  <Pencil className="h-3 w-3 mr-1" /> {t("center.edit")}
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8">
                    <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground text-center">
                      Fes clic a 'Veure franges' per mostrar les franges horàries del centre
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>{t("center.schoolCalendar")}</CardTitle>
              <CardDescription>{t("center.manageSchoolCalendar")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{t("center.courseStart")}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <Input type="date" defaultValue="2023-09-12" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{t("center.courseEnd")}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <Input type="date" defaultValue="2024-06-21" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{t("center.nonSchoolDays")}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">12/10/2023</Badge>
                          <Badge variant="outline">01/11/2023</Badge>
                          <Badge variant="outline">06/12/2023</Badge>
                          <Badge variant="outline">08/12/2023</Badge>
                          <Badge variant="outline">25/12/2023</Badge>
                          <Badge variant="outline">01/01/2024</Badge>
                          <Badge variant="outline">06/01/2024</Badge>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-2">
                          <Plus className="h-3 w-3 mr-1" /> {t("center.addDay")}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">{t("center.saveCalendar")}</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  )
}
