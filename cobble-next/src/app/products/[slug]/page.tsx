"use client"

import { use, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { products } from "@/lib/products"
import { ProductPurchase } from "@/components/product-purchase"
import { useLanguage } from "@/context/LanguageContext"
import { useCart, type CartItem } from "@/context/CartContext"

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className="transition-transform duration-300"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const product = products.find((p) => p.slug === slug)
  if (!product) notFound()

  const { t } = useLanguage()
  const pp = t.productPage
  const { addItem } = useCart()

  const [specOpen, setSpecOpen] = useState(true)
  const [careOpen, setCareOpen] = useState(false)

  const specRows = [
    { label: pp.capacity,  value: product.spec.capacity  },
    { label: pp.material,  value: product.spec.material  },
    { label: pp.finish,    value: product.spec.finish    },
    { label: pp.dimension, value: product.spec.dimension },
  ].filter(r => r.value)

  const careLines = product.careGuide.split("\n")

  const related = products
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-white">

      {/* ── MAIN PRODUCT SECTION ── */}
      <div className="mx-auto max-w-[1320px] px-5 pt-8 pb-20 md:px-10">

        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2" aria-label="Breadcrumb">
          {[
            { label: pp.home,             href: "/"                                               },
            { label: pp.shop,             href: "/collections"                                    },
            { label: product.collection,  href: `/collections/${product.collection.toLowerCase()}` },
            { label: product.displayName, href: null                                              },
          ].map((crumb, i, arr) => (
            <span key={crumb.label} className="flex items-center gap-2">
              {crumb.href ? (
                <Link href={crumb.href} className="text-[10px] tracking-[1px] text-[#A2A2A2] transition-colors duration-200 hover:text-[#3CACB0]">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[10px] tracking-[1px] text-[#1E1E1E]">{crumb.label}</span>
              )}
              {i < arr.length - 1 && <span className="text-[10px] text-[#D0D0D0]">/</span>}
            </span>
          ))}
        </nav>

        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[1.1fr_1fr] md:gap-16">

          {/* Left — main image */}
          <div className="group relative overflow-hidden bg-[#F9F9F9]" style={{ aspectRatio: "4/5" }}>
            <Image
              src={product.img}
              alt={product.name}
              fill
              priority
              className="object-contain transition-transform duration-[550ms] group-hover:scale-[1.03]"
              style={{ transitionTimingFunction: "cubic-bezier(0.25,0.46,0.45,0.94)" }}
              sizes="(max-width:1440px) 55vw, 720px"
            />
          </div>

          {/* Right — info panel */}
          <div className="pt-2">

            <h1
              className="mb-1 text-[#1E1E1E]"
              style={{ fontFamily: "var(--font-serif)", fontSize: "34px", fontWeight: 400, letterSpacing: "-0.01em", lineHeight: 1.2 }}
            >
              {product.name}
            </h1>

            <p className="mb-5 text-[11px] tracking-[0.5px] text-[#A2A2A2]">SKU: {product.sku}</p>
            <p className="mb-7 text-[22px] tracking-[0.5px] text-[#1E1E1E]">{product.price}</p>

            <ProductPurchase
              slug={product.slug}
              name={product.name}
              price={product.price}
              img={product.img}
              sku={product.sku}
              colors={product.colors}
              sizes={product.sizes}
            />

            <button className="mt-5 flex items-center gap-1.5 text-[11px] tracking-[1px] text-[#1E1E1E] transition-[color] duration-200 hover:text-[#3CACB0]">
              {pp.shippingInfo}
              <ArrowRight />
            </button>

            {/* Accordion: Specification */}
            <div className="mt-6 border-t border-[#E8E8E8]">
              <button
                onClick={() => setSpecOpen((v) => !v)}
                className="flex w-full items-center justify-between py-4 text-[11px] font-medium uppercase tracking-[2px] text-[#1E1E1E] transition-[color] duration-200 hover:text-[#3CACB0] focus-visible:outline-none"
              >
                {pp.specification}
                <ChevronIcon open={specOpen} />
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: specOpen ? "500px" : "0px", opacity: specOpen ? 1 : 0 }}
              >
                <dl className="flex flex-col gap-3 pb-5">
                  {specRows.map(({ label, value }) => (
                    <div key={label} className="flex gap-4">
                      <dt className="w-20 flex-shrink-0 text-[10px] tracking-[0.5px] text-[#A2A2A2]">{label}</dt>
                      <dd className="text-[11px] leading-[1.6] tracking-[0.3px] text-[#1E1E1E]">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Accordion: Care Guide */}
            {product.careGuide && (
              <div className="border-t border-[#E8E8E8]">
                <button
                  onClick={() => setCareOpen((v) => !v)}
                  className="flex w-full items-center justify-between py-4 text-[11px] font-medium uppercase tracking-[2px] text-[#1E1E1E] transition-[color] duration-200 hover:text-[#3CACB0] focus-visible:outline-none"
                >
                  {pp.careGuide}
                  <ChevronIcon open={careOpen} />
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: careOpen ? "800px" : "0px", opacity: careOpen ? 1 : 0 }}
                >
                  <div className="pb-5 text-[11px] leading-[1.7] tracking-[0.3px] text-[#1E1E1E]">
                    {careLines.map((line, i) => {
                      const isHeader = line.startsWith("[") && line.endsWith("]")
                      const isEmpty  = line.trim() === ""
                      if (isEmpty)  return <div key={i} className="h-2" />
                      if (isHeader) return <p key={i} className="mt-2 text-[10px] font-semibold uppercase tracking-[1.5px] text-[#A2A2A2]">{line.slice(1, -1)}</p>
                      return <p key={i}>{line}</p>
                    })}
                  </div>
                </div>
              </div>
            )}
            <div className="border-t border-[#E8E8E8]" />
          </div>
        </div>
      </div>

      {/* ── EDITORIAL — magazine single-column ── */}
      {product.editorial.length > 0 && (
        <div className="border-t border-[#E8E8E8] py-20 md:py-28">

          {/* Section label */}
          <p className="mb-16 text-center text-[10px] font-semibold uppercase tracking-[4px] text-[#A2A2A2]">
            {pp.productDetail}
          </p>

          {/* Intro description — centered narrow column */}
          <p className="mx-auto mb-20 max-w-[520px] px-6 text-center text-[13px] leading-[1.9] tracking-[0.3px] text-[#989898] md:px-0">
            {product.description}
          </p>

          {/* Editorial spreads */}
          <div className="flex flex-col items-center gap-24 md:gap-32">
            {product.editorial.map((item, i) => (
              <div key={i} className="w-full">
                {/* Image — centered, large */}
                <div
                  className="relative mx-auto overflow-hidden"
                  style={{ aspectRatio: "4/3", maxWidth: "860px", width: "100%" }}
                >
                  <Image
                    src={item.img}
                    alt={item.title ?? `Editorial ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width:960px) 100vw, 860px"
                  />
                </div>

                {/* Text — centered below image */}
                <div className="mx-auto mt-7 max-w-[520px] px-6 text-center md:px-0">
                  {item.title && (
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[2.5px] text-[#1E1E1E]">
                      {item.title}
                    </p>
                  )}
                  <p className="text-[12px] leading-[1.9] tracking-[0.3px] text-[#989898]">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── RELATED PRODUCTS ── */}
      {related.length > 0 && (
        <div className="border-t border-[#E8E8E8] py-20 md:py-24">
          <div className="mx-auto max-w-[1320px] px-5 md:px-10">
            <p className="mb-12 text-center text-[10px] font-semibold uppercase tracking-[4px] text-[#A2A2A2]">
              {pp.relatedProducts}
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 md:gap-10">
              {related.map((rp) => (
                <RelatedProductCard
                  key={rp.slug}
                  slug={rp.slug}
                  name={rp.name}
                  price={rp.price}
                  img={rp.img}
                  quickAddLabel={pp.quickAdd}
                  addToCartPayload={{ slug: rp.slug, name: rp.name, price: rp.price, img: rp.img, qty: 1 }}
                  onQuickAdd={(payload) => addItem(payload)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

type QuickAddPayload = Omit<CartItem, "qty"> & { qty?: number }

type RelatedCardProps = {
  slug: string
  name: string
  price: string
  img: string
  quickAddLabel: string
  addToCartPayload: QuickAddPayload
  onQuickAdd: (payload: QuickAddPayload) => void
}

function RelatedProductCard({ slug, name, price, img, quickAddLabel, addToCartPayload, onQuickAdd }: RelatedCardProps) {
  const [added, setAdded] = useState(false)

  function handleQuickAdd(e: React.MouseEvent) {
    e.preventDefault()
    onQuickAdd(addToCartPayload)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="group flex flex-col">
      <Link href={`/products/${slug}`} className="block">
        <div className="relative w-full overflow-hidden bg-[#F9F9F9]" style={{ aspectRatio: "4/5" }}>
          <Image
            src={img}
            alt={name}
            fill
            className="object-contain transition-transform duration-[550ms] group-hover:scale-[1.04]"
            style={{ transitionTimingFunction: "cubic-bezier(0.25,0.46,0.45,0.94)" }}
            sizes="(max-width:640px) 90vw, 33vw"
          />
        </div>
        <div className="mt-4">
          <p className="mb-1 text-[12px] leading-[1.5] tracking-[0.3px] text-[#1E1E1E]">{name}</p>
          <p className="text-[11px] tracking-[0.5px] text-[#A2A2A2]">{price}</p>
        </div>
      </Link>

      {/* Minimal text-only quick add */}
      <button
        onClick={handleQuickAdd}
        className="mt-4 w-full border-t border-[#E8E8E8] pt-3 text-left text-[9px] uppercase tracking-[2.5px] text-[#B0B0B0] transition-[color] duration-200 hover:text-[#1E1E1E] focus-visible:outline-none"
      >
        {added ? "✓  Added" : `+ ${quickAddLabel}`}
      </button>
    </div>
  )
}
