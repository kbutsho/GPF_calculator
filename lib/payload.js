import { FISCAL_MONTHS, DEFAULT_SLABS, RateModes, DepositMethods, Rounding } from "@/lib/constants";

const num = (v, fallback = 0) => {
  if (v === "" || v === null || v === undefined) return fallback;
  const x = parseFloat(v);
  return Number.isFinite(x) ? x : fallback;
};

/** Always hand the calculator a dense 12-slot month array. */
export function normalizeMonths(months) {
  return FISCAL_MONTHS.map((m) => {
    const src = (months || []).find((x) => Number(x?.index) === m.index) || months?.[m.index] || {};
    return {
      index: m.index,
      subscription: num(src.subscription),
      refund: num(src.refund),
      withdrawal: num(src.withdrawal),
    };
  });
}

export function normalizeSlabs(slabs) {
  const list = Array.isArray(slabs) && slabs.length ? slabs : DEFAULT_SLABS;
  return list.map((s, i) => ({
    upTo: i === list.length - 1 || s.upTo === null || s.upTo === "" ? null : num(s.upTo, null),
    rate: num(s.rate),
  }));
}

/** Shared shape for both the API and the client form. */
export function normalizeYear(body = {}) {
  return {
    subscriber: (body.subscriber || "").trim(),
    accountNo: (body.accountNo || "").trim(),
    startYear: num(body.startYear, new Date().getFullYear()),
    openingBalance: num(body.openingBalance),
    slabs: normalizeSlabs(body.slabs),
    rateMode: Object.values(RateModes).includes(body.rateMode) ? body.rateMode : RateModes.TOP_SLAB,
    depositRate: num(body.depositRate),
    depositMethod: Object.values(DepositMethods).includes(body.depositMethod)
      ? body.depositMethod
      : DepositMethods.MONTHWISE,
    rounding: Object.values(Rounding).includes(body.rounding) ? body.rounding : Rounding.TRUNCATE,
    months: normalizeMonths(body.months),
    reportedProfit: body.reportedProfit === "" || body.reportedProfit === null || body.reportedProfit === undefined ? null : num(body.reportedProfit, null),
    reportedClosing: body.reportedClosing === "" || body.reportedClosing === null || body.reportedClosing === undefined ? null : num(body.reportedClosing, null),
    note: (body.note || "").trim(),
  };
}

/** Inline validation, same spirit as the Laravel side: collect, don't throw. */
export function validateYear(data, lang = "bn") {
  const t = (bn, en) => (lang === "en" ? en : bn);
  const errors = {};
  if (!data.startYear || data.startYear < 1900 || data.startYear > 2200) {
    errors.startYear = t("অর্থবছর ঠিক নেই", "Invalid fiscal year");
  }
  if (data.openingBalance < 0) {
    errors.openingBalance = t("ওপেনিং ব্যালেন্স ঋণাত্মক হতে পারে না", "Opening balance cannot be negative");
  }
  if (!data.slabs.length) {
    errors.slabs = t("অন্তত একটি স্ল্যাব দিন", "Add at least one slab");
  }
  data.slabs.forEach((s, i) => {
    if (s.rate < 0 || s.rate > 100) errors[`slab_${i}`] = t("রেট ০ থেকে ১০০-র মধ্যে হতে হবে", "Rate must be between 0 and 100");
  });
  if (data.rateMode === RateModes.CUSTOM && (data.depositRate < 0 || data.depositRate > 100)) {
    errors.depositRate = t("রেট ০ থেকে ১০০-র মধ্যে হতে হবে", "Rate must be between 0 and 100");
  }
  return errors;
}
