"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";
import { SITE } from "@/lib/site";

const LINKS = [
  { href: "/dashboard", label: "ড্যাশবোর্ড", icon: "bi-speedometer2" },
  { href: "/dashboard/year/new", label: "নতুন হিসাব", icon: "bi-plus-lg" },
  { href: "/dashboard/profile", label: "প্রোফাইল", icon: "bi-person-gear" },
];

export default function DashboardNavbar({ userName }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      toast.success("লগআউট হয়েছে");
    } finally {
      window.location.assign("/login");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark app-navbar sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" href="/dashboard">
          <i className="bi bi-calculator-fill" />
          <span>{SITE.name}</span>
        </Link>
        <button
          className="navbar-toggler border-0"
          type="button"
          aria-label="মেনু খুলুন"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <i className={`bi ${open ? "bi-x-lg" : "bi-list"} fs-3 text-white`} />
        </button>
        <div className={`collapse navbar-collapse ${open ? "show" : ""}`}>
          <ul className="navbar-nav me-auto ms-lg-3">
            {LINKS.map((l) => (
              <li className="nav-item" key={l.href}>
                <Link
                  href={l.href}
                  className={`nav-link ${pathname === l.href ? "active fw-semibold" : ""}`}
                  onClick={() => setOpen(false)}
                >
                  <i className={`bi ${l.icon} me-1`} />
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="nav-item">
              <Link href="/" className="nav-link" onClick={() => setOpen(false)}>
                <i className="bi bi-globe me-1" />
                ওয়েবসাইট
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center gap-2 py-2 py-lg-0">
            <span className="text-white small">
              <i className="bi bi-person-circle me-1" />
              {userName}
            </span>
            <button className="btn btn-sm btn-outline-light" onClick={logout}>
              <i className="bi bi-box-arrow-right me-1" />
              লগআউট
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
