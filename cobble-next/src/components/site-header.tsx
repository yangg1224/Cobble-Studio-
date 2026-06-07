"use client"

import * as React from "react"
import Link from "next/link"

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

export function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{ boxShadow: "0 4px 24px rgba(30,30,30,0.04)" }}
    >
      {/* Announcement bar */}
      <div className="flex h-[31px] items-center justify-center border-b border-[#E8E8E8] bg-[#F9F9F9]">
        <p className="text-[10px] font-medium uppercase tracking-[2px] text-[#1E1E1E] whitespace-nowrap">
          Enjoy free shipping on orders of $100 or more.
        </p>
      </div>

      {/* Main nav row */}
      <div className="flex h-[91px] items-center border-b border-[#E8E8E8] bg-white px-10">
        {/* Logo */}
        <Link href="/" className="mr-10 flex-shrink-0" aria-label="Cobble home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand_assets/logo.png" alt="COBBLE" className="h-[58px] w-auto block" />
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-9" aria-label="Main navigation">

          {/* Shop — with hover dropdown */}
          <div className="group relative flex items-center">
            <Link href="/collections" className={navLinkCls}>
              Shop
            </Link>

            {/* Dropdown */}
            <div
              className="pointer-events-none absolute left-[-28px] top-full z-50 w-[212px] bg-white/95 backdrop-blur-sm opacity-0 -translate-y-1.5 transition-[opacity,transform] duration-[220ms] ease-out group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0"
              style={{ paddingTop: 16, paddingBottom: 20, paddingLeft: 28, paddingRight: 28 }}
            >
              <p className="mb-3.5 text-[9px] font-semibold uppercase tracking-[2.2px] text-[#A2A2A2]">
                • Shop by Collection
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

          <Link href="/journal" className={navLinkCls}>Journal</Link>
          <Link href="/about"   className={navLinkCls}>About</Link>
        </nav>

        {/* Icons — far right */}
        <div className="ml-auto flex items-center gap-5">
          <button
            aria-label="Search"
            className="flex items-center justify-center p-1 text-[#1E1E1E] transition-[color,transform] duration-200 hover:text-[#3CACB0] hover:scale-[1.08] active:scale-[0.94]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/>
            </svg>
          </button>
          <Link
            href="/account"
            aria-label="Account"
            className="flex items-center justify-center p-1 text-[#1E1E1E] transition-[color,transform] duration-200 hover:text-[#3CACB0] hover:scale-[1.08] active:scale-[0.94]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="7" r="4"/><path d="M4 21v-1a8 8 0 0 1 16 0v1"/>
            </svg>
          </Link>
          <Link
            href="/cart"
            aria-label="Cart"
            className="flex items-center justify-center p-1 text-[#1E1E1E] transition-[color,transform] duration-200 hover:text-[#3CACB0] hover:scale-[1.08] active:scale-[0.94]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </Link>
        </div>
      </div>
    </header>
  )
}
