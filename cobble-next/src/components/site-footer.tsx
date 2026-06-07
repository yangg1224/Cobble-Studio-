"use client"

import Link from "next/link"

const shopLinks  = ["Cups & Mugs", "Trays & Boards", "Spoons", "New Arrivals", "Gift Ideas"]
const shopHrefs  = ["/shop/cups", "/shop/trays", "/shop/spoons", "/shop/new", "/shop/gift"]
const aboutLinks = ["Our Story", "The Craft", "Journal", "Sustainability"]
const aboutHrefs = ["/about", "/about/craft", "/journal", "/about/sustainability"]
const suppLinks  = ["FAQ", "Shipping & Returns", "Product Care", "Contact Us"]
const suppHrefs  = ["/faq", "/shipping", "/care", "/contact"]

function FooterCol({ title, links, hrefs }: { title: string; links: string[]; hrefs: string[] }) {
  return (
    <div>
      <span className="mb-5 block text-[11px] font-semibold uppercase tracking-[2.5px] text-[#1E1E1E]">
        {title}
      </span>
      <ul className="flex flex-col gap-3">
        {links.map((label, i) => (
          <li key={label}>
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
  return (
    <footer className="border-t border-[#E8E8E8] bg-[#F9F9F9]">
      {/* Main grid */}
      <div
        className="grid gap-12 px-10 py-16"
        style={{ gridTemplateColumns: "220px repeat(4, 1fr)" }}
      >
        {/* Brand column */}
        <div>
          <Link href="/" aria-label="Cobble Home" className="mb-5 block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand_assets/logo.png" alt="COBBLE" className="h-12 w-auto" />
          </Link>
          <p className="max-w-[180px] text-[11px] leading-[1.8] tracking-[1px] text-[#989898]">
            Handcrafted wooden objects made with intention. Every piece is one of a kind.
          </p>
          <div className="mt-6 flex gap-4">
            {/* Instagram */}
            <a
              href="https://instagram.com" aria-label="Instagram"
              target="_blank" rel="noopener noreferrer"
              className="text-[#A2A2A2] transition-colors duration-200 hover:text-[#1E1E1E]"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            {/* Pinterest */}
            <a
              href="https://pinterest.com" aria-label="Pinterest"
              target="_blank" rel="noopener noreferrer"
              className="text-[#A2A2A2] transition-colors duration-200 hover:text-[#1E1E1E]"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.22-5.17 1.22-5.17s-.31-.63-.31-1.56c0-1.46.85-2.55 1.9-2.55.9 0 1.33.67 1.33 1.48 0 .9-.58 2.26-.87 3.51-.25 1.05.52 1.9 1.55 1.9 1.86 0 3.11-2.39 3.11-5.22 0-2.15-1.45-3.66-3.52-3.66-2.4 0-3.8 1.8-3.8 3.66 0 .72.28 1.5.62 1.92.07.08.08.15.06.23l-.23.95c-.04.15-.13.18-.29.11-1.05-.49-1.71-2.02-1.71-3.25 0-2.64 1.92-5.07 5.53-5.07 2.9 0 5.16 2.07 5.16 4.83 0 2.88-1.81 5.2-4.33 5.2-.85 0-1.64-.44-1.91-.96l-.52 1.94c-.19.72-.69 1.62-1.03 2.17.78.24 1.6.37 2.46.37 5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
              </svg>
            </a>
          </div>
        </div>

        <FooterCol title="Shop"    links={shopLinks}  hrefs={shopHrefs} />
        <FooterCol title="About"   links={aboutLinks} hrefs={aboutHrefs} />
        <FooterCol title="Support" links={suppLinks}   hrefs={suppHrefs} />

        {/* Newsletter column */}
        <div>
          <span className="mb-5 block text-[11px] font-semibold uppercase tracking-[2.5px] text-[#1E1E1E]">
            Newsletter
          </span>
          <p className="mb-4 text-[11px] leading-relaxed tracking-[1px] text-[#989898]">
            Stay in the loop — new pieces, stories, and studio notes delivered to your inbox.
          </p>
          <form
            className="flex border-b border-[#1E1E1E]"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email"
              aria-label="Email address"
              className="flex-1 bg-transparent py-2 text-[11px] tracking-[1px] text-[#1E1E1E] placeholder:text-[#A2A2A2] outline-none"
            />
            <button
              type="submit"
              className="py-2 pl-3 text-[10px] font-medium uppercase tracking-[2px] text-[#1E1E1E] transition-colors duration-200 hover:text-[#3CACB0]"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between border-t border-[#E8E8E8] px-10 py-[18px]">
        <span className="text-[10px] tracking-[1.2px] text-[#A2A2A2]">
          © 2026 Cobble Canada Inc.
        </span>
        <nav className="flex gap-6" aria-label="Legal links">
          <Link href="/privacy" className="text-[10px] tracking-[1.2px] text-[#A2A2A2] transition-colors duration-200 hover:text-[#1E1E1E]">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-[10px] tracking-[1.2px] text-[#A2A2A2] transition-colors duration-200 hover:text-[#1E1E1E]">
            Terms of Use
          </Link>
        </nav>
      </div>
    </footer>
  )
}
