"use client"

import { use } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useLanguage } from "@/context/LanguageContext"

// ─── Static post metadata (slugs, images, dates) ─────────────────────────────

type PostMeta = {
  slug: string
  date: string
  readTime: string
  img?: string
  layout: "standard" | "brand-story"
}

const POST_META: Record<string, PostMeta> = {
  "brand-story": {
    slug: "brand-story",
    date: "October 2025",
    readTime: "8",
    layout: "brand-story",
  },
  "the-craft-behind-the-cup": {
    slug: "the-craft-behind-the-cup",
    date: "May 2026",
    readTime: "5",
    img: "/journal/journal1.jpg",
    layout: "standard",
  },
  "from-wood-to-hand": {
    slug: "from-wood-to-hand",
    date: "May 2026",
    readTime: "6",
    img: "/journal/journal2.jpg",
    layout: "standard",
  },
  "light-and-shadow": {
    slug: "light-and-shadow",
    date: "April 2026",
    readTime: "4",
    img: "/journal/journal3.jpg",
    layout: "standard",
  },
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const meta = POST_META[slug]
  if (!meta) notFound()

  const { t } = useLanguage()
  const jc = t.journalContent

  if (meta.layout === "brand-story") {
    return <BrandStoryLayout meta={meta} jc={jc} journalTitle={t.journal.title} />
  }

  const postContent = jc.posts[slug]
  if (!postContent) notFound()

  return <StandardLayout meta={meta} content={postContent} jc={jc} journalTitle={t.journal.title} />
}

// ─── Brand Story layout ───────────────────────────────────────────────────────

