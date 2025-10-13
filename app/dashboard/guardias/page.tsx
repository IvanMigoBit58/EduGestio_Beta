"use client"

import { useState, useEffect } from "react"
import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Shield, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { useI18n } from "@/lib/i18n-context"

export default function GuardiasPage() {
  const { t, language } = useI18n()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    console.log("Idioma cambiado en GuardiasPage a:", language)
  }, [language])

  if (!mounted) {
    return null
  }

  return (
    <PageLayout title={t("guards.title")} description={t("guards.description")}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("guards.todayGuards")}</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">{t("guards.pendingAssignment")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("guards.pendingGuards")}</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">{t("guards.forThisWeek")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("guards.completedGuards")}</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">{t("guards.thisMonth")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("guards.nextGuard")}</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10:15</div>
            <p className="text-xs text-muted-foreground">{t("guards.classroom")} 203 - 3º ESO B</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="registro" className="mt-6">
        <TabsList>
          <TabsTrigger value="registro">{t("guards.absenceRegistry")}</TabsTrigger>
          <TabsTrigger value="asignacion">{t("guards.guardsAssignment")}</TabsTrigger>
          <TabsTrigger value="historial">{t("guards.history")}</TabsTrigger>
        </TabsList>
        <TabsContent value="registro" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">{t("guards.myRegisteredAbsences")}</h3>
            <Button>{t("guards.registerAbsence")}</Button>
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="rounded-md border">
                <div className="p-4 border-b bg-muted/50">
                  <div className="grid grid-cols-5 gap-4 font-medium">
                    <div>{t("common.date")}</div>
                    <div>{t("guards.schedule")}</div>
                    <div>{t("common.reason")}</div>
                    <div>{t("common.status")}</div>
                    <div className="text-right">{t("common.actions")}</div>
                  </div>
                </div>
                <div className="divide-y">
                  <div className="p-4">
                    <div className="grid grid-cols-5 gap-4">
                      <div>15/05/2023</div>
                      <div>10:00 - 11:00</div>
                      <div>{t("guards.medicalAppointment")}</div>
                      <div>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{t("guards.assigned")}</Badge>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          {t("common.viewDetails")}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-5 gap-4">
                      <div>22/05/2023</div>
                      <div>{t("guards.fullDay")}</div>
                      <div>{t("guards.medicalLeave")}</div>
                      <div>
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                          {t("guards.pending")}
                        </Badge>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          {t("common.viewDetails")}
                        </Button>
                        <Button variant="outline" size="sm">
                          {t("common.cancel")}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>{t("guards.registerNewAbsence")}</CardTitle>
              <CardDescription>{t("guards.informAbsencesForGuards")}</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t("guards.absenceType")}</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={t("guards.selectType")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="completo">{t("guards.fullDay")}</SelectItem>
                        <SelectItem value="horas">{t("guards.specificHours")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t("guards.absenceDate")}</label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t("guards.startTime")}</label>
                    <Input type="time" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t("guards.endTime")}</label>
                    <Input type="time" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">{t("guards.absenceReason")}</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={t("guards.selectReason")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baja">{t("guards.medicalLeave")}</SelectItem>
                        <SelectItem value="cita">{t("guards.medicalAppointment")}</SelectItem>
                        <SelectItem value="permiso">{t("guards.personalLeave")}</SelectItem>
                        <SelectItem value="formacion">{t("guards.training")}</SelectItem>
                        <SelectItem value="otro">{t("guards.other")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">{t("guards.observations")}</label>
                    <Textarea placeholder={t("guards.observationsPlaceholder")} />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button>{t("guards.registerAbsence")}</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="asignacion" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("guards.pendingAssignmentAbsences")}</CardTitle>
              <CardDescription>{t("guards.assignTeachersToAbsences")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="p-4 border-b bg-muted/50">
                  <div className="grid grid-cols-6 gap-4 font-medium">
                    <div>{t("guards.absentTeacher")}</div>
                    <div>{t("common.date")}</div>
                    <div>{t("guards.schedule")}</div>
                    <div>{t("guards.group")}</div>
                    <div>{t("guards.classroom")}</div>
                    <div className="text-right">{t("common.actions")}</div>
                  </div>
                </div>
                <div className="divide-y">
                  <div className="p-4">
                    <div className="grid grid-cols-6 gap-4">
                      <div>María López</div>
                      <div>15/05/2023</div>
                      <div>10:00 - 11:00</div>
                      <div>3º ESO B</div>
                      <div>203</div>
                      <div className="flex justify-end space-x-2">
                        <Button size="sm">{t("guards.assignGuard")}</Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-6 gap-4">
                      <div>Carlos Rodríguez</div>
                      <div>15/05/2023</div>
                      <div>12:30 - 13:30</div>
                      <div>2º ESO A</div>
                      <div>105</div>
                      <div className="flex justify-end space-x-2">
                        <Button size="sm">{t("guards.assignGuard")}</Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-6 gap-4">
                      <div>Ana Martínez</div>
                      <div>16/05/2023</div>
                      <div>09:00 - 10:00</div>
                      <div>4º ESO C</div>
                      <div>302</div>
                      <div className="flex justify-end space-x-2">
                        <Button size="sm">{t("guards.assignGuard")}</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t("guards.guardsSummary")}</CardTitle>
                <CardDescription>{t("guards.guardsByTeacherThisMonth")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>María Sánchez</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Juan Pérez</span>
                    <span className="font-medium">6</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Laura Gómez</span>
                    <span className="font-medium">5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Carlos Ruiz</span>
                    <span className="font-medium">4</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ana Martínez</span>
                    <span className="font-medium">3</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t("guards.myCompletedGuards")}</CardTitle>
                <CardDescription>{t("guards.yourCompletedGuards")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>10/05/2023 - 3º ESO A</span>
                    <Badge variant="outline">{t("guards.completed")}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>08/05/2023 - 2º ESO B</span>
                    <Badge variant="outline">{t("guards.completed")}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>05/05/2023 - 1º ESO C</span>
                    <Badge variant="outline">{t("guards.completed")}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>03/05/2023 - 4º ESO A</span>
                    <Badge variant="outline">{t("guards.completed")}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t("guards.upcomingGuards")}</CardTitle>
                <CardDescription>{t("guards.assignedPendingGuards")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>15/05/2023 - 10:15</span>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{t("guards.today")}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>17/05/2023 - 09:00</span>
                    <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{t("guards.pending")}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>18/05/2023 - 12:30</span>
                    <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{t("guards.pending")}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="historial" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("guards.completeGuardsHistory")}</CardTitle>
              <CardDescription>{t("guards.historicalRecordOfAllGuards")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                  <Select defaultValue="todos">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={t("guards.filterByStatus")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">{t("guards.allStatuses")}</SelectItem>
                      <SelectItem value="pendiente">{t("guards.pending")}</SelectItem>
                      <SelectItem value="asignada">{t("guards.assigned")}</SelectItem>
                      <SelectItem value="completada">{t("guards.completed")}</SelectItem>
                      <SelectItem value="cancelada">{t("guards.cancelled")}</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="todos">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={t("guards.filterByTeacher")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">{t("guards.allTeachers")}</SelectItem>
                      <SelectItem value="mlopez">María López</SelectItem>
                      <SelectItem value="crodriguez">Carlos Rodríguez</SelectItem>
                      <SelectItem value="amartinez">Ana Martínez</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Input placeholder={t("common.search")} className="max-w-xs" />
              </div>
              <div className="rounded-md border">
                <div className="p-4 border-b bg-muted/50">
                  <div className="grid grid-cols-6 gap-4 font-medium">
                    <div>{t("common.date")}</div>
                    <div>{t("guards.schedule")}</div>
                    <div>{t("guards.absentTeacher")}</div>
                    <div>{t("guards.substitute")}</div>
                    <div>{t("common.status")}</div>
                    <div className="text-right">{t("common.actions")}</div>
                  </div>
                </div>
                <div className="divide-y">
                  {[...Array(5)].map((_, i) => (
                    <div className="p-4" key={i}>
                      <div className="grid grid-cols-6 gap-4">
                        <div>{`${10 - i}/05/2023`}</div>
                        <div>{i % 2 === 0 ? "10:00 - 11:00" : "12:30 - 13:30"}</div>
                        <div>{i % 3 === 0 ? "María López" : i % 3 === 1 ? "Carlos Rodríguez" : "Ana Martínez"}</div>
                        <div>{i % 3 === 0 ? "Juan Pérez" : i % 3 === 1 ? "Laura Gómez" : "Pedro Sánchez"}</div>
                        <div>
                          <Badge
                            className={
                              i === 0
                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                : i === 1
                                  ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                  : "bg-green-100 text-green-800 hover:bg-green-100"
                            }
                          >
                            {i === 0 ? t("guards.pending") : i === 1 ? t("guards.assigned") : t("guards.completed")}
                          </Badge>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            {t("common.viewDetails")}
                          </Button>
                          {i === 0 && (
                            <Button size="sm" variant="outline">
                              {t("common.cancel")}
                            </Button>
                          )}
                          {i === 1 && <Button size="sm">{t("guards.complete")}</Button>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  )
}
