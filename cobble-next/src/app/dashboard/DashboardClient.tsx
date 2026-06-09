"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useSaved } from "@/context/SavedContext"
import { useLanguage } from "@/context/LanguageContext"
import type { Order, OrderItem } from "@/lib/order-actions"
import { products } from "@/lib/products"

type UserInfo  = { name: string; first: string; email: string; since: string; initials: string }
type Address   = { id: string; label: string; name: string; lines: string[]; phone: string; primary: boolean }
type Section   = "overview" | "orders" | "saved" | "profile" | "addresses"
type D = ReturnType<typeof useLanguage>["t"]["dashboard"]

const ADDRESSES: Address[] = [
  { id: "shipping", label: "Shipping", name: "Jane Maker", lines: ["414 Dundas Street West","Apt 3","Toronto, ON  M5T 1G8","Canada"], phone: "+1 416 555 0142", primary: true },
  { id: "billing",  label: "Billing",  name: "Jane Maker", lines: ["414 Dundas Street West","Apt 3","Toronto, ON  M5T 1G8","Canada"], phone: "+1 416 555 0142", primary: false },
]

/* ── Root ── */
export function DashboardClient({ user, orders }: { user: UserInfo; orders: Order[] }) {
  const router = useRouter()
  const { t } = useLanguage()
  const d = t.dashboard
  const [section, setSection] = useState<Section>("overview")
  const [openOrder, setOpenOrder] = useState<string | null>(null)

  function go(k: Section) { setSection(k); setOpenOrder(null); window.scrollTo({ top: 0, behavior: "smooth" }) }

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/account")
    router.refresh()
  }

  const sectionDefs: { key: Section; label: string; Icon: () => React.JSX.Element }[] = [
    { key: "overview",  label: d.sections.overview,  Icon: IconOverview },
    { key: "orders",    label: d.sections.orders,    Icon: IconBox },
    { key: "saved",     label: d.sections.saved,     Icon: IconHeart },
    { key: "profile",   label: d.sections.profile,   Icon: IconUserLine },
    { key: "addresses", label: d.sections.addresses, Icon: IconPin },
  ]

  return (
    <main style={{ background: "var(--paper)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "278px 1fr", minHeight: "calc(100vh - 122px)" }}>

        {/* Left rail */}
        <aside style={{ borderRight: "1px solid var(--line)", padding: "64px 40px", display: "flex", flexDirection: "column", gap: 40, position: "sticky", top: 122, alignSelf: "start", height: "calc(100vh - 122px)", overflowY: "auto" }}>
          {/* User block */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ width: 46, height: 46, border: "1.5px solid var(--ink)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-serif)", fontSize: 17, color: "var(--ink)", letterSpacing: "0.5px", flexShrink: 0 }}>
              {user.initials}
            </span>
            <div style={{ minWidth: 0 }}>
              <p style={{ margin: 0, fontFamily: "var(--font-serif)", fontSize: 18, color: "var(--ink)", lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {user.name}
              </p>
              <p style={{ margin: "3px 0 0", fontSize: 9, letterSpacing: "1.6px", textTransform: "uppercase", color: "var(--ash)", whiteSpace: "nowrap" }}>
                {d.memberSince} {user.since}
              </p>
            </div>
          </div>

          {/* Nav */}
          <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {sectionDefs.map(({ key, label, Icon }) => {
              const on = section === key
              return (
                <RailButton key={key} active={on} onClick={() => go(key)}>
                  <Icon />
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 500, letterSpacing: "2.2px", textTransform: "uppercase" }}>{label}</span>
                  {on && <span style={{ marginLeft: "auto", width: 5, height: 5, background: "var(--teal)", flexShrink: 0 }} />}
                </RailButton>
              )
            })}
          </nav>

          {/* Sign out */}
          <button
            onClick={handleSignOut}
            style={{ display: "flex", alignItems: "center", gap: 11, background: "none", border: "none", cursor: "pointer", padding: 0, color: "var(--ash)", transition: "color var(--dur-fast)", marginTop: 4, fontFamily: "var(--font-sans)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ash)")}
          >
            <IconArrowOut />
            <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", whiteSpace: "nowrap" }}>
              {d.signOut}
            </span>
          </button>
        </aside>

        {/* Content area */}
        <div style={{ padding: "64px 64px 110px", maxWidth: 980 }}>
          {section === "overview"  && <Overview  d={d} user={user} orders={orders} goOrders={() => go("orders")} goSaved={() => go("saved")} onOpenOrder={(id) => { setOpenOrder(id); go("orders") }} />}
          {section === "orders"    && <Orders    d={d} orders={orders} openOrder={openOrder} setOpenOrder={setOpenOrder} />}
          {section === "saved"     && <SavedView d={d} />}
          {section === "profile"   && <Profile   d={d} user={user} />}
          {section === "addresses" && <Addresses d={d} />}
        </div>
      </div>
    </main>
  )
}

