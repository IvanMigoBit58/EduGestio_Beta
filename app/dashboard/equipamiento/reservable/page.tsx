"use client"

import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Laptop, Monitor, Tablet, Clock, Filter, CalendarDays, LayoutGrid, List } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

export default function ReservablePage() {
  const { t } = useI18n()

  return (
    <PageLayout
      title={t("equipment.reservable.title")}
      description={t("equipment.reservable.description")}
      actions={
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          {t("equipment.reservable.reserveEquipment")}
        </Button>
      }
    >
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input placeholder={t("equipment.reservable.searchPlaceholder")} />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="todos">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t("equipment.reservable.filterByType")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">{t("equipment.reservable.allTypes")}</SelectItem>
              <SelectItem value="ordenador">{t("equipment.type.computer")}</SelectItem>
              <SelectItem value="monitor">{t("equipment.type.monitor")}</SelectItem>
              <SelectItem value="tablet">{t("equipment.type.tablet")}</SelectItem>
              <SelectItem value="proyector">{t("equipment.type.projector")}</SelectItem>
              <SelectItem value="audio">{t("equipment.type.audio")}</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="disponible">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t("equipment.reservable.filterByAvailability")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">{t("equipment.reservable.all")}</SelectItem>
              <SelectItem value="disponible">{t("equipment.reservable.availableNow")}</SelectItem>
              <SelectItem value="reservado">{t("equipment.reservable.reserved")}</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="disponible">
        <TabsList>
          <TabsTrigger value="disponible">{t("equipment.reservable.available")}</TabsTrigger>
          <TabsTrigger value="reservado">{t("equipment.reservable.reserved")}</TabsTrigger>
          <TabsTrigger value="calendario">{t("equipment.reservable.calendar")}</TabsTrigger>
        </TabsList>
        <TabsContent value="disponible" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[
              {
                icon: <Laptop className="h-8 w-8 text-primary" />,
                name: "Portátil HP ProBook",
                code: "LP-001",
                type: "Ordenador",
                characteristics: "Intel i5, 8GB RAM, 256GB SSD",
                nextReservation: null,
              },
              {
                icon: <Tablet className="h-8 w-8 text-primary" />,
                name: 'iPad 10.2"',
                code: "TB-013",
                type: "Tablet",
                characteristics: "32GB, WiFi, Funda protectora",
                nextReservation: "Mañana, 10:00",
              },
              {
                icon: <Monitor className="h-8 w-8 text-primary" />,
                name: "Proyector Epson",
                code: "PR-005",
                type: "Proyector",
                characteristics: "3000 lúmenes, HDMI, VGA",
                nextReservation: null,
              },
              {
                icon: <Laptop className="h-8 w-8 text-primary" />,
                name: "Portátil Lenovo ThinkPad",
                code: "LP-015",
                type: "Ordenador",
                characteristics: "Intel i7, 16GB RAM, 512GB SSD",
                nextReservation: "Hoy, 15:30",
              },
              {
                icon: <Tablet className="h-8 w-8 text-primary" />,
                name: "Samsung Galaxy Tab",
                code: "TB-025",
                type: "Tablet",
                characteristics: "64GB, WiFi, S-Pen",
                nextReservation: null,
              },
              {
                icon: <Monitor className="h-8 w-8 text-primary" />,
                name: "Altavoces Bluetooth",
                code: "AU-008",
                type: "Equipo de audio",
                characteristics: "Portátil, batería 8h, micrófono",
                nextReservation: null,
              },
              {
                icon: <Laptop className="h-8 w-8 text-primary" />,
                name: "Chromebook Acer",
                code: "LP-022",
                type: "Ordenador",
                characteristics: "4GB RAM, 32GB eMMC, Chrome OS",
                nextReservation: "Viernes, 09:00",
              },
              {
                icon: <Monitor className="h-8 w-8 text-primary" />,
                name: "Cámara de documentos",
                code: "CM-003",
                type: "Proyector",
                characteristics: "Full HD, zoom óptico, USB",
                nextReservation: null,
              },
            ].map((item, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    {item.icon}
                    <Badge
                      className={
                        !item.nextReservation
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                      }
                    >
                      {!item.nextReservation
                        ? t("equipment.reservable.available")
                        : t("equipment.reservable.nextReservation")}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg mt-2">{item.name}</CardTitle>
                  <CardDescription>
                    {t("equipment.reservable.code")}: {item.code}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{t("equipment.reservable.type")}:</span>
                      <span className="text-sm">{item.type}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">{t("equipment.reservable.characteristics")}:</span>
                      <p className="text-sm">{item.characteristics}</p>
                    </div>
                    {item.nextReservation && (
                      <div className="flex items-center gap-1 text-sm text-amber-600">
                        <Clock className="h-3 w-3" />
                        <span>
                          {t("equipment.reservable.reserved")}: {item.nextReservation}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <Button variant="outline" size="sm">
                    {t("equipment.reservable.viewDetails")}
                  </Button>
                  <Button size="sm">{t("equipment.reservable.reserve")}</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="reservado" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="p-4 border-b bg-muted/50">
                  <div className="grid grid-cols-6 gap-4 font-medium">
                    <div>{t("equipment.reservable.equipment")}</div>
                    <div>{t("equipment.reservable.reservedBy")}</div>
                    <div>{t("equipment.reservable.date")}</div>
                    <div>{t("equipment.reservable.time")}</div>
                    <div>{t("equipment.reservable.status")}</div>
                    <div className="text-right">{t("equipment.reservable.actions")}</div>
                  </div>
                </div>
                <div className="divide-y">
                  {[
                    {
                      name: "Portátil HP ProBook",
                      code: "LP-001",
                      reservedBy: "María López",
                      date: "15/05/2023",
                      time: "10:00 - 12:00",
                      status: "En curso",
                    },
                    {
                      name: 'iPad 10.2"',
                      code: "TB-013",
                      reservedBy: "Carlos Rodríguez",
                      date: "15/05/2023",
                      time: "09:00 - 11:00",
                      status: "En curso",
                    },
                    {
                      name: "Proyector Epson",
                      code: "PR-005",
                      reservedBy: "Ana Martínez",
                      date: "16/05/2023",
                      time: "11:30 - 13:30",
                      status: "Pendiente",
                    },
                    {
                      name: "Portátil Lenovo ThinkPad",
                      code: "LP-015",
                      reservedBy: "Pedro Sánchez",
                      date: "15/05/2023",
                      time: "15:30 - 17:30",
                      status: "Pendiente",
                    },
                    {
                      name: "Chromebook Acer",
                      code: "LP-022",
                      reservedBy: "Laura Gómez",
                      date: "19/05/2023",
                      time: "09:00 - 11:00",
                      status: "Pendiente",
                    },
                  ].map((item, index) => (
                    <div className="p-4" key={index}>
                      <div className="grid grid-cols-6 gap-4">
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {t("equipment.reservable.code")}: {item.code}
                          </div>
                        </div>
                        <div>{item.reservedBy}</div>
                        <div>{item.date}</div>
                        <div>{item.time}</div>
                        <div>
                          <Badge
                            className={
                              item.status === "En curso"
                                ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                            }
                          >
                            {item.status}
                          </Badge>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            {t("equipment.reservable.view")}
                          </Button>
                          <Button variant="outline" size="sm">
                            {t("equipment.reservable.cancel")}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="calendario" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("equipment.reservable.calendarOfReservations")}</CardTitle>
              <CardDescription>{t("equipment.reservable.monthlyView")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end mb-4">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    {t("equipment.reservable.today")}
                  </Button>
                  <Button variant="outline" size="sm">
                    {t("equipment.reservable.week")}
                  </Button>
                  <Button variant="outline" size="sm">
                    {t("equipment.reservable.month")}
                  </Button>
                </div>
              </div>
              <div className="h-[500px] flex items-center justify-center border rounded-md">
                <div className="text-center">
                  <CalendarDays className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">{t("equipment.reservable.calendarUnderDevelopment")}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t("equipment.reservable.seeAllScheduledReservations")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("equipment.reservable.reserveEquipment")}</CardTitle>
            <CardDescription>{t("equipment.reservable.createNewEquipmentReservation")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("equipment.reservable.equipment")}</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={t("equipment.reservable.selectEquipment")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lp001">Portátil HP ProBook (LP-001)</SelectItem>
                      <SelectItem value="tb013">iPad 10.2" (TB-013)</SelectItem>
                      <SelectItem value="pr005">Proyector Epson (PR-005)</SelectItem>
                      <SelectItem value="lp015">Portátil Lenovo ThinkPad (LP-015)</SelectItem>
                      <SelectItem value="tb025">Samsung Galaxy Tab (TB-025)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("equipment.reservable.date")}</label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("equipment.reservable.startTime")}</label>
                  <Input type="time" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("equipment.reservable.endTime")}</label>
                  <Input type="time" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">{t("equipment.reservable.reservationReason")}</label>
                  <Input placeholder={t("equipment.reservable.exampleReason")} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">{t("equipment.reservable.observationsOptional")}</label>
                  <textarea
                    className="w-full min-h-[100px] p-2 border rounded-md"
                    placeholder={t("equipment.reservable.addRelevantInformation")}
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-end">
                <Button>{t("equipment.reservable.confirmReservation")}</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}
