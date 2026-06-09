"use server"

import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"

export type OrderItem = {
  name: string
  price: string
  img: string
  qty: number
}

export type Order = {
  id: string
  date: string
  status: "ordered" | "workshop" | "shipped" | "delivered"
  total: string
  note?: string
  eta?: string
  engraving?: string
  address?: string
  customerName?: string
  customerEmail?: string
  items: OrderItem[]
}

export type CreateOrderInput = {
  id: string
  customerName: string
  total: string
  note?: string
  eta?: string
  engraving?: string
  address?: string
  items: OrderItem[]
}

type DbOrder = {
  id: string
  customer_name: string
  customer_email: string
  status: string
  total: string
  note: string | null
  eta: string | null
  engraving: string | null
  address: string | null
  created_at: string
  order_items: { name: string; price: string; img: string; qty: number }[]
}

function mapDbOrder(row: DbOrder): Order {
  return {
    id: row.id,
    date: new Date(row.created_at).toLocaleDateString("en-CA", {
      year: "numeric", month: "long", day: "numeric",
    }),
    status: row.status as Order["status"],
    total: row.total,
    note: row.note ?? undefined,
    eta: row.eta ?? undefined,
    engraving: row.engraving ?? undefined,
    address: row.address ?? undefined,
    customerName: row.customer_name,
    customerEmail: row.customer_email,
    items: row.order_items ?? [],
  }
}

// ── Customer: place an order ──────────────────────────────────────────────────
export async function createOrder(input: CreateOrderInput): Promise<{ error?: string }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "You must be signed in to place an order." }

  const { error: orderErr } = await supabase.from("orders").insert({
    id: input.id,
    user_id: user.id,
    customer_name: input.customerName,
    customer_email: user.email ?? "",
    status: "ordered",
    total: input.total,
    note: input.note ?? null,
    eta: input.eta ?? null,
    engraving: input.engraving ?? null,
    address: input.address ?? null,
  })
  if (orderErr) return { error: orderErr.message }

  const { error: itemsErr } = await supabase.from("order_items").insert(
    input.items.map((item) => ({ order_id: input.id, ...item }))
  )
  if (itemsErr) return { error: itemsErr.message }

  return {}
}

// ── Customer: fetch own orders ────────────────────────────────────────────────
export async function getOrders(): Promise<Order[]> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return (data ?? []).map(mapDbOrder)
}

// ── Admin: fetch all orders ───────────────────────────────────────────────────
export async function getAllOrders(): Promise<Order[]> {
  const supabase = createAdminClient()

  const { data } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .order("created_at", { ascending: false })

  return (data ?? []).map(mapDbOrder)
}

// ── Admin: update order status ────────────────────────────────────────────────
export async function updateOrderStatus(
  orderId: string,
  status: Order["status"]
): Promise<{ error?: string }> {
  const supabase = createAdminClient()

  const { error } = await supabase
    .from("orders")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", orderId)

  return error ? { error: error.message } : {}
}