/* ── Rail button ── */
function RailButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  const [hover, setHover] = useState(false)
  return (
    <button onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: "flex", alignItems: "center", gap: 13, background: "none", border: "none", borderBottom: "1px solid var(--line)", cursor: "pointer", padding: "11px 0", textAlign: "left", color: active ? "var(--ink)" : hover ? "var(--teal)" : "var(--ash)", transition: "color var(--dur-fast)" }}
    >{children}</button>
  )
}

/* ── Overview ── */
function Overview({ d, user, orders, goOrders, goSaved, onOpenOrder }: { d: D; user: UserInfo; orders: Order[]; goOrders: () => void; goSaved: () => void; onOpenOrder: (id: string) => void }) {
  const recent = orders[0] ?? null
  return (
    <div>
      <header style={{ marginBottom: 56 }}>
        <Eyebrow style={{ display: "block", marginBottom: 16 }}>{d.eyebrow}</Eyebrow>
        <h1 style={headingStyle}>{d.welcomeBack} {user.first}.</h1>
        <p style={{ margin: "18px 0 0", maxWidth: 480, fontSize: 13, lineHeight: 1.8, letterSpacing: "0.3px", color: "var(--slate)" }}>
          {recent ? d.recentOrderText : d.noOrdersText}
        </p>
      </header>

      {/* Recent order */}
      <section style={{ marginBottom: 56 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 22 }}>
          <Eyebrow bullet size="sm">{d.mostRecentOrder}</Eyebrow>
          <ArrowLink onClick={goOrders}>{d.allOrders}</ArrowLink>
        </div>

        {recent ? (
          <article style={{ border: "1px solid var(--line)", background: "var(--paper)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 24, padding: "28px 32px", borderBottom: "1px solid var(--line)", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 26, flexWrap: "wrap" }}>
                <MetaCell label={d.orderLabel} value={`#${recent.id}`} />
                <Hair />
                <MetaCell label={d.placedLabel} value={recent.date} />
                <Hair />
                <MetaCell label={d.totalLabel} value={recent.total} />
              </div>
              <StatusTag status={recent.status} d={d} />
            </div>
            <div style={{ padding: "30px 32px 34px" }}>
              <StatusTrack status={recent.status} d={d} />
              {recent.note && (
                <p style={{ margin: "30px 0 26px", maxWidth: 520, fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 17, lineHeight: 1.6, color: "var(--ink)" }}>{recent.note}</p>
              )}
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
                <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
                  {recent.items.map((it) => <ItemThumb key={it.name} item={it} />)}
                </div>
                <OutlineButton onClick={() => onOpenOrder(recent.id)}>{d.viewOrder}</OutlineButton>
              </div>
            </div>
          </article>
        ) : (
          <EmptyBox>
            <p style={{ margin: 0, fontSize: 12, color: "var(--ash)", fontFamily: "var(--font-sans)", letterSpacing: "0.3px" }}>{d.noOrdersYet}</p>
            <ArrowLink href="/collections">{d.browseShop}</ArrowLink>
          </EmptyBox>
        )}
      </section>

      {/* Saved preview */}
      <section>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 24 }}>
          <Eyebrow bullet size="sm">{d.savedPieces}</Eyebrow>
          <ArrowLink onClick={goSaved}>{d.viewAll}</ArrowLink>
        </div>
        <SavedGrid d={d} compact maxItems={4} emptyLabel={d.noSavedPiecesOverview} />
      </section>
    </div>
  )
}

