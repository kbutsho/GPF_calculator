"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useLang } from "@/components/LangProvider";
import { localePath, LANG_HEADER } from "@/lib/i18n";

export default function LoginForm() {
  const { lang, t } = useLang();
  const params = useSearchParams();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const byEmail = identifier.includes("@");

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json", [LANG_HEADER]: lang },
        body: JSON.stringify({ identifier, password }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.message || t("লগইন করা যায়নি", "Could not log in"));
        return;
      }
      toast.success(json.message);
      // Only follow same-site paths so ?next= can't bounce users off-site.
      const next = params.get("next");
      const target = next && next.startsWith("/") && !next.startsWith("//") ? next : json.home || "/dashboard";
      // Full navigation so the server layouts pick up the new cookie.
      window.location.assign(target);
    } catch (err) {
      setError(err.message || t("লগইন করা যায়নি", "Could not log in"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-form">
      <div className="mb-4">
        <h1 className="auth-title">{t("আবার স্বাগতম 👋", "Welcome back 👋")}</h1>
        <p className="text-secondary mb-0">
          {t("আপনার GPF হিসাবের ড্যাশবোর্ডে লগইন করুন", "Log in to your GPF dashboard")}
        </p>
      </div>

      {error && (
        <div className="alert alert-danger d-flex align-items-center gap-2 py-2 small" role="alert">
          <i className="bi bi-exclamation-circle-fill" />
          {error}
        </div>
      )}

      <form onSubmit={submit} noValidate>
        <div className="mb-3">
          <label className="form-label fw-medium" htmlFor="identifier">
            {t("মোবাইল নম্বর অথবা ইমেইল", "Mobile number or email")}
          </label>
          <div className="input-group auth-input">
            <span className="input-group-text">
              <i className={`bi ${byEmail ? "bi-envelope" : "bi-phone"}`} />
            </span>
            <input
              id="identifier"
              className="form-control"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder={t("01XXXXXXXXX বা you@example.com", "01XXXXXXXXX or you@example.com")}
              autoComplete="username"
              inputMode={byEmail ? "email" : "text"}
              autoFocus
              required
            />
          </div>
        </div>
        <div className="mb-2">
          <label className="form-label fw-medium" htmlFor="password">
            {t("পাসওয়ার্ড", "Password")}
          </label>
          <div className="input-group auth-input">
            <span className="input-group-text">
              <i className="bi bi-lock" />
            </span>
            <input
              id="password"
              type={show ? "text" : "password"}
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              className="input-group-text auth-eye"
              aria-label={show ? t("পাসওয়ার্ড লুকান", "Hide password") : t("পাসওয়ার্ড দেখান", "Show password")}
              onClick={() => setShow((v) => !v)}
            >
              <i className={`bi ${show ? "bi-eye-slash" : "bi-eye"}`} />
            </button>
          </div>
        </div>
        <div className="d-flex justify-content-end mb-4">
          <Link href={localePath("/contact", lang)} className="small text-decoration-none">
            {t("পাসওয়ার্ড ভুলে গেছেন?", "Forgot password?")}
          </Link>
        </div>
        <button className="btn btn-brand w-100 auth-submit" disabled={busy || !identifier || !password}>
          {busy ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" />
              {t("লগইন হচ্ছে...", "Logging in...")}
            </>
          ) : (
            <>
              {t("লগইন", "Log in")}
              <i className="bi bi-arrow-right ms-2" />
            </>
          )}
        </button>
      </form>

      <div className="auth-divider">
        <span>{t("নতুন এখানে?", "New here?")}</span>
      </div>
      <Link href={localePath("/register", lang)} className="btn btn-outline-brand w-100 auth-alt">
        <i className="bi bi-person-plus me-2" />
        {t("ফ্রি অ্যাকাউন্ট খুলুন", "Create a free account")}
      </Link>

      <p className="auth-secure">
        <i className="bi bi-shield-check me-1" />
        {t("আপনার পাসওয়ার্ড এনক্রিপ্ট করে সংরক্ষিত থাকে", "Your password is stored encrypted")}
      </p>
    </div>
  );
}
