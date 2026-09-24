"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useLang } from "@/components/LangProvider";
import { UserStatus } from "@/lib/constants";

export default function UserActions({ userId, status, isSelf }) {
  const router = useRouter();
  const { t } = useLang();
  const [busy, setBusy] = useState(false);
  const active = status === UserStatus.ACTIVE;

  const call = async (url, method, body) => {
    setBusy(true);
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
      toast.success(json.message);
      router.refresh();
      return true;
    } catch (e) {
      toast.error(e.message || t("কাজটি করা যায়নি", "Something went wrong"));
      return false;
    } finally {
      setBusy(false);
    }
  };

  const toggleStatus = async () => {
    const ok = await Swal.fire({
      title: active ? t("অ্যাকাউন্ট নিষ্ক্রিয় করবেন?", "Deactivate this account?") : t("অ্যাকাউন্ট সক্রিয় করবেন?", "Activate this account?"),
      text: active
        ? t("ব্যবহারকারী আর লগইন করতে পারবেন না। হিসাবগুলো মুছবে না।", "The user won't be able to log in. Their data is kept.")
        : t("ব্যবহারকারী আবার লগইন করতে পারবেন।", "The user will be able to log in again."),
      icon: "question",
      showCancelButton: true,
      confirmButtonText: t("হ্যাঁ", "Yes"),
      cancelButtonText: t("না", "Cancel"),
      confirmButtonColor: active ? "#dc3545" : "#0f766e",
    });
    if (!ok.isConfirmed) return;
    call(`/api/admin/users/${userId}`, "PATCH", {
      status: active ? UserStatus.INACTIVE : UserStatus.ACTIVE,
    });
  };

  const resetPassword = async () => {
    const { value } = await Swal.fire({
      title: t("নতুন পাসওয়ার্ড দিন", "Set a new password"),
      text: t("ব্যবহারকারীকে এই পাসওয়ার্ডটি জানিয়ে দিন, পরে তিনি প্রোফাইল থেকে বদলাতে পারবেন।", "Share it with the user; they can change it later from their profile."),
      input: "text",
      inputAttributes: { minlength: 6, autocomplete: "off" },
      showCancelButton: true,
      confirmButtonText: t("সেট করুন", "Set password"),
      cancelButtonText: t("বাতিল", "Cancel"),
      confirmButtonColor: "#0f766e",
      inputValidator: (v) => (!v || v.length < 6 ? t("অন্তত ৬ অক্ষর", "At least 6 characters") : undefined),
    });
    if (!value) return;
    call(`/api/admin/users/${userId}/password`, "PUT", { password: value });
  };

  return (
    <div className="card h-100">
      <div className="card-header">
        <i className="bi bi-sliders me-2" />
        {t("অ্যাকশন", "Actions")}
      </div>
      <div className="card-body d-grid gap-2 align-content-start">
        <button className="btn btn-outline-dark" onClick={resetPassword} disabled={busy}>
          <i className="bi bi-key me-1" />
          {t("পাসওয়ার্ড রিসেট", "Reset password")}
        </button>
        <button
          className={`btn ${active ? "btn-outline-danger" : "btn-outline-success"}`}
          onClick={toggleStatus}
          disabled={busy || isSelf}
          title={isSelf ? t("নিজের অ্যাকাউন্ট নিষ্ক্রিয় করা যায় না", "You can't deactivate yourself") : undefined}
        >
          <i className={`bi ${active ? "bi-person-x" : "bi-person-check"} me-1`} />
          {active ? t("নিষ্ক্রিয় করুন", "Deactivate") : t("সক্রিয় করুন", "Activate")}
        </button>
        {isSelf && <div className="section-hint">{t("এটি আপনার নিজের অ্যাকাউন্ট।", "This is your own account.")}</div>}
      </div>
    </div>
  );
}
