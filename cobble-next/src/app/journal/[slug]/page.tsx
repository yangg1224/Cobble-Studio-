import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

// ─── Data ─────────────────────────────────────────────────────────────────────

type StandardPost = {
  layout: "standard"
  slug: string
  category: string
  title: string
  date: string
  readTime: string
  img: string
  body: string[]
}

type BrandStoryPost = {
  layout: "brand-story"
  slug: string
  category: string
  date: string
  readTime: string
}

type JournalPost = StandardPost | BrandStoryPost

const POSTS: Record<string, JournalPost> = {
  "brand-story": {
    layout: "brand-story",
    slug: "brand-story",
    category: "Story",
    date: "October 2025",
    readTime: "8 min read",
  },
  "the-craft-behind-the-cup": {
    layout: "standard",
    slug: "the-craft-behind-the-cup",
    category: "Craft",
    title: "The Craft Behind the Cup",
    date: "May 2026",
    readTime: "5 min read",
    img: "/journal/journal1.jpg",
    body: [
      "Each cup begins as a rough block — walnut, cherry, or maple — chosen for density and the quiet character of its grain. There is no shortcut through this part of the process. The block must be evaluated, turned in the hands, understood.",
      "The first cuts are the most uncertain. A gouge starts the hollow, and from that moment the cup begins to reveal itself. The walls thin gradually. Too fast and the wood splits; too slow and the rhythm breaks. Working with wood means working with its nature, not against it.",
      "The final form emerges not from a drawing but from conversation — between the maker and the material. Each cup is one of a kind because the wood insists on it.",
    ],
  },
  "from-wood-to-hand": {
    layout: "standard",
    slug: "from-wood-to-hand",
    category: "Process",
    title: "From Wood to Hand — Inside the Workshop",
    date: "May 2026",
    readTime: "6 min read",
    img: "/journal/journal2.jpg",
    body: [
      "The workshop is quiet in the mornings. Light comes in low across the workbench, catching the fine dust left from the day before. This is when the work is clearest — before the noise of decisions, before the phone.",
      "A morning session might produce nothing more than a well-prepared blank, or a single curve resolved after hours of small adjustments. Progress in woodworking is rarely linear. Some days the chisel finds the right angle on the first pass. Other days it takes most of the morning.",
      "What stays constant is the rhythm: hold, listen, cut, assess. The hand learns something new each time it touches the wood, and that learning carries forward into every piece that follows.",
    ],
  },
  "light-and-shadow": {
    layout: "standard",
    slug: "light-and-shadow",
    category: "Story",
    title: "Light & Shadow — Objects at Rest",
    date: "April 2026",
    readTime: "4 min read",
    img: "/journal/journal3.jpg",
    body: [
      "An object at rest is not passive. It accumulates light in its grain, holds shadow in its curves, and keeps the mark of its making in places that only close attention finds.",
      "A cup sitting on a windowsill in the afternoon is the same cup that was held at breakfast — but it is also something else. The light changes what we see, and in changing what we see, it changes how we remember using it.",
      "This is what wooden objects do over time. They do not age so much as deepen. The grain that seemed plain in the workshop becomes luminous after years of handling. The finish softens. The object becomes more fully itself.",
    ],
  },
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = POSTS[slug]
  if (!post) notFound()

  if (post.layout === "brand-story") return <BrandStoryLayout post={post} />
  return <StandardLayout post={post} />
}

// ─── Brand Story layout (matches Figma node 80-521) ──────────────────────────

