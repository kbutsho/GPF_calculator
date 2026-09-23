"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function LoginForm() {
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
        setError(json.message || "লগইন করা যায়নি");
        return;
      }
      toast.success(json.message);
      // Only follow same-site paths so ?next= can't bounce users off-site.
      const next = params.get("next");
      const target = next && next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";
      // Full navigation so the server layouts pick up the new cookie.
      window.location.assign(target);
    } catch (err) {
      setError(err.message || "লগইন করা যায়নি");
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
          <h4 className="fw-bold mb-1">লগইন করুন</h4>
          <div className="text-secondary small">আপনার GPF হিসাবের ড্যাশবোর্ডে ফিরে যান</div>
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
              মোবাইল নম্বর অথবা ইমেইল
            </label>
            <input
              id="identifier"
              className="form-control form-control-lg"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="01XXXXXXXXX বা you@example.com"
              autoComplete="username"
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label" htmlFor="password">
              পাসওয়ার্ড
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
                aria-label={show ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখান"}
                onClick={() => setShow((v) => !v)}
              >
                <i className={`bi ${show ? "bi-eye-slash" : "bi-eye"}`} />
              </button>
            </div>
          </div>
          <button className="btn btn-brand btn-lg w-100" disabled={busy}>
            {busy ? "লগইন হচ্ছে..." : "লগইন"}
          </button>
        </form>

        <div className="text-center small mt-4">
          অ্যাকাউন্ট নেই? <Link href="/register">ফ্রি অ্যাকাউন্ট খুলুন</Link>
        </div>
        <div className="text-center small text-secondary mt-2">
          পাসওয়ার্ড ভুলে গেছেন? <Link href="/contact">যোগাযোগ করুন</Link>
        </div>
      </div>
    </div>
  );
}
