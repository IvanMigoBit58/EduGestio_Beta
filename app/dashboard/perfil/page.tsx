"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { PageLayout } from "@/components/page-layout"
import { CalendarIcon, KeyIcon, UserIcon, ShieldIcon, MailIcon, PhoneIcon } from "lucide-react"

export default function PerfilPage() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <PageLayout title="Perfil de Usuario" description="Gestiona tu información personal y preferencias">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/teacher-profile.png" alt="Foto de perfil" />
                  <AvatarFallback>MP</AvatarFallback>
                </Avatar>
              </div>
              <CardTitle>María Pérez</CardTitle>
              <CardDescription>Profesora de Matemáticas</CardDescription>
              <div className="flex justify-center gap-2 mt-2">
                <Badge>Jefa de Departamento</Badge>
                <Badge variant="outline">Tutora 2º ESO B</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <UserIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>ID: PROF2023-042</span>
                </div>
                <div className="flex items-center">
                  <MailIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>maria.perez@escuela.edu</span>
                </div>
                <div className="flex items-center">
                  <PhoneIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>+34 612 345 678</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Incorporación: 01/09/2018</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? "Cancelar edición" : "Editar perfil"}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="personal">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Información</TabsTrigger>
              <TabsTrigger value="security">Seguridad</TabsTrigger>
              <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
              <TabsTrigger value="preferences">Preferencias</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Información Personal</CardTitle>
                  <CardDescription>Actualiza tu información personal y de contacto</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nombre</Label>
                      <Input id="firstName" defaultValue="María" readOnly={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Apellidos</Label>
                      <Input id="lastName" defaultValue="Pérez García" readOnly={!isEditing} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo electrónico</Label>
                      <Input id="email" defaultValue="maria.perez@escuela.edu" readOnly={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input id="phone" defaultValue="+34 612 345 678" readOnly={!isEditing} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Dirección</Label>
                    <Input id="address" defaultValue="Calle Principal 123, 28001 Madrid" readOnly={!isEditing} />
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="specialty">Especialidad</Label>
                      <Input id="specialty" defaultValue="Matemáticas" readOnly={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Departamento</Label>
                      <Input id="department" defaultValue="Matemáticas" readOnly={!isEditing} />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>{isEditing && <Button className="ml-auto">Guardar cambios</Button>}</CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Información Académica</CardTitle>
                  <CardDescription>Información sobre tu formación y experiencia</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="education">Formación</Label>
                    <Input
                      id="education"
                      defaultValue="Licenciatura en Matemáticas, Universidad Complutense de Madrid"
                      readOnly={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Años de experiencia</Label>
                    <Input id="experience" defaultValue="12" readOnly={!isEditing} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Seguridad de la cuenta</CardTitle>
                  <CardDescription>Gestiona tu contraseña y la seguridad de tu cuenta</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Contraseña actual</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Nueva contraseña</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar nueva contraseña</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="mr-2">
                    <KeyIcon className="h-4 w-4 mr-2" />
                    Cambiar contraseña
                  </Button>
                  <Button variant="secondary">
                    <ShieldIcon className="h-4 w-4 mr-2" />
                    Activar autenticación en dos pasos
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sesiones activas</CardTitle>
                  <CardDescription>Dispositivos donde has iniciado sesión</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Chrome en Windows</p>
                        <p className="text-sm text-muted-foreground">Madrid, España · Activo ahora</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        Cerrar
                      </Button>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Safari en iPhone</p>
                        <p className="text-sm text-muted-foreground">Madrid, España · Hace 2 días</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        Cerrar
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Cerrar todas las sesiones
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Preferencias de notificaciones</CardTitle>
                  <CardDescription>Configura cómo y cuándo quieres recibir notificaciones</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Notificaciones por correo</Label>
                      <p className="text-sm text-muted-foreground">Recibe actualizaciones por correo electrónico</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Notificaciones en la aplicación</Label>
                      <p className="text-sm text-muted-foreground">Recibe notificaciones dentro de la plataforma</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Notificaciones de ausencias</Label>
                      <p className="text-sm text-muted-foreground">Recibe alertas sobre ausencias de alumnos</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Notificaciones de guardias</Label>
                      <p className="text-sm text-muted-foreground">Recibe alertas sobre guardias asignadas</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Preferencias de la aplicación</CardTitle>
                  <CardDescription>Personaliza tu experiencia en la plataforma</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Tema oscuro</Label>
                      <p className="text-sm text-muted-foreground">Cambia entre tema claro y oscuro</p>
                    </div>
                    <Switch />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Idioma</Label>
                      <p className="text-sm text-muted-foreground">Selecciona tu idioma preferido</p>
                    </div>
                    <select className="p-2 border rounded-md" defaultValue="Español">
                      <option value="Español">Español</option>
                      <option value="Català">Català</option>
                      <option value="English">English</option>
                    </select>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Vista compacta</Label>
                      <p className="text-sm text-muted-foreground">Muestra más información en menos espacio</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Accesibilidad</CardTitle>
                  <CardDescription>Ajustes para mejorar la accesibilidad</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Tamaño de fuente</Label>
                      <p className="text-sm text-muted-foreground">Ajusta el tamaño del texto</p>
                    </div>
                    <select className="p-2 border rounded-md" defaultValue="Normal">
                      <option value="Pequeño">Pequeño</option>
                      <option value="Normal">Normal</option>
                      <option value="Grande">Grande</option>
                      <option value="Muy grande">Muy grande</option>
                    </select>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Contraste alto</Label>
                      <p className="text-sm text-muted-foreground">Aumenta el contraste para mejor visibilidad</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  )
}
