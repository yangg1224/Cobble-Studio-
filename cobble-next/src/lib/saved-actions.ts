"use server"

import { createClient } from "@/lib/supabase/server"

export async function getSavedSlugs(): Promise<string[]> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data } = await supabase
    .from("saved_items")
    .select("product_slug")
    .eq("user_id", user.id)

  return (data ?? []).map((r) => r.product_slug)
}

export async function toggleSaved(slug: string): Promise<{ saved: boolean }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { saved: false }

  const { data: existing } = await supabase
    .from("saved_items")
    .select("id")
    .eq("user_id", user.id)
    .eq("product_slug", slug)
    .maybeSingle()

  if (existing) {
    await supabase.from("saved_items").delete().eq("id", existing.id)
    return { saved: false }
  } else {
    await supabase.from("saved_items").insert({ user_id: user.id, product_slug: slug })
    return { saved: true }
  }
}
