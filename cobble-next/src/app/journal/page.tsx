"use client"

import Image from "next/image"
import Link from "next/link"
import { Fragment, useState } from "react"
import { useLanguage } from "@/context/LanguageContext"

const POSTS = [
  {
    id: "brand-story",
    slug: "brand-story",
    catKey: "catStory",
    title: "Brand Story — Born of Wood",
    date: "October 2025",
    readTime: "8 min read",
    excerpt: "Time that has passed ultimately takes form as a wooden object. The story behind Cobble, from first cut to finished vessel.",
    img: "/journal/brand-story/hero2.jpg",
  },
  {
    id: "the-craft-behind-the-cup",
    slug: "the-craft-behind-the-cup",
    catKey: "catCraft",
    cats: ["craft"],
    title: "The Craft Behind the Cup",
    date: "May 2026",
    readTime: "5 min read",
    excerpt: "Wooden cups shaped by hand — each one a quiet record of the maker's patience and the material's grain.",
    img: "/journal/journal1.jpg",
  },
  {
    id: "from-wood-to-hand",
    slug: "from-wood-to-hand",
    catKey: "catProcess",
    cats: ["process", "craft"],
    title: "From Wood to Hand — Inside the Workshop",
    date: "May 2026",
    readTime: "6 min read",
    excerpt: "A morning among the gouges and shavings, where a single block slowly becomes something to hold.",
    img: "/journal/journal2.jpg",
  },
  {
    id: "light-and-shadow",
    slug: "light-and-shadow",
    catKey: "catStory",
    cats: ["story"],
    title: "Light & Shadow — Objects at Rest",
    date: "April 2026",
    readTime: "4 min read",
    excerpt: "On the quiet hour when a cup is not in use, and the way daylight settles into its grain.",
    img: "/journal/journal3.jpg",
  },
]

const CAT_KEYS = [
  { key: "all",         tKey: "catAll"       },
  { key: "craft",       tKey: "catCraft"     },
  { key: "process",     tKey: "catProcess"   },
  { key: "material",    tKey: "catMaterial"  },
  { key: "story",       tKey: "catStory"     },
  { key: "studio-note", tKey: "catStudioNote"},
] as const

type Post = (typeof POSTS)[number]
type JournalTKey = "catAll" | "catCraft" | "catProcess" | "catMaterial" | "catStory" | "catStudioNote"

export default function JournalPage() {
  const { t } = useLanguage()
  const j = t.journal
  const [active, setActive] = useState("all")

  const shown = active === "all"
    ? POSTS
    : POSTS.filter((p) => (p as { cats?: string[] }).cats?.includes(active))

  return (
    <section className="bg-white px-10 pb-24 pt-[72px]">
      {/* Title block */}
      <div className="mx-auto max-w-[720px] pb-2 text-center">
        <h1
          className="m-0 font-normal leading-[1.05] tracking-[-0.01em] text-[#1E1E1E]"
          style={{ fontFamily: "var(--font-crimson-text)", fontSize: "clamp(40px, 5vw, 56px)" }}
        >
          {j.title}
        </h1>
        <p
          className="mx-auto mt-5 max-w-[520px] text-[19px] leading-[1.7] tracking-[0.2px] text-[#1E1E1E]"
          style={{ fontFamily: "var(--font-crimson-text)", fontStyle: "italic" }}
        >
          {j.subtitle.split("\n").map((line, i) => (
            <Fragment key={i}>{line}{i === 0 && <br />}</Fragment>
          ))}
        </p>
      </div>

      {/* Category filter */}
      <div className="mt-11 flex flex-wrap items-center justify-center">
        {CAT_KEYS.map((cat, i) => (
          <Fragment key={cat.key}>
            {i > 0 && (
              <span aria-hidden="true" className="select-none text-[12px] text-[#E8E8E8]" style={{ margin: "0 22px" }}>|</span>
            )}
            <FilterTab
              label={j[cat.tKey as JournalTKey]}
              active={active === cat.key}
              onClick={() => setActive(cat.key)}
            />
          </Fragment>
        ))}
      </div>

      {/* Article grid */}
      {shown.length > 0 ? (
        <div className="mt-14 grid grid-cols-2 gap-x-10 gap-y-16">
          {shown.map((post) => (
            <ArticleCard key={post.id} post={post} catLabel={j[post.catKey as JournalTKey]} />
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-[12px] uppercase tracking-[1.5px] text-[#A2A2A2]">
          {j.noStories}
        </p>
      )}
    </section>
  )
}

function FilterTab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`group relative cursor-pointer border-none bg-transparent pb-1.5 text-[12px] font-medium uppercase tracking-[2.5px] whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[#3CACB0] focus-visible:outline-offset-4 focus-visible:rounded-sm ${
        active ? "text-[#1E1E1E]" : "text-[#A2A2A2] hover:text-[#1E1E1E]"
      }`}
    >
      {label}
      <span
        className={`absolute bottom-0 left-0 h-px transition-[width] duration-[250ms] ${
          active ? "w-full bg-[#1E1E1E]" : "w-0 bg-[#3CACB0] group-hover:w-full"
        }`}
      />
    </button>
  )
}

function ArticleCard({ post, catLabel }: { post: Post; catLabel: string }) {
  return (
    <Link href={`/journal/${post.slug}`} className="group block">
      <div className="relative w-full overflow-hidden bg-[#F9F9F9]" style={{ aspectRatio: "3 / 2" }}>
        <Image
          src={post.img}
          alt={post.title}
          fill
          className="object-cover object-center transition-transform duration-[550ms] group-hover:scale-[1.04]"
          style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
          sizes="(max-width: 1024px) 50vw, 45vw"
        />
      </div>
      <div className="pt-[18px]">
        <div className="mb-2.5">
          <span className="text-[10px] font-medium uppercase tracking-[2px] text-[#A2A2A2]">
            {catLabel}
          </span>
        </div>
        <p className="m-0 text-[16px] font-medium leading-[1.45] tracking-[0.2px] text-[#1E1E1E] transition-colors duration-200 group-hover:text-[#3CACB0]">
          {post.title}
        </p>
        <p className="mt-2.5 max-w-[480px] text-[12px] leading-[1.7] tracking-[0.2px] text-[#989898]">
          {post.excerpt}
        </p>
        <div className="mt-3.5 flex items-center gap-3">
          <span className="text-[10px] uppercase tracking-[2px] text-[#A2A2A2]">{post.date}</span>
          <span aria-hidden="true" className="h-px w-3.5 bg-[#E8E8E8]" />
          <span className="text-[10px] uppercase tracking-[2px] text-[#A2A2A2]">{post.readTime}</span>
        </div>
      </div>
    </Link>
  )
}
