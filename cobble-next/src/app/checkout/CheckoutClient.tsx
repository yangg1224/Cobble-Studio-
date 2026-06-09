"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/CartContext"
import { useLanguage, fmt } from "@/context/LanguageContext"
import { createClient } from "@/lib/supabase/client"
import { createOrder } from "@/lib/order-actions"

function parsePrice(p: string) { return parseFloat(p.replace(/[^0-9.]/g, "")) || 0 }
function formatCAD(n: number)  { return `CA$${n.toFixed(2).replace(/\.00$/, "")}` }
function genOrderNumber()       { return "CS-" + Math.random().toString(36).slice(2, 7).toUpperCase() }

const ENGRAVING_FEE = 28

type FormData = Record<string, string>

function validate(data: FormData, engravingOn: boolean, t: ReturnType<typeof useLanguage>["t"]): Partial<Record<string, string>> {
  const co = t.checkout
  const errs: Partial<Record<string, string>> = {}
  const required = ["firstName","lastName","email","address1","city","province","postalCode","country"]
  required.forEach((id) => {
    if (!data[id]?.trim()) errs[id] = co.required
  })
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errs.email = co.enterValidEmail
  }
  if (engravingOn && !data.engravingText?.trim()) {
    errs.engravingText = co.pleaseEnterEngraving
  }
  return errs
}

