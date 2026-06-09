"use client"

import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"

const collections = [
  { name: "Mug",    slug: "mug",    img: "/collections/mug.png"    },
  { name: "Scoop",  slug: "scoop",  img: "/collections/scoop.jpg"  },
  { name: "Spoon",  slug: "spoon",  img: "/collections/spoon.jpg"  },
  { name: "Clip",   slug: "clip",   img: "/collections/clip.jpg"   },
  { name: "Plate",  slug: "plate",  img: "/collections/plate.jpg"  },
  { name: "Vessel", slug: "vessel", img: "/collections/vessel.jpg" },
]

export default function CollectionsPage() {
  const { t } = useLanguage()

  return (
    <div className="bg-white">
      <p className="py-10 text-center text-[22px] font-medium uppercase tracking-[6px] text-[#1E1E1E]">
        {t.collections.allCollections}
      </p>

      <div className="grid grid-cols-3 gap-4 px-10 pb-14">
        {collections.map((col) => (
          <Link key={col.slug} href={`/collections/${col.slug}`} className="group relative block overflow-hidden" style={{ aspectRatio: "1/1" }}>
            <Image
              src={col.img}
              alt={col.name}
              fill
              sizes="(max-width: 768px) 100vw, 34vw"
              quality={100}
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
            <span className="absolute bottom-4 left-4 text-[15px] font-medium uppercase tracking-[3px] text-white" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.45)" }}>
              {col.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
