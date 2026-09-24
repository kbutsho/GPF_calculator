"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";
import { SITE } from "@/lib/site";
import { useLang, LangSwitcher } from "@/components/LangProvider";

/**
 * Top bar for the private areas. `links` is [{ href, icon, bn, en, exact? }];
 * the dashboard and the admin panel pass their own sets.
 */
export default function DashboardNavbar({ userName, links, badge }) {
  const { lang, t } = useLang();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      toast.success(t("লগআউট হয়েছে", "Logged out"));
    } finally {
      window.location.assign("/login");
    }
  };

  const isActive = (l) => (l.exact ? pathname === l.href : pathname === l.href || pathname.startsWith(`${l.href}/`));

  return (
    <nav className="navbar navbar-expand-lg navbar-dark app-navbar sticky-top">
      <div className="container">
        {/* Logo leads back to the public site; the proxy picks its bn/en version. */}
        <Link className="navbar-brand d-flex align-items-center gap-2" href="/" title={t("ওয়েবসাইটের হোম পেজ", "Website home page")}>
          <i className="bi bi-calculator-fill" />
          <span>{SITE.name[lang]}</span>
          {badge && <span className="badge bg-warning text-dark small">{badge}</span>}
        </Link>
        <button
          className="navbar-toggler border-0"
          type="button"
          aria-label={t("মেনু খুলুন", "Open menu")}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <i className={`bi ${open ? "bi-x-lg" : "bi-list"} fs-3 text-white`} />
        </button>
        <div className={`collapse navbar-collapse ${open ? "show" : ""}`}>
          <ul className="navbar-nav me-auto ms-lg-3">
            {links.map((l) => (
              <li className="nav-item" key={l.href}>
                <Link
                  href={l.href}
                  className={`nav-link ${isActive(l) ? "active fw-semibold" : ""}`}
                  aria-current={isActive(l) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  <i className={`bi ${l.icon} me-1`} />
                  {l[lang]}
                </Link>
              </li>
            ))}
            <li className="nav-item">
              <Link href="/" className="nav-link" onClick={() => setOpen(false)}>
                <i className="bi bi-globe me-1" />
                {t("ওয়েবসাইট", "Website")}
              </Link>
            </li>
          </ul>
          <div className="d-flex flex-wrap align-items-center gap-2 py-2 py-lg-0">
            <LangSwitcher dark />
            <span className="text-white small">
              <i className="bi bi-person-circle me-1" />
              {userName}
            </span>
            <button className="btn btn-sm btn-outline-light" onClick={logout}>
              <i className="bi bi-box-arrow-right me-1" />
              {t("লগআউট", "Log out")}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
