"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

type Mode = "login" | "register" | "check-email"

export default function AccountPage() {
  const router = useRouter()

  const [mode, setMode] = useState<Mode>("login")
  const [remember, setRemember] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pendingEmail, setPendingEmail] = useState("")

  function clearError() {
    setError(null)
  }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    clearError()
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    const email = fd.get("email") as string
    const password = fd.get("password") as string

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push("/dashboard")
    router.refresh()
  }

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    clearError()

    const fd = new FormData(e.currentTarget)
    const fullName = fd.get("name") as string
    const email = fd.get("email") as string
    const password = fd.get("password") as string
    const confirm = fd.get("confirm") as string

    if (password !== confirm) {
      setError("Passwords do not match.")
      return
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.")
      return
    }

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

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    // Email confirmation disabled — user is immediately signed in
    if (data.session) {
      router.push("/dashboard")
      router.refresh()
      return
    }

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
    <div className="grid h-[calc(100vh-122px)] min-h-[580px]" style={{ gridTemplateColumns: "1.05fr 1fr" }}>

      {/* ── Image panel ── */}
      <div className="relative overflow-hidden">
        <Image
          src="/hero/head2.png"
          alt="Cobble — handcrafted objects"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0" style={{ background: "rgba(20,18,16,0.48)" }} />
        <div
          className="absolute left-0 right-0 top-0 h-44 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(20,18,16,0.4) 0%, transparent 100%)" }}
        />
        <div className="absolute bottom-0 left-0 z-10 p-12">
          <p
            className="font-editorial italic text-white max-w-[360px] leading-relaxed"
            style={{ fontSize: 26, textShadow: "0 1px 6px rgba(0,0,0,0.35)" }}
          >
            Every piece is one of a kind —&nbsp;and so is the hand it&apos;s made for.
          </p>
        </div>
      </div>

      {/* ── Form panel ── */}
      <div className="flex items-center justify-center overflow-y-auto bg-white px-10 py-16">
        <div className="w-full max-w-[380px]">

          <span
            className="font-ui mb-3.5 block text-[10px] font-semibold uppercase tracking-[3px]"
            style={{ color: "var(--ash)" }}
          >
            Account
          </span>

          {mode === "check-email" ? (
            <CheckEmailScreen
              email={pendingEmail}
              error={error}
              onResend={handleResendEmail}
              onBack={() => { setMode("login"); clearError() }}
            />
          ) : (
            <>
              <h1
                className="font-editorial mb-2 font-normal leading-[1.1] tracking-tight"
                style={{ fontSize: 34, color: "var(--ink)" }}
              >
                {mode === "login" ? "Welcome back" : "Create an account"}
              </h1>

              <p className="mb-8 text-[12px] leading-[1.7] tracking-[0.4px]" style={{ color: "var(--slate)" }}>
                {mode === "login"
                  ? "Sign in to view your orders and saved pieces."
                  : "Join Cobble for order history, saved pieces, and studio notes."}
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
                    style={{
                      border: "none",
                      borderBottom: mode === m ? "1.5px solid var(--ink)" : "1.5px solid transparent",
                      color: mode === m ? "var(--ink)" : "var(--ash)",
                    }}
                  >
                    {m === "login" ? "Sign In" : "Register"}
                  </button>
                ))}
              </div>

              {/* Form */}
              <form
                onSubmit={mode === "login" ? handleLogin : handleRegister}
                className="flex flex-col gap-[26px]"
                noValidate
              >
                {mode === "register" && (
                  <Field label="Full Name" id="name" name="name" type="text" placeholder="Jane Maker" autoComplete="name" />
                )}

                <Field label="Email" id="email" name="email" type="email" placeholder="you@email.com" autoComplete="email" required />

                <Field
                  label="Password"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  required
                />

                {mode === "register" && (
                  <Field label="Confirm Password" id="confirm" name="confirm" type="password" placeholder="••••••••" autoComplete="new-password" />
                )}

                {mode === "login" ? (
                  <div className="mt-0.5 flex items-center justify-between">
                    <Checkbox checked={remember} onChange={() => setRemember(!remember)} label="Remember me" />
                    <Link
                      href="#"
                      className="font-ui text-[10px] uppercase tracking-[1.5px] transition-colors duration-200 hover:text-[#3CACB0]"
                      style={{ color: "var(--ash)" }}
                      onClick={(e) => e.preventDefault()}
                    >
                      Forgot password?
                    </Link>
                  </div>
                ) : (
                  <p className="text-[10px] leading-[1.7] tracking-[0.4px]" style={{ color: "var(--ash)" }}>
                    By creating an account you agree to our{" "}
                    <Link href="#" className="text-[var(--ink)] underline underline-offset-[2px]" onClick={(e) => e.preventDefault()}>Terms of Use</Link>
                    {" "}and{" "}
                    <Link href="#" className="text-[var(--ink)] underline underline-offset-[2px]" onClick={(e) => e.preventDefault()}>Privacy Policy</Link>.
                  </p>
                )}

                {error && (
                  <p className="text-[11px] leading-[1.6]" style={{ color: "#c0392b" }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="font-ui mt-1.5 w-full cursor-pointer py-3.5 text-[11px] font-medium uppercase tracking-[2.5px] text-white transition-colors duration-200 hover:bg-[#3CACB0] active:bg-[#2E898C] disabled:opacity-70"
                  style={{ background: loading ? "var(--teal-700)" : "var(--ink)", border: "none" }}
                >
                  {loading
                    ? (mode === "login" ? "Signing in…" : "Creating account…")
                    : (mode === "login" ? "Sign In" : "Create Account")}
                </button>
              </form>

              <p className="mt-7 text-center text-[11px] tracking-[0.6px]" style={{ color: "var(--slate)" }}>
                {mode === "login" ? "New to Cobble? " : "Already have an account? "}
                <button
                  onClick={() => { setMode(mode === "login" ? "register" : "login"); clearError() }}
                  className="font-ui cursor-pointer bg-transparent text-[11px] font-medium uppercase tracking-[1.5px] transition-colors duration-200 hover:text-[#3CACB0]"
                  style={{ border: "none", color: "var(--ink)", padding: 0 }}
                >
                  {mode === "login" ? "Create an account" : "Sign in"}
                </button>
              </p>
            </>
          )}

        </div>
      </div>
    </div>
  )
}

