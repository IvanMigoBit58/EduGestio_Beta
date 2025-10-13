"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n-context"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { VisuallyHidden } from "@/components/ui/visually-hidden"
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
  Menu,
  DoorOpen,
} from "lucide-react"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { t } = useI18n()

  const routes = [
    {
      label: t("sidebar.dashboard"),
      icon: LayoutDashboard,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: t("sidebar.attendance"),
      icon: Calendar,
      href: "/dashboard/asistencia",
      active: pathname === "/dashboard/asistencia",
    },
    {
      label: t("sidebar.schedules"),
      icon: CalendarRange,
      href: "/dashboard/horaris",
      active: pathname.startsWith("/dashboard/horaris"),
      submenu: [
        {
          label: t("sidebar.scheduleSubjects"),
          icon: BookOpen,
          href: "/dashboard/horaris/materies",
          active: pathname === "/dashboard/horaris/materies",
        },
      ],
    },
    {
      label: t("sidebar.communications"),
      icon: MessageSquare,
      href: "/dashboard/comunicaciones",
      active: pathname === "/dashboard/comunicaciones",
    },
    {
      label: t("sidebar.people"),
      icon: Users,
      href: "/dashboard/personas",
      active: pathname === "/dashboard/personas",
    },
    {
      label: t("sidebar.substitutions"),
      icon: Clock,
      href: "/dashboard/sustituciones",
      active: pathname === "/dashboard/sustituciones",
    },
    {
      label: t("sidebar.spaces"),
      icon: DoorOpen, // Cambiado de Building a DoorOpen
      href: "/dashboard/aulas",
      active: pathname === "/dashboard/aulas",
    },
    {
      label: t("sidebar.tutors"),
      icon: School,
      href: "/dashboard/tutores",
      active: pathname === "/dashboard/tutores",
    },
    {
      label: t("sidebar.exits"),
      icon: Map,
      href: "/dashboard/salidas",
      active: pathname === "/dashboard/salidas",
    },
    {
      label: t("sidebar.guards"),
      icon: Shield,
      href: "/dashboard/guardias",
      active: pathname === "/dashboard/guardias",
    },
    {
      label: t("sidebar.equipment"),
      icon: Laptop,
      href: "/dashboard/equipamiento",
      active: pathname.startsWith("/dashboard/equipamiento"),
      submenu: [
        {
          label: t("sidebar.inventory"),
          icon: Database,
          href: "/dashboard/equipamiento/inventario",
          active: pathname === "/dashboard/equipamiento/inventario",
        },
        {
          label: t("sidebar.reservable"),
          icon: Tablet,
          href: "/dashboard/equipamiento/reservable",
          active: pathname === "/dashboard/equipamiento/reservable",
        },
      ],
    },
    {
      label: t("sidebar.center"),
      icon: Building,
      href: "/dashboard/centro",
      active: pathname === "/dashboard/centro",
    },
    {
      label: t("sidebar.organization"),
      icon: Network,
      href: "/dashboard/organigrama",
      active: pathname.startsWith("/dashboard/organigrama"),
      submenu: [
        {
          label: t("sidebar.positions"),
          icon: UserCog,
          href: "/dashboard/organigrama/cargos",
          active: pathname === "/dashboard/organigrama/cargos",
        },
        {
          label: t("sidebar.departments"),
          icon: FolderTree,
          href: "/dashboard/organigrama/departamentos",
          active: pathname === "/dashboard/organigrama/departamentos",
        },
      ],
    },
    {
      label: t("sidebar.profile"),
      icon: User,
      href: "/dashboard/perfil",
      active: pathname === "/dashboard/perfil",
    },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">{t("common.openMenu")}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] pr-0">
        <VisuallyHidden>
          <SheetTitle>Navigation Menu</SheetTitle>
        </VisuallyHidden>
        <div className="px-2 py-6">
          <Link href="/dashboard" className="flex items-center pl-2 mb-6" onClick={() => setOpen(false)}>
            <h1 className="text-2xl font-bold">
              <span className="text-primary">Edu</span>
              <span>Gestió</span>
            </h1>
          </Link>
          <ScrollArea className="h-[calc(100vh-8rem)] pr-2">
            <div className="space-y-1">
              {routes.map((route) => (
                <div key={route.href}>
                  <Link
                    href={route.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                      route.active ? "text-primary bg-primary/10" : "text-gray-500 dark:text-gray-400",
                    )}
                  >
                    <div className="flex items-center flex-1">
                      <route.icon
                        className={cn(
                          "h-5 w-5 mr-3",
                          route.active ? "text-primary" : "text-gray-500 dark:text-gray-400",
                        )}
                      />
                      {route.label}
                    </div>
                  </Link>
                  {route.submenu && route.active && (
                    <div className="ml-6 mt-1 space-y-1">
                      {route.submenu.map((subitem) => (
                        <Link
                          key={subitem.href}
                          href={subitem.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                            subitem.active ? "text-primary bg-primary/10" : "text-gray-500 dark:text-gray-400",
                          )}
                        >
                          <div className="flex items-center flex-1">
                            <subitem.icon
                              className={cn(
                                "h-4 w-4 mr-3",
                                subitem.active ? "text-primary" : "text-gray-500 dark:text-gray-400",
                              )}
                            />
                            {subitem.label}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition text-gray-500 dark:text-gray-400"
            >
              <div className="flex items-center flex-1">
                <LogOut className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
                {t("sidebar.logout")}
              </div>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
