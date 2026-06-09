import Image from "next/image"
import Link from "next/link"

const storyBody = [
  "C O B B L E is a woodworking brand based in Toronto, Canada. The studio creates handcrafted objects that explore the relationship between everyday use, materiality, and quiet living.",
  "Each piece is made from solid wood, preserving the natural grain and tactile quality of the material. The design is simple and functional, focused on long-term use.",
  "Our goal is to make objects that are not only beautiful, but meant to be used and lived with.",
  "Over time, the wood will evolve, developing a unique character with use — a natural part of what makes each piece yours.",
]

const essenceSections = [
  {
    title: "Nature",
    body: "Every piece carries the unique marks of the tree it came from. Grain patterns, tones, and textures vary naturally, making each object one of a kind.",
    img: "/hero/head3.jpg",
    imgAlt: "Natural wood grain",
  },
  {
    title: "Craft",
    body: "Designed and finished by hand, each object reflects careful attention to proportion, touch, and detail.",
    img: "/journal/brand-story/workshop.jpg",
    imgAlt: "Craftwork in studio",
  },
  {
    title: "Touch",
    body: "Wood invites interaction. Its warmth and weight sit comfortably in the hand, asking to be held and used daily.",
    img: "/journal/brand-story/carve-close.jpg",
    imgAlt: "Hand carving wood",
  },
  {
    title: "Patina",
    body: "Objects become more meaningful through use. Over time, wood develops richer tones and subtle traces of everyday life.",
    img: "/products/product2.jpg",
    imgAlt: "Aged wooden object",
  },
  {
    title: "Ritual",
    body: "We believe everyday moments deserve attention. Whether enjoying a morning coffee or an afternoon tea, the right object makes the ritual complete.",
    img: "/products/mug-1.jpg",
    imgAlt: "Wooden mug ritual",
  },
]

const productCards = [
  {
    label: "MUG",
    desc: "A wooden object that celebrates the warmth and character of natural timber",
    img: "/collections/mug.png",
    href: "/collections/mug",
    side: "left",
  },
  {
    label: "SCOOP",
    desc: "A handcrafted scoop designed for measuring coffee with ease and precision",
    img: "/collections/scoop.jpg",
    href: "/collections/scoop",
    side: "right",
  },
  {
    label: "PLATE",
    desc: "Crafted to reveal the beauty of wood and handwork",
    img: "/collections/plate.jpg",
    href: "/collections/plate",
    side: "left",
  },
]

const journalCategories = [
  { label: "BRAND STORY", img: "/journal/brand-story/hero2.jpg", href: "/journal" },
  { label: "COMMUNITY",   img: "/journal/journal1.jpg",           href: "/journal" },
  { label: "BUSINESS",    img: "/journal/journal2.jpg",           href: "/journal" },
  { label: "MATERIAL",    img: "/journal/journal3.jpg",           href: "/journal" },
]

