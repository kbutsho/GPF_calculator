"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import YearForm, { blankYear } from "@/components/YearForm";
import { useLang } from "@/components/LangProvider";

function Loading() {
  const { t } = useLang();
  return <div className="text-center text-muted py-5">{t("লোড হচ্ছে...", "Loading...")}</div>;
}

function NewYearInner() {
  const { t } = useLang();
  const params = useSearchParams();
  const carry = params.get("carry");
  const [initial, setInitial] = useState(null);
  // StrictMode runs effects twice in dev. Without this guard the second pass
  // finds the handover already consumed and replaces it with a blank sheet.
  const loaded = useRef(false);

  // A carried-forward year is handed over through sessionStorage so the closing
  // balance of the previous sheet lands in the new one without a round trip.
  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    let carried = null;
    if (carry) {
      try {
        const raw = sessionStorage.getItem("pf:carry");
        if (raw) {
          carried = JSON.parse(raw);
          sessionStorage.removeItem("pf:carry");
        }
      } catch (e) {
        // sessionStorage unavailable — fall through to a blank sheet.
      }
    }
    setInitial(carried || blankYear());
  }, [carry]);

  if (!initial) return <Loading />;

  return (
    <>
      <h1 className="h4 mb-1">{t("নতুন বছরের হিসাব", "New year calculation")}</h1>
      <p className="section-hint mb-4">
        {t(
          "বাঁ পাশে তথ্য দিন — ডান পাশে ফলাফল সাথে সাথেই আপডেট হবে। সংরক্ষণ না করলেও হিসাব দেখা যাবে।",
          "Enter the details on the left — the result on the right updates instantly, even before you save."
        )}
      </p>
      <YearForm initial={initial} />
    </>
  );
}

export default function NewYearPage() {
  return (
    <Suspense fallback={<Loading />}>
      <NewYearInner />
    </Suspense>
  );
}
