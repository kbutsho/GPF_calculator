import { calculateYear } from "@/lib/calc";
import { normalizeYear } from "@/lib/payload";

// An illustrative (made-up) member used on the public pages. Running it through
// the real engine keeps every number on the marketing pages honest.
export const SAMPLE_INPUT = {
  subscriber: "উদাহরণ গ্রাহক",
  startYear: 2025,
  openingBalance: 2800000,
  months: Array.from({ length: 12 }, (_, index) => ({ index, subscription: 12000 })),
};

export function sampleResult() {
  return calculateYear(normalizeYear(SAMPLE_INPUT));
}
