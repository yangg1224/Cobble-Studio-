"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/context/CartContext"

function parsePrice(p: string) { return parseFloat(p.replace(/[^0-9.]/g, "")) || 0 }
function formatCAD(n: number) { return `CA$${n.toFixed(2).replace(/\.00$/, "")}` }

function genOrderNumber() {
  return "CS-" + Math.random().toString(36).slice(2, 7).toUpperCase()
}

type Field = {
  id: string
  label: string
  type?: string
  placeholder?: string
  autoComplete?: string
  half?: boolean
  optional?: boolean
}

const CONTACT_FIELDS: Field[] = [
  { id: "firstName",    label: "First Name",    autoComplete: "given-name",   placeholder: "Jane",          half: true },
  { id: "lastName",     label: "Last Name",     autoComplete: "family-name",  placeholder: "Smith",         half: true },
  { id: "email",        label: "Email",         type: "email",  autoComplete: "email",        placeholder: "jane@example.com" },
  { id: "phone",        label: "Phone",         type: "tel",    autoComplete: "tel",          placeholder: "+1 (000) 000-0000", optional: true },
]

const ADDRESS_FIELDS: Field[] = [
  { id: "address1",    label: "Address",              autoComplete: "address-line1",  placeholder: "123 Maple Street" },
  { id: "address2",    label: "Apt / Suite",          autoComplete: "address-line2",  placeholder: "Unit 4B",           optional: true },
  { id: "city",        label: "City",                 autoComplete: "address-level2", placeholder: "Toronto",           half: true },
  { id: "province",    label: "Province / State",     autoComplete: "address-level1", placeholder: "Ontario",           half: true },
  { id: "postalCode",  label: "Postal / ZIP Code",    autoComplete: "postal-code",    placeholder: "M5V 2T6",           half: true },
  { id: "country",     label: "Country",              autoComplete: "country-name",   placeholder: "Canada",            half: true },
]

const ALL_FIELDS = [...CONTACT_FIELDS, ...ADDRESS_FIELDS]

type FormData = Record<string, string>

function validate(data: FormData): Partial<Record<string, string>> {
  const errs: Partial<Record<string, string>> = {}
  ALL_FIELDS.forEach((f) => {
    if (!f.optional && !data[f.id]?.trim()) {
      errs[f.id] = "Required"
    }
  })
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errs.email = "Enter a valid email"
  }
  return errs
}