function BrandStoryLayout({ post }: { post: BrandStoryPost }) {
  return (
    <div className="bg-[#f9f9f9] min-h-screen pb-0">

      {/* ── Breadcrumb ── */}
      <div className="px-20 pt-10 hidden md:flex items-center gap-2">
        <Link href="/journal" className="text-[10px] tracking-[1px] text-[#a2a2a2] transition-colors hover:text-[#3CACB0]">
          Journal
        </Link>
        <span className="text-[10px] text-[#d0d0d0]">/</span>
        <span className="text-[10px] tracking-[1px] text-[#1e1e1e]">Brand Story</span>
      </div>

      {/* ── Hero title ── */}
      <div className="flex items-center justify-center pt-[160px] pb-[50px]">
        <h1
          className="text-[36px] text-[#1e1e1e] text-center tracking-[1.8px] leading-[58.2px] font-normal"
          style={{ fontFamily: "var(--font-crimson-text)" }}
        >
          JOURNAL
        </h1>
      </div>

      {/* ── Poem ── */}
      <div
        className="text-center text-[16px] text-[#1e1e1e] tracking-[0.8px] leading-[25.9px] pb-6"
        style={{ fontFamily: "var(--font-crimson-text)" }}
      >
        <p>Time that has passed ultimately takes form as a wooden object.</p>
        <p className="mt-6" style={{ fontFamily: "'LXGW WenKai Mono TC', 'Noto Serif SC', 'Hiragino Mincho ProN', serif" }}>
          始于木 · 终于器 · 善于用
        </p>
        <div className="mt-6">
          <p>Born of wood</p>
          <p>Shaped into vessel</p>
          <p>Refined through use</p>
        </div>
      </div>

      {/* ── Hero image 1 (drilling/workshop) ── */}
      <div className="px-20 py-[10px]">
        <div className="relative w-full h-[722px]">
          <Image
            src="/journal/brand-story/hero1.jpg"
            alt="Workshop — drilling detail"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1440px) 100vw, 1440px"
          />
        </div>
      </div>

      {/* ── Attribution text ── */}
      <div className="px-20 py-[50px]">
        <p
          className="text-[16px] text-[#1e1e1e] tracking-[0.8px] leading-[25.9px] max-w-[860px]"
          style={{ fontFamily: "var(--font-crimson-text)" }}
        >
          Beginning on October 1, 2025, this work took one month to complete—<br />
          carried out independently from design to realization, with occasional support from friends along the way.
        </p>
      </div>

      {/* ── Three-column image section ── */}
      {/* Figma spec at 1440px: left~448px | gap~55px | spacer 263px | gap~55px | text 287px | gap~55px | right 277px */}
      <div className="flex items-start justify-between w-full">
        {/* Left: carve-close — height fixed at 493px, width derived from aspect-ratio */}
        <div className="relative shrink-0" style={{ height: "493px", aspectRatio: "340/374" }}>
          <Image
            src="/journal/brand-story/carve-close.jpg"
            alt="Wood carving, close-up"
            fill
            className="object-cover"
            sizes="35vw"
          />
        </div>

        {/* Invisible spacer preserving the Figma negative space */}
        <div className="shrink-0 w-[263px]" aria-hidden="true" />

        {/* Text column — vertically centred in the row */}
        <p
          className="shrink-0 w-[287px] text-[16px] leading-[25.9px] tracking-[0.8px] text-[#1e1e1e] self-center"
          style={{ fontFamily: "var(--font-crimson-text)" }}
        >
          From here, my creative journey in Toronto, Canada began— in the company of wood, moving quietly alongside music.
        </p>

        {/* Right: workshop tall portrait — 277×493 */}
        <div className="relative shrink-0 w-[277px] h-[493px]">
          <Image
            src="/journal/brand-story/workshop.jpg"
            alt="Workshop, portrait"
            fill
            className="object-cover object-top"
            sizes="25vw"
          />
        </div>
      </div>

      {/* ── Wide image left + text right ── */}
      {/* Figma spec: px-80, py-50, gap-262; image 821×462, text 197px; at 1440px: 80+821+262+197+80=1440 */}
      <div className="px-20 py-[50px] flex items-end gap-[262px]">
        {/* Left: tools landscape — fills remaining space after gap + text */}
        <div className="relative flex-1 h-[462px]">
          <Image
            src="/journal/brand-story/tools.jpg"
            alt="Woodworking tools and process"
            fill
            className="object-cover"
            sizes="(max-width: 1440px) 60vw, 821px"
          />
        </div>

        {/* Right: text — 197px fixed */}
        <p
          className="shrink-0 w-[197px] text-[16px] leading-[25.9px] tracking-[0.8px] text-[#1e1e1e]"
          style={{ fontFamily: "var(--font-crimson-text)" }}
        >
          This process mirrors the making of the work—a continuous cycle of observing,
          {" "}carving, and refining. Time gradually fades from awareness. At times, I come
          {" "}back to myself to find the music has stopped—and an hour has already passed.
        </p>
      </div>

      {/* ── Hero image 2 (cups/vessels) — full bleed, no horizontal padding ── */}
      <div className="py-[50px]">
        <div className="relative w-full h-[722px]">
          <Image
            src="/journal/brand-story/hero2.jpg"
            alt="Finished wooden vessels"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </div>

      {/* ── Meta footer ── */}
      <div className="px-20 py-10 flex items-center justify-between border-t border-[#e8e8e8]">
        <div className="flex items-center gap-4">
          <span className="text-[10px] uppercase tracking-[2px] text-[#a2a2a2]">{post.category}</span>
          <span className="h-px w-4 bg-[#e8e8e8]" />
          <span className="text-[10px] uppercase tracking-[2px] text-[#a2a2a2]">{post.date}</span>
          <span className="h-px w-4 bg-[#e8e8e8]" />
          <span className="text-[10px] uppercase tracking-[2px] text-[#a2a2a2]">{post.readTime}</span>
        </div>
        <Link
          href="/journal"
          className="text-[11px] uppercase tracking-[2.5px] text-[#a2a2a2] transition-colors hover:text-[#1e1e1e]"
        >
          ← Back to Journal
        </Link>
      </div>
    </div>
  )
}

