"use client"

import { ReactNode } from "react"
import { useRBAC } from "./useRBAC"
import type { Permission } from "./roles"

interface PermissionGuardProps {
  permission: Permission | Permission[]
  fallback?: ReactNode
  requireAll?: boolean // If true, requires ALL permissions. If false, requires ANY permission
  children: ReactNode
}

/**
 * Conditionally render content based on permissions
 * @param permission - Single permission or array of permissions
 * @param fallback - Content to show if permission denied
 * @param requireAll - If true, user must have ALL permissions (default: true for single permission, false for array)
 * @param children - Content to show if permission granted
 */
export function PermissionGuard({
  permission,
  fallback = null,
  requireAll,
  children,
}: PermissionGuardProps) {
  const { hasPermission, hasAllPermissions, hasAnyPermission } = useRBAC()

  const permissions = Array.isArray(permission) ? permission : [permission]

  // Determine if user has permission
  const shouldRequireAll = requireAll !== undefined ? requireAll : !Array.isArray(permission)
  const hasAccess = shouldRequireAll
    ? hasAllPermissions(permissions)
    : hasAnyPermission(permissions)

  return hasAccess ? children : fallback
}

interface CanViewProps {
  resource: string
  fallback?: ReactNode
  children: ReactNode
}

/**
 * Show content only if user can view the resource
 */
export function CanView({ resource, fallback = null, children }: CanViewProps) {
  const { canView } = useRBAC()
  return canView(resource) ? children : fallback
}

interface CanEditProps {
  resource: string
  fallback?: ReactNode
  children: ReactNode
}

/**
 * Show content only if user can edit the resource
 */
export function CanEdit({ resource, fallback = null, children }: CanEditProps) {
  const { canEdit } = useRBAC()
  return canEdit(resource) ? children : fallback
}

interface RoleBasedProps {
  roles: string[]
  fallback?: ReactNode
  children: ReactNode
}

/**
 * Show content only for specific roles
 */
export function RoleBasedContent({ roles, fallback = null, children }: RoleBasedProps) {
  const { role } = useRBAC()
  return role && roles.includes(role) ? children : fallback
}

interface AdminOnlyProps {
  fallback?: ReactNode
  children: ReactNode
}

/**
 * Show content only to administrators
 */
export function AdminOnly({ fallback = null, children }: AdminOnlyProps) {
  const { isAdmin } = useRBAC()
  return isAdmin ? children : fallback
}

interface TeacherOnlyProps {
  fallback?: ReactNode
  children: ReactNode
}

/**
 * Show content only to teachers (and above)
 */
export function TeacherOnly({ fallback = null, children }: TeacherOnlyProps) {
  const { isTeacher } = useRBAC()
  return isTeacher ? children : fallback
}

interface StudentOnlyProps {
  fallback?: ReactNode
  children: ReactNode
}

/**
 * Show content only to students
 */
export function StudentOnly({ fallback = null, children }: StudentOnlyProps) {
  const { isStudent } = useRBAC()
  return isStudent ? children : fallback
}

interface EditableProps {
  resource: string
  readOnlyFallback?: ReactNode
  hiddenFallback?: ReactNode
  children: ReactNode
}

/**
 * Show editable content if permission exists, otherwise show read-only version
 */
export function Editable({
  resource,
  readOnlyFallback = null,
  hiddenFallback = null,
  children,
}: EditableProps) {
  const { canEdit, canView } = useRBAC()

  if (canEdit(resource)) {
    return children
  }

  if (canView(resource)) {
    return readOnlyFallback
  }

  return hiddenFallback
}
