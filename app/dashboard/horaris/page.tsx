"use client"

import Link from "next/link"
import { useCallback, useEffect, useMemo, useState } from "react"
import {
  RefreshCcw,
  RefreshCw,
  Users,
  CalendarRange,
  Building2,
  Plus,
  Pencil,
  Trash2,
  AlertCircle,
} from "lucide-react"

import { PageLayout } from "@/components/page-layout"
import { useI18n } from "@/lib/i18n-context"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  DEFAULT_SCHEDULE_CONFIG,
  ScheduleConfig,
  TimeSlot,
  useScheduleConfig,
} from "@/lib/schedule-config"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { DEFAULT_SUBJECTS, useScheduleSubjects } from "@/lib/schedule-subjects"
import type { ScheduleSubject } from "@/lib/schedule-subjects"
import { useScheduleLocations } from "@/lib/schedule-locations"

const weekDays = ["Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres"] as const

type ScheduleCategory = "groups" | "teachers" | "rooms"

type ScheduleEntryType = "lective" | "non_lective"

type LegacyScheduleEntry = {
  id: string
  day: (typeof weekDays)[number]
  subjectId: string
  subjectName: string
  start: string
  end: string
  location: string
  group?: string
}

type LegacySchedules = Record<ScheduleCategory, Record<string, LegacyScheduleEntry[]>>

type ScheduleCell = {
  id: string
  subjectId: string
  title: string
  type: ScheduleEntryType
  location: string
  group?: string
}

type ScheduleMatrix = Record<ScheduleCategory, Record<string, Record<string, Record<string, ScheduleCell>>>>

type EditorState = {
  category: ScheduleCategory
  entity: string
  day: string
  timeSlot: TimeSlot
  cell?: ScheduleCell
}

type ScheduleEntryForm = {
  subjectId: string
  locationId: string
  type: ScheduleEntryType
  group: string
}

const defaultSubjectByName = DEFAULT_SUBJECTS.reduce<Record<string, ScheduleSubject>>((acc, subject) => {
  acc[subject.name] = subject
  return acc
}, {})

