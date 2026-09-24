import Link from "next/link";
import { SITE } from "@/lib/site";
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
      ],
    },
    {
      title: t("শিখুন", "Learn"),
      links: [
        ["/gpf-guide", t("GPF নির্দেশিকা", "GPF guide")],
        ["/articles", t("লেখা", "Articles")],
        ["/glossary", t("পরিভাষা", "Glossary")],
        ["/faq", t("প্রশ্নোত্তর", "FAQ")],
      ],
    },
    {
      title: t("প্রতিষ্ঠান", "Company"),
      links: [
        ["/about", t("আমাদের সম্পর্কে", "About")],
        ["/contact", t("যোগাযোগ", "Contact")],
        ["/privacy", t("গোপনীয়তা নীতি", "Privacy policy")],
        ["/terms", t("শর্তাবলি", "Terms of use")],
      ],
    },
  ];

  const socials = [
    { icon: "bi-envelope", label: t("ইমেইল", "Email"), href: `mailto:${c.email}` },
    { icon: "bi-telephone", label: t("ফোন", "Phone"), href: `tel:${c.phoneIntl}` },
    { icon: "bi-whatsapp", label: "WhatsApp", href: `https://wa.me/${c.whatsapp}`, external: true },
  ];

  return (
    <footer className="public-footer">
      <div className="footer-main">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-4">
              <Link href={href("/")} className="footer-brand">
                <span className="brand-mark">
                  <i className="bi bi-calculator-fill" />
                </span>
                {SITE.name[lang]}
              </Link>
              <p className="footer-brand-text">
                {t(
                  "সাধারণ ভবিষ্য তহবিলের (GPF) মুনাফা ও বছর শেষের সমাপনী জমা নিজেই হিসাব করার বিনামূল্যের টুল।",
                  "A free tool to work out your General Provident Fund (GPF) profit and year-end closing balance."
                )}
              </p>
              <div className="footer-social">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    title={s.label}
                    {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <i className={`bi ${s.icon}`} />
                  </a>
                ))}
              </div>
            </div>

            <div className="col-lg-8">
              <div className="row g-4">
                {columns.map((col) => (
                  <div className="col-6 col-md-3" key={col.title}>
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
                <div className="col-6 col-md-3">
                  <h2 className="footer-heading">{t("যোগাযোগ", "Contact")}</h2>
                  <ul className="footer-links">
                    <li className="text-white-50">{c.name[lang]}</li>
                    <li>
                      <a href={`mailto:${c.email}`}>{c.email}</a>
                    </li>
                    <li>
                      <a href={`tel:${c.phoneIntl}`}>{c.phone}</a>
                    </li>
                    <li>
                      <a href={`https://wa.me/${c.whatsapp}`} target="_blank" rel="noopener noreferrer">
                        WhatsApp
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <span>
            © {new Date().getFullYear()} {SITE.name[lang]}. {t("সর্বস্বত্ব সংরক্ষিত।", "All rights reserved.")}
          </span>
          <div className="d-flex flex-wrap align-items-center gap-3">
            <Link href={href("/privacy")}>{t("গোপনীয়তা", "Privacy")}</Link>
            <Link href={href("/terms")}>{t("শর্তাবলি", "Terms")}</Link>
            <FooterLangLinks />
          </div>
        </div>
      </div>
    </footer>
  );
}
