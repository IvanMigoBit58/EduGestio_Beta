import { useCallback, useEffect, useMemo, useState } from "react"

export type ScheduleLocationType =
  | "classroom"
  | "laboratory"
  | "specialized"
  | "common"
  | "outdoor"
  | "office"

export type ScheduleLocation = {
  id: string
  name: string
  type: ScheduleLocationType
  building?: string
  floor?: string
  capacity?: number
  reservable?: boolean
}

const DEFAULT_LOCATIONS_DATA: ScheduleLocation[] = [
  {
    id: "location-aula-101",
    name: "Aula 101",
    type: "classroom",
    building: "Edifici Principal",
    floor: "Planta 1",
    capacity: 30,
    reservable: true,
  },
  {
    id: "location-aula-102",
    name: "Aula 102",
    type: "classroom",
    building: "Edifici Principal",
    floor: "Planta 1",
    capacity: 28,
    reservable: true,
  },
  {
    id: "location-aula-103",
    name: "Aula 103",
    type: "classroom",
    building: "Edifici Principal",
    floor: "Planta 1",
    capacity: 28,
    reservable: true,
  },
  {
    id: "location-aula-201",
    name: "Aula 201",
    type: "classroom",
    building: "Edifici Principal",
    floor: "Planta 2",
    capacity: 30,
    reservable: true,
  },
  {
    id: "location-aula-202",
    name: "Aula 202",
    type: "classroom",
    building: "Edifici Principal",
    floor: "Planta 2",
    capacity: 30,
    reservable: true,
  },
  {
    id: "location-aula-203",
    name: "Aula 203",
    type: "classroom",
    building: "Edifici Principal",
    floor: "Planta 2",
    capacity: 32,
    reservable: true,
  },
  {
    id: "location-aula-204",
    name: "Aula 204",
    type: "classroom",
    building: "Edifici Principal",
    floor: "Planta 2",
    capacity: 30,
    reservable: true,
  },
  {
    id: "location-laboratori-1",
    name: "Laboratori 1",
    type: "laboratory",
    building: "Edifici Principal",
    floor: "Planta 2",
    capacity: 24,
    reservable: true,
  },
  {
    id: "location-laboratori-2",
    name: "Laboratori 2",
    type: "laboratory",
    building: "Edifici Principal",
    floor: "Planta 2",
    capacity: 24,
    reservable: true,
  },
  {
    id: "location-aula-musica",
    name: "Aula de Música",
    type: "specialized",
    building: "Edifici Principal",
    floor: "Planta 2",
    capacity: 25,
    reservable: true,
  },
  {
    id: "location-taller-tecnologia",
    name: "Taller de Tecnologia",
    type: "specialized",
    building: "Edifici Annex",
    floor: "Planta 0",
    capacity: 20,
    reservable: true,
  },
  {
    id: "location-taller-general",
    name: "Taller",
    type: "specialized",
    building: "Edifici Annex",
    floor: "Planta 0",
    capacity: 22,
    reservable: true,
  },
  {
    id: "location-sala-actes",
    name: "Sala d'Actes",
    type: "common",
    building: "Edifici Principal",
    floor: "Planta 0",
    capacity: 150,
    reservable: true,
  },
  {
    id: "location-sala-professors",
    name: "Sala de professors",
    type: "office",
    building: "Edifici Principal",
    floor: "Planta 0",
    capacity: 20,
    reservable: false,
  },
  {
    id: "location-sala-reunions",
    name: "Sala de reunions",
    type: "office",
    building: "Edifici Principal",
    floor: "Planta 1",
    capacity: 12,
    reservable: false,
  },
  {
    id: "location-pista-esportiva",
    name: "Pista esportiva",
    type: "outdoor",
    building: "Poliesportiu",
    floor: "Exterior",
    capacity: 60,
    reservable: true,
  },
  {
    id: "location-pista-2",
    name: "Pista 2",
    type: "outdoor",
    building: "Poliesportiu",
    floor: "Exterior",
    capacity: 60,
    reservable: true,
  },
  {
    id: "location-pavello",
    name: "Pavelló",
    type: "outdoor",
    building: "Poliesportiu",
    floor: "Exterior",
    capacity: 80,
    reservable: true,
  },
  {
    id: "location-sala-multimedia",
    name: "Sala Multimèdia",
    type: "specialized",
    building: "Edifici Annex",
    floor: "Planta 1",
    capacity: 25,
    reservable: true,
  },
]

const STORAGE_KEY = "edu-gestio-schedule-locations"
const STORAGE_EVENT = "schedule-locations-updated"

const isBrowser = typeof window !== "undefined"

