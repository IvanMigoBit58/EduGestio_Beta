import { PageLayout } from "@/components/page-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, FileEdit, Users, Building2, UserCog } from "lucide-react"
import Link from "next/link"
import { useI18n } from "@/lib/i18n-context"

export default function OrganigramaPage() {
  const { t } = useI18n()
  return (
    <PageLayout title={t("organigrama.title")} description={t("organigrama.description")}>
      <Tabs defaultValue="estructura" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="estructura">{t("organigrama.tabs.general")}</TabsTrigger>
          <TabsTrigger value="cargos">{t("organigrama.tabs.positions")}</TabsTrigger>
          <TabsTrigger value="departamentos">{t("organigrama.tabs.departments")}</TabsTrigger>
        </TabsList>

        <TabsContent value="estructura" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{t("organigrama.organizationalStructure")}</h2>
            <Button>
              <FileEdit className="mr-2 h-4 w-4" />
              {t("organigrama.editStructure")}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>{t("organigrama.managementTeam")}</CardTitle>
                <CardDescription>{t("organigrama.managementDescription")}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>{t("organigrama.director")}:</span>
                    <span className="font-medium">Ana García Martínez</span>
                  </li>
                  <li className="flex justify-between">
                    <span>{t("organigrama.headOfStudies")}:</span>
                    <span className="font-medium">Carlos Rodríguez López</span>
                  </li>
                  <li className="flex justify-between">
                    <span>{t("organigrama.secretary")}:</span>
                    <span className="font-medium">Laura Sánchez Pérez</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full mt-4">
                  <UserCog className="mr-2 h-4 w-4" />
                  {t("common.viewDetails")}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>{t("organigrama.didacticDepartments")}</CardTitle>
                <CardDescription>{t("organigrama.academicOrganization")}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-2">{t("organigrama.totalDepartments", { count: 12 })}</p>
                <p className="mb-2">{t("organigrama.departmentHeads", { count: 12 })}</p>
                <p className="mb-2">{t("organigrama.assignedTeachers", { count: 68 })}</p>
                <Link href="/dashboard/organigrama/departamentos">
                  <Button variant="outline" className="w-full mt-4">
                    <Building2 className="mr-2 h-4 w-4" />
                    {t("organigrama.manageDepartments")}
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>{t("organigrama.positionsAndResponsibilities")}</CardTitle>
                <CardDescription>{t("organigrama.specificFunctions")}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-2">{t("organigrama.totalPositions", { count: 24 })}</p>
                <p className="mb-2">{t("organigrama.assignedPositions", { count: 22 })}</p>
                <p className="mb-2">{t("organigrama.vacantPositions", { count: 2 })}</p>
                <Link href="/dashboard/organigrama/cargos">
                  <Button variant="outline" className="w-full mt-4">
                    <Users className="mr-2 h-4 w-4" />
                    {t("organigrama.managePositions")}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>{t("organigrama.organizationalChart")}</CardTitle>
              <CardDescription>{t("organigrama.hierarchicalVisualization")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-8 rounded-md flex flex-col items-center">
                <div className="p-4 border rounded-md bg-card mb-4 w-64 text-center">
                  <h3 className="font-bold">{t("organigrama.direction")}</h3>
                  <p>Ana García Martínez</p>
                </div>
                <div className="w-px h-8 bg-border"></div>
                <div className="flex justify-center gap-8 w-full">
                  <div className="flex flex-col items-center">
                    <div className="p-4 border rounded-md bg-card w-56 text-center">
                      <h3 className="font-bold">{t("organigrama.studiesManagement")}</h3>
                      <p>Carlos Rodríguez López</p>
                    </div>
                    <div className="w-px h-8 bg-border"></div>
                    <div className="p-4 border rounded-md bg-card w-56 text-center">
                      <h3 className="font-bold">{t("organigrama.departments")}</h3>
                      <p>{t("organigrama.departmentCount", { count: 12 })}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="p-4 border rounded-md bg-card w-56 text-center">
                      <h3 className="font-bold">{t("organigrama.secretariat")}</h3>
                      <p>Laura Sánchez Pérez</p>
                    </div>
                    <div className="w-px h-8 bg-border"></div>
                    <div className="p-4 border rounded-md bg-card w-56 text-center">
                      <h3 className="font-bold">{t("organigrama.administration")}</h3>
                      <p>{t("organigrama.administrativeStaff")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cargos">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{t("organigrama.positionsManagement")}</h2>
            <Link href="/dashboard/organigrama/cargos">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                {t("organigrama.viewAllPositions")}
              </Button>
            </Link>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t("organigrama.mainPositions")}</CardTitle>
              <CardDescription>{t("organigrama.mainPositionsDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-md p-4">
                  <h3 className="font-bold mb-2">{t("organigrama.managementTeam")}</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>{t("organigrama.director")}</span>
                      <span className="font-medium">Ana García Martínez</span>
                    </li>
                    <li className="flex justify-between">
                      <span>{t("organigrama.headOfStudies")}</span>
                      <span className="font-medium">Carlos Rodríguez López</span>
                    </li>
                    <li className="flex justify-between">
                      <span>{t("organigrama.secretary")}</span>
                      <span className="font-medium">Laura Sánchez Pérez</span>
                    </li>
                  </ul>
                </div>
                <div className="border rounded-md p-4">
                  <h3 className="font-bold mb-2">{t("organigrama.coordinations")}</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>{t("organigrama.pedagogicalCoord")}</span>
                      <span className="font-medium">Miguel Torres Vega</span>
                    </li>
                    <li className="flex justify-between">
                      <span>{t("organigrama.ticCoord")}</span>
                      <span className="font-medium">Elena Ruiz Gómez</span>
                    </li>
                    <li className="flex justify-between">
                      <span>{t("organigrama.coexistenceCoord")}</span>
                      <span className="font-medium">Pablo Moreno Díaz</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departamentos">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{t("organigrama.departments")}</h2>
            <Link href="/dashboard/organigrama/departamentos">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                {t("organigrama.viewAllDepartments")}
              </Button>
            </Link>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t("organigrama.mainDepartments")}</CardTitle>
              <CardDescription>{t("organigrama.mainDepartmentsDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-md p-4">
                  <h3 className="font-bold mb-2">{t("organigrama.subjects.mathematics")}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{t("organigrama.head")}: David Fernández Ruiz</p>
                  <p className="text-sm">{t("organigrama.teacherCount", { count: 8 })}</p>
                </div>
                <div className="border rounded-md p-4">
                  <h3 className="font-bold mb-2">{t("organigrama.subjects.language")}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{t("organigrama.head")}: María López García</p>
                  <p className="text-sm">{t("organigrama.teacherCount", { count: 10 })}</p>
                </div>
                <div className="border rounded-md p-4">
                  <h3 className="font-bold mb-2">{t("organigrama.subjects.naturalSciences")}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{t("organigrama.head")}: Carmen Vázquez Pérez</p>
                  <p className="text-sm">{t("organigrama.teacherCount", { count: 7 })}</p>
                </div>
                <div className="border rounded-md p-4">
                  <h3 className="font-bold mb-2">{t("organigrama.subjects.socialSciences")}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{t("organigrama.head")}: Antonio Martín Sanz</p>
                  <p className="text-sm">{t("organigrama.teacherCount", { count: 6 })}</p>
                </div>
                <div className="border rounded-md p-4">
                  <h3 className="font-bold mb-2">{t("organigrama.subjects.english")}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{t("organigrama.head")}: Lucía Gómez Torres</p>
                  <p className="text-sm">{t("organigrama.teacherCount", { count: 9 })}</p>
                </div>
                <div className="border rounded-md p-4">
                  <h3 className="font-bold mb-2">{t("organigrama.subjects.physicalEducation")}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{t("organigrama.head")}: Javier Sánchez Ortiz</p>
                  <p className="text-sm">{t("organigrama.teacherCount", { count: 4 })}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  )
}
