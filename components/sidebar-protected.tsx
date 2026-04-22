"use client"

import { usePathname, useSearchParams } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n-context"
import { useAuth } from "@/lib/auth-context"
import { useRBAC } from "@/lib/rbac"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  LayoutDashboard,
  Calendar,
  CalendarRange,
  MessageSquare,
  Users,
  Clock,
  Building,
  School,
  BookOpen,
  Map,
  Shield,
  Laptop,
  Database,
  Tablet,
  Network,
  UserCog,
  FolderTree,
  User,
  LogOut,
  DoorOpen,
  Settings,
  ChevronDown,
} from "lucide-react"

interface SidebarProps {
  className?: string
}

export function SidebarProtected({ className }: SidebarProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { t } = useI18n()
  const { logout } = useAuth()
  const { canView } = useRBAC()

  // All possible routes with their required resource
  const allRoutes = [
    {
      label: t("sidebar.dashboard"),
      icon: LayoutDashboard,
      href: "/dashboard",
      active: pathname === "/dashboard",
      resource: null, // Dashboard is always visible
    },
    {
      label: t("sidebar.attendance"),
      icon: Calendar,
      href: "/dashboard/asistencia",
      active: pathname === "/dashboard/asistencia" && !searchParams.get("tab"),
      resource: "attendance",
      submenu: [
        {
          label: t("attendance.convalidations"),
          icon: Calendar,
          href: "/dashboard/asistencia?tab=convalidaciones",
          active: pathname === "/dashboard/asistencia" && searchParams.get("tab") === "convalidaciones",
          resource: "attendance",
        },
      ],
    },
    {
      label: "Qualificacions",
      icon: BookOpen,
      href: "/dashboard/qualificacions",
      active: pathname === "/dashboard/qualificacions",
      resource: null, // Visible to all
    },
    {
      label: "Fitxes Estudiants",
      icon: Users,
      href: "/dashboard/estudiantes",
      active: pathname.startsWith("/dashboard/estudiantes"),
      resource: "student_files",
    },
    {
      label: t("sidebar.schedules"),
      icon: CalendarRange,
      href: "/dashboard/horaris",
      active: pathname.startsWith("/dashboard/horaris"),
      resource: "schedules",
      submenu: [
        {
          label: t("sidebar.scheduleSubjects"),
          icon: BookOpen,
          href: "/dashboard/horaris/materies",
          active: pathname === "/dashboard/horaris/materies",
          resource: "schedules",
        },
      ],
    },
    {
      label: t("sidebar.communications"),
      icon: MessageSquare,
      href: "/dashboard/comunicaciones",
      active: pathname === "/dashboard/comunicaciones",
      resource: "communications",
    },
    {
      label: t("sidebar.people"),
      icon: Users,
      href: "/dashboard/personas",
      active: pathname === "/dashboard/personas",
      resource: "people",
    },
    {
      label: t("sidebar.substitutions"),
      icon: Clock,
      href: "/dashboard/sustituciones",
      active: pathname === "/dashboard/sustituciones",
      resource: "substitutions",
    },
    {
      label: t("sidebar.spaces"),
      icon: DoorOpen,
      href: "/dashboard/aulas",
      active: pathname === "/dashboard/aulas",
      resource: "classroom_booking",
    },
    {
      label: t("sidebar.tutors"),
      icon: School,
      href: "/dashboard/tutores",
      active: pathname === "/dashboard/tutores",
      resource: null, // Visible to all
    },
    {
      label: t("sidebar.exits"),
      icon: Map,
      href: "/dashboard/salidas",
      active: pathname === "/dashboard/salidas",
      resource: "field_trips",
    },
    {
      label: t("sidebar.guards"),
      icon: Shield,
      href: "/dashboard/guardias",
      active: pathname === "/dashboard/guardias",
      resource: "on_call",
    },
    {
      label: t("sidebar.equipment"),
      icon: Laptop,
      href: "/dashboard/equipamiento",
      active: pathname.startsWith("/dashboard/equipamiento"),
      resource: null, // Visible to all
      submenu: [
        {
          label: t("sidebar.inventory"),
          icon: Database,
          href: "/dashboard/equipamiento/inventario",
          active: pathname === "/dashboard/equipamiento/inventario",
          resource: null,
        },
        {
          label: t("sidebar.reservable"),
          icon: Tablet,
          href: "/dashboard/equipamiento/reservable",
          active: pathname === "/dashboard/equipamiento/reservable",
          resource: null,
        },
      ],
    },
    {
      label: t("sidebar.center"),
      icon: Building,
      href: "/dashboard/centro",
      active: pathname === "/dashboard/centro",
      resource: null, // Visible to all
    },
    {
      label: t("sidebar.organization"),
      icon: Network,
      href: "/dashboard/organigrama",
      active: pathname.startsWith("/dashboard/organigrama"),
      resource: null, // Visible to all
      submenu: [
        {
          label: t("sidebar.positions"),
          icon: UserCog,
          href: "/dashboard/organigrama/cargos",
          active: pathname === "/dashboard/organigrama/cargos",
          resource: null,
        },
        {
          label: t("sidebar.departments"),
          icon: FolderTree,
          href: "/dashboard/organigrama/departamentos",
          active: pathname === "/dashboard/organigrama/departamentos",
          resource: null,
        },
      ],
    },
    {
      label: t("sidebar.profile"),
      icon: User,
      href: "/dashboard/perfil",
      active: pathname === "/dashboard/perfil",
      resource: "personal_data",
    },
    {
      label: t("sidebar.settings"),
      icon: Settings,
      href: "/dashboard/settings",
      active: pathname === "/dashboard/settings",
      resource: null, // Visible to all
    },
  ]

  // Filter routes based on user permissions
  const visibleRoutes = allRoutes.filter((route) => {
    // If no resource required, always visible
    if (route.resource === null) return true
    // Check if user can view the resource
    return canView(route.resource)
  })

  return (
    <div className={cn("flex h-screen flex-col border-r bg-background", className)}>
      <div className="px-3 py-4">
        <Link href="/dashboard" className="flex items-center pl-3 mb-6">
          <h1 className="text-2xl font-bold">
            <span className="text-primary">{t("app.name.edu")}</span>
            <span>{t("app.name.gestio")}</span>
          </h1>
        </Link>
        <ScrollArea className="h-[calc(100vh-8rem)] pr-2">
          <div className="space-y-1">
            {visibleRoutes.map((route) => {
              const hasActiveChild = route.submenu?.some((subitem) => subitem.active) ?? false
              const showSubmenu = route.active || hasActiveChild

              return (
                <div key={route.href}>
                  <Link
                    href={route.href}
                    className={cn(
                      "text-sm group flex p-3 w-full justify-between items-center font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition text-gray-500 dark:text-gray-400",
                      route.active ? "bg-primary/10 text-primary dark:bg-primary/20" : ""
                    )}
                  >
                    <div className="flex items-center flex-1">
                      <route.icon className="w-5 h-5 mr-3" />
                      {route.label}
                    </div>
                    {route.submenu && (
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform",
                          showSubmenu ? "rotate-180" : ""
                        )}
                      />
                    )}
                  </Link>
                  {route.submenu && showSubmenu && (
                    <div className="pl-9 space-y-1 mt-2">
                      {route.submenu.map((subitem) => (
                        <Link
                          key={subitem.href}
                          href={subitem.href}
                          className={cn(
                            "text-sm flex p-2 w-full items-center font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition text-gray-500 dark:text-gray-400",
                            subitem.active ? "bg-primary/10 text-primary dark:bg-primary/20" : ""
                          )}
                        >
                          <subitem.icon className="w-4 h-4 mr-3" />
                          {subitem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </div>

      <div className="border-t p-4">
        <button
          onClick={logout}
          className="text-sm group flex p-3 w-full justify-between items-center font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition text-gray-500 dark:text-gray-400"
        >
          <div className="flex items-center flex-1">
            <LogOut className="w-5 h-5 mr-3" />
            {t("sidebar.logout")}
          </div>
        </button>
      </div>
    </div>
  )
}
