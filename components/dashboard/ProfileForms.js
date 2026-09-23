"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

async function send(url, body) {
  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "কাজটি করা যায়নি");
  return json;
}

export default function ProfileForms({ user }) {
  const router = useRouter();
  const [profile, setProfile] = useState(user);
  const [pw, setPw] = useState({ currentPassword: "", newPassword: "", confirm: "" });
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPw, setSavingPw] = useState(false);

  const saveProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const json = await send("/api/profile", profile);
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
    if (pw.newPassword !== pw.confirm) return toast.error("নতুন পাসওয়ার্ড দুটি মিলছে না");
    setSavingPw(true);
    try {
      const json = await send("/api/profile/password", pw);
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

  return (
    <div className="row g-4">
      <div className="col-lg-7">
        <form className="card" onSubmit={saveProfile}>
          <div className="card-header">
            <i className="bi bi-person-vcard me-2" />
            ব্যক্তিগত তথ্য
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label" htmlFor="p-name">পুরো নাম</label>
                <input id="p-name" className="form-control" value={profile.name} onChange={setP("name")} required />
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="p-phone">মোবাইল নম্বর</label>
                <input id="p-phone" type="tel" className="form-control" value={profile.phone} onChange={setP("phone")} required />
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="p-email">
                  ইমেইল <span className="text-muted small">(ঐচ্ছিক)</span>
                </label>
                <input id="p-email" type="email" className="form-control" value={profile.email} onChange={setP("email")} />
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="p-designation">
                  পদবি <span className="text-muted small">(ঐচ্ছিক)</span>
                </label>
                <input id="p-designation" className="form-control" value={profile.designation} onChange={setP("designation")} />
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="p-office">
                  অফিস <span className="text-muted small">(ঐচ্ছিক)</span>
                </label>
                <input id="p-office" className="form-control" value={profile.office} onChange={setP("office")} />
              </div>
            </div>
            <div className="section-hint mt-3">মোবাইল নম্বর বা ইমেইল — যেকোনোটি দিয়ে লগইন করতে পারবেন।</div>
          </div>
          <div className="card-footer bg-white text-end">
            <button className="btn btn-brand" disabled={savingProfile}>
              <i className="bi bi-save me-1" />
              {savingProfile ? "সংরক্ষণ হচ্ছে..." : "সংরক্ষণ করুন"}
            </button>
          </div>
        </form>
      </div>

      <div className="col-lg-5">
        <form className="card" onSubmit={savePassword}>
          <div className="card-header">
            <i className="bi bi-key me-2" />
            পাসওয়ার্ড পরিবর্তন
          </div>
          <div className="card-body d-flex flex-column gap-3">
            <div>
              <label className="form-label" htmlFor="pw-current">বর্তমান পাসওয়ার্ড</label>
              <input id="pw-current" type="password" className="form-control" value={pw.currentPassword} onChange={setW("currentPassword")} autoComplete="current-password" required />
            </div>
            <div>
              <label className="form-label" htmlFor="pw-new">নতুন পাসওয়ার্ড</label>
              <input id="pw-new" type="password" className="form-control" value={pw.newPassword} onChange={setW("newPassword")} autoComplete="new-password" minLength={6} required />
            </div>
            <div>
              <label className="form-label" htmlFor="pw-confirm">নতুন পাসওয়ার্ড আবার</label>
              <input id="pw-confirm" type="password" className="form-control" value={pw.confirm} onChange={setW("confirm")} autoComplete="new-password" required />
            </div>
          </div>
          <div className="card-footer bg-white text-end">
            <button className="btn btn-outline-dark" disabled={savingPw}>
              {savingPw ? "পরিবর্তন হচ্ছে..." : "পাসওয়ার্ড বদলান"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
