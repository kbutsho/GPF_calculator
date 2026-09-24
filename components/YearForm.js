"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import NumberField from "@/components/NumberField";
import Breakdown from "@/components/Breakdown";
import { useLang } from "@/components/LangProvider";
import { calculateYear, solveDepositRate, compareMethods, fmt } from "@/lib/calc";
import { normalizeYear } from "@/lib/payload";
import { monthName } from "@/lib/i18n";
import {
  FISCAL_MONTHS,
  DEFAULT_SLABS,
  RateModes,
  DepositMethods,
  DepositMethodLabels,
  DepositMethodLabelsEn,
  Rounding,
  RoundingLabels,
  RoundingLabelsEn,
} from "@/lib/constants";

export function blankYear(overrides = {}) {
  const now = new Date();
  // Before July we are still inside the fiscal year that started last July.
  const startYear = now.getMonth() >= 6 ? now.getFullYear() : now.getFullYear() - 1;
  return {
    subscriber: "",
    accountNo: "",
    startYear,
    openingBalance: "",
    slabs: DEFAULT_SLABS.map((s) => ({ ...s })),
    rateMode: RateModes.TOP_SLAB,
    depositRate: "",
    depositMethod: DepositMethods.MONTHWISE,
    rounding: Rounding.TRUNCATE,
    months: FISCAL_MONTHS.map((m) => ({
      index: m.index,
      subscription: "",
      refund: "",
      withdrawal: "",
    })),
    reportedProfit: "",
    reportedClosing: "",
    note: "",
    ...overrides,
  };
}

