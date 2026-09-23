import Link from "next/link";
import { localePath } from "@/lib/i18n";

/** Page header with a visible breadcrumb (the matching JSON-LD is rendered by the page). */
export default function PageHero({ lang, icon, eyebrow, title, text }) {
  return (
    <section className="page-hero">
      <div className="container">
        <nav aria-label="breadcrumb" className="small mb-2 opacity-75">
          <Link href={localePath("/", lang)} className="text-white text-decoration-none">
            {lang === "en" ? "Home" : "হোম"}
          </Link>
          <span className="mx-2">/</span>
          <span>{eyebrow}</span>
        </nav>
        {eyebrow && (
          <div className="eyebrow">
            {icon && <i className={`bi ${icon} me-1`} />}
            {eyebrow}
          </div>
        )}
        <h1 className="fw-bold mb-2">{title}</h1>
        {text && <p className="lead mb-0">{text}</p>}
      </div>
    </section>
  );
}
