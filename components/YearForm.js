"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import NumberField from "@/components/NumberField";
import Breakdown from "@/components/Breakdown";
import { calculateYear, solveDepositRate, compareMethods, fmt } from "@/lib/calc";
import { normalizeYear } from "@/lib/payload";
import {
  FISCAL_MONTHS,
  DEFAULT_SLABS,
  RateModes,
  DepositMethods,
  DepositMethodLabels,
  Rounding,
  RoundingLabels,
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

export default function YearForm({ initial, yearId }) {
  const router = useRouter();
  const [form, setForm] = useState(() => initial || blankYear());
  const [saving, setSaving] = useState(false);
  const [bulk, setBulk] = useState("");
  const [showCompare, setShowCompare] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

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
    if (bulk === "") return toast.warn("আগে একটা পরিমাণ লিখুন");
    setForm((f) => ({ ...f, months: f.months.map((m) => ({ ...m, subscription: bulk })) }));
    toast.success("১২ মাসেই বসানো হয়েছে");
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
        toast.error(json.message || "সংরক্ষণ করা যায়নি");
        return;
      }
      toast.success(json.message || "সংরক্ষিত হয়েছে");
      if (!yearId) router.push(`/year/${json.data._id}`);
      else router.refresh();
    } catch (e) {
      toast.error(e.message || "সংরক্ষণ করা যায়নি");
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    const ok = await Swal.fire({
      title: "মুছে ফেলবেন?",
      text: "এই বছরের হিসাবটি স্থায়ীভাবে মুছে যাবে।",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "হ্যাঁ, মুছুন",
      cancelButtonText: "না",
      confirmButtonColor: "#dc3545",
    });
    if (!ok.isConfirmed) return;

    const res = await fetch(`/api/years/${yearId}`, { method: "DELETE" });
    const json = await res.json();
    if (!res.ok) return toast.error(json.message || "মুছে ফেলা যায়নি");
    toast.success(json.message);
    router.push("/");
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
    router.push("/year/new?carry=1");
  };

  const fy = `জুলাই ${form.startYear} – জুন ${Number(form.startYear) + 1}`;
  const fyShort = `${form.startYear}–${Number(form.startYear) + 1}`;

  return (
    <div className="row g-4">
      {/* ================= LEFT: inputs ================= */}
      <div className="col-lg-7">
        <div className="d-flex flex-column gap-3">
          {/* --- basics --- */}
          <div className="card">
            <div className="card-header">
              <i className="bi bi-person-badge me-2" />
              বছরের তথ্য
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">গ্রাহকের নাম</label>
                  <input
                    className="form-control"
                    value={form.subscriber}
                    onChange={(e) => set({ subscriber: e.target.value })}
                    placeholder="Name of Subscriber"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">অ্যাকাউন্ট নং</label>
                  <input
                    className="form-control"
                    value={form.accountNo}
                    onChange={(e) => set({ accountNo: e.target.value })}
                    placeholder="ঐচ্ছিক"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">অর্থবছর শুরু</label>
                  <NumberField
                    step="1"
                    value={form.startYear}
                    onChange={(v) => set({ startYear: v })}
                  />
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
                স্ল্যাব রেট (ওপেনিং ব্যালেন্সের উপর)
              </span>
              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={addSlab}>
                <i className="bi bi-plus-lg" /> ধাপ যোগ
              </button>
            </div>
            <div className="card-body">
              <p className="section-hint mb-3">
                প্রতিটি ধাপে <strong>কত টাকা</strong> পড়বে আর তার রেট কত, সেটা লিখুন। শেষ ধাপটা
                সবসময় &quot;বাকি যা আছে&quot; — তার পরিমাণ লাগে না।
              </p>
              <div className="table-responsive">
                <table className="table table-sm table-tight align-middle mb-0">
                  <thead>
                    <tr>
                      <th style={{ width: "42%" }}>ধাপের পরিমাণ</th>
                      <th style={{ width: "22%" }} className="num">
                        রেট %
                      </th>
                      <th className="num">এই ধাপে পড়ছে</th>
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
                              <span className="badge text-bg-secondary">বাকি যা আছে</span>
                            ) : (
                              <NumberField
                                aria-label={`স্ল্যাব ${i + 1} — ধাপের পরিমাণ`}
                                step="1"
                                value={s.upTo ?? ""}
                                onChange={(v) => setSlab(i, "upTo", v)}
                                placeholder="1500000"
                              />
                            )}
                          </td>
                          <td>
                            <NumberField
                              aria-label={`স্ল্যাব ${i + 1} — রেট %`}
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
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              disabled={form.slabs.length <= 1}
                              onClick={() => removeSlab(i)}
                            >
                              <i className="bi bi-x-lg" />
                            </button>
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
              মাসিক চাঁদার প্রফিট রেট
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
                  স্বয়ংক্রিয় — সর্বোচ্চ স্ল্যাব রেট{" "}
                  <span className="badge text-bg-success">{result.autoRate}%</span>
                  <div className="section-hint">
                    ব্যালেন্স যে ধাপে গিয়ে ঠেকেছে, নতুন টাকা সেই রেটেই বসে। আপনার রিপোর্ট এটাই
                    ব্যবহার করে।
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
                  নিজে রেট লিখব
                  <div className="section-hint">
                    ফান্ড যদি চাঁদার জন্য আলাদা রেট দেয় (যেমন ৮.৫%), এখানে লিখুন।
                  </div>
                </label>
              </div>
              {form.rateMode === RateModes.CUSTOM && (
                <div className="mt-2" style={{ maxWidth: 200 }}>
                  <div className="input-group">
                    <NumberField
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
                  <label className="form-label">প্রফিট ছড়ানোর পদ্ধতি</label>
                  <select
                    className="form-select"
                    value={form.depositMethod}
                    onChange={(e) => set({ depositMethod: e.target.value })}
                  >
                    {Object.values(DepositMethods).map((m) => (
                      <option key={m} value={m}>
                        {DepositMethodLabels[m]}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">পয়সার নিয়ম</label>
                  <select
                    className="form-select"
                    value={form.rounding}
                    onChange={(e) => set({ rounding: e.target.value })}
                  >
                    {Object.values(Rounding).map((m) => (
                      <option key={m} value={m}>
                        {RoundingLabels[m]}
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
                মাসিক এন্ট্রি
              </span>
              <div className="input-group input-group-sm" style={{ maxWidth: 280 }}>
                <input
                  type="number"
                  aria-label="সব মাসে একই চাঁদা"
                  className="form-control num"
                  value={bulk}
                  onChange={(e) => setBulk(e.target.value)}
                  placeholder="সব মাসে একই চাঁদা"
                />
                <button type="button" className="btn btn-outline-secondary" onClick={applyBulk}>
                  বসান
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-sm table-tight align-middle mb-0">
                  <thead>
                    <tr>
                      <th>মাস</th>
                      <th className="num">চাঁদা</th>
                      <th className="num">রিফান্ড</th>
                      <th className="num">উত্তোলন</th>
                      <th className="num" style={{ width: 70 }}>
                        মাস
                      </th>
                      <th className="num">প্রফিট</th>
                    </tr>
                  </thead>
                  <tbody>
                    {FISCAL_MONTHS.map((m) => (
                      <tr key={m.index}>
                        <td className="text-nowrap">{m.bn}</td>
                        <td>
                          <NumberField
                            aria-label={`${m.bn} — চাঁদা`}
                            value={form.months[m.index]?.subscription}
                            onChange={(v) => setMonth(m.index, "subscription", v)}
                          />
                        </td>
                        <td>
                          <NumberField
                            aria-label={`${m.bn} — রিফান্ড`}
                            value={form.months[m.index]?.refund}
                            onChange={(v) => setMonth(m.index, "refund", v)}
                          />
                        </td>
                        <td>
                          <NumberField
                            aria-label={`${m.bn} — উত্তোলন`}
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
                      <td>মোট</td>
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
              রিপোর্টের সাথে মিলিয়ে দেখুন <span className="text-muted fw-normal">(ঐচ্ছিক)</span>
            </div>
            <div className="card-body">
              <p className="section-hint mb-3">
                অফিসিয়াল স্টেটমেন্টে যা ছাপা আছে সেটা লিখুন — অ্যাপ মিলিয়ে দেখাবে, আর না মিললে
                ফান্ড আসলে <strong>কোন রেট</strong> ব্যবহার করেছে সেটা বের করে দেবে।
              </p>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Profit for the year</label>
                  <NumberField
                    aria-label="রিপোর্টের Profit for the year"
                    value={form.reportedProfit}
                    onChange={(v) => set({ reportedProfit: v })}
                    placeholder="561826.66"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Closing Balance</label>
                  <NumberField
                    aria-label="রিপোর্টের Closing Balance"
                    value={form.reportedClosing}
                    onChange={(v) => set({ reportedClosing: v })}
                    placeholder="5316900.90"
                  />
                </div>
              </div>

              {profitDiff !== null && (
                <div
                  className={`alert mt-3 mb-0 ${
                    Math.abs(profitDiff) < 0.005 ? "alert-success" : "alert-warning"
                  }`}
                >
                  {Math.abs(profitDiff) < 0.005 ? (
                    <>
                      <i className="bi bi-check-circle-fill me-1" />
                      <strong>হুবহু মিলেছে।</strong> হিসাব {fmt(result.profit)}, রিপোর্টও{" "}
                      {fmt(reported)}।
                    </>
                  ) : (
                    <>
                      <i className="bi bi-exclamation-triangle-fill me-1" />
                      <strong>পার্থক্য {fmt(Math.abs(profitDiff))} টাকা</strong> — হিসাব{" "}
                      {fmt(result.profit)}, রিপোর্ট {fmt(reported)}।
                      {solved && (
                        <div className="mt-2">
                          রিপোর্টের অঙ্ক মেলাতে হলে চাঁদার রেট হওয়া উচিত{" "}
                          <span className="badge text-bg-dark">{solved.rate.toFixed(4)}%</span>{" "}
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
                            এই রেট বসান
                          </button>
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
              <label className="form-label">নোট</label>
              <textarea
                className="form-control"
                rows={2}
                value={form.note}
                onChange={(e) => set({ note: e.target.value })}
                placeholder="এ বছরের ব্যাপারে কিছু মনে রাখার থাকলে..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* ================= RIGHT: result ================= */}
      <div className="col-lg-5">
        <div className="result-panel d-flex flex-column gap-3">
          <div className="card border-success">
            <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
              <span>
                <i className="bi bi-cash-stack me-2" />
                বছর সমাপনী ফলাফল
              </span>
              <span className="badge bg-white text-success fs-6">{fyShort}</span>
            </div>
            <div className="card-body">
              <div className="text-muted small">Closing Balance</div>
              <div className="result-big text-success">{fmt(result.closingBalance)}</div>
              <div className="section-hint mb-3">{fy} অর্থবছর শেষে</div>

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
                <button className="btn btn-brand" onClick={save} disabled={saving}>
                  <i className="bi bi-save me-1" />
                  {saving ? "সংরক্ষণ হচ্ছে..." : yearId ? "আপডেট করুন" : "সংরক্ষণ করুন"}
                </button>
                <div className="d-flex gap-2">
                  <button className="btn btn-outline-secondary flex-fill" onClick={() => window.print()}>
                    <i className="bi bi-printer me-1" />
                    প্রিন্ট
                  </button>
                  <button className="btn btn-outline-primary flex-fill" onClick={carryForward}>
                    <i className="bi bi-arrow-right-circle me-1" />
                    পরের বছর
                  </button>
                </div>
                {yearId && (
                  <button className="btn btn-outline-danger btn-sm" onClick={remove}>
                    <i className="bi bi-trash me-1" />
                    মুছে ফেলুন
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="card no-print">
            <div className="card-header d-flex justify-content-between align-items-center">
              <span>
                <i className="bi bi-shuffle me-2" />
                পদ্ধতি তুলনা
              </span>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setShowCompare((v) => !v)}
              >
                {showCompare ? "লুকান" : "দেখান"}
              </button>
            </div>
            {showCompare && (
              <div className="card-body">
                <p className="section-hint">
                  একই ডেটা তিন পদ্ধতিতে চালালে প্রফিট কেমন দাঁড়ায় — কোনটা আপনার রিপোর্টের সাথে
                  মেলে বুঝতে সুবিধা হবে।
                </p>
                <table className="table table-sm table-tight mb-0">
                  <thead>
                    <tr>
                      <th>পদ্ধতি</th>
                      <th className="num">জমার প্রফিট</th>
                      <th className="num">মোট প্রফিট</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((c) => (
                      <tr
                        key={c.method}
                        className={c.method === form.depositMethod ? "table-success" : ""}
                      >
                        <td className="small">{DepositMethodLabels[c.method]}</td>
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
          হিসাবটা কীভাবে হলো — {showDetails ? "লুকান" : "বিস্তারিত দেখুন"}
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
