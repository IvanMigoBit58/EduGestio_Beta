"use client"

import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, CheckCircle, Clock, UserCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/lib/i18n-context"

export default function SustitucionesPage() {
  const { t } = useI18n()

  return (
    <PageLayout title={t("substitutions.title")} description={t("substitutions.description")}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("substitutions.pendingSubstitutions")}</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">{t("substitutions.toAssign")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("substitutions.confirmedSubstitutions")}</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">{t("substitutions.forThisWeek")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("substitutions.completedSubstitutions")}</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">{t("substitutions.thisMonth")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("substitutions.nextSubstitution")}</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{t("substitutions.tomorrow")}</div>
            <p className="text-xs text-muted-foreground">9:00 - {t("substitutions.mathematics")}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="lista" className="mt-6">
        <TabsList>
          <TabsTrigger value="lista">{t("substitutions.substitutionsList")}</TabsTrigger>
          <TabsTrigger value="calendario">{t("substitutions.calendarView")}</TabsTrigger>
        </TabsList>
        <TabsContent value="lista" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Button variant="outline">{t("substitutions.pending")}</Button>
              <Button variant="outline">{t("substitutions.confirmed")}</Button>
              <Button variant="outline">{t("substitutions.completed")}</Button>
            </div>
            <Button>{t("substitutions.newSubstitution")}</Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>{t("substitutions.pendingSubstitutions")}</CardTitle>
              <CardDescription>{t("substitutions.substitutionsRequiringAssignment")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">María López - {t("substitutions.mathematics")}</h3>
                      <p className="text-sm text-muted-foreground">3º ESO A - 10:00-11:00</p>
                      <p className="text-sm">
                        {t("substitutions.reason")}: {t("substitutions.medicalLeave")}
                      </p>
                      <div className="flex mt-2">
                        <Badge variant="outline" className="mr-2">
                          {t("substitutions.tomorrow")}
                        </Badge>
                        <Badge variant="destructive">{t("substitutions.urgent")}</Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        {t("substitutions.viewDetails")}
                      </Button>
                      <Button size="sm">{t("substitutions.assign")}</Button>
                    </div>
                  </div>
                </div>
                <div className="rounded-md border p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Carlos Rodríguez - {t("substitutions.language")}</h3>
                      <p className="text-sm text-muted-foreground">2º ESO B - 12:30-13:30</p>
                      <p className="text-sm">
                        {t("substitutions.reason")}: {t("substitutions.personalLeave")}
                      </p>
                      <div className="flex mt-2">
                        <Badge variant="outline" className="mr-2">
                          {t("substitutions.friday")}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        {t("substitutions.viewDetails")}
                      </Button>
                      <Button size="sm">{t("substitutions.assign")}</Button>
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
              <CardTitle>{t("substitutions.substitutionsCalendar")}</CardTitle>
              <CardDescription>{t("substitutions.monthlyViewOfScheduledSubstitutions")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">{t("substitutions.substitutionsCalendarInDevelopment")}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  )
}
