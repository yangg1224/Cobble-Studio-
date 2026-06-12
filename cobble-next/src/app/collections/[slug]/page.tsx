import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { products } from "@/lib/products"
import { ProductCard } from "@/components/product-card"

const collectionMeta: Record<string, { label: string; img: string }> = {
  mug:    { label: "Mug",    img: "/collections/mug.png"    },
  scoop:  { label: "Scoop",  img: "/collections/scoop.jpg"  },
  spoon:  { label: "Spoon",  img: "/collections/spoon.jpg"  },
  clip:   { label: "Clip",   img: "/collections/clip.jpg"   },
  plate:  { label: "Plate",  img: "/collections/plate.jpg"  },
  vessel: { label: "Vessel", img: "/collections/vessel.jpg" },
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const meta = collectionMeta[slug]
  if (!meta) notFound()

  const collectionProducts = products.filter(
    (p) => p.collection.toLowerCase() === slug
  )

  return (
    <div className="min-h-screen bg-white px-5 pb-20 pt-8 md:px-10" style={{}}>


      {/* ← Back link */}
      <div className="mb-9">
        <Link
          href="/collections"
          className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[2px] text-[#1E1E1E] transition-[color,gap] duration-200 hover:text-[#3CACB0] hover:gap-3"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          All Collections
        </Link>
      </div>

      {/* Header: collection name + count */}
      <div className="mb-10 flex items-baseline gap-4">
        <h1 className="text-[22px] font-medium uppercase tracking-[6px] text-[#1E1E1E]">
          {meta.label}
        </h1>
        <span className="text-[11px] tracking-[1.5px] text-[#A2A2A2]">
          {collectionProducts.length} {collectionProducts.length === 1 ? "piece" : "pieces"}
        </span>
      </div>

      {/* Product grid — responsive: 2 cols on mobile, 4 on desktop */}
      {collectionProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4">
          {collectionProducts.map((p) => (
            <ProductCard key={p.slug} slug={p.slug} name={p.name} price={p.price} img={p.img} collection={p.collection} />
          ))}
        </div>
      ) : (
        <p className="py-12 text-center text-[11px] uppercase tracking-[2px] text-[#A2A2A2]">
          Pieces from the {meta.label} collection are coming soon.
        </p>
      )}
    </div>
  )
}

