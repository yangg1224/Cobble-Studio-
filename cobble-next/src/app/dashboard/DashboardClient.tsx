"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useSaved } from "@/context/SavedContext"
import { products } from "@/lib/products"

/* ── Types ── */
interface UserInfo {
  name: string
  first: string
  email: string
  since: string
  initials: string
}

interface OrderItem {
  name: string
  price: string
  img: string
  qty: number
}

interface Order {
  id: string
  date: string
  status: "ordered" | "workshop" | "shipped" | "delivered"
  total: string
  note?: string
  eta?: string
  items: OrderItem[]
}


interface Address {
  id: string
  label: string
  name: string
  lines: string[]
  phone: string
  primary: boolean
}

/* ── Static fixture data ── */
const ORDER_STAGES = [
  { key: "ordered",   label: "Ordered" },
  { key: "workshop",  label: "In the workshop" },
  { key: "shipped",   label: "Shipped" },
  { key: "delivered", label: "Delivered" },
] as const

const ORDERS: Order[] = [
  {
    id: "C-2041",
    date: "May 28, 2026",
    status: "workshop",
    total: "CA$336",
    note: "Each piece is carved to order — yours is resting on the bench. We'll write when it ships.",
    eta: "Ships early June",
    items: [
      { name: "Birch Kuksa No.01",   price: "CA$158", img: "/products/mug-1.jpg",   qty: 1 },
      { name: "Olivewood Heart Cup", price: "CA$178", img: "/products/product2.jpg", qty: 1 },
    ],
  },
  {
    id: "C-1987",
    date: "Apr 12, 2026",
    status: "delivered",
    total: "CA$168",
    eta: "Delivered Apr 19",
    items: [
      { name: "Spalt Maple Kuksa", price: "CA$168", img: "/products/product3.jpg", qty: 1 },
    ],
  },
  {
    id: "C-1820",
    date: "Feb 03, 2026",
    status: "delivered",
    total: "CA$148",
    eta: "Delivered Feb 11",
    items: [
      { name: "Curly Maple Cup", price: "CA$148", img: "/products/product4.jpg", qty: 1 },
    ],
  },
]


const ADDRESSES: Address[] = [
  {
    id: "shipping",
    label: "Shipping",
    name: "Jane Maker",
    lines: ["414 Dundas Street West", "Apt 3", "Toronto, ON  M5T 1G8", "Canada"],
    phone: "+1 416 555 0142",
    primary: true,
  },
  {
    id: "billing",
    label: "Billing",
    name: "Jane Maker",
    lines: ["414 Dundas Street West", "Apt 3", "Toronto, ON  M5T 1G8", "Canada"],
    phone: "+1 416 555 0142",
    primary: false,
  },
]

type Section = "overview" | "orders" | "saved" | "profile" | "addresses"

const SECTIONS: { key: Section; label: string; Icon: () => JSX.Element }[] = [
  { key: "overview",  label: "Overview",  Icon: IconOverview },
  { key: "orders",    label: "Orders",    Icon: IconBox },
  { key: "saved",     label: "Saved",     Icon: IconHeart },
  { key: "profile",   label: "Profile",   Icon: IconUserLine },
  { key: "addresses", label: "Addresses", Icon: IconPin },
]

