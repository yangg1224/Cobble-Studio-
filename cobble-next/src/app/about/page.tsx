"use client"

import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"

const productHrefs = ["/collections/mug", "/collections/scoop", "/collections/plate"]
const productImgs  = ["/collections/mug.png", "/collections/scoop.jpg", "/collections/plate.jpg"]
const journalHrefs = ["/journal", "/journal", "/journal", "/journal"]
const journalImgs  = [
  "/journal/brand-story/hero2.jpg",
  "/journal/journal1.jpg",
  "/journal/journal2.jpg",
  "/journal/journal3.jpg",
]

export default function AboutPage() {
  const { t } = useLanguage()
  const a = t.about

  return (
    <div className="bg-[#F9F9F9]">

      {/* ── 1. Hero Banner ── */}
      <section className="relative h-[50vh] w-full overflow-hidden md:h-[723px]">
        <Image src="/hero/head1.jpg" alt="Cobble studio" fill priority className="object-cover object-center" sizes="100vw" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p
            className="text-center text-black"
            style={{
              fontFamily: "var(--font-crimson-text)",
              fontStyle: "italic",
              fontSize: 36,
              letterSpacing: "1.8px",
              lineHeight: "58.2px",
              textShadow: "0 2px 16px rgba(0,0,0,0.35), 0 1px 4px rgba(0,0,0,0.2)",
            }}
          >
            {a.heroQuote}
          </p>
        </div>
      </section>

      {/* ── 2. Our Story ── */}
      <section className="px-6 pt-12 pb-8 md:px-[200px] md:pt-[80px] md:pb-[40px]" style={{ background: "#F9F9F9" }}>
        <div className="flex flex-col gap-6 md:flex-row md:gap-[80px] items-start">
          <h2
            className="flex-shrink-0 text-[#1E1E1E] font-normal"
            style={{ fontFamily: "var(--font-crimson-text)", fontSize: 36, letterSpacing: "1.8px", lineHeight: "58.2px", minWidth: 180 }}
          >
            {a.ourStory}
          </h2>
          <div className="max-w-[553px] flex flex-col gap-[20px]">
            {a.storyBody.map((para, i) => (
              <p
                key={i}
                className="text-[#1E1E1E] m-0"
                style={{ fontFamily: "var(--font-crimson-text)", fontSize: 16, letterSpacing: "0.8px", lineHeight: "25.9px" }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Brand Story Collage ── */}
      <section className="relative overflow-hidden bg-[#F9F9F9]" style={{ minHeight: 900 }}>
        <div className="relative mx-auto max-w-[1440px] px-4 pt-8 pb-10 md:px-[80px] md:pt-[60px] md:pb-[80px]">
          <div className="grid grid-cols-2 gap-[24px]">
            <div className="relative overflow-hidden" style={{ aspectRatio: "4/5", marginTop: 0 }}>
              <Image src="/journal/brand-story/workshop.jpg" alt="Cobble studio workshop" fill className="object-cover object-center" sizes="(max-width: 1440px) 40vw" />
            </div>
            <div className="relative overflow-hidden" style={{ aspectRatio: "4/5", marginTop: 80 }}>
              <Image src="/journal/brand-story/tools.jpg" alt="Woodworking tools" fill className="object-cover object-center" sizes="(max-width: 1440px) 40vw" />
            </div>
          </div>

          <div className="relative mt-[60px] px-[40px] py-[32px] max-w-[680px] mx-auto text-center">
            <p className="text-[#1E1E1E] mb-[16px]" style={{ fontFamily: "var(--font-crimson-text)", fontSize: 16, letterSpacing: "16px", lineHeight: "25.9px", fontWeight: 600 }}>
              COBBLE
            </p>
            <p className="text-[#1E1E1E] mb-[16px]" style={{ fontFamily: "var(--font-crimson-text)", fontStyle: "italic", fontSize: 16, letterSpacing: "0.8px", lineHeight: "25.9px" }}>
              {a.cobbleNameDesc}
            </p>
            <p className="text-[#1E1E1E]" style={{ fontFamily: "var(--font-crimson-text)", fontStyle: "italic", fontSize: 16, letterSpacing: "0.8px", lineHeight: "25.9px" }}>
              {a.cobbleWorkDesc}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-[24px] mt-[40px]">
            <div className="relative overflow-hidden" style={{ aspectRatio: "4/3", marginLeft: 40 }}>
              <Image src="/journal/brand-story/carve-close.jpg" alt="Hand carving detail" fill className="object-cover object-center" sizes="(max-width: 1440px) 40vw" />
            </div>
            <div className="relative overflow-hidden" style={{ aspectRatio: "4/3", marginRight: 40, marginTop: -40 }}>
              <Image src="/journal/brand-story/hero1.jpg" alt="Studio product" fill className="object-cover object-center" sizes="(max-width: 1440px) 40vw" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Our Products Banner ── */}
      <section className="relative h-[340px] w-full overflow-hidden md:h-[632px]">
        <Image src="/hero/head2.png" alt="Our products" fill className="object-cover object-center" style={{ mixBlendMode: "darken" }} sizes="100vw" />
        <div className="absolute inset-0 flex items-center px-6 md:px-0" style={{ paddingLeft: "min(304.5px, 8vw + 24px)" }}>
          <h2 className="text-black font-normal" style={{ fontFamily: "var(--font-crimson-text)", fontSize: 36, letterSpacing: "1.8px", lineHeight: "58.2px" }}>
            {a.ourProducts}
          </h2>
        </div>
      </section>

      {/* ── 5. Product Essence ── */}
      <section className="bg-[#F9F9F9] px-6 pt-12 pb-12 md:px-[80px] md:pt-[80px] md:pb-[80px]" style={{ overflow: "hidden" }}>
        <h2 className="text-[#1E1E1E] font-normal mb-[60px]" style={{ fontFamily: "var(--font-crimson-text)", fontSize: 24, letterSpacing: "1.2px", lineHeight: "38.8px" }}>
          {a.productEssence}
        </h2>

        <div className="flex flex-col gap-[80px]">
          {a.essenceSections.map((section, i) => {
            const isEven = i % 2 === 0
            const imgs = ["/hero/head3.jpg", "/journal/brand-story/workshop.jpg", "/journal/brand-story/carve-close.jpg", "/products/product2.jpg", "/products/mug-1.jpg"]
            const alts = ["Natural wood grain", "Craftwork in studio", "Hand carving wood", "Aged wooden object", "Wooden mug ritual"]
            return (
              <div key={section.title} className={`flex flex-col gap-8 md:flex-row md:gap-[60px] items-center ${!isEven ? "md:flex-row-reverse" : ""}`}>
                <div className="flex-1 max-w-[460px]">
                  <h3 className="text-[#1E1E1E] font-normal mb-[16px]" style={{ fontFamily: "var(--font-crimson-text)", fontSize: 20, letterSpacing: "1px", lineHeight: "32.4px" }}>
                    {section.title}
                  </h3>
                  <p className="text-[#1E1E1E]" style={{ fontFamily: "var(--font-crimson-text)", fontSize: 16, letterSpacing: "0.8px", lineHeight: "25.9px" }}>
                    {section.body}
                  </p>
                </div>
                <div className="flex-1 relative overflow-hidden" style={{ aspectRatio: "3/2", maxWidth: 700 }}>
                  <Image src={imgs[i]} alt={alts[i]} fill className="object-cover object-center" sizes="(max-width: 1440px) 50vw" />
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── 6. Product Story Banner ── */}
      <section className="relative h-[340px] w-full overflow-hidden md:h-[522px]">
        <Image src="/hero/head4.jpg" alt="Product story" fill className="object-cover object-center" style={{ mixBlendMode: "darken" }} sizes="100vw" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-y-0 flex flex-col justify-center px-6 md:px-0" style={{ left: "clamp(24px, 21vw, 304.5px)" }}>
          <h2 className="font-normal text-[#F9F9F9] mb-[12px]" style={{ fontFamily: "var(--font-crimson-text)", fontSize: 36, letterSpacing: "1.8px", lineHeight: "58.2px" }}>
            {a.productStory}
          </h2>
          <p className="text-[#F9F9F9] mb-[24px] max-w-[320px]" style={{ fontFamily: "var(--font-instrument-sans)", fontSize: 14, letterSpacing: "0.7px", lineHeight: "22.65px" }}>
            {a.productStoryDesc}
          </p>
          <Link
            href="/journal"
            className="flex items-center gap-[8px] text-[#F9F9F9] transition-opacity duration-200 hover:opacity-70"
            style={{ fontFamily: "var(--font-instrument-sans)", fontSize: 14, letterSpacing: "0.7px", lineHeight: "22.65px" }}
          >
            {t.viewMore}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>
      </section>

      {/* ── 7. Product Cards ── */}
      <section className="relative bg-[#F9F9F9] px-6 py-12 md:px-[80px] md:py-[80px]">
        {/* Mobile */}
        <div className="flex flex-col gap-10 md:hidden">
          {a.productCards.map((card, i) => (
            <div key={card.label}>
              <Link href={productHrefs[i]} className="group block">
                <div className="relative w-full overflow-hidden bg-[#F0EEEB]" style={{ aspectRatio: "635 / 348.26" }}>
                  <Image src={productImgs[i]} alt={card.label} fill className="object-cover object-center transition-transform duration-[550ms] group-hover:scale-[1.03]" style={{ transitionTimingFunction: "cubic-bezier(0.25,0.46,0.45,0.94)" }} sizes="90vw" />
                </div>
                <div className="pt-[16px]">
                  <p className="text-[#1E1E1E] mb-[4px]" style={{ fontFamily: "var(--font-instrument-sans)", fontSize: 16, letterSpacing: "0.8px", lineHeight: "25.9px" }}>{card.label}</p>
                  <p className="text-[#A2A2A2] mb-[12px]" style={{ fontFamily: "var(--font-instrument-sans)", fontSize: 14, letterSpacing: "0.7px", lineHeight: "22.65px" }}>{card.desc}</p>
                  <span className="text-[#1E1E1E] flex items-center gap-[6px] transition-colors duration-200 group-hover:text-[#3CACB0]" style={{ fontFamily: "var(--font-instrument-sans)", fontSize: 14, letterSpacing: "0.7px", lineHeight: "22.65px" }}>
                    {t.viewMore}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Desktop */}
        <div className="hidden md:block relative" style={{ minHeight: 1200 }}>
          {a.productCards.map((card, i) => (
            <div
              key={card.label}
              className="absolute"
              style={{
                top: i === 0 ? 75 : i === 1 ? 346 : 629,
                left:  i !== 1 ? 0    : undefined,
                right: i === 1 ? 0    : undefined,
                width: "calc(50% - 20px)",
              }}
            >
              <Link href={productHrefs[i]} className="group block">
                <div className="relative w-full overflow-hidden bg-[#F0EEEB]" style={{ aspectRatio: "635 / 348.26" }}>
                  <Image src={productImgs[i]} alt={card.label} fill className="object-cover object-center transition-transform duration-[550ms] group-hover:scale-[1.03]" style={{ transitionTimingFunction: "cubic-bezier(0.25,0.46,0.45,0.94)" }} sizes="45vw" />
                </div>
                <div className="pt-[16px]">
                  <p className="text-[#1E1E1E] mb-[4px]" style={{ fontFamily: "var(--font-instrument-sans)", fontSize: 16, letterSpacing: "0.8px", lineHeight: "25.9px" }}>{card.label}</p>
                  <p className="text-[#A2A2A2] mb-[12px]" style={{ fontFamily: "var(--font-instrument-sans)", fontSize: 14, letterSpacing: "0.7px", lineHeight: "22.65px" }}>{card.desc}</p>
                  <span className="text-[#1E1E1E] flex items-center gap-[6px] transition-colors duration-200 group-hover:text-[#3CACB0]" style={{ fontFamily: "var(--font-instrument-sans)", fontSize: 14, letterSpacing: "0.7px", lineHeight: "22.65px" }}>
                    {t.viewMore}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. Journal Navigation Strip ── */}
      <section className="grid grid-cols-2 md:flex w-full overflow-hidden">
        {a.journalCategories.map((label, i) => (
          <Link key={label} href={journalHrefs[i]} className="group relative overflow-hidden md:flex-1" style={{ height: 180 }}>
            <Image src={journalImgs[i]} alt={label} fill className="object-cover object-center transition-transform duration-[550ms] group-hover:scale-[1.04]" style={{ transitionTimingFunction: "cubic-bezier(0.25,0.46,0.45,0.94)" }} sizes="25vw" />
            <div className="absolute inset-0 bg-black/35 transition-opacity duration-300 group-hover:bg-black/45" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[#F9F9F9]" style={{ fontFamily: "var(--font-instrument-sans)", fontWeight: 600, fontSize: 14, letterSpacing: "0.7px", lineHeight: "22.65px" }}>
                {label}
              </span>
            </div>
          </Link>
        ))}
      </section>

      {/* ── 9. Full-width Photo ── */}
      <section className="relative h-[460px] w-full overflow-hidden">
        <Image src="/journal/brand-story/hero1.jpg" alt="Cobble objects" fill className="object-cover object-bottom" sizes="100vw" />
      </section>

    </div>
  )
}
