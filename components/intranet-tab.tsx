"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Mail } from "lucide-react"

interface IntranetTabProps {
  persona: {
    id: string
    nombre: string
    email: string
    username: string
  }
}

export function IntranetTab({ persona }: IntranetTabProps) {
  const { user, hasPermission, changePassword, sendPasswordByEmail, changeUsername } = useAuth()
  const { toast } = useToast()

  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [newUsername, setNewUsername] = useState(persona.username)
  const [passwordError, setPasswordError] = useState("")
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [isSendingPassword, setIsSendingPassword] = useState(false)
  const [isChangingUsername, setIsChangingUsername] = useState(false)

  // Determinar si el usuario actual es el propietario de este perfil
  const isOwnProfile = user?.id === persona.id

  // Determinar si el usuario puede cambiar la contraseña (propia o de otros)
  const canChangePassword = isOwnProfile || hasPermission("cambiar_contraseña")

  // Determinar si el usuario puede cambiar el nombre de usuario (solo admin)
  const canChangeUsername = hasPermission("cambiar_usuario")

  // Determinar si el usuario puede enviar la contraseña por correo (solo admin)
  const canSendPassword = hasPermission("enviar_contraseña")

  const handleChangePassword = async () => {
    // Validar que las contraseñas coincidan
    if (newPassword !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden")
      return
    }

    // Validar longitud mínima
    if (newPassword.length < 6) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres")
      return
    }

    setPasswordError("")
    setIsChangingPassword(true)

    try {
      const result = await changePassword(persona.id, newPassword)
      if (result.success) {
        toast({
          title: "Contraseña actualizada",
          description: "La contraseña ha sido actualizada correctamente",
        })
        setNewPassword("")
        setConfirmPassword("")
      } else {
        toast({
          title: "Error",
          description: result.error || "No se pudo actualizar la contraseña",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al actualizar la contraseña",
        variant: "destructive",
      })
    } finally {
      setIsChangingPassword(false)
    }
  }

  const handleSendPassword = async () => {
    setIsSendingPassword(true)

    try {
      const result = await sendPasswordByEmail(persona.id)
      if (result.success) {
        toast({
          title: "Contraseña enviada",
          description: `Se ha enviado una nueva contraseña a ${persona.email}`,
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "No se pudo enviar la contraseña",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al enviar la contraseña",
        variant: "destructive",
      })
    } finally {
      setIsSendingPassword(false)
    }
  }

  const handleChangeUsername = async () => {
    if (!newUsername || newUsername.trim() === "") {
      toast({
        title: "Error",
        description: "El nombre de usuario no puede estar vacío",
        variant: "destructive",
      })
      return
    }

    setIsChangingUsername(true)

    try {
      const result = await changeUsername(persona.id, newUsername)
      if (result.success) {
        toast({
          title: "Nombre de usuario actualizado",
          description: "El nombre de usuario ha sido actualizado correctamente",
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "No se pudo actualizar el nombre de usuario",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al actualizar el nombre de usuario",
        variant: "destructive",
      })
    } finally {
      setIsChangingUsername(false)
    }
  }

  return (
    <div className="space-y-6 py-2">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Información de acceso</h3>

        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="username">Nombre de usuario</Label>
            {canChangeUsername ? (
              <div className="flex gap-2">
                <Input id="username" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
                <Button
                  onClick={handleChangeUsername}
                  disabled={isChangingUsername || newUsername === persona.username}
                >
                  {isChangingUsername ? <Loader2 className="h-4 w-4 animate-spin" /> : "Guardar"}
                </Button>
              </div>
            ) : (
              <Input id="username" value={persona.username} readOnly />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input id="email" value={persona.email} readOnly />
          </div>
        </div>
      </div>

      {canChangePassword && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Cambiar contraseña</h3>

          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">Nueva contraseña</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmar contraseña</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
            </div>

            <Button onClick={handleChangePassword} disabled={isChangingPassword || !newPassword || !confirmPassword}>
              {isChangingPassword ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Cambiar contraseña
            </Button>
          </div>
        </div>
      )}

      {canSendPassword && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Enviar contraseña por correo</h3>
          <p className="text-sm text-gray-500">
            Se enviará una nueva contraseña generada aleatoriamente al correo electrónico del usuario.
          </p>

          <Button onClick={handleSendPassword} disabled={isSendingPassword} className="flex items-center gap-2">
            {isSendingPassword ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
            Enviar nueva contraseña
          </Button>
        </div>
      )}
    </div>
  )
}