function createLegacyEntry(params: {
  id: string
  dayIndex: number
  subjectName: string
  start: string
  end: string
  location: string
  group?: string
}): LegacyScheduleEntry {
  const subject = defaultSubjectByName[params.subjectName]
  const fallbackSubject = DEFAULT_SUBJECTS[0]
  const subjectId = subject?.id ?? fallbackSubject?.id ?? `subject-${params.subjectName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
  const subjectName = subject?.name ?? params.subjectName

  return {
    id: params.id,
    day: weekDays[params.dayIndex] ?? weekDays[0],
    subjectId,
    subjectName,
    start: params.start,
    end: params.end,
    location: params.location,
    group: params.group,
  }
}

const legacySchedules: LegacySchedules = {
  groups: {
    "1r ESO A": [
      createLegacyEntry({
        id: "g-1",
        dayIndex: 0,
        subjectName: "Matemàtiques",
        start: "08:00",
        end: "08:55",
        location: "Aula 101",
        group: "1r ESO A",
      }),
      createLegacyEntry({
        id: "g-2",
        dayIndex: 0,
        subjectName: "Llengua Catalana",
        start: "09:00",
        end: "09:55",
        location: "Aula 101",
        group: "1r ESO A",
      }),
      createLegacyEntry({
        id: "g-3",
        dayIndex: 1,
        subjectName: "Anglès",
        start: "08:00",
        end: "08:55",
        location: "Aula 101",
        group: "1r ESO A",
      }),
    ],
    "2n ESO B": [
      createLegacyEntry({
        id: "g-4",
        dayIndex: 2,
        subjectName: "Llengua Castellana",
        start: "10:05",
        end: "11:00",
        location: "Aula 204",
        group: "2n ESO B",
      }),
      createLegacyEntry({
        id: "g-5",
        dayIndex: 3,
        subjectName: "Ciències Naturals",
        start: "09:00",
        end: "09:55",
        location: "Laboratori 2",
        group: "2n ESO B",
      }),
      createLegacyEntry({
        id: "g-6",
        dayIndex: 4,
        subjectName: "Ciències Socials",
        start: "08:00",
        end: "08:55",
        location: "Aula 204",
        group: "2n ESO B",
      }),
    ],
    "3r ESO C": [
      createLegacyEntry({
        id: "g-7",
        dayIndex: 1,
        subjectName: "Educació Física",
        start: "11:30",
        end: "12:25",
        location: "Pavelló",
        group: "3r ESO C",
      }),
      createLegacyEntry({
        id: "g-8",
        dayIndex: 2,
        subjectName: "Música",
        start: "12:30",
        end: "13:25",
        location: "Aula de Música",
        group: "3r ESO C",
      }),
      createLegacyEntry({
        id: "g-9",
        dayIndex: 4,
        subjectName: "Tecnologia",
        start: "10:05",
        end: "11:00",
        location: "Taller",
        group: "3r ESO C",
      }),
    ],
  },
  teachers: {
    "Maria López": [
      createLegacyEntry({
        id: "t-1",
        dayIndex: 0,
        subjectName: "Matemàtiques",
        start: "08:00",
        end: "08:55",
        location: "Aula 101",
        group: "1r ESO A",
      }),
      createLegacyEntry({
        id: "t-2",
        dayIndex: 2,
        subjectName: "Anglès",
        start: "09:00",
        end: "09:55",
        location: "Aula 204",
        group: "2n ESO B",
      }),
      createLegacyEntry({
        id: "t-3",
        dayIndex: 4,
        subjectName: "Matemàtiques",
        start: "10:05",
        end: "11:00",
        location: "Aula 203",
        group: "3r ESO C",
      }),
    ],
    "Joan Martínez": [
      createLegacyEntry({
        id: "t-4",
        dayIndex: 1,
        subjectName: "Ciències Naturals",
        start: "08:00",
        end: "08:55",
        location: "Laboratori 1",
        group: "2n ESO B",
      }),
      createLegacyEntry({
        id: "t-5",
        dayIndex: 3,
        subjectName: "Ciències Socials",
        start: "12:30",
        end: "13:25",
        location: "Sala Multimèdia",
        group: "1r Batxillerat",
      }),
      createLegacyEntry({
        id: "t-6",
        dayIndex: 4,
        subjectName: "Llengua Castellana",
        start: "09:00",
        end: "09:55",
        location: "Aula 202",
        group: "1r ESO B",
      }),
    ],
    "Anna Vidal": [
      createLegacyEntry({
        id: "t-7",
        dayIndex: 0,
        subjectName: "Música",
        start: "11:30",
        end: "12:25",
        location: "Aula de Música",
        group: "4t ESO A",
      }),
      createLegacyEntry({
        id: "t-8",
        dayIndex: 2,
        subjectName: "Educació Física",
        start: "12:30",
        end: "13:25",
        location: "Pista 2",
        group: "1r Batxillerat",
      }),
      createLegacyEntry({
        id: "t-9",
        dayIndex: 3,
        subjectName: "Anglès",
        start: "10:05",
        end: "11:00",
        location: "Aula 201",
        group: "4t ESO A",
      }),
    ],
  },
  rooms: {
    "Laboratori 1": [
      createLegacyEntry({
        id: "r-1",
        dayIndex: 1,
        subjectName: "Ciències Naturals",
        start: "08:00",
        end: "08:55",
        location: "Laboratori 1",
        group: "2n ESO B",
      }),
      createLegacyEntry({
        id: "r-2",
        dayIndex: 2,
        subjectName: "Tecnologia",
        start: "10:05",
        end: "11:00",
        location: "Laboratori 1",
        group: "4t ESO C",
      }),
      createLegacyEntry({
        id: "r-3",
        dayIndex: 3,
        subjectName: "Ciències Socials",
        start: "11:30",
        end: "12:25",
        location: "Laboratori 1",
        group: "Batxillerat",
      }),
    ],
    "Aula 101": [
      createLegacyEntry({
        id: "r-4",
        dayIndex: 0,
        subjectName: "Llengua Catalana",
        start: "08:00",
        end: "08:55",
        location: "Aula 101",
        group: "1r ESO A",
      }),
      createLegacyEntry({
        id: "r-5",
        dayIndex: 1,
        subjectName: "Matemàtiques",
        start: "09:00",
        end: "09:55",
        location: "Aula 101",
        group: "1r ESO B",
      }),
      createLegacyEntry({
        id: "r-6",
        dayIndex: 4,
        subjectName: "Anglès",
        start: "10:05",
        end: "11:00",
        location: "Aula 101",
        group: "2n ESO A",
      }),
    ],
    "Sala d'Actes": [
      createLegacyEntry({
        id: "r-7",
        dayIndex: 2,
        subjectName: "Música",
        start: "12:30",
        end: "13:25",
        location: "Sala d'Actes",
        group: "3r ESO C",
      }),
      createLegacyEntry({
        id: "r-8",
        dayIndex: 4,
        subjectName: "Educació Física",
        start: "11:30",
        end: "12:25",
        location: "Sala d'Actes",
        group: "Activitat Extra",
      }),
      createLegacyEntry({
        id: "r-9",
        dayIndex: 3,
        subjectName: "Ciències Socials",
        start: "09:00",
        end: "09:55",
        location: "Sala d'Actes",
        group: "1r Batxillerat",
      }),
    ],
  },
}

const scheduleTypeBadgeVariant: Record<ScheduleEntryType, "default" | "secondary"> = {
  lective: "default",
  non_lective: "secondary",
}

export default function HorarisPage() {
  const { config } = useScheduleConfig()
  const { subjects, subjectsById } = useScheduleSubjects()
  const { locations, locationsById, locationsByName } = useScheduleLocations()
  const { t, language } = useI18n()
  const { toast } = useToast()

  const [schedules, setSchedules] = useState<ScheduleMatrix>(() =>
    mapLegacyToMatrix(DEFAULT_SCHEDULE_CONFIG, DEFAULT_SUBJECTS),
  )
  const [activeTab, setActiveTab] = useState<ScheduleCategory>("teachers")
  const [selectedGroup, setSelectedGroup] = useState<string>(Object.keys(legacySchedules.groups)[0])
  const [selectedTeacher, setSelectedTeacher] = useState<string>(Object.keys(legacySchedules.teachers)[0])
  const [selectedRoom, setSelectedRoom] = useState<string>(Object.keys(legacySchedules.rooms)[0])
  const [lastUpdated, setLastUpdated] = useState<string>(new Date().toISOString())
  const [isUpdatingAll, setIsUpdatingAll] = useState(false)
  const [isUpdatingCurrent, setIsUpdatingCurrent] = useState(false)
  const [editorState, setEditorState] = useState<EditorState | null>(null)
  const [formState, setFormState] = useState<ScheduleEntryForm>(() => {
    const firstSubject = DEFAULT_SUBJECTS[0]
    return {
      subjectId: firstSubject?.id ?? "",
      locationId: "",
      type: firstSubject?.type ?? "lective",
      group: "",
    }
  })

  const getLocationIdForName = useCallback(
    (name: string | undefined | null) => {
      if (!name) {
        return ""
      }
      const match = locationsByName.get(name.trim().toLowerCase())
      return match?.id ?? ""
    },
    [locationsByName],
  )

  useEffect(() => {
    setSchedules((prev) => syncScheduleWithConfig(prev, config))
  }, [config])

  useEffect(() => {
    setSchedules((prev) => syncScheduleWithSubjects(prev, subjects))
  }, [subjects])

  useEffect(() => {
    if (subjects.length === 0) {
      setFormState((prev) => {
        if (prev.subjectId === "" && prev.locationId === "" && prev.type === "lective" && prev.group === "") {
          return prev
        }
        return {
          subjectId: "",
          locationId: "",
          type: "lective",
          group: "",
        }
      })
      return
    }

    if (!subjectsById.has(formState.subjectId)) {
      const fallback = subjects[0]
      const fallbackLocationId =
        getLocationIdForName(fallback.defaultLocation) || (locations[0]?.id ?? "")
      setFormState({
        subjectId: fallback.id,
        locationId: fallbackLocationId,
        type: fallback.type,
        group: fallback.type === "lective" ? "" : "",
      })
      return
    }

    const currentSubject = subjectsById.get(formState.subjectId)
    if (currentSubject && currentSubject.type !== formState.type) {
      setFormState((prev) => ({
        ...prev,
        type: currentSubject.type,
        group: currentSubject.type === "lective" ? prev.group : "",
      }))
    }
  }, [
    subjects,
    subjectsById,
    formState.subjectId,
    formState.type,
    getLocationIdForName,
    locations,
  ])

  const entityKey: string = useMemo(() => {
    if (activeTab === "groups") return selectedGroup
    if (activeTab === "rooms") return selectedRoom
    return selectedTeacher
  }, [activeTab, selectedGroup, selectedTeacher, selectedRoom])

  const currentEntriesCount = useMemo(() => {
    const entityData = schedules[activeTab][entityKey]
    if (!entityData) return 0
    return Object.values(entityData).reduce((acc, daySlots) => acc + Object.keys(daySlots).length, 0)
  }, [schedules, activeTab, entityKey])

  const formattedLastUpdated = useMemo(() => {
    try {
      return new Intl.DateTimeFormat(language, {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(lastUpdated))
    } catch (error) {
      return new Date(lastUpdated).toLocaleString()
    }
  }, [lastUpdated, language])

  useEffect(() => {
    if (formState.locationId === "") {
      return
    }

    if (!locationsById.has(formState.locationId)) {
      setFormState((prev) => ({ ...prev, locationId: "" }))
    }
  }, [formState.locationId, locationsById])

  const groupOptions = useMemo(() => Object.keys(legacySchedules.groups), [])
  const hasSubjects = subjects.length > 0
  const hasLocations = locations.length > 0

  const handleOpenEditor = (
    category: ScheduleCategory,
    entity: string,
    day: string,
    timeSlot: TimeSlot,
    cell?: ScheduleCell,
  ) => {
    if (!hasSubjects) {
      toast({
        title: t("schedules.subjectsRequiredTitle"),
        description: t("schedules.subjectsRequiredDescription"),
        variant: "destructive",
      })
      return
    }

    if (!hasLocations) {
      toast({
        title: t("schedules.locationsRequiredTitle"),
        description: t("schedules.locationsRequiredDescription"),
        variant: "destructive",
      })
      return
    }

    const initialSubjectId = cell?.subjectId ?? subjects[0].id
    const subject = subjectsById.get(initialSubjectId) ?? subjects[0]
    const locationFromCell = cell?.location ?? ""
    const defaultLocationFromSubject = subject?.defaultLocation ?? ""
    const resolvedLocationId =
      (locationFromCell ? getLocationIdForName(locationFromCell) : "") ||
      (defaultLocationFromSubject ? getLocationIdForName(defaultLocationFromSubject) : "") ||
      (locations[0]?.id ?? "")
    const baseGroup =
      subject?.type === "lective"
        ? cell?.group ?? (category === "groups" ? entity : "")
        : ""

    setFormState({
      subjectId: subject?.id ?? "",
      locationId: resolvedLocationId,
      type: subject?.type ?? "lective",
      group: baseGroup,
    })

    setEditorState({ category, entity, day, timeSlot, cell })
  }

  const handleDeleteCell = (
    category: ScheduleCategory,
    entity: string,
    day: string,
    timeSlotId: string,
  ) => {
    setSchedules((prev) => {
      const categoryData = prev[category]
      const entityData = categoryData[entity]
      if (!entityData) return prev

      const dayData = entityData[day]
      if (!dayData?.[timeSlotId]) return prev

      const nextDay = { ...dayData }
      delete nextDay[timeSlotId]

      const nextEntity = { ...entityData, [day]: nextDay }
      const nextCategory = { ...categoryData, [entity]: nextEntity }

      return {
        ...prev,
        [category]: nextCategory,
      }
    })
  }

  const handleSaveCell = () => {
    if (!editorState) return

    const subject = subjectsById.get(formState.subjectId)
    if (!subject) {
      toast({
        title: t("schedules.subjectNotFoundTitle"),
        description: t("schedules.subjectNotFoundDescription"),
        variant: "destructive",
      })
      return
    }

    const groupValue =
      subject.type === "lective"
        ? editorState.category === "groups"
          ? editorState.entity
          : formState.group
        : undefined

    if (subject.type === "lective" && (!groupValue || groupValue.trim() === "")) {
      toast({
        title: t("schedules.groupRequiredTitle"),
        description: t("schedules.groupRequiredDescription"),
        variant: "destructive",
      })
      return
    }

    const locationEntry = locationsById.get(formState.locationId)
    if (!locationEntry) {
      toast({
        title: t("schedules.locationsRequiredTitle"),
        description: t("schedules.locationsRequiredDescription"),
        variant: "destructive",
      })
      return
    }

    const { category, entity, day, timeSlot, cell } = editorState
    const nextCell: ScheduleCell = {
      id: cell?.id ?? createId(),
      subjectId: subject.id,
      title: subject.name,
      type: subject.type,
      location: locationEntry.name,
      group: subject.type === "lective" ? groupValue : undefined,
    }

    setSchedules((prev) => {
      const categoryData = prev[category] ?? {}
      const entityData = categoryData[entity] ?? {}
      const dayData = entityData[day] ?? {}

      return {
        ...prev,
        [category]: {
          ...categoryData,
          [entity]: {
            ...entityData,
            [day]: {
              ...dayData,
              [timeSlot.id]: nextCell,
            },
          },
        },
      }
    })

    setEditorState(null)
  }

  const simulateUpdate = (scope: "all" | "current") => {
    if (scope === "all") {
      setIsUpdatingAll(true)
    } else {
      setIsUpdatingCurrent(true)
    }

    setTimeout(() => {
      setLastUpdated(new Date().toISOString())

      if (scope === "all") {
        setIsUpdatingAll(false)
        toast({
          title: t("schedules.updateAllSuccessTitle"),
          description: t("schedules.updateAllSuccessDescription"),
        })
      } else {
        setIsUpdatingCurrent(false)
        toast({
          title: t("schedules.updateCurrentSuccessTitle", { entity: entityKey }),
          description: t("schedules.updateCurrentSuccessDescription"),
        })
      }
    }, 1500)
  }

  const renderScheduleMatrix = (category: ScheduleCategory) => {
    const timeSlots = config.timeSlots
    const entityOptions = Object.keys(schedules[category])
    const selectedEntity =
      category === "groups" ? selectedGroup : category === "rooms" ? selectedRoom : selectedTeacher

    const setSelectedEntity = (value: string) => {
      if (category === "groups") {
        setSelectedGroup(value)
      } else if (category === "rooms") {
        setSelectedRoom(value)
      } else {
        setSelectedTeacher(value)
      }
    }

    const dayMap = schedules[category][selectedEntity] ?? {}

    return (
      <Card>
        <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <CardTitle>
              {category === "groups"
                ? t("schedules.groupSchedules")
                : category === "rooms"
                  ? t("schedules.roomSchedules")
                  : t("schedules.teacherSchedules")}
            </CardTitle>
            <CardDescription>
              {category === "groups"
                ? t("schedules.groupDescription")
                : category === "rooms"
                  ? t("schedules.roomSchedulesDescription")
                  : t("schedules.teacherSchedulesDescription")}
            </CardDescription>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Select value={selectedEntity} onValueChange={setSelectedEntity}>
              <SelectTrigger className="w-[220px]">
                <SelectValue
                  placeholder={
                    category === "groups"
                      ? t("schedules.selectGroup")
                      : category === "rooms"
                        ? t("schedules.selectRoom")
                        : t("schedules.selectTeacher")
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {entityOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Badge variant="secondary">
              {t("schedules.entriesCount", {
                count: Object.values(dayMap).reduce(
                  (acc, timeSlotMap) => acc + Object.keys(timeSlotMap).length,
                  0,
                ),
              })}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("schedules.timeSlot")}</TableHead>
                  {weekDays.map((day) => (
                    <TableHead key={day}>{day}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {timeSlots.map((timeSlot) => (
                  <TableRow key={timeSlot.id}>
                    <TableCell className="align-top">
                      <div className="flex flex-col">
                        <span className="font-medium">{timeSlot.label}</span>
                        <span className="text-xs text-muted-foreground">
                          {timeSlot.start} - {timeSlot.end}
                        </span>
                      </div>
                    </TableCell>
                    {weekDays.map((day) => {
                      const cell = dayMap[day]?.[timeSlot.id]
                      return (
                        <TableCell key={`${day}-${timeSlot.id}`} className="align-top">
                          {cell ? (
                            <div className="space-y-2 rounded-md border p-3">
                              <div className="flex items-center justify-between gap-2">
                                <span className="font-medium leading-tight">{cell.title}</span>
                                <Badge variant={scheduleTypeBadgeVariant[cell.type]}>
                                  {t(`schedules.${cell.type}`)}
                                </Badge>
                              </div>
                              <div className="space-y-1 text-xs text-muted-foreground">
                                {cell.location && <p>{cell.location}</p>}
                                {cell.group && (
                                  <p>{t("schedules.entryGroupLabel", { group: cell.group })}</p>
                                )}
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleOpenEditor(category, selectedEntity, day, timeSlot, cell)}
                                >
                                  <Pencil className="mr-2 h-3.5 w-3.5" />
                                  {t("common.edit")}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteCell(category, selectedEntity, day, timeSlot.id)}
                                >
                                  <Trash2 className="mr-2 h-3.5 w-3.5" />
                                  {t("common.delete")}
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-auto justify-start whitespace-normal px-3 py-6 text-left"
                              onClick={() => handleOpenEditor(category, selectedEntity, day, timeSlot)}
                              disabled={!hasSubjects}
                            >
                              <div className="flex items-start gap-2">
                                <Plus className="h-4 w-4" />
                                <div className="flex flex-col">
                                  <span className="font-medium">
                                    {t("schedules.addEntry", { day })}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {t("schedules.addEntryHelper")}
                                  </span>
                                </div>
                              </div>
                            </Button>
                          )}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="text-xs text-muted-foreground">
            {t("schedules.currentlyViewing", { category: selectedEntity })}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <PageLayout
        title={t("schedules.title")}
        description={t("schedules.description")}
        actions={
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => simulateUpdate("current")}
              disabled={isUpdatingAll || isUpdatingCurrent || currentEntriesCount === 0}
            >
              {isUpdatingCurrent ? (
                <span className="flex items-center gap-2 text-sm">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  {t("common.loading")}
                </span>
              ) : (
                <span className="flex items-center gap-2 text-sm">
                  <RefreshCw className="h-4 w-4" />
                  {t("schedules.updateCurrent")}
                </span>
              )}
            </Button>
            <Button onClick={() => simulateUpdate("all")} disabled={isUpdatingAll}>
              {isUpdatingAll ? (
                <span className="flex items-center gap-2 text-sm">
                  <RefreshCcw className="h-4 w-4 animate-spin" />
                  {t("common.loading")}
                </span>
              ) : (
                <span className="flex items-center gap-2 text-sm">
                  <RefreshCcw className="h-4 w-4" />
                  {t("schedules.updateAll")}
                </span>
              )}
            </Button>
          </div>
        }
      >
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("schedules.teacherSchedules")}</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Object.keys(schedules.teachers).length}</div>
              <p className="text-xs text-muted-foreground">{t("schedules.teacherSummary")}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("schedules.groupSchedules")}</CardTitle>
              <CalendarRange className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Object.keys(schedules.groups).length}</div>
              <p className="text-xs text-muted-foreground">{t("schedules.groupSummary")}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("schedules.roomSchedules")}</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Object.keys(schedules.rooms).length}</div>
              <p className="text-xs text-muted-foreground">{t("schedules.roomSummary")}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium">{t("schedules.lastUpdated")}</p>
              <p className="text-sm text-muted-foreground">{formattedLastUpdated}</p>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>{t("schedules.activeSelection", { entity: entityKey })}</span>
              {config.hasAfternoonShift ? (
                <Badge variant="secondary">{t("schedules.afternoonShiftEnabled")}</Badge>
              ) : (
                <Badge variant="outline">{t("schedules.afternoonShiftDisabled")}</Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {!hasSubjects && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{t("schedules.noSubjectsTitle")}</AlertTitle>
            <AlertDescription className="flex flex-wrap items-center gap-2">
              <span>{t("schedules.noSubjectsDescription")}</span>
              <Link
                href="/dashboard/horaris/materies"
                className="text-sm font-semibold underline-offset-2 hover:underline"
              >
                {t("schedules.noSubjectsCta")}
              </Link>
            </AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ScheduleCategory)}>
          <TabsList>
            <TabsTrigger value="teachers">{t("schedules.teacherTab")}</TabsTrigger>
            <TabsTrigger value="groups">{t("schedules.groupTab")}</TabsTrigger>
            <TabsTrigger value="rooms">{t("schedules.roomTab")}</TabsTrigger>
          </TabsList>
          <TabsContent value="teachers" className="mt-6">
            {renderScheduleMatrix("teachers")}
          </TabsContent>
          <TabsContent value="groups" className="mt-6">
            {renderScheduleMatrix("groups")}
          </TabsContent>
          <TabsContent value="rooms" className="mt-6">
            {renderScheduleMatrix("rooms")}
          </TabsContent>
        </Tabs>
      </PageLayout>

      <Dialog open={Boolean(editorState)} onOpenChange={(open) => (!open ? setEditorState(null) : undefined)}>
        {editorState && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editorState.cell ? t("schedules.editEntryTitle") : t("schedules.addEntryTitle")}
              </DialogTitle>
              <DialogDescription>
                {t("schedules.editEntryDescription", {
                  entity: editorState.entity,
                  day: editorState.day,
                  slot: `${editorState.timeSlot.start} - ${editorState.timeSlot.end}`,
                })}
              </DialogDescription>
            </DialogHeader>
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault()
                handleSaveCell()
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="entry-subject">{t("schedules.entrySubject")}</Label>
                <Select
                  value={formState.subjectId}
                  onValueChange={(value) => {
                    const subject = subjectsById.get(value)
                    if (!subject) return
                    const defaultLocationId = subject.defaultLocation
                      ? getLocationIdForName(subject.defaultLocation)
                      : ""
                    setFormState((prev) => ({
                      subjectId: value,
                      locationId:
                        defaultLocationId ||
                        (prev.locationId && locationsById.has(prev.locationId)
                          ? prev.locationId
                          : locations[0]?.id ?? ""),
                      type: subject.type,
                      group:
                        subject.type === "lective"
                          ? editorState.category === "groups"
                            ? editorState.entity
                            : prev.group
                          : "",
                    }))
                  }}
                  disabled={!hasSubjects}
                >
                  <SelectTrigger id="entry-subject">
                    <SelectValue placeholder={t("schedules.noSubjectsPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id}>
                        {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="entry-location">{t("schedules.entryLocation")}</Label>
                <Select
                  value={formState.locationId}
                  onValueChange={(value) => setFormState((prev) => ({ ...prev, locationId: value }))}
                  disabled={!hasLocations}
                >
                  <SelectTrigger id="entry-location">
                    <SelectValue placeholder={t("schedules.selectLocationPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((locationOption) => (
                      <SelectItem key={locationOption.id} value={locationOption.id}>
                        {locationOption.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>{t("schedules.entryType")}</Label>
                <Badge variant={scheduleTypeBadgeVariant[formState.type]} className="w-fit">
                  {t(`schedules.${formState.type}`)}
                </Badge>
              </div>
              {formState.type === "lective" && (
                <div className="space-y-2">
                  <Label htmlFor="entry-group">{t("schedules.entryGroup")}</Label>
                  {editorState.category === "groups" ? (
                    <Input id="entry-group" value={editorState.entity} disabled />
                  ) : (
                    <Select
                      value={formState.group}
                      onValueChange={(value) =>
                        setFormState((prev) => ({ ...prev, group: value }))
                      }
                      required
                    >
                      <SelectTrigger id="entry-group">
                        <SelectValue placeholder={t("schedules.selectGroup")} />
                      </SelectTrigger>
                      <SelectContent>
                        {groupOptions.map((group) => (
                          <SelectItem key={group} value={group}>
                            {group}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              )}
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setEditorState(null)}>
                  {t("common.cancel")}
                </Button>
                <Button type="submit" disabled={!formState.subjectId || !formState.locationId}>
                  {t("common.save")}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}

function createId() {
  return `cell-${Math.random().toString(36).slice(2, 8)}-${Date.now().toString(36)}`
}

function mapLegacyToMatrix(config: ScheduleConfig, subjects: ScheduleSubject[]): ScheduleMatrix {
  const slotByTime = new Map<string, TimeSlot>()
  config.timeSlots.forEach((slot) => {
    slotByTime.set(`${slot.start}-${slot.end}`, slot)
  })

  const subjectById = new Map(subjects.map((subject) => [subject.id, subject]))
  const subjectByName = new Map(subjects.map((subject) => [subject.name.toLowerCase(), subject]))

  const matrix: ScheduleMatrix = {
    groups: {},
    teachers: {},
    rooms: {},
  }

  ;(Object.keys(legacySchedules) as ScheduleCategory[]).forEach((category) => {
    const entities = legacySchedules[category]
    matrix[category] = {}

    Object.entries(entities).forEach(([entity, slots]) => {
      const dayMap: Record<string, Record<string, ScheduleCell>> = {}

      slots.forEach((slot, index) => {
        const matchedSlot = slotByTime.get(`${slot.start}-${slot.end}`) ?? config.timeSlots[0]
        const subject =
          subjectById.get(slot.subjectId) ?? subjectByName.get(slot.subjectName.toLowerCase())
        if (!matchedSlot || !subject) {
          return
        }

        const cell: ScheduleCell = {
          id: slot.id,
          subjectId: subject.id,
          title: subject.name,
          type: subject.type,
          location: slot.location,
          group: subject.type === "lective" ? slot.group ?? (category === "groups" ? entity : "") : undefined,
        }

        if (!dayMap[slot.day]) {
          dayMap[slot.day] = {}
        }

        dayMap[slot.day][matchedSlot.id] = cell
      })

      matrix[category][entity] = dayMap
    })
  })

  return matrix
}

function syncScheduleWithConfig(prev: ScheduleMatrix, config: ScheduleConfig): ScheduleMatrix {
  const validSlotIds = new Set(config.timeSlots.map((slot) => slot.id))

  const nextMatrix: ScheduleMatrix = {
    groups: {},
    teachers: {},
    rooms: {},
  }

  ;(Object.keys(prev) as ScheduleCategory[]).forEach((category) => {
    nextMatrix[category] = {}

    Object.entries(prev[category]).forEach(([entity, dayMap]) => {
      const filteredDayMap: Record<string, Record<string, ScheduleCell>> = {}

      Object.entries(dayMap).forEach(([day, timeSlotMap]) => {
        const filteredTimeSlots: Record<string, ScheduleCell> = {}

        Object.entries(timeSlotMap).forEach(([timeSlotId, cell]) => {
          if (validSlotIds.has(timeSlotId)) {
            filteredTimeSlots[timeSlotId] = cell
          }
        })

        filteredDayMap[day] = filteredTimeSlots
      })

      nextMatrix[category][entity] = filteredDayMap
    })
  })

  return nextMatrix
}

function syncScheduleWithSubjects(prev: ScheduleMatrix, subjects: ScheduleSubject[]): ScheduleMatrix {
  const subjectById = new Map(subjects.map((subject) => [subject.id, subject]))
  const subjectByName = new Map(subjects.map((subject) => [subject.name.toLowerCase(), subject]))

  const nextMatrix: ScheduleMatrix = {
    groups: {},
    teachers: {},
    rooms: {},
  }

  ;(Object.keys(prev) as ScheduleCategory[]).forEach((category) => {
    nextMatrix[category] = {}

    Object.entries(prev[category]).forEach(([entity, dayMap]) => {
      const nextDayMap: Record<string, Record<string, ScheduleCell>> = {}

      Object.entries(dayMap).forEach(([day, timeSlotMap]) => {
        const nextSlots: Record<string, ScheduleCell> = {}

        Object.entries(timeSlotMap).forEach(([slotId, cell]) => {
          const subject =
            subjectById.get(cell.subjectId) ?? subjectByName.get(cell.title.toLowerCase())

          if (!subject) {
            return
          }

          nextSlots[slotId] = {
            ...cell,
            subjectId: subject.id,
            title: subject.name,
            type: subject.type,
            group:
              subject.type === "lective"
                ? cell.group ?? (category === "groups" ? entity : "")
                : undefined,
          }
        })

        nextDayMap[day] = nextSlots
      })

      nextMatrix[category][entity] = nextDayMap
    })
  })

  return nextMatrix
}