/* ── Check Email Screen ── */
function CheckEmailScreen({
  email, error, onResend, onBack,
}: {
  email: string
  error: string | null
  onResend: () => void
  onBack: () => void
}) {
  const [sent, setSent] = useState(false)

  async function handleResend() {
    onResend()
    setSent(true)
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <>
      {/* Envelope icon */}
      <div className="mb-7 flex h-14 w-14 items-center justify-center" style={{ border: "1.5px solid #E8E8E8" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
      </div>

      <h1
        className="font-editorial mb-2 font-normal leading-[1.1] tracking-tight"
        style={{ fontSize: 34, color: "var(--ink)" }}
      >
        Check your email
      </h1>

      <p className="mb-8 text-[12px] leading-[1.7] tracking-[0.4px]" style={{ color: "var(--slate)" }}>
        We sent a confirmation link to{" "}
        <span className="font-medium" style={{ color: "var(--ink)" }}>{email}</span>.
        Click the link to activate your account.
      </p>

      {error && (
        <p className="mb-4 text-[11px] leading-[1.6]" style={{ color: "#c0392b" }}>
          {error}
        </p>
      )}

      {sent && (
        <p className="mb-4 text-[11px] leading-[1.6]" style={{ color: "#3CACB0" }}>
          A new link has been sent.
        </p>
      )}

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleResend}
          className="font-ui cursor-pointer bg-transparent text-[10px] uppercase tracking-[1.5px] transition-colors duration-200 hover:text-[#3CACB0]"
          style={{ border: "none", padding: 0, color: "var(--ash)" }}
        >
          Resend email
        </button>
        <button
          type="button"
          onClick={onBack}
          className="font-ui cursor-pointer bg-transparent text-[10px] uppercase tracking-[1.5px] transition-colors duration-200 hover:text-[#3CACB0]"
          style={{ border: "none", padding: 0, color: "var(--ash)" }}
        >
          ← Back to sign in
        </button>
      </div>
    </>
  )
}

/* ── Field ── */
function Field({
  label, id, name, type = "text", placeholder, autoComplete, required,
}: {
  label: string; id: string; name: string; type?: string; placeholder?: string; autoComplete?: string; required?: boolean
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-ui text-[10px] font-medium uppercase tracking-[2px]"
        style={{ color: "var(--ash)" }}
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className="font-ui w-full bg-transparent py-2 text-[14px] tracking-[0.4px] outline-none transition-colors duration-200"
        style={{
          borderTop: "none",
          borderLeft: "none",
          borderRight: "none",
          borderBottom: "1.5px solid #E8E8E8",
          color: "var(--ink)",
          borderRadius: 0,
          boxShadow: "none",
        }}
        onFocus={(e) => (e.currentTarget.style.borderBottomColor = "#1E1E1E")}
        onBlur={(e) => (e.currentTarget.style.borderBottomColor = "#E8E8E8")}
      />
    </div>
  )
}

/* ── Checkbox ── */
function Checkbox({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={checked}
      className="flex cursor-pointer items-center gap-2.5 bg-transparent"
      style={{ border: "none", padding: 0 }}
    >
      <span
        className="flex h-[15px] w-[15px] flex-shrink-0 items-center justify-center transition-colors duration-200"
        style={{
          border: "1.5px solid var(--ink)",
          background: checked ? "var(--ink)" : "transparent",
        }}
      >
        {checked && (
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </span>
      <span className="font-ui text-[10px] uppercase tracking-[1.5px]" style={{ color: "var(--ink)" }}>
        {label}
      </span>
    </button>
  )
}
