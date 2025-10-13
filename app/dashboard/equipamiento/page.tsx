"use client"

import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Laptop, Database, Tablet, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useI18n } from "@/lib/i18n-context"

export default function EquipamientoPage() {
  const { t } = useI18n()

  return (
    <PageLayout title={t("equipment.title")} description={t("equipment.description")}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("equipment.totalEquipment")}</CardTitle>
            <Laptop className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248</div>
            <p className="text-xs text-muted-foreground">{t("equipment.devicesRegistered")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("equipment.availableEquipment")}</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">186</div>
            <p className="text-xs text-muted-foreground">{t("equipment.percentageOfTotal", { percentage: "75" })}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("equipment.equipmentInUse")}</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">{t("equipment.percentageOfTotal", { percentage: "17" })}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("equipment.inRepair")}</CardTitle>
            <Tablet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">20</div>
            <p className="text-xs text-muted-foreground">{t("equipment.percentageOfTotal", { percentage: "8" })}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>{t("equipment.inventory")}</CardTitle>
            <CardDescription>{t("equipment.inventoryDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col justify-between h-[calc(100%-7rem)]">
            <div className="space-y-4">
              <p>{t("equipment.inventoryModuleDescription")}</p>
              <ul className="list-disc list-inside space-y-1">
                <li>{t("equipment.registerNewEquipment")}</li>
                <li>{t("equipment.updateDeviceStatus")}</li>
                <li>{t("equipment.assignEquipment")}</li>
                <li>{t("equipment.generateInventoryReports")}</li>
                <li>{t("equipment.manageTechnicalIncidents")}</li>
              </ul>
            </div>
            <div className="flex justify-end mt-4">
              <Button asChild>
                <Link href="/dashboard/equipamiento/inventario">{t("equipment.accessInventory")}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader>
            <CardTitle>{t("equipment.reservableEquipment")}</CardTitle>
            <CardDescription>{t("equipment.reservableDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col justify-between h-[calc(100%-7rem)]">
            <div className="space-y-4">
              <p>{t("equipment.reservableModuleDescription")}</p>
              <ul className="list-disc list-inside space-y-1">
                <li>{t("equipment.markDevicesAsReservable")}</li>
                <li>{t("equipment.reserveEquipment")}</li>
                <li>{t("equipment.checkAvailability")}</li>
                <li>{t("equipment.manageReturns")}</li>
                <li>{t("equipment.receiveNotifications")}</li>
              </ul>
            </div>
            <div className="flex justify-end mt-4">
              <Button asChild>
                <Link href="/dashboard/equipamiento/reservable">{t("equipment.accessReservable")}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("equipment.equipmentSummary")}</CardTitle>
            <CardDescription>{t("equipment.equipmentStatusByCategory")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Laptop className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-medium">{t("equipment.computers")}</h3>
                      <p className="text-sm text-muted-foreground">{t("equipment.totalUnits", { units: "120" })}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      {t("equipment.availableUnits", { units: "90" })}
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                      {t("equipment.inUseUnits", { units: "20" })}
                    </Badge>
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                      {t("equipment.inRepairUnits", { units: "10" })}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="rounded-md border p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Tablet className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-medium">{t("equipment.tablets")}</h3>
                      <p className="text-sm text-muted-foreground">{t("equipment.totalUnits", { units: "60" })}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      {t("equipment.availableUnits", { units: "45" })}
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                      {t("equipment.inUseUnits", { units: "10" })}
                    </Badge>
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                      {t("equipment.inRepairUnits", { units: "5" })}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="rounded-md border p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Database className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-medium">{t("equipment.projectors")}</h3>
                      <p className="text-sm text-muted-foreground">{t("equipment.totalUnits", { units: "40" })}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      {t("equipment.availableUnits", { units: "30" })}
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                      {t("equipment.inUseUnits", { units: "8" })}
                    </Badge>
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                      {t("equipment.inRepairUnits", { units: "2" })}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="rounded-md border p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Laptop className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-medium">{t("equipment.printers")}</h3>
                      <p className="text-sm text-muted-foreground">{t("equipment.totalUnits", { units: "28" })}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      {t("equipment.availableUnits", { units: "21" })}
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                      {t("equipment.inUseUnits", { units: "4" })}
                    </Badge>
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                      {t("equipment.inRepairUnits", { units: "3" })}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("equipment.quickActions")}</CardTitle>
            <CardDescription>{t("equipment.commonActions")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="w-full">{t("equipment.registerNewEquipmentAction")}</Button>
              <Button className="w-full">{t("equipment.markAsReservableAction")}</Button>
              <Button className="w-full">{t("equipment.reportIncidentAction")}</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}
