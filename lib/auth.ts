"use client"

import { createContext, useContext } from "react"

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
}

// Tipos para TypeScript
export type User = {
  id: string
  username: string
  name: string
  email: string
  role: string
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
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Hook para usar el contexto
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }
  return context
}
