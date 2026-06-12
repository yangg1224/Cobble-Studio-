"use client"

import * as React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/client"
import { useCart } from "@/context/CartContext"
import { useLanguage, LANGUAGES, type Language } from "@/context/LanguageContext"

const collections = [
  { title: "Mug",   href: "/collections/mug" },
  { title: "Scoop", href: "/collections/scoop" },
  { title: "Spoon", href: "/collections/spoon" },
  { title: "Clip",  href: "/collections/clip" },
  { title: "Plate", href: "/collections/plate" },
  { title: "Vessl", href: "/collections/vessl" },
]

const navLinkCls =
  "relative text-[11px] font-medium uppercase tracking-[2.5px] text-[#1E1E1E] pb-0.5 " +
  "transition-colors duration-200 hover:text-[#3CACB0] " +
  "after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:h-px after:w-0 after:bg-[#3CACB0] " +
  "after:transition-[width] after:duration-[250ms] hover:after:w-full " +
  "focus-visible:outline-2 focus-visible:outline-[#3CACB0] focus-visible:outline-offset-4 focus-visible:rounded-sm"

function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handleOutside)
    return () => document.removeEventListener("mousedown", handleOutside)
  }, [])

  const current = LANGUAGES.find((l) => l.code === language)!

  function handleSelect(code: Language) {
    setLanguage(code)
    setOpen(false)
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Change language"
        aria-expanded={open}
        className="flex items-center gap-1.5 px-2 py-1 text-[#1E1E1E] transition-[color,transform] duration-200 hover:text-[#3CACB0] hover:scale-[1.04] active:scale-[0.94] focus-visible:outline-2 focus-visible:outline-[#3CACB0] focus-visible:outline-offset-2 focus-visible:rounded-sm"
      >
        {/* Globe icon */}
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10A15.3 15.3 0 0 1 8 12a15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span className="text-[10px] font-semibold uppercase tracking-[1.5px]">
          {current.label}
        </span>
        {/* Chevron */}
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 220ms ease",
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Dropdown */}
      <div
        aria-hidden={!open}
        style={{
          position: "absolute",
          right: 0,
          top: "calc(100% + 10px)",
          width: 160,
          background: "white",
          border: "1px solid #E8E8E8",
          boxShadow: "0 8px 32px rgba(30,30,30,0.10)",
          zIndex: 50,
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(-6px)",
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 180ms ease, transform 180ms ease",
        }}
      >
        <p
          style={{
            padding: "10px 16px 8px",
            fontSize: 9,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "2px",
            color: "#A2A2A2",
            borderBottom: "1px solid #F0F0F0",
          }}
        >
          Language
        </p>
        {LANGUAGES.map(({ code, label, native }) => {
          const isActive = code === language
          return (
            <button
              key={code}
              onClick={() => handleSelect(code)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                padding: "10px 16px",
                background: "transparent",
                border: "none",
                borderBottom: "1px solid #F4F4F4",
                cursor: "pointer",
                textAlign: "left",
                color: isActive ? "#3CACB0" : "#1E1E1E",
                transition: "color 150ms ease, background 150ms ease",
              }}
              onMouseEnter={(e) => {
                if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = "#3CACB0"
              }}
              onMouseLeave={(e) => {
                if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = "#1E1E1E"
              }}
            >
              <span style={{ fontSize: 11, fontWeight: isActive ? 600 : 400, letterSpacing: "0.3px" }}>
                {native}
              </span>
              <span style={{ fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1.5px", opacity: 0.5 }}>
                {label}
              </span>
              {isActive && (
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#3CACB0"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ position: "absolute", right: 12 }}
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function SiteHeader() {
  const router = useRouter()
  const { totalCount } = useCart()
  const { t } = useLanguage()
  const [user, setUser] = useState<User | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [bannerVisible, setBannerVisible] = useState(true)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    setMobileNavOpen(false)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setBannerVisible(false), 10000)
    return () => clearTimeout(t)
  }, [])

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    setMenuOpen(false)
    setMobileNavOpen(false)
    router.push("/account")
    router.refresh()
  }

  const displayName = user?.user_metadata?.full_name as string | undefined
  const initial = displayName
    ? displayName.charAt(0).toUpperCase()
    : user?.email?.charAt(0).toUpperCase() ?? "?"

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{ boxShadow: "0 4px 24px rgba(30,30,30,0.04)" }}
    >
      {/* Announcement bar */}
      <div
        className="flex items-center justify-center border-b border-[#9C6A3A] bg-[#C4895A] overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out"
        style={{ maxHeight: bannerVisible ? 31 : 0, opacity: bannerVisible ? 1 : 0 }}
      >
        <p className="h-[31px] flex items-center text-[10px] font-medium uppercase tracking-[2px] text-[#FAF5EF] whitespace-nowrap">
          {t.banner}
        </p>
      </div>

      {/* Main nav row */}
      <div className="flex h-[91px] items-center border-b border-[#E8E8E8] bg-white px-4 md:px-10">
        {/* Logo */}
        <Link href="/" className="mr-6 md:mr-10 flex-shrink-0" aria-label="Cobble home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand_assets/logo.png" alt="COBBLE" className="h-[48px] md:h-[58px] w-auto block" />
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-9" aria-label="Main navigation">

          {/* Shop — with hover dropdown */}
          <div className="group relative flex items-center">
            <Link href="/collections" className={navLinkCls}>
              {t.nav.shop}
            </Link>

            {/* Dropdown */}
            <div
              className="pointer-events-none absolute left-[-28px] top-full z-50 w-[212px] bg-white/95 backdrop-blur-sm opacity-0 -translate-y-1.5 transition-[opacity,transform] duration-[220ms] ease-out group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0"
              style={{ paddingTop: 16, paddingBottom: 20, paddingLeft: 28, paddingRight: 28 }}
            >
              <p className="mb-3.5 text-[9px] font-semibold uppercase tracking-[2.2px] text-[#A2A2A2]">
                {t.nav.shopByCollection}
              </p>
              <ul className="flex flex-col">
                {collections.map((item) => (
                  <li key={item.title} className="border-b border-[#E8E8E8] last:border-0">
                    <Link
                      href={item.href}
                      className="block py-2 text-[11px] font-medium uppercase tracking-[2px] text-[#1E1E1E] transition-colors duration-200 hover:text-[#3CACB0]"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link href="/journal"  className={navLinkCls}>{t.nav.journal}</Link>
          <Link href="/about"    className={navLinkCls}>{t.nav.about}</Link>
          <Link href="/contact"  className={navLinkCls}>{t.nav.contact}</Link>
        </nav>

        {/* Tagline — floats centered in the whitespace between nav links and icon cluster */}
        <div className="hidden lg:flex flex-1 items-center justify-center select-none">
          <div className="flex flex-col items-center">
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 11,
                letterSpacing: "0.6px",
                color: "#1E1E1E",
                opacity: 0.38,
                lineHeight: 1,
              }}
            >
              始于木，终于器，善于用
            </span>
            <span
              style={{
                fontSize: 7.5,
                letterSpacing: "1.8px",
                textTransform: "uppercase",
                color: "#A2A2A2",
                marginTop: 5,
                lineHeight: 1,
              }}
            >
              Born of wood · Into vessel · Refined
            </span>
          </div>
        </div>

        {/* Icons — far right */}
        <div className="ml-auto flex items-center gap-3 md:gap-4">
          {/* Search — hidden on mobile */}
          <button
            aria-label={t.search}
            className="hidden md:flex items-center justify-center p-1 text-[#1E1E1E] transition-[color,transform] duration-200 hover:text-[#3CACB0] hover:scale-[1.08] active:scale-[0.94]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/>
            </svg>
          </button>

          {/* Language switcher — hidden on mobile */}
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          {/* Account */}
          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="Account menu"
                aria-expanded={menuOpen}
                className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center text-white text-[11px] font-semibold uppercase tracking-[1px] transition-[transform,opacity] duration-200 hover:scale-[1.08] hover:opacity-90 active:scale-[0.94]"
                style={{ background: "var(--ink)", borderRadius: "50%", border: "none" }}
              >
                {initial}
              </button>

              {menuOpen && (
                <div
                  className="absolute right-0 top-[calc(100%+10px)] z-50 w-[200px] bg-white"
                  style={{ boxShadow: "0 8px 32px rgba(30,30,30,0.12)", border: "1px solid #E8E8E8" }}
                >
                  <div className="px-5 py-4" style={{ borderBottom: "1px solid #E8E8E8" }}>
                    {displayName && (
                      <p className="font-ui mb-0.5 text-[12px] font-medium tracking-[0.3px]" style={{ color: "var(--ink)" }}>
                        {displayName}
                      </p>
                    )}
                    <p className="font-ui text-[10px] tracking-[0.3px] truncate" style={{ color: "var(--ash)" }}>
                      {user.email}
                    </p>
                  </div>

                  <div className="py-2">
                    <Link
                      href="/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="font-ui block px-5 py-2.5 text-[10px] font-medium uppercase tracking-[2px] transition-colors duration-200 hover:text-[#3CACB0]"
                      style={{ color: "var(--ink)" }}
                    >
                      {t.myAccount}
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="font-ui w-full cursor-pointer bg-transparent px-5 py-2.5 text-left text-[10px] font-medium uppercase tracking-[2px] transition-colors duration-200 hover:text-[#3CACB0]"
                      style={{ border: "none", color: "var(--ash)" }}
                    >
                      {t.signOut}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/account"
              aria-label="Account"
              className="flex items-center justify-center p-1 text-[#1E1E1E] transition-[color,transform] duration-200 hover:text-[#3CACB0] hover:scale-[1.08] active:scale-[0.94]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="7" r="4"/><path d="M4 21v-1a8 8 0 0 1 16 0v1"/>
              </svg>
            </Link>
          )}

          <Link
            href="/cart"
            aria-label={`${t.nav.shop}${totalCount > 0 ? ` (${totalCount})` : ""}`}
            className="relative flex items-center justify-center p-1 text-[#1E1E1E] transition-[color,transform] duration-200 hover:text-[#3CACB0] hover:scale-[1.08] active:scale-[0.94]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {totalCount > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#3CACB0] text-[9px] font-semibold text-white"
                aria-hidden="true"
              >
                {totalCount > 99 ? "99+" : totalCount}
              </span>
            )}
          </Link>

          {/* Hamburger — mobile only */}
          <button
            aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileNavOpen}
            onClick={() => setMobileNavOpen((o) => !o)}
            className="md:hidden flex items-center justify-center p-1 text-[#1E1E1E] transition-[color,transform] duration-200 hover:text-[#3CACB0] active:scale-[0.94]"
          >
            {mobileNavOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileNavOpen && (
        <div className="md:hidden border-b border-[#E8E8E8] bg-white">
          <nav aria-label="Mobile navigation">
            <Link
              href="/collections"
              onClick={() => setMobileNavOpen(false)}
              className="flex items-center justify-between px-6 py-4 text-[11px] font-medium uppercase tracking-[2.5px] text-[#1E1E1E] border-b border-[#F0F0F0] hover:text-[#3CACB0] transition-colors duration-200"
            >
              {t.nav.shop}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </Link>
            {/* Collections sub-links */}
            <div className="bg-[#F9F9F9] px-8 pb-2 pt-1">
              {collections.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  className="block py-2.5 text-[10px] uppercase tracking-[2px] text-[#989898] hover:text-[#3CACB0] transition-colors duration-200"
                >
                  {item.title}
                </Link>
              ))}
            </div>
            <Link
              href="/journal"
              onClick={() => setMobileNavOpen(false)}
              className="flex items-center justify-between px-6 py-4 text-[11px] font-medium uppercase tracking-[2.5px] text-[#1E1E1E] border-t border-[#F0F0F0] hover:text-[#3CACB0] transition-colors duration-200"
            >
              {t.nav.journal}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileNavOpen(false)}
              className="flex items-center justify-between px-6 py-4 text-[11px] font-medium uppercase tracking-[2.5px] text-[#1E1E1E] border-t border-[#F0F0F0] hover:text-[#3CACB0] transition-colors duration-200"
            >
              {t.nav.about}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileNavOpen(false)}
              className="flex items-center justify-between px-6 py-4 text-[11px] font-medium uppercase tracking-[2.5px] text-[#1E1E1E] border-t border-[#F0F0F0] hover:text-[#3CACB0] transition-colors duration-200"
            >
              {t.nav.contact}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </Link>

            {/* Language switcher in mobile drawer */}
            <div className="border-t border-[#F0F0F0] px-6 py-4">
              <p className="mb-3 text-[9px] font-semibold uppercase tracking-[2px] text-[#A2A2A2]">Language</p>
              <div className="flex gap-3 flex-wrap">
                {LANGUAGES.map(({ code, label, native }) => (
                  <MobileLangButton key={code} code={code} label={label} native={native} />
                ))}
              </div>
            </div>

            {/* Search in mobile drawer */}
            <div className="border-t border-[#F0F0F0] px-6 py-4">
              <div className="flex items-center gap-3 border-b border-[#E8E8E8] pb-2">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A2A2A2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/>
                </svg>
                <input
                  type="search"
                  placeholder={t.search}
                  aria-label={t.search}
                  className="flex-1 bg-transparent text-[12px] tracking-[0.5px] text-[#1E1E1E] placeholder:text-[#A2A2A2] outline-none"
                />
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

function MobileLangButton({ code, native }: { code: Language; label: string; native: string }) {
  const { language, setLanguage } = useLanguage()
  const isActive = code === language
  return (
    <button
      onClick={() => setLanguage(code)}
      style={{
        padding: "5px 12px",
        border: isActive ? "1px solid #3CACB0" : "1px solid #E8E8E8",
        background: isActive ? "#3CACB0" : "transparent",
        color: isActive ? "white" : "#1E1E1E",
        fontSize: 10,
        fontWeight: isActive ? 600 : 400,
        letterSpacing: "1px",
        textTransform: "uppercase" as const,
        cursor: "pointer",
        transition: "all 150ms ease",
      }}
    >
      {native}
    </button>
  )
}
