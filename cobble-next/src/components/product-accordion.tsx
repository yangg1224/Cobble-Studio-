"use client"

import { useState } from "react"

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{
      transform: open ? "rotate(90deg)" : "rotate(0deg)",
      transition: "transform 200ms ease",
    }}
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

function AccordionRow({ label, value }: { label: string; value: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-t border-[#E8E8E8]">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-4 text-[11px] font-medium uppercase tracking-[2.5px] text-[#1E1E1E] transition-colors duration-200 hover:text-[#3CACB0] focus-visible:outline-2 focus-visible:outline-[#3CACB0] focus-visible:outline-offset-2 focus-visible:rounded-sm"
      >
        {label}
        <ChevronIcon open={open} />
      </button>
      <div
        style={{
          maxHeight: open ? "200px" : "0",
          overflow: "hidden",
          transition: "max-height 300ms ease",
        }}
      >
        <p className="pb-5 text-[11px] leading-[1.65] tracking-[0.5px] text-[#A2A2A2]">
          {value}
        </p>
      </div>
    </div>
  )
}

type Props = {
  material: string
  dimensions: string
  care: string
}

export function ProductAccordion({ material, dimensions, care }: Props) {
  return (
    <div>
      <AccordionRow label="Details" value={`Material: ${material}. Dimensions: ${dimensions}.`} />
      <AccordionRow label="Shipping" value="Ships within 3–5 business days. Free standard shipping on orders over $100. Express options available at checkout." />
      <AccordionRow label="Care" value={care} />
      <div className="border-t border-[#E8E8E8]" />
    </div>
  )
}
