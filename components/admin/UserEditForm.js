"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useLang } from "@/components/LangProvider";
import { UserRole, UserRoleLabels } from "@/lib/constants";

/** Admin edits a user's contact details and role. */
export default function UserEditForm({ user, isSelf, meta }) {
  const router = useRouter();
  const { lang, t } = useLang();
  const [form, setForm] = useState(user);
  const [saving, setSaving] = useState(false);
  const dirty = JSON.stringify(form) !== JSON.stringify(user);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, role: Number(form.role) }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
      toast.success(json.message);
      router.refresh();
    } catch (err) {
      toast.error(err.message || t("আপডেট করা যায়নি", "Could not update"));
    } finally {
      setSaving(false);
    }
  };

  const input = (name, label, props = {}) => (
    <div className="col-md-6">
      <label className="form-label small text-muted" htmlFor={`u-${name}`}>
        {label}
      </label>
      <input id={`u-${name}`} className="form-control" value={form[name]} onChange={set(name)} {...props} />
    </div>
  );

  return (
    <form className="card h-100" onSubmit={save}>
      <div className="card-header d-flex justify-content-between align-items-center">
        <span>
          <i className="bi bi-person-vcard me-2" />
          {t("ব্যবহারকারীর তথ্য", "User details")}
        </span>
        {dirty && <span className="badge text-bg-warning">{t("সংরক্ষণ হয়নি", "Unsaved")}</span>}
      </div>
      <div className="card-body">
        <div className="row g-3">
          {input("name", t("নাম", "Name"), { required: true })}
          <div className="col-md-6">
            <label className="form-label small text-muted" htmlFor="u-role">
              {t("ভূমিকা", "Role")}
            </label>
            <select id="u-role" className="form-select" value={form.role} onChange={set("role")} disabled={isSelf}>
              {Object.values(UserRole).map((r) => (
                <option key={r} value={r}>
                  {UserRoleLabels[r][lang]}
                </option>
              ))}
            </select>
          </div>
          {input("phone", t("মোবাইল", "Mobile"), { type: "tel", placeholder: "01XXXXXXXXX" })}
          {input("email", t("ইমেইল", "Email"), { type: "email" })}
          {input("designation", t("পদবি", "Designation"))}
          {input("office", t("অফিস", "Office"))}
        </div>
        <dl className="row small text-muted mt-3 mb-0">
          {meta.map(([label, value]) => (
            <div className="col-sm-6 col-lg-4 d-flex gap-2" key={label}>
              <dt className="fw-normal">{label}:</dt>
              <dd className="mb-1 text-dark">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="card-footer bg-white d-flex justify-content-end gap-2">
        {dirty && (
          <button type="button" className="btn btn-outline-secondary" onClick={() => setForm(user)} disabled={saving}>
            {t("বাতিল", "Discard")}
          </button>
        )}
        <button className="btn btn-brand" disabled={saving || !dirty}>
          <i className="bi bi-save me-1" />
          {saving ? t("সংরক্ষণ হচ্ছে...", "Saving...") : t("সংরক্ষণ করুন", "Save changes")}
        </button>
      </div>
    </form>
  );
}
