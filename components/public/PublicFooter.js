import Link from "next/link";
import { PUBLIC_NAV, FOOTER_LINKS, SITE } from "@/lib/site";

export default function PublicFooter() {
  const c = SITE.contact;
  return (
    <footer className="public-footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="d-flex align-items-center gap-2 mb-2 fs-5 fw-semibold text-white">
              <span className="brand-mark">
                <i className="bi bi-calculator-fill" />
              </span>
              {SITE.name}
            </div>
            <p className="small mb-0">
              সাধারণ ভবিষ্য তহবিলের (GPF) বছর সমাপনী মুনাফা ও ক্লোজিং ব্যালেন্স নিজেই হিসাব করার
              একটি সহজ, বিনামূল্যের টুল। অফিসের স্টেটমেন্ট আসার আগেই জেনে নিন আপনার তহবিলে কত
              জমল।
            </p>
          </div>
          <div className="col-6 col-lg-2">
            <h6 className="text-white">পেজসমূহ</h6>
            <ul className="list-unstyled small mb-0">
              {PUBLIC_NAV.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-6 col-lg-2">
            <h6 className="text-white">আরও</h6>
            <ul className="list-unstyled small mb-0">
              {FOOTER_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/register">অ্যাকাউন্ট খুলুন</Link>
              </li>
              <li>
                <Link href="/login">লগইন</Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-4">
            <h6 className="text-white">যোগাযোগ</h6>
            <ul className="list-unstyled small mb-0 d-flex flex-column gap-1">
              <li>
                <i className="bi bi-person me-2" />
                {c.name}
              </li>
              <li>
                <i className="bi bi-envelope me-2" />
                <a href={`mailto:${c.email}`}>{c.email}</a>
              </li>
              <li>
                <i className="bi bi-telephone me-2" />
                <a href={`tel:${c.phoneIntl}`}>{c.phone}</a>
              </li>
              <li>
                <i className="bi bi-whatsapp me-2" />
                <a href={`https://wa.me/${c.whatsapp}`} target="_blank" rel="noopener noreferrer">
                  হোয়াটসঅ্যাপে মেসেজ দিন
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="border-secondary my-4" />
        <div className="d-flex flex-wrap justify-content-between gap-2 small">
          <span>© {new Date().getFullYear()} {SITE.name} — তৈরি করেছেন {c.name}</span>
          <span>এটি একটি ব্যক্তিগত উদ্যোগ; কোনো সরকারি প্রতিষ্ঠানের অফিসিয়াল ওয়েবসাইট নয়।</span>
        </div>
      </div>
    </footer>
  );
}
