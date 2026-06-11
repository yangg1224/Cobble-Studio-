"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"

export type Address = {
  id: string
  label: string
  name: string
  line1: string
  line2: string
  city: string
  state_province: string
  postal_code: string
  country: string
  phone: string
  is_primary: boolean
}

export async function getAddresses(): Promise<Address[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("addresses")
    .select("*")
    .order("is_primary", { ascending: false })
    .order("created_at", { ascending: true })
  if (error) return []
  return (data ?? []).map((r) => ({
    id: r.id,
    label: r.label,
    name: r.name,
    line1: r.line1,
    line2: r.line2 ?? "",
    city: r.city,
    state_province: r.state_province,
    postal_code: r.postal_code,
    country: r.country,
    phone: r.phone ?? "",
    is_primary: r.is_primary,
  }))
}

export async function upsertAddress(address: Omit<Address, "id"> & { id?: string }): Promise<Address | null> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  if (address.is_primary) {
    await supabase.from("addresses").update({ is_primary: false }).eq("user_id", user.id)
  }

  const payload = {
    user_id: user.id,
    label: address.label,
    name: address.name,
    line1: address.line1,
    line2: address.line2 || null,
    city: address.city,
    state_province: address.state_province,
    postal_code: address.postal_code,
    country: address.country,
    phone: address.phone || null,
    is_primary: address.is_primary,
  }

  let result
  if (address.id) {
    const { data, error } = await supabase
      .from("addresses")
      .update(payload)
      .eq("id", address.id)
      .eq("user_id", user.id)
      .select()
      .single()
    if (error) return null
    result = data
  } else {
    const { data, error } = await supabase
      .from("addresses")
      .insert(payload)
      .select()
      .single()
    if (error) return null
    result = data
  }

  revalidatePath("/dashboard")
  return {
    id: result.id,
    label: result.label,
    name: result.name,
    line1: result.line1,
    line2: result.line2 ?? "",
    city: result.city,
    state_province: result.state_province,
    postal_code: result.postal_code,
    country: result.country,
    phone: result.phone ?? "",
    is_primary: result.is_primary,
  }
}

export async function deleteAddress(id: string): Promise<boolean> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false
  const { error } = await supabase.from("addresses").delete().eq("id", id).eq("user_id", user.id)
  if (error) return false
  revalidatePath("/dashboard")
  return true
}

export async function setDefaultAddress(id: string): Promise<boolean> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false
  await supabase.from("addresses").update({ is_primary: false }).eq("user_id", user.id)
  const { error } = await supabase.from("addresses").update({ is_primary: true }).eq("id", id).eq("user_id", user.id)
  if (error) return false
  revalidatePath("/dashboard")
  return true
}