function FormField({
  field,
  value,
  error,
  onChange,
}: {
  field: Field
  value: string
  error?: string
  onChange: (id: string, val: string) => void
}) {
  return (
    <div className={field.half ? "col-span-1" : "col-span-2"}>
      <label
        htmlFor={field.id}
        className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[2px] text-[#A2A2A2]"
      >
        {field.label}
        {field.optional && <span className="ml-1 font-normal normal-case tracking-normal text-[#C8C8C8]">(optional)</span>}
      </label>
      <input
        id={field.id}
        type={field.type ?? "text"}
        autoComplete={field.autoComplete}
        placeholder={field.placeholder}
        value={value}
        onChange={(e) => onChange(field.id, e.target.value)}
        className={`w-full border px-4 py-3 text-[12px] tracking-[0.4px] text-[#1E1E1E] placeholder:text-[#D0D0D0] outline-none transition-[border-color] duration-200 focus:border-[#1E1E1E] ${
          error ? "border-red-400" : "border-[#E8E8E8]"
        }`}
      />
      {error && (
        <p className="mt-1 text-[10px] tracking-[0.4px] text-red-400">{error}</p>
      )}
    </div>
  )
}

export function CheckoutClient() {
  const { items, clearCart } = useCart()
  const [data, setData] = useState<FormData>({})
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({})
  const [confirmed, setConfirmed] = useState(false)
  const [orderNumber] = useState(genOrderNumber)

  const subtotal = items.reduce((s, i) => s + parsePrice(i.price) * i.qty, 0)
  const shipping = subtotal >= 100 ? 0 : 12
  const total = subtotal + shipping

  function handleChange(id: string, val: string) {
    setData((d) => ({ ...d, [id]: val }))
    if (errors[id]) setErrors((e) => { const n = { ...e }; delete n[id]; return n })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate(data)
    if (Object.keys(errs).length) { setErrors(errs); return }
    clearCart()
    setConfirmed(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Empty cart guard
  if (items.length === 0 && !confirmed) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 text-center">
        <p
          style={{ fontFamily: "var(--font-serif)", fontSize: 28, fontWeight: 400, letterSpacing: "-0.02em" }}
          className="text-[#1E1E1E]"
        >
          Your cart is empty
        </p>
        <Link
          href="/collections"
          className="inline-block bg-[#1E1E1E] px-10 py-4 text-[11px] font-medium uppercase tracking-[3px] text-white transition-[background-color] duration-300 hover:bg-[#3CACB0]"
        >
          Shop Now
        </Link>
      </div>
    )
  }

  // Confirmation screen
  if (confirmed) {
    return (
      <div className="mx-auto max-w-[600px] px-6 pb-24 pt-16 text-center">
        {/* Check mark */}
        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-[#3CACB0]">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3CACB0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>

        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[3px] text-[#3CACB0]">
          Order Received
        </p>
        <h1
          className="mb-4 text-[#1E1E1E]"
          style={{ fontFamily: "var(--font-serif)", fontSize: 34, fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.15 }}
        >
          Thank you, {data.firstName || "friend"}.
        </h1>
        <p className="mb-2 text-[12px] leading-[1.85] tracking-[0.3px] text-[#989898]">
          Your order <span className="font-medium text-[#1E1E1E]">{orderNumber}</span> has been placed.
          A confirmation will be sent to <span className="font-medium text-[#1E1E1E]">{data.email}</span>.
        </p>

        {/* Delivery note */}
        <div className="mx-auto mt-10 max-w-[460px] border border-[#E8E8E8] px-8 py-7 text-left">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[3px] text-[#1E1E1E]">
            What happens next
          </p>
          <ul className="flex flex-col gap-4">
            {[
              { step: "01", copy: "Our craftspeople begin work on your piece within 1 business day. Every item is made entirely by hand." },
              { step: "02", copy: "Quality is inspected by our studio team before it ever leaves our workshop. This typically takes 5–7 days." },
              { step: "03", copy: "Your order ships with tracked delivery. Estimated arrival: 7–10 business days from today." },
            ].map(({ step, copy }) => (
              <li key={step} className="flex gap-4">
                <span className="mt-0.5 flex-shrink-0 text-[10px] font-semibold tracking-[1px] text-[#3CACB0]">{step}</span>
                <p className="text-[11px] leading-[1.75] tracking-[0.3px] text-[#989898]">{copy}</p>
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="/collections"
          className="mt-10 inline-block bg-[#1E1E1E] px-10 py-4 text-[11px] font-medium uppercase tracking-[3px] text-white transition-[background-color] duration-300 hover:bg-[#3CACB0]"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[1200px] px-6 pb-24 pt-10 md:px-10">

      {/* Breadcrumb steps */}
      <nav className="mb-10 flex items-center gap-3" aria-label="Checkout steps">
        {[
          { label: "Cart",     href: "/cart",     done: true  },
          { label: "Shipping", href: null,         done: false },
        ].map(({ label, href, done }, i, arr) => (
          <span key={label} className="flex items-center gap-3">
            {href ? (
              <Link href={href} className="text-[10px] font-medium uppercase tracking-[2px] text-[#A2A2A2] transition-colors duration-200 hover:text-[#1E1E1E]">
                {label}
              </Link>
            ) : (
              <span className="text-[10px] font-semibold uppercase tracking-[2px] text-[#1E1E1E]">{label}</span>
            )}
            {i < arr.length - 1 && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={done ? "#3CACB0" : "#D0D0D0"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            )}
          </span>
        ))}
      </nav>

      <div className="grid gap-12 lg:grid-cols-[1fr_360px]">

        {/* ── Form ── */}
        <form onSubmit={handleSubmit} noValidate>

          {/* Contact */}
          <section className="mb-10">
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[3px] text-[#1E1E1E]">
              Contact
            </p>
            <div className="grid grid-cols-2 gap-4">
              {CONTACT_FIELDS.map((f) => (
                <FormField
                  key={f.id}
                  field={f}
                  value={data[f.id] ?? ""}
                  error={errors[f.id]}
                  onChange={handleChange}
                />
              ))}
            </div>
          </section>

          <div className="mb-10 h-px bg-[#F0F0F0]" />

          {/* Shipping Address */}
          <section className="mb-10">
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[3px] text-[#1E1E1E]">
              Shipping Address
            </p>
            <div className="grid grid-cols-2 gap-4">
              {ADDRESS_FIELDS.map((f) => (
                <FormField
                  key={f.id}
                  field={f}
                  value={data[f.id] ?? ""}
                  error={errors[f.id]}
                  onChange={handleChange}
                />
              ))}
            </div>
          </section>

          <div className="mb-10 h-px bg-[#F0F0F0]" />

          {/* Delivery promise */}
          <section className="mb-10 bg-[#F9F9F9] px-7 py-6">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[3px] text-[#1E1E1E]">
              Handmade with care — delivered in 1 week
            </p>
            <p className="text-[11px] leading-[1.85] tracking-[0.3px] text-[#989898]">
              Every Cobble piece is carved or shaped entirely by hand in our Canadian studio.
              Because each order is made specifically for you, please allow <span className="text-[#1E1E1E]">5–7 business days</span> for
              crafting, followed by tracked shipping. Quality is our first principle — we won&apos;t
              rush a piece that isn&apos;t ready.
            </p>
          </section>

          {/* Order notes */}
          <section className="mb-10">
            <label
              htmlFor="notes"
              className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[2px] text-[#A2A2A2]"
            >
              Order Notes
              <span className="ml-1 font-normal normal-case tracking-normal text-[#C8C8C8]">(optional)</span>
            </label>
            <textarea
              id="notes"
              rows={3}
              placeholder="Any special requests, gift messages, or delivery instructions…"
              value={data.notes ?? ""}
              onChange={(e) => handleChange("notes", e.target.value)}
              className="w-full resize-none border border-[#E8E8E8] px-4 py-3 text-[12px] tracking-[0.4px] text-[#1E1E1E] placeholder:text-[#D0D0D0] outline-none transition-[border-color] duration-200 focus:border-[#1E1E1E]"
            />
          </section>

          <button
            type="submit"
            className="w-full bg-[#1E1E1E] py-4 text-[12px] font-medium uppercase tracking-[3px] text-white transition-[background-color,transform] duration-[350ms] hover:bg-[#3CACB0] active:translate-y-px active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-[#3CACB0] focus-visible:outline-offset-2"
          >
            Place Order
          </button>

          <p className="mt-4 text-center text-[10px] leading-[1.7] tracking-[0.3px] text-[#A2A2A2]">
            By placing your order you agree to our{" "}
            <Link href="#" className="underline underline-offset-2 hover:text-[#1E1E1E] transition-colors duration-200">Terms</Link>
            {" "}and{" "}
            <Link href="#" className="underline underline-offset-2 hover:text-[#1E1E1E] transition-colors duration-200">Privacy Policy</Link>.
            Payment will be arranged by our team after your order is confirmed.
          </p>
        </form>

        {/* ── Order Summary ── */}
        <div className="lg:pt-0">
          <div className="bg-[#F9F9F9] p-7">
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[3px] text-[#1E1E1E]">
              Order Summary
            </p>

            {/* Items */}
            <ul className="mb-6 flex flex-col gap-5">
              {items.map((item) => (
                <li
                  key={`${item.slug}-${item.color}-${item.size}`}
                  className="flex items-start gap-3"
                >
                  <div className="relative h-[64px] w-[52px] flex-shrink-0 overflow-hidden bg-white">
                    <Image
                      src={item.img}
                      alt={item.name}
                      fill
                      className="object-contain"
                      sizes="52px"
                    />
                    {/* Qty badge */}
                    <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#A2A2A2] text-[9px] font-semibold text-white">
                      {item.qty}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-medium uppercase leading-[1.4] tracking-[1px] text-[#1E1E1E]">
                      {item.name}
                    </p>
                    <div className="mt-0.5 flex flex-col gap-0.5">
                      {item.color && (
                        <span className="text-[10px] tracking-[0.6px] text-[#A2A2A2]">
                          {item.color}
                        </span>
                      )}
                      {item.size && (
                        <span className="text-[10px] tracking-[0.6px] text-[#A2A2A2]">
                          {item.size}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="flex-shrink-0 text-[12px] tracking-[1px] text-[#1E1E1E]">
                    {formatCAD(parsePrice(item.price) * item.qty)}
                  </p>
                </li>
              ))}
            </ul>

            <div className="h-px bg-[#E8E8E8]" />

            {/* Totals */}
            <dl className="mt-5 flex flex-col gap-3">
              <div className="flex justify-between">
                <dt className="text-[11px] tracking-[0.8px] text-[#A2A2A2]">Subtotal</dt>
                <dd className="text-[12px] tracking-[1px] text-[#1E1E1E]">{formatCAD(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[11px] tracking-[0.8px] text-[#A2A2A2]">Shipping</dt>
                <dd className="text-[12px] tracking-[1px] text-[#1E1E1E]">{shipping === 0 ? "Free" : formatCAD(shipping)}</dd>
              </div>
              <div className="my-1 h-px bg-[#E8E8E8]" />
              <div className="flex justify-between">
                <dt className="text-[12px] font-medium uppercase tracking-[1.5px] text-[#1E1E1E]">Total</dt>
                <dd className="text-[15px] tracking-[1px] text-[#1E1E1E]">{formatCAD(total)}</dd>
              </div>
            </dl>
          </div>

          {/* Trust signals */}
          <ul className="mt-5 flex flex-col gap-3 px-1">
            {[
              { icon: "handcraft", text: "Every piece made by hand in Canada" },
              { icon: "time",      text: "Crafted in 5–7 days, shipped with tracking" },
              { icon: "quality",   text: "Quality-inspected before it leaves our studio" },
            ].map(({ text }) => (
              <li key={text} className="flex items-start gap-2.5">
                <span className="mt-0.5 text-[#3CACB0]">—</span>
                <p className="text-[10px] leading-[1.6] tracking-[0.6px] text-[#A2A2A2]">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
