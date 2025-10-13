"use client"

import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, School, User, GraduationCap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/lib/i18n-context"

export default function PersonasPage() {
  const { t } = useI18n()

  return (
    <PageLayout title={t("people.title")} description={t("people.description")}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("people.totalPeople")}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">872</div>
            <p className="text-xs text-muted-foreground">{t("people.inDatabase")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("people.teachers")}</CardTitle>
            <School className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68</div>
            <p className="text-xs text-muted-foreground">{t("people.newThisMonth", { count: 5 })}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("people.students")}</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">654</div>
            <p className="text-xs text-muted-foreground">{t("people.newThisMonth", { count: 12 })}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("people.family")}</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">150</div>
            <p className="text-xs text-muted-foreground">{t("people.newThisMonth", { count: 8 })}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="todos" className="mt-6">
        <TabsList>
          <TabsTrigger value="todos">{t("people.tabs.all")}</TabsTrigger>
          <TabsTrigger value="profesores">{t("people.tabs.teachers")}</TabsTrigger>
          <TabsTrigger value="alumnos">{t("people.tabs.students")}</TabsTrigger>
          <TabsTrigger value="familiares">{t("people.tabs.family")}</TabsTrigger>
        </TabsList>
        <TabsContent value="todos" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Button variant="outline">{t("people.import")}</Button>
              <Select defaultValue="todos">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t("people.filterByType")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">{t("common.all")}</SelectItem>
                  <SelectItem value="profesores">{t("people.teachers")}</SelectItem>
                  <SelectItem value="alumnos">{t("people.students")}</SelectItem>
                  <SelectItem value="familiares">{t("people.family")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2">
              <Input placeholder={t("people.searchPerson")} className="w-[300px]" />
              <Button>{t("people.addPerson")}</Button>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>{t("people.directory")}</CardTitle>
              <CardDescription>{t("people.directoryDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="p-4 border-b bg-muted/50">
                  <div className="grid grid-cols-6 gap-4 font-medium">
                    <div>{t("common.name")}</div>
                    <div>{t("common.type")}</div>
                    <div>{t("common.email")}</div>
                    <div>{t("common.phone")}</div>
                    <div>{t("common.status")}</div>
                    <div className="text-right">{t("common.actions")}</div>
                  </div>
                </div>
                <div className="divide-y">
                  <div className="p-4">
                    <div className="grid grid-cols-6 gap-4">
                      <div>María López García</div>
                      <div>{t("people.teacher")}</div>
                      <div>maria.lopez@example.com</div>
                      <div>612345678</div>
                      <div>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          {t("people.status.active")}
                        </Badge>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          {t("people.viewDetails")}
                        </Button>
                        <Button variant="outline" size="sm">
                          {t("common.edit")}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-6 gap-4">
                      <div>Pedro Sánchez Ruiz</div>
                      <div>{t("people.student")}</div>
                      <div>pedro.sanchez@example.com</div>
                      <div>623456789</div>
                      <div>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          {t("people.status.active")}
                        </Badge>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          {t("people.viewDetails")}
                        </Button>
                        <Button variant="outline" size="sm">
                          {t("common.edit")}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-6 gap-4">
                      <div>Ana Rodríguez Martín</div>
                      <div>{t("people.familyMember")}</div>
                      <div>ana.rodriguez@example.com</div>
                      <div>634567890</div>
                      <div>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          {t("people.status.active")}
                        </Badge>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          {t("people.viewDetails")}
                        </Button>
                        <Button variant="outline" size="sm">
                          {t("common.edit")}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-6 gap-4">
                      <div>Carlos Gómez Pérez</div>
                      <div>{t("people.teacher")}</div>
                      <div>carlos.gomez@example.com</div>
                      <div>645678901</div>
                      <div>
                        <Badge variant="outline">{t("people.status.temporaryLeave")}</Badge>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          {t("people.viewDetails")}
                        </Button>
                        <Button variant="outline" size="sm">
                          {t("common.edit")}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="profesores" className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <Button variant="outline">{t("people.importTeachers")}</Button>
            <Button>{t("people.addTeacher")}</Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>{t("people.teachers")}</CardTitle>
              <CardDescription>{t("people.teachersListDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">{t("people.selectFilterToViewTeachers")}</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="alumnos" className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <Button variant="outline">{t("people.importStudents")}</Button>
            <Button>{t("people.addStudent")}</Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>{t("people.students")}</CardTitle>
              <CardDescription>{t("people.studentsListDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">{t("people.selectFilterToViewStudents")}</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="familiares" className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <Button variant="outline">{t("people.importFamily")}</Button>
            <Button>{t("people.addFamilyMember")}</Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>{t("people.familyMembers")}</CardTitle>
              <CardDescription>{t("people.familyMembersDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">{t("people.selectFilterToViewFamily")}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  )
}
