"use client";

import { usePathname } from "next/navigation";
import { useLang } from "@/components/LangProvider";
import { LANG_COOKIE, localePath, stripLocale } from "@/lib/i18n";

/**
 * Real <a hreflang> links to this page's twin (crawlable), which also store the
 * choice first — otherwise the proxy would bounce a Bangla click back to /en.
 */
export default function FooterLangLinks() {
  const { lang } = useLang();
  const bare = stripLocale(usePathname());

  const remember = (code) => () => {
    document.cookie = `${LANG_COOKIE}=${code}; Path=/; Max-Age=31536000; SameSite=Lax`;
  };

  return (
    <span className="footer-lang d-flex gap-2 align-items-center">
      <i className="bi bi-globe2" />
      <a href={localePath(bare, "bn")} hrefLang="bn" lang="bn" onClick={remember("bn")} className={lang === "bn" ? "active" : ""}>
        বাংলা
      </a>
      <span>·</span>
      <a href={localePath(bare, "en")} hrefLang="en" lang="en" onClick={remember("en")} className={lang === "en" ? "active" : ""}>
        English
      </a>
    </span>
  );
}
