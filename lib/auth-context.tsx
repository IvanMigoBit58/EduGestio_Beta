"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

// Definición de roles y permisos
export const ROLES = {
  ADMIN: "admin",
  PROFESOR: "profesor",
  TUTOR: "tutor",
  ALUMNO: "alumno",
}

export const PERMISSIONS = {
  VER_HORARIO: "ver_horario",
  MODIFICAR_HORARIO: "modificar_horario",
  REGISTRAR_SALIDA: "registrar_salida",
  APROBAR_SALIDA: "aprobar_salida",
  ELIMINAR_SALIDA: "eliminar_salida",
  VER_ASISTENCIA: "ver_asistencia",
  REGISTRAR_ASISTENCIA: "registrar_asistencia",
  REGISTRAR_GUARDIA: "registrar_guardia",
  VER_GUARDIA: "ver_guardia",
  RESERVAR_AULA: "reservar_aula",
  VER_NOTIFICACIONES: "ver_notificaciones",
  VER_HISTORIAL_ACADEMICO: "ver_historial_academico",
  REGISTRAR_EQUIPAMIENTO: "registrar_equipamiento",
  MARCAR_EQUIPAMIENTO_RESERVABLE: "marcar_equipamiento_reservable",
  RESERVAR_EQUIPAMIENTO: "reservar_equipamiento",
  CAMBIAR_CONTRASEÑA: "cambiar_contraseña",
  CAMBIAR_USUARIO: "cambiar_usuario",
  ENVIAR_CONTRASEÑA: "enviar_contraseña",
  VER_CENTRO: "ver_centro",
  EDITAR_CENTRO: "editar_centro",
  VER_ORGANIGRAMA: "ver_organigrama",
  EDITAR_CARGOS: "editar_cargos",
  EDITAR_DEPARTAMENTOS: "editar_departamentos",
}

// Asignación de permisos a roles
const rolePermissions = {
  [ROLES.ADMIN]: Object.values(PERMISSIONS),
  [ROLES.PROFESOR]: [
    PERMISSIONS.VER_HORARIO,
    PERMISSIONS.REGISTRAR_SALIDA,
    PERMISSIONS.VER_ASISTENCIA,
    PERMISSIONS.REGISTRAR_ASISTENCIA,
    PERMISSIONS.REGISTRAR_GUARDIA,
    PERMISSIONS.VER_GUARDIA,
    PERMISSIONS.RESERVAR_AULA,
    PERMISSIONS.RESERVAR_EQUIPAMIENTO,
    PERMISSIONS.CAMBIAR_CONTRASEÑA,
    PERMISSIONS.VER_CENTRO,
    PERMISSIONS.VER_ORGANIGRAMA,
  ],
  [ROLES.TUTOR]: [
    PERMISSIONS.VER_NOTIFICACIONES,
    PERMISSIONS.VER_HISTORIAL_ACADEMICO,
    PERMISSIONS.CAMBIAR_CONTRASEÑA,
    PERMISSIONS.VER_CENTRO,
    PERMISSIONS.VER_ORGANIGRAMA,
  ],
  [ROLES.ALUMNO]: [
    PERMISSIONS.VER_HISTORIAL_ACADEMICO,
    PERMISSIONS.CAMBIAR_CONTRASEÑA,
    PERMISSIONS.VER_CENTRO,
    PERMISSIONS.VER_ORGANIGRAMA,
  ],
}

// Usuarios de prueba
const USERS = {
  admin: {
    id: "1",
    username: "admin",
    password: "password",
    name: "Administrador",
    email: "admin@example.com",
    role: ROLES.ADMIN,
    language: "ca",
  },
  profesor: {
    id: "2",
    username: "profesor",
    password: "password",
    name: "Profesor",
    email: "profesor@example.com",
    role: ROLES.PROFESOR,
    language: "ca",
  },
  tutor: {
    id: "3",
    username: "tutor",
    password: "password",
    name: "Tutor",
    email: "tutor@example.com",
    role: ROLES.TUTOR,
    language: "ca",
  },
  alumno: {
    id: "4",
    username: "alumno",
    password: "password",
    name: "Alumno",
    email: "alumno@example.com",
    role: ROLES.ALUMNO,
    language: "ca",
  },
}

// Tipos para TypeScript
export type User = {
  id: string
  username: string
  name: string
  email: string
  role: string
  language: string
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  hasPermission: (permission: string) => boolean
  changePassword: (userId: string, newPassword: string) => Promise<{ success: boolean; error?: string }>
  sendPasswordByEmail: (userId: string) => Promise<{ success: boolean; error?: string }>
  changeUsername: (userId: string, newUsername: string) => Promise<{ success: boolean; error?: string }>
  updateUserLanguage: (language: string) => void
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Proveedor del contexto
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Error parsing stored user:", error)
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  // Función de inicio de sesión
  const login = async (username: string, password: string) => {
    // Simulación de autenticación
    const userKey = Object.keys(USERS).find((key) => USERS[key as keyof typeof USERS].username === username)

    if (userKey) {
      const user = USERS[userKey as keyof typeof USERS]

      // Verificar la contraseña
      if (user.password === password) {
        // Eliminar la contraseña antes de almacenar el usuario
        const { password: _, ...userWithoutPassword } = user
        setUser(userWithoutPassword)
        localStorage.setItem("user", JSON.stringify(userWithoutPassword))

        // Establecer el idioma del usuario
        localStorage.setItem("language", userWithoutPassword.language)

        return { success: true }
      }
    }

    return { success: false, error: "Credencials invàlides" }
  }

  // Función de cierre de sesión
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    // Forzar la redirección a la página de login
    window.location.href = "/login"
  }

  // Verificar si el usuario tiene un permiso específico
  const hasPermission = (permission: string) => {
    if (!user || !user.role) return false
    return rolePermissions[user.role]?.includes(permission) || false
  }

  // Función para cambiar la contraseña
  const changePassword = async (userId: string, newPassword: string) => {
    // Simulación de cambio de contraseña
    return new Promise<{ success: boolean; error?: string }>((resolve) => {
      setTimeout(() => {
        // En una implementación real, aquí se haría una llamada a la API
        resolve({ success: true })
      }, 1000)
    })
  }

  // Función para enviar la contraseña por correo
  const sendPasswordByEmail = async (userId: string) => {
    // Simulación de envío de contraseña por correo
    return new Promise<{ success: boolean; error?: string }>((resolve) => {
      setTimeout(() => {
        // En una implementación real, aquí se haría una llamada a la API
        resolve({ success: true })
      }, 1000)
    })
  }

  // Función para cambiar el nombre de usuario
  const changeUsername = async (userId: string, newUsername: string) => {
    // Simulación de cambio de nombre de usuario
    return new Promise<{ success: boolean; error?: string }>((resolve) => {
      setTimeout(() => {
        // En una implementación real, aquí se haría una llamada a la API
        resolve({ success: true })
      }, 1000)
    })
  }

  // Función para actualizar el idioma del usuario
  const updateUserLanguage = (language: string) => {
    if (user) {
      const updatedUser = { ...user, language }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
      localStorage.setItem("language", language)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        hasPermission,
        changePassword,
        sendPasswordByEmail,
        changeUsername,
        updateUserLanguage,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Hook para usar el contexto
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }
  return context
}
