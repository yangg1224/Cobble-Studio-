"use client"

import Image from "next/image"
import Link from "next/link"
import { HeroCarousel } from "@/components/hero-carousel"
import { ProductsScroll } from "@/components/products-scroll"
import { useLanguage } from "@/context/LanguageContext"

const journalPosts = [
  {
    href:     "/journal/the-craft-behind-the-cup",
    img:      "/journal/journal1.jpg",
    alt:      "Wooden cups displayed on a wall",
    categoryKey: "catCraft" as const,
    title:    "The Craft Behind the Cup",
  },
  {
    href:     "/journal/from-wood-to-hand",
    img:      "/journal/journal2.jpg",
    alt:      "Artisan shaping a kuksa in the workshop",
    categoryKey: "catProcess" as const,
    title:    "From Wood to Hand — Inside the Workshop",
  },
  {
    href:     "/journal/light-and-shadow",
    img:      "/journal/journal3.jpg",
    alt:      "Shadow of a kuksa cast on a pale surface",
    categoryKey: "catStory" as const,
    title:    "Light & Shadow — Objects at Rest",
  },
]

type JournalCatKey = "catCraft" | "catProcess" | "catStory"

export default function Home() {
  const { t } = useLanguage()
  const h = t.home
  const j = t.journal

  return (
    <>
      {/* ── HERO ── */}
      <HeroCarousel />

      {/* ── PRODUCTS ── */}
      <ProductsScroll />

      {/* ── JOURNAL ── */}
      <section className="bg-white px-10 pb-16 pt-[72px]">
        <div className="mb-7 flex items-baseline justify-between">
          <span className="text-[14px] font-medium uppercase tracking-[3px] text-[#1E1E1E]">
            {h.journalTitle}
          </span>
          <Link
            href="/journal"
            className="flex items-center gap-2 text-[11px] uppercase tracking-[2px] text-[#1E1E1E] transition-[color,gap] duration-200 hover:text-[#3CACB0] hover:gap-3"
          >
            {t.viewMore}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {journalPosts.map((post) => (
            <Link key={post.href} href={post.href} className="group block">
              <div className="relative w-full overflow-hidden bg-[#F9F9F9]" style={{ aspectRatio: "16/9" }}>
                <Image
                  src={post.img}
                  alt={post.alt}
                  fill
                  className="object-cover object-center transition-transform duration-[550ms] group-hover:scale-[1.04]"
                  style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="px-0.5 pt-3.5">
                <span className="mb-2 block text-[10px] font-medium uppercase tracking-[2px] text-[#A2A2A2]">
                  {j[post.categoryKey as JournalCatKey]}
                </span>
                <p className="text-[12px] leading-[1.55] tracking-[1px] text-[#1E1E1E] transition-colors duration-200 group-hover:text-[#3CACB0]">
                  {post.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── VIDEO / GIF ── */}
      <section
        className="relative mt-[72px] w-full overflow-hidden"
        style={{ height: "62vh", minHeight: 420 }}
      >
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/video/recording.gif"
            alt="Cobble — crafted with intention"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-[rgba(20,18,16,0.42)]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-9 px-10 text-center">
          <p
            className="max-w-[520px] text-[32px] font-normal italic leading-[1.55] tracking-[0.3px] text-white"
            style={{ fontFamily: "var(--font-crimson-text)" }}
          >
            {h.videoQuote}<br />{h.videoQuoteLine2}
          </p>
          <Link
            href="/about"
            className="inline-block border-b border-white/50 pb-2 text-[10px] font-medium uppercase tracking-[3px] text-white/85 transition-[color,border-color,letter-spacing] duration-200 hover:border-white/90 hover:text-white hover:tracking-[4px]"
          >
            {h.aboutUs}
          </Link>
        </div>
      </section>
    </>
  )
}
