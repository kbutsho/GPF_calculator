"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useLang } from "@/components/LangProvider";

async function send(url, body, fallback) {
  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || fallback);
  return json;
}

export default function ProfileForms({ user }) {
  const router = useRouter();
  const { t } = useLang();
  const [profile, setProfile] = useState(user);
  const [pw, setPw] = useState({ currentPassword: "", newPassword: "", confirm: "" });
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPw, setSavingPw] = useState(false);
  const failed = t("কাজটি করা যায়নি", "Something went wrong");

  const saveProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const json = await send("/api/profile", profile, failed);
      toast.success(json.message);
      router.refresh();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSavingProfile(false);
    }
  };

  const savePassword = async (e) => {
    e.preventDefault();
    if (pw.newPassword !== pw.confirm) return toast.error(t("নতুন পাসওয়ার্ড দুটি মিলছে না", "The new passwords don't match"));
    setSavingPw(true);
    try {
      const json = await send("/api/profile/password", pw, failed);
      toast.success(json.message);
      setPw({ currentPassword: "", newPassword: "", confirm: "" });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSavingPw(false);
    }
  };

  const setP = (field) => (e) => setProfile((p) => ({ ...p, [field]: e.target.value }));
  const setW = (field) => (e) => setPw((p) => ({ ...p, [field]: e.target.value }));
  const optional = <span className="text-muted small">({t("ঐচ্ছিক", "optional")})</span>;

  return (
    <div className="row g-4">
      <div className="col-lg-7">
        <form className="card" onSubmit={saveProfile}>
          <div className="card-header">
            <i className="bi bi-person-vcard me-2" />
            {t("ব্যক্তিগত তথ্য", "Personal details")}
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label" htmlFor="p-name">{t("পুরো নাম", "Full name")}</label>
                <input id="p-name" className="form-control" value={profile.name} onChange={setP("name")} required />
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="p-phone">{t("মোবাইল নম্বর", "Mobile number")}</label>
                <input id="p-phone" type="tel" className="form-control" value={profile.phone} onChange={setP("phone")} />
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="p-email">
                  {t("ইমেইল", "Email")} {optional}
                </label>
                <input id="p-email" type="email" className="form-control" value={profile.email} onChange={setP("email")} />
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="p-designation">
                  {t("পদবি", "Designation")} {optional}
                </label>
                <input id="p-designation" className="form-control" value={profile.designation} onChange={setP("designation")} />
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="p-office">
                  {t("অফিস", "Office")} {optional}
                </label>
                <input id="p-office" className="form-control" value={profile.office} onChange={setP("office")} />
              </div>
            </div>
            <div className="section-hint mt-3">
              {t("মোবাইল নম্বর বা ইমেইল — যেকোনোটি দিয়ে লগইন করতে পারবেন।", "You can log in with either your mobile number or email.")}
            </div>
          </div>
          <div className="card-footer bg-white text-end">
            <button className="btn btn-brand" disabled={savingProfile}>
              <i className="bi bi-save me-1" />
              {savingProfile ? t("সংরক্ষণ হচ্ছে...", "Saving...") : t("সংরক্ষণ করুন", "Save")}
            </button>
          </div>
        </form>
      </div>

      <div className="col-lg-5">
        <form className="card" onSubmit={savePassword}>
          <div className="card-header">
            <i className="bi bi-key me-2" />
            {t("পাসওয়ার্ড পরিবর্তন", "Change password")}
          </div>
          <div className="card-body d-flex flex-column gap-3">
            <div>
              <label className="form-label" htmlFor="pw-current">{t("বর্তমান পাসওয়ার্ড", "Current password")}</label>
              <input id="pw-current" type="password" className="form-control" value={pw.currentPassword} onChange={setW("currentPassword")} autoComplete="current-password" required />
            </div>
            <div>
              <label className="form-label" htmlFor="pw-new">{t("নতুন পাসওয়ার্ড", "New password")}</label>
              <input id="pw-new" type="password" className="form-control" value={pw.newPassword} onChange={setW("newPassword")} autoComplete="new-password" minLength={6} required />
            </div>
            <div>
              <label className="form-label" htmlFor="pw-confirm">{t("নতুন পাসওয়ার্ড আবার", "Repeat new password")}</label>
              <input id="pw-confirm" type="password" className="form-control" value={pw.confirm} onChange={setW("confirm")} autoComplete="new-password" required />
            </div>
          </div>
          <div className="card-footer bg-white text-end">
            <button className="btn btn-outline-dark" disabled={savingPw}>
              {savingPw ? t("পরিবর্তন হচ্ছে...", "Changing...") : t("পাসওয়ার্ড বদলান", "Change password")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