/* ── Root client component ── */
export function DashboardClient({ user }: { user: UserInfo }) {
  const router = useRouter()
  const [section, setSection] = useState<Section>("overview")
  const [openOrder, setOpenOrder] = useState<string | null>(null)

  function go(k: Section) {
    setSection(k)
    setOpenOrder(null)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/account")
    router.refresh()
  }

  return (
    <main style={{ background: "var(--paper)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "278px 1fr", minHeight: "calc(100vh - 122px)" }}>

        {/* ── Left rail ── */}
        <aside style={{
          borderRight: "1px solid var(--line)",
          padding: "64px 40px",
          display: "flex",
          flexDirection: "column",
          gap: 40,
          position: "sticky",
          top: 122,
          alignSelf: "start",
          height: "calc(100vh - 122px)",
          overflowY: "auto",
        }}>
          {/* User block */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{
              width: 46, height: 46,
              border: "1.5px solid var(--ink)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-serif)", fontSize: 17,
              color: "var(--ink)", letterSpacing: "0.5px", flexShrink: 0,
            }}>
              {user.initials}
            </span>
            <div style={{ minWidth: 0 }}>
              <p style={{ margin: 0, fontFamily: "var(--font-serif)", fontSize: 18, color: "var(--ink)", lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {user.name}
              </p>
              <p style={{ margin: "3px 0 0", fontSize: 9, letterSpacing: "1.6px", textTransform: "uppercase", color: "var(--ash)", whiteSpace: "nowrap" }}>
                Member since {user.since}
              </p>
            </div>
          </div>

          {/* Nav */}
          <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {SECTIONS.map(({ key, label, Icon }) => {
              const on = section === key
              return (
                <RailButton key={key} active={on} onClick={() => go(key)}>
                  <Icon />
                  <span style={{
                    fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 500,
                    letterSpacing: "2.2px", textTransform: "uppercase",
                  }}>{label}</span>
                  {on && <span style={{ marginLeft: "auto", width: 5, height: 5, background: "var(--teal)", flexShrink: 0 }} />}
                </RailButton>
              )
            })}
          </nav>

          {/* Sign out */}
          <button
            onClick={handleSignOut}
            style={{
              display: "flex", alignItems: "center", gap: 11,
              background: "none", border: "none", cursor: "pointer", padding: 0,
              color: "var(--ash)", transition: "color var(--dur-fast)", marginTop: 4,
              fontFamily: "var(--font-sans)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ash)")}
          >
            <IconArrowOut />
            <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", whiteSpace: "nowrap" }}>
              Sign out
            </span>
          </button>
        </aside>

        {/* ── Content area ── */}
        <div style={{ padding: "64px 64px 110px", maxWidth: 980 }}>
          {section === "overview"  && <Overview  user={user} goOrders={() => go("orders")} goSaved={() => go("saved")} onOpenOrder={(id) => { setOpenOrder(id); go("orders") }} />}
          {section === "orders"    && <Orders    openOrder={openOrder} setOpenOrder={setOpenOrder} />}
          {section === "saved"     && <SavedView />}
          {section === "profile"   && <Profile   user={user} />}
          {section === "addresses" && <Addresses />}
        </div>

      </div>
    </main>
  )
}

/* ── Rail button ── */
function RailButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  const [hover, setHover] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex", alignItems: "center", gap: 13,
        background: "none", border: "none", borderBottom: "1px solid var(--line)",
        cursor: "pointer", padding: "11px 0", textAlign: "left",
        color: active ? "var(--ink)" : hover ? "var(--teal)" : "var(--ash)",
        transition: "color var(--dur-fast)",
      }}
    >
      {children}
    </button>
  )
}