/* ── Orders ── */
function Orders({ d, orders, openOrder, setOpenOrder }: { d: D; orders: Order[]; openOrder: string | null; setOpenOrder: (id: string | null) => void }) {
  return (
    <div>
      <PageHead eyebrow={d.eyebrow} title={d.ordersTitle} sub={d.ordersSub} />
      {orders.length === 0 ? (
        <EmptyBox>
          <p style={{ margin: 0, fontSize: 12, color: "var(--ash)", fontFamily: "var(--font-sans)", letterSpacing: "0.3px" }}>{d.noOrdersPlaced}</p>
          <ArrowLink href="/collections">{d.browseShop}</ArrowLink>
        </EmptyBox>
      ) : (
        <div>
          {orders.map((o, i) => (
            <OrderRow key={o.id} d={d} order={o} open={openOrder === o.id} onToggle={() => setOpenOrder(openOrder === o.id ? null : o.id)} first={i === 0} />
          ))}
        </div>
      )}
    </div>
  )
}

function OrderRow({ d, order, open, onToggle, first }: { d: D; order: Order; open: boolean; onToggle: () => void; first: boolean }) {
  return (
    <article style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", marginTop: first ? 0 : -1 }}>
      <button onClick={onToggle} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", display: "grid", gridTemplateColumns: "auto 1fr auto auto", gap: 28, alignItems: "center", padding: "26px 8px", textAlign: "left" }}>
        <div style={{ display: "flex" }}>
          {order.items.slice(0, 3).map((it, idx) => (
            <div key={idx} style={{ width: 50, height: 62, background: "var(--mist)", overflow: "hidden", marginLeft: idx === 0 ? 0 : -14, boxShadow: idx === 0 ? "none" : "-6px 0 12px rgba(30,30,30,0.06)", border: "1px solid var(--paper)" }}>
              <img src={it.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
        </div>
        <div>
          <p style={{ margin: 0, fontSize: 13, letterSpacing: "0.3px", color: "var(--ink)" }}>{d.orderLabel} #{order.id}</p>
          <p style={{ margin: "6px 0 0", fontSize: 11, letterSpacing: "0.5px", color: "var(--ash)" }}>
            {order.date} · {order.items.length} {order.items.length === 1 ? d.piece : d.pieces} · {order.total}
          </p>
        </div>
        <StatusTag status={order.status} d={d} />
        <span style={{ fontSize: 10, letterSpacing: "1.8px", textTransform: "uppercase", color: "var(--ash)", display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-sans)" }}>
          {open ? d.close : d.details}
          <span style={{ display: "inline-block", transform: open ? "rotate(180deg)" : "none", transition: "transform var(--dur-fast)" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          </span>
        </span>
      </button>

      {open && (
        <div style={{ padding: "8px 8px 36px" }}>
          <div style={{ background: "var(--mist)", padding: "30px 32px", marginBottom: 24 }}>
            <StatusTrack status={order.status} d={d} />
            {order.eta && <p style={{ margin: "22px 0 0", fontSize: 11, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--ash)", fontFamily: "var(--font-sans)" }}>{order.eta}</p>}
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
            <span style={{ fontSize: 11, letterSpacing: "1.8px", textTransform: "uppercase", color: "var(--ash)", fontFamily: "var(--font-sans)" }}>{d.orderTotal}</span>
            <span style={{ fontFamily: "var(--font-serif)", fontSize: 20, color: "var(--ink)" }}>{order.total}</span>
          </div>
          {order.engraving && (
            <div style={{ marginTop: 18, paddingTop: 18, borderTop: "1px solid var(--line)" }}>
              <p style={{ margin: 0, fontSize: 9, letterSpacing: "1.8px", textTransform: "uppercase", color: "var(--ash)", fontFamily: "var(--font-sans)" }}>{d.engraving}</p>
              <p style={{ margin: "5px 0 0", fontSize: 13, color: "var(--ink)", fontFamily: "var(--font-serif)", fontStyle: "italic" }}>&ldquo;{order.engraving}&rdquo;</p>
            </div>
          )}
          {order.address && (
            <div style={{ marginTop: 14 }}>
              <p style={{ margin: 0, fontSize: 9, letterSpacing: "1.8px", textTransform: "uppercase", color: "var(--ash)", fontFamily: "var(--font-sans)" }}>{d.shipTo}</p>
              <p style={{ margin: "5px 0 0", fontSize: 12, lineHeight: 1.6, color: "var(--slate)", fontFamily: "var(--font-sans)" }}>{order.address}</p>
            </div>
          )}
          <div style={{ display: "flex", gap: 12, marginTop: 26 }}>
            <OutlineButton>{d.viewInvoice}</OutlineButton>
            {order.status === "delivered" && <TextButton>{d.buyAgain}</TextButton>}
          </div>
        </div>
      )}
    </article>
  )
}

/* ── Saved ── */
function SavedView({ d }: { d: D }) {
  return (
    <div>
      <PageHead eyebrow={d.eyebrow} title={d.savedTitle} sub={d.savedSub} />
      <SavedGrid d={d} />
    </div>
  )
}

function SavedGrid({ d, compact, maxItems, emptyLabel }: { d: D; compact?: boolean; maxItems?: number; emptyLabel?: string }) {
  const { savedSlugs, toggle } = useSaved()
  const savedProducts = savedSlugs.map((slug) => products.find((p) => p.slug === slug)).filter(Boolean) as typeof products
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
          {emptyLabel ?? d.noSavedPieces}
        </p>
        <Link href="/collections" style={{ marginTop: 16, fontSize: 10, fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "var(--ink)", fontFamily: "var(--font-sans)" }}>
          {d.browseShopArrow}
        </Link>
      </div>
    )
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: compact ? "repeat(4, 1fr)" : "repeat(3, 1fr)", gap: compact ? 24 : "40px 32px" }}>
      {displayed.map((p) => <SavedCard key={p.slug} d={d} piece={p} compact={compact} onRemove={() => toggle(p.slug)} />)}
    </div>
  )
}

function SavedCard({ d, piece, compact, onRemove }: { d: D; piece: typeof products[number]; compact?: boolean; onRemove: () => void }) {
  const [hover, setHover] = useState(false)
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ position: "relative" }}>
      <Link href={`/products/${piece.slug}`} style={{ display: "block", textDecoration: "none" }}>
        <div style={{ position: "relative", aspectRatio: "3 / 4", background: "var(--mist)", overflow: "hidden" }}>
          <img src={piece.img} alt={piece.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform var(--dur-slow) var(--ease-out-soft)", transform: hover ? "scale(1.04)" : "none" }} />
          <button
            aria-label={d.removeFromSaved}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onRemove() }}
            style={{ position: "absolute", top: 10, right: 10, width: 30, height: 30, background: "rgba(255,255,255,0.92)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink)", opacity: hover ? 1 : 0, transition: "opacity var(--dur-fast)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--teal)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink)")}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div style={{ marginTop: 14 }}>
          <p style={{ margin: 0, fontSize: 8.5, letterSpacing: "2px", textTransform: "uppercase", color: "var(--ash)", fontFamily: "var(--font-sans)" }}>{piece.collection}</p>
          <p style={{ margin: "7px 0 0", fontSize: compact ? 12 : 13, letterSpacing: "0.5px", textTransform: "uppercase", color: "var(--ink)", fontFamily: "var(--font-sans)", transition: "color var(--dur-fast)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--teal)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink)")}
          >{piece.name}</p>
          <span style={{ display: "block", marginTop: compact ? 7 : 10, fontSize: 12, color: "var(--ink)", fontFamily: "var(--font-sans)" }}>{piece.price}</span>
        </div>
      </Link>
    </div>
  )
}

/* ── Profile ── */
function Profile({ d, user }: { d: D; user: UserInfo }) {
  return (
    <div>
      <PageHead eyebrow={d.eyebrow} title={d.profileTitle} sub={d.profileSub} />
      <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 40, maxWidth: 620 }}>
        <Eyebrow style={{ paddingTop: 4 }}>{d.loginDetails}</Eyebrow>
        <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <LineInput label={d.fullNameLabel} defaultValue={user.name} />
          <LineInput label={d.emailLabel} type="email" defaultValue={user.email} />
          <div>
            <LineInput label={d.passwordLabel} type="password" defaultValue="••••••••••" />
            <p style={{ margin: "10px 0 0", fontSize: 10, letterSpacing: "0.4px", color: "var(--ash)", fontFamily: "var(--font-sans)" }}>{d.lastChanged}</p>
          </div>
          <div style={{ borderTop: "1px solid var(--line)", paddingTop: 26, marginTop: 4 }}>
            <Eyebrow style={{ display: "block", marginBottom: 18 }}>{d.studioNotes}</Eyebrow>
            <PrefRow defaultChecked label={d.prefNewPieces}  hint={d.prefNewPiecesHint} />
            <PrefRow defaultChecked label={d.prefJournal}    hint={d.prefJournalHint} />
            <PrefRow               label={d.prefSMS}         hint={d.prefSMSHint} />
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <SolidButton type="submit">{d.saveChanges}</SolidButton>
            <TextButton type="button">{d.cancel}</TextButton>
          </div>
        </form>
      </div>
    </div>
  )
}

