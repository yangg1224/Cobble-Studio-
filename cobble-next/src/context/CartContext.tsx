"use client"

import { createContext, useContext, useEffect, useState } from "react"

export type CartItem = {
  slug: string
  name: string
  price: string
  img: string
  qty: number
  color?: string
  size?: string
}

interface CartContextValue {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "qty"> & { qty?: number }) => void
  removeItem: (slug: string, color?: string, size?: string) => void
  updateQty: (slug: string, color: string | undefined, size: string | undefined, qty: number) => void
  clearCart: () => void
  totalCount: number
}

const CartContext = createContext<CartContextValue>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQty: () => {},
  clearCart: () => {},
  totalCount: 0,
})

function itemKey(slug: string, color?: string, size?: string) {
  return `${slug}__${color ?? ""}__${size ?? ""}`
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cobble_cart")
      if (stored) setItems(JSON.parse(stored))
    } catch {}
  }, [])

  function persist(next: CartItem[]) {
    setItems(next)
    try { localStorage.setItem("cobble_cart", JSON.stringify(next)) } catch {}
  }

  function addItem(incoming: Omit<CartItem, "qty"> & { qty?: number }) {
    const qty = incoming.qty ?? 1
    setItems((prev) => {
      const key = itemKey(incoming.slug, incoming.color, incoming.size)
      const existing = prev.find(
        (i) => itemKey(i.slug, i.color, i.size) === key
      )
      const next = existing
        ? prev.map((i) =>
            itemKey(i.slug, i.color, i.size) === key
              ? { ...i, qty: i.qty + qty }
              : i
          )
        : [...prev, { ...incoming, qty }]
      try { localStorage.setItem("cobble_cart", JSON.stringify(next)) } catch {}
      return next
    })
  }

  function removeItem(slug: string, color?: string, size?: string) {
    const key = itemKey(slug, color, size)
    persist(items.filter((i) => itemKey(i.slug, i.color, i.size) !== key))
  }

  function updateQty(slug: string, color: string | undefined, size: string | undefined, qty: number) {
    if (qty < 1) { removeItem(slug, color, size); return }
    const key = itemKey(slug, color, size)
    persist(items.map((i) => itemKey(i.slug, i.color, i.size) === key ? { ...i, qty } : i))
  }

  function clearCart() { persist([]) }

  const totalCount = items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, totalCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
