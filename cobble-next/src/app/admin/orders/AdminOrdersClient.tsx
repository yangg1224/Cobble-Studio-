"use client"

import { useState, useTransition } from "react"
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
        const done = i < current; const active = i === current
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

function OrderRow({ order, open, onToggle, first }: {
  order: Order; open: boolean; onToggle: () => void; first: boolean
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [localStatus, setLocalStatus] = useState<Order["status"]>(order.status)

  function advanceStatus(next: Order["status"]) {
    setLocalStatus(next)
    startTransition(async () => {
      await updateOrderStatus(order.id, next)
      router.refresh()
    })
  }

  return (
    <article style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", marginTop: first ? 0 : -1 }}>
      {/* Row header */}
      <button
        onClick={onToggle}
        style={{
          width: "100%", background: "none", border: "none", cursor: "pointer",
          display: "grid", gridTemplateColumns: "auto 1fr auto auto", gap: 24,
          alignItems: "center", padding: "22px 8px", textAlign: "left",
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
        </div>

        {/* Meta */}
        <div>
          <p style={{ margin: 0, fontSize: 12, letterSpacing: "0.3px", color: "var(--ink)", fontFamily: "var(--font-sans)" }}>
            Order #{order.id}
          </p>
          <p style={{ margin: "4px 0 0", fontSize: 11, color: "var(--ash)", fontFamily: "var(--font-sans)" }}>
            {order.customerName}
            {order.customerEmail && (
              <span style={{ marginLeft: 8, color: "var(--ash)", opacity: 0.7 }}>{order.customerEmail}</span>
            )}
          </p>
          <p style={{ margin: "3px 0 0", fontSize: 11, color: "var(--ash)", fontFamily: "var(--font-sans)" }}>
            {order.date} · {order.items.length} {order.items.length === 1 ? "piece" : "pieces"} · {order.total}
          </p>
        </div>

        <StatusTag status={localStatus} />

        <span style={{ fontSize: 10, letterSpacing: "1.8px", textTransform: "uppercase", color: "var(--ash)", display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-sans)" }}>
          {open ? "Close" : "Manage"}
          <span style={{ display: "inline-block", transform: open ? "rotate(180deg)" : "none", transition: "transform 200ms" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </span>
        </span>
      </button>

      {/* Expanded detail */}
      {open && (
        <div style={{ padding: "4px 8px 36px" }}>

          {/* Status track */}
          <div style={{ background: "var(--mist)", padding: "28px 32px 24px", marginBottom: 24 }}>
            <StatusTrack status={localStatus} />

            {/* Stage buttons */}
            <div>
              <p style={{ margin: "0 0 12px", fontSize: 9, fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "var(--ash)", fontFamily: "var(--font-sans)" }}>
                Update Status
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {ORDER_STAGES.map((s) => {
                  const active = localStatus === s.key
                  return (
                    <button
                      key={s.key}
                      onClick={() => advanceStatus(s.key)}
                      disabled={isPending}
                      style={{
                        padding: "9px 16px",
                        fontSize: 10, fontWeight: 500, letterSpacing: "1.8px", textTransform: "uppercase",
                        fontFamily: "var(--font-sans)", cursor: isPending ? "not-allowed" : "pointer",
                        border: "1px solid",
                        borderColor: active ? "var(--teal)" : "var(--line)",
                        background: active ? "var(--teal)" : "var(--paper)",
                        color: active ? "var(--paper)" : "var(--ash)",
                        transition: "background 150ms, color 150ms, border-color 150ms",
                        opacity: isPending ? 0.6 : 1,
                      }}
                      onMouseEnter={(e) => { if (!active && !isPending) { e.currentTarget.style.borderColor = "var(--ink)"; e.currentTarget.style.color = "var(--ink)" }}}
                      onMouseLeave={(e) => { if (!active) { e.currentTarget.style.borderColor = "var(--line)"; e.currentTarget.style.color = "var(--ash)" }}}
                    >
                      {s.label}
                    </button>
                  )
                })}
              </div>
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

          {/* Order details */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 20 }}>
            {order.address && (
              <div>
                <p style={{ margin: "0 0 4px", fontSize: 9, fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "var(--ash)", fontFamily: "var(--font-sans)" }}>Ship to</p>
                <p style={{ margin: 0, fontSize: 12, lineHeight: 1.65, color: "var(--ink)", fontFamily: "var(--font-sans)" }}>{order.address}</p>
              </div>
            )}
            {order.engraving && (
              <div>
                <p style={{ margin: "0 0 4px", fontSize: 9, fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "var(--ash)", fontFamily: "var(--font-sans)" }}>Engraving</p>
                <p style={{ margin: 0, fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 15, color: "var(--ink)" }}>&ldquo;{order.engraving}&rdquo;</p>
              </div>
            )}
          </div>

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

export function AdminOrdersClient({ orders }: { orders: Order[] }) {
  const [openOrder, setOpenOrder] = useState<string | null>(null)

  return (
    <div style={{ minHeight: "calc(100vh - 91px)", background: "var(--paper)" }}>
      {/* Admin header */}
      <div style={{
        borderBottom: "1px solid var(--line)", padding: "32px 64px",
        display: "flex", alignItems: "baseline", justifyContent: "space-between",
      }}>
        <div>
          <p style={{ margin: "0 0 6px", fontSize: 10, fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "var(--teal)", fontFamily: "var(--font-sans)" }}>
            Cobble Studio — Admin
          </p>
          <h1 style={{ margin: 0, fontFamily: "var(--font-serif)", fontSize: 34, fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)" }}>
            Orders
          </h1>
        </div>
        <p style={{ margin: 0, fontSize: 11, color: "var(--ash)", fontFamily: "var(--font-sans)" }}>
          {orders.length} {orders.length === 1 ? "order" : "orders"} total
        </p>
      </div>

      {/* Order list */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 64px 100px" }}>
        {orders.length === 0 ? (
          <div style={{
            border: "1px solid var(--line)", padding: "64px 32px",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 12, textAlign: "center",
          }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--ash)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            </svg>
            <p style={{ margin: 0, fontSize: 13, color: "var(--ash)", fontFamily: "var(--font-sans)" }}>
              No orders yet.
            </p>
          </div>
        ) : (
          orders.map((order, i) => (
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
  )
}
