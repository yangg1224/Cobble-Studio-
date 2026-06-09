"use client"

import Image from "next/image"
import { useLanguage } from "@/context/LanguageContext"

export default function ContactPage() {
  const { t } = useLanguage()
  const c = t.contact

  const contactSections = [
    { labelKey: "instagram",    value: "@cobble0",              href: "https://www.instagram.com/cobble0/", isLink: true, label: c.instagram },
    { labelKey: "customerService", value: "wayne761216@gmail.com", href: "mailto:wayne761216@gmail.com",    isLink: true, label: c.customerService },
    { labelKey: "collaboration", value: "wayne761216@gmail.com", href: "mailto:wayne761216@gmail.com",     isLink: false, label: c.collaboration, description: c.collaborationDesc },
  ]

  return (
    <div className="bg-[#F9F9F9] min-h-screen">

      {/* ── Hero heading ── */}
      <section className="flex flex-col items-center pt-32 md:pt-48 pb-10 px-6">
        <h1
          className="font-serif text-[28px] md:text-[36px] tracking-[1.8px] text-[#1E1E1E] text-center leading-none"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {c.title}
        </h1>
      </section>

      {/* ── Description ── */}
      <div className="text-center px-6 max-w-[640px] mx-auto">
        <p className="text-[16px] tracking-[0.8px] text-[#1E1E1E] leading-[1.62]" style={{ fontFamily: "var(--font-serif)" }}>
          {c.intro1}
        </p>
        <p className="mt-4 text-[16px] tracking-[0.8px] text-[#1E1E1E] leading-[1.62]" style={{ fontFamily: "var(--font-serif)" }}>
          {c.intro2}
        </p>
      </div>

      {/* ── Contact Form button ── */}
      <div className="flex justify-center mt-8">
        <a
          href="#form"
          className="bg-[#A2A2A2] text-[#F9F9F9] text-[13px] font-semibold uppercase tracking-[0.7px] px-5 py-[5px] rounded-[30px] transition-colors duration-200 hover:bg-[#1E1E1E]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {c.contactFormBtn}
        </a>
      </div>

      {/* ── Contact info sections ── */}
      <div className="flex flex-col gap-14 items-center pt-20 pb-8 px-6">
        {contactSections.map((section) => (
          <div key={section.labelKey} className="text-center" style={{ fontFamily: "var(--font-sans)" }}>
            <p className="text-[13px] font-semibold uppercase tracking-[0.7px] text-[#1E1E1E] mb-1.5">
              {section.label}
            </p>
            {section.description && (
              <p className="text-[13px] font-normal tracking-[0.7px] text-[#1E1E1E] leading-[1.62]">
                {section.description}
              </p>
            )}
            {section.isLink ? (
              <a
                href={section.href}
                target={section.href.startsWith("http") ? "_blank" : undefined}
                rel={section.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-[13px] font-normal tracking-[0.7px] text-[#1E1E1E] hover:text-[#3CACB0] transition-colors duration-200"
              >
                {section.value}
              </a>
            ) : (
              <a href={section.href} className="text-[13px] font-normal tracking-[0.7px] text-[#1E1E1E] hover:text-[#3CACB0] transition-colors duration-200">
                {section.value}
              </a>
            )}
          </div>
        ))}
      </div>

      {/* ── Locations ── */}
      <section className="px-6 md:px-20 pt-20 pb-12">
        <p className="text-[22px] md:text-[24px] tracking-[1.2px] text-[#1E1E1E] mb-2" style={{ fontFamily: "var(--font-serif)" }}>
          {c.locationsTitle}
        </p>
        <p className="text-[13px] tracking-[0.7px] text-[#1E1E1E] leading-[1.62] max-w-[520px]" style={{ fontFamily: "var(--font-sans)" }}>
          {c.locationsDesc}
        </p>

        <div className="mt-12 flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div className="md:pt-6 md:min-w-[220px]" style={{ fontFamily: "var(--font-sans)" }}>
            <p className="text-[13px] tracking-[0.7px] text-[#1E1E1E] font-medium">TORONTO (MIKA Gift Shop)</p>
            <p className="text-[13px] tracking-[0.7px] text-[#A2A2A2] mt-1">496 College Street, Toronto, Ontario</p>
          </div>
          <div className="relative w-full md:w-[55%] aspect-[735/414] overflow-hidden">
            <Image src="/hero/head3.jpg" alt="MIKA Gift Shop — Toronto" fill className="object-cover" sizes="(max-width: 768px) 100vw, 55vw" />
          </div>
        </div>
      </section>

      {/* ── Visit Us ── */}
      <section className="px-6 md:px-20 pt-20 pb-20">
        <p className="text-[22px] md:text-[24px] tracking-[1.2px] text-[#1E1E1E] mb-2" style={{ fontFamily: "var(--font-serif)" }}>
          {c.visitUsTitle}
        </p>
        <p className="text-[13px] tracking-[0.7px] text-[#1E1E1E] leading-[1.62] max-w-[520px]" style={{ fontFamily: "var(--font-sans)" }}>
          {c.visitUsDesc}
        </p>

        <div className="mt-12 flex flex-col md:flex-row md:items-start gap-16">
          <div className="md:pt-6 md:min-w-[220px]" style={{ fontFamily: "var(--font-sans)" }}>
            <p className="text-[13px] tracking-[0.7px] text-[#1E1E1E] font-medium">TORONTO</p>
            <p className="text-[13px] tracking-[0.7px] text-[#A2A2A2] mt-1">xxx Street, YORK, Ontario</p>
          </div>
          <div className="relative w-[239px] max-w-full aspect-[239/424] overflow-hidden">
            <Image src="/journal/brand-story/workshop.jpg" alt="Cobble Studio — Toronto" fill className="object-cover" sizes="239px" />
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
            className="mt-2 self-start border border-[#1E1E1E] text-[#1E1E1E] text-[11px] font-semibold uppercase tracking-[2px] px-6 py-2.5 rounded-[30px] transition-colors duration-200 hover:bg-[#1E1E1E] hover:text-white active:scale-[0.97]"
          >
            {c.sendBtn}
          </button>
        </form>
      </section>

    </div>
  )
}