/* ── Addresses ── */
function Addresses({ d }: { d: D }) {
  return (
    <div>
      <PageHead eyebrow={d.eyebrow} title={d.addressesTitle} sub={d.addressesSub} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24, maxWidth: 720 }}>
        {ADDRESSES.map((a) => <AddressCard key={a.id} d={d} address={a} />)}
        <AddressAdd d={d} />
      </div>
    </div>
  )
}

function AddressCard({ d, address: a }: { d: D; address: Address }) {
  return (
    <article style={{ border: "1px solid var(--line)", padding: "26px 28px", display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Eyebrow size="sm">{a.label}</Eyebrow>
        {a.primary && (
          <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", background: "var(--ink)", color: "var(--paper)", padding: "3px 8px", fontFamily: "var(--font-sans)" }}>
            {d.defaultLabel}
          </span>
        )}
      </div>
      <div>
        <p style={{ margin: 0, fontSize: 13, color: "var(--ink)", letterSpacing: "0.3px", fontFamily: "var(--font-sans)" }}>{a.name}</p>
        {a.lines.map((l) => <p key={l} style={{ margin: "5px 0 0", fontSize: 12, lineHeight: 1.6, color: "var(--slate)", fontFamily: "var(--font-sans)" }}>{l}</p>)}
        <p style={{ margin: "10px 0 0", fontSize: 12, color: "var(--ash)", fontFamily: "var(--font-sans)" }}>{a.phone}</p>
      </div>
      <div style={{ display: "flex", gap: 18, marginTop: "auto", paddingTop: 6 }}>
        <TextLink>{d.edit}</TextLink>
        {!a.primary && <TextLink>{d.remove}</TextLink>}
        {!a.primary && <TextLink>{d.setAsDefault}</TextLink>}
      </div>
    </article>
  )
}

function AddressAdd({ d }: { d: D }) {
  const [hover, setHover] = useState(false)
  return (
    <button onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ minHeight: 200, border: `1.5px dashed ${hover ? "var(--ink)" : "var(--line)"}`, background: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, color: hover ? "var(--ink)" : "var(--ash)", transition: "color var(--dur-fast), border-color var(--dur-fast)" }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
      <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: "2.2px", textTransform: "uppercase", fontFamily: "var(--font-sans)" }}>
        {d.addAddress}
      </span>
    </button>
  )
}

