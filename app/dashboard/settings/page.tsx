"use client"

"use client"

import { useEffect, useMemo, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PageLayout } from "@/components/page-layout"
import { useToast } from "@/hooks/use-toast"
import { ScheduleConfig, TimeSlot, useScheduleConfig } from "@/lib/schedule-config"
import { Settings, Database, Bell, Shield, Users, Palette, CalendarClock, Plus, Trash2 } from "lucide-react"

function createSlotId() {
  return `slot-${Math.random().toString(36).slice(2, 8)}-${Date.now().toString(36)}`
}

function addMinutesToTime(time: string, minutes: number) {
  const [hoursStr, minutesStr] = time.split(":")
  const baseDate = new Date()
  baseDate.setHours(Number(hoursStr) || 0, Number(minutesStr) || 0, 0, 0)
  baseDate.setMinutes(baseDate.getMinutes() + minutes)
  const hours = String(baseDate.getHours()).padStart(2, "0")
  const mins = String(baseDate.getMinutes()).padStart(2, "0")
  return `${hours}:${mins}`
}

type ScheduleDraft = {
  timeSlots: TimeSlot[]
  hasAfternoonShift: boolean
}

function cloneScheduleConfig(config: ScheduleConfig): ScheduleDraft {
  return {
    hasAfternoonShift: config.hasAfternoonShift,
    timeSlots: config.timeSlots.map((slot) => ({ ...slot })),
  }
}