type UpdateArg = ScheduleLocation[] | ((prev: ScheduleLocation[]) => ScheduleLocation[])

type CustomEventDetail = {
  locations: ScheduleLocation[]
}

function createId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}-${Date.now().toString(36)}`
}

export const DEFAULT_LOCATIONS: ScheduleLocation[] = DEFAULT_LOCATIONS_DATA

export function loadScheduleLocations(): ScheduleLocation[] {
  if (!isBrowser) {
    return DEFAULT_LOCATIONS
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return DEFAULT_LOCATIONS
    }

    const parsed = JSON.parse(raw) as ScheduleLocation[]

    if (!Array.isArray(parsed) || parsed.length === 0) {
      return DEFAULT_LOCATIONS
    }

    return parsed.map((location) => ({
      id: location.id || createId("location"),
      name: location.name || "Espai",
      type: location.type ?? "classroom",
      building: location.building,
      floor: location.floor,
      capacity: typeof location.capacity === "number" ? location.capacity : undefined,
      reservable: typeof location.reservable === "boolean" ? location.reservable : true,
    }))
  } catch (error) {
    console.error("Failed to parse schedule locations", error)
    return DEFAULT_LOCATIONS
  }
}

export function saveScheduleLocations(value: UpdateArg): ScheduleLocation[] {
  const nextLocations = typeof value === "function" ? value(loadScheduleLocations()) : value

  if (isBrowser) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextLocations))
    const event = new CustomEvent<CustomEventDetail>(STORAGE_EVENT, {
      detail: { locations: nextLocations },
    })
    window.dispatchEvent(event)
  }

  return nextLocations
}

export function subscribeToScheduleLocations(callback: (locations: ScheduleLocation[]) => void) {
  if (!isBrowser) return () => {}

  const handleCustomEvent = (event: Event) => {
    const detail = (event as CustomEvent<CustomEventDetail>).detail
    if (detail?.locations) {
      callback(detail.locations)
    }
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY && event.newValue) {
      try {
        callback(JSON.parse(event.newValue) as ScheduleLocation[])
      } catch (error) {
        console.error("Failed to read schedule locations from storage", error)
      }
    }
  }

  window.addEventListener(STORAGE_EVENT, handleCustomEvent)
  window.addEventListener("storage", handleStorage)

  return () => {
    window.removeEventListener(STORAGE_EVENT, handleCustomEvent)
    window.removeEventListener("storage", handleStorage)
  }
}

export function useScheduleLocations() {
  const [locations, setLocations] = useState<ScheduleLocation[]>(DEFAULT_LOCATIONS)

  useEffect(() => {
    if (!isBrowser) {
      setLocations(DEFAULT_LOCATIONS)
      return
    }

    setLocations(loadScheduleLocations())
    const unsubscribe = subscribeToScheduleLocations((next) => setLocations(next))
    return unsubscribe
  }, [])

  const updateLocations = useCallback((value: UpdateArg) => {
    setLocations((prev) => {
      const next = typeof value === "function" ? value(prev) : value
      saveScheduleLocations(next)
      return next
    })
  }, [])

  const addLocation = useCallback(
    (location: Omit<ScheduleLocation, "id">) => {
      updateLocations((prev) => {
        const exists = prev.some(
          (item) => item.name.trim().toLowerCase() === location.name.trim().toLowerCase(),
        )

        if (exists) {
          return prev
        }

        const nextLocation: ScheduleLocation = { ...location, id: createId("location") }
        return [...prev, nextLocation]
      })
    },
    [updateLocations],
  )

  const editLocation = useCallback(
    (id: string, value: Omit<ScheduleLocation, "id">) => {
      updateLocations((prev) =>
        prev.map((location) =>
          location.id === id
            ? {
                ...location,
                name: value.name,
                type: value.type,
                building: value.building,
                floor: value.floor,
                capacity: value.capacity,
                reservable: value.reservable,
              }
            : location,
        ),
      )
    },
    [updateLocations],
  )

  const removeLocation = useCallback(
    (id: string) => {
      updateLocations((prev) => prev.filter((location) => location.id !== id))
    },
    [updateLocations],
  )

  const resetLocations = useCallback(() => {
    updateLocations(DEFAULT_LOCATIONS)
  }, [updateLocations])

  const indexedLocations = useMemo(() => new Map(locations.map((location) => [location.id, location])), [locations])
  const locationsByName = useMemo(
    () =>
      new Map(
        locations.map((location) => [location.name.trim().toLowerCase(), location]),
      ),
    [locations],
  )

  return {
    locations,
    locationsById: indexedLocations,
    locationsByName,
    addLocation,
    editLocation,
    removeLocation,
    resetLocations,
  }
}