/* ── StatusTrack ── */
function StatusTrack({ status, d }: { status: Order["status"]; d: D }) {
  const stages = [
    { key: "ordered",   label: d.orderStages.ordered   },
    { key: "workshop",  label: d.orderStages.workshop  },
    { key: "shipped",   label: d.orderStages.shipped   },
    { key: "delivered", label: d.orderStages.delivered },
  ] as const
  const current = stages.findIndex((s) => s.key === status)
  const n = stages.length
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${n}, 1fr)`, position: "relative" }}>
      <div style={{ position: "absolute", left: `${100/(n*2)}%`, right: `${100/(n*2)}%`, top: 6, height: 1, background: "var(--line)" }} />
      <div style={{ position: "absolute", left: `${100/(n*2)}%`, top: 6, height: 1, background: "var(--ink)", width: `calc(${(current/(n-1))*100}% - ${(current/(n-1))*(100/n)}%)`, transition: "width 550ms var(--ease-out-soft)" }} />
      {stages.map((s, i) => {
        const done = i < current
        const active = i === current
        return (
          <div key={s.key} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, position: "relative" }}>
            <span style={{ width: 13, height: 13, borderRadius: 999, boxSizing: "border-box", background: done ? "var(--ink)" : "var(--paper)", border: done ? "1.5px solid var(--ink)" : active ? "1.5px solid var(--teal)" : "1.5px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {active && <span style={{ width: 5, height: 5, borderRadius: 999, background: "var(--teal)" }} />}
            </span>
            <span style={{ fontSize: 9.5, fontWeight: active ? 600 : 500, letterSpacing: "1.4px", textTransform: "uppercase", textAlign: "center", fontFamily: "var(--font-sans)", color: active || done ? "var(--ink)" : "var(--ash)" }}>
              {s.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

/* ── StatusTag ── */
function StatusTag({ status, d }: { status: Order["status"]; d: D }) {
  const labels: Record<Order["status"], string> = {
    ordered: d.orderStages.ordered,
    workshop: d.orderStages.workshop,
    shipped: d.orderStages.shipped,
    delivered: d.orderStages.delivered,
  }
  const label = labels[status] ?? status
  const solid = status === "delivered"
  return (
    <span style={{ display: "inline-block", padding: "4px 10px", fontSize: 9, fontWeight: 600, letterSpacing: "1.6px", textTransform: "uppercase", fontFamily: "var(--font-sans)", background: solid ? "var(--ink)" : "transparent", color: solid ? "var(--paper)" : "var(--ink)", border: solid ? "none" : "1px solid var(--ink)", whiteSpace: "nowrap" }}>
      {label}
    </span>
  )
}

/* ── Primitives ── */
const headingStyle: React.CSSProperties = { margin: 0, fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: 40, letterSpacing: "-0.02em", lineHeight: 1.08, color: "var(--ink)" }

function PageHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <header style={{ marginBottom: 52 }}>
      <Eyebrow style={{ display: "block", marginBottom: 16 }}>{eyebrow}</Eyebrow>
      <h1 style={headingStyle}>{title}</h1>
      {sub && <p style={{ margin: "16px 0 0", maxWidth: 460, fontSize: 13, lineHeight: 1.8, letterSpacing: "0.3px", color: "var(--slate)", fontFamily: "var(--font-sans)" }}>{sub}</p>}
    </header>
  )
}

function Eyebrow({ children, style, size = "md", bullet }: { children: React.ReactNode; style?: React.CSSProperties; size?: "sm" | "md"; bullet?: boolean }) {
  return (
    <span style={{ fontFamily: "var(--font-sans)", fontSize: size === "sm" ? 9 : 10, fontWeight: 600, letterSpacing: size === "sm" ? "1.8px" : "2.5px", textTransform: "uppercase", color: "var(--ash)", ...style }}>
      {bullet && "• "}{children}
    </span>
  )
}

function EmptyBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ border: "1px solid var(--line)", padding: "40px 32px", display: "flex", flexDirection: "column", alignItems: "center", gap: 14, textAlign: "center" }}>
      <div style={{ width: 44, height: 44, border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ash)" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        </svg>
      </div>
      {children}
    </div>
  )
}

function ArrowLink({ children, onClick, href }: { children: React.ReactNode; onClick?: () => void; href?: string }) {
  const style: React.CSSProperties = { background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: 10, fontWeight: 500, letterSpacing: "1.8px", textTransform: "uppercase", color: "var(--ash)", transition: "color var(--dur-fast)", fontFamily: "var(--font-sans)", display: "inline-flex", alignItems: "center", gap: 6, whiteSpace: "nowrap", flexShrink: 0 }
  const content = <>{children} <span>→</span></>
  if (href) return <Link href={href} style={style} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--teal)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ash)")}>{content}</Link>
  return <button onClick={onClick} style={style} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--teal)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ash)")}>{content}</button>
}

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p style={{ margin: 0, fontSize: 9, letterSpacing: "1.8px", textTransform: "uppercase", color: "var(--ash)", fontFamily: "var(--font-sans)" }}>{label}</p>
      <p style={{ margin: "5px 0 0", fontSize: 13, letterSpacing: "0.3px", color: "var(--ink)", fontFamily: "var(--font-sans)" }}>{value}</p>
    </div>
  )
}

function Hair() { return <span style={{ width: 1, height: 26, background: "var(--line)", flexShrink: 0 }} /> }

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

function LineInput({ label, type = "text", defaultValue }: { label: string; type?: string; defaultValue?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <label style={{ fontSize: 9, letterSpacing: "2px", textTransform: "uppercase", color: "var(--ash)", fontFamily: "var(--font-sans)", fontWeight: 600 }}>{label}</label>
      <input type={type} defaultValue={defaultValue} style={{ background: "none", border: "none", borderBottom: "1.5px solid var(--line)", padding: "8px 0", fontSize: 13, color: "var(--ink)", fontFamily: "var(--font-sans)", letterSpacing: "0.3px", outline: "none", borderRadius: 0, width: "100%" }}
        onFocus={(e) => (e.currentTarget.style.borderBottomColor = "var(--ink)")}
        onBlur={(e) => (e.currentTarget.style.borderBottomColor = "var(--line)")}
      />
    </div>
  )
}

function PrefRow({ label, hint, defaultChecked }: { label: string; hint: string; defaultChecked?: boolean }) {
  const [on, setOn] = useState(!!defaultChecked)
  return (
    <button type="button" onClick={() => setOn(!on)} style={{ display: "flex", alignItems: "flex-start", gap: 13, background: "none", border: "none", cursor: "pointer", padding: "0 0 18px", textAlign: "left", width: "100%" }}>
      <span style={{ width: 16, height: 16, marginTop: 1, border: "1.5px solid var(--ink)", flexShrink: 0, background: on ? "var(--ink)" : "transparent", color: "var(--paper)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background var(--dur-fast)" }}>
        {on && <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
      </span>
      <span>
        <span style={{ display: "block", fontSize: 12, letterSpacing: "0.3px", color: "var(--ink)", fontFamily: "var(--font-sans)" }}>{label}</span>
        <span style={{ display: "block", fontSize: 11, color: "var(--ash)", marginTop: 3, fontFamily: "var(--font-sans)" }}>{hint}</span>
      </span>
    </button>
  )
}

function OutlineButton({ children, onClick, type }: { children: React.ReactNode; onClick?: () => void; type?: "button" | "submit" }) {
  return (
    <button type={type ?? "button"} onClick={onClick}
      style={{ background: "none", border: "1px solid var(--ink)", cursor: "pointer", padding: "10px 20px", fontSize: 10, fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "var(--ink)", transition: "background var(--dur-fast), color var(--dur-fast)", fontFamily: "var(--font-sans)" }}
      onMouseEnter={(e) => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.color = "var(--paper)" }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "var(--ink)" }}
    >{children}</button>
  )
}

function SolidButton({ children, type }: { children: React.ReactNode; type?: "button" | "submit" }) {
  return (
    <button type={type ?? "button"}
      style={{ background: "var(--ink)", border: "none", cursor: "pointer", padding: "12px 24px", fontSize: 10, fontWeight: 500, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--paper)", transition: "background var(--dur-fast)", fontFamily: "var(--font-sans)" }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--teal)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "var(--ink)")}
    >{children}</button>
  )
}

function TextButton({ children, type, onClick }: { children: React.ReactNode; type?: "button" | "submit"; onClick?: () => void }) {
  return (
    <button type={type ?? "button"} onClick={onClick}
      style={{ background: "none", border: "none", cursor: "pointer", padding: "12px 8px", fontSize: 10, fontWeight: 500, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--ash)", transition: "color var(--dur-fast)", fontFamily: "var(--font-sans)" }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ash)")}
    >{children}</button>
  )
}

function TextLink({ children }: { children: React.ReactNode }) {
  return (
    <button style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: 10, fontWeight: 500, letterSpacing: "1.8px", textTransform: "uppercase", color: "var(--ash)", transition: "color var(--dur-fast)", fontFamily: "var(--font-sans)" }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--teal)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ash)")}
    >{children}</button>
  )
}

/* ── Icons ── */
function ACIcon({ size = 17, children }: { size?: number; children: React.ReactNode }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>{children}</svg>
}
function IconOverview() { return <ACIcon><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></ACIcon> }
function IconBox()      { return <ACIcon><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.3 7 12 12 20.7 7"/><line x1="12" y1="22" x2="12" y2="12"/></ACIcon> }
function IconHeart()    { return <ACIcon><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></ACIcon> }
function IconUserLine() { return <ACIcon><circle cx="12" cy="7" r="4"/><path d="M4 21v-1a8 8 0 0 1 16 0v1"/></ACIcon> }
function IconPin()      { return <ACIcon><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></ACIcon> }
function IconArrowOut() { return <ACIcon size={16}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></ACIcon> }
