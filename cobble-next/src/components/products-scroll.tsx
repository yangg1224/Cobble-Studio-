"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"

const products = [
  { name: "Birch Kuksa No.01",    price: "$128", img: "/products/product1.jpg" },
  { name: "Olivewood Heart Cup",  price: "$145", img: "/products/product2.jpg" },
  { name: "Spalt Maple Kuksa",    price: "$136", img: "/products/product3.jpg" },
  { name: "Curly Maple Cup",      price: "$119", img: "/products/product4.jpg" },
]

const ArrowIcon = ({ dir }: { dir: "left" | "right" }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {dir === "left"
      ? <polyline points="15 18 9 12 15 6"/>
      : <polyline points="9 18 15 12 9 6"/>
    }
  </svg>
)

export function ProductsScroll() {
  const trackRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX    = useRef(0)
  const scrollLeft = useRef(0)

  const CARD_WIDTH = 300 + 4

  const scroll = (dir: "prev" | "next") => {
    if (!trackRef.current) return
    trackRef.current.scrollBy({ left: dir === "next" ? CARD_WIDTH : -CARD_WIDTH, behavior: "smooth" })
  }

  const onMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return
    isDragging.current = true
    startX.current     = e.pageX - trackRef.current.offsetLeft
    scrollLeft.current = trackRef.current.scrollLeft
    trackRef.current.style.userSelect = "none"
    trackRef.current.style.cursor = "grabbing"
  }
  const stopDrag = () => {
    isDragging.current = false
    if (trackRef.current) {
      trackRef.current.style.userSelect = ""
      trackRef.current.style.cursor = "grab"
    }
  }
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return
    e.preventDefault()
    trackRef.current.scrollLeft = scrollLeft.current - (e.pageX - trackRef.current.offsetLeft - startX.current) * 1.2
  }

  return (
    <section className="overflow-hidden bg-white py-[72px]">
      <div className="grid items-center pl-10" style={{ gridTemplateColumns: "180px 1fr" }}>

        {/* Sidebar */}
        <div className="flex flex-shrink-0 flex-col items-start">
          <span className="mb-4 text-[14px] font-medium uppercase tracking-[3px] text-[#1E1E1E]">
            Products
          </span>
          <Link
            href="/collections"
            className="mb-12 flex items-center gap-2 text-[11px] uppercase tracking-[2px] text-[#1E1E1E] transition-[color,gap] duration-200 hover:text-[#3CACB0] hover:gap-3"
          >
            View All
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

        {/* Scrollable card strip */}
        <div
          ref={trackRef}
          className="overflow-x-auto overflow-y-visible"
          style={{ scrollbarWidth: "none", cursor: "grab" }}
          onMouseDown={onMouseDown}
          onMouseLeave={stopDrag}
          onMouseUp={stopDrag}
          onMouseMove={onMouseMove}
        >
          <style>{`.sp-track::-webkit-scrollbar{display:none}`}</style>
          <div className="flex w-max gap-1">
            {products.map((p) => (
              <div
                key={p.name}
                className="w-[300px] flex-shrink-0 cursor-pointer border-none bg-none p-0 text-left"
              >
                {/* Image */}
                <div className="relative w-full overflow-hidden bg-[#F9F9F9]" style={{ aspectRatio: "3/4" }}>
                  <Image
                    src={p.img}
                    alt={p.name}
                    fill
                    className="object-contain transition-transform duration-500"
                    sizes="300px"
                    style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
                  />
                </div>
                {/* Meta */}
                <div className="px-2 pb-2 pt-3.5">
                  <span className="block text-[11px] font-medium leading-[1.4] tracking-[1.4px] text-[#1E1E1E]">
                    {p.name}
                  </span>
                  <span className="mt-1 block text-[11px] tracking-[1px] text-[#A2A2A2]">
                    {p.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
