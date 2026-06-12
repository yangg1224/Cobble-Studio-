"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { SaveButton } from "@/components/save-button"

export function ProductCard({
  slug, name, price, img, collection,
}: {
  slug: string
  name: string
  price: string
  img: string
  collection?: string
}) {
  const [hover, setHover] = useState(false)

  return (
    <div
      className="group relative block"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link href={`/products/${slug}`} className="block">
        <div className="relative w-full overflow-hidden bg-[#F9F9F9]" style={{ aspectRatio: "3/4" }}>
          <Image
            src={img}
            alt={name}
            fill
            className="object-contain transition-transform duration-[550ms] group-hover:scale-[1.05]"
            style={{ transitionTimingFunction: "cubic-bezier(0.25,0.46,0.45,0.94)" }}
            sizes="(max-width:768px) 50vw, (max-width:1024px) 33vw, 25vw"
          />
          {/* Save button — fades in on hover */}
          <div
            style={{
              position: "absolute", top: 10, right: 10,
              opacity: hover ? 1 : 0,
              transition: "opacity 200ms",
            }}
          >
            <SaveButton slug={slug} />
          </div>
        </div>
        <div className="px-2 pb-2 pt-3.5">
          {collection && (
            <span className="mb-1 block text-[9px] font-semibold uppercase tracking-[2px] text-[#A2A2A2]">
              {collection}
            </span>
          )}
          <span className="block text-[11px] font-medium uppercase leading-[1.4] tracking-[1.4px] text-[#1E1E1E] transition-colors duration-200 group-hover:text-[#3CACB0]">
            {name}
          </span>
          <span className="mt-1 block text-[11px] tracking-[1px] text-[#A2A2A2]">
            {price}
          </span>
        </div>
      </Link>
    </div>
  )
}
