"use client";

import { createContext, useContext, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LANG_COOKIE, APP_LANG_COOKIE, tr, localePath, stripLocale, isPrivatePath } from "@/lib/i18n";

const LangContext = createContext({ lang: "bn", t: tr("bn") });

export function LangProvider({ lang, children }) {
  const value = useMemo(() => ({ lang, t: tr(lang) }), [lang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

/**
 * বাংলা / English toggle. Public pages move to the other URL; private pages
 * re-render in place. Each side stores its choice in its own cookie.
 */
export function LangSwitcher({ className = "", dark = false }) {
  const { lang } = useLang();
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = (next) => {
    if (next === lang) return;
    const bare = stripLocale(pathname);
    const cookie = isPrivatePath(bare) ? APP_LANG_COOKIE : LANG_COOKIE;
    document.cookie = `${cookie}=${next}; Path=/; Max-Age=31536000; SameSite=Lax`;
    if (isPrivatePath(bare)) {
      // refresh() keeps client state, so a half-filled form survives the switch.
      router.refresh();
    } else {
      window.location.assign(localePath(bare, next) + window.location.search);
    }
  };

  const btn = (code, label) => (
    <button
      type="button"
      className={`btn btn-sm ${
        lang === code ? (dark ? "btn-light" : "btn-brand") : dark ? "btn-outline-light" : "btn-outline-secondary"
      }`}
      aria-pressed={lang === code}
      onClick={() => switchTo(code)}
    >
      {label}
    </button>
  );

  return (
    <div className={`btn-group ${className}`} role="group" aria-label="Language / ভাষা">
      {btn("bn", "বাংলা")}
      {btn("en", "EN")}
    </div>
  );
}
