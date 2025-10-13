import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Search, FileEdit, UserPlus } from "lucide-react"

export default function CargosPage() {
  return (
    <PageLayout
      title="Cargos y Responsabilidades"
      description="Gestión de los cargos y responsabilidades del centro educativo"
    >
      <Tabs defaultValue="listado" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="listado">Listado de Cargos</TabsTrigger>
          <TabsTrigger value="asignacion">Asignación</TabsTrigger>
          <TabsTrigger value="tipos">Tipos de Cargos</TabsTrigger>
        </TabsList>

        <TabsContent value="listado" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar cargos..." className="pl-8" />
            </div>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Nuevo Cargo
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Listado de Cargos</CardTitle>
              <CardDescription>Gestiona los cargos y responsabilidades del centro</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cargo</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Persona Asignada</TableHead>
                    <TableHead>Departamento</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Director/a</TableCell>
                    <TableCell>Equipo Directivo</TableCell>
                    <TableCell>Ana García Martínez</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Activo
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <FileEdit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Jefe/a de Estudios</TableCell>
                    <TableCell>Equipo Directivo</TableCell>
                    <TableCell>Carlos Rodríguez López</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Activo
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <FileEdit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Secretario/a</TableCell>
                    <TableCell>Equipo Directivo</TableCell>
                    <TableCell>Laura Sánchez Pérez</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Activo
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <FileEdit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Coordinador/a TIC</TableCell>
                    <TableCell>Coordinación</TableCell>
                    <TableCell>Elena Ruiz Gómez</TableCell>
                    <TableCell>Tecnología</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Activo
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <FileEdit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Jefe/a Dpto. Matemáticas</TableCell>
                    <TableCell>Jefatura Departamento</TableCell>
                    <TableCell>David Fernández Ruiz</TableCell>
                    <TableCell>Matemáticas</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Activo
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <FileEdit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Coordinador/a Biblioteca</TableCell>
                    <TableCell>Coordinación</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                        Vacante
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <UserPlus className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">Mostrando 6 de 24 cargos</div>
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

        <TabsContent value="asignacion" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Asignación de Cargos</CardTitle>
              <CardDescription>Asigna cargos a las personas del centro</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="cargo" className="text-right">
                    Cargo
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecciona un cargo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="coordinador-biblioteca">Coordinador/a Biblioteca</SelectItem>
                      <SelectItem value="coordinador-convivencia">Coordinador/a Convivencia</SelectItem>
                      <SelectItem value="tutor-1eso-a">Tutor/a 1º ESO A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="persona" className="text-right">
                    Persona
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecciona una persona" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="persona1">Raquel Navarro Gil</SelectItem>
                      <SelectItem value="persona2">Javier Moreno Sanz</SelectItem>
                      <SelectItem value="persona3">Isabel Torres Vega</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="fecha-inicio" className="text-right">
                    Fecha Inicio
                  </Label>
                  <Input id="fecha-inicio" type="date" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="fecha-fin" className="text-right">
                    Fecha Fin
                  </Label>
                  <Input id="fecha-fin" type="date" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="observaciones" className="text-right">
                    Observaciones
                  </Label>
                  <Input id="observaciones" placeholder="Observaciones adicionales" className="col-span-3" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Asignar Cargo</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Historial de Asignaciones</CardTitle>
              <CardDescription>Registro histórico de asignaciones de cargos</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cargo</TableHead>
                    <TableHead>Persona</TableHead>
                    <TableHead>Fecha Inicio</TableHead>
                    <TableHead>Fecha Fin</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Director/a</TableCell>
                    <TableCell>Ana García Martínez</TableCell>
                    <TableCell>01/09/2023</TableCell>
                    <TableCell>31/08/2027</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Activo
                      </span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Director/a</TableCell>
                    <TableCell>Manuel Pérez Gómez</TableCell>
                    <TableCell>01/09/2019</TableCell>
                    <TableCell>31/08/2023</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                        Finalizado
                      </span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Jefe/a Dpto. Lengua</TableCell>
                    <TableCell>María López García</TableCell>
                    <TableCell>01/09/2022</TableCell>
                    <TableCell>31/08/2026</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Activo
                      </span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tipos" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Tipos de Cargos</h2>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Nuevo Tipo
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Categorías de Cargos</CardTitle>
              <CardDescription>Gestiona los tipos de cargos disponibles en el centro</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo de Cargo</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Nº Cargos</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Equipo Directivo</TableCell>
                    <TableCell>Cargos de dirección del centro</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <FileEdit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Jefatura Departamento</TableCell>
                    <TableCell>Responsables de departamentos didácticos</TableCell>
                    <TableCell>12</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <FileEdit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Coordinación</TableCell>
                    <TableCell>Coordinadores de áreas específicas</TableCell>
                    <TableCell>6</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <FileEdit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Tutoría</TableCell>
                    <TableCell>Tutores de grupos</TableCell>
                    <TableCell>24</TableCell>
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
              <CardTitle>Crear Nuevo Tipo de Cargo</CardTitle>
              <CardDescription>Define un nuevo tipo de cargo para el centro</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nombre-tipo" className="text-right">
                    Nombre
                  </Label>
                  <Input id="nombre-tipo" placeholder="Nombre del tipo de cargo" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="descripcion-tipo" className="text-right">
                    Descripción
                  </Label>
                  <Input id="descripcion-tipo" placeholder="Descripción del tipo de cargo" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="duracion" className="text-right">
                    Duración (años)
                  </Label>
                  <Input id="duracion" type="number" placeholder="4" className="col-span-3" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Crear Tipo de Cargo</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  )
}
