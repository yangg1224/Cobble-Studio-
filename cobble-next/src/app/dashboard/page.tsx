import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getOrders } from "@/lib/order-actions"
import { getAddresses } from "@/lib/address-actions"
import { DashboardClient } from "./DashboardClient"

export const metadata = { title: "Account — Cobble Studio" }

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/account")

  const displayName = (user.user_metadata?.full_name as string | undefined) ?? ""
  const email = user.email ?? ""
  const since = new Date(user.created_at).getFullYear().toString()

  const nameParts = displayName.trim().split(" ")
  const first = nameParts[0] || email.split("@")[0]
  const initials = nameParts.length >= 2
    ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
    : (displayName[0] ?? email[0] ?? "?").toUpperCase()

  const [orders, addresses] = await Promise.all([getOrders(), getAddresses()])

  return (
    <DashboardClient
      user={{ name: displayName || email, first, email, since, initials }}
      orders={orders}
      addresses={addresses}
    />
  )
}
