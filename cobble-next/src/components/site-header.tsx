"use client"

import * as React from "react"
import Link from "next/link"
import { Search, User, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const collections = [
  { title: "Mug",   href: "/collections/mug" },
  { title: "Scoop", href: "/collections/scoop" },
  { title: "Spoon", href: "/collections/spoon" },
  { title: "Clip",  href: "/collections/clip" },
  { title: "Plate", href: "/collections/plate" },
  { title: "Vessl", href: "/collections/vessl" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E8E8E8] bg-white/95 backdrop-blur-sm">
      {/* Announcement bar */}
      <div className="flex h-8 items-center justify-center border-b border-[#E8E8E8] bg-[#F9F9F9]">
        <p className="font-ui text-[10px] font-medium uppercase tracking-[2px] text-[#1E1E1E]">
          Enjoy free shipping on orders of $100 or more.
        </p>
      </div>

      {/* Main nav row */}
      <div className="flex h-[72px] items-center px-10">
        {/* Logo */}
        <Link href="/" className="mr-10 flex-shrink-0" aria-label="Cobble home">
          <span className="font-editorial text-2xl italic tracking-tight text-[#1E1E1E]">
            Cobble
          </span>
        </Link>

        {/* Nav links */}
        <NavigationMenu className="flex-shrink-0">
          <NavigationMenuList className="gap-0 space-x-0">
            {/* Shop with dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  "h-auto bg-transparent px-0 py-0 text-[11px] font-medium uppercase tracking-[2.5px] text-[#1E1E1E]",
                  "hover:bg-transparent hover:text-[#3CACB0]",
                  "focus:bg-transparent focus:text-[#3CACB0]",
                  "data-[state=open]:bg-transparent data-[state=open]:text-[#3CACB0]",
                  "data-[active]:bg-transparent",
                  "mr-9"
                )}
              >
                Shop
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-52 px-6 py-5">
                  <p className="mb-3 text-[9px] font-semibold uppercase tracking-[2.2px] text-[#A2A2A2]">
                    • Shop by Collection
                  </p>
                  <ul className="flex flex-col">
                    {collections.map((item, i) => (
                      <li
                        key={item.title}
                        className={cn(
                          "border-[#E8E8E8]",
                          i < collections.length - 1 && "border-b"
                        )}
                      >
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              "block py-2.5 text-[11px] font-medium uppercase tracking-[2px] text-[#1E1E1E]",
                              "transition-colors duration-200 hover:text-[#3CACB0]"
                            )}
                          >
                            {item.title}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Journal */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/journal"
                  className={cn(
                    "inline-flex h-auto items-center px-0 py-0 text-[11px] font-medium uppercase tracking-[2.5px] text-[#1E1E1E]",
                    "transition-colors duration-200 hover:text-[#3CACB0]",
                    "bg-transparent hover:bg-transparent focus:bg-transparent",
                    "mr-9"
                  )}
                >
                  Journal
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* About */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/about"
                  className={cn(
                    "inline-flex h-auto items-center px-0 py-0 text-[11px] font-medium uppercase tracking-[2.5px] text-[#1E1E1E]",
                    "transition-colors duration-200 hover:text-[#3CACB0]",
                    "bg-transparent hover:bg-transparent focus:bg-transparent"
                  )}
                >
                  About
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Icons — far right */}
        <div className="ml-auto flex items-center gap-5">
          {[
            { icon: Search, label: "Search" },
            { icon: User,   label: "Account", href: "/account" },
            { icon: ShoppingBag, label: "Cart", href: "/cart" },
          ].map(({ icon: Icon, label, href }) => {
            const el = (
              <button
                key={label}
                aria-label={label}
                className="flex items-center justify-center p-1 text-[#1E1E1E] transition-colors duration-200 hover:text-[#3CACB0]"
              >
                <Icon size={19} strokeWidth={1.5} />
              </button>
            )
            return href ? (
              <Link key={label} href={href} aria-label={label}
                className="flex items-center justify-center p-1 text-[#1E1E1E] transition-colors duration-200 hover:text-[#3CACB0]"
              >
                <Icon size={19} strokeWidth={1.5} />
              </Link>
            ) : el
          })}
        </div>
      </div>
    </header>
  )
}
