"use client"

import { useState, useEffect } from "react"
import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Map, Users, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/lib/i18n-context"

export default function SalidasPage() {
  const { t, language } = useI18n()
  const [mounted, setMounted] = useState(false)

  // Controlar el montaje del componente
  useEffect(() => {
    setMounted(true)
  }, [])

  // Monitorear cambios de idioma
  useEffect(() => {
    console.log("Idioma cambiado en SalidasPage a:", language)
  }, [language])

  // No renderizar nada hasta que el componente esté montado
  if (!mounted) {
    return null
  }

  return (
    <PageLayout title={t("exits.title")} description={t("exits.description")}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("exits.totalExits")}</CardTitle>
            <Map className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">{t("exits.thisAcademicYear")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("exits.scheduled")}</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">{t("exits.forThisTrimester")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("exits.pending")}</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">{t("exits.forApproval")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("exits.nextExit")}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15/06</div>
            <p className="text-xs text-muted-foreground">{t("exits.scienceMuseum")}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="lista" className="mt-6">
        <TabsList>
          <TabsTrigger value="lista">{t("exits.exitsList")}</TabsTrigger>
          <TabsTrigger value="calendario">{t("exits.calendarView")}</TabsTrigger>
        </TabsList>
        <TabsContent value="lista" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Select defaultValue="todos">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t("exits.filterByStatus")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">{t("common.all")}</SelectItem>
                  <SelectItem value="programada">{t("exits.scheduled")}</SelectItem>
                  <SelectItem value="pendiente">{t("exits.pendingApproval")}</SelectItem>
                  <SelectItem value="cancelada">{t("exits.cancelled")}</SelectItem>
                  <SelectItem value="realizada">{t("exits.completed")}</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="todos">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t("exits.filterByLevel")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">{t("common.all")}</SelectItem>
                  <SelectItem value="1eso">1º ESO</SelectItem>
                  <SelectItem value="2eso">2º ESO</SelectItem>
                  <SelectItem value="3eso">3º ESO</SelectItem>
                  <SelectItem value="4eso">4º ESO</SelectItem>
                  <SelectItem value="1bach">1º {t("exits.highSchool")}</SelectItem>
                  <SelectItem value="2bach">2º {t("exits.highSchool")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>{t("exits.newExit")}</Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>{t("exits.title")}</CardTitle>
              <CardDescription>{t("exits.manageAllExits")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="p-4 border-b bg-muted/50">
                  <div className="grid grid-cols-7 gap-4 font-medium">
                    <div>{t("common.name")}</div>
                    <div>{t("exits.destination")}</div>
                    <div>{t("common.date")}</div>
                    <div>{t("exits.groups")}</div>
                    <div>{t("exits.teachers")}</div>
                    <div>{t("common.status")}</div>
                    <div className="text-right">{t("common.actions")}</div>
                  </div>
                </div>
                <div className="divide-y">
                  <div className="p-4">
                    <div className="grid grid-cols-7 gap-4">
                      <div>{t("exits.scienceMuseum")}</div>
                      <div>{t("exits.nationalMuseum")}</div>
                      <div>15/06/2023</div>
                      <div>1º ESO A, B</div>
                      <div>María López, Juan Pérez</div>
                      <div>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{t("exits.scheduled")}</Badge>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          {t("common.details")}
                        </Button>
                        <Button variant="outline" size="sm">
                          {t("common.edit")}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-7 gap-4">
                      <div>{t("exits.englishTheater")}</div>
                      <div>{t("exits.municipalTheater")}</div>
                      <div>22/06/2023</div>
                      <div>3º ESO A, B, C</div>
                      <div>Ana Martínez, Carlos Ruiz</div>
                      <div>
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                          {t("exits.pending")}
                        </Badge>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          {t("common.details")}
                        </Button>
                        <Button variant="outline" size="sm">
                          {t("common.edit")}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-7 gap-4">
                      <div>{t("exits.endOfYearTrip")}</div>
                      <div>{t("exits.naturalPark")}</div>
                      <div>28/06/2023</div>
                      <div>4º ESO A, B</div>
                      <div>Pedro Sánchez, Laura Gómez</div>
                      <div>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{t("exits.scheduled")}</Badge>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          {t("common.details")}
                        </Button>
                        <Button variant="outline" size="sm">
                          {t("common.edit")}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-7 gap-4">
                      <div>{t("exits.universityVisit")}</div>
                      <div>{t("exits.centralUniversity")}</div>
                      <div>10/05/2023</div>
                      <div>2º {t("exits.highSchool")} A, B</div>
                      <div>Carmen Díaz, Roberto Fernández</div>
                      <div>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{t("exits.completed")}</Badge>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          {t("common.details")}
                        </Button>
                        <Button variant="outline" size="sm">
                          {t("exits.report")}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="calendario" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("exits.exitsCalendar")}</CardTitle>
              <CardDescription>{t("exits.monthlyViewOfScheduledExits")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">{t("exits.exitsCalendarInDevelopment")}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("exits.newExit")}</CardTitle>
            <CardDescription>{t("exits.createNewExit")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("exits.exitName")}</label>
                  <Input placeholder={t("exits.exitNamePlaceholder")} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("exits.destination")}</label>
                  <Input placeholder={t("exits.destinationPlaceholder")} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("exits.startDate")}</label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("exits.endDate")}</label>
                  <div className="flex items-center space-x-2">
                    <Input type="date" disabled />
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="sameDay" className="rounded" />
                      <label htmlFor="sameDay" className="text-sm">
                        {t("exits.sameDay")}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("exits.startTime")}</label>
                  <Input type="time" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("exits.endTime")}</label>
                  <Input type="time" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("exits.minimumPlaces")}</label>
                  <Input type="number" min="0" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("exits.maximumPlaces")}</label>
                  <Input type="number" min="0" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("exits.participatingGroups")}</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={t("exits.selectGroups")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1esoa">1º ESO A</SelectItem>
                      <SelectItem value="1esob">1º ESO B</SelectItem>
                      <SelectItem value="2esoa">2º ESO A</SelectItem>
                      <SelectItem value="2esob">2º ESO B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("exits.accompanyingTeachers")}</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={t("exits.selectTeachers")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mlopez">María López</SelectItem>
                      <SelectItem value="jperez">Juan Pérez</SelectItem>
                      <SelectItem value="amartinez">Ana Martínez</SelectItem>
                      <SelectItem value="cruiz">Carlos Ruiz</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("common.description")}</label>
                <textarea
                  className="w-full min-h-[100px] p-2 border rounded-md"
                  placeholder={t("exits.descriptionPlaceholder")}
                ></textarea>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="mandatory" className="rounded" />
                <label htmlFor="mandatory" className="text-sm font-medium">
                  {t("exits.mandatory")}
                </label>
              </div>
              <div className="flex justify-end">
                <Button>{t("exits.saveExit")}</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}
