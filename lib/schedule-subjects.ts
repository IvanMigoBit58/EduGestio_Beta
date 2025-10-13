import { useCallback, useEffect, useMemo, useState } from "react"

export type ScheduleSubjectType = "lective" | "non_lective"

export type ScheduleSubject = {
  id: string
  name: string
  type: ScheduleSubjectType
  defaultLocation?: string
}

const DEFAULT_SUBJECTS_DATA: ScheduleSubject[] = [
  { id: "subject-mathematics", name: "Matemàtiques", type: "lective", defaultLocation: "Aula 101" },
  { id: "subject-catalan", name: "Llengua Catalana", type: "lective", defaultLocation: "Aula 102" },
  { id: "subject-spanish", name: "Llengua Castellana", type: "lective", defaultLocation: "Aula 103" },
  { id: "subject-english", name: "Anglès", type: "lective", defaultLocation: "Aula 201" },
  { id: "subject-science", name: "Ciències Naturals", type: "lective", defaultLocation: "Laboratori 1" },
  { id: "subject-social-science", name: "Ciències Socials", type: "lective", defaultLocation: "Aula 202" },
  { id: "subject-pe", name: "Educació Física", type: "lective", defaultLocation: "Pista esportiva" },
  { id: "subject-music", name: "Música", type: "lective", defaultLocation: "Aula de Música" },
  { id: "subject-technology", name: "Tecnologia", type: "lective", defaultLocation: "Taller de Tecnologia" },
  { id: "subject-cycle-meeting", name: "Reunió de Cicle", type: "non_lective", defaultLocation: "Sala de professors" },
  { id: "subject-pedagogic-coordination", name: "Coordinació Pedagògica", type: "non_lective", defaultLocation: "Sala de reunions" },
]

const STORAGE_KEY = "edu-gestio-schedule-subjects"
const STORAGE_EVENT = "schedule-subjects-updated"

const isBrowser = typeof window !== "undefined"

type UpdateArg = ScheduleSubject[] | ((prev: ScheduleSubject[]) => ScheduleSubject[])

type CustomEventDetail = {
  subjects: ScheduleSubject[]
}

function createId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}-${Date.now().toString(36)}`
}

export const DEFAULT_SUBJECTS: ScheduleSubject[] = DEFAULT_SUBJECTS_DATA

export function loadScheduleSubjects(): ScheduleSubject[] {
  if (!isBrowser) {
    return DEFAULT_SUBJECTS
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return DEFAULT_SUBJECTS
    }

    const parsed = JSON.parse(raw) as ScheduleSubject[]

    if (!Array.isArray(parsed) || parsed.length === 0) {
      return DEFAULT_SUBJECTS
    }

    return parsed.map((subject) => ({
      id: subject.id || createId("subject"),
      name: subject.name || "Assignatura",
      type: subject.type === "non_lective" ? "non_lective" : "lective",
      defaultLocation: subject.defaultLocation || "",
    }))
  } catch (error) {
    console.error("Failed to parse schedule subjects", error)
    return DEFAULT_SUBJECTS
  }
}

export function saveScheduleSubjects(value: UpdateArg): ScheduleSubject[] {
  const nextSubjects = typeof value === "function" ? value(loadScheduleSubjects()) : value

  if (isBrowser) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSubjects))
    const event = new CustomEvent<CustomEventDetail>(STORAGE_EVENT, {
      detail: { subjects: nextSubjects },
    })
    window.dispatchEvent(event)
  }

  return nextSubjects
}

export function subscribeToScheduleSubjects(callback: (subjects: ScheduleSubject[]) => void) {
  if (!isBrowser) return () => {}

  const handleCustomEvent = (event: Event) => {
    const detail = (event as CustomEvent<CustomEventDetail>).detail
    if (detail?.subjects) {
      callback(detail.subjects)
    }
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY && event.newValue) {
      try {
        callback(JSON.parse(event.newValue) as ScheduleSubject[])
      } catch (error) {
        console.error("Failed to read schedule subjects from storage", error)
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

export function useScheduleSubjects() {
  const [subjects, setSubjects] = useState<ScheduleSubject[]>(DEFAULT_SUBJECTS)

  useEffect(() => {
    if (!isBrowser) {
      setSubjects(DEFAULT_SUBJECTS)
      return
    }

    setSubjects(loadScheduleSubjects())
    const unsubscribe = subscribeToScheduleSubjects((next) => setSubjects(next))
    return unsubscribe
  }, [])

  const updateSubjects = useCallback((value: UpdateArg) => {
    setSubjects((prev) => {
      const next = typeof value === "function" ? value(prev) : value
      saveScheduleSubjects(next)
      return next
    })
  }, [])

  const addSubject = useCallback(
    (subject: Omit<ScheduleSubject, "id">) => {
      updateSubjects((prev) => {
        const subjectExists = prev.some(
          (item) => item.name.trim().toLowerCase() === subject.name.trim().toLowerCase(),
        )

        if (subjectExists) {
          return prev
        }

        const nextSubject: ScheduleSubject = { ...subject, id: createId("subject") }
        return [...prev, nextSubject]
      })
    },
    [updateSubjects],
  )

  const editSubject = useCallback(
    (id: string, value: Omit<ScheduleSubject, "id">) => {
      updateSubjects((prev) =>
        prev.map((subject) =>
          subject.id === id
            ? { ...subject, name: value.name, type: value.type, defaultLocation: value.defaultLocation }
            : subject,
        ),
      )
    },
    [updateSubjects],
  )

  const removeSubject = useCallback(
    (id: string) => {
      updateSubjects((prev) => prev.filter((subject) => subject.id !== id))
    },
    [updateSubjects],
  )

  const resetSubjects = useCallback(() => {
    updateSubjects(DEFAULT_SUBJECTS)
  }, [updateSubjects])

  const indexedSubjects = useMemo(() => {
    return new Map(subjects.map((subject) => [subject.id, subject]))
  }, [subjects])

  return {
    subjects,
    subjectsById: indexedSubjects,
    addSubject,
    editSubject,
    removeSubject,
    resetSubjects,
  }
}
