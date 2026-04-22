"use client"

import { useAuth } from "@/lib/auth-context"
import type { UserRole, Permission } from "./roles"
import {
  hasPermission,
  hasAllPermissions,
  hasAnyPermission,
  canEdit,
  canView,
  getVisibleModules,
  isAdmin,
  isTeacher,
  isStudent,
  isFamily,
  isPAS,
} from "./roles"

export interface UseRBACReturn {
  role: UserRole | null
  hasPermission: (permission: Permission) => boolean
  hasAllPermissions: (permissions: Permission[]) => boolean
  hasAnyPermission: (permissions: Permission[]) => boolean
  canEdit: (resource: string) => boolean
  canView: (resource: string) => boolean
  isAdmin: boolean
  isTeacher: boolean
  isStudent: boolean
  isFamily: boolean
  isPAS: boolean
  visibleModules: string[]
}

/**
 * Hook to use RBAC in React components
 * Returns utility functions to check permissions based on user's role
 */
export function useRBAC(): UseRBACReturn {
  const { user } = useAuth()
  
  // Default to student role if no user or role
  const role = (user?.role || "student") as UserRole

  return {
    role,
    hasPermission: (permission: Permission) => hasPermission(role, permission),
    hasAllPermissions: (permissions: Permission[]) => hasAllPermissions(role, permissions),
    hasAnyPermission: (permissions: Permission[]) => hasAnyPermission(role, permissions),
    canEdit: (resource: string) => canEdit(role, resource),
    canView: (resource: string) => canView(role, resource),
    isAdmin: isAdmin(role),
    isTeacher: isTeacher(role),
    isStudent: isStudent(role),
    isFamily: isFamily(role),
    isPAS: isPAS(role),
    visibleModules: getVisibleModules(role),
  }
}
