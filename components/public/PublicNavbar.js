"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PUBLIC_NAV, SITE } from "@/lib/site";
import { localePath, stripLocale } from "@/lib/i18n";
import { useLang, LangSwitcher } from "@/components/LangProvider";

export default function PublicNavbar({ signedIn, home }) {
  const { lang, t } = useLang();
  const pathname = stripLocale(usePathname());
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const href = (path) => localePath(path, lang);

  return (
    <nav className="navbar navbar-expand-xl public-navbar sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" href={href("/")} onClick={close}>
          <span className="brand-mark">
            <i className="bi bi-calculator-fill" />
          </span>
          <span>{SITE.name[lang]}</span>
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          aria-label={t("মেনু খুলুন", "Open menu")}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <i className={`bi ${open ? "bi-x-lg" : "bi-list"} fs-3`} />
        </button>

        <div className={`collapse navbar-collapse ${open ? "show" : ""}`}>
          <ul className="navbar-nav mx-auto gap-xl-1">
            {PUBLIC_NAV.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <li className="nav-item" key={item.href}>
                  <Link
                    href={href(item.href)}
                    className={`nav-link ${active ? "active" : ""}`}
                    aria-current={active ? "page" : undefined}
                    onClick={close}
                  >
                    {item[lang]}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="d-flex flex-wrap align-items-center gap-2 py-2 py-xl-0">
            <LangSwitcher />
            {signedIn ? (
              <Link href={home} className="btn btn-brand" onClick={close}>
                <i className="bi bi-speedometer2 me-1" />
                {t("ড্যাশবোর্ড", "Dashboard")}
              </Link>
            ) : (
              <>
                <Link href={href("/login")} className="btn btn-outline-brand" onClick={close}>
                  {t("লগইন", "Log in")}
                </Link>
                <Link href={href("/register")} className="btn btn-brand" onClick={close}>
                  {t("ফ্রি অ্যাকাউন্ট", "Sign up free")}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