export default function SettingsPage() {
  const { toast } = useToast()
  const { config: scheduleConfig, updateConfig } = useScheduleConfig()

  const [isLoading, setIsLoading] = useState(false)
  const [isScheduleSaving, setIsScheduleSaving] = useState(false)
  const [scheduleDraft, setScheduleDraft] = useState<ScheduleDraft>(() => cloneScheduleConfig(scheduleConfig))

  useEffect(() => {
    setScheduleDraft(cloneScheduleConfig(scheduleConfig))
  }, [scheduleConfig])

  const isScheduleDirty = useMemo(() => {
    if (scheduleDraft.hasAfternoonShift !== scheduleConfig.hasAfternoonShift) {
      return true
    }

    if (scheduleDraft.timeSlots.length !== scheduleConfig.timeSlots.length) {
      return true
    }

    return scheduleDraft.timeSlots.some((slot, index) => {
      const base = scheduleConfig.timeSlots[index]
      if (!base) {
        return true
      }

      return (
        slot.id !== base.id ||
        slot.label !== base.label ||
        slot.start !== base.start ||
        slot.end !== base.end
      )
    })
  }, [scheduleDraft, scheduleConfig])

  const isScheduleValid = useMemo(() => {
    if (scheduleDraft.timeSlots.length === 0) {
      return false
    }

    return scheduleDraft.timeSlots.every((slot) => {
      return slot.label.trim().length > 0 && slot.start < slot.end
    })
  }, [scheduleDraft])

  const handleScheduleSlotChange = (id: string, field: "label" | "start" | "end", value: string) => {
    setScheduleDraft((prev) => ({
      ...prev,
      timeSlots: prev.timeSlots.map((slot) => (slot.id === id ? { ...slot, [field]: value } : slot)),
    }))
  }

  const handleAddTimeSlot = () => {
    setScheduleDraft((prev) => {
      const lastSlot = prev.timeSlots[prev.timeSlots.length - 1]
      const defaultStart = lastSlot ? addMinutesToTime(lastSlot.end, 5) : "08:00"
      const defaultEnd = addMinutesToTime(defaultStart, 55)

      const nextSlot: TimeSlot = {
        id: createSlotId(),
        label: `Franja ${prev.timeSlots.length + 1}`,
        start: defaultStart,
        end: defaultEnd,
      }

      return {
        ...prev,
        timeSlots: [...prev.timeSlots, nextSlot],
      }
    })
  }

  const handleRemoveTimeSlot = (id: string) => {
    setScheduleDraft((prev) => {
      if (prev.timeSlots.length <= 1) {
        return prev
      }

      return {
        ...prev,
        timeSlots: prev.timeSlots.filter((slot) => slot.id !== id),
      }
    })
  }

  const handleToggleAfternoonShift = (value: boolean) => {
    setScheduleDraft((prev) => ({
      ...prev,
      hasAfternoonShift: value,
    }))
  }

  const handleResetScheduleDraft = () => {
    setScheduleDraft(cloneScheduleConfig(scheduleConfig))
  }

  const handleScheduleConfigSave = () => {
    if (!isScheduleValid) {
      toast({
        title: "Revisa la configuración",
        description: "Asegúrate de que todas las franjas tengan un nombre y horarios válidos.",
        variant: "destructive",
      })
      return
    }

    setIsScheduleSaving(true)

    const sanitizedTimeSlots = scheduleDraft.timeSlots.map((slot, index) => ({
      id: slot.id || createSlotId(),
      label: slot.label.trim() || `Franja ${index + 1}`,
      start: slot.start,
      end: slot.end,
    }))

    const nextConfig: ScheduleConfig = {
      hasAfternoonShift: scheduleDraft.hasAfternoonShift,
      timeSlots: sanitizedTimeSlots,
    }

    updateConfig(nextConfig)

    setTimeout(() => {
      setIsScheduleSaving(false)
      toast({
        title: "Horarios guardados",
        description: "Se han actualizado las franjas horarias del centro.",
      })
    }, 600)
  }

  const handleSave = () => {
    setIsLoading(true)
    // Simulación de guardado
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  return (
    <PageLayout title="Configuración del Sistema" description="Administra la configuración general de la plataforma">
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
          <TabsTrigger value="general" className="flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            <span>General</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center">
            <Palette className="h-4 w-4 mr-2" />
            <span>Apariencia</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="h-4 w-4 mr-2" />
            <span>Notificaciones</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            <span>Seguridad</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            <span>Usuarios</span>
          </TabsTrigger>
          <TabsTrigger value="schedules" className="flex items-center">
            <CalendarClock className="h-4 w-4 mr-2" />
            <span>Horarios</span>
          </TabsTrigger>
          <TabsTrigger value="database" className="flex items-center">
            <Database className="h-4 w-4 mr-2" />
            <span>Base de datos</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración General</CardTitle>
              <CardDescription>Configura los ajustes básicos de la plataforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="school-name">Nombre del Centro</Label>
                <Input id="school-name" defaultValue="IES Ejemplo" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="school-code">Código del Centro</Label>
                <Input id="school-code" defaultValue="28000000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="school-address">Dirección</Label>
                <Input id="school-address" defaultValue="Calle Principal 123, 28001 Madrid" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="school-email">Correo electrónico</Label>
                <Input id="school-email" type="email" defaultValue="info@iesejemplo.edu" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="school-phone">Teléfono</Label>
                <Input id="school-phone" defaultValue="91 123 45 67" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="school-website">Sitio web</Label>
                <Input id="school-website" defaultValue="https://www.iesejemplo.edu" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Guardando..." : "Guardar cambios"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Curso Académico</CardTitle>
              <CardDescription>Configura el curso académico actual</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="academic-year">Curso académico</Label>
                  <Select defaultValue="2023-2024">
                    <SelectTrigger id="academic-year">
                      <SelectValue placeholder="Selecciona un curso" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2022-2023">2022-2023</SelectItem>
                      <SelectItem value="2023-2024">2023-2024</SelectItem>
                      <SelectItem value="2024-2025">2024-2025</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="current-term">Trimestre actual</Label>
                  <Select defaultValue="1">
                    <SelectTrigger id="current-term">
                      <SelectValue placeholder="Selecciona un trimestre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Primer trimestre</SelectItem>
                      <SelectItem value="2">Segundo trimestre</SelectItem>
                      <SelectItem value="3">Tercer trimestre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Fecha de inicio del curso</Label>
                  <Input id="start-date" type="date" defaultValue="2023-09-01" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">Fecha de fin del curso</Label>
                  <Input id="end-date" type="date" defaultValue="2024-06-30" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Guardando..." : "Guardar cambios"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="schedules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Horarios</CardTitle>
              <CardDescription>Define las franjas horarias y el turno de tarde del centro</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {scheduleDraft.timeSlots.map((slot) => (
                  <div
                    key={slot.id}
                    className="grid gap-4 md:grid-cols-[minmax(0,1fr)] lg:grid-cols-[1.5fr,repeat(2,140px),auto] lg:items-end"
                  >
                    <div className="space-y-2">
                      <Label htmlFor={`slot-label-${slot.id}`}>Nombre de la franja</Label>
                      <Input
                        id={`slot-label-${slot.id}`}
                        value={slot.label}
                        onChange={(event) => handleScheduleSlotChange(slot.id, "label", event.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`slot-start-${slot.id}`}>Hora de inicio</Label>
                      <Input
                        id={`slot-start-${slot.id}`}
                        type="time"
                        value={slot.start}
                        onChange={(event) => handleScheduleSlotChange(slot.id, "start", event.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`slot-end-${slot.id}`}>Hora de fin</Label>
                      <Input
                        id={`slot-end-${slot.id}`}
                        type="time"
                        value={slot.end}
                        onChange={(event) => handleScheduleSlotChange(slot.id, "end", event.target.value)}
                        required
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="justify-self-start lg:justify-self-end"
                      onClick={() => handleRemoveTimeSlot(slot.id)}
                      disabled={scheduleDraft.timeSlots.length <= 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div>
                <Button type="button" variant="outline" onClick={handleAddTimeSlot}>
                  <Plus className="mr-2 h-4 w-4" />
                  Añadir franja horaria
                </Button>
              </div>

              <Separator />

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <Label>Turno de tarde</Label>
                  <p className="text-sm text-muted-foreground">
                    Activa esta opción si el centro ofrece clases en horario de tarde.
                  </p>
                </div>
                <Switch
                  checked={scheduleDraft.hasAfternoonShift}
                  onCheckedChange={handleToggleAfternoonShift}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleResetScheduleDraft}
                disabled={!isScheduleDirty || isScheduleSaving}
              >
                Deshacer cambios
              </Button>
              <Button
                type="button"
                onClick={handleScheduleConfigSave}
                disabled={!isScheduleDirty || !isScheduleValid || isScheduleSaving}
              >
                {isScheduleSaving ? "Guardando..." : "Guardar cambios"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Apariencia</CardTitle>
              <CardDescription>Personaliza la apariencia de la plataforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Tema</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="border rounded-md p-4 cursor-pointer bg-white text-black flex flex-col items-center">
                    <div className="h-20 w-full bg-white border rounded-md mb-2"></div>
                    <span>Claro</span>
                  </div>
                  <div className="border rounded-md p-4 cursor-pointer bg-gray-900 text-white flex flex-col items-center">
                    <div className="h-20 w-full bg-gray-800 border border-gray-700 rounded-md mb-2"></div>
                    <span>Oscuro</span>
                  </div>
                  <div className="border rounded-md p-4 cursor-pointer bg-gradient-to-r from-white to-gray-900 text-black flex flex-col items-center">
                    <div className="h-20 w-full bg-gradient-to-r from-white to-gray-800 border rounded-md mb-2"></div>
                    <span>Sistema</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Colores primarios</Label>
                <div className="grid grid-cols-4 gap-4">
                  <div className="h-10 rounded-md bg-blue-500 cursor-pointer"></div>
                  <div className="h-10 rounded-md bg-green-500 cursor-pointer"></div>
                  <div className="h-10 rounded-md bg-purple-500 cursor-pointer"></div>
                  <div className="h-10 rounded-md bg-red-500 cursor-pointer"></div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="logo-upload">Logo del centro</Label>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 border rounded-md flex items-center justify-center">
                    <img src="/generic-school-logo.png" alt="Logo" className="max-h-full max-w-full" />
                  </div>
                  <Button variant="outline" size="sm">
                    Cambiar logo
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Animaciones</Label>
                  <p className="text-sm text-muted-foreground">Activar animaciones en la interfaz</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Guardando..." : "Guardar cambios"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Notificaciones</CardTitle>
              <CardDescription>Configura cómo se envían las notificaciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificaciones por correo</Label>
                  <p className="text-sm text-muted-foreground">Enviar notificaciones por correo electrónico</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="email-server">Servidor SMTP</Label>
                <Input id="email-server" defaultValue="smtp.example.com" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email-port">Puerto</Label>
                  <Input id="email-port" defaultValue="587" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-security">Seguridad</Label>
                  <Select defaultValue="tls">
                    <SelectTrigger id="email-security">
                      <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Ninguna</SelectItem>
                      <SelectItem value="ssl">SSL</SelectItem>
                      <SelectItem value="tls">TLS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-username">Usuario</Label>
                <Input id="email-username" defaultValue="notificaciones@iesejemplo.edu" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-password">Contraseña</Label>
                <Input id="email-password" type="password" defaultValue="********" />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Eventos que generan notificaciones</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="notify-absences" defaultChecked />
                    <Label htmlFor="notify-absences">Ausencias de alumnos</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="notify-grades" defaultChecked />
                    <Label htmlFor="notify-grades">Publicación de calificaciones</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="notify-messages" defaultChecked />
                    <Label htmlFor="notify-messages">Mensajes nuevos</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="notify-events" defaultChecked />
                    <Label htmlFor="notify-events">Eventos del centro</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="mr-2">
                Probar conexión
              </Button>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Guardando..." : "Guardar cambios"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Seguridad</CardTitle>
              <CardDescription>Configura los ajustes de seguridad de la plataforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Autenticación de dos factores</Label>
                  <p className="text-sm text-muted-foreground">Requerir 2FA para todos los usuarios</p>
                </div>
                <Switch />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="password-policy">Política de contraseñas</Label>
                <Select defaultValue="strong">
                  <SelectTrigger id="password-policy">
                    <SelectValue placeholder="Selecciona una política" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Básica (mínimo 8 caracteres)</SelectItem>
                    <SelectItem value="medium">Media (letras y números, mínimo 8 caracteres)</SelectItem>
                    <SelectItem value="strong">Fuerte (mayúsculas, minúsculas, números y símbolos)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password-expiry">Caducidad de contraseñas</Label>
                <Select defaultValue="90">
                  <SelectTrigger id="password-expiry">
                    <SelectValue placeholder="Selecciona un período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Nunca</SelectItem>
                    <SelectItem value="30">30 días</SelectItem>
                    <SelectItem value="60">60 días</SelectItem>
                    <SelectItem value="90">90 días</SelectItem>
                    <SelectItem value="180">180 días</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="session-timeout">Tiempo de inactividad para cierre de sesión</Label>
                <Select defaultValue="30">
                  <SelectTrigger id="session-timeout">
                    <SelectValue placeholder="Selecciona un tiempo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutos</SelectItem>
                    <SelectItem value="30">30 minutos</SelectItem>
                    <SelectItem value="60">1 hora</SelectItem>
                    <SelectItem value="120">2 horas</SelectItem>
                    <SelectItem value="never">Nunca</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Proveedores de autenticación</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="auth-google" defaultChecked />
                    <Label htmlFor="auth-google">Google</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="auth-microsoft" />
                    <Label htmlFor="auth-microsoft">Microsoft</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="auth-local" defaultChecked />
                    <Label htmlFor="auth-local">Autenticación local</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Guardando..." : "Guardar cambios"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Registro de actividad</CardTitle>
              <CardDescription>Configura el registro de actividad del sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Registro de actividad</Label>
                  <p className="text-sm text-muted-foreground">Registrar todas las acciones de los usuarios</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="log-retention">Retención de registros</Label>
                <Select defaultValue="365">
                  <SelectTrigger id="log-retention">
                    <SelectValue placeholder="Selecciona un período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 días</SelectItem>
                    <SelectItem value="90">90 días</SelectItem>
                    <SelectItem value="180">180 días</SelectItem>
                    <SelectItem value="365">1 año</SelectItem>
                    <SelectItem value="forever">Indefinido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Usuarios</CardTitle>
              <CardDescription>Configura los ajustes relacionados con los usuarios</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="default-role">Rol predeterminado para nuevos usuarios</Label>
                <Select defaultValue="teacher">
                  <SelectTrigger id="default-role">
                    <SelectValue placeholder="Selecciona un rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="teacher">Profesor</SelectItem>
                    <SelectItem value="student">Estudiante</SelectItem>
                    <SelectItem value="parent">Padre/Madre</SelectItem>
                    <SelectItem value="staff">Personal no docente</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-registro</Label>
                  <p className="text-sm text-muted-foreground">Permitir que los usuarios se registren por sí mismos</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Aprobación manual</Label>
                  <p className="text-sm text-muted-foreground">Requerir aprobación manual para nuevos usuarios</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="user-import">Importación de usuarios</Label>
                <div className="flex items-center gap-4">
                  <Button variant="outline">Importar desde CSV</Button>
                  <Button variant="outline">Importar desde XLSX</Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Permisos por defecto</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="perm-view-grades" defaultChecked />
                    <Label htmlFor="perm-view-grades">Ver calificaciones</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="perm-edit-profile" defaultChecked />
                    <Label htmlFor="perm-edit-profile">Editar perfil</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="perm-send-messages" defaultChecked />
                    <Label htmlFor="perm-send-messages">Enviar mensajes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="perm-view-reports" />
                    <Label htmlFor="perm-view-reports">Ver informes</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Guardando..." : "Guardar cambios"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Base de Datos</CardTitle>
              <CardDescription>Gestiona la configuración de la base de datos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="db-type">Tipo de base de datos</Label>
                <Select defaultValue="mysql">
                  <SelectTrigger id="db-type">
                    <SelectValue placeholder="Selecciona un tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mysql">MySQL</SelectItem>
                    <SelectItem value="postgresql">PostgreSQL</SelectItem>
                    <SelectItem value="sqlite">SQLite</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="db-host">Host</Label>
                <Input id="db-host" defaultValue="localhost" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="db-port">Puerto</Label>
                  <Input id="db-port" defaultValue="3306" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="db-name">Nombre de la base de datos</Label>
                  <Input id="db-name" defaultValue="school_management" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="db-user">Usuario</Label>
                <Input id="db-user" defaultValue="dbuser" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="db-password">Contraseña</Label>
                <Input id="db-password" type="password" defaultValue="********" />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Operaciones de base de datos</Label>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    Hacer copia de seguridad
                  </Button>
                  <Button variant="outline" size="sm">
                    Restaurar copia
                  </Button>
                  <Button variant="outline" size="sm">
                    Optimizar tablas
                  </Button>
                  <Button variant="destructive" size="sm">
                    Limpiar datos temporales
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="backup-schedule">Programación de copias de seguridad</Label>
                <Select defaultValue="daily">
                  <SelectTrigger id="backup-schedule">
                    <SelectValue placeholder="Selecciona una frecuencia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Cada hora</SelectItem>
                    <SelectItem value="daily">Diaria</SelectItem>
                    <SelectItem value="weekly">Semanal</SelectItem>
                    <SelectItem value="monthly">Mensual</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="mr-2">
                Probar conexión
              </Button>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Guardando..." : "Guardar cambios"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  )
}
