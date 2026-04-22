// Role-Based Access Control (RBAC) System

export type UserRole = 
  | "professor" 
  | "tutor" 
  | "coordinator" 
  | "administrator" 
  | "pas" 
  | "student" 
  | "family"

export type Permission = 
  | "view_attendance"
  | "edit_attendance"
  | "view_schedules"
  | "edit_schedules"
  | "view_ra_hours"
  | "edit_ra_hours"
  | "view_incidents"
  | "edit_incidents"
  | "view_on_call"
  | "edit_on_call"
  | "view_field_trips"
  | "edit_field_trips"
  | "view_classroom_booking"
  | "edit_classroom_booking"
  | "view_student_files"
  | "edit_student_files"
  | "view_announcements"
  | "edit_announcements"
  | "view_substitutions"
  | "edit_substitutions"
  | "view_people"
  | "edit_people"
  | "view_personal_data"
  | "edit_personal_data"
  | "view_communications"
  | "edit_communications"

// Define the permission matrix for each role
const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  professor: [
    "view_attendance",
    "edit_attendance",
    "view_schedules",
    "edit_schedules",
    "view_ra_hours",
    "edit_ra_hours",
    "view_incidents",
    "edit_incidents",
    "view_on_call",
    "edit_on_call",
    "view_field_trips",
    "edit_field_trips",
    "view_classroom_booking",
    "edit_classroom_booking",
  ],
  tutor: [
    // Inherits professor permissions
    "view_attendance",
    "edit_attendance",
    "view_schedules",
    "edit_schedules",
    "view_ra_hours",
    "edit_ra_hours",
    "view_incidents",
    "edit_incidents",
    "view_on_call",
    "edit_on_call",
    "view_field_trips",
    "edit_field_trips",
    "view_classroom_booking",
    "edit_classroom_booking",
    // Additional tutor permissions
    "view_student_files",
    "edit_student_files",
    "view_announcements",
    "edit_announcements",
  ],
  coordinator: [
    // Inherits tutor permissions
    "view_attendance",
    "edit_attendance",
    "view_schedules",
    "edit_schedules",
    "view_ra_hours",
    "edit_ra_hours",
    "view_incidents",
    "edit_incidents",
    "view_on_call",
    "edit_on_call",
    "view_field_trips",
    "edit_field_trips",
    "view_classroom_booking",
    "edit_classroom_booking",
    "view_student_files",
    "edit_student_files",
    "view_announcements",
    "edit_announcements",
    // Additional coordinator permissions
    "view_substitutions",
    "edit_substitutions",
  ],
  administrator: [
    // Full access
    "view_attendance",
    "edit_attendance",
    "view_schedules",
    "edit_schedules",
    "view_ra_hours",
    "edit_ra_hours",
    "view_incidents",
    "edit_incidents",
    "view_on_call",
    "edit_on_call",
    "view_field_trips",
    "edit_field_trips",
    "view_classroom_booking",
    "edit_classroom_booking",
    "view_student_files",
    "edit_student_files",
    "view_announcements",
    "edit_announcements",
    "view_substitutions",
    "edit_substitutions",
    "view_people",
    "edit_people",
    "view_personal_data",
    "edit_personal_data",
    "view_communications",
    "edit_communications",
  ],
  pas: [
    // View-only for general logistics
    "view_attendance",
    "view_schedules",
    "view_ra_hours",
    "view_incidents",
    "view_on_call",
    "view_field_trips",
    "view_classroom_booking",
    "view_announcements",
  ],
  student: [
    // Read-only: Individual schedule and personal data
    "view_schedules",
    "view_personal_data",
    "view_communications",
  ],
  family: [
    // Read-only: Assigned children's data and communications
    "view_personal_data",
    "view_communications",
    "view_student_files", // View-only for assigned children
  ],
}

// Role hierarchy for inheritance display
export const ROLE_HIERARCHY: Record<UserRole, UserRole[]> = {
  professor: [],
  tutor: ["professor"],
  coordinator: ["tutor", "professor"],
  administrator: ["coordinator", "tutor", "professor"],
  pas: [],
  student: [],
  family: [],
}

// User-friendly role labels
export const ROLE_LABELS: Record<UserRole, string> = {
  professor: "Professor",
  tutor: "Tutor",
  coordinator: "Coordinador/a",
  administrator: "Administrador/a",
  pas: "PAS (Suport Administratiu)",
  student: "Alumne/a",
  family: "Família",
}

/**
 * Get all permissions for a role (including inherited permissions)
 */
export function getPermissionsForRole(role: UserRole): Permission[] {
  return ROLE_PERMISSIONS[role] || []
}

/**
 * Check if a role has a specific permission
 */
export function hasPermission(role: UserRole, permission: Permission): boolean {
  const permissions = getPermissionsForRole(role)
  return permissions.includes(permission)
}

/**
 * Check if a role has all specified permissions
 */
export function hasAllPermissions(role: UserRole, permissions: Permission[]): boolean {
  return permissions.every((permission) => hasPermission(role, permission))
}

/**
 * Check if a role has any of the specified permissions
 */
export function hasAnyPermission(role: UserRole, permissions: Permission[]): boolean {
  return permissions.some((permission) => hasPermission(role, permission))
}

/**
 * Check if user can edit (has both view and edit permissions)
 */
export function canEdit(role: UserRole, resource: string): boolean {
  const viewPerm = `view_${resource}` as Permission
  const editPerm = `edit_${resource}` as Permission
  return hasPermission(role, viewPerm) && hasPermission(role, editPerm)
}

/**
 * Check if user can view
 */
export function canView(role: UserRole, resource: string): boolean {
  const viewPerm = `view_${resource}` as Permission
  return hasPermission(role, viewPerm)
}

/**
 * Get all visible modules for a role
 */
export function getVisibleModules(role: UserRole): string[] {
  const permissions = getPermissionsForRole(role)
  const modules = new Set<string>()

  permissions.forEach((perm) => {
    // Extract module name from permission (e.g., "view_attendance" -> "attendance")
    const match = perm.match(/^(view|edit)_(.+)$/)
    if (match) {
      modules.add(match[2])
    }
  })

  return Array.from(modules)
}

/**
 * Check if a role is admin or above
 */
export function isAdmin(role: UserRole): boolean {
  return role === "administrator"
}

/**
 * Check if a role is a teacher (professor or higher)
 */
export function isTeacher(role: UserRole): boolean {
  return ["professor", "tutor", "coordinator", "administrator"].includes(role)
}

/**
 * Check if a role is a student or family
 */
export function isStudent(role: UserRole): boolean {
  return role === "student"
}

export function isFamily(role: UserRole): boolean {
  return role === "family"
}

export function isPAS(role: UserRole): boolean {
  return role === "pas"
}
