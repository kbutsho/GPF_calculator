import Link from "next/link";
import { SITE } from "@/lib/site";
import { ARTICLES } from "@/lib/articles";
import { tr, localePath } from "@/lib/i18n";
import FooterLangLinks from "@/components/public/FooterLangLinks";

export default function PublicFooter({ lang }) {
  const t = tr(lang);
  const c = SITE.contact;
  const href = (p) => localePath(p, lang);

  const columns = [
    {
      title: t("টুল", "Product"),
      links: [
        ["/features", t("সুবিধাসমূহ", "Features")],
        ["/how-it-works", t("কীভাবে কাজ করে", "How it works")],
        ["/profit-rates", t("মুনাফার হার", "Profit rates")],
        ["/register", t("ফ্রি অ্যাকাউন্ট", "Create account")],
        ["/login", t("লগইন", "Log in")],
      ],
    },
    {
      title: t("শিখুন", "Learn"),
      links: [
        ["/gpf-guide", t("GPF নির্দেশিকা", "GPF guide")],
        ["/glossary", t("GPF পরিভাষা", "GPF glossary")],
        ["/faq", t("প্রশ্নোত্তর", "FAQ")],
        ["/articles", t("সব লেখা", "All articles")],
      ],
    },
    {
      title: t("জনপ্রিয় লেখা", "Popular reads"),
      links: ARTICLES.slice(0, 4).map((a) => [`/articles/${a.slug}`, a[lang].short || a[lang].title]),
    },
    {
      title: t("প্রতিষ্ঠান", "Company"),
      links: [
        ["/about", t("আমাদের সম্পর্কে", "About")],
        ["/contact", t("যোগাযোগ", "Contact")],
        ["/privacy", t("গোপনীয়তা নীতি", "Privacy policy")],
        ["/terms", t("ব্যবহারের শর্তাবলি", "Terms of use")],
      ],
    },
  ];

  return (
    <footer className="public-footer">
      {/* ---- links ---- */}
      <div className="footer-main">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4">
              <Link href={href("/")} className="d-inline-flex align-items-center gap-2 mb-3 fs-5 fw-semibold text-white">
                <span className="brand-mark">
                  <i className="bi bi-calculator-fill" />
                </span>
                {SITE.name[lang]}
              </Link>
              <p className="footer-brand-text">
                {t(
                  "সাধারণ ভবিষ্য তহবিলের (GPF) স্ল্যাব-ভিত্তিক মুনাফা, মাসভিত্তিক চাঁদার মুনাফা ও বছর শেষের সমাপনী জমা নিজেই হিসাব করার বিনামূল্যের টুল।",
                  "A free tool to work out your General Provident Fund (GPF) slab profit, month-wise subscription profit and year-end closing balance yourself."
                )}
              </p>
              <div className="footer-contact">
                <span className="icon"><i className="bi bi-person" /></span>
                <span>{c.name[lang]}</span>
              </div>
              <div className="footer-contact">
                <span className="icon"><i className="bi bi-envelope" /></span>
                <a href={`mailto:${c.email}`}>{c.email}</a>
              </div>
              <div className="footer-contact">
                <span className="icon"><i className="bi bi-telephone" /></span>
                <a href={`tel:${c.phoneIntl}`}>{c.phone}</a>
              </div>
              <div className="footer-contact">
                <span className="icon"><i className="bi bi-whatsapp" /></span>
                <a href={`https://wa.me/${c.whatsapp}`} target="_blank" rel="noopener noreferrer">
                  {t("হোয়াটসঅ্যাপে মেসেজ দিন", "Message on WhatsApp")}
                </a>
              </div>
            </div>

            {columns.map((col) => (
              <div className="col-6 col-md-3 col-lg-2" key={col.title}>
                <h2 className="footer-heading">{col.title}</h2>
                <ul className="footer-links">
                  {col.links.map(([p, label]) => (
                    <li key={p}>
                      <Link href={href(p)}>{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="footer-badges">
            <span><i className="bi bi-shield-check me-1" />{t("এনক্রিপ্টেড পাসওয়ার্ড", "Encrypted passwords")}</span>
            <span><i className="bi bi-eye-slash me-1" />{t("কোনো বিজ্ঞাপন বা ট্র্যাকিং নেই", "No ads or tracking")}</span>
            <span><i className="bi bi-bullseye me-1" />{t("পয়সা পর্যন্ত নির্ভুল", "Accurate to the paisa")}</span>
            <span><i className="bi bi-translate me-1" />{t("বাংলা ও ইংরেজি", "Bangla & English")}</span>
          </div>
        </div>
      </div>

      {/* ---- bottom bar ---- */}
      <div className="footer-bottom">
        <div className="container d-flex flex-wrap justify-content-between align-items-center gap-2">
          <span>
            © {new Date().getFullYear()} {SITE.name[lang]}. {t("সর্বস্বত্ব সংরক্ষিত।", "All rights reserved.")}{" "}
            <span className="d-none d-md-inline">
              {t("এটি একটি ব্যক্তিগত উদ্যোগ, সরকারি ওয়েবসাইট নয়।", "An independent project, not a government website.")}
            </span>
          </span>
          <FooterLangLinks />
        </div>
      </div>
    </footer>
  );
}