/* ── Overview section ── */
function Overview({ user, goOrders, goSaved, onOpenOrder }: {
  user: UserInfo
  goOrders: () => void
  goSaved: () => void
  onOpenOrder: (id: string) => void
}) {
  const recent = ORDERS[0]
  return (
    <div>
      <header style={{ marginBottom: 56 }}>
        <Eyebrow style={{ display: "block", marginBottom: 16 }}>Account</Eyebrow>
        <h1 style={headingStyle}>Welcome back, {user.first}.</h1>
        <p style={{ margin: "18px 0 0", maxWidth: 480, fontSize: 13, lineHeight: 1.8, letterSpacing: "0.3px", color: "var(--slate)" }}>
          One piece is resting on the bench, and four await in your saved. Take your time — good things are slow.
        </p>
      </header>

      {/* Recent order */}
      <section style={{ marginBottom: 56 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 22 }}>
          <Eyebrow bullet size="sm">Most recent order</Eyebrow>
          <ArrowLink onClick={goOrders}>All orders</ArrowLink>
        </div>

        <article style={{ border: "1px solid var(--line)", background: "var(--paper)" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr auto", gap: 24,
            padding: "28px 32px", borderBottom: "1px solid var(--line)", alignItems: "center",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 26, flexWrap: "wrap" }}>
              <MetaCell label="Order" value={`#${recent.id}`} />
              <Hair />
              <MetaCell label="Placed" value={recent.date} />
              <Hair />
              <MetaCell label="Total" value={recent.total} />
            </div>
            <StatusTag status={recent.status} />
          </div>

          <div style={{ padding: "30px 32px 34px" }}>
            <StatusTrack status={recent.status} />
            {recent.note && (
              <p style={{ margin: "30px 0 26px", maxWidth: 520, fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 17, lineHeight: 1.6, color: "var(--ink)" }}>
                {recent.note}
              </p>
            )}
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
              <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
                {recent.items.map((it) => <ItemThumb key={it.name} item={it} />)}
              </div>
              <OutlineButton onClick={() => onOpenOrder(recent.id)}>View order</OutlineButton>
            </div>
          </div>
        </article>
      </section>

      {/* Saved preview */}
      <section>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 24 }}>
          <Eyebrow bullet size="sm">Saved pieces</Eyebrow>
          <ArrowLink onClick={goSaved}>View all</ArrowLink>
        </div>
        <SavedGrid compact maxItems={4} emptyLabel="No saved pieces yet — browse the shop to start saving." />
      </section>
    </div>
  )
}

/* ── Orders section ── */
function Orders({ openOrder, setOpenOrder }: { openOrder: string | null; setOpenOrder: (id: string | null) => void }) {
  return (
    <div>
      <PageHead eyebrow="Account" title="Orders" sub="A record of every piece you've commissioned, from the bench to your hands." />
      <div>
        {ORDERS.map((o, i) => (
          <OrderRow
            key={o.id}
            order={o}
            open={openOrder === o.id}
            onToggle={() => setOpenOrder(openOrder === o.id ? null : o.id)}
            first={i === 0}
          />
        ))}
      </div>
    </div>
  )
}

