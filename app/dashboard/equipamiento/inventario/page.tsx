"use client"

import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Laptop, Monitor, Printer, Tablet, Server, Smartphone, Plus, Filter, LayoutGrid, List } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

export default function InventarioPage() {
  const { t } = useI18n()

  return (
    <PageLayout
      title={t("equipment.inventory")}
      description={t("equipment.inventoryDescription")}
      actions={
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          {t("equipment.registerNewEquipment")}
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
              <SelectItem value="movil">{t("equipment.type.tablet")}</SelectItem>
              <SelectItem value="impresora">{t("equipment.printers")}</SelectItem>
              <SelectItem value="servidor">{t("equipment.type.computer")}</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="todos">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t("guards.filterByStatus")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">{t("guards.allStatuses")}</SelectItem>
              <SelectItem value="disponible">{t("equipment.reservable.available")}</SelectItem>
              <SelectItem value="enuso">{t("equipment.equipmentInUse")}</SelectItem>
              <SelectItem value="reparacion">{t("equipment.inRepair")}</SelectItem>
              <SelectItem value="baja">{t("common.no")}</SelectItem>
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

      <Tabs defaultValue="tarjetas">
        <TabsList>
          <TabsTrigger value="tarjetas">{t("classrooms.cardView")}</TabsTrigger>
          <TabsTrigger value="lista">{t("classrooms.listView")}</TabsTrigger>
        </TabsList>
        <TabsContent value="tarjetas" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[
              {
                icon: <Laptop className="h-8 w-8 text-primary" />,
                name: "Portátil HP ProBook",
                code: "LP-001",
                type: "Ordenador",
                status: "Disponible",
                location: "Sala de Profesores",
              },
              {
                icon: <Monitor className="h-8 w-8 text-primary" />,
                name: 'Monitor Dell 24"',
                code: "MN-042",
                type: "Monitor",
                status: "En uso",
                location: "Aula 105",
              },
              {
                icon: <Tablet className="h-8 w-8 text-primary" />,
                name: 'iPad 10.2"',
                code: "TB-013",
                type: "Tablet",
                status: "Disponible",
                location: "Biblioteca",
              },
              {
                icon: <Printer className="h-8 w-8 text-primary" />,
                name: "Impresora HP LaserJet",
                code: "IM-007",
                type: "Impresora",
                status: "En reparación",
                location: "Secretaría",
              },
              {
                icon: <Server className="h-8 w-8 text-primary" />,
                name: "Servidor Dell PowerEdge",
                code: "SV-002",
                type: "Servidor",
                status: "Disponible",
                location: "Sala de Servidores",
              },
              {
                icon: <Smartphone className="h-8 w-8 text-primary" />,
                name: "Samsung Galaxy Tab",
                code: "TB-025",
                type: "Tablet",
                status: "En uso",
                location: "Aula 203",
              },
              {
                icon: <Laptop className="h-8 w-8 text-primary" />,
                name: "Portátil Lenovo ThinkPad",
                code: "LP-015",
                type: "Ordenador",
                status: "Disponible",
                location: "Departamento Matemáticas",
              },
              {
                icon: <Monitor className="h-8 w-8 text-primary" />,
                name: 'Monitor LG 27"',
                code: "MN-031",
                type: "Monitor",
                status: "Disponible",
                location: "Aula Informática",
              },
            ].map((item, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    {item.icon}
                    <Badge
                      className={
                        item.status === "Disponible"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : item.status === "En uso"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                      }
                    >
                      {item.status}
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
                      <span className="text-sm font-medium">{t("common.type")}:</span>
                      <span className="text-sm">{item.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{t("common.location")}:</span>
                      <span className="text-sm">{item.location}</span>
                    </div>
                  </div>
                  <div className="flex justify-between mt-4">
                    <Button variant="outline" size="sm">
                      {t("common.viewDetails")}
                    </Button>
                    <Button size="sm">{t("common.edit")}</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="lista" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="p-4 border-b bg-muted/50">
                  <div className="grid grid-cols-7 gap-4 font-medium">
                    <div>{t("common.name")}</div>
                    <div>{t("equipment.reservable.code")}</div>
                    <div>{t("common.type")}</div>
                    <div>{t("common.location")}</div>
                    <div>{t("common.status")}</div>
                    <div>{t("common.date")}</div>
                    <div className="text-right">{t("common.actions")}</div>
                  </div>
                </div>
                <div className="divide-y">
                  {[
                    {
                      name: "Portátil HP ProBook",
                      code: "LP-001",
                      type: "Ordenador",
                      location: "Sala de Profesores",
                      status: "Disponible",
                      date: "15/09/2022",
                    },
                    {
                      name: 'Monitor Dell 24"',
                      code: "MN-042",
                      type: "Monitor",
                      location: "Aula 105",
                      status: "En uso",
                      date: "03/02/2023",
                    },
                    {
                      name: 'iPad 10.2"',
                      code: "TB-013",
                      type: "Tablet",
                      location: "Biblioteca",
                      status: "Disponible",
                      date: "22/11/2022",
                    },
                    {
                      name: "Impresora HP LaserJet",
                      code: "IM-007",
                      type: "Impresora",
                      location: "Secretaría",
                      status: "En reparación",
                      date: "10/05/2021",
                    },
                    {
                      name: "Servidor Dell PowerEdge",
                      code: "SV-002",
                      type: "Servidor",
                      location: "Sala de Servidores",
                      status: "Disponible",
                      date: "05/07/2022",
                    },
                  ].map((item, index) => (
                    <div className="p-4" key={index}>
                      <div className="grid grid-cols-7 gap-4">
                        <div>{item.name}</div>
                        <div>{item.code}</div>
                        <div>{item.type}</div>
                        <div>{item.location}</div>
                        <div>
                          <Badge
                            className={
                              item.status === "Disponible"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : item.status === "En uso"
                                  ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                  : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                            }
                          >
                            {item.status}
                          </Badge>
                        </div>
                        <div>{item.date}</div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            {t("common.view")}
                          </Button>
                          <Button variant="outline" size="sm">
                            {t("common.edit")}
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
      </Tabs>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("equipment.inventorySummary")}</CardTitle>
            <CardDescription>{t("equipment.inventoryStats")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">{t("equipment.byType")}</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Laptop className="h-5 w-5 text-primary" />
                      <span>{t("equipment.computers")}</span>
                    </div>
                    <div className="w-1/2 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                    <span className="font-medium">45%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Monitor className="h-5 w-5 text-primary" />
                      <span>{t("equipment.monitors")}</span>
                    </div>
                    <div className="w-1/2 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: "20%" }}></div>
                    </div>
                    <span className="font-medium">20%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Tablet className="h-5 w-5 text-primary" />
                      <span>{t("equipment.tablets")}</span>
                    </div>
                    <div className="w-1/2 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: "15%" }}></div>
                    </div>
                    <span className="font-medium">15%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Printer className="h-5 w-5 text-primary" />
                      <span>{t("equipment.printers")}</span>
                    </div>
                    <div className="w-1/2 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: "10%" }}></div>
                    </div>
                    <span className="font-medium">10%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Server className="h-5 w-5 text-primary" />
                      <span>{t("equipment.others")}</span>
                    </div>
                    <div className="w-1/2 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: "10%" }}></div>
                    </div>
                    <span className="font-medium">10%</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4">{t("equipment.byStatus")}</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>{t("equipment.available")}</span>
                    <div className="w-1/2 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "70%" }}></div>
                    </div>
                    <span className="font-medium">70%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{t("equipment.inUse")}</span>
                    <div className="w-1/2 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "20%" }}></div>
                    </div>
                    <span className="font-medium">20%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{t("equipment.inRepair")}</span>
                    <div className="w-1/2 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: "8%" }}></div>
                    </div>
                    <span className="font-medium">8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{t("equipment.low")}</span>
                    <div className="w-1/2 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-red-500 h-2.5 rounded-full" style={{ width: "2%" }}></div>
                    </div>
                    <span className="font-medium">2%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}
