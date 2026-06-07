"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"

const slides = [
  { src: "/hero/head1.jpg", alt: "Hero image 1" },
  { src: "/hero/head2.png", alt: "Hero image 2" },
  { src: "/hero/head3.jpg", alt: "Hero image 3" },
  { src: "/hero/head4.jpg", alt: "Hero image 4" },
]

export function HeroCarousel() {
  const [current, setCurrent] = useState(0)

  const goTo = useCallback((n: number) => {
    setCurrent((n + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => goTo(current + 1), 4000)
    return () => clearInterval(timer)
  }, [current, goTo])

  return (
    <section
      aria-label="Featured collections"
      className="relative w-full overflow-hidden"
      style={{ height: "calc(100vh - 122px)", minHeight: 520 }}
    >
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className="absolute inset-0 transition-opacity duration-[800ms] ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
          aria-hidden={i !== current}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            className="object-cover"
            style={{ objectPosition: "center 40%" }}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Bottom gradient */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: "linear-gradient(to bottom, transparent 60%, rgba(30,30,30,0.1) 100%)" }}
      />

      {/* Right panel */}
      <div className="absolute bottom-0 right-0 top-0 z-10 flex w-[68px] flex-col items-center justify-center gap-8 bg-white">
        <span
          className="select-none text-[13px] font-medium uppercase tracking-[3px] text-[#1E1E1E]"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          New Arrivals
        </span>

        <div className="flex flex-col items-center gap-2.5" role="tablist" aria-label="Slide indicators">
          {slides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Slide ${i + 1}`}
              onClick={() => goTo(i)}
              className="block h-1.5 w-1.5 rounded-full border-[1.5px] border-[#1E1E1E] p-0 transition-[background,transform] duration-[250ms] hover:scale-[1.4] focus-visible:outline-2 focus-visible:outline-[#3CACB0] focus-visible:outline-offset-[3px]"
              style={{ background: i === current ? "#1E1E1E" : "transparent" }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
