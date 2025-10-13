import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Search, FileEdit, Users } from "lucide-react"

export default function DepartamentosPage() {
  return (
    <PageLayout
      title="Departamentos Didácticos"
      description="Gestión de los departamentos didácticos del centro educativo"
    >
      <Tabs defaultValue="listado" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="listado">Listado</TabsTrigger>
          <TabsTrigger value="miembros">Miembros</TabsTrigger>
          <TabsTrigger value="recursos">Recursos</TabsTrigger>
        </TabsList>

        <TabsContent value="listado" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar departamentos..." className="pl-8" />
            </div>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Nuevo Departamento
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Departamentos Didácticos</CardTitle>
              <CardDescription>Listado de departamentos del centro</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Departamento</TableHead>
                    <TableHead>Jefe/a de Departamento</TableHead>
                    <TableHead>Nº Profesores</TableHead>
                    <TableHead>Ubicación</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Matemáticas</TableCell>
                    <TableCell>David Fernández Ruiz</TableCell>
                    <TableCell>8</TableCell>
                    <TableCell>Edificio A, Planta 2</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <FileEdit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Users className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Lengua y Literatura</TableCell>
                    <TableCell>María López García</TableCell>
                    <TableCell>10</TableCell>
                    <TableCell>Edificio A, Planta 1</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <FileEdit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Users className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Ciencias Naturales</TableCell>
                    <TableCell>Carmen Vázquez Pérez</TableCell>
                    <TableCell>7</TableCell>
                    <TableCell>Edificio B, Planta 1</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <FileEdit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Users className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Ciencias Sociales</TableCell>
                    <TableCell>Antonio Martín Sanz</TableCell>
                    <TableCell>6</TableCell>
                    <TableCell>Edificio A, Planta 3</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <FileEdit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Users className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Inglés</TableCell>
                    <TableCell>Lucía Gómez Torres</TableCell>
                    <TableCell>9</TableCell>
                    <TableCell>Edificio A, Planta 2</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <FileEdit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Users className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Educación Física</TableCell>
                    <TableCell>Javier Sánchez Ortiz</TableCell>
                    <TableCell>4</TableCell>
                    <TableCell>Pabellón Deportivo</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <FileEdit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Users className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">Mostrando 6 de 12 departamentos</div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Anterior
                </Button>
                <Button variant="outline" size="sm">
                  Siguiente
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="miembros" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <Label htmlFor="departamento-select">Departamento:</Label>
              <Select>
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Selecciona un departamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="matematicas">Matemáticas</SelectItem>
                  <SelectItem value="lengua">Lengua y Literatura</SelectItem>
                  <SelectItem value="ciencias">Ciencias Naturales</SelectItem>
                  <SelectItem value="sociales">Ciencias Sociales</SelectItem>
                  <SelectItem value="ingles">Inglés</SelectItem>
                  <SelectItem value="educacion-fisica">Educación Física</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Añadir Miembro
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Miembros del Departamento</CardTitle>
              <CardDescription>Profesores asignados al departamento seleccionado</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Profesor/a</TableHead>
                    <TableHead>Especialidad</TableHead>
                    <TableHead>Cargo</TableHead>
                    <TableHead>Antigüedad</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">David Fernández Ruiz</TableCell>
                    <TableCell>Matemáticas</TableCell>
                    <TableCell>Jefe de Departamento</TableCell>
                    <TableCell>8 años</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <FileEdit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Ana Martínez López</TableCell>
                    <TableCell>Matemáticas</TableCell>
                    <TableCell>Profesora</TableCell>
                    <TableCell>5 años</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <FileEdit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Roberto Sanz García</TableCell>
                    <TableCell>Matemáticas</TableCell>
                    <TableCell>Profesor</TableCell>
                    <TableCell>3 años</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <FileEdit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Elena Torres Vega</TableCell>
                    <TableCell>Matemáticas</TableCell>
                    <TableCell>Profesora</TableCell>
                    <TableCell>7 años</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <FileEdit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Asignar Profesor al Departamento</CardTitle>
              <CardDescription>Añade un nuevo miembro al departamento seleccionado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="profesor" className="text-right">
                    Profesor/a
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecciona un profesor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="profesor1">Carlos Navarro Gil</SelectItem>
                      <SelectItem value="profesor2">Laura Moreno Sanz</SelectItem>
                      <SelectItem value="profesor3">Miguel Torres Vega</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="especialidad" className="text-right">
                    Especialidad
                  </Label>
                  <Input id="especialidad" placeholder="Especialidad del profesor" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="cargo" className="text-right">
                    Cargo
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecciona un cargo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="profesor">Profesor/a</SelectItem>
                      <SelectItem value="jefe">Jefe/a de Departamento</SelectItem>
                      <SelectItem value="coordinador">Coordinador/a</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="fecha-incorporacion" className="text-right">
                    Fecha Incorporación
                  </Label>
                  <Input id="fecha-incorporacion" type="date" className="col-span-3" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Asignar al Departamento</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="recursos" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <Label htmlFor="departamento-recursos">Departamento:</Label>
              <Select>
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Selecciona un departamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="matematicas">Matemáticas</SelectItem>
                  <SelectItem value="lengua">Lengua y Literatura</SelectItem>
                  <SelectItem value="ciencias">Ciencias Naturales</SelectItem>
                  <SelectItem value="sociales">Ciencias Sociales</SelectItem>
                  <SelectItem value="ingles">Inglés</SelectItem>
                  <SelectItem value="educacion-fisica">Educación Física</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Añadir Recurso
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Espacios Asignados</CardTitle>
                <CardDescription>Espacios físicos asignados al departamento</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Espacio</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Ubicación</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Despacho Departamento</TableCell>
                      <TableCell>Despacho</TableCell>
                      <TableCell>Edificio A, Planta 2</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <FileEdit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Aula Matemáticas 1</TableCell>
                      <TableCell>Aula</TableCell>
                      <TableCell>Edificio A, Planta 2</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <FileEdit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Aula Matemáticas 2</TableCell>
                      <TableCell>Aula</TableCell>
                      <TableCell>Edificio A, Planta 2</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <FileEdit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Equipamiento</CardTitle>
                <CardDescription>Equipamiento asignado al departamento</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Equipo</TableHead>
                      <TableHead>Cantidad</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Ordenadores</TableCell>
                      <TableCell>5</TableCell>
                      <TableCell>Buen estado</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <FileEdit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Proyectores</TableCell>
                      <TableCell>3</TableCell>
                      <TableCell>Buen estado</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <FileEdit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Calculadoras científicas</TableCell>
                      <TableCell>30</TableCell>
                      <TableCell>Buen estado</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <FileEdit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Presupuesto Departamental</CardTitle>
              <CardDescription>Gestión del presupuesto asignado al departamento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Asignación Presupuestaria</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Presupuesto anual:</span>
                      <span className="font-bold">3.500,00 €</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Gastado:</span>
                      <span className="font-bold">1.250,75 €</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Disponible:</span>
                      <span className="font-bold text-green-600">2.249,25 €</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Últimos Gastos</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center">
                      <span>Material didáctico</span>
                      <span>450,00 €</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Libros de consulta</span>
                      <span>320,75 €</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Software educativo</span>
                      <span>480,00 €</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Gestionar Presupuesto</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  )
}