function OrderRow({ order, open, onToggle, first }: { order: Order; open: boolean; onToggle: () => void; first: boolean }) {
  return (
    <article style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", marginTop: first ? 0 : -1 }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%", background: "none", border: "none", cursor: "pointer",
          display: "grid", gridTemplateColumns: "auto 1fr auto auto", gap: 28,
          alignItems: "center", padding: "26px 8px", textAlign: "left",
        }}
      >
        {/* Stacked thumbnails */}
        <div style={{ display: "flex" }}>
          {order.items.slice(0, 3).map((it, idx) => (
            <div key={idx} style={{
              width: 50, height: 62, background: "var(--mist)", overflow: "hidden",
              marginLeft: idx === 0 ? 0 : -14,
              boxShadow: idx === 0 ? "none" : "-6px 0 12px rgba(30,30,30,0.06)",
              border: "1px solid var(--paper)",
            }}>
              <img src={it.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
        </div>
        <div>
          <p style={{ margin: 0, fontSize: 13, letterSpacing: "0.3px", color: "var(--ink)" }}>Order #{order.id}</p>
          <p style={{ margin: "6px 0 0", fontSize: 11, letterSpacing: "0.5px", color: "var(--ash)" }}>
            {order.date} · {order.items.length} {order.items.length === 1 ? "piece" : "pieces"} · {order.total}
          </p>
        </div>
        <StatusTag status={order.status} />
        <span style={{ fontSize: 10, letterSpacing: "1.8px", textTransform: "uppercase", color: "var(--ash)", display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-sans)" }}>
          {open ? "Close" : "Details"}
          <span style={{ display: "inline-block", transform: open ? "rotate(180deg)" : "none", transition: "transform var(--dur-fast)" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </span>
        </span>
      </button>

      {open && (
        <div style={{ padding: "8px 8px 36px" }}>
          <div style={{ background: "var(--mist)", padding: "30px 32px", marginBottom: 24 }}>
            <StatusTrack status={order.status} />
            {order.eta && (
              <p style={{ margin: "22px 0 0", fontSize: 11, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--ash)", fontFamily: "var(--font-sans)" }}>
                {order.eta}
              </p>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {order.items.map((it) => (
              <div key={it.name} style={{ display: "flex", alignItems: "center", gap: 18, paddingBottom: 18, borderBottom: "1px solid var(--line)" }}>
                <div style={{ width: 56, height: 70, background: "var(--paper)", overflow: "hidden", flexShrink: 0 }}>
                  <img src={it.img} alt={it.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 12.5, letterSpacing: "0.3px", color: "var(--ink)" }}>{it.name}</p>
                  <p style={{ margin: "5px 0 0", fontSize: 11, color: "var(--ash)" }}>Qty {it.qty}</p>
                </div>
                <p style={{ margin: 0, fontSize: 12, color: "var(--ink)" }}>{it.price}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 22 }}>
            <span style={{ fontSize: 11, letterSpacing: "1.8px", textTransform: "uppercase", color: "var(--ash)", fontFamily: "var(--font-sans)" }}>
              Order total
            </span>
            <span style={{ fontFamily: "var(--font-serif)", fontSize: 20, color: "var(--ink)" }}>{order.total}</span>
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 26 }}>
            <OutlineButton>View invoice</OutlineButton>
            {order.status === "delivered" && <TextButton>Buy again</TextButton>}
          </div>
        </div>
      )}
    </article>
  )
}

/* ── Saved section ── */
function SavedView() {
  return (
    <div>
      <PageHead eyebrow="Account" title="Saved pieces" sub="Pieces you're keeping an eye on. Each is one of a kind — when it's gone, it's gone." />
      <SavedGrid />
    </div>
  )
}

function SavedGrid({ compact, maxItems, emptyLabel }: { compact?: boolean; maxItems?: number; emptyLabel?: string }) {
  const { savedSlugs, toggle } = useSaved()
  const savedProducts = savedSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean) as typeof products

  const displayed = maxItems ? savedProducts.slice(0, maxItems) : savedProducts

  if (displayed.length === 0) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 0", textAlign: "center" }}>
        <div style={{ width: 44, height: 44, border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ash)", marginBottom: 16 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>
          </svg>
        </div>
        <p style={{ fontSize: 12, color: "var(--ash)", fontFamily: "var(--font-sans)", letterSpacing: "0.3px", maxWidth: 240 }}>
          {emptyLabel ?? "No saved pieces yet."}
        </p>
        <Link href="/collections" style={{ marginTop: 16, fontSize: 10, fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "var(--ink)", fontFamily: "var(--font-sans)" }}>
          Browse the shop →
        </Link>
      </div>
    )
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: compact ? "repeat(4, 1fr)" : "repeat(3, 1fr)", gap: compact ? 24 : "40px 32px" }}>
      {displayed.map((p) => <SavedCard key={p.slug} piece={p} compact={compact} onRemove={() => toggle(p.slug)} />)}
    </div>
  )
}

function SavedCard({ piece, compact, onRemove }: { piece: typeof products[number]; compact?: boolean; onRemove: () => void }) {
  const [hover, setHover] = useState(false)
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ position: "relative" }}>
      <Link href={`/products/${piece.slug}`} style={{ display: "block", textDecoration: "none" }}>
        <div style={{ position: "relative", aspectRatio: "3 / 4", background: "var(--mist)", overflow: "hidden" }}>
          <img
            src={piece.img}
            alt={piece.name}
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              transition: "transform var(--dur-slow) var(--ease-out-soft)",
              transform: hover ? "scale(1.04)" : "none",
            }}
          />
          <button
            aria-label="Remove from saved"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onRemove() }}
            style={{
              position: "absolute", top: 10, right: 10, width: 30, height: 30,
              background: "rgba(255,255,255,0.92)", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--ink)", opacity: hover ? 1 : 0,
              transition: "opacity var(--dur-fast)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--teal)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink)")}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div style={{ marginTop: 14 }}>
          <p style={{ margin: 0, fontSize: 8.5, letterSpacing: "2px", textTransform: "uppercase", color: "var(--ash)", fontFamily: "var(--font-sans)" }}>
            {piece.collection}
          </p>
          <p style={{ margin: "7px 0 0", fontSize: compact ? 12 : 13, letterSpacing: "0.5px", textTransform: "uppercase", color: "var(--ink)", fontFamily: "var(--font-sans)", transition: "color var(--dur-fast)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--teal)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink)")}
          >
            {piece.name}
          </p>
          <span style={{ display: "block", marginTop: compact ? 7 : 10, fontSize: 12, color: "var(--ink)", fontFamily: "var(--font-sans)" }}>{piece.price}</span>
        </div>
      </Link>
    </div>
  )
}

