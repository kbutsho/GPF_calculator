import {
  FISCAL_MONTHS,
  DEFAULT_SLABS,
  RateModes,
  DepositMethods,
  Rounding,
} from "@/lib/constants";

const n = (v) => {
  const x = typeof v === "number" ? v : parseFloat(v);
  return Number.isFinite(x) ? x : 0;
};

/** Money is kept full-precision while calculating and only cut at the end. */
export function money(value, mode = Rounding.TRUNCATE) {
  const v = n(value);
  // Nudge past float noise (179517.16639999998) before cutting the tail off.
  const scaled = parseFloat((v * 100).toPrecision(15));
  const cut = mode === Rounding.ROUND ? Math.round(scaled) : Math.trunc(scaled);
  return cut / 100;
}

/** Display helper: always rounds, so the printed lines add up to the total. */
export const show = (value) => money(value, Rounding.ROUND);

export const fmt = (value, decimals = 2) =>
  n(value).toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

/**
 * Split the opening balance across the slab bands and charge each band its own
 * rate. `upTo` is a band size; the last band (upTo = null) absorbs the rest.
 */
export function splitSlabs(openingBalance, slabs = DEFAULT_SLABS) {
  let left = n(openingBalance);
  const lines = [];

  slabs.forEach((slab, i) => {
    // An open-ended band (upTo null/blank) absorbs whatever is left over.
    const openEnded = slab.upTo === null || slab.upTo === undefined || slab.upTo === "";
    const band = openEnded ? null : n(slab.upTo);

    if (left <= 0) {
      lines.push({ order: i + 1, band, amount: 0, rate: n(slab.rate), interest: 0 });
      return;
    }

    const amount = openEnded ? left : Math.min(left, band);
    const interest = (amount * n(slab.rate)) / 100;
    lines.push({ order: i + 1, band, amount, rate: n(slab.rate), interest });
    left -= amount;
  });

  return lines;
}

/** The rate the NEXT taka earns — i.e. the band the opening balance ends in. */
export function marginalRate(openingBalance, slabs = DEFAULT_SLABS) {
  const lines = splitSlabs(openingBalance, slabs);
  const filled = lines.filter((l) => l.amount > 0);
  const last = filled[filled.length - 1] || lines[lines.length - 1];
  // Balance exactly fills a band -> the next taka spills into the following one.
  if (last && last.band !== null && Math.abs(last.amount - last.band) < 0.005) {
    const next = lines[lines.indexOf(last) + 1];
    if (next) return next.rate;
  }
  return last ? last.rate : 0;
}

/** monthsHeld for a fiscal-month index: July (0) -> 12 ... June (11) -> 1. */
export const monthsHeld = (index) => 12 - index;

function methodFactor(method, index) {
  if (method === DepositMethods.FLAT) return 1;
  if (method === DepositMethods.HALF_YEAR) return 6 / 12;
  return monthsHeld(index) / 12;
}

/**
 * Full year-closing calculation.
 *
 * Deposits (subscription + refund) earn profit for the months they actually sat
 * in the fund. Withdrawals do the reverse: the money left early, so the profit
 * it would have earned for the remaining months is taken back.
 */
