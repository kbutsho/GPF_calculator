// Language helpers shared by server and client code (no next/headers here).
//
// Bangla is the default and lives at the bare URL (/features); English lives
// under an /en prefix (/en/features). proxy.js rewrites /en/* onto the same
// page files and tells them which language to render through a request header.
// Dashboard/admin pages have no prefix — they follow their own app cookie.
export const LANGS = ["bn", "en"];
export const DEFAULT_LANG = "bn";
// Two independent choices: the public site and the private app (dashboard/admin)
// each remember their own language, so switching one never changes the other.
export const LANG_COOKIE = "gpf_lang";
export const APP_LANG_COOKIE = "gpf_app_lang";
export const LANG_HEADER = "x-gpf-lang";

export const normalizeLang = (value) => (value === "en" ? "en" : "bn");

/** `t("বাংলা", "English")` — picks the string for the active language. */
export const tr = (lang) => (bn, en) => (lang === "en" ? en : bn);

/** Public path for a language: ("/faq", "en") -> "/en/faq". */
export function localePath(path, lang) {
  if (lang !== "en") return path;
  return path === "/" ? "/en" : `/en${path}`;
}

/** "/en/faq" -> "/faq", "/en" -> "/". Leaves Bangla paths untouched. */
export function stripLocale(pathname) {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3);
  return pathname;
}

/** Private areas never get an /en prefix. */
export const isPrivatePath = (pathname) => /^\/(dashboard|admin)(\/|$)/.test(pathname);

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
export const toBnDigits = (value) => String(value).replace(/\d/g, (d) => BN_DIGITS[d]);

/** Numbers in the reader's script: Bangla digits for bn, plain digits for en. */
export const localNum = (value, lang) => (lang === "en" ? String(value) : toBnDigits(value));

/** Money with lakh/crore grouping, in the reader's digits. */
export function localMoney(value, lang, decimals = 2) {
  const s = Number(value || 0).toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return localNum(s, lang);
}

/** Month name for a fiscal-month row from lib/constants FISCAL_MONTHS. */
export const monthName = (m, lang) => (lang === "en" ? m.en : m.bn);