export default function AboutPage() {
  return (
    <div className="bg-[#F9F9F9]">

      {/* ── 1. Hero Banner ── */}
      <section className="relative h-[50vh] w-full overflow-hidden md:h-[723px]">
        <Image
          src="/hero/head1.jpg"
          alt="Cobble studio"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <p
            className="text-center text-black"
            style={{
              fontFamily: "var(--font-crimson-text)",
              fontStyle: "italic",
              fontSize: 36,
              letterSpacing: "1.8px",
              lineHeight: "58.2px",
              textShadow: "0 2px 16px rgba(0,0,0,0.35), 0 1px 4px rgba(0,0,0,0.2)",
            }}
          >
            "Observe. Reflect. Let it become."
          </p>
        </div>
      </section>

      {/* ── 2. Our Story ── */}
      <section
        className="px-6 pt-12 pb-8 md:px-[200px] md:pt-[80px] md:pb-[40px]"
        style={{ background: "#F9F9F9" }}
      >
        <div className="flex flex-col gap-6 md:flex-row md:gap-[80px] items-start">
          <h2
            className="flex-shrink-0 text-[#1E1E1E] font-normal"
            style={{
              fontFamily: "var(--font-crimson-text)",
              fontSize: 36,
              letterSpacing: "1.8px",
              lineHeight: "58.2px",
              minWidth: 180,
            }}
          >
            Our Story
          </h2>
          <div className="max-w-[553px] flex flex-col gap-[20px]">
            {storyBody.map((para, i) => (
              <p
                key={i}
                className="text-[#1E1E1E] m-0"
                style={{
                  fontFamily: "var(--font-crimson-text)",
                  fontSize: 16,
                  letterSpacing: "0.8px",
                  lineHeight: "25.9px",
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Brand Story Collage ── */}
      <section className="relative overflow-hidden bg-[#F9F9F9]" style={{ minHeight: 900 }}>
        {/* Staggered photo grid */}
        <div className="relative mx-auto max-w-[1440px] px-4 pt-8 pb-10 md:px-[80px] md:pt-[60px] md:pb-[80px]">
          <div className="grid grid-cols-2 gap-[24px]">
            {/* Top-left photo */}
            <div className="relative overflow-hidden" style={{ aspectRatio: "4/5", marginTop: 0 }}>
              <Image
                src="/journal/brand-story/workshop.jpg"
                alt="Cobble studio workshop"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1440px) 40vw"
              />
            </div>
            {/* Top-right — offset down */}
            <div className="relative overflow-hidden" style={{ aspectRatio: "4/5", marginTop: 80 }}>
              <Image
                src="/journal/brand-story/tools.jpg"
                alt="Woodworking tools"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1440px) 40vw"
              />
            </div>
          </div>

          {/* Text overlay — centered between photos */}
          <div
            className="relative mt-[60px] px-[40px] py-[32px] max-w-[680px] mx-auto text-center"
          >
            <p
              className="text-[#1E1E1E] mb-[16px]"
              style={{
                fontFamily: "var(--font-crimson-text)",
                fontSize: 16,
                letterSpacing: "16px",
                lineHeight: "25.9px",
                fontWeight: 600,
              }}
            >
              COBBLE
            </p>
            <p
              className="text-[#1E1E1E] mb-[16px]"
              style={{
                fontFamily: "var(--font-crimson-text)",
                fontStyle: "italic",
                fontSize: 16,
                letterSpacing: "0.8px",
                lineHeight: "25.9px",
              }}
            >
              is the name of my studio. Like stones once edged and irregular, gradually shaped by nature
              over time, each piece emerges in its own distinct form.
            </p>
            <p
              className="text-[#1E1E1E]"
              style={{
                fontFamily: "var(--font-crimson-text)",
                fontStyle: "italic",
                fontSize: 16,
                letterSpacing: "0.8px",
                lineHeight: "25.9px",
              }}
            >
              The current body of work explores everyday objects—developed across five series: mugs, scoops,
              spoons, clips, and plates.
            </p>
          </div>

          {/* Bottom row — two more photos */}
          <div className="grid grid-cols-2 gap-[24px] mt-[40px]">
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: "4/3", marginLeft: 40 }}
            >
              <Image
                src="/journal/brand-story/carve-close.jpg"
                alt="Hand carving detail"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1440px) 40vw"
              />
            </div>
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: "4/3", marginRight: 40, marginTop: -40 }}
            >
              <Image
                src="/journal/brand-story/hero1.jpg"
                alt="Studio product"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1440px) 40vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Our Products Banner ── */}
      <section className="relative h-[340px] w-full overflow-hidden md:h-[632px]">
        <Image
          src="/hero/head2.png"
          alt="Our products"
          fill
          className="object-cover object-center"
          style={{ mixBlendMode: "darken" }}
          sizes="100vw"
        />
        <div className="absolute inset-0 flex items-center px-6 md:px-0" style={{ paddingLeft: "min(304.5px, 8vw + 24px)" }}>
          <h2
            className="text-black font-normal"
            style={{
              fontFamily: "var(--font-crimson-text)",
              fontSize: 36,
              letterSpacing: "1.8px",
              lineHeight: "58.2px",
            }}
          >
            Our Products
          </h2>
        </div>
      </section>

      {/* ── 5. Product Essence ── */}
      <section className="bg-[#F9F9F9] px-6 pt-12 pb-12 md:px-[80px] md:pt-[80px] md:pb-[80px]" style={{ overflow: "hidden" }}>
        {/* Section heading */}
        <h2
          className="text-[#1E1E1E] font-normal mb-[60px]"
          style={{
            fontFamily: "var(--font-crimson-text)",
            fontSize: 24,
            letterSpacing: "1.2px",
            lineHeight: "38.8px",
          }}
        >
          Product Essence
        </h2>

        <div className="flex flex-col gap-[80px]">
          {essenceSections.map((section, i) => {
            const isEven = i % 2 === 0
            return (
              <div
                key={section.title}
                className={`flex flex-col gap-8 md:flex-row md:gap-[60px] items-center ${!isEven ? "md:flex-row-reverse" : ""}`}
              >
                {/* Text */}
                <div className="flex-1 max-w-[460px]">
                  <h3
                    className="text-[#1E1E1E] font-normal mb-[16px]"
                    style={{
                      fontFamily: "var(--font-crimson-text)",
                      fontSize: 20,
                      letterSpacing: "1px",
                      lineHeight: "32.4px",
                    }}
                  >
                    {section.title}
                  </h3>
                  <p
                    className="text-[#1E1E1E]"
                    style={{
                      fontFamily: "var(--font-crimson-text)",
                      fontSize: 16,
                      letterSpacing: "0.8px",
                      lineHeight: "25.9px",
                    }}
                  >
                    {section.body}
                  </p>
                </div>
                {/* Photo */}
                <div
                  className="flex-1 relative overflow-hidden"
                  style={{ aspectRatio: "3/2", maxWidth: 700 }}
                >
                  <Image
                    src={section.img}
                    alt={section.imgAlt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1440px) 50vw"
                  />
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── 6. Product Story Banner ── */}
      <section className="relative h-[340px] w-full overflow-hidden md:h-[522px]">
        <Image
          src="/hero/head4.jpg"
          alt="Product story"
          fill
          className="object-cover object-center"
          style={{ mixBlendMode: "darken" }}
          sizes="100vw"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />
        <div
          className="absolute inset-y-0 flex flex-col justify-center px-6 md:px-0"
          style={{ left: "clamp(24px, 21vw, 304.5px)" }}
        >
          <h2
            className="font-normal text-[#F9F9F9] mb-[12px]"
            style={{
              fontFamily: "var(--font-crimson-text)",
              fontSize: 36,
              letterSpacing: "1.8px",
              lineHeight: "58.2px",
            }}
          >
            Product Story
          </h2>
          <p
            className="text-[#F9F9F9] mb-[24px] max-w-[320px]"
            style={{
              fontFamily: "var(--font-instrument-sans)",
              fontSize: 14,
              letterSpacing: "0.7px",
              lineHeight: "22.65px",
            }}
          >
            Find out about the story and ideas behind our products through interviews.
          </p>
          <Link
            href="/journal"
            className="flex items-center gap-[8px] text-[#F9F9F9] transition-opacity duration-200 hover:opacity-70"
            style={{
              fontFamily: "var(--font-instrument-sans)",
              fontSize: 14,
              letterSpacing: "0.7px",
              lineHeight: "22.65px",
            }}
          >
            VIEW MORE
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>
      </section>

      {/* ── 7. Product Cards ── */}
      <section className="relative bg-[#F9F9F9] px-6 py-12 md:px-[80px] md:py-[80px]">
        {/* Mobile: simple stacked list; Desktop: restored absolute stagger */}
        <div className="flex flex-col gap-10 md:hidden">
          {productCards.map((card) => (
            <div key={card.label}>
              <Link href={card.href} className="group block">
                <div className="relative w-full overflow-hidden bg-[#F0EEEB]" style={{ aspectRatio: "635 / 348.26" }}>
                  <Image
                    src={card.img}
                    alt={card.label}
                    fill
                    className="object-cover object-center transition-transform duration-[550ms] group-hover:scale-[1.03]"
                    style={{ transitionTimingFunction: "cubic-bezier(0.25,0.46,0.45,0.94)" }}
                    sizes="90vw"
                  />
                </div>
                <div className="pt-[16px]">
                  <p className="text-[#1E1E1E] mb-[4px]" style={{ fontFamily: "var(--font-instrument-sans)", fontSize: 16, letterSpacing: "0.8px", lineHeight: "25.9px" }}>{card.label}</p>
                  <p className="text-[#A2A2A2] mb-[12px]" style={{ fontFamily: "var(--font-instrument-sans)", fontSize: 14, letterSpacing: "0.7px", lineHeight: "22.65px" }}>{card.desc}</p>
                  <span className="text-[#1E1E1E] flex items-center gap-[6px] transition-colors duration-200 group-hover:text-[#3CACB0]" style={{ fontFamily: "var(--font-instrument-sans)", fontSize: 14, letterSpacing: "0.7px", lineHeight: "22.65px" }}>
                    VIEW MORE
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="hidden md:block relative" style={{ minHeight: 1200 }}>
          {productCards.map((card, i) => (
            <div
              key={card.label}
              className="absolute"
              style={{
                top: i === 0 ? 75 : i === 1 ? 346 : 629,
                left:  card.side === "left"  ? 0    : undefined,
                right: card.side === "right" ? 0    : undefined,
                width: "calc(50% - 20px)",
              }}
            >
              <Link href={card.href} className="group block">
                <div className="relative w-full overflow-hidden bg-[#F0EEEB]" style={{ aspectRatio: "635 / 348.26" }}>
                  <Image
                    src={card.img}
                    alt={card.label}
                    fill
                    className="object-cover object-center transition-transform duration-[550ms] group-hover:scale-[1.03]"
                    style={{ transitionTimingFunction: "cubic-bezier(0.25,0.46,0.45,0.94)" }}
                    sizes="45vw"
                  />
                </div>
                <div className="pt-[16px]">
                  <p
                    className="text-[#1E1E1E] mb-[4px]"
                    style={{
                      fontFamily: "var(--font-instrument-sans)",
                      fontSize: 16,
                      letterSpacing: "0.8px",
                      lineHeight: "25.9px",
                    }}
                  >
                    {card.label}
                  </p>
                  <p
                    className="text-[#A2A2A2] mb-[12px]"
                    style={{
                      fontFamily: "var(--font-instrument-sans)",
                      fontSize: 14,
                      letterSpacing: "0.7px",
                      lineHeight: "22.65px",
                    }}
                  >
                    {card.desc}
                  </p>
                  <span
                    className="text-[#1E1E1E] flex items-center gap-[6px] transition-colors duration-200 group-hover:text-[#3CACB0]"
                    style={{
                      fontFamily: "var(--font-instrument-sans)",
                      fontSize: 14,
                      letterSpacing: "0.7px",
                      lineHeight: "22.65px",
                    }}
                  >
                    VIEW MORE
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. Journal Navigation Strip ── */}
      <section className="grid grid-cols-2 md:flex w-full overflow-hidden" style={{ height: "auto" }}>
        {journalCategories.map((cat) => (
          <Link
            key={cat.label}
            href={cat.href}
            className="group relative overflow-hidden md:flex-1"
            style={{ height: 180 }}
          >
            <Image
              src={cat.img}
              alt={cat.label}
              fill
              className="object-cover object-center transition-transform duration-[550ms] group-hover:scale-[1.04]"
              style={{ transitionTimingFunction: "cubic-bezier(0.25,0.46,0.45,0.94)" }}
              sizes="25vw"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/35 transition-opacity duration-300 group-hover:bg-black/45" />
            {/* Label */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-[#F9F9F9]"
                style={{
                  fontFamily: "var(--font-instrument-sans)",
                  fontWeight: 600,
                  fontSize: 14,
                  letterSpacing: "0.7px",
                  lineHeight: "22.65px",
                }}
              >
                {cat.label}
              </span>
            </div>
          </Link>
        ))}
      </section>

      {/* ── 9. Full-width Photo ── */}
      <section className="relative h-[460px] w-full overflow-hidden">
        <Image
          src="/journal/brand-story/hero1.jpg"
          alt="Cobble objects"
          fill
          className="object-cover object-bottom"
          sizes="100vw"
        />
      </section>

    </div>
  )
}
