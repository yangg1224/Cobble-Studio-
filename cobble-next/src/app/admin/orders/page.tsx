import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getAllOrders } from "@/lib/order-actions"
import { AdminOrdersClient } from "./AdminOrdersClient"

export const metadata = { title: "Orders — Cobble Admin" }

export default async function AdminOrdersPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/account")
  if (user.email !== process.env.ADMIN_EMAIL) redirect("/")

  const orders = await getAllOrders()

  return <AdminOrdersClient orders={orders} />
}