function BrandStoryLayout({
  meta,
  jc,
  journalTitle,
}: {
  meta: PostMeta
  jc: ReturnType<typeof useLanguage>["t"]["journalContent"]
  journalTitle: string
}) {
  const bs = jc.brandStory
  return (
    <div className="bg-[#f9f9f9] min-h-screen pb-0">

      {/* Breadcrumb */}
      <div className="px-20 pt-10 hidden md:flex items-center gap-2">
        <Link href="/journal" className="text-[10px] tracking-[1px] text-[#a2a2a2] transition-colors hover:text-[#3CACB0]">
          {journalTitle}
        </Link>
        <span className="text-[10px] text-[#d0d0d0]">/</span>
        <span className="text-[10px] tracking-[1px] text-[#1e1e1e]">{jc.brandStoryBreadcrumb}</span>
      </div>

      {/* Hero title */}
      <div className="flex items-center justify-center pt-[160px] pb-[50px]">
        <h1
          className="text-[36px] text-[#1e1e1e] text-center tracking-[1.8px] leading-[58.2px] font-normal"
          style={{ fontFamily: "var(--font-crimson-text)" }}
        >
          {journalTitle.toUpperCase()}
        </h1>
      </div>

      {/* Poem */}
      <div
        className="text-center text-[16px] text-[#1e1e1e] tracking-[0.8px] leading-[25.9px] pb-6"
        style={{ fontFamily: "var(--font-crimson-text)" }}
      >
        <p>{bs.poem}</p>
        <p className="mt-6" style={{ fontFamily: "'LXGW WenKai Mono TC', 'Noto Serif SC', 'Hiragino Mincho ProN', serif" }}>
          始于木 · 终于器 · 善于用
        </p>
        <div className="mt-6">
          {bs.poemLines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </div>

      {/* Hero image 1 */}
      <div className="px-20 py-[10px]">
        <div className="relative w-full h-[722px]">
          <Image src="/journal/brand-story/hero1.jpg" alt="Workshop — drilling detail" fill priority className="object-cover" sizes="(max-width: 1440px) 100vw, 1440px" />
        </div>
      </div>

      {/* Attribution */}
      <div className="px-20 py-[50px]">
        <p className="text-[16px] text-[#1e1e1e] tracking-[0.8px] leading-[25.9px] max-w-[860px]" style={{ fontFamily: "var(--font-crimson-text)" }}>
          {bs.attribution}
        </p>
      </div>

      {/* Three-column image section */}
      <div className="flex items-start justify-between w-full">
        <div className="relative shrink-0" style={{ height: "493px", aspectRatio: "340/374" }}>
          <Image src="/journal/brand-story/carve-close.jpg" alt="Wood carving, close-up" fill className="object-cover" sizes="35vw" />
        </div>
        <div className="shrink-0 w-[263px]" aria-hidden="true" />
        <p className="shrink-0 w-[287px] text-[16px] leading-[25.9px] tracking-[0.8px] text-[#1e1e1e] self-center" style={{ fontFamily: "var(--font-crimson-text)" }}>
          {bs.caption1}
        </p>
        <div className="relative shrink-0 w-[277px] h-[493px]">
          <Image src="/journal/brand-story/workshop.jpg" alt="Workshop, portrait" fill className="object-cover object-top" sizes="25vw" />
        </div>
      </div>

      {/* Wide image left + text right */}
      <div className="px-20 py-[50px] flex items-end gap-[262px]">
        <div className="relative flex-1 h-[462px]">
          <Image src="/journal/brand-story/tools.jpg" alt="Woodworking tools and process" fill className="object-cover" sizes="(max-width: 1440px) 60vw, 821px" />
        </div>
        <p className="shrink-0 w-[197px] text-[16px] leading-[25.9px] tracking-[0.8px] text-[#1e1e1e]" style={{ fontFamily: "var(--font-crimson-text)" }}>
          {bs.caption2}
        </p>
      </div>

      {/* Hero image 2 */}
      <div className="py-[50px]">
        <div className="relative w-full h-[722px]">
          <Image src="/journal/brand-story/hero2.jpg" alt="Finished wooden vessels" fill className="object-cover" sizes="100vw" />
        </div>
      </div>

      {/* Meta footer */}
      <div className="px-20 py-10 flex items-center justify-between border-t border-[#e8e8e8]">
        <div className="flex items-center gap-4">
          <span className="text-[10px] uppercase tracking-[2px] text-[#a2a2a2]">{jc.brandStoryBreadcrumb}</span>
          <span className="h-px w-4 bg-[#e8e8e8]" />
          <span className="text-[10px] uppercase tracking-[2px] text-[#a2a2a2]">{meta.date}</span>
          <span className="h-px w-4 bg-[#e8e8e8]" />
          <span className="text-[10px] uppercase tracking-[2px] text-[#a2a2a2]">{meta.readTime} {jc.minRead}</span>
        </div>
        <Link href="/journal" className="text-[11px] uppercase tracking-[2.5px] text-[#a2a2a2] transition-colors hover:text-[#1e1e1e]">
          {jc.backToJournal}
        </Link>
      </div>
    </div>
  )
}

// ─── Standard article layout ──────────────────────────────────────────────────

function StandardLayout({
  meta,
  content,
  jc,
  journalTitle,
}: {
  meta: PostMeta
  content: { category: string; title: string; body: string[] }
  jc: ReturnType<typeof useLanguage>["t"]["journalContent"]
  journalTitle: string
}) {
  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-[860px] px-10 pt-16 pb-24">

        {/* Breadcrumb */}
        <nav className="mb-12 flex items-center gap-2" aria-label="Breadcrumb">
          <Link href="/journal" className="text-[10px] tracking-[1px] text-[#a2a2a2] transition-colors hover:text-[#3CACB0]">
            {journalTitle}
          </Link>
          <span className="text-[10px] text-[#d0d0d0]">/</span>
          <span className="text-[10px] tracking-[1px] text-[#1e1e1e]">{content.title}</span>
        </nav>

        {/* Meta */}
        <div className="mb-6 flex items-center gap-4">
          <span className="text-[10px] font-medium uppercase tracking-[2px] text-[#a2a2a2]">{content.category}</span>
          <span className="h-px w-4 bg-[#e8e8e8]" />
          <span className="text-[10px] uppercase tracking-[2px] text-[#a2a2a2]">{meta.date}</span>
          <span className="h-px w-4 bg-[#e8e8e8]" />
          <span className="text-[10px] uppercase tracking-[2px] text-[#a2a2a2]">{meta.readTime} {jc.minRead}</span>
        </div>

        {/* Title */}
        <h1
          className="mb-12 text-[#1e1e1e] font-normal leading-[1.1] tracking-[-0.01em]"
          style={{ fontFamily: "var(--font-crimson-text)", fontSize: "clamp(32px, 4vw, 48px)" }}
        >
          {content.title}
        </h1>

        {/* Cover image */}
        <div className="relative mb-14 w-full overflow-hidden bg-[#f9f9f9]" style={{ aspectRatio: "16/9" }}>
          <Image
            src={meta.img!}
            alt={content.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 860px) 100vw, 860px"
          />
        </div>

        {/* Body */}
        <div className="flex flex-col gap-7">
          {content.body.map((paragraph, i) => (
            <p
              key={i}
              className="text-[16px] leading-[1.8] tracking-[0.3px] text-[#1e1e1e]"
              style={{ fontFamily: "var(--font-crimson-text)" }}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Back link */}
        <div className="mt-16 border-t border-[#e8e8e8] pt-8">
          <Link href="/journal" className="text-[11px] uppercase tracking-[2.5px] text-[#a2a2a2] transition-colors hover:text-[#1e1e1e]">
            {jc.backToJournal}
          </Link>
        </div>
      </div>
    </div>
  )
}
