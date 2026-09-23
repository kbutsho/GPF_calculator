import Link from "next/link";
import { PUBLIC_NAV, FOOTER_LINKS, SITE } from "@/lib/site";
import { tr, localePath } from "@/lib/i18n";

export default function PublicFooter({ lang }) {
  const t = tr(lang);
  const c = SITE.contact;
  const href = (path) => localePath(path, lang);
  return (
    <footer className="public-footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="d-flex align-items-center gap-2 mb-2 fs-5 fw-semibold text-white">
              <span className="brand-mark">
                <i className="bi bi-calculator-fill" />
              </span>
              {SITE.name[lang]}
            </div>
            <p className="small mb-0">
              {t(
                "সাধারণ ভবিষ্য তহবিলের (GPF) বছর সমাপনী মুনাফা ও ক্লোজিং ব্যালেন্স নিজেই হিসাব করার একটি সহজ, বিনামূল্যের টুল। অফিসের স্টেটমেন্ট আসার আগেই জেনে নিন আপনার তহবিলে কত জমল।",
                "A simple, free tool to work out your General Provident Fund (GPF) year-end profit and closing balance yourself — know what your fund holds before the official statement arrives."
              )}
            </p>
          </div>
          <div className="col-6 col-lg-2">
            <h2 className="h6 text-white">{t("পেজসমূহ", "Pages")}</h2>
            <ul className="list-unstyled small mb-0">
              {PUBLIC_NAV.map((l) => (
                <li key={l.href}>
                  <Link href={href(l.href)}>{l[lang]}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-6 col-lg-2">
            <h2 className="h6 text-white">{t("আরও", "More")}</h2>
            <ul className="list-unstyled small mb-0">
              {FOOTER_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={href(l.href)}>{l[lang]}</Link>
                </li>
              ))}
              <li>
                <Link href={href("/register")}>{t("অ্যাকাউন্ট খুলুন", "Create account")}</Link>
              </li>
              <li>
                <Link href={href("/login")}>{t("লগইন", "Log in")}</Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-4">
            <h2 className="h6 text-white">{t("যোগাযোগ", "Contact")}</h2>
            <ul className="list-unstyled small mb-0 d-flex flex-column gap-1">
              <li>
                <i className="bi bi-person me-2" />
                {c.name[lang]}
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
                  {t("হোয়াটসঅ্যাপে মেসেজ দিন", "Message on WhatsApp")}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="border-secondary my-4" />
        <div className="d-flex flex-wrap justify-content-between gap-2 small">
          <span>
            © {new Date().getFullYear()} {SITE.name[lang]} — {t("তৈরি করেছেন", "Made by")} {c.name[lang]}
          </span>
          <span>
            {t(
              "এটি একটি ব্যক্তিগত উদ্যোগ; কোনো সরকারি প্রতিষ্ঠানের অফিসিয়াল ওয়েবসাইট নয়।",
              "An independent project — not an official government website."
            )}
          </span>
        </div>
      </div>
    </footer>
  );
}
