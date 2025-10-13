"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  // Función para obtener un mensaje de error amigable
  const getErrorMessage = (errorCode: string | null) => {
    switch (errorCode) {
      case "Configuration":
        return "Hay un problema con la configuración del servidor."
      case "AccessDenied":
        return "Acceso denegado. No tienes permiso para iniciar sesión."
      case "Verification":
        return "El enlace de verificación ha expirado o ya ha sido utilizado."
      case "OAuthSignin":
        return "Error al iniciar el proceso de autenticación con el proveedor."
      case "OAuthCallback":
        return "Error al procesar la respuesta del proveedor de autenticación."
      case "OAuthCreateAccount":
        return "No se pudo crear una cuenta de usuario con el proveedor."
      case "EmailCreateAccount":
        return "No se pudo crear una cuenta de usuario con el correo electrónico."
      case "Callback":
        return "Error durante el proceso de autenticación."
      case "OAuthAccountNotLinked":
        return "El correo electrónico ya está asociado a otra cuenta."
      case "EmailSignin":
        return "Error al enviar el correo electrónico de verificación."
      case "CredentialsSignin":
        return "Las credenciales proporcionadas no son válidas."
      case "SessionRequired":
        return "Se requiere iniciar sesión para acceder a esta página."
      default:
        return "Se ha producido un error durante el proceso de autenticación."
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle className="text-center text-red-600">Error de autenticación</CardTitle>
          <CardDescription className="text-center">
            Se ha producido un error durante el proceso de inicio de sesión
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-center font-medium">{getErrorMessage(error)}</p>
            <p className="text-center text-sm text-gray-500">Código de error: {error || "Desconocido"}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/login">Volver al inicio de sesión</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
