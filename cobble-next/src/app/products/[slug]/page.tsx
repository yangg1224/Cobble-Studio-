import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { products } from "@/lib/products"
import { ProductPurchase } from "@/components/product-purchase"

const FEATURES = [
  "Free shipping over $100",
  "Made in Canada",
  "One of a kind — ships in 3–5 days",
]

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)
  if (!product) notFound()

  const careLines = product.careGuide.split("\n")

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-[1320px] px-10 pb-24 pt-8">

        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2" aria-label="Breadcrumb">
          {[
            { label: "Home",              href: "/"                                              },
            { label: "Shop",              href: "/collections"                                   },
            { label: product.collection,  href: `/collections/${product.collection.toLowerCase()}` },
            { label: product.displayName, href: null                                             },
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

        {/* ── PRODUCT DETAIL ── */}
        {/* DS spec: grid 1.1fr 1fr, gap 64px */}
        <div className="grid items-start gap-16" style={{ gridTemplateColumns: "1.1fr 1fr" }}>

          {/* Left — image (DS: 4/5 aspect, mist bg, object-contain) */}
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

          {/* Right — info panel (DS spec) */}
          <div className="pt-4">

            {/* Collection tag — outline pill */}
            <span className="mb-5 inline-flex items-center border border-[#1E1E1E] px-3.5 py-1 text-[10px] font-medium uppercase tracking-[2px] text-[#1E1E1E]"
              style={{ borderRadius: 999 }}>
              {product.collection} Collection
            </span>

            {/* Product name — DS: serif 40px, 400, -0.02em tracking, 1.1 line-height */}
            <h1
              className="mb-3 text-[#1E1E1E]"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "40px",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              {product.name}
            </h1>

            {/* Price */}
            <p className="mb-7 text-[18px] tracking-[1px] text-[#1E1E1E]">
              {product.price}
            </p>

            {/* Description */}
            <p className="mb-9 max-w-[380px] text-[13px] leading-[1.9] tracking-[0.4px] text-[#989898]">
              {product.description} Each piece carries the grain and small irregularities of the wood it came from — no two are alike.
            </p>

            {/* Purchase controls (client) */}
            <ProductPurchase
              slug={product.slug}
              price={product.price}
              sku={product.sku}
              colors={product.colors}
              sizes={product.sizes}
            />

            {/* Feature list — DS spec */}
            <ul className="mt-10 flex flex-col gap-3 border-t border-[#E8E8E8] pt-6">
              {FEATURES.map((f) => (
                <li key={f} className="text-[11px] tracking-[1.2px] text-[#989898]">
                  — {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── PRODUCT DETAIL editorial ── */}
        {product.editorial.length > 0 && (
          <div className="mt-24">
            <p className="mb-10 text-center text-[12px] font-semibold uppercase tracking-[4px] text-[#1E1E1E]">
              Product Detail
            </p>
            <div className="grid grid-cols-2 gap-16">
              {/* Editorial images + captions — left column */}
              <div className="flex flex-col gap-8">
                {product.editorial.map((item, i) => (
                  <div key={i}>
                    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
                      <Image
                        src={item.img}
                        alt={item.title ?? `Editorial ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="40vw"
                      />
                    </div>
                    <div className="mt-3">
                      {item.title && (
                        <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-[1.5px] text-[#1E1E1E]">
                          {item.title}
                        </p>
                      )}
                      <p className="text-[11px] leading-[1.65] tracking-[0.3px] text-[#1E1E1E]">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Spec + Care Guide — right column */}
              <div className="pt-2">
                {/* Specification */}
                <section className="mb-10">
                  <p className="mb-5 text-[11px] font-medium uppercase tracking-[3px] text-[#1E1E1E]">
                    Specification
                  </p>
                  <dl className="flex flex-col gap-4">
                    {[
                      { label: "Capacity",  value: product.spec.capacity  },
                      { label: "Material",  value: product.spec.material  },
                      { label: "Finish",    value: product.spec.finish    },
                      { label: "Dimension", value: product.spec.dimension },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <dt className="text-[11px] tracking-[0.5px] text-[#A2A2A2]">{label}</dt>
                        <dd className="mt-0.5 text-[12px] leading-[1.55] tracking-[0.3px] text-[#1E1E1E]">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </section>

                <div className="mb-10 h-px bg-[#E8E8E8]" />

                {/* Care Guide */}
                {product.careGuide && (
                  <section>
                    <p className="mb-5 text-[11px] font-medium uppercase tracking-[3px] text-[#1E1E1E]">
                      Care Guide
                    </p>
                    <div className="text-[11px] leading-[1.7] tracking-[0.3px] text-[#1E1E1E]">
                      {careLines.map((line, i) => {
                        const isHeader = line.startsWith("[") && line.endsWith("]")
                        const isEmpty  = line.trim() === ""
                        if (isEmpty)   return <div key={i} className="h-3" />
                        if (isHeader)  return <p key={i} className="mt-1 font-semibold">{line}</p>
                        return <p key={i}>{line}</p>
                      })}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
