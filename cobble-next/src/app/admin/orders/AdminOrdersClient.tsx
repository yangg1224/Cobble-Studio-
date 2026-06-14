"use client"

import { useState, useTransition, useMemo } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import type { Order } from "@/lib/order-actions"
import { updateOrderStatus } from "@/lib/order-actions"

const ORDER_STAGES: { key: Order["status"]; label: string }[] = [
  { key: "ordered",   label: "Ordered" },
  { key: "workshop",  label: "In the workshop" },
  { key: "shipped",   label: "Shipped" },
  { key: "delivered", label: "Delivered" },
]

/* ── StatusTag ── */
function StatusTag({ status }: { status: Order["status"] }) {
  const label = ORDER_STAGES.find((s) => s.key === status)?.label ?? status
  const solid = status === "delivered"
  return (
    <span style={{
      display: "inline-block",
      padding: "4px 10px",
      fontSize: 9, fontWeight: 600, letterSpacing: "1.6px", textTransform: "uppercase",
      fontFamily: "var(--font-sans)",
      background: solid ? "var(--ink)" : status === "ordered" ? "transparent" : "var(--teal)",
      color: solid ? "var(--paper)" : status === "ordered" ? "var(--ink)" : "var(--paper)",
      border: status === "ordered" ? "1px solid var(--ink)" : "none",
      whiteSpace: "nowrap",
    }}>{label}</span>
  )
}

