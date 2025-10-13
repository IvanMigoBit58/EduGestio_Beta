"use client"

import { useCallback, useEffect, useState } from "react"

export type TimeSlot = {
  id: string
  label: string
  start: string
  end: string
}

export type ScheduleConfig = {
  timeSlots: TimeSlot[]
  hasAfternoonShift: boolean
}

export const DEFAULT_TIME_SLOTS: TimeSlot[] = [
  { id: "slot-1", label: "1a franja", start: "08:00", end: "08:55" },
  { id: "slot-2", label: "2a franja", start: "09:00", end: "09:55" },
  { id: "slot-3", label: "3a franja", start: "10:05", end: "11:00" },
  { id: "slot-4", label: "4a franja", start: "11:30", end: "12:25" },
  { id: "slot-5", label: "5a franja", start: "12:30", end: "13:25" },
  { id: "slot-6", label: "6a franja", start: "13:30", end: "14:25" },
]

export const DEFAULT_SCHEDULE_CONFIG: ScheduleConfig = {
  timeSlots: DEFAULT_TIME_SLOTS,
  hasAfternoonShift: true,
}

const STORAGE_KEY = "edu-gestio-schedule-config"
const STORAGE_EVENT = "schedule-config-updated"

type UpdateArg = ScheduleConfig | ((prev: ScheduleConfig) => ScheduleConfig)

type CustomEventDetail = {
  config: ScheduleConfig
}

const isBrowser = typeof window !== "undefined"

function createId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}-${Date.now().toString(36)}`
}

export function generateTimeSlot(labelPrefix = "Franja", start = "08:00", end = "09:00"): TimeSlot {
  return {
    id: createId("slot"),
    label: `${labelPrefix} ${Math.floor(Math.random() * 90)}`,
    start,
    end,
  }
}

export function loadScheduleConfig(): ScheduleConfig {
  if (!isBrowser) {
    return DEFAULT_SCHEDULE_CONFIG
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return DEFAULT_SCHEDULE_CONFIG
    }
    const parsed = JSON.parse(raw) as ScheduleConfig

    if (!Array.isArray(parsed.timeSlots) || parsed.timeSlots.length === 0) {
      return DEFAULT_SCHEDULE_CONFIG
    }

    return {
      hasAfternoonShift: typeof parsed.hasAfternoonShift === "boolean" ? parsed.hasAfternoonShift : true,
      timeSlots: parsed.timeSlots.map((slot) => ({
        id: slot.id || createId("slot"),
        label: slot.label || "Franja",
        start: slot.start || "08:00",
        end: slot.end || "09:00",
      })),
    }
  } catch (error) {
    console.error("Failed to parse schedule config", error)
    return DEFAULT_SCHEDULE_CONFIG
  }
}

export function saveScheduleConfig(value: UpdateArg): ScheduleConfig {
  const nextConfig = typeof value === "function" ? value(loadScheduleConfig()) : value

  if (isBrowser) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextConfig))
    const event = new CustomEvent<CustomEventDetail>(STORAGE_EVENT, {
      detail: { config: nextConfig },
    })
    window.dispatchEvent(event)
  }

  return nextConfig
}

export function subscribeToScheduleConfig(callback: (config: ScheduleConfig) => void) {
  if (!isBrowser) return () => {}

  const handleCustomEvent = (event: Event) => {
    const detail = (event as CustomEvent<CustomEventDetail>).detail
    if (detail?.config) {
      callback(detail.config)
    }
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY && event.newValue) {
      try {
        callback(JSON.parse(event.newValue) as ScheduleConfig)
      } catch (error) {
        console.error("Failed to read schedule config from storage", error)
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

export function useScheduleConfig() {
  const [config, setConfig] = useState<ScheduleConfig>(DEFAULT_SCHEDULE_CONFIG)

  useEffect(() => {
    if (!isBrowser) {
      setConfig(DEFAULT_SCHEDULE_CONFIG)
      return
    }

    setConfig(loadScheduleConfig())

    const unsubscribe = subscribeToScheduleConfig((next) => {
      setConfig(next)
    })

    return unsubscribe
  }, [])

  const updateConfig = useCallback((value: UpdateArg) => {
    setConfig((prev) => {
      const next = typeof value === "function" ? value(prev) : value
      saveScheduleConfig(next)
      return next
    })
  }, [])

  return { config, updateConfig }
}
