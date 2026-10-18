"use client"

import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"

const shopHrefs  = ["/collections/mug", "/collections/scoop", "/collections/spoon", "/collections/clip", "/collections/plate", "/collections/vessel"]
const aboutHrefs = ["/about", "/journal", "/journal", "/contact"]
const suppHrefs  = ["/contact", "/contact", "/contact", "/contact"]

function FooterCol({ title, links, hrefs }: { title: string; links: string[]; hrefs: string[] }) {
  return (
    <div>
      <span className="mb-5 block text-[11px] font-semibold uppercase tracking-[2.5px] text-[#1E1E1E]">
        {title}
      </span>
      <ul className="flex flex-col gap-3">
        {links.map((label, i) => (
          <li key={i}>
            <Link
              href={hrefs[i]}
              className="text-[11px] tracking-[1px] text-[#989898] transition-colors duration-200 hover:text-[#1E1E1E]"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SiteFooter() {
  const { t } = useLanguage()
  const f = t.footer

  return (
    <footer className="border-t border-[#E8E8E8] bg-[#F9F9F9]">
      {/* Main grid */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 px-6 py-12 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:gap-12 md:px-10 md:py-16">
        {/* Brand column */}
        <div>
          <Link href="/" aria-label="Cobble Home" className="mb-5 block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand_assets/logo.png" alt="COBBLE" className="h-12 w-auto" />
          </Link>
          <div className="mt-5 flex flex-col gap-2 select-none">
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 13,
                letterSpacing: "0.6px",
                color: "#1E1E1E",
                opacity: 0.45,
                lineHeight: 1,
              }}
            >
              始于木 · 终于器 · 善于用
            </span>
            <div className="flex flex-col gap-0.5 mt-1">
              {["Born of wood", "Shaped into vessel", "Refined through use"].map((line) => (
                <span
                  key={line}
                  style={{
                    fontSize: 10,
                    letterSpacing: "1px",
                    color: "#A2A2A2",
                    lineHeight: 1.7,
                  }}
                >
                  {line}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-5 flex gap-4">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/cobble.studio.to/" aria-label="Instagram"
              target="_blank" rel="noopener noreferrer"
              className="text-[#A2A2A2] transition-colors duration-200 hover:text-[#1E1E1E]"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@cobble.studio.to" aria-label="TikTok"
              target="_blank" rel="noopener noreferrer"
              className="text-[#A2A2A2] transition-colors duration-200 hover:text-[#1E1E1E]"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5"/>
                <path d="M14 3c.4 2.6 2.1 4.3 5 4.5"/>
              </svg>
            </a>
            {/* Etsy */}
            <a
              href="https://www.etsy.com/ca/shop/Cobble0?ref=shop-header-name&listing_id=4526502365&from_page=listing" aria-label="Etsy shop"
              target="_blank" rel="noopener noreferrer"
              className="text-[#A2A2A2] transition-colors duration-200 hover:text-[#1E1E1E]"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 4H8.5v16H17"/>
                <path d="M8.5 12H15"/>
              </svg>
            </a>
          </div>
        </div>

        <FooterCol title={f.shopTitle}    links={f.shopLinks}    hrefs={shopHrefs} />
        <FooterCol title={f.aboutTitle}   links={f.aboutLinks}   hrefs={aboutHrefs} />
        <FooterCol title={f.supportTitle} links={f.supportLinks} hrefs={suppHrefs} />
      </div>

      {/* Bottom bar — single condensed line */}
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border-t border-[#EEEEEE] px-6 py-4 md:px-10">
        <span className="text-[10px] tracking-[1.2px] text-[#A2A2A2]">
          {f.copyright}
        </span>
        <span aria-hidden className="text-[10px] text-[#D4D4D4]">·</span>
        <Link href="/privacy" className="text-[10px] tracking-[1.2px] text-[#A2A2A2] transition-colors duration-200 hover:text-[#1E1E1E]">
          {f.privacyPolicy}
        </Link>
        <span aria-hidden className="text-[10px] text-[#D4D4D4]">·</span>
        <Link href="/terms" className="text-[10px] tracking-[1.2px] text-[#A2A2A2] transition-colors duration-200 hover:text-[#1E1E1E]">
          {f.termsOfUse}
        </Link>
      </div>
    </footer>
  )
}
