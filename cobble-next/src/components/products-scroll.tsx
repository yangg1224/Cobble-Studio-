"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"
import { products as allProducts } from "@/lib/products"

const products = allProducts
  .filter((p) => p.collection === "Mug")
  .map((p) => ({ slug: p.slug, name: p.name, price: p.price, img: p.img }))

const ArrowIcon = ({ dir }: { dir: "left" | "right" }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {dir === "left"
      ? <polyline points="15 18 9 12 15 6"/>
      : <polyline points="9 18 15 12 9 6"/>
    }
  </svg>
)

export function ProductsScroll({ className = "" }: { className?: string }) {
  const { t } = useLanguage()
  const desktopTrackRef = useRef<HTMLDivElement>(null)
  const mobileTrackRef  = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const dragMoved  = useRef(false)
  const startX     = useRef(0)
  const scrollLeft = useRef(0)

  const CARD_WIDTH = 300 + 4

  const scroll = (dir: "prev" | "next") => {
    const track = desktopTrackRef.current?.offsetParent ? desktopTrackRef.current : mobileTrackRef.current
    if (!track) return
    track.scrollBy({ left: dir === "next" ? CARD_WIDTH : -CARD_WIDTH, behavior: "smooth" })
  }

  const onMouseDown = (e: React.MouseEvent) => {
    const track = desktopTrackRef.current
    if (!track) return
    isDragging.current = true
    dragMoved.current  = false
    startX.current     = e.pageX - track.offsetLeft
    scrollLeft.current = track.scrollLeft
    track.style.userSelect = "none"
    track.style.cursor = "grabbing"
  }
  const stopDrag = () => {
    isDragging.current = false
    const track = desktopTrackRef.current
    if (track) {
      track.style.userSelect = ""
      track.style.cursor = "grab"
    }
  }
  const onMouseMove = (e: React.MouseEvent) => {
    const track = desktopTrackRef.current
    if (!isDragging.current || !track) return
    e.preventDefault()
    const delta = e.pageX - track.offsetLeft - startX.current
    if (Math.abs(delta) > 5) dragMoved.current = true
    track.scrollLeft = scrollLeft.current - delta * 1.2
  }
  const onCardClick = (e: React.MouseEvent) => {
    if (dragMoved.current) {
      e.preventDefault()
      dragMoved.current = false
    }
  }

  return (
    <section className={`overflow-hidden bg-white flex flex-col justify-center ${className}`}>
      {/* Mobile header row */}
      <div className="mb-5 flex items-center justify-between px-4 md:hidden">
        <div>
          <span className="block text-[14px] font-medium uppercase tracking-[3px] text-[#1E1E1E]">
            {t.productsSection.title}
          </span>
          <Link
            href="/collections"
            className="mt-1 flex items-center gap-2 text-[11px] uppercase tracking-[2px] text-[#1E1E1E] transition-[color,gap] duration-200 hover:text-[#3CACB0] hover:gap-3"
          >
            {t.productsSection.viewAll}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>
        <div className="flex gap-2">
          {(["prev", "next"] as const).map((dir) => (
            <button
              key={dir}
              aria-label={dir === "prev" ? "Previous products" : "Next products"}
              onClick={() => scroll(dir)}
              className="flex h-9 w-9 items-center justify-center border-[1.5px] border-[#1E1E1E] bg-transparent text-[#1E1E1E] transition-[background,color,transform] duration-200 hover:bg-[#1E1E1E] hover:text-white active:scale-[0.92] focus-visible:outline-2 focus-visible:outline-[#3CACB0] focus-visible:outline-offset-[3px]"
            >
              <ArrowIcon dir={dir === "prev" ? "left" : "right"} />
            </button>
          ))}
        </div>
      </div>

      {/* Desktop layout — sidebar + card strip side by side */}
      <div className="hidden items-center pl-10 md:grid" style={{ gridTemplateColumns: "180px 1fr" }}>
        <div className="flex flex-shrink-0 flex-col items-start">
          <span className="mb-4 text-[14px] font-medium uppercase tracking-[3px] text-[#1E1E1E]">
            {t.productsSection.title}
          </span>
          <Link
            href="/collections"
            className="mb-12 flex items-center gap-2 text-[11px] uppercase tracking-[2px] text-[#1E1E1E] transition-[color,gap] duration-200 hover:text-[#3CACB0] hover:gap-3"
          >
            {t.productsSection.viewAll}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
          <div className="flex gap-2">
            {(["prev", "next"] as const).map((dir) => (
              <button
                key={dir}
                aria-label={dir === "prev" ? "Previous products" : "Next products"}
                onClick={() => scroll(dir)}
                className="flex h-9 w-9 items-center justify-center border-[1.5px] border-[#1E1E1E] bg-transparent text-[#1E1E1E] transition-[background,color,transform] duration-200 hover:bg-[#1E1E1E] hover:text-white active:scale-[0.92] focus-visible:outline-2 focus-visible:outline-[#3CACB0] focus-visible:outline-offset-[3px]"
              >
                <ArrowIcon dir={dir === "prev" ? "left" : "right"} />
              </button>
            ))}
          </div>
        </div>

        <div
          ref={desktopTrackRef}
          className="overflow-x-auto overflow-y-visible"
          style={{ scrollbarWidth: "none", cursor: "grab" }}
          onMouseDown={onMouseDown}
          onMouseLeave={stopDrag}
          onMouseUp={stopDrag}
          onMouseMove={onMouseMove}
        >
          <style>{`.sp-track::-webkit-scrollbar{display:none}`}</style>
          <div className="flex w-max gap-1">
            {products.map((p, i) => (
              <Link key={p.slug} href={`/products/${p.slug}`} draggable={false} onClick={onCardClick} className="group w-[300px] flex-shrink-0 border-none bg-none p-0 text-left">
                <div className="relative w-full overflow-hidden bg-[#F9F9F9]" style={{ aspectRatio: "1/1" }}>
                  <Image src={p.img} alt={p.name} fill priority={i === 0} className="object-contain transition-transform duration-[550ms] group-hover:scale-[1.05]" sizes="300px" style={{ transitionTimingFunction: "cubic-bezier(0.25,0.46,0.45,0.94)" }} />
                </div>
                <div className="px-2 pb-2 pt-3.5">
                  <span className="block text-[11px] font-medium leading-[1.4] tracking-[1.4px] text-[#1E1E1E] transition-colors duration-200 group-hover:text-[#3CACB0]">{p.name}</span>
                  <span className="mt-1 block text-[11px] tracking-[1px] text-[#A2A2A2]">{p.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile card strip */}
      <div
        ref={mobileTrackRef}
        className="overflow-x-auto overflow-y-visible px-4 md:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        <style>{`.sp-track::-webkit-scrollbar{display:none}`}</style>
        <div className="flex w-max gap-3">
          {products.map((p, i) => (
            <Link key={p.slug} href={`/products/${p.slug}`} className="group w-[72vw] max-w-[260px] flex-shrink-0">
              <div className="relative w-full overflow-hidden bg-[#F9F9F9]" style={{ aspectRatio: "1/1" }}>
                <Image src={p.img} alt={p.name} fill priority={i === 0} className="object-contain" sizes="72vw" />
              </div>
              <div className="px-0.5 pb-2 pt-3">
                <span className="block text-[11px] font-medium leading-[1.4] tracking-[1.4px] text-[#1E1E1E] transition-colors duration-200 group-hover:text-[#3CACB0]">{p.name}</span>
                <span className="mt-1 block text-[11px] tracking-[1px] text-[#A2A2A2]">{p.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
