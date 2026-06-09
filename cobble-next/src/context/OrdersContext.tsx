"use client"

import { createContext, useContext, useEffect, useState } from "react"

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
  items: OrderItem[]
  // extra checkout details
  engraving?: string
  address?: string
}

interface OrdersContextValue {
  orders: Order[]
  addOrder: (order: Order) => void
}

const OrdersContext = createContext<OrdersContextValue>({
  orders: [],
  addOrder: () => {},
})

const STORAGE_KEY = "cobble_orders"

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setOrders(JSON.parse(stored))
    } catch {}
  }, [])

  function addOrder(order: Order) {
    setOrders((prev) => {
      const next = [order, ...prev]
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }

  return (
    <OrdersContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrdersContext.Provider>
  )
}

export function useOrders() {
  return useContext(OrdersContext)
}
