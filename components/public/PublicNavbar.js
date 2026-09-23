"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PUBLIC_NAV, SITE } from "@/lib/site";

export default function PublicNavbar({ userName }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg public-navbar sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" href="/" onClick={() => setOpen(false)}>
          <span className="brand-mark">
            <i className="bi bi-calculator-fill" />
          </span>
          <span>{SITE.name}</span>
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          aria-label="মেনু খুলুন"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <i className={`bi ${open ? "bi-x-lg" : "bi-list"} fs-3`} />
        </button>

        <div className={`collapse navbar-collapse ${open ? "show" : ""}`}>
          <ul className="navbar-nav mx-auto gap-lg-1">
            {PUBLIC_NAV.map((item) => (
              <li className="nav-item" key={item.href}>
                <Link
                  href={item.href}
                  className={`nav-link ${pathname === item.href ? "active" : ""}`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="d-flex gap-2 py-2 py-lg-0">
            {userName ? (
              <Link href="/dashboard" className="btn btn-brand" onClick={() => setOpen(false)}>
                <i className="bi bi-speedometer2 me-1" />
                ড্যাশবোর্ড
              </Link>
            ) : (
              <>
                <Link href="/login" className="btn btn-outline-brand" onClick={() => setOpen(false)}>
                  লগইন
                </Link>
                <Link href="/register" className="btn btn-brand" onClick={() => setOpen(false)}>
                  ফ্রি অ্যাকাউন্ট
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
