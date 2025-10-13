"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Mail, UserCheck, Clock } from "lucide-react"
import { PageLayout } from "@/components/page-layout"
import { useI18n } from "@/lib/i18n-context"

export default function DashboardPage() {
  const { t } = useI18n()

  return (
    <PageLayout title={t("dashboard.title")} description={t("dashboard.description")}>
      <Tabs defaultValue="resumen">
        <TabsList>
          <TabsTrigger value="resumen">{t("dashboard.tabs.summary")}</TabsTrigger>
          <TabsTrigger value="actividad">{t("dashboard.tabs.recentActivity")}</TabsTrigger>
        </TabsList>
        <TabsContent value="resumen" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("dashboard.cards.classes")}</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">{t("dashboard.cards.classesChange")}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("dashboard.cards.attendance")}</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">95%</div>
                <p className="text-xs text-muted-foreground">{t("dashboard.cards.attendanceChange")}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("dashboard.cards.messages")}</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">{t("dashboard.cards.messagesInfo")}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("dashboard.cards.substitutions")}</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">{t("dashboard.cards.substitutionsInfo")}</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>{t("dashboard.upcomingClasses.title")}</CardTitle>
                <CardDescription>{t("dashboard.upcomingClasses.description")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-md border p-3">
                    <div>
                      <p className="font-medium">{t("dashboard.upcomingClasses.class1.name")}</p>
                      <p className="text-sm text-muted-foreground">{t("dashboard.upcomingClasses.class1.time")}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      {t("dashboard.upcomingClasses.viewDetails")}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between rounded-md border p-3">
                    <div>
                      <p className="font-medium">{t("dashboard.upcomingClasses.class2.name")}</p>
                      <p className="text-sm text-muted-foreground">{t("dashboard.upcomingClasses.class2.time")}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      {t("dashboard.upcomingClasses.viewDetails")}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between rounded-md border p-3">
                    <div>
                      <p className="font-medium">{t("dashboard.upcomingClasses.class3.name")}</p>
                      <p className="text-sm text-muted-foreground">{t("dashboard.upcomingClasses.class3.time")}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      {t("dashboard.upcomingClasses.viewDetails")}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>{t("dashboard.notifications.title")}</CardTitle>
                <CardDescription>{t("dashboard.notifications.description")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <UserCheck className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{t("dashboard.notifications.notification1.title")}</p>
                      <p className="text-xs text-muted-foreground">
                        {t("dashboard.notifications.notification1.description")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{t("dashboard.notifications.notification2.title")}</p>
                      <p className="text-xs text-muted-foreground">
                        {t("dashboard.notifications.notification2.description")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{t("dashboard.notifications.notification3.title")}</p>
                      <p className="text-xs text-muted-foreground">
                        {t("dashboard.notifications.notification3.description")}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="actividad" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("dashboard.recentActivity.title")}</CardTitle>
              <CardDescription>{t("dashboard.recentActivity.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-start gap-4 rounded-md border p-4">
                    <div className="rounded-full bg-muted p-2">
                      {i % 3 === 0 ? (
                        <UserCheck className="h-4 w-4" />
                      ) : i % 3 === 1 ? (
                        <Mail className="h-4 w-4" />
                      ) : (
                        <Calendar className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {i % 3 === 0
                          ? t("dashboard.recentActivity.activity1.title")
                          : i % 3 === 1
                            ? t("dashboard.recentActivity.activity2.title")
                            : t("dashboard.recentActivity.activity3.title")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {i % 3 === 0
                          ? t("dashboard.recentActivity.activity1.description")
                          : i % 3 === 1
                            ? t("dashboard.recentActivity.activity2.description")
                            : t("dashboard.recentActivity.activity3.description")}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {t("dashboard.recentActivity.timeAgo", { minutes: i * 10 })}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  )
}
