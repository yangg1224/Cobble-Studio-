"use client"

import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/context/CartContext"

function parsePrice(price: string): number {
  return parseFloat(price.replace(/[^0-9.]/g, "")) || 0
}

function formatCAD(amount: number): string {
  return `CA$${amount.toFixed(2).replace(/\.00$/, "")}`
}

export function CartClient() {
  const { items, removeItem, updateQty, clearCart } = useCart()

  const subtotal = items.reduce((sum, item) => sum + parsePrice(item.price) * item.qty, 0)
  const shipping = subtotal >= 100 ? 0 : 12
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 text-center">
        <div className="mb-2 text-[#E8E8E8]">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
        </div>
        <p
          className="text-[#1E1E1E]"
          style={{ fontFamily: "var(--font-serif)", fontSize: 28, fontWeight: 400, letterSpacing: "-0.02em" }}
        >
          Your cart is empty
        </p>
        <p className="max-w-[300px] text-[12px] leading-[1.8] tracking-[0.4px] text-[#A2A2A2]">
          Explore our handcrafted collections and find something you love.
        </p>
        <Link
          href="/collections"
          className="mt-2 inline-block bg-[#1E1E1E] px-10 py-4 text-[11px] font-medium uppercase tracking-[3px] text-white transition-[background-color,transform] duration-[350ms] hover:bg-[#3CACB0] active:scale-[0.99]"
        >
          Shop Now
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[1200px] px-6 pb-24 pt-10 md:px-10">
      {/* Page header */}
      <div className="mb-10 flex items-baseline justify-between">
        <h1
          className="text-[#1E1E1E]"
          style={{ fontFamily: "var(--font-serif)", fontSize: 36, fontWeight: 400, letterSpacing: "-0.02em" }}
        >
          Your Cart
        </h1>
        <span className="text-[11px] tracking-[1px] text-[#A2A2A2]">
          {items.reduce((s, i) => s + i.qty, 0)} item{items.reduce((s, i) => s + i.qty, 0) !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
        {/* Line items */}
        <div>
          {/* Column headers */}
          <div className="mb-5 hidden grid-cols-[1fr_120px_80px_32px] gap-4 border-b border-[#E8E8E8] pb-3 md:grid">
            {["Product", "Qty", "Price", ""].map((h) => (
              <span key={h} className="text-[9px] font-semibold uppercase tracking-[2.2px] text-[#A2A2A2]">
                {h}
              </span>
            ))}
          </div>

          <ul className="flex flex-col divide-y divide-[#F0F0F0]">
            {items.map((item) => {
              const lineTotal = parsePrice(item.price) * item.qty
              return (
                <li key={`${item.slug}-${item.color}-${item.size}`} className="py-7">
                  <div className="flex gap-5 md:grid md:grid-cols-[1fr_120px_80px_32px] md:items-center md:gap-4">
                    {/* Product info */}
                    <div className="flex min-w-0 flex-1 gap-4">
                      <Link href={`/products/${item.slug}`} className="flex-shrink-0">
                        <div className="relative h-[100px] w-[80px] overflow-hidden bg-[#F9F9F9]">
                          <Image
                            src={item.img}
                            alt={item.name}
                            fill
                            className="object-contain transition-transform duration-300 hover:scale-[1.04]"
                            sizes="80px"
                          />
                        </div>
                      </Link>
                      <div className="min-w-0 pt-1">
                        <Link
                          href={`/products/${item.slug}`}
                          className="block text-[12px] font-medium uppercase leading-[1.4] tracking-[1.4px] text-[#1E1E1E] transition-colors duration-200 hover:text-[#3CACB0]"
                        >
                          {item.name}
                        </Link>
                        <div className="mt-2 flex flex-col gap-0.5">
                          {item.color && (
                            <span className="text-[10px] tracking-[0.8px] text-[#A2A2A2]">
                              Color: {item.color}
                            </span>
                          )}
                          {item.size && (
                            <span className="text-[10px] tracking-[0.8px] text-[#A2A2A2]">
                              Size: {item.size}
                            </span>
                          )}
                        </div>
                        {/* Mobile price */}
                        <p className="mt-2 text-[12px] tracking-[1px] text-[#1E1E1E] md:hidden">
                          {formatCAD(lineTotal)}
                        </p>
                      </div>
                    </div>

                    {/* Qty stepper */}
                    <div className="flex items-center md:justify-start">
                      <div className="inline-flex items-center border border-[#1E1E1E]">
                        <button
                          aria-label="Decrease"
                          onClick={() => updateQty(item.slug, item.color, item.size, item.qty - 1)}
                          className="flex h-8 w-8 items-center justify-center text-[14px] text-[#1E1E1E] transition-[color,transform] duration-150 hover:text-[#3CACB0] active:scale-[0.9]"
                        >
                          −
                        </button>
                        <span className="min-w-[28px] text-center text-[11px] tracking-[1px] text-[#1E1E1E]">
                          {item.qty}
                        </span>
                        <button
                          aria-label="Increase"
                          onClick={() => updateQty(item.slug, item.color, item.size, item.qty + 1)}
                          className="flex h-8 w-8 items-center justify-center text-[14px] text-[#1E1E1E] transition-[color,transform] duration-150 hover:text-[#3CACB0] active:scale-[0.9]"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Line price — desktop */}
                    <p className="hidden text-[12px] tracking-[1px] text-[#1E1E1E] md:block">
                      {formatCAD(lineTotal)}
                    </p>

                    {/* Remove */}
                    <button
                      aria-label="Remove item"
                      onClick={() => removeItem(item.slug, item.color, item.size)}
                      className="flex h-8 w-8 flex-shrink-0 items-center justify-center text-[#D0D0D0] transition-[color,transform] duration-150 hover:text-[#1E1E1E] active:scale-[0.9]"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>

          {/* Clear cart */}
          <div className="mt-4 border-t border-[#F0F0F0] pt-5">
            <button
              onClick={clearCart}
              className="text-[10px] uppercase tracking-[2px] text-[#A2A2A2] transition-colors duration-200 hover:text-[#1E1E1E]"
            >
              Clear cart
            </button>
          </div>
        </div>

        {/* Order summary */}
        <div className="lg:pt-0">
          <div className="bg-[#F9F9F9] p-7">
            <p className="mb-7 text-[11px] font-semibold uppercase tracking-[3px] text-[#1E1E1E]">
              Order Summary
            </p>

            <dl className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <dt className="text-[11px] tracking-[0.8px] text-[#A2A2A2]">Subtotal</dt>
                <dd className="text-[12px] tracking-[1px] text-[#1E1E1E]">{formatCAD(subtotal)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-[11px] tracking-[0.8px] text-[#A2A2A2]">Shipping</dt>
                <dd className="text-[12px] tracking-[1px] text-[#1E1E1E]">
                  {shipping === 0 ? "Free" : formatCAD(shipping)}
                </dd>
              </div>
              {shipping > 0 && (
                <p className="text-[10px] leading-[1.6] tracking-[0.4px] text-[#3CACB0]">
                  Add {formatCAD(100 - subtotal)} more for free shipping
                </p>
              )}
              <div className="my-1 h-px bg-[#E8E8E8]" />
              <div className="flex items-center justify-between">
                <dt className="text-[12px] font-medium uppercase tracking-[1.5px] text-[#1E1E1E]">Total</dt>
                <dd className="text-[15px] tracking-[1px] text-[#1E1E1E]">{formatCAD(total)}</dd>
              </div>
            </dl>

            <button className="mt-8 w-full bg-[#1E1E1E] py-4 text-[12px] font-medium uppercase tracking-[3px] text-white transition-[background-color,transform] duration-[350ms] hover:bg-[#3CACB0] active:translate-y-px active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-[#3CACB0] focus-visible:outline-offset-2">
              Proceed to Checkout
            </button>

            <Link
              href="/collections"
              className="mt-4 block text-center text-[10px] uppercase tracking-[2px] text-[#A2A2A2] transition-colors duration-200 hover:text-[#1E1E1E]"
            >
              Continue Shopping
            </Link>
          </div>

          {/* Trust signals */}
          <ul className="mt-5 flex flex-col gap-2.5 px-1">
            {[
              "Free shipping on orders over CA$100",
              "Made in Canada",
              "Secure checkout",
            ].map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-[10px] tracking-[0.8px] text-[#A2A2A2]">
                <span className="text-[#3CACB0]">—</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
