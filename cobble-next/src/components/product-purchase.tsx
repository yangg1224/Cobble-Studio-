"use client"

import { useState } from "react"
import type { ProductColor } from "@/lib/products"

type Props = {
  price: string
  sku: string
  colors: ProductColor[]
  sizes: string[]
}

export function ProductPurchase({ sku, colors, sizes }: Props) {
  const [qty, setQty] = useState(1)
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedSize, setSelectedSize] = useState(0)

  const clampQty = (n: number) => setQty(Math.max(1, Math.min(99, n)))

  return (
    <div>
      {/* SKU */}
      <p className="mb-6 text-[11px] tracking-[1px] text-[#A2A2A2]">SKU: {sku}</p>

      {/* Quantity — DS: eyebrow label + border-box stepper */}
      <div className="mb-5 flex items-center gap-4">
        <span className="w-16 text-[10px] font-semibold uppercase tracking-[2.2px] text-[#A2A2A2]">
          Quantity
        </span>
        {/* DS QuantityStepper: border box, teal on hover, shrink on press */}
        <div className="inline-flex items-center border border-[#1E1E1E]">
          <button
            aria-label="Decrease quantity"
            onClick={() => clampQty(qty - 1)}
            className="flex h-10 w-10 items-center justify-center text-[16px] text-[#1E1E1E] transition-[color,transform] duration-200 hover:text-[#3CACB0] active:scale-[0.92]"
          >
            −
          </button>
          <span className="min-w-[40px] text-center text-[12px] tracking-[1px] text-[#1E1E1E]">
            {qty}
          </span>
          <button
            aria-label="Increase quantity"
            onClick={() => clampQty(qty + 1)}
            className="flex h-10 w-10 items-center justify-center text-[16px] text-[#1E1E1E] transition-[color,transform] duration-200 hover:text-[#3CACB0] active:scale-[0.92]"
          >
            +
          </button>
        </div>
      </div>

      {/* Color */}
      {colors.length > 0 && (
        <div className="mb-5 flex items-center gap-4">
          <span className="w-16 text-[10px] font-semibold uppercase tracking-[2.2px] text-[#A2A2A2]">
            Color
          </span>
          <div className="flex gap-2.5">
            {colors.map((c, i) => (
              <button
                key={c.name}
                aria-label={c.name}
                onClick={() => setSelectedColor(i)}
                className="relative flex h-6 w-6 items-center justify-center rounded-full transition-transform duration-150 hover:scale-110 focus-visible:outline-2 focus-visible:outline-[#3CACB0] focus-visible:outline-offset-2"
                style={{ backgroundColor: c.hex }}
              >
                {selectedColor === i && (
                  <span className="absolute inset-[-3px] rounded-full border border-[#1E1E1E]" aria-hidden="true" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size */}
      {sizes.length > 0 && (
        <div className="mb-8 flex items-center gap-4">
          <span className="w-16 text-[10px] font-semibold uppercase tracking-[2.2px] text-[#A2A2A2]">
            Size
          </span>
          <div className="flex gap-2">
            {sizes.map((s, i) => (
              <button
                key={s}
                onClick={() => setSelectedSize(i)}
                className={`px-3.5 py-1.5 text-[10px] tracking-[1px] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[#3CACB0] focus-visible:outline-offset-2 ${
                  selectedSize === i
                    ? "border border-[#1E1E1E] text-[#1E1E1E]"
                    : "border border-[#D8D8D8] text-[#A2A2A2] hover:border-[#1E1E1E] hover:text-[#1E1E1E]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Buttons — DS: solid "Add to Cart" flex-1 + outline "Save" */}
      <div className="flex gap-3">
        <button className="flex-1 bg-[#1E1E1E] py-4 text-[12px] font-medium uppercase tracking-[3px] text-white transition-[background-color,transform] duration-[350ms] hover:bg-[#3CACB0] active:translate-y-px active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-[#3CACB0] focus-visible:outline-offset-2">
          Add to Cart
        </button>
        <button className="border border-[#1E1E1E] px-7 py-4 text-[12px] font-medium uppercase tracking-[3px] text-[#1E1E1E] transition-[background-color,color] duration-200 hover:bg-[#1E1E1E] hover:text-white active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-[#3CACB0] focus-visible:outline-offset-2">
          Save
        </button>
      </div>
    </div>
  )
}
