"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useLang } from "@/components/LangProvider";
import { localePath } from "@/lib/i18n";

export default function LoginForm() {
  const { lang, t } = useLang();
  const params = useSearchParams();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    <div className="card auth-card">
      <div className="card-body p-4 p-md-5">
        <div className="text-center mb-4">
          <span className="brand-mark mb-2" style={{ width: 52, height: 52, fontSize: "1.4rem" }}>
            <i className="bi bi-box-arrow-in-right" />
          </span>
          <h1 className="h4 fw-bold mb-1">{t("লগইন করুন", "Log in")}</h1>
          <div className="text-secondary small">{t("আপনার GPF হিসাবের ড্যাশবোর্ডে ফিরে যান", "Back to your GPF dashboard")}</div>
        </div>

        {error && (
          <div className="alert alert-danger py-2 small">
            <i className="bi bi-exclamation-circle me-1" />
            {error}
          </div>
        )}

        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="identifier">
              {t("মোবাইল নম্বর অথবা ইমেইল", "Mobile number or email")}
            </label>
            <input
              id="identifier"
              className="form-control form-control-lg"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder={t("01XXXXXXXXX বা you@example.com", "01XXXXXXXXX or you@example.com")}
              autoComplete="username"
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label" htmlFor="password">
              {t("পাসওয়ার্ড", "Password")}
            </label>
            <div className="input-group">
              <input
                id="password"
                type={show ? "text" : "password"}
                className="form-control form-control-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                aria-label={show ? t("পাসওয়ার্ড লুকান", "Hide password") : t("পাসওয়ার্ড দেখান", "Show password")}
                onClick={() => setShow((v) => !v)}
              >
                <i className={`bi ${show ? "bi-eye-slash" : "bi-eye"}`} />
              </button>
            </div>
          </div>
          <button className="btn btn-brand btn-lg w-100" disabled={busy}>
            {busy ? t("লগইন হচ্ছে...", "Logging in...") : t("লগইন", "Log in")}
          </button>
        </form>

        <div className="text-center small mt-4">
          {t("অ্যাকাউন্ট নেই?", "No account?")}{" "}
          <Link href={localePath("/register", lang)}>{t("ফ্রি অ্যাকাউন্ট খুলুন", "Create one free")}</Link>
        </div>
        <div className="text-center small text-secondary mt-2">
          {t("পাসওয়ার্ড ভুলে গেছেন?", "Forgot your password?")}{" "}
          <Link href={localePath("/contact", lang)}>{t("যোগাযোগ করুন", "Contact us")}</Link>
        </div>
      </div>
    </div>
  );
}
