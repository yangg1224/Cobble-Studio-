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
      <p className="py-8 text-center text-[16px] font-medium uppercase tracking-[3px] text-[#1E1E1E] md:py-10 md:text-[22px] md:tracking-[6px]">
        {t.collections.allCollections}
      </p>

      <div className="grid grid-cols-2 gap-3 px-4 pb-10 md:grid-cols-3 md:gap-4 md:px-10 md:pb-14">
        {collections.map((col) => (
          <Link key={col.slug} href={`/collections/${col.slug}`} className="group relative block overflow-hidden" style={{ aspectRatio: "1/1" }}>
            <Image
              src={col.img}
              alt={col.name}
              fill
              sizes="(max-width: 768px) 50vw, 34vw"
              quality={100}
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
            <span className="absolute bottom-3 left-3 text-[11px] font-medium uppercase tracking-[2px] text-white md:bottom-4 md:left-4 md:text-[15px] md:tracking-[3px]" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.45)" }}>
              {col.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
