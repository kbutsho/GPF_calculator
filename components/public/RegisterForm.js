"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

export default function RegisterForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [show, setShow] = useState(false);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setErrors({ confirm: "দুটি পাসওয়ার্ড মিলছে না" });
      return;
    }
    setBusy(true);
    setErrors({});
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrors(json.errors || {});
        toast.error(json.message || "রেজিস্ট্রেশন করা যায়নি");
        return;
      }
      toast.success(json.message);
      window.location.assign("/dashboard");
    } catch (err) {
      toast.error(err.message || "রেজিস্ট্রেশন করা যায়নি");
    } finally {
      setBusy(false);
    }
  };

  const field = (name, label, props = {}, hint) => (
    <div className="mb-3">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        className={`form-control ${errors[name] ? "is-invalid" : ""}`}
        value={form[name]}
        onChange={set(name)}
        {...props}
      />
      {errors[name] ? (
        <div className="invalid-feedback">{errors[name]}</div>
      ) : (
        hint && <div className="form-text">{hint}</div>
      )}
    </div>
  );

  return (
    <div className="card auth-card">
      <div className="card-body p-4 p-md-5">
        <div className="text-center mb-4">
          <span className="brand-mark mb-2" style={{ width: 52, height: 52, fontSize: "1.4rem" }}>
            <i className="bi bi-person-plus" />
          </span>
          <h4 className="fw-bold mb-1">ফ্রি অ্যাকাউন্ট খুলুন</h4>
          <div className="text-secondary small">এক মিনিটেই শুরু করুন আপনার GPF হিসাব</div>
        </div>

        <form onSubmit={submit} noValidate>
          {field("name", "পুরো নাম", { autoComplete: "name", required: true })}
          {field(
            "phone",
            "মোবাইল নম্বর",
            { type: "tel", placeholder: "01XXXXXXXXX", autoComplete: "tel", required: true },
            "এই নম্বর দিয়ে লগইন করবেন"
          )}
          {field(
            "email",
            <>
              ইমেইল <span className="text-secondary small">(ঐচ্ছিক)</span>
            </>,
            { type: "email", placeholder: "you@example.com", autoComplete: "email" },
            "দিলে ইমেইল দিয়েও লগইন করা যাবে"
          )}
          {field(
            "password",
            "পাসওয়ার্ড",
            { type: show ? "text" : "password", autoComplete: "new-password", required: true },
            "অন্তত ৬ অক্ষর"
          )}
          {field("confirm", "পাসওয়ার্ড আবার লিখুন", {
            type: show ? "text" : "password",
            autoComplete: "new-password",
            required: true,
          })}
          <div className="form-check mb-4">
            <input
              className="form-check-input"
              type="checkbox"
              id="show-pass"
              checked={show}
              onChange={(e) => setShow(e.target.checked)}
            />
            <label className="form-check-label small" htmlFor="show-pass">
              পাসওয়ার্ড দেখান
            </label>
          </div>
          <button className="btn btn-brand btn-lg w-100" disabled={busy}>
            {busy ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট খুলুন"}
          </button>
          <p className="small text-secondary text-center mt-3 mb-0">
            অ্যাকাউন্ট খুলে আপনি আমাদের <Link href="/terms">শর্তাবলি</Link> ও{" "}
            <Link href="/privacy">গোপনীয়তা নীতি</Link> মেনে নিচ্ছেন।
          </p>
        </form>

        <div className="text-center small mt-4">
          আগেই অ্যাকাউন্ট আছে? <Link href="/login">লগইন করুন</Link>
        </div>
      </div>
    </div>
  );
}
