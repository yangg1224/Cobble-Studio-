"use client"

import Image from "next/image"
import { useLanguage } from "@/context/LanguageContext"

export default function ContactPage() {
  const { t } = useLanguage()
  const c = t.contact

  const contactSections = [
    { labelKey: "instagram",       value: "@cobble0",              href: "https://www.instagram.com/cobble0/", label: c.instagram },
    { labelKey: "customerService", value: "wayne761216@gmail.com", href: "mailto:wayne761216@gmail.com",      label: c.customerService },
    { labelKey: "collaboration",   value: "wayne761216@gmail.com", href: "mailto:wayne761216@gmail.com",      label: c.collaboration, description: c.collaborationDesc },
  ]

  return (
    <div className="bg-[#F9F9F9] min-h-screen">

      {/* ── Hero heading ── */}
      <section className="flex flex-col items-center pt-32 md:pt-44 pb-8 px-6">
        <h1
          className="font-serif text-[28px] md:text-[36px] tracking-[1.8px] text-[#1E1E1E] text-center leading-none"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {c.title}
        </h1>
      </section>

      {/* ── Intro + Contact Form CTA ── */}
      <div className="text-center px-6 max-w-[640px] mx-auto">
        <p className="text-[16px] tracking-[0.8px] text-[#1E1E1E] leading-[1.62]" style={{ fontFamily: "var(--font-serif)" }}>
          {c.intro1}
        </p>
        <p className="mt-3 text-[16px] tracking-[0.8px] text-[#1E1E1E] leading-[1.62]" style={{ fontFamily: "var(--font-serif)" }}>
          {c.intro2}
        </p>
      </div>
      <div className="flex justify-center mt-7">
        <a
          href="#form"
          className="bg-[#A2A2A2] text-[#F9F9F9] text-[13px] font-semibold uppercase tracking-[0.7px] px-5 py-[5px] rounded-[30px] transition-colors duration-200 hover:bg-[#1E1E1E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E1E1E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9F9F9]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {c.contactFormBtn}
        </a>
      </div>

      {/* ── Contact methods — 3-column grid with dividers ── */}
      <section className="px-6 md:px-20 pt-16 pb-4">
        <div
          className="max-w-[980px] mx-auto grid grid-cols-1 md:grid-cols-3 border-t border-b border-[#E8E8E8] divide-y md:divide-y-0 md:divide-x divide-[#E8E8E8]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {contactSections.map((section) => (
            <div key={section.labelKey} className="flex flex-col items-center text-center px-6 py-8 md:py-10">
              <p className="text-[13px] font-semibold uppercase tracking-[0.7px] text-[#1E1E1E] mb-2">
                {section.label}
              </p>
              {section.description && (
                <p className="text-[12px] font-normal tracking-[0.5px] text-[#A2A2A2] leading-[1.55] mb-2 max-w-[220px]">
                  {section.description}
                </p>
              )}
              <a
                href={section.href}
                target={section.href.startsWith("http") ? "_blank" : undefined}
                rel={section.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-[13px] font-normal tracking-[0.7px] text-[#1E1E1E] hover:text-[#3CACB0] transition-colors duration-200 focus-visible:outline-none focus-visible:text-[#3CACB0]"
              >
                {section.value}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── Visit the Studio — address + Get Directions + Map embed ── */}
      <section className="px-6 md:px-20 pt-16 pb-16">
        <p className="text-[22px] md:text-[24px] tracking-[1.2px] text-[#1E1E1E] mb-2" style={{ fontFamily: "var(--font-serif)" }}>
          {c.visitUsTitle}
        </p>
        <p className="text-[13px] tracking-[0.7px] text-[#1E1E1E] leading-[1.62] max-w-[520px]" style={{ fontFamily: "var(--font-sans)" }}>
          {c.visitUsDesc}
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 md:gap-12 items-start">
          {/* Left: address + directions */}
          <div style={{ fontFamily: "var(--font-sans)" }}>
            <p className="text-[11px] uppercase tracking-[1.5px] text-[#A2A2A2] mb-2">{c.studioLabel}</p>
            <p className="text-[14px] tracking-[0.5px] text-[#1E1E1E] font-medium leading-[1.55]">{c.studioAddress}</p>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=380+Alliance+Ave,+Toronto,+Ontario"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-5 border border-[#1E1E1E] text-[#1E1E1E] text-[11px] font-semibold uppercase tracking-[1.5px] px-5 py-2.5 rounded-[30px] transition-colors duration-200 hover:bg-[#1E1E1E] hover:text-white active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E1E1E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9F9F9]"
            >
              {c.getDirections}
            </a>
          </div>

          {/* Right: map embed */}
          <div className="relative w-full aspect-[16/10] md:aspect-[16/9] overflow-hidden rounded-[12px] border border-[#E8E8E8]">
            <iframe
              title={c.mapTitle}
              src="https://www.google.com/maps?q=380%20Alliance%20Ave,%20Toronto,%20Ontario&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </div>
      </section>

      {/* ── Locations — MIKA retailer ── */}
      <section className="px-6 md:px-20 pt-4 pb-16">
        <p className="text-[22px] md:text-[24px] tracking-[1.2px] text-[#1E1E1E] mb-2" style={{ fontFamily: "var(--font-serif)" }}>
          {c.locationsTitle}
        </p>
        <p className="text-[13px] tracking-[0.7px] text-[#1E1E1E] leading-[1.62] max-w-[520px]" style={{ fontFamily: "var(--font-sans)" }}>
          {c.locationsDesc}
        </p>

        <div className="mt-8 flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-8">
          <div className="md:pt-2 md:min-w-[220px]" style={{ fontFamily: "var(--font-sans)" }}>
            <p className="text-[11px] uppercase tracking-[1.5px] text-[#A2A2A2] mb-2">{c.retailerLabel}</p>
            <p className="text-[14px] tracking-[0.5px] text-[#1E1E1E] font-medium">{c.retailerName}</p>
            <p className="text-[13px] tracking-[0.7px] text-[#A2A2A2] mt-1">{c.retailerAddress}</p>
          </div>
          <div className="relative w-full md:w-[55%] aspect-[735/414] overflow-hidden rounded-[12px]">
            <Image src="/hero/head3.jpg" alt="MIKA Gift Shop — Toronto" fill className="object-cover" sizes="(max-width: 768px) 100vw, 55vw" />
          </div>
        </div>
      </section>

      {/* ── Contact Form ── */}
      <section id="form" className="border-t border-[#E8E8E8] bg-white px-6 md:px-20 py-20">
        <p className="text-[22px] md:text-[24px] tracking-[1.2px] text-[#1E1E1E] mb-10" style={{ fontFamily: "var(--font-serif)" }}>
          {c.sendMessage}
        </p>
        <form className="max-w-[520px] flex flex-col gap-6" style={{ fontFamily: "var(--font-sans)" }}>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] uppercase tracking-[1.5px] text-[#A2A2A2]">{c.nameLbl}</label>
            <input
              type="text"
              name="name"
              required
              className="border-b border-[#E8E8E8] bg-transparent pb-2 text-[13px] tracking-[0.5px] text-[#1E1E1E] placeholder:text-[#C8C8C8] outline-none focus:border-[#1E1E1E] transition-colors duration-200"
              placeholder={c.namePlaceholder}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] uppercase tracking-[1.5px] text-[#A2A2A2]">{c.emailLbl}</label>
            <input
              type="email"
              name="email"
              required
              className="border-b border-[#E8E8E8] bg-transparent pb-2 text-[13px] tracking-[0.5px] text-[#1E1E1E] placeholder:text-[#C8C8C8] outline-none focus:border-[#1E1E1E] transition-colors duration-200"
              placeholder="your@email.com"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] uppercase tracking-[1.5px] text-[#A2A2A2]">{c.messageLbl}</label>
            <textarea
              name="message"
              required
              rows={5}
              className="border-b border-[#E8E8E8] bg-transparent pb-2 text-[13px] tracking-[0.5px] text-[#1E1E1E] placeholder:text-[#C8C8C8] outline-none focus:border-[#1E1E1E] transition-colors duration-200 resize-none"
              placeholder={c.messagePlaceholder}
            />
          </div>
          <button
            type="submit"
            className="mt-2 self-start border border-[#1E1E1E] text-[#1E1E1E] text-[11px] font-semibold uppercase tracking-[2px] px-6 py-2.5 rounded-[30px] transition-colors duration-200 hover:bg-[#1E1E1E] hover:text-white active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E1E1E] focus-visible:ring-offset-2"
          >
            {c.sendBtn}
          </button>
        </form>
      </section>

    </div>
  )
}
