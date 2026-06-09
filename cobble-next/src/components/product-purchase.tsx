"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { ProductColor } from "@/lib/products"
import { useSaved } from "@/context/SavedContext"
import { useCart } from "@/context/CartContext"
import { useLanguage } from "@/context/LanguageContext"

type Props = {
  slug: string
  name: string
  price: string
  img: string
  sku: string
  colors: ProductColor[]
  sizes: string[]
}

export function ProductPurchase({ slug, name, price, img, sku, colors, sizes }: Props) {
  const { t } = useLanguage()
  const pp = t.productPurchase
  const [qty, setQty] = useState(1)
  const { isSaved, toggle } = useSaved()
  const { addItem } = useCart()
  const router = useRouter()
  const saved = isSaved(slug)
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedSize, setSelectedSize] = useState(0)
  const [added, setAdded] = useState(false)

  const clampQty = (n: number) => setQty(Math.max(1, Math.min(99, n)))

  function handleAddToCart() {
    addItem({
      slug,
      name,
      price,
      img,
      qty,
      color: colors[selectedColor]?.name,
      size: sizes[selectedSize],
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div>
      {/* SKU */}
      <p className="mb-6 text-[11px] tracking-[1px] text-[#A2A2A2]">SKU: {sku}</p>

      {/* Quantity */}
      <div className="mb-5 flex items-center gap-4">
        <span className="w-16 text-[10px] font-semibold uppercase tracking-[2.2px] text-[#A2A2A2]">
          {pp.quantity}
        </span>
        <div className="inline-flex items-center border border-[#1E1E1E]">
          <button
            aria-label="Decrease quantity"
            onClick={() => clampQty(qty - 1)}
            className="flex h-10 w-10 items-center justify-center text-[16px] text-[#1E1E1E] transition-[color,transform] duration-200 hover:text-[#3CACB0] active:scale-[0.92]"
          >−</button>
          <span className="min-w-[40px] text-center text-[12px] tracking-[1px] text-[#1E1E1E]">{qty}</span>
          <button
            aria-label="Increase quantity"
            onClick={() => clampQty(qty + 1)}
            className="flex h-10 w-10 items-center justify-center text-[16px] text-[#1E1E1E] transition-[color,transform] duration-200 hover:text-[#3CACB0] active:scale-[0.92]"
          >+</button>
        </div>
      </div>

      {/* Color */}
      {colors.length > 0 && (
        <div className="mb-5 flex items-center gap-4">
          <span className="w-16 text-[10px] font-semibold uppercase tracking-[2.2px] text-[#A2A2A2]">
            {pp.color}
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
            {pp.size}
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

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleAddToCart}
          className="flex-1 py-4 text-[12px] font-medium uppercase tracking-[3px] text-white transition-[background-color,transform] duration-[350ms] hover:bg-[#3CACB0] active:translate-y-px active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-[#3CACB0] focus-visible:outline-offset-2"
          style={{ background: added ? "#3CACB0" : "#1E1E1E" }}
        >
          {added ? pp.added : pp.addToCart}
        </button>
        <button
          onClick={() => toggle(slug)}
          className="border px-7 py-4 text-[12px] font-medium uppercase tracking-[3px] transition-[background-color,color] duration-200 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-[#3CACB0] focus-visible:outline-offset-2"
          style={{
            borderColor: "var(--ink)",
            background: saved ? "var(--ink)" : "transparent",
            color: saved ? "var(--paper)" : "var(--ink)",
          }}
        >
          {saved ? pp.saved : pp.save}
        </button>
      </div>

      {/* View cart nudge */}
      {added && (
        <button
          onClick={() => router.push("/cart")}
          className="mt-3 w-full text-center text-[10px] uppercase tracking-[2px] text-[#3CACB0] transition-opacity duration-300 hover:opacity-70"
        >
          {pp.viewCart}
        </button>
      )}
    </div>
  )
}
