"use client"

import { useSaved } from "@/context/SavedContext"

export function SaveButton({ slug, className }: { slug: string; className?: string }) {
  const { isSaved, toggle } = useSaved()
  const saved = isSaved(slug)

  return (
    <button
      aria-label={saved ? "Remove from saved" : "Save piece"}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(slug) }}
      className={className}
      style={{
        width: 32, height: 32,
        background: saved ? "var(--ink)" : "rgba(255,255,255,0.92)",
        border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: saved ? "var(--paper)" : "var(--ink)",
        transition: "background var(--dur-fast), color var(--dur-fast), opacity var(--dur-fast)",
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>
      </svg>
    </button>
  )
}
