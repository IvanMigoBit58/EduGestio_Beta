"use client"

import { ReactNode } from "react"
import { useRBAC } from "./useRBAC"

/**
 * Map of resources to sidebar menu items
 * Used to control visibility based on permissions
 */
export const RESOURCE_MENU_MAP: Record<string, string[]> = {
  attendance: ["asistencia"],
  schedules: ["horaris"],
  ra_hours: ["horaris"], // Part of schedules
  incidents: ["personas"], // Incidents are in student files
  on_call: ["guardias"],
  field_trips: ["salidas"],
  classroom_booking: ["aulas"],
  student_files: ["estudiantes"],
  announcements: ["comunicaciones"],
  substitutions: ["estudiantes"], // Substitutions submenu
  people: ["personas"],
  personal_data: ["perfil"],
  communications: ["comunicaciones"],
}

interface SidebarNavItemProps {
  href: string
  label: string
  icon?: ReactNode
  resource?: string // Resource name to check permissions
  children?: ReactNode
}

/**
 * Render a sidebar navigation item only if user has permission
 */
export function SidebarNavItem({
  href,
  label,
  icon,
  resource,
  children,
}: SidebarNavItemProps) {
  const { canView } = useRBAC()

  // If a resource is specified, check if user can view it
  if (resource && !canView(resource)) {
    return null
  }

  return (
    <a href={href} className="flex items-center gap-2 p-2">
      {icon && <span>{icon}</span>}
      <span>{label}</span>
    </a>
  )
}

interface NavGroupProps {
  label: string
  icon?: ReactNode
  resource?: string
  children: ReactNode
}

/**
 * Render a navigation group only if user has any permission to its resources
 */
export function NavGroup({ label, icon, resource, children }: NavGroupProps) {
  const { canView } = useRBAC()

  if (resource && !canView(resource)) {
    return null
  }

  return (
    <div className="nav-group">
      <div className="nav-group-header">
        {icon && <span>{icon}</span>}
        <span>{label}</span>
      </div>
      <div className="nav-group-content">{children}</div>
    </div>
  )
}

/**
 * Get menu items that should be visible for the current user
 */
export function getVisibleMenuItems(role: string): string[] {
  const visibleResources = getVisibleResourcesForRole(role)
  const menuItems = new Set<string>()

  visibleResources.forEach((resource) => {
    const items = RESOURCE_MENU_MAP[resource]
    if (items) {
      items.forEach((item) => menuItems.add(item))
    }
  })

  return Array.from(menuItems)
}

/**
 * Get visible resources for a specific role
 */
function getVisibleResourcesForRole(role: string): string[] {
  const roleResourceMap: Record<string, string[]> = {
    professor: [
      "attendance",
      "schedules",
      "ra_hours",
      "incidents",
      "on_call",
      "field_trips",
      "classroom_booking",
    ],
    tutor: [
      "attendance",
      "schedules",
      "ra_hours",
      "incidents",
      "on_call",
      "field_trips",
      "classroom_booking",
      "student_files",
      "announcements",
    ],
    coordinator: [
      "attendance",
      "schedules",
      "ra_hours",
      "incidents",
      "on_call",
      "field_trips",
      "classroom_booking",
      "student_files",
      "announcements",
      "substitutions",
    ],
    administrator: [
      "attendance",
      "schedules",
      "ra_hours",
      "incidents",
      "on_call",
      "field_trips",
      "classroom_booking",
      "student_files",
      "announcements",
      "substitutions",
      "people",
      "personal_data",
      "communications",
    ],
    pas: [
      "attendance",
      "schedules",
      "ra_hours",
      "incidents",
      "on_call",
      "field_trips",
      "classroom_booking",
      "announcements",
    ],
    student: ["schedules", "personal_data", "communications"],
    family: ["personal_data", "communications", "student_files"],
  }

  return roleResourceMap[role] || []
}

/**
 * Check if a menu item should be visible for a role
 */
export function isMenuItemVisible(role: string, menuItem: string): boolean {
  const visibleItems = getVisibleMenuItems(role)
  return visibleItems.includes(menuItem)
}