/* ── StatusTrack ── */
function StatusTrack({ status }: { status: Order["status"] }) {
  const current = ORDER_STAGES.findIndex((s) => s.key === status)
  const n = ORDER_STAGES.length
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${n}, 1fr)`, position: "relative", marginBottom: 28 }}>
      <div style={{ position: "absolute", left: `${100 / (n * 2)}%`, right: `${100 / (n * 2)}%`, top: 6, height: 1, background: "var(--line)" }} />
      <div style={{
        position: "absolute", left: `${100 / (n * 2)}%`, top: 6, height: 1,
        background: "var(--teal)",
        width: `calc(${(current / (n - 1)) * 100}% - ${(current / (n - 1)) * (100 / n)}%)`,
        transition: "width 400ms ease",
      }} />
      {ORDER_STAGES.map((s, i) => {
        const done = i < current
        const active = i === current
        return (
          <div key={s.key} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, position: "relative" }}>
            <span style={{
              width: 13, height: 13, borderRadius: 999, boxSizing: "border-box", background: "var(--paper)",
              border: done ? "1.5px solid var(--teal)" : active ? "1.5px solid var(--teal)" : "1.5px solid var(--line)",
              display: "flex", alignItems: "center", justifyContent: "center",
              ...(done ? { background: "var(--teal)" } : {}),
            }}>
              {active && <span style={{ width: 5, height: 5, borderRadius: 999, background: "var(--teal)" }} />}
            </span>
            <span style={{
              fontSize: 9, fontWeight: active ? 600 : 500, letterSpacing: "1.4px",
              textTransform: "uppercase", textAlign: "center", fontFamily: "var(--font-sans)",
              color: active || done ? "var(--ink)" : "var(--ash)",
            }}>{s.label}</span>
          </div>
        )
      })}
    </div>
  )
}

/* ── StatsStrip ── */
function StatCard({ label, value, swatch, first }: {
  label: string; value: string; swatch?: React.ReactNode; first?: boolean
}) {
  return (
    <div style={{
      padding: "4px 22px",
      paddingLeft: first ? 0 : undefined,
      borderLeft: first ? "none" : "1px solid var(--line)",
      minWidth: 0,
    }}>
      <p style={{
        margin: "0 0 10px",
        fontSize: 9, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase",
        color: "var(--ash)", fontFamily: "var(--font-sans)",
        display: "flex", alignItems: "center", gap: 0,
      }}>
        {swatch}
        {label}
      </p>
      <p style={{
        margin: 0,
        fontFamily: "var(--font-serif)", fontSize: 30, fontWeight: 400,
        letterSpacing: "-0.01em", color: "var(--ink)", lineHeight: 1,
      }}>{value}</p>
    </div>
  )
}

function StatsStrip({ counts, revenueLabel }: {
  counts: { all: number; ordered: number; workshop: number; shipped: number; delivered: number }
  revenueLabel: string
}) {
  const swatchOrdered = <span style={{ display: "inline-block", width: 5, height: 5, border: "1px solid var(--ink)", background: "transparent", marginRight: 7, flexShrink: 0, verticalAlign: "middle" }} />
  const swatchWorkshop = <span style={{ display: "inline-block", width: 5, height: 5, background: "var(--teal)", marginRight: 7, flexShrink: 0, verticalAlign: "middle" }} />
  const swatchShipped = <span style={{ display: "inline-block", width: 5, height: 5, background: "var(--teal)", opacity: 0.55, marginRight: 7, flexShrink: 0, verticalAlign: "middle" }} />
  const swatchDelivered = <span style={{ display: "inline-block", width: 5, height: 5, background: "var(--ink)", marginRight: 7, flexShrink: 0, verticalAlign: "middle" }} />

  return (
    <div style={{ background: "var(--mist)", borderBottom: "1px solid var(--line)", padding: "28px clamp(20px,6vw,64px)" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div className="admin-stats-grid">
          <StatCard first label="Total Orders" value={String(counts.all)} />
          <StatCard label="Ordered" value={String(counts.ordered)} swatch={swatchOrdered} />
          <StatCard label="In the workshop" value={String(counts.workshop)} swatch={swatchWorkshop} />
          <StatCard label="Shipped" value={String(counts.shipped)} swatch={swatchShipped} />
          <StatCard label="Delivered" value={String(counts.delivered)} swatch={swatchDelivered} />
          <StatCard label="Revenue" value={revenueLabel} />
        </div>
      </div>
    </div>
  )
}

/* ── SearchField ── */
function SearchField({ query, onChange, onClear }: {
  query: string; onChange: (v: string) => void; onClear: () => void
}) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 220, maxWidth: 360 }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--ash)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
      <input
        type="text"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by order #, name, or email"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          background: "none", border: "none",
          borderBottom: `1.5px solid ${focused ? "var(--ink)" : "var(--line)"}`,
          padding: "8px 0", fontSize: 13, color: "var(--ink)",
          fontFamily: "var(--font-sans)", letterSpacing: "0.3px",
          outline: "none", borderRadius: 0, width: "100%",
          transition: "border-color var(--dur-fast)",
        }}
      />
      {query && (
        <button
          onClick={onClear}
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: "var(--ash)", padding: "2px 4px", flexShrink: 0,
            opacity: 1, transition: "color var(--dur-fast)", fontSize: 14, lineHeight: 1,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ash)")}
          aria-label="Clear search"
        >×</button>
      )}
    </div>
  )
}

/* ── FilterTabs ── */
type FilterValue = "all" | Order["status"]

function FilterTabs({ filter, counts, onSelect }: {
  filter: FilterValue
  counts: { all: number; ordered: number; workshop: number; shipped: number; delivered: number }
  onSelect: (v: FilterValue) => void
}) {
  const tabs: { key: FilterValue; label: string; count: number }[] = [
    { key: "all",       label: "All",             count: counts.all },
    { key: "ordered",   label: "Ordered",          count: counts.ordered },
    { key: "workshop",  label: "In the workshop",  count: counts.workshop },
    { key: "shipped",   label: "Shipped",          count: counts.shipped },
    { key: "delivered", label: "Delivered",        count: counts.delivered },
  ]

  return (
    <div className="admin-filter-tabs" style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
      {tabs.map(({ key, label, count }) => {
        const active = filter === key
        return (
          <FilterTab
            key={key}
            active={active}
            label={label}
            count={count}
            onClick={() => onSelect(key)}
          />
        )
      })}
    </div>
  )
}

function FilterTab({ active, label, count, onClick }: {
  active: boolean; label: string; count: number; onClick: () => void
}) {
  const [hover, setHover] = useState(false)
  const [pressed, setPressed] = useState(false)

  const borderColor = active ? "var(--teal)" : hover ? "var(--ink)" : "var(--line)"
  const bg = active ? "var(--teal)" : "var(--paper)"
  const color = active ? "var(--paper)" : hover ? "var(--ink)" : "var(--ash)"

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPressed(false) }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        padding: "8px 14px",
        fontSize: 10, fontWeight: 500, letterSpacing: "1.6px", textTransform: "uppercase",
        fontFamily: "var(--font-sans)", cursor: "pointer", whiteSpace: "nowrap",
        display: "inline-flex", alignItems: "center", gap: 7,
        border: `1px solid ${borderColor}`,
        background: bg,
        color: color,
        transform: pressed ? "scale(0.97)" : "none",
        transition: "background var(--dur-fast), color var(--dur-fast), border-color var(--dur-fast), transform var(--dur-fast)",
      }}
    >
      {label}
      <span style={{ fontSize: 9, opacity: 0.7, color: active ? "var(--paper)" : "var(--ash)" }}>{count}</span>
    </button>
  )
}

/* ── OrderRow ── */
function OrderRow({ order, open, onToggle, first }: {
  order: Order; open: boolean; onToggle: () => void; first: boolean
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [localStatus, setLocalStatus] = useState<Order["status"]>(order.status)
  const [rowHover, setRowHover] = useState(false)
  const [btnPressedStage, setBtnPressedStage] = useState<string | null>(null)

  function advanceStatus(next: Order["status"]) {
    setLocalStatus(next)
    startTransition(async () => {
      await updateOrderStatus(order.id, next)
      router.refresh()
    })
  }

  const currentIndex = ORDER_STAGES.findIndex((s) => s.key === localStatus)
  const currentLabel = ORDER_STAGES[currentIndex]?.label ?? localStatus

  const extraItems = order.items.length - 3

  return (
    <article style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", marginTop: first ? 0 : -1 }}>
      {/* Row header */}
      <button
        onClick={onToggle}
        onMouseEnter={() => setRowHover(true)}
        onMouseLeave={() => setRowHover(false)}
        style={{
          width: "100%", border: "none", cursor: "pointer",
          display: "grid", gridTemplateColumns: "auto 1fr auto auto", gap: 24,
          alignItems: "center", padding: "22px 8px", textAlign: "left",
          background: rowHover ? "var(--mist)" : "var(--paper)",
          transition: `background var(--dur-fast)`,
        }}
      >
        {/* Item thumbnails */}
        <div style={{ display: "flex" }}>
          {order.items.slice(0, 3).map((it, idx) => (
            <div key={idx} style={{
              width: 46, height: 58, background: "var(--mist)", overflow: "hidden",
              marginLeft: idx === 0 ? 0 : -12,
              border: "1px solid var(--paper)",
              boxShadow: idx === 0 ? "none" : "-4px 0 8px rgba(30,30,30,0.06)",
              position: "relative",
            }}>
              <Image src={it.img} alt={it.name} fill className="object-contain" sizes="46px" />
            </div>
          ))}
          {extraItems > 0 && (
            <div style={{
              width: 46, height: 58, background: "var(--mist)", overflow: "hidden",
              marginLeft: -12, border: "1px solid var(--paper)",
              boxShadow: "-4px 0 8px rgba(30,30,30,0.06)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontSize: 11, color: "var(--ash)", fontFamily: "var(--font-sans)" }}>+{extraItems}</span>
            </div>
          )}
        </div>

        {/* Meta */}
        <div>
          <p style={{ margin: 0, fontSize: 12, letterSpacing: "0.3px", color: "var(--ink)", fontFamily: "var(--font-sans)" }}>
            Order #{order.id}
          </p>
          <p style={{ margin: "4px 0 0", fontSize: 11, color: "var(--ash)", fontFamily: "var(--font-sans)" }}>
            {order.customerName}
            {order.customerEmail && (
              <span style={{ marginLeft: 8, color: "var(--ash)", opacity: 0.7, display: "inline-block" }}>{order.customerEmail}</span>
            )}
          </p>
          <p style={{ margin: "3px 0 0", fontSize: 11, color: "var(--ash)", fontFamily: "var(--font-sans)" }}>
            {order.date} · {order.items.length} {order.items.length === 1 ? "piece" : "pieces"} · {order.total}
          </p>
        </div>

        <StatusTag status={localStatus} />

        <span style={{
          fontSize: 10, letterSpacing: "1.8px", textTransform: "uppercase",
          color: "var(--ash)", display: "inline-flex", alignItems: "center", gap: 6,
          fontFamily: "var(--font-sans)",
        }}>
          {open ? "Close" : "Manage"}
          <span style={{
            display: "inline-block",
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 200ms",
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </span>
        </span>
      </button>

      {/* Expanded detail */}
      {open && (
        <div style={{ padding: "4px 8px 36px" }}>

          {/* Status management panel */}
          <div style={{ background: "var(--mist)", padding: "28px 32px 24px", marginBottom: 24 }}>
            <StatusTrack status={localStatus} />

            {/* Header row */}
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", margin: "0 0 14px" }}>
              <p style={{
                margin: 0,
                fontSize: 9, fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase",
                color: "var(--ash)", fontFamily: "var(--font-sans)",
              }}>Update Status</p>
              <span style={{
                fontSize: 10, letterSpacing: "1.4px", textTransform: "uppercase",
                fontFamily: "var(--font-sans)", color: "var(--ink)",
                display: "inline-flex", alignItems: "center", gap: 7,
              }}>
                Currently · {currentLabel}
                {isPending && (
                  <span className="admin-pending-dot" style={{
                    display: "inline-block", width: 5, height: 5, background: "var(--teal)", flexShrink: 0,
                  }} />
                )}
              </span>
            </div>

            {/* Stage buttons */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {ORDER_STAGES.map((s, i) => {
                const active = localStatus === s.key
                const isDone = i < currentIndex
                const isNext = i === currentIndex + 1
                const pressed = btnPressedStage === s.key

                let borderColor = "var(--line)"
                let bg = "var(--paper)"
                let color = "var(--ash)"

                if (active) {
                  borderColor = "var(--teal)"
                  bg = "var(--teal)"
                  color = "var(--paper)"
                } else if (isDone) {
                  borderColor = "var(--line)"
                  bg = "var(--paper)"
                  color = "var(--ink)"
                } else if (isNext) {
                  borderColor = "var(--ink)"
                  bg = "var(--paper)"
                  color = "var(--ink)"
                }

                return (
                  <button
                    key={s.key}
                    onClick={() => advanceStatus(s.key)}
                    disabled={isPending}
                    onMouseEnter={(e) => {
                      if (isPending || active) return
                      if (isNext) {
                        e.currentTarget.style.background = "var(--ink)"
                        e.currentTarget.style.color = "var(--paper)"
                        e.currentTarget.style.borderColor = "var(--ink)"
                      } else if (!isDone) {
                        e.currentTarget.style.borderColor = "var(--ink)"
                        e.currentTarget.style.color = "var(--ink)"
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (isPending || active) return
                      if (isNext) {
                        e.currentTarget.style.background = "var(--paper)"
                        e.currentTarget.style.color = "var(--ink)"
                        e.currentTarget.style.borderColor = "var(--ink)"
                      } else if (isDone) {
                        e.currentTarget.style.borderColor = "var(--line)"
                        e.currentTarget.style.color = "var(--ink)"
                      } else {
                        e.currentTarget.style.borderColor = "var(--line)"
                        e.currentTarget.style.color = "var(--ash)"
                      }
                    }}
                    onMouseDown={() => setBtnPressedStage(s.key)}
                    onMouseUp={() => setBtnPressedStage(null)}
                    style={{
                      padding: "9px 16px",
                      fontSize: 10, fontWeight: 500, letterSpacing: "1.8px", textTransform: "uppercase",
                      fontFamily: "var(--font-sans)",
                      cursor: isPending ? "not-allowed" : "pointer",
                      border: "1px solid",
                      borderColor,
                      background: bg,
                      color,
                      transition: "background var(--dur-fast), color var(--dur-fast), border-color var(--dur-fast), transform var(--dur-fast)",
                      opacity: isPending ? 0.6 : 1,
                      transform: pressed && !isPending ? "scale(0.97)" : "none",
                      display: "inline-flex", alignItems: "center", gap: 6,
                    }}
                  >
                    {isDone && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    )}
                    {s.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Items */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {order.items.map((it, idx) => (
              <div key={idx} style={{
                display: "flex", alignItems: "center", gap: 16,
                padding: "14px 0", borderBottom: "1px solid var(--line)",
              }}>
                <div style={{ width: 52, height: 64, background: "var(--mist)", overflow: "hidden", flexShrink: 0, position: "relative" }}>
                  <Image src={it.img} alt={it.name} fill className="object-contain" sizes="52px" />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 12, letterSpacing: "0.3px", color: "var(--ink)", fontFamily: "var(--font-sans)" }}>{it.name}</p>
                  <p style={{ margin: "4px 0 0", fontSize: 11, color: "var(--ash)", fontFamily: "var(--font-sans)" }}>Qty {it.qty}</p>
                </div>
                <p style={{ margin: 0, fontSize: 12, color: "var(--ink)", fontFamily: "var(--font-sans)" }}>{it.price}</p>
              </div>
            ))}
          </div>

          {/* Details grid */}
          <div className="admin-detail-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 20 }}>
            {order.address && (
              <div>
                <p style={{ margin: "0 0 4px", fontSize: 9, fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "var(--ash)", fontFamily: "var(--font-sans)" }}>Ship to</p>
                <p style={{ margin: 0, fontSize: 12, lineHeight: 1.65, color: "var(--ink)", fontFamily: "var(--font-sans)", whiteSpace: "pre-line" }}>{order.address}</p>
              </div>
            )}
            {order.engraving && (
              <div>
                <p style={{ margin: "0 0 4px", fontSize: 9, fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "var(--ash)", fontFamily: "var(--font-sans)" }}>Engraving</p>
                <p style={{ margin: 0, fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 15, color: "var(--ink)" }}>&ldquo;{order.engraving}&rdquo;</p>
              </div>
            )}
          </div>

          {/* Note */}
          {order.note && (
            <div style={{ marginTop: 16 }}>
              <p style={{ margin: "0 0 4px", fontSize: 9, fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "var(--ash)", fontFamily: "var(--font-sans)" }}>Note</p>
              <p style={{ margin: 0, fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 15, color: "var(--ink)", lineHeight: 1.6 }}>{order.note}</p>
            </div>
          )}

          {/* Total row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20, paddingTop: 16, borderTop: "1px solid var(--line)" }}>
            <span style={{ fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: "var(--ash)", fontFamily: "var(--font-sans)" }}>Order total</span>
            <span style={{ fontFamily: "var(--font-serif)", fontSize: 20, color: "var(--ink)" }}>{order.total}</span>
          </div>
        </div>
      )}
    </article>
  )
}

/* ── AdminOrdersClient ── */
export function AdminOrdersClient({ orders }: { orders: Order[] }) {
  const [openOrder, setOpenOrder] = useState<string | null>(null)
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<FilterValue>("all")

  const counts = useMemo(() => ({
    all:       orders.length,
    ordered:   orders.filter((o) => o.status === "ordered").length,
    workshop:  orders.filter((o) => o.status === "workshop").length,
    shipped:   orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
  }), [orders])

  const revenue = useMemo(() => {
    const sum = orders.reduce((acc, o) => acc + (parseFloat(o.total.replace(/[^0-9.]/g, "")) || 0), 0)
    return `CA$${sum.toLocaleString("en-CA")}`
  }, [orders])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return orders.filter((o) => {
      if (filter !== "all" && o.status !== filter) return false
      if (!q) return true
      return (
        o.id.toLowerCase().includes(q) ||
        (o.customerName ?? "").toLowerCase().includes(q) ||
        (o.customerEmail ?? "").toLowerCase().includes(q)
      )
    })
  }, [orders, query, filter])

  const filtering = query.trim() !== "" || filter !== "all"

  return (
    <div style={{ minHeight: "calc(100vh - 91px)", background: "var(--paper)" }}>
      {/* Inject media-query styles once */}
      <style>{`
        .admin-stats-grid { display:grid; grid-template-columns:repeat(6,1fr); }
        @media (max-width:900px){ .admin-stats-grid{ grid-template-columns:repeat(3,1fr); row-gap:1px; } }
        @media (max-width:520px){ .admin-stats-grid{ grid-template-columns:repeat(2,1fr); } }
        @media (max-width:640px){
          .admin-toolbar{ flex-direction:column; align-items:stretch; }
          .admin-filter-tabs{ overflow-x:auto; -webkit-overflow-scrolling:touch; }
          .admin-detail-grid{ grid-template-columns:1fr !important; }
        }
        @keyframes adminPulse { 0%,100%{opacity:.4} 50%{opacity:1} }
        .admin-pending-dot{ animation:adminPulse 1s ease-in-out infinite; }
      `}</style>

      {/* Masthead */}
      <div style={{
        borderBottom: "1px solid var(--line)",
        padding: "32px clamp(20px,6vw,64px)",
        display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 24, flexWrap: "wrap",
      }}>
        <div>
          <p style={{
            margin: "0 0 6px", fontSize: 10, fontWeight: 600, letterSpacing: "3px",
            textTransform: "uppercase", color: "var(--teal)", fontFamily: "var(--font-sans)",
          }}>
            Cobble Studio — Admin
          </p>
          <h1 style={{
            margin: 0, fontFamily: "var(--font-serif)",
            fontSize: "clamp(28px, 5vw, 34px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)",
          }}>
            Orders
          </h1>
        </div>
        <p style={{ margin: 0, fontSize: 11, color: "var(--ash)", fontFamily: "var(--font-sans)", whiteSpace: "nowrap" }}>
          {filtering
            ? `${visible.length} of ${orders.length} orders`
            : `${orders.length} ${orders.length === 1 ? "order" : "orders"} total`}
        </p>
      </div>

      {/* Stats strip */}
      <StatsStrip counts={counts} revenueLabel={revenue} />

      {/* List container */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: `0 clamp(20px,6vw,64px) 100px` }}>

        {/* Toolbar */}
        <div className="admin-toolbar" style={{
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20,
          padding: "24px 8px 18px", borderBottom: "1px solid var(--line)", flexWrap: "wrap",
        }}>
          <SearchField
            query={query}
            onChange={setQuery}
            onClear={() => setQuery("")}
          />
          <FilterTabs
            filter={filter}
            counts={counts}
            onSelect={setFilter}
          />
        </div>

        {/* Orders */}
        <div style={{ marginTop: 0 }}>
          {orders.length === 0 ? (
            <div style={{
              border: "1px solid var(--line)", padding: "64px 32px", marginTop: 32,
              display: "flex", flexDirection: "column", alignItems: "center", gap: 12, textAlign: "center",
            }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--ash)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              </svg>
              <p style={{ margin: 0, fontSize: 13, color: "var(--ash)", fontFamily: "var(--font-sans)" }}>
                No orders yet.
              </p>
            </div>
          ) : visible.length === 0 ? (
            <div style={{
              border: "1px solid var(--line)", padding: "64px 32px", marginTop: 32,
              display: "flex", flexDirection: "column", alignItems: "center", gap: 12, textAlign: "center",
            }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--ash)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              </svg>
              <p style={{ margin: 0, fontSize: 13, color: "var(--ash)", fontFamily: "var(--font-sans)" }}>
                No orders match your search.
              </p>
              <button
                onClick={() => { setQuery(""); setFilter("all") }}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: 10, fontWeight: 500, letterSpacing: "1.8px", textTransform: "uppercase",
                  color: "var(--ash)", fontFamily: "var(--font-sans)",
                  transition: "color var(--dur-fast)", padding: "4px 0",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--teal)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ash)")}
              >
                Clear filters
              </button>
            </div>
          ) : (
            visible.map((order, i) => (
              <OrderRow
                key={order.id}
                order={order}
                open={openOrder === order.id}
                onToggle={() => setOpenOrder(openOrder === order.id ? null : order.id)}
                first={i === 0}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
