"use client"

import { useI18n } from "@/lib/i18n-context"
import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, School, Users, UserCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"

export default function TutoresPage() {
  const { t, language } = useI18n()
  const [mounted, setMounted] = useState(false)

  // Asegurarse de que el componente se monte correctamente en el cliente
  useEffect(() => {
    setMounted(true)
  }, [])

  // Forzar re-renderizado cuando cambia el idioma
  useEffect(() => {
    // Este efecto se ejecutará cada vez que cambie el idioma
    console.log("Idioma cambiado a:", language)
  }, [language])

  if (!mounted) {
    return null // No renderizar nada hasta que el componente esté montado
  }

  return (
    <PageLayout title={t("tutors.title")} description={t("tutors.description")}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("tutors.totalGroups")}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">{t("tutors.inTheEntireCenter")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("tutors.groupsWithTutor")}</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">20</div>
            <p className="text-xs text-muted-foreground">{t("tutors.percentageOfTotal", { percentage: 83 })}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("tutors.groupsWithoutTutor")}</CardTitle>
            <School className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">{t("tutors.pendingAssignment")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("tutors.pendingNotifications")}</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">{t("tutors.toPending")}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="asignacion" className="mt-6">
        <TabsList>
          <TabsTrigger value="asignacion">{t("tutors.tabs.assignment")}</TabsTrigger>
          <TabsTrigger value="notificaciones">{t("tutors.tabs.notifications")}</TabsTrigger>
        </TabsList>
        <TabsContent value="asignacion" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Select defaultValue="todos">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t("tutors.filterByLevel")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">{t("tutors.allLevels")}</SelectItem>
                  <SelectItem value="1eso">1º ESO</SelectItem>
                  <SelectItem value="2eso">2º ESO</SelectItem>
                  <SelectItem value="3eso">3º ESO</SelectItem>
                  <SelectItem value="4eso">4º ESO</SelectItem>
                  <SelectItem value="1bach">1º Bachillerato</SelectItem>
                  <SelectItem value="2bach">2º Bachillerato</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="todos">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t("tutors.filterByStatus")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">{t("tutors.allGroups")}</SelectItem>
                  <SelectItem value="contutor">{t("tutors.withTutor")}</SelectItem>
                  <SelectItem value="sintutor">{t("tutors.withoutTutor")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Input placeholder={t("tutors.searchGroupOrTutor")} className="max-w-xs" />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>{t("tutors.groups")}</CardTitle>
              <CardDescription>{t("tutors.assignTutorsToGroups")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="p-4 border-b bg-muted/50">
                  <div className="grid grid-cols-6 gap-4 font-medium">
                    <div>{t("tutors.group")}</div>
                    <div>{t("tutors.level")}</div>
                    <div>{t("tutors.students")}</div>
                    <div>{t("tutors.tutor")}</div>
                    <div>{t("tutors.status")}</div>
                    <div className="text-right">{t("tutors.actions")}</div>
                  </div>
                </div>
                <div className="divide-y">
                  <div className="p-4">
                    <div className="grid grid-cols-6 gap-4">
                      <div>1º ESO A</div>
                      <div>1º ESO</div>
                      <div>28</div>
                      <div>María López</div>
                      <div>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{t("tutors.assigned")}</Badge>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          {t("tutors.changeTutor")}
                        </Button>
                        <Button variant="outline" size="sm">
                          {t("tutors.notify")}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-6 gap-4">
                      <div>2º ESO B</div>
                      <div>2º ESO</div>
                      <div>26</div>
                      <div>Carlos Rodríguez</div>
                      <div>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{t("tutors.assigned")}</Badge>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          {t("tutors.changeTutor")}
                        </Button>
                        <Button variant="outline" size="sm">
                          {t("tutors.notify")}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-6 gap-4">
                      <div>3º ESO C</div>
                      <div>3º ESO</div>
                      <div>25</div>
                      <div>-</div>
                      <div>
                        <Badge variant="destructive">{t("tutors.unassigned")}</Badge>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button size="sm">{t("tutors.assignTutor")}</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notificaciones" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("tutors.notificationsSettings")}</CardTitle>
              <CardDescription>{t("tutors.configureAutomaticNotifications")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">{t("tutors.notificationTypes")}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{t("tutors.attendanceNotices")}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{t("tutors.notifyAttendance")}</span>
                            <input type="checkbox" className="toggle" defaultChecked />
                          </div>
                          <div className="space-y-1">
                            <label className="text-sm">{t("tutors.warningThreshold")}</label>
                            <Input type="number" defaultValue="10" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-sm">{t("tutors.lossThreshold")}</label>
                            <Input type="number" defaultValue="20" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{t("tutors.observations")}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{t("tutors.notifyObservations")}</span>
                            <input type="checkbox" className="toggle" defaultChecked />
                          </div>
                          <div className="space-y-1">
                            <label className="text-sm">{t("tutors.frequency")}</label>
                            <Select defaultValue="diaria">
                              <SelectTrigger>
                                <SelectValue placeholder={t("tutors.selectFrequency")} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="inmediata">{t("tutors.immediate")}</SelectItem>
                                <SelectItem value="diaria">{t("tutors.daily")}</SelectItem>
                                <SelectItem value="semanal">{t("tutors.weekly")}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{t("tutors.justifications")}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{t("tutors.notifyJustifications")}</span>
                            <input type="checkbox" className="toggle" defaultChecked />
                          </div>
                          <div className="space-y-1">
                            <label className="text-sm">{t("tutors.frequency")}</label>
                            <Select defaultValue="diaria">
                              <SelectTrigger>
                                <SelectValue placeholder={t("tutors.selectFrequency")} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="inmediata">{t("tutors.immediate")}</SelectItem>
                                <SelectItem value="diaria">{t("tutors.daily")}</SelectItem>
                                <SelectItem value="semanal">{t("tutors.weekly")}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">{t("tutors.additionalOptions")}</h3>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{t("tutors.sendCopyToHeadOfStudies")}</h4>
                            <p className="text-sm text-muted-foreground">{t("tutors.copyToHeadDescription")}</p>
                          </div>
                          <input type="checkbox" className="toggle" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{t("tutors.emailNotifications")}</h4>
                            <p className="text-sm text-muted-foreground">{t("tutors.emailNotificationsDescription")}</p>
                          </div>
                          <input type="checkbox" className="toggle" defaultChecked />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="flex justify-end">
                  <Button>{t("tutors.saveSettings")}</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  )
}