/* ── Profile section ── */
function Profile({ user }: { user: UserInfo }) {
  return (
    <div>
      <PageHead eyebrow="Account" title="Profile" sub="Your details and how we reach you. We write seldom, and only about the work." />
      <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 40, maxWidth: 620 }}>
        <Eyebrow style={{ paddingTop: 4 }}>Login details</Eyebrow>
        <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <LineInput label="Full name" defaultValue={user.name} />
          <LineInput label="Email" type="email" defaultValue={user.email} />
          <div>
            <LineInput label="Password" type="password" defaultValue="••••••••••" />
            <p style={{ margin: "10px 0 0", fontSize: 10, letterSpacing: "0.4px", color: "var(--ash)", fontFamily: "var(--font-sans)" }}>
              Last changed 4 months ago.
            </p>
          </div>
          <div style={{ borderTop: "1px solid var(--line)", paddingTop: 26, marginTop: 4 }}>
            <Eyebrow style={{ display: "block", marginBottom: 18 }}>Studio notes</Eyebrow>
            <PrefRow defaultChecked label="New pieces & restocks" hint="A quiet note when fresh work lands." />
            <PrefRow defaultChecked label="Journal & studio stories" hint="Long-form notes from the bench." />
            <PrefRow label="Order updates by SMS" hint="Texts about your commissions." />
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <SolidButton type="submit">Save changes</SolidButton>
            <TextButton type="button">Cancel</TextButton>
          </div>
        </form>
      </div>
    </div>
  )
}

function LineInput({ label, type = "text", defaultValue }: { label: string; type?: string; defaultValue?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <label style={{ fontSize: 9, letterSpacing: "2px", textTransform: "uppercase", color: "var(--ash)", fontFamily: "var(--font-sans)", fontWeight: 600 }}>
        {label}
      </label>
      <input
        type={type}
        defaultValue={defaultValue}
        style={{
          background: "none", border: "none", borderBottom: "1.5px solid var(--line)",
          padding: "8px 0", fontSize: 13, color: "var(--ink)", fontFamily: "var(--font-sans)",
          letterSpacing: "0.3px", outline: "none", borderRadius: 0, width: "100%",
        }}
        onFocus={(e) => (e.currentTarget.style.borderBottomColor = "var(--ink)")}
        onBlur={(e) => (e.currentTarget.style.borderBottomColor = "var(--line)")}
      />
    </div>
  )
}

