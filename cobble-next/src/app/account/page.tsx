"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useLanguage } from "@/context/LanguageContext"

type Mode = "login" | "register" | "check-email"

export default function AccountPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const a = t.account

  const [mode, setMode] = useState<Mode>("login")
  const [remember, setRemember] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pendingEmail, setPendingEmail] = useState("")

  function clearError() { setError(null) }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    clearError()
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    const email    = fd.get("email")    as string
    const password = fd.get("password") as string

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) { setError(error.message); setLoading(false); return }
    router.push("/dashboard")
    router.refresh()
  }

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    clearError()

    const fd       = new FormData(e.currentTarget)
    const fullName = fd.get("name")     as string
    const email    = fd.get("email")    as string
    const password = fd.get("password") as string
    const confirm  = fd.get("confirm")  as string

    if (password !== confirm) { setError(a.passwordsMustMatch); return }
    if (password.length < 6)  { setError(a.passwordTooShort);   return }

    setLoading(true)

    const supabase = createClient()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) { setError(error.message); setLoading(false); return }

    if (data.session) { router.push("/dashboard"); router.refresh(); return }

    setPendingEmail(email)
    setLoading(false)
    setMode("check-email")
  }

  async function handleResendEmail() {
    clearError()
    const supabase = createClient()
    const { error } = await supabase.auth.resend({
      email: pendingEmail,
      type: "signup",
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    })
    if (error) setError(error.message)
  }

  return (
    <div className="grid min-h-[580px] grid-cols-1 md:h-[calc(100vh-122px)] md:grid-cols-[1.05fr_1fr]">

      {/* Image panel */}
      <div className="relative hidden overflow-hidden md:block">
        <Image src="/hero/head2.png" alt="Cobble — handcrafted objects" fill className="object-cover object-center" priority />
        <div className="absolute inset-0" style={{ background: "rgba(20,18,16,0.48)" }} />
        <div className="absolute left-0 right-0 top-0 h-44 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(20,18,16,0.4) 0%, transparent 100%)" }} />
        <div className="absolute bottom-0 left-0 z-10 p-12">
          <p className="font-editorial italic text-white max-w-[360px] leading-relaxed" style={{ fontSize: 26, textShadow: "0 1px 6px rgba(0,0,0,0.35)" }}>
            {a.imageQuote}
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center overflow-y-auto bg-white px-10 py-16">
        <div className="w-full max-w-[380px]">

          <span className="font-ui mb-3.5 block text-[10px] font-semibold uppercase tracking-[3px]" style={{ color: "var(--ash)" }}>
            {a.sectionLabel}
          </span>

          {mode === "check-email" ? (
            <CheckEmailScreen
              email={pendingEmail}
              error={error}
              onResend={handleResendEmail}
              onBack={() => { setMode("login"); clearError() }}
              a={a}
            />
          ) : (
            <>
              <h1 className="font-editorial mb-2 font-normal leading-[1.1] tracking-tight" style={{ fontSize: 34, color: "var(--ink)" }}>
                {mode === "login" ? a.welcomeBack : a.createAccount}
              </h1>

              <p className="mb-8 text-[12px] leading-[1.7] tracking-[0.4px]" style={{ color: "var(--slate)" }}>
                {mode === "login" ? a.signInDesc : a.registerDesc}
              </p>

              {/* Mode tabs */}
              <div className="mb-[34px] flex gap-7" role="tablist">
                {(["login", "register"] as const).map((m) => (
                  <button
                    key={m}
                    role="tab"
                    aria-selected={mode === m}
                    onClick={() => { setMode(m); clearError() }}
                    className="font-ui cursor-pointer bg-transparent pb-2.5 text-[11px] font-medium uppercase tracking-[2.5px] transition-colors duration-200"
                    style={{ border: "none", borderBottom: mode === m ? "1.5px solid var(--ink)" : "1.5px solid transparent", color: mode === m ? "var(--ink)" : "var(--ash)" }}
                  >
                    {m === "login" ? a.signInTab : a.registerTab}
                  </button>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={mode === "login" ? handleLogin : handleRegister} className="flex flex-col gap-[26px]" noValidate>
                {mode === "register" && (
                  <Field label={a.fullNameLbl} id="name" name="name" type="text" placeholder={a.fullNamePlaceholder} autoComplete="name" />
                )}
                <Field label={a.emailLbl} id="email" name="email" type="email" placeholder={a.emailPlaceholder} autoComplete="email" required />
                <Field label={a.passwordLbl} id="password" name="password" type="password" placeholder={a.passwordPlaceholder} autoComplete={mode === "login" ? "current-password" : "new-password"} required />
                {mode === "register" && (
                  <Field label={a.confirmPasswordLbl} id="confirm" name="confirm" type="password" placeholder={a.passwordPlaceholder} autoComplete="new-password" />
                )}

                {mode === "login" ? (
                  <div className="mt-0.5 flex items-center justify-between">
                    <Checkbox checked={remember} onChange={() => setRemember(!remember)} label={a.rememberMe} />
                    <Link href="#" className="font-ui text-[10px] uppercase tracking-[1.5px] transition-colors duration-200 hover:text-[#3CACB0]" style={{ color: "var(--ash)" }} onClick={(e) => e.preventDefault()}>
                      {a.forgotPassword}
                    </Link>
                  </div>
                ) : (
                  <p className="text-[10px] leading-[1.7] tracking-[0.4px]" style={{ color: "var(--ash)" }}>
                    {a.termsText}
                  </p>
                )}

                {error && <p className="text-[11px] leading-[1.6]" style={{ color: "#c0392b" }}>{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="font-ui mt-1.5 w-full cursor-pointer py-3.5 text-[11px] font-medium uppercase tracking-[2.5px] text-white transition-colors duration-200 hover:bg-[#3CACB0] active:bg-[#2E898C] disabled:opacity-70"
                  style={{ background: loading ? "var(--teal-700)" : "var(--ink)", border: "none" }}
                >
                  {loading
                    ? (mode === "login" ? a.signingIn : a.creatingAccount)
                    : (mode === "login" ? a.signInBtn : a.createAccountBtn)}
                </button>
              </form>

              <p className="mt-7 text-center text-[11px] tracking-[0.6px]" style={{ color: "var(--slate)" }}>
                {mode === "login" ? a.newToCobble : a.alreadyHaveAccount}
                <button
                  onClick={() => { setMode(mode === "login" ? "register" : "login"); clearError() }}
                  className="font-ui cursor-pointer bg-transparent text-[11px] font-medium uppercase tracking-[1.5px] transition-colors duration-200 hover:text-[#3CACB0]"
                  style={{ border: "none", color: "var(--ink)", padding: 0 }}
                >
                  {mode === "login" ? a.createAccountLink : a.signInLink}
                </button>
              </p>
            </>
          )}

        </div>
      </div>
    </div>
  )
}

function CheckEmailScreen({
  email, error, onResend, onBack, a,
}: {
  email: string; error: string | null; onResend: () => void; onBack: () => void
  a: ReturnType<typeof useLanguage>["t"]["account"]
}) {
  const [sent, setSent] = useState(false)

  async function handleResend() {
    onResend()
    setSent(true)
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <>
      <div className="mb-7 flex h-14 w-14 items-center justify-center" style={{ border: "1.5px solid #E8E8E8" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
      </div>

      <h1 className="font-editorial mb-2 font-normal leading-[1.1] tracking-tight" style={{ fontSize: 34, color: "var(--ink)" }}>
        {a.checkEmailTitle}
      </h1>

      <p className="mb-8 text-[12px] leading-[1.7] tracking-[0.4px]" style={{ color: "var(--slate)" }}>
        {a.checkEmailDescPrefix}{" "}
        <span className="font-medium" style={{ color: "var(--ink)" }}>{email}</span>.{" "}
        {a.checkEmailDescSuffix}
      </p>

      {error && <p className="mb-4 text-[11px] leading-[1.6]" style={{ color: "#c0392b" }}>{error}</p>}
      {sent  && <p className="mb-4 text-[11px] leading-[1.6]" style={{ color: "#3CACB0" }}>{a.linkResent}</p>}

      <div className="flex items-center justify-between">
        <button type="button" onClick={handleResend} className="font-ui cursor-pointer bg-transparent text-[10px] uppercase tracking-[1.5px] transition-colors duration-200 hover:text-[#3CACB0]" style={{ border: "none", padding: 0, color: "var(--ash)" }}>
          {a.resendEmail}
        </button>
        <button type="button" onClick={onBack} className="font-ui cursor-pointer bg-transparent text-[10px] uppercase tracking-[1.5px] transition-colors duration-200 hover:text-[#3CACB0]" style={{ border: "none", padding: 0, color: "var(--ash)" }}>
          {a.backToSignIn}
        </button>
      </div>
    </>
  )
}

function Field({ label, id, name, type = "text", placeholder, autoComplete, required }: {
  label: string; id: string; name: string; type?: string; placeholder?: string; autoComplete?: string; required?: boolean
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-ui text-[10px] font-medium uppercase tracking-[2px]" style={{ color: "var(--ash)" }}>
        {label}
      </label>
      <input
        id={id} name={name} type={type} placeholder={placeholder} autoComplete={autoComplete} required={required}
        className="font-ui w-full bg-transparent py-2 text-[14px] tracking-[0.4px] outline-none transition-colors duration-200"
        style={{ borderTop: "none", borderLeft: "none", borderRight: "none", borderBottom: "1.5px solid #E8E8E8", color: "var(--ink)", borderRadius: 0, boxShadow: "none" }}
        onFocus={(e) => (e.currentTarget.style.borderBottomColor = "#1E1E1E")}
        onBlur={(e)  => (e.currentTarget.style.borderBottomColor = "#E8E8E8")}
      />
    </div>
  )
}

function Checkbox({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <button type="button" onClick={onChange} aria-pressed={checked} className="flex cursor-pointer items-center gap-2.5 bg-transparent" style={{ border: "none", padding: 0 }}>
      <span className="flex h-[15px] w-[15px] flex-shrink-0 items-center justify-center transition-colors duration-200" style={{ border: "1.5px solid var(--ink)", background: checked ? "var(--ink)" : "transparent" }}>
        {checked && (
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </span>
      <span className="font-ui text-[10px] uppercase tracking-[1.5px]" style={{ color: "var(--ink)" }}>{label}</span>
    </button>
  )
}
