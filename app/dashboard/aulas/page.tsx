"use client"

import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building, Calendar, DoorOpen, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useI18n } from "@/lib/i18n-context"

export default function AulasPage() {
  const { t } = useI18n()

  return (
    <PageLayout title={t("classrooms.title")} description={t("classrooms.description")}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("classrooms.totalClassrooms")}</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">{t("classrooms.inTheEntireCenter")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("classrooms.reservableClassrooms")}</CardTitle>
            <DoorOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">{t("classrooms.availableForReservation")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("classrooms.activeReservations")}</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">{t("classrooms.forToday")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("classrooms.pendingReservations")}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">{t("classrooms.toApprove")}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="aulas" className="mt-6">
        <TabsList>
          <TabsTrigger value="aulas">{t("classrooms.classroomsAndSpaces")}</TabsTrigger>
          <TabsTrigger value="reservas">{t("classrooms.reservations")}</TabsTrigger>
        </TabsList>
        <TabsContent value="aulas" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Select defaultValue="todos">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t("classrooms.filterByType")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">{t("classrooms.allTypes")}</SelectItem>
                  <SelectItem value="estandar">{t("classrooms.standardClassroom")}</SelectItem>
                  <SelectItem value="especializada">{t("classrooms.specializedClassroom")}</SelectItem>
                  <SelectItem value="laboratorio">{t("classrooms.laboratory")}</SelectItem>
                  <SelectItem value="comun">{t("classrooms.commonSpace")}</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="todos">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t("classrooms.filterByBuilding")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">{t("classrooms.allBuildings")}</SelectItem>
                  <SelectItem value="principal">{t("classrooms.mainBuilding")}</SelectItem>
                  <SelectItem value="anexo">{t("classrooms.annexBuilding")}</SelectItem>
                  <SelectItem value="deportivo">{t("classrooms.sportsCenter")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">{t("classrooms.cardView")}</Button>
              <Button variant="outline">{t("classrooms.listView")}</Button>
              <Button>{t("classrooms.newSpace")}</Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="overflow-hidden">
              <CardHeader className="p-4">
                <CardTitle className="text-lg">{t("classrooms.classroom")} 101</CardTitle>
                <CardDescription>
                  {t("classrooms.standardClassroom")} - {t("classrooms.floor")} 1
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{t("classrooms.capacity")}:</span>
                    <span className="text-sm">30 {t("classrooms.students")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{t("classrooms.building")}:</span>
                    <span className="text-sm">{t("classrooms.mainBuilding")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{t("classrooms.reservable")}:</span>
                    <Badge variant="outline" className="text-sm">
                      {t("classrooms.yes")}
                    </Badge>
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <Button variant="outline" size="sm">
                    {t("classrooms.viewSchedule")}
                  </Button>
                  <Button size="sm">{t("classrooms.reserve")}</Button>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <CardHeader className="p-4">
                <CardTitle className="text-lg">{t("classrooms.physicsLab")}</CardTitle>
                <CardDescription>
                  {t("classrooms.laboratory")} - {t("classrooms.floor")} 2
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{t("classrooms.capacity")}:</span>
                    <span className="text-sm">25 {t("classrooms.students")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{t("classrooms.building")}:</span>
                    <span className="text-sm">{t("classrooms.mainBuilding")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{t("classrooms.reservable")}:</span>
                    <Badge variant="outline" className="text-sm">
                      {t("classrooms.yes")}
                    </Badge>
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <Button variant="outline" size="sm">
                    {t("classrooms.viewSchedule")}
                  </Button>
                  <Button size="sm">{t("classrooms.reserve")}</Button>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <CardHeader className="p-4">
                <CardTitle className="text-lg">{t("classrooms.auditorium")}</CardTitle>
                <CardDescription>
                  {t("classrooms.commonSpace")} - {t("classrooms.groundFloor")}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{t("classrooms.capacity")}:</span>
                    <span className="text-sm">150 {t("classrooms.people")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{t("classrooms.building")}:</span>
                    <span className="text-sm">{t("classrooms.mainBuilding")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{t("classrooms.reservable")}:</span>
                    <Badge variant="outline" className="text-sm">
                      {t("classrooms.yes")}
                    </Badge>
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <Button variant="outline" size="sm">
                    {t("classrooms.viewSchedule")}
                  </Button>
                  <Button size="sm">{t("classrooms.reserve")}</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="reservas" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("classrooms.reservations")}</CardTitle>
              <CardDescription>{t("classrooms.manageClassroomReservations")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <Input placeholder={t("classrooms.searchReservations")} className="max-w-sm" />
                <Button>{t("classrooms.newReservation")}</Button>
              </div>
              <div className="rounded-md border">
                <div className="p-4 border-b bg-muted/50">
                  <div className="grid grid-cols-6 gap-4 font-medium">
                    <div>{t("classrooms.space")}</div>
                    <div>{t("classrooms.date")}</div>
                    <div>{t("classrooms.schedule")}</div>
                    <div>{t("classrooms.teacher")}</div>
                    <div>{t("classrooms.reason")}</div>
                    <div className="text-right">{t("classrooms.actions")}</div>
                  </div>
                </div>
                <div className="divide-y">
                  <div className="p-4">
                    <div className="grid grid-cols-6 gap-4">
                      <div>{t("classrooms.classroom")} 101</div>
                      <div>15/05/2023</div>
                      <div>10:00 - 11:00</div>
                      <div>María López</div>
                      <div>{t("classrooms.exam")}</div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          {t("classrooms.edit")}
                        </Button>
                        <Button variant="outline" size="sm">
                          {t("classrooms.cancel")}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-6 gap-4">
                      <div>{t("classrooms.physicsLab")}</div>
                      <div>16/05/2023</div>
                      <div>12:30 - 14:30</div>
                      <div>Carlos Rodríguez</div>
                      <div>{t("classrooms.practice")}</div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          {t("classrooms.edit")}
                        </Button>
                        <Button variant="outline" size="sm">
                          {t("classrooms.cancel")}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-6 gap-4">
                      <div>{t("classrooms.auditorium")}</div>
                      <div>20/05/2023</div>
                      <div>16:00 - 18:00</div>
                      <div>Ana Martínez</div>
                      <div>{t("classrooms.parentsMeeting")}</div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          {t("classrooms.edit")}
                        </Button>
                        <Button variant="outline" size="sm">
                          {t("classrooms.cancel")}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  )
}