export function calculateYear(input = {}) {
  const rounding = input.rounding || Rounding.TRUNCATE;
  const slabs = (input.slabs && input.slabs.length ? input.slabs : DEFAULT_SLABS).map((s) => ({
    upTo: s.upTo === null || s.upTo === "" || s.upTo === undefined ? null : n(s.upTo),
    rate: n(s.rate),
  }));
  const openingBalance = n(input.openingBalance);
  const method = input.depositMethod || DepositMethods.MONTHWISE;

  // --- Part 1: profit on the opening balance -------------------------------
  const slabLines = splitSlabs(openingBalance, slabs);
  const openingInterestRaw = slabLines.reduce((sum, l) => sum + l.interest, 0);
  const openingInterest = money(openingInterestRaw, rounding);

  // --- Which rate do this year's deposits earn? ----------------------------
  const autoRate = marginalRate(openingBalance, slabs);
  const rateMode = input.rateMode || RateModes.TOP_SLAB;
  const depositRate = rateMode === RateModes.CUSTOM ? n(input.depositRate) : autoRate;

  // --- Part 2: profit on this year's movements -----------------------------
  const rows = FISCAL_MONTHS.map((m) => {
    const src = (input.months && input.months[m.index]) || {};
    const subscription = n(src.subscription);
    const refund = n(src.refund);
    const withdrawal = n(src.withdrawal);
    const factor = methodFactor(method, m.index);
    const held = monthsHeld(m.index);

    const subscriptionInterest = (subscription * depositRate * factor) / 100;
    const refundInterest = (refund * depositRate * factor) / 100;
    const withdrawalInterest = (withdrawal * depositRate * factor) / 100;

    return {
      ...m,
      subscription,
      refund,
      withdrawal,
      held,
      factor,
      subscriptionInterest,
      refundInterest,
      withdrawalInterest,
      netInterest: subscriptionInterest + refundInterest - withdrawalInterest,
    };
  });

  const totalSubscription = rows.reduce((s, r) => s + r.subscription, 0);
  const totalRefund = rows.reduce((s, r) => s + r.refund, 0);
  const totalWithdrawal = rows.reduce((s, r) => s + r.withdrawal, 0);
  const totalDeposits = totalSubscription + totalRefund;

  const subscriptionInterestRaw = rows.reduce((s, r) => s + r.subscriptionInterest, 0);
  const refundInterestRaw = rows.reduce((s, r) => s + r.refundInterest, 0);
  const withdrawalInterestRaw = rows.reduce((s, r) => s + r.withdrawalInterest, 0);
  const depositInterestRaw = subscriptionInterestRaw + refundInterestRaw - withdrawalInterestRaw;
  const depositInterest = money(depositInterestRaw, rounding);

  // --- Totals --------------------------------------------------------------
  const profit = money(openingInterest + depositInterest, rounding);
  const closingBalance = money(
    openingBalance + totalDeposits - totalWithdrawal + profit,
    rounding
  );

  // Taka-months behind the deposit profit; the rate solver reuses this.
  const takaMonths = rows.reduce(
    (s, r) => s + (r.subscription + r.refund - r.withdrawal) * r.factor * 12,
    0
  );

  return {
    rounding,
    slabs,
    slabLines,
    openingBalance,
    openingInterestRaw,
    openingInterest,
    autoRate,
    rateMode,
    depositRate,
    depositMethod: method,
    rows,
    totalSubscription,
    totalRefund,
    totalWithdrawal,
    totalDeposits,
    subscriptionInterestRaw,
    refundInterestRaw,
    withdrawalInterestRaw,
    depositInterestRaw,
    depositInterest,
    takaMonths,
    effectiveDepositRate: totalDeposits ? (depositInterestRaw / totalDeposits) * 100 : 0,
    profit,
    closingBalance,
  };
}

/**
 * Reverse-engineer the deposit rate from an official statement: given the
 * profit the report printed, work out what rate the fund must have used.
 */
export function solveDepositRate(input, reportedProfit) {
  const base = calculateYear({ ...input, rateMode: RateModes.CUSTOM, depositRate: 0 });
  const needed = n(reportedProfit) - base.openingInterest;
  if (!base.takaMonths) return null;
  const rate = (needed * 12 * 100) / base.takaMonths;
  return {
    openingInterest: base.openingInterest,
    depositInterestNeeded: needed,
    rate,
  };
}

/** Run the same year through every method so the user can compare side by side. */
export function compareMethods(input) {
  return Object.values(DepositMethods).map((method) => {
    const r = calculateYear({ ...input, depositMethod: method });
    return {
      method,
      depositInterest: r.depositInterest,
      profit: r.profit,
      closingBalance: r.closingBalance,
    };
  });
}