/** `readOnly` is the admin's view of someone else's year: same screen, no edits or saves. */
export default function YearForm({ initial, yearId, readOnly = false }) {
  const router = useRouter();
  const { lang, t } = useLang();
  const methodLabels = lang === "en" ? DepositMethodLabelsEn : DepositMethodLabels;
  const roundingLabels = lang === "en" ? RoundingLabelsEn : RoundingLabels;

  const [form, setForm] = useState(() => initial || blankYear());
  const [saving, setSaving] = useState(false);
  const [bulk, setBulk] = useState("");
  const [showCompare, setShowCompare] = useState(false);
  const [showDetails, setShowDetails] = useState(readOnly);

  const set = (patch) => setForm((f) => ({ ...f, ...patch }));

  const setMonth = (index, field, value) =>
    setForm((f) => ({
      ...f,
      months: f.months.map((m, i) => (i === index ? { ...m, [field]: value } : m)),
    }));

  const setSlab = (index, field, value) =>
    setForm((f) => ({
      ...f,
      slabs: f.slabs.map((s, i) => (i === index ? { ...s, [field]: value } : s)),
    }));

  const addSlab = () =>
    setForm((f) => {
      const slabs = f.slabs.map((s) => ({ ...s }));
      // The old last band was open-ended; give it a size so the new one can be the tail.
      const last = slabs[slabs.length - 1];
      if (last && (last.upTo === null || last.upTo === "")) last.upTo = 1500000;
      slabs.push({ upTo: null, rate: 10 });
      return { ...f, slabs };
    });

  const removeSlab = (index) =>
    setForm((f) => {
      if (f.slabs.length <= 1) return f;
      const slabs = f.slabs.filter((_, i) => i !== index).map((s) => ({ ...s }));
      slabs[slabs.length - 1].upTo = null; // tail band is always open-ended
      return { ...f, slabs };
    });

  const applyBulk = () => {
    if (bulk === "") return toast.warn(t("আগে একটা পরিমাণ লিখুন", "Enter an amount first"));
    setForm((f) => ({ ...f, months: f.months.map((m) => ({ ...m, subscription: bulk })) }));
    toast.success(t("১২ মাসেই বসানো হয়েছে", "Filled into all 12 months"));
  };

  const payload = useMemo(() => normalizeYear(form), [form]);
  const result = useMemo(() => calculateYear(payload), [payload]);
  const comparison = useMemo(
    () => (showCompare ? compareMethods(payload) : []),
    [showCompare, payload]
  );

  const reported = form.reportedProfit === "" ? null : parseFloat(form.reportedProfit);
  const solved = useMemo(
    () => (reported === null || Number.isNaN(reported) ? null : solveDepositRate(payload, reported)),
    [payload, reported]
  );
  const profitDiff = reported === null || Number.isNaN(reported) ? null : result.profit - reported;

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch(yearId ? `/api/years/${yearId}` : "/api/years", {
        method: yearId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json.message || t("সংরক্ষণ করা যায়নি", "Could not save"));
        return;
      }
      toast.success(json.message || t("সংরক্ষিত হয়েছে", "Saved"));
      if (!yearId) router.push(`/dashboard/year/${json.data._id}`);
      else router.refresh();
    } catch (e) {
      toast.error(e.message || t("সংরক্ষণ করা যায়নি", "Could not save"));
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    const ok = await Swal.fire({
      title: t("মুছে ফেলবেন?", "Delete this year?"),
      text: t("এই বছরের হিসাবটি স্থায়ীভাবে মুছে যাবে।", "This year's calculation will be permanently deleted."),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("হ্যাঁ, মুছুন", "Yes, delete"),
      cancelButtonText: t("না", "Cancel"),
      confirmButtonColor: "#dc3545",
    });
    if (!ok.isConfirmed) return;

    const res = await fetch(`/api/years/${yearId}`, { method: "DELETE" });
    const json = await res.json();
    if (!res.ok) return toast.error(json.message || t("মুছে ফেলা যায়নি", "Could not delete"));
    toast.success(json.message);
    router.push("/dashboard");
  };

  /** Start next year's sheet with this year's closing balance already in place. */
  const carryForward = () => {
    const next = blankYear({
      subscriber: form.subscriber,
      accountNo: form.accountNo,
      startYear: Number(form.startYear) + 1,
      openingBalance: String(result.closingBalance),
      slabs: form.slabs.map((s) => ({ ...s })),
      rateMode: form.rateMode,
      depositRate: form.depositRate,
      depositMethod: form.depositMethod,
      rounding: form.rounding,
    });
    sessionStorage.setItem("pf:carry", JSON.stringify(next));
    router.push("/dashboard/year/new?carry=1");
  };

  const fy = t(
    `জুলাই ${form.startYear} – জুন ${Number(form.startYear) + 1}`,
    `July ${form.startYear} – June ${Number(form.startYear) + 1}`
  );
  const fyShort = `${form.startYear}–${Number(form.startYear) + 1}`;

  return (
    <div className="row g-4">
      {/* ================= LEFT: inputs ================= */}
      <div className="col-lg-7">
        <fieldset disabled={readOnly} className="d-flex flex-column gap-3">
          {/* --- basics --- */}
          <div className="card">
            <div className="card-header">
              <i className="bi bi-person-badge me-2" />
              {t("বছরের তথ্য", "Year details")}
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">{t("গ্রাহকের নাম", "Subscriber name")}</label>
                  <input
                    className="form-control"
                    value={form.subscriber}
                    onChange={(e) => set({ subscriber: e.target.value })}
                    placeholder="Name of Subscriber"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">{t("অ্যাকাউন্ট নং", "Account no.")}</label>
                  <input
                    className="form-control"
                    value={form.accountNo}
                    onChange={(e) => set({ accountNo: e.target.value })}
                    placeholder={t("ঐচ্ছিক", "Optional")}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">{t("অর্থবছর শুরু", "Fiscal year starts")}</label>
                  <NumberField step="1" value={form.startYear} onChange={(v) => set({ startYear: v })} />
                  <div className="section-hint mt-1">{fy}</div>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Opening Balance</label>
                  <NumberField
                    value={form.openingBalance}
                    onChange={(v) => set({ openingBalance: v })}
                    placeholder="4631974.24"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* --- slabs --- */}
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <span>
                <i className="bi bi-bar-chart-steps me-2" />
                {t("স্ল্যাব রেট (ওপেনিং ব্যালেন্সের উপর)", "Slab rates (on the opening balance)")}
              </span>
              {!readOnly && (
                <button type="button" className="btn btn-sm btn-outline-secondary" onClick={addSlab}>
                  <i className="bi bi-plus-lg" /> {t("ধাপ যোগ", "Add band")}
                </button>
              )}
            </div>
            <div className="card-body">
              <p className="section-hint mb-3">
                {t(
                  "প্রতিটি ধাপে কত টাকা পড়বে আর তার রেট কত, সেটা লিখুন। শেষ ধাপটা সবসময় “বাকি যা আছে” — তার পরিমাণ লাগে না।",
                  "Enter how much falls in each band and its rate. The last band is always “the rest” — it needs no amount."
                )}
              </p>
              <div className="table-responsive">
                <table className="table table-sm table-tight align-middle mb-0">
                  <thead>
                    <tr>
                      <th style={{ width: "42%" }}>{t("ধাপের পরিমাণ", "Band size")}</th>
                      <th style={{ width: "22%" }} className="num">
                        {t("রেট %", "Rate %")}
                      </th>
                      <th className="num">{t("এই ধাপে পড়ছে", "In this band")}</th>
                      <th style={{ width: 44 }} />
                    </tr>
                  </thead>
                  <tbody>
                    {form.slabs.map((s, i) => {
                      const isLast = i === form.slabs.length - 1;
                      const line = result.slabLines[i];
                      return (
                        <tr key={i}>
                          <td>
                            {isLast ? (
                              <span className="badge text-bg-secondary">{t("বাকি যা আছে", "The rest")}</span>
                            ) : (
                              <NumberField
                                aria-label={t(`স্ল্যাব ${i + 1} — ধাপের পরিমাণ`, `Slab ${i + 1} — band size`)}
                                step="1"
                                value={s.upTo ?? ""}
                                onChange={(v) => setSlab(i, "upTo", v)}
                                placeholder="1500000"
                              />
                            )}
                          </td>
                          <td>
                            <NumberField
                              aria-label={t(`স্ল্যাব ${i + 1} — রেট %`, `Slab ${i + 1} — rate %`)}
                              step="0.01"
                              value={s.rate}
                              onChange={(v) => setSlab(i, "rate", v)}
                            />
                          </td>
                          <td className="num small">
                            {line ? fmt(line.amount) : "—"}
                            <div className="text-muted">{line ? fmt(line.interest) : ""}</div>
                          </td>
                          <td>
                            {!readOnly && (
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                aria-label={t("ধাপ বাদ দিন", "Remove band")}
                                disabled={form.slabs.length <= 1}
                                onClick={() => removeSlab(i)}
                              >
                                <i className="bi bi-x-lg" />
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* --- deposit rate --- */}
          <div className="card">
            <div className="card-header">
              <i className="bi bi-percent me-2" />
              {t("মাসিক চাঁদার প্রফিট রেট", "Profit rate on monthly subscriptions")}
            </div>
            <div className="card-body">
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  id="rate-auto"
                  checked={form.rateMode === RateModes.TOP_SLAB}
                  onChange={() => set({ rateMode: RateModes.TOP_SLAB })}
                />
                <label className="form-check-label" htmlFor="rate-auto">
                  {t("স্বয়ংক্রিয় — সর্বোচ্চ স্ল্যাব রেট", "Automatic — top slab rate")}{" "}
                  <span className="badge text-bg-success">{result.autoRate}%</span>
                  <div className="section-hint">
                    {t(
                      "ব্যালেন্স যে ধাপে গিয়ে ঠেকেছে, নতুন টাকা সেই রেটেই বসে। আপনার রিপোর্ট এটাই ব্যবহার করে।",
                      "New money earns the rate of the band the balance has reached. This is what the statement uses."
                    )}
                  </div>
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="rate-custom"
                  checked={form.rateMode === RateModes.CUSTOM}
                  onChange={() => set({ rateMode: RateModes.CUSTOM })}
                />
                <label className="form-check-label w-100" htmlFor="rate-custom">
                  {t("নিজে রেট লিখব", "Enter my own rate")}
                  <div className="section-hint">
                    {t(
                      "ফান্ড যদি চাঁদার জন্য আলাদা রেট দেয় (যেমন ৮.৫%), এখানে লিখুন।",
                      "If your fund pays a separate rate on subscriptions (e.g. 8.5%), enter it here."
                    )}
                  </div>
                </label>
              </div>
              {form.rateMode === RateModes.CUSTOM && (
                <div className="mt-2" style={{ maxWidth: 200 }}>
                  <div className="input-group">
                    <NumberField
                      aria-label={t("চাঁদার রেট", "Subscription rate")}
                      value={form.depositRate}
                      onChange={(v) => set({ depositRate: v })}
                      placeholder="8.5"
                    />
                    <span className="input-group-text">%</span>
                  </div>
                </div>
              )}

              <hr />

              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label" htmlFor="deposit-method">
                    {t("প্রফিট ছড়ানোর পদ্ধতি", "How profit is spread")}
                  </label>
                  <select
                    id="deposit-method"
                    className="form-select"
                    value={form.depositMethod}
                    onChange={(e) => set({ depositMethod: e.target.value })}
                  >
                    {Object.values(DepositMethods).map((m) => (
                      <option key={m} value={m}>
                        {methodLabels[m]}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="rounding">
                    {t("পয়সার নিয়ম", "Paisa rule")}
                  </label>
                  <select
                    id="rounding"
                    className="form-select"
                    value={form.rounding}
                    onChange={(e) => set({ rounding: e.target.value })}
                  >
                    {Object.values(Rounding).map((m) => (
                      <option key={m} value={m}>
                        {roundingLabels[m]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* --- months --- */}
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-2">
              <span>
                <i className="bi bi-calendar3 me-2" />
                {t("মাসিক এন্ট্রি", "Monthly entries")}
              </span>
              {!readOnly && (
                <div className="input-group input-group-sm" style={{ maxWidth: 280 }}>
                  <input
                    type="number"
                    aria-label={t("সব মাসে একই চাঁদা", "Same subscription every month")}
                    className="form-control num"
                    value={bulk}
                    onChange={(e) => setBulk(e.target.value)}
                    placeholder={t("সব মাসে একই চাঁদা", "Same every month")}
                  />
                  <button type="button" className="btn btn-outline-secondary" onClick={applyBulk}>
                    {t("বসান", "Fill")}
                  </button>
                </div>
              )}
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-sm table-tight align-middle mb-0">
                  <thead>
                    <tr>
                      <th>{t("মাস", "Month")}</th>
                      <th className="num">{t("চাঁদা", "Subscription")}</th>
                      <th className="num">{t("রিফান্ড", "Refund")}</th>
                      <th className="num">{t("উত্তোলন", "Withdrawal")}</th>
                      <th className="num" style={{ width: 70 }}>
                        {t("মাস", "Months")}
                      </th>
                      <th className="num">{t("প্রফিট", "Profit")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {FISCAL_MONTHS.map((m) => (
                      <tr key={m.index}>
                        <td className="text-nowrap">{monthName(m, lang)}</td>
                        <td>
                          <NumberField
                            aria-label={`${monthName(m, lang)} — ${t("চাঁদা", "subscription")}`}
                            value={form.months[m.index]?.subscription}
                            onChange={(v) => setMonth(m.index, "subscription", v)}
                          />
                        </td>
                        <td>
                          <NumberField
                            aria-label={`${monthName(m, lang)} — ${t("রিফান্ড", "refund")}`}
                            value={form.months[m.index]?.refund}
                            onChange={(v) => setMonth(m.index, "refund", v)}
                          />
                        </td>
                        <td>
                          <NumberField
                            aria-label={`${monthName(m, lang)} — ${t("উত্তোলন", "withdrawal")}`}
                            value={form.months[m.index]?.withdrawal}
                            onChange={(v) => setMonth(m.index, "withdrawal", v)}
                          />
                        </td>
                        <td className="num text-muted">{result.rows[m.index].held}</td>
                        <td className="num">{fmt(result.rows[m.index].netInterest)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="table-light fw-bold">
                    <tr>
                      <td>{t("মোট", "Total")}</td>
                      <td className="num">{fmt(result.totalSubscription)}</td>
                      <td className="num">{fmt(result.totalRefund)}</td>
                      <td className="num">{fmt(result.totalWithdrawal)}</td>
                      <td />
                      <td className="num">{fmt(result.depositInterest)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          {/* --- reconcile --- */}
          <div className="card">
            <div className="card-header">
              <i className="bi bi-clipboard-check me-2" />
              {t("রিপোর্টের সাথে মিলিয়ে দেখুন", "Check against the statement")}{" "}
              <span className="text-muted fw-normal">({t("ঐচ্ছিক", "optional")})</span>
            </div>
            <div className="card-body">
              <p className="section-hint mb-3">
                {t(
                  "অফিসিয়াল স্টেটমেন্টে যা ছাপা আছে সেটা লিখুন — অ্যাপ মিলিয়ে দেখাবে, আর না মিললে ফান্ড আসলে কোন রেট ব্যবহার করেছে সেটা বের করে দেবে।",
                  "Enter what the official statement shows — the app compares them and, if they differ, works out the rate the fund actually used."
                )}
              </p>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Profit for the year</label>
                  <NumberField
                    aria-label={t("রিপোর্টের Profit for the year", "Statement's Profit for the year")}
                    value={form.reportedProfit}
                    onChange={(v) => set({ reportedProfit: v })}
                    placeholder="561826.66"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Closing Balance</label>
                  <NumberField
                    aria-label={t("রিপোর্টের Closing Balance", "Statement's Closing Balance")}
                    value={form.reportedClosing}
                    onChange={(v) => set({ reportedClosing: v })}
                    placeholder="5316900.90"
                  />
                </div>
              </div>

              {profitDiff !== null && (
                <div className={`alert mt-3 mb-0 ${Math.abs(profitDiff) < 0.005 ? "alert-success" : "alert-warning"}`}>
                  {Math.abs(profitDiff) < 0.005 ? (
                    <>
                      <i className="bi bi-check-circle-fill me-1" />
                      <strong>{t("হুবহু মিলেছে।", "Exact match.")}</strong>{" "}
                      {t(
                        `হিসাব ${fmt(result.profit)}, রিপোর্টও ${fmt(reported)}।`,
                        `Calculated ${fmt(result.profit)}, statement ${fmt(reported)}.`
                      )}
                    </>
                  ) : (
                    <>
                      <i className="bi bi-exclamation-triangle-fill me-1" />
                      <strong>
                        {t(`পার্থক্য ${fmt(Math.abs(profitDiff))} টাকা`, `Difference of ${fmt(Math.abs(profitDiff))} taka`)}
                      </strong>{" "}
                      —{" "}
                      {t(
                        `হিসাব ${fmt(result.profit)}, রিপোর্ট ${fmt(reported)}।`,
                        `calculated ${fmt(result.profit)}, statement ${fmt(reported)}.`
                      )}
                      {solved && (
                        <div className="mt-2">
                          {t("রিপোর্টের অঙ্ক মেলাতে হলে চাঁদার রেট হওয়া উচিত", "To match the statement, the subscription rate should be")}{" "}
                          <span className="badge text-bg-dark">{solved.rate.toFixed(4)}%</span>{" "}
                          {!readOnly && (
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-dark ms-2"
                              onClick={() =>
                                set({
                                  rateMode: RateModes.CUSTOM,
                                  depositRate: solved.rate.toFixed(4),
                                })
                              }
                            >
                              {t("এই রেট বসান", "Use this rate")}
                            </button>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <label className="form-label" htmlFor="note">
                {t("নোট", "Note")}
              </label>
              <textarea
                id="note"
                className="form-control"
                rows={2}
                value={form.note}
                onChange={(e) => set({ note: e.target.value })}
                placeholder={t("এ বছরের ব্যাপারে কিছু মনে রাখার থাকলে...", "Anything to remember about this year...")}
              />
            </div>
          </div>
        </fieldset>
      </div>

      {/* ================= RIGHT: result ================= */}
      <div className="col-lg-5">
        <div className="result-panel d-flex flex-column gap-3">
          <div className="card border-success">
            <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
              <span>
                <i className="bi bi-cash-stack me-2" />
                {t("বছর সমাপনী ফলাফল", "Year-end result")}
              </span>
              <span className="badge bg-white text-success fs-6">{fyShort}</span>
            </div>
            <div className="card-body">
              <div className="text-muted small">Closing Balance</div>
              <div className="result-big text-success">{fmt(result.closingBalance)}</div>
              <div className="section-hint mb-3">{t(`${fy} অর্থবছর শেষে`, `At the end of ${fy}`)}</div>

              <div className="result-line">
                <span className="label">Opening Balance</span>
                <span className="value">{fmt(result.openingBalance)}</span>
              </div>
              <div className="result-line">
                <span className="label">+ Subscription</span>
                <span className="value">{fmt(result.totalSubscription)}</span>
              </div>
              <div className="result-line">
                <span className="label">+ Refund</span>
                <span className="value">{fmt(result.totalRefund)}</span>
              </div>
              <div className="result-line">
                <span className="label">− Withdrawal(s)</span>
                <span className="value">{fmt(result.totalWithdrawal)}</span>
              </div>
              <div className="result-line">
                <span className="label">
                  + Profit for the year
                  <div className="text-muted" style={{ fontSize: ".78rem" }}>
                    {fmt(result.openingInterest)} + {fmt(result.depositInterest)}
                  </div>
                </span>
                <span className="value text-success">{fmt(result.profit)}</span>
              </div>

              <div className="d-grid gap-2 mt-3 no-print">
                {!readOnly && (
                  <button className="btn btn-brand" onClick={save} disabled={saving}>
                    <i className="bi bi-save me-1" />
                    {saving
                      ? t("সংরক্ষণ হচ্ছে...", "Saving...")
                      : yearId
                        ? t("আপডেট করুন", "Update")
                        : t("সংরক্ষণ করুন", "Save")}
                  </button>
                )}
                <div className="d-flex gap-2">
                  <button className="btn btn-outline-secondary flex-fill" onClick={() => window.print()}>
                    <i className="bi bi-printer me-1" />
                    {t("প্রিন্ট", "Print")}
                  </button>
                  {!readOnly && (
                    <button className="btn btn-outline-primary flex-fill" onClick={carryForward}>
                      <i className="bi bi-arrow-right-circle me-1" />
                      {t("পরের বছর", "Next year")}
                    </button>
                  )}
                </div>
                {yearId && !readOnly && (
                  <button className="btn btn-outline-danger btn-sm" onClick={remove}>
                    <i className="bi bi-trash me-1" />
                    {t("মুছে ফেলুন", "Delete")}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="card no-print">
            <div className="card-header d-flex justify-content-between align-items-center">
              <span>
                <i className="bi bi-shuffle me-2" />
                {t("পদ্ধতি তুলনা", "Compare methods")}
              </span>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setShowCompare((v) => !v)}
              >
                {showCompare ? t("লুকান", "Hide") : t("দেখান", "Show")}
              </button>
            </div>
            {showCompare && (
              <div className="card-body">
                <p className="section-hint">
                  {t(
                    "একই ডেটা তিন পদ্ধতিতে চালালে প্রফিট কেমন দাঁড়ায় — কোনটা আপনার রিপোর্টের সাথে মেলে বুঝতে সুবিধা হবে।",
                    "The same data run three ways — helps you see which one matches your statement."
                  )}
                </p>
                <table className="table table-sm table-tight mb-0">
                  <thead>
                    <tr>
                      <th>{t("পদ্ধতি", "Method")}</th>
                      <th className="num">{t("জমার প্রফিট", "Deposit profit")}</th>
                      <th className="num">{t("মোট প্রফিট", "Total profit")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((c) => (
                      <tr key={c.method} className={c.method === form.depositMethod ? "table-success" : ""}>
                        <td className="small">{methodLabels[c.method]}</td>
                        <td className="num">{fmt(c.depositInterest)}</td>
                        <td className="num">{fmt(c.profit)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= FULL-WIDTH: explanation (collapsed) ================= */}
      <div className="col-12">
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm no-print"
          onClick={() => setShowDetails((v) => !v)}
        >
          <i className={`bi bi-chevron-${showDetails ? "up" : "down"} me-1`} />
          {t("হিসাবটা কীভাবে হলো", "How was this calculated")} —{" "}
          {showDetails ? t("লুকান", "hide") : t("বিস্তারিত দেখুন", "show details")}
        </button>
        {showDetails && (
          <div className="mt-3">
            <Breakdown result={result} />
          </div>
        )}
      </div>
    </div>
  );
}