// ─── Standard article layout ──────────────────────────────────────────────────

function StandardLayout({ post }: { post: StandardPost }) {
  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-[860px] px-10 pt-16 pb-24">

        {/* Breadcrumb */}
        <nav className="mb-12 flex items-center gap-2" aria-label="Breadcrumb">
          <Link href="/journal" className="text-[10px] tracking-[1px] text-[#a2a2a2] transition-colors hover:text-[#3CACB0]">
            Journal
          </Link>
          <span className="text-[10px] text-[#d0d0d0]">/</span>
          <span className="text-[10px] tracking-[1px] text-[#1e1e1e]">{post.title}</span>
        </nav>

        {/* Meta */}
        <div className="mb-6 flex items-center gap-4">
          <span className="text-[10px] font-medium uppercase tracking-[2px] text-[#a2a2a2]">{post.category}</span>
          <span className="h-px w-4 bg-[#e8e8e8]" />
          <span className="text-[10px] uppercase tracking-[2px] text-[#a2a2a2]">{post.date}</span>
          <span className="h-px w-4 bg-[#e8e8e8]" />
          <span className="text-[10px] uppercase tracking-[2px] text-[#a2a2a2]">{post.readTime}</span>
        </div>

        {/* Title */}
        <h1
          className="mb-12 text-[#1e1e1e] font-normal leading-[1.1] tracking-[-0.01em]"
          style={{ fontFamily: "var(--font-crimson-text)", fontSize: "clamp(32px, 4vw, 48px)" }}
        >
          {post.title}
        </h1>

        {/* Cover image */}
        <div className="relative mb-14 w-full overflow-hidden bg-[#f9f9f9]" style={{ aspectRatio: "16/9" }}>
          <Image
            src={post.img}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 860px) 100vw, 860px"
          />
        </div>

        {/* Body */}
        <div className="flex flex-col gap-7">
          {post.body.map((paragraph, i) => (
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
          <Link
            href="/journal"
            className="text-[11px] uppercase tracking-[2.5px] text-[#a2a2a2] transition-colors hover:text-[#1e1e1e]"
          >
            ← Back to Journal
          </Link>
        </div>
      </div>
    </div>
  )
}
