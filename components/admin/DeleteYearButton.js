"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useLang } from "@/components/LangProvider";

export default function DeleteYearButton({ yearId, userId, label }) {
  const router = useRouter();
  const { t } = useLang();

  const remove = async () => {
    const ok = await Swal.fire({
      title: t("হিসাবটি মুছবেন?", "Delete this year?"),
      text: t(`${label} — এই হিসাবটি স্থায়ীভাবে মুছে যাবে।`, `${label} will be permanently deleted.`),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("হ্যাঁ, মুছুন", "Yes, delete"),
      cancelButtonText: t("না", "Cancel"),
      confirmButtonColor: "#dc3545",
    });
    if (!ok.isConfirmed) return;
    const res = await fetch(`/api/admin/years/${yearId}`, { method: "DELETE" });
    const json = await res.json();
    if (!res.ok) return toast.error(json.message);
    toast.success(json.message);
    router.push(`/admin/users/${userId}`);
    router.refresh();
  };

  return (
    <button className="btn btn-sm btn-outline-danger no-print" onClick={remove}>
      <i className="bi bi-trash me-1" />
      {t("মুছে ফেলুন", "Delete")}
    </button>
  );
}
