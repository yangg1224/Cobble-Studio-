"use client"

import { createContext, useContext, useEffect, useState, useTransition } from "react"
import { getSavedSlugs, toggleSaved } from "@/lib/saved-actions"

interface SavedContextValue {
  savedSlugs: string[]
  isSaved: (slug: string) => boolean
  toggle: (slug: string) => void
  isPending: boolean
}

const SavedContext = createContext<SavedContextValue>({
  savedSlugs: [],
  isSaved: () => false,
  toggle: () => {},
  isPending: false,
})

export function SavedProvider({ children }: { children: React.ReactNode }) {
  const [savedSlugs, setSavedSlugs] = useState<string[]>([])
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    getSavedSlugs().then(setSavedSlugs)
  }, [])

  function toggle(slug: string) {
    // Optimistic update
    setSavedSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    )
    startTransition(async () => {
      const { saved } = await toggleSaved(slug)
      // Reconcile if server disagrees
      setSavedSlugs((prev) =>
        saved ? (prev.includes(slug) ? prev : [...prev, slug]) : prev.filter((s) => s !== slug)
      )
    })
  }

  return (
    <SavedContext.Provider value={{ savedSlugs, isSaved: (s) => savedSlugs.includes(s), toggle, isPending }}>
      {children}
    </SavedContext.Provider>
  )
}

export function useSaved() {
  return useContext(SavedContext)
}
