import Link from "next/link";
import { getLang } from "@/lib/lang";
import { tr, localePath, localMoney } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { sampleResult } from "@/lib/sample";
import { LangSwitcher } from "@/components/LangProvider";

/** Focused layout for login/sign-up: slim header, brand panel on the left, form on the right. */
export default async function AuthLayout({ children }) {
  const lang = await getLang();
  const t = tr(lang);
  const r = sampleResult();

  const points = [
    ["bi-bar-chart-steps", t("১৩% / ১২% / ১১% স্ল্যাবে নির্ভুল মুনাফা", "Exact profit on the 13% / 12% / 11% slabs")],
    ["bi-calendar3", t("প্রতিটি মাসের চাঁদার আলাদা হিসাব", "Every month's subscription worked out")],
    ["bi-clipboard-check", t("অফিসের স্টেটমেন্টের সাথে মিলিয়ে দেখা", "Check against your official statement")],
    ["bi-shield-lock", t("আপনার হিসাব শুধু আপনার — সুরক্ষিত", "Your figures stay private and secure")],
  ];

  return (
    <div className="auth-page">
      <header className="auth-header">
        <div className="container d-flex justify-content-between align-items-center">
          <Link href={localePath("/", lang)} className="d-flex align-items-center gap-2 text-decoration-none fw-bold text-dark">
            <span className="brand-mark">
              <i className="bi bi-calculator-fill" />
            </span>
            {SITE.name[lang]}
          </Link>
          <div className="d-flex align-items-center gap-2">
            <LangSwitcher />
            <Link href={localePath("/", lang)} className="btn btn-sm btn-link text-secondary text-decoration-none d-none d-sm-inline">
              <i className="bi bi-arrow-left me-1" />
              {t("হোম পেজে ফিরুন", "Back to home")}
            </Link>
          </div>
        </div>
      </header>

      <main className="auth-main">
        <div className="container">
          <div className="auth-shell">
            <aside className="auth-aside">
              <div className="auth-aside-inner">
                <span className="auth-chip">
                  <i className="bi bi-stars me-1" />
                  {t("সম্পূর্ণ বিনামূল্যে", "Completely free")}
                </span>
                <h2 className="auth-aside-title">
                  {t("আপনার ভবিষ্য তহবিল, এক নজরে পরিষ্কার", "Your provident fund, crystal clear")}
                </h2>
                <p className="auth-aside-text">
                  {t(
                    "সাধারণ ভবিষ্য তহবিলের বছর শেষের মুনাফা আর সমাপনী জমা — পয়সা পর্যন্ত নির্ভুল, বছরের পর বছর এক জায়গায়।",
                    "Your GPF year-end profit and closing balance — accurate to the paisa, year after year, in one place."
                  )}
                </p>
                <ul className="auth-points">
                  {points.map(([icon, text]) => (
                    <li key={text}>
                      <span className="auth-point-icon">
                        <i className={`bi ${icon}`} />
                      </span>
                      {text}
                    </li>
                  ))}
                </ul>
                <div className="auth-sample">
                  <div className="small opacity-75">{t("উদাহরণ: ২৮ লক্ষ জমা + মাসে ১২,০০০", "Example: 28 lakh + 12,000 a month")}</div>
                  <div className="d-flex justify-content-between align-items-end mt-1">
                    <div>
                      <div className="small opacity-75">{t("বছরের মুনাফা", "Profit for the year")}</div>
                      <div className="fw-bold fs-5">৳ {localMoney(r.profit, lang, 0)}</div>
                    </div>
                    <div className="text-end">
                      <div className="small opacity-75">{t("সমাপনী জমা", "Closing balance")}</div>
                      <div className="fw-bold fs-5">৳ {localMoney(r.closingBalance, lang, 0)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
            <section className="auth-form-side">{children}</section>
          </div>
        </div>
      </main>

      <footer className="auth-footer">
        <div className="container d-flex flex-wrap justify-content-center gap-3 small">
          <span>© {new Date().getFullYear()} {SITE.name[lang]}</span>
          <Link href={localePath("/privacy", lang)}>{t("গোপনীয়তা নীতি", "Privacy")}</Link>
          <Link href={localePath("/terms", lang)}>{t("শর্তাবলি", "Terms")}</Link>
          <Link href={localePath("/contact", lang)}>{t("সাহায্য", "Help")}</Link>
        </div>
      </footer>
    </div>
  );
}
