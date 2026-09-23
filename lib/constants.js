// Fiscal year runs July -> June. Index 0 is July, index 11 is June.
// monthsHeld = 12 - index, i.e. July money sits all 12 months, June money 1 month.
export const FISCAL_MONTHS = [
  { index: 0, key: "jul", en: "July", bn: "জুলাই" },
  { index: 1, key: "aug", en: "August", bn: "আগস্ট" },
  { index: 2, key: "sep", en: "September", bn: "সেপ্টেম্বর" },
  { index: 3, key: "oct", en: "October", bn: "অক্টোবর" },
  { index: 4, key: "nov", en: "November", bn: "নভেম্বর" },
  { index: 5, key: "dec", en: "December", bn: "ডিসেম্বর" },
  { index: 6, key: "jan", en: "January", bn: "জানুয়ারি" },
  { index: 7, key: "feb", en: "February", bn: "ফেব্রুয়ারি" },
  { index: 8, key: "mar", en: "March", bn: "মার্চ" },
  { index: 9, key: "apr", en: "April", bn: "এপ্রিল" },
  { index: 10, key: "may", en: "May", bn: "মে" },
  { index: 11, key: "jun", en: "June", bn: "জুন" },
];

// Slab rates the fund applies to the opening balance. `upTo` is the SIZE of the
// band, not a cumulative ceiling. A null `upTo` means "everything left over".
export const DEFAULT_SLABS = [
  { upTo: 1500000, rate: 13 },
  { upTo: 1500000, rate: 12 },
  { upTo: null, rate: 11 },
];

// How the rate for this year's deposits is picked.
export const RateModes = {
  TOP_SLAB: "TOP_SLAB", // marginal slab the opening balance lands in
  CUSTOM: "CUSTOM",     // a rate the user types in (e.g. 8.5)
};

// How deposit profit is spread over the year.
export const DepositMethods = {
  MONTHWISE: "MONTHWISE", // amount x rate x monthsHeld / 12  -- what the report does
  FLAT: "FLAT",           // amount x rate, full year for every month
  HALF_YEAR: "HALF_YEAR", // amount x rate x 6/12
};

// The report drops the fraction after two decimals instead of rounding it.
export const Rounding = {
  TRUNCATE: "TRUNCATE",
  ROUND: "ROUND",
};

export const DepositMethodLabels = {
  [DepositMethods.MONTHWISE]: "মাস অনুপাতে (রিপোর্টের নিয়ম)",
  [DepositMethods.FLAT]: "ফ্ল্যাট — পুরো বছরের রেট",
  [DepositMethods.HALF_YEAR]: "অর্ধ-বছর (৬ মাস)",
};

export const RoundingLabels = {
  [Rounding.TRUNCATE]: "ট্রাংকেট — পয়সার পর ফেলে দেয় (রিপোর্টের নিয়ম)",
  [Rounding.ROUND]: "রাউন্ড — কাছের পয়সায় নেয়",
};
