"use client"

import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Send, LayoutTemplateIcon as Template, Users } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

export default function ComunicacionesPage() {
  const { t } = useI18n()

  return (
    <PageLayout title={t("communications.title")} description={t("communications.description")}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("communications.sentMessages")}</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">{t("communications.lastSevenDays")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("communications.recipients")}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">{t("communications.totalReach")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("communications.templates")}</CardTitle>
            <Template className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">{t("communications.available")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("communications.pendingNotices")}</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">{t("communications.absenceNotices")}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="nuevo" className="mt-6">
        <TabsList>
          <TabsTrigger value="nuevo">{t("communications.newMessage")}</TabsTrigger>
          <TabsTrigger value="enviados">{t("communications.sentMessages")}</TabsTrigger>
          <TabsTrigger value="plantillas">{t("communications.templates")}</TabsTrigger>
        </TabsList>
        <TabsContent value="nuevo" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("communications.newMessage")}</CardTitle>
              <CardDescription>{t("communications.createAndSendMessage")}</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tipo">{t("communications.recipientType")}</Label>
                  <Select defaultValue="familias">
                    <SelectTrigger>
                      <SelectValue placeholder={t("communications.selectRecipientType")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="familias">{t("communications.families")}</SelectItem>
                      <SelectItem value="alumnos">{t("communications.adultStudents")}</SelectItem>
                      <SelectItem value="ambos">{t("communications.both")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="plantilla">{t("communications.useTemplate")}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={t("communications.selectTemplate")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aviso">{t("communications.absenceNotice")}</SelectItem>
                      <SelectItem value="reunion">{t("communications.meetingCall")}</SelectItem>
                      <SelectItem value="actividad">{t("communications.activityInfo")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="asunto">{t("communications.subject")}</Label>
                  <Input id="asunto" placeholder={t("communications.enterSubject")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mensaje">{t("communications.message")}</Label>
                  <Textarea id="mensaje" placeholder={t("communications.writeMessage")} rows={6} />
                </div>
                <div className="space-y-2">
                  <Label>{t("communications.recipients")}</Label>
                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <Select defaultValue="todos">
                            <SelectTrigger className="w-[200px]">
                              <SelectValue placeholder={t("communications.filterByGroup")} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="todos">{t("communications.allGroups")}</SelectItem>
                              <SelectItem value="1a">1º ESO A</SelectItem>
                              <SelectItem value="1b">1º ESO B</SelectItem>
                              <SelectItem value="2a">2º ESO A</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input placeholder={t("communications.searchRecipient")} className="w-[300px]" />
                        </div>
                        <div className="flex justify-between">
                          <Button variant="outline" size="sm">
                            {t("communications.selectAll")}
                          </Button>
                          <Button variant="outline" size="sm">
                            {t("communications.deselectAll")}
                          </Button>
                        </div>
                        <div className="h-[200px] border rounded-md p-4 overflow-auto">
                          <p className="text-center text-muted-foreground">
                            {t("communications.selectGroupToSeeRecipients")}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <Button className="w-full">{t("communications.sendMessage")}</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="enviados" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("communications.sentMessages")}</CardTitle>
              <CardDescription>{t("communications.sentMessagesHistory")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">{t("communications.noRecentMessages")}</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="plantillas" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("communications.templates")}</CardTitle>
              <CardDescription>{t("communications.manageMessageTemplates")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end mb-4">
                <Button>{t("communications.newTemplate")}</Button>
              </div>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t("communications.absenceNotice")}</CardTitle>
                    <CardDescription>{t("communications.absenceNoticeDescription")}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{t("communications.absenceNoticeTemplate")}</p>
                    <div className="flex justify-end mt-4 space-x-2">
                      <Button variant="outline" size="sm">
                        {t("communications.edit")}
                      </Button>
                      <Button variant="outline" size="sm">
                        {t("communications.use")}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t("communications.meetingCall")}</CardTitle>
                    <CardDescription>{t("communications.meetingCallDescription")}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{t("communications.meetingCallTemplate")}</p>
                    <div className="flex justify-end mt-4 space-x-2">
                      <Button variant="outline" size="sm">
                        {t("communications.edit")}
                      </Button>
                      <Button variant="outline" size="sm">
                        {t("communications.use")}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  )
}
