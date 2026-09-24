"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useLang } from "@/components/LangProvider";
import { localePath } from "@/lib/i18n";

export default function RegisterForm() {
  const { lang, t } = useLang();
  const [form, setForm] = useState({ name: "", phone: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [show, setShow] = useState(false);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setErrors({ confirm: t("দুটি পাসওয়ার্ড মিলছে না", "The passwords don't match") });
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
        toast.error(json.message || t("রেজিস্ট্রেশন করা যায়নি", "Could not sign up"));
        return;
      }
      toast.success(json.message);
      window.location.assign("/dashboard");
    } catch (err) {
      toast.error(err.message || t("রেজিস্ট্রেশন করা যায়নি", "Could not sign up"));
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
          <h1 className="h4 fw-bold mb-1">{t("ফ্রি অ্যাকাউন্ট খুলুন", "Create a free account")}</h1>
          <div className="text-secondary small">{t("এক মিনিটেই শুরু করুন আপনার GPF হিসাব", "Start your GPF records in a minute")}</div>
        </div>

        <form onSubmit={submit} noValidate>
          {field("name", t("পুরো নাম", "Full name"), { autoComplete: "name", required: true })}
          {field(
            "phone",
            t("মোবাইল নম্বর", "Mobile number"),
            { type: "tel", placeholder: "01XXXXXXXXX", autoComplete: "tel", required: true },
            t("এই নম্বর দিয়ে লগইন করবেন", "You'll log in with this number")
          )}
          {field(
            "email",
            <>
              {t("ইমেইল", "Email")} <span className="text-secondary small">({t("ঐচ্ছিক", "optional")})</span>
            </>,
            { type: "email", placeholder: "you@example.com", autoComplete: "email" },
            t("দিলে ইমেইল দিয়েও লগইন করা যাবে", "Add it to log in by email as well")
          )}
          {field(
            "password",
            t("পাসওয়ার্ড", "Password"),
            { type: show ? "text" : "password", autoComplete: "new-password", required: true },
            t("অন্তত ৬ অক্ষর", "At least 6 characters")
          )}
          {field("confirm", t("পাসওয়ার্ড আবার লিখুন", "Repeat password"), {
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
              {t("পাসওয়ার্ড দেখান", "Show password")}
            </label>
          </div>
          <button className="btn btn-brand btn-lg w-100" disabled={busy}>
            {busy ? t("অ্যাকাউন্ট তৈরি হচ্ছে...", "Creating account...") : t("অ্যাকাউন্ট খুলুন", "Create account")}
          </button>
          <p className="small text-secondary text-center mt-3 mb-0">
            {t("অ্যাকাউন্ট খুলে আপনি আমাদের ", "By signing up you accept our ")}
            <Link href={localePath("/terms", lang)}>{t("শর্তাবলি", "terms")}</Link>
            {t(" ও ", " and ")}
            <Link href={localePath("/privacy", lang)}>{t("গোপনীয়তা নীতি", "privacy policy")}</Link>
            {t(" মেনে নিচ্ছেন।", ".")}
          </p>
        </form>

        <div className="text-center small mt-4">
          {t("আগেই অ্যাকাউন্ট আছে?", "Already have an account?")}{" "}
          <Link href={localePath("/login", lang)}>{t("লগইন করুন", "Log in")}</Link>
        </div>
      </div>
    </div>
  );
}