function PrefRow({ label, hint, defaultChecked }: { label: string; hint: string; defaultChecked?: boolean }) {
  const [on, setOn] = useState(!!defaultChecked)
  return (
    <button
      type="button"
      onClick={() => setOn(!on)}
      style={{ display: "flex", alignItems: "flex-start", gap: 13, background: "none", border: "none", cursor: "pointer", padding: "0 0 18px", textAlign: "left", width: "100%" }}
    >
      <span style={{
        width: 16, height: 16, marginTop: 1, border: "1.5px solid var(--ink)", flexShrink: 0,
        background: on ? "var(--ink)" : "transparent",
        color: "var(--paper)", display: "flex", alignItems: "center", justifyContent: "center",
        transition: "background var(--dur-fast)",
      }}>
        {on && (
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        )}
      </span>
      <span>
        <span style={{ display: "block", fontSize: 12, letterSpacing: "0.3px", color: "var(--ink)", fontFamily: "var(--font-sans)" }}>{label}</span>
        <span style={{ display: "block", fontSize: 11, color: "var(--ash)", marginTop: 3, fontFamily: "var(--font-sans)" }}>{hint}</span>
      </span>
    </button>
  )
}

/* ── Addresses section ── */
function Addresses() {
  return (
    <div>
      <PageHead eyebrow="Account" title="Addresses" sub="Where your pieces travel to. We pack each by hand in recycled wool and paper." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24, maxWidth: 720 }}>
        {ADDRESSES.map((a) => <AddressCard key={a.id} address={a} />)}
        <AddressAdd />
      </div>
    </div>
  )
}

function AddressCard({ address: a }: { address: Address }) {
  return (
    <article style={{ border: "1px solid var(--line)", padding: "26px 28px", display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Eyebrow size="sm">{a.label}</Eyebrow>
        {a.primary && (
          <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", background: "var(--ink)", color: "var(--paper)", padding: "3px 8px", fontFamily: "var(--font-sans)" }}>
            Default
          </span>
        )}
      </div>
      <div>
        <p style={{ margin: 0, fontSize: 13, color: "var(--ink)", letterSpacing: "0.3px", fontFamily: "var(--font-sans)" }}>{a.name}</p>
        {a.lines.map((l) => (
          <p key={l} style={{ margin: "5px 0 0", fontSize: 12, lineHeight: 1.6, color: "var(--slate)", fontFamily: "var(--font-sans)" }}>{l}</p>
        ))}
        <p style={{ margin: "10px 0 0", fontSize: 12, color: "var(--ash)", fontFamily: "var(--font-sans)" }}>{a.phone}</p>
      </div>
      <div style={{ display: "flex", gap: 18, marginTop: "auto", paddingTop: 6 }}>
        <TextLink>Edit</TextLink>
        {!a.primary && <TextLink>Remove</TextLink>}
        {!a.primary && <TextLink>Set as default</TextLink>}
      </div>
    </article>
  )
}

function AddressAdd() {
  const [hover, setHover] = useState(false)
  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        minHeight: 200, border: `1.5px dashed ${hover ? "var(--ink)" : "var(--line)"}`,
        background: "none", cursor: "pointer",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12,
        color: hover ? "var(--ink)" : "var(--ash)",
        transition: "color var(--dur-fast), border-color var(--dur-fast)",
      }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
      <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: "2.2px", textTransform: "uppercase", fontFamily: "var(--font-sans)" }}>
        Add address
      </span>
    </button>
  )
}

