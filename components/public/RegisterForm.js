"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useLang } from "@/components/LangProvider";
import { localePath, LANG_HEADER } from "@/lib/i18n";

/** 0–4 score from length and character variety; only a hint, the server requires 6+. */
function strength(pw) {
  if (!pw) return 0;
  let s = pw.length >= 6 ? 1 : 0;
  if (pw.length >= 10) s += 1;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s += 1;
  if (/\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) s += 1;
  return s;
}

export default function RegisterForm() {
  const { lang, t } = useLang();
  const [form, setForm] = useState({ name: "", phone: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [show, setShow] = useState(false);
  const [agree, setAgree] = useState(true);

  const set = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((x) => ({ ...x, [field]: undefined }));
  };

  const score = strength(form.password);
  const levels = [
    [t("খুব দুর্বল", "Too weak"), "danger"],
    [t("দুর্বল", "Weak"), "danger"],
    [t("মোটামুটি", "Fair"), "warning"],
    [t("ভালো", "Good"), "info"],
    [t("শক্তিশালী", "Strong"), "success"],
  ];

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
        headers: { "Content-Type": "application/json", [LANG_HEADER]: lang },
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

  const field = ({ name, label, icon, prefix, hint, ...props }) => (
    <div className="mb-3">
      <label className="form-label fw-medium" htmlFor={name}>
        {label}
      </label>
      <div className={`input-group auth-input has-validation ${errors[name] ? "is-invalid" : ""}`}>
        <span className="input-group-text">
          <i className={`bi ${icon}`} />
          {prefix && <span className="ms-1 small fw-semibold">{prefix}</span>}
        </span>
        <input
          id={name}
          className={`form-control ${errors[name] ? "is-invalid" : ""}`}
          value={form[name]}
          onChange={set(name)}
          aria-describedby={`${name}-help`}
          {...props}
        />
        {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
      </div>
      {!errors[name] && hint && (
        <div id={`${name}-help`} className="form-text">
          {hint}
        </div>
      )}
    </div>
  );

  return (
    <div className="auth-form">
      <div className="mb-4">
        <h1 className="auth-title">{t("ফ্রি অ্যাকাউন্ট খুলুন", "Create your free account")}</h1>
        <p className="text-secondary mb-0">{t("এক মিনিটেই শুরু করুন আপনার GPF হিসাব", "Start your GPF records in under a minute")}</p>
      </div>

      <form onSubmit={submit} noValidate>
        {field({ name: "name", label: t("পুরো নাম", "Full name"), icon: "bi-person", autoComplete: "name", placeholder: t("যেমন: করিম উদ্দিন", "e.g. Karim Uddin"), required: true })}
        <div className="row g-0 gx-md-3">
          <div className="col-md-6">
            {field({
              name: "phone",
              label: t("মোবাইল নম্বর", "Mobile number"),
              icon: "bi-phone",
              type: "tel",
              inputMode: "tel",
              placeholder: "01XXXXXXXXX",
              autoComplete: "tel",
              hint: t("এটি দিয়ে লগইন করবেন", "You'll log in with this"),
              required: true,
            })}
          </div>
          <div className="col-md-6">
            {field({
              name: "email",
              label: (
                <>
                  {t("ইমেইল", "Email")} <span className="text-secondary small fw-normal">({t("ঐচ্ছিক", "optional")})</span>
                </>
              ),
              icon: "bi-envelope",
              type: "email",
              placeholder: "you@example.com",
              autoComplete: "email",
              hint: t("দিলে ইমেইলেও লগইন করা যাবে", "Lets you log in by email too"),
            })}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-medium" htmlFor="password">
            {t("পাসওয়ার্ড", "Password")}
          </label>
          <div className={`input-group auth-input has-validation ${errors.password ? "is-invalid" : ""}`}>
            <span className="input-group-text">
              <i className="bi bi-lock" />
            </span>
            <input
              id="password"
              type={show ? "text" : "password"}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              value={form.password}
              onChange={set("password")}
              autoComplete="new-password"
              placeholder={t("অন্তত ৬ অক্ষর", "At least 6 characters")}
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
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          {form.password && (
            <div className="d-flex align-items-center gap-2 mt-2">
              <div className="auth-strength flex-grow-1" aria-hidden="true">
                {[1, 2, 3, 4].map((i) => (
                  <span key={i} className={i <= score ? `bg-${levels[score][1]}` : ""} />
                ))}
              </div>
              <span className={`small text-${levels[score][1]}`}>{levels[score][0]}</span>
            </div>
          )}
        </div>

        {field({
          name: "confirm",
          label: t("পাসওয়ার্ড আবার লিখুন", "Confirm password"),
          icon: "bi-shield-lock",
          type: show ? "text" : "password",
          autoComplete: "new-password",
          required: true,
        })}

        <div className="form-check mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            id="agree"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <label className="form-check-label small text-secondary" htmlFor="agree">
            {t("আমি ", "I accept the ")}
            <Link href={localePath("/terms", lang)} target="_blank">{t("শর্তাবলি", "terms")}</Link>
            {t(" ও ", " and ")}
            <Link href={localePath("/privacy", lang)} target="_blank">{t("গোপনীয়তা নীতি", "privacy policy")}</Link>
            {t(" মেনে নিচ্ছি", "")}
          </label>
        </div>

        <button className="btn btn-brand w-100 auth-submit" disabled={busy || !agree}>
          {busy ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" />
              {t("অ্যাকাউন্ট তৈরি হচ্ছে...", "Creating account...")}
            </>
          ) : (
            <>
              {t("অ্যাকাউন্ট খুলুন", "Create account")}
              <i className="bi bi-arrow-right ms-2" />
            </>
          )}
        </button>
      </form>

      <div className="auth-divider">
        <span>{t("আগেই অ্যাকাউন্ট আছে?", "Already have an account?")}</span>
      </div>
      <Link href={localePath("/login", lang)} className="btn btn-outline-brand w-100 auth-alt">
        <i className="bi bi-box-arrow-in-right me-2" />
        {t("লগইন করুন", "Log in")}
      </Link>
    </div>
  );
}