export function CheckoutClient() {
  const { items, clearCart } = useCart()
  const router = useRouter()
  const { t } = useLanguage()
  const co = t.checkout

  const [data, setData] = useState<FormData>({})
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({})
  const [engravingOn, setEngravingOn] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [orderNumber] = useState(genOrderNumber)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.replace("/account?next=/checkout")
    })
  }, [router])

  const subtotal  = items.reduce((s, i) => s + parsePrice(i.price) * i.qty, 0)
  const shipping  = subtotal >= 100 ? 0 : 12
  const engraving = engravingOn ? ENGRAVING_FEE : 0
  const total     = subtotal + shipping + engraving

  function handleChange(id: string, val: string) {
    setData((d) => ({ ...d, [id]: val }))
    if (errors[id]) setErrors((e) => { const n = { ...e }; delete n[id]; return n })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate(data, engravingOn, t)
    if (Object.keys(errs).length) { setErrors(errs); return }

    setSubmitting(true)
    setSubmitError(null)

    const addressLine = [
      data.address1,
      data.address2,
      `${data.city}, ${data.province}  ${data.postalCode}`,
      data.country,
    ].filter(Boolean).join(", ")

    const result = await createOrder({
      id: orderNumber,
      customerName: `${data.firstName} ${data.lastName}`.trim(),
      total: formatCAD(total),
      note: "Your Brand Director will reach out by email with e-transfer payment instructions.",
      eta: "Ships within 1 week of payment confirmation",
      items: items.map((i) => ({ name: i.name, price: i.price, img: i.img, qty: i.qty })),
      engraving: engravingOn ? data.engravingText : undefined,
      address: addressLine,
    })

    setSubmitting(false)

    if (result.error) {
      setSubmitError(result.error)
      return
    }

    clearCart()
    setConfirmed(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // ── Empty cart guard ──
  if (items.length === 0 && !confirmed) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 text-center">
        <p style={{ fontFamily: "var(--font-serif)", fontSize: 28, fontWeight: 400, letterSpacing: "-0.02em" }} className="text-[#1E1E1E]">
          {co.emptyTitle}
        </p>
        <Link href="/collections" className="inline-block bg-[#1E1E1E] px-10 py-4 text-[11px] font-medium uppercase tracking-[3px] text-white transition-[background-color] duration-300 hover:bg-[#3CACB0]">
          {t.shopNow}
        </Link>
      </div>
    )
  }

  // ── Confirmation ──
  if (confirmed) {
    return (
      <div className="mx-auto max-w-[600px] px-6 pb-24 pt-16 text-center">
        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-[#3CACB0]">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3CACB0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>

        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[3px] text-[#3CACB0]">{co.orderReceived}</p>
        <h1 className="mb-4 text-[#1E1E1E]" style={{ fontFamily: "var(--font-serif)", fontSize: 34, fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
          {co.thankYouPrefix} {data.firstName || "friend"}.
        </h1>
        <p className="text-[12px] leading-[1.85] tracking-[0.3px] text-[#989898]">
          {co.orderConfirmedPrefix} <span className="font-medium text-[#1E1E1E]">{orderNumber}</span> {co.orderConfirmedSuffix}
        </p>

        <div className="mx-auto mt-10 max-w-[460px] border border-[#E8E8E8] px-8 py-7 text-left">
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[3px] text-[#1E1E1E]">{co.whatHappensNext}</p>
          <ul className="flex flex-col gap-5">
            {co.nextSteps.map(({ heading, copy }, i) => (
              <li key={i} className="flex gap-4">
                <span className="mt-0.5 flex-shrink-0 text-[10px] font-semibold tracking-[1px] text-[#3CACB0]">0{i + 1}</span>
                <div>
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-[1px] text-[#1E1E1E]">{heading}</p>
                  <p className="text-[11px] leading-[1.75] tracking-[0.3px] text-[#989898]">
                    {fmt(copy, data.email || "", formatCAD(total))}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <Link href="/collections" className="mt-10 inline-block bg-[#1E1E1E] px-10 py-4 text-[11px] font-medium uppercase tracking-[3px] text-white transition-[background-color] duration-300 hover:bg-[#3CACB0]">
          {t.continueShopping}
        </Link>
      </div>
    )
  }

  // ── Form field definitions (translated labels) ──
  type Field = { id: string; label: string; type?: string; placeholder?: string; autoComplete?: string; half?: boolean; optional?: boolean }

  const CONTACT_FIELDS: Field[] = [
    { id: "firstName",  label: co.firstName, autoComplete: "given-name",   placeholder: "Jane",             half: true },
    { id: "lastName",   label: co.lastName,  autoComplete: "family-name",  placeholder: "Smith",            half: true },
    { id: "email",      label: co.emailLbl,  type: "email", autoComplete: "email",       placeholder: "jane@example.com" },
    { id: "phone",      label: co.phoneLbl,  type: "tel",   autoComplete: "tel",         placeholder: "+1 (000) 000-0000", optional: true },
  ]
  const ADDRESS_FIELDS: Field[] = [
    { id: "address1",   label: co.address1,    autoComplete: "address-line1",  placeholder: "123 Maple Street" },
    { id: "address2",   label: co.address2,    autoComplete: "address-line2",  placeholder: "Unit 4B",          optional: true },
    { id: "city",       label: co.cityLbl,     autoComplete: "address-level2", placeholder: "Toronto",          half: true },
    { id: "province",   label: co.provinceLbl, autoComplete: "address-level1", placeholder: "Ontario",          half: true },
    { id: "postalCode", label: co.postalCode,  autoComplete: "postal-code",    placeholder: "M5V 2T6",          half: true },
    { id: "country",    label: co.countryLbl,  autoComplete: "country-name",   placeholder: "Canada",           half: true },
  ]

  return (
    <div className="mx-auto max-w-[1200px] px-6 pb-24 pt-10 md:px-10">

      {/* Step breadcrumb */}
      <nav className="mb-10 flex items-center gap-3" aria-label="Checkout steps">
        {[
          { label: co.stepCart, href: "/cart", done: true },
          { label: co.stepShipping, href: null, done: false },
        ].map(({ label, href, done }, i, arr) => (
          <span key={label} className="flex items-center gap-3">
            {href ? (
              <Link href={href} className="text-[10px] font-medium uppercase tracking-[2px] text-[#A2A2A2] transition-colors duration-200 hover:text-[#1E1E1E]">{label}</Link>
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

        {/* ── Left: form ── */}
        <form onSubmit={handleSubmit} noValidate>

          {/* Contact */}
          <section className="mb-10">
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[3px] text-[#1E1E1E]">{co.sectionContact}</p>
            <div className="grid grid-cols-2 gap-4">
              {CONTACT_FIELDS.map((f) => (
                <FormField key={f.id} field={f} value={data[f.id] ?? ""} error={errors[f.id]} onChange={handleChange} optionalLabel={co.optional} />
              ))}
            </div>
          </section>

          <div className="mb-10 h-px bg-[#F0F0F0]" />

          {/* Shipping address */}
          <section className="mb-10">
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[3px] text-[#1E1E1E]">{co.sectionShipping}</p>
            <div className="grid grid-cols-2 gap-4">
              {ADDRESS_FIELDS.map((f) => (
                <FormField key={f.id} field={f} value={data[f.id] ?? ""} error={errors[f.id]} onChange={handleChange} optionalLabel={co.optional} />
              ))}
            </div>
          </section>

          <div className="mb-10 h-px bg-[#F0F0F0]" />

          {/* Engraving */}
          <section className="mb-10">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[3px] text-[#1E1E1E]">{co.sectionEngraving}</p>
                <p className="mt-1 text-[11px] leading-[1.7] tracking-[0.3px] text-[#A2A2A2]">{co.engravingDesc}</p>
              </div>
              <div className="ml-6 flex flex-shrink-0 flex-col items-end gap-1.5">
                <button
                  type="button"
                  role="switch"
                  aria-checked={engravingOn}
                  onClick={() => {
                    setEngravingOn((v) => !v)
                    if (engravingOn) handleChange("engravingText", "")
                    if (errors.engravingText) setErrors((e) => { const n = { ...e }; delete n.engravingText; return n })
                  }}
                  className="relative h-6 w-11 flex-shrink-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[#3CACB0] focus-visible:outline-offset-2"
                  style={{ background: engravingOn ? "#3CACB0" : "#E8E8E8", borderRadius: 999 }}
                >
                  <span className="absolute top-0.5 h-5 w-5 rounded-full bg-white transition-[left] duration-200" style={{ left: engravingOn ? "calc(100% - 22px)" : "2px", boxShadow: "0 1px 4px rgba(0,0,0,0.18)" }} />
                </button>
                <span className="text-[10px] tracking-[0.8px] text-[#3CACB0]">+{formatCAD(ENGRAVING_FEE)}</span>
              </div>
            </div>

            {engravingOn && (
              <div className="mt-5 border border-[#E8E8E8] p-5">
                <div className="mb-4">
                  <label htmlFor="engravingText" className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[2px] text-[#A2A2A2]">{co.textToEngrave}</label>
                  <input
                    id="engravingText"
                    type="text"
                    maxLength={40}
                    placeholder={co.engravingInputPlaceholder}
                    value={data.engravingText ?? ""}
                    onChange={(e) => handleChange("engravingText", e.target.value)}
                    className={`w-full border px-4 py-3 text-[12px] tracking-[0.4px] text-[#1E1E1E] placeholder:text-[#D0D0D0] outline-none transition-[border-color] duration-200 focus:border-[#1E1E1E] ${errors.engravingText ? "border-red-400" : "border-[#E8E8E8]"}`}
                  />
                  <div className="mt-1 flex items-center justify-between">
                    {errors.engravingText ? <p className="text-[10px] tracking-[0.4px] text-red-400">{errors.engravingText}</p> : <span />}
                    <p className="text-[10px] tracking-[0.4px] text-[#C8C8C8]">{(data.engravingText ?? "").length}/40 {co.characters}</p>
                  </div>
                </div>
                <div>
                  <label htmlFor="engravingPlacement" className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[2px] text-[#A2A2A2]">
                    {co.placementLbl}
                    <span className="ml-1 font-normal normal-case tracking-normal text-[#C8C8C8]">({co.optional})</span>
                  </label>
                  <input
                    id="engravingPlacement"
                    type="text"
                    placeholder={co.placementPlaceholder}
                    value={data.engravingPlacement ?? ""}
                    onChange={(e) => handleChange("engravingPlacement", e.target.value)}
                    className="w-full border border-[#E8E8E8] px-4 py-3 text-[12px] tracking-[0.4px] text-[#1E1E1E] placeholder:text-[#D0D0D0] outline-none transition-[border-color] duration-200 focus:border-[#1E1E1E]"
                  />
                </div>
                <p className="mt-4 text-[10px] leading-[1.7] tracking-[0.3px] text-[#A2A2A2]">{co.engravingNote}</p>
              </div>
            )}
          </section>

          <div className="mb-10 h-px bg-[#F0F0F0]" />

          {/* Delivery promise */}
          <section className="mb-10 bg-[#F9F9F9] px-7 py-6">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[3px] text-[#1E1E1E]">{co.deliveryHeading}</p>
            <p className="text-[11px] leading-[1.85] tracking-[0.3px] text-[#989898]">{co.deliveryBody}</p>
          </section>

          {/* Order notes */}
          <section className="mb-10">
            <label htmlFor="notes" className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[2px] text-[#A2A2A2]">
              {co.orderNotesLbl}
              <span className="ml-1 font-normal normal-case tracking-normal text-[#C8C8C8]">({co.optional})</span>
            </label>
            <textarea
              id="notes"
              rows={3}
              placeholder={co.orderNotesPlaceholder}
              value={data.notes ?? ""}
              onChange={(e) => handleChange("notes", e.target.value)}
              className="w-full resize-none border border-[#E8E8E8] px-4 py-3 text-[12px] tracking-[0.4px] text-[#1E1E1E] placeholder:text-[#D0D0D0] outline-none transition-[border-color] duration-200 focus:border-[#1E1E1E]"
            />
          </section>

          {/* Payment notice */}
          <div className="mb-8 flex gap-4 border border-[#E8E8E8] px-5 py-5">
            <svg className="mt-0.5 flex-shrink-0 text-[#3CACB0]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[2px] text-[#1E1E1E]">{co.paymentTitle}</p>
              <p className="text-[11px] leading-[1.75] tracking-[0.3px] text-[#989898]">
                {co.paymentBodyPrefix} <span className="text-[#1E1E1E]">{data.email || "your email"}</span> {co.paymentBodySuffix}
              </p>
            </div>
          </div>

          {submitError && (
            <p className="mb-4 border border-red-200 bg-red-50 px-4 py-3 text-[11px] leading-[1.6] tracking-[0.3px] text-red-600">{submitError}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#1E1E1E] py-4 text-[12px] font-medium uppercase tracking-[3px] text-white transition-[background-color,transform] duration-[350ms] hover:bg-[#3CACB0] active:translate-y-px active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-[#3CACB0] focus-visible:outline-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? co.placingOrder : co.placeOrder}
          </button>

          <p className="mt-4 text-center text-[10px] leading-[1.7] tracking-[0.3px] text-[#A2A2A2]">
            {co.termsText}{" "}
            <Link href="#" className="underline underline-offset-2 transition-colors duration-200 hover:text-[#1E1E1E]">{co.termsLink}</Link>
            {" "}{t.and}{" "}
            <Link href="#" className="underline underline-offset-2 transition-colors duration-200 hover:text-[#1E1E1E]">{co.privacyLink}</Link>.
          </p>
        </form>

        {/* ── Right: order summary ── */}
        <div className="lg:pt-0">
          <div className="bg-[#F9F9F9] p-7">
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[3px] text-[#1E1E1E]">{co.orderSummary}</p>

            <ul className="mb-6 flex flex-col gap-5">
              {items.map((item) => (
                <li key={`${item.slug}-${item.color}-${item.size}`} className="flex items-start gap-3">
                  <div className="relative h-[64px] w-[52px] flex-shrink-0 overflow-hidden bg-white">
                    <Image src={item.img} alt={item.name} fill className="object-contain" sizes="52px" />
                    <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#A2A2A2] text-[9px] font-semibold text-white">{item.qty}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-medium uppercase leading-[1.4] tracking-[1px] text-[#1E1E1E]">{item.name}</p>
                    <div className="mt-0.5 flex flex-col gap-0.5">
                      {item.color && <span className="text-[10px] tracking-[0.6px] text-[#A2A2A2]">{item.color}</span>}
                      {item.size  && <span className="text-[10px] tracking-[0.6px] text-[#A2A2A2]">{item.size}</span>}
                    </div>
                  </div>
                  <p className="flex-shrink-0 text-[12px] tracking-[1px] text-[#1E1E1E]">{formatCAD(parsePrice(item.price) * item.qty)}</p>
                </li>
              ))}
            </ul>

            <div className="h-px bg-[#E8E8E8]" />

            <dl className="mt-5 flex flex-col gap-3">
              <div className="flex justify-between">
                <dt className="text-[11px] tracking-[0.8px] text-[#A2A2A2]">{co.subtotal}</dt>
                <dd className="text-[12px] tracking-[1px] text-[#1E1E1E]">{formatCAD(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[11px] tracking-[0.8px] text-[#A2A2A2]">{co.shipping}</dt>
                <dd className="text-[12px] tracking-[1px] text-[#1E1E1E]">{shipping === 0 ? t.free : formatCAD(shipping)}</dd>
              </div>
              {engravingOn && (
                <div className="flex justify-between">
                  <dt className="text-[11px] tracking-[0.8px] text-[#A2A2A2]">{co.engravingLbl}</dt>
                  <dd className="text-[12px] tracking-[1px] text-[#1E1E1E]">+{formatCAD(ENGRAVING_FEE)}</dd>
                </div>
              )}
              <div className="my-1 h-px bg-[#E8E8E8]" />
              <div className="flex justify-between">
                <dt className="text-[12px] font-medium uppercase tracking-[1.5px] text-[#1E1E1E]">{co.total}</dt>
                <dd className="text-[15px] tracking-[1px] text-[#1E1E1E]">{formatCAD(total)}</dd>
              </div>
            </dl>

            <p className="mt-4 text-[10px] leading-[1.6] tracking-[0.4px] text-[#A2A2A2]">{co.dueETransfer}</p>
          </div>

          <ul className="mt-5 flex flex-col gap-3 px-1">
            {co.trustSignals.map((text) => (
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

function FormField({ field, value, error, onChange, optionalLabel }: {
  field: { id: string; label: string; type?: string; placeholder?: string; autoComplete?: string; half?: boolean; optional?: boolean }
  value: string; error?: string; optionalLabel: string
  onChange: (id: string, val: string) => void
}) {
  return (
    <div className={field.half ? "col-span-1" : "col-span-2"}>
      <label htmlFor={field.id} className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[2px] text-[#A2A2A2]">
        {field.label}
        {field.optional && <span className="ml-1 font-normal normal-case tracking-normal text-[#C8C8C8]">({optionalLabel})</span>}
      </label>
      <input
        id={field.id}
        type={field.type ?? "text"}
        autoComplete={field.autoComplete}
        placeholder={field.placeholder}
        value={value}
        onChange={(e) => onChange(field.id, e.target.value)}
        className={`w-full border px-4 py-3 text-[12px] tracking-[0.4px] text-[#1E1E1E] placeholder:text-[#D0D0D0] outline-none transition-[border-color] duration-200 focus:border-[#1E1E1E] ${error ? "border-red-400" : "border-[#E8E8E8]"}`}
      />
      {error && <p className="mt-1 text-[10px] tracking-[0.4px] text-red-400">{error}</p>}
    </div>
  )
}