/* ── StatusTrack ── */
function StatusTrack({ status }: { status: Order["status"] }) {
  const current = ORDER_STAGES.findIndex((s) => s.key === status)
  const n = ORDER_STAGES.length
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${n}, 1fr)`, position: "relative" }}>
      <div style={{
        position: "absolute", left: `${100 / (n * 2)}%`, right: `${100 / (n * 2)}%`,
        top: 6, height: 1, background: "var(--line)",
      }} />
      <div style={{
        position: "absolute", left: `${100 / (n * 2)}%`, top: 6, height: 1,
        background: "var(--ink)",
        width: `calc(${(current / (n - 1)) * 100}% - ${(current / (n - 1)) * (100 / n)}%)`,
        transition: "width 550ms var(--ease-out-soft)",
      }} />
      {ORDER_STAGES.map((s, i) => {
        const done = i < current
        const active = i === current
        return (
          <div key={s.key} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, position: "relative" }}>
            <span style={{
              width: 13, height: 13, borderRadius: 999, boxSizing: "border-box",
              background: "var(--paper)",
              border: done ? "1.5px solid var(--ink)" : active ? "1.5px solid var(--teal)" : "1.5px solid var(--line)",
              display: "flex", alignItems: "center", justifyContent: "center",
              ...(done ? { background: "var(--ink)" } : {}),
            }}>
              {active && <span style={{ width: 5, height: 5, borderRadius: 999, background: "var(--teal)" }} />}
            </span>
            <span style={{
              fontSize: 9.5, fontWeight: active ? 600 : 500, letterSpacing: "1.4px",
              textTransform: "uppercase", textAlign: "center", fontFamily: "var(--font-sans)",
              color: active ? "var(--ink)" : done ? "var(--ink)" : "var(--ash)",
            }}>
              {s.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

/* ── Shared primitives ── */
const headingStyle: React.CSSProperties = {
  margin: 0, fontFamily: "var(--font-serif)", fontWeight: 400,
  fontSize: 40, letterSpacing: "-0.02em", lineHeight: 1.08, color: "var(--ink)",
}

function PageHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <header style={{ marginBottom: 52 }}>
      <Eyebrow style={{ display: "block", marginBottom: 16 }}>{eyebrow}</Eyebrow>
      <h1 style={headingStyle}>{title}</h1>
      {sub && (
        <p style={{ margin: "16px 0 0", maxWidth: 460, fontSize: 13, lineHeight: 1.8, letterSpacing: "0.3px", color: "var(--slate)", fontFamily: "var(--font-sans)" }}>
          {sub}
        </p>
      )}
    </header>
  )
}

function Eyebrow({ children, style, size = "md", bullet }: { children: React.ReactNode; style?: React.CSSProperties; size?: "sm" | "md"; bullet?: boolean }) {
  return (
    <span style={{
      fontFamily: "var(--font-sans)",
      fontSize: size === "sm" ? 9 : 10,
      fontWeight: 600,
      letterSpacing: size === "sm" ? "1.8px" : "2.5px",
      textTransform: "uppercase",
      color: "var(--ash)",
      ...style,
    }}>
      {bullet && "• "}{children}
    </span>
  )
}

function ArrowLink({ children, onClick, href }: { children: React.ReactNode; onClick?: () => void; href?: string }) {
  const style: React.CSSProperties = {
    background: "none", border: "none", cursor: "pointer", padding: 0,
    fontSize: 10, fontWeight: 500, letterSpacing: "1.8px", textTransform: "uppercase",
    color: "var(--ash)", transition: "color var(--dur-fast)", fontFamily: "var(--font-sans)",
    display: "inline-flex", alignItems: "center", gap: 6, whiteSpace: "nowrap", flexShrink: 0,
  }
  const content = <>{children} <span>→</span></>
  if (href) return (
    <Link href={href} style={style}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--teal)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ash)")}
    >{content}</Link>
  )
  return (
    <button onClick={onClick} style={style}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--teal)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ash)")}
    >{content}</button>
  )
}

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p style={{ margin: 0, fontSize: 9, letterSpacing: "1.8px", textTransform: "uppercase", color: "var(--ash)", fontFamily: "var(--font-sans)" }}>{label}</p>
      <p style={{ margin: "5px 0 0", fontSize: 13, letterSpacing: "0.3px", color: "var(--ink)", fontFamily: "var(--font-sans)" }}>{value}</p>
    </div>
  )
}

function Hair() {
  return <span style={{ width: 1, height: 26, background: "var(--line)", flexShrink: 0 }} />
}

function ItemThumb({ item }: { item: OrderItem }) {
  return (
    <div style={{ display: "flex", gap: 14, alignItems: "center", flexShrink: 0 }}>
      <div style={{ width: 60, height: 76, background: "var(--mist)", overflow: "hidden", flexShrink: 0 }}>
        <img src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div>
        <p style={{ margin: 0, fontSize: 12, lineHeight: 1.35, letterSpacing: "0.3px", color: "var(--ink)", whiteSpace: "nowrap", fontFamily: "var(--font-sans)" }}>{item.name}</p>
        <p style={{ margin: "6px 0 0", fontSize: 11, color: "var(--ash)", fontFamily: "var(--font-sans)" }}>{item.price}</p>
      </div>
    </div>
  )
}

function StatusTag({ status }: { status: Order["status"] }) {
  const label = ORDER_STAGES.find((s) => s.key === status)?.label ?? status
  const solid = status === "delivered"
  return (
    <span style={{
      display: "inline-block",
      padding: "4px 10px",
      fontSize: 9, fontWeight: 600, letterSpacing: "1.6px", textTransform: "uppercase",
      fontFamily: "var(--font-sans)",
      background: solid ? "var(--ink)" : "transparent",
      color: solid ? "var(--paper)" : "var(--ink)",
      border: solid ? "none" : "1px solid var(--ink)",
      whiteSpace: "nowrap",
    }}>{label}</span>
  )
}

function TextLink({ children }: { children: React.ReactNode }) {
  return (
    <button
      style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: 10, fontWeight: 500, letterSpacing: "1.8px", textTransform: "uppercase", color: "var(--ash)", transition: "color var(--dur-fast)", fontFamily: "var(--font-sans)" }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--teal)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ash)")}
    >{children}</button>
  )
}

function OutlineButton({ children, onClick, type }: { children: React.ReactNode; onClick?: () => void; type?: "button" | "submit" }) {
  return (
    <button
      type={type ?? "button"}
      onClick={onClick}
      style={{
        background: "none", border: "1px solid var(--ink)", cursor: "pointer",
        padding: "10px 20px", fontSize: 10, fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase",
        color: "var(--ink)", transition: "background var(--dur-fast), color var(--dur-fast)", fontFamily: "var(--font-sans)",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.color = "var(--paper)" }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "var(--ink)" }}
    >{children}</button>
  )
}

function SolidButton({ children, type }: { children: React.ReactNode; type?: "button" | "submit" }) {
  return (
    <button
      type={type ?? "button"}
      style={{
        background: "var(--ink)", border: "none", cursor: "pointer",
        padding: "12px 24px", fontSize: 10, fontWeight: 500, letterSpacing: "2.5px", textTransform: "uppercase",
        color: "var(--paper)", transition: "background var(--dur-fast)", fontFamily: "var(--font-sans)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--teal)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "var(--ink)")}
    >{children}</button>
  )
}

function TextButton({ children, type, onClick }: { children: React.ReactNode; type?: "button" | "submit"; onClick?: () => void }) {
  return (
    <button
      type={type ?? "button"}
      onClick={onClick}
      style={{
        background: "none", border: "none", cursor: "pointer", padding: "12px 8px",
        fontSize: 10, fontWeight: 500, letterSpacing: "2.5px", textTransform: "uppercase",
        color: "var(--ash)", transition: "color var(--dur-fast)", fontFamily: "var(--font-sans)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ash)")}
    >{children}</button>
  )
}

/* ── Icons ── */
function ACIcon({ size = 17, children }: { size?: number; children: React.ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
      {children}
    </svg>
  )
}
function IconOverview() { return <ACIcon><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></ACIcon> }
function IconBox()      { return <ACIcon><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.3 7 12 12 20.7 7"/><line x1="12" y1="22" x2="12" y2="12"/></ACIcon> }
function IconHeart()    { return <ACIcon><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></ACIcon> }
function IconUserLine() { return <ACIcon><circle cx="12" cy="7" r="4"/><path d="M4 21v-1a8 8 0 0 1 16 0v1"/></ACIcon> }
function IconPin()      { return <ACIcon><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></ACIcon> }
function IconArrowOut() { return <ACIcon size={16}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></ACIcon> }
