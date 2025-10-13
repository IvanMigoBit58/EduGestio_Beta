"use client"

import { useEffect } from "react"

const OBSERVER_LOOP_MESSAGE = "ResizeObserver loop completed with undelivered notifications."
const OBSERVER_LIMIT_MESSAGE = "ResizeObserver loop limit exceeded"

export function ResizeObserverFix() {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.message === OBSERVER_LOOP_MESSAGE || event.message === OBSERVER_LIMIT_MESSAGE) {
        event.preventDefault()
        event.stopImmediatePropagation()
      }
    }

    window.addEventListener("error", handleError)
    return () => {
      window.removeEventListener("error", handleError)
    }
  }, [])

  return null
}
