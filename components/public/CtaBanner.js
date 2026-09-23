import Link from "next/link";
import { tr, localePath } from "@/lib/i18n";

export default function CtaBanner({ lang, title, text }) {
  const t = tr(lang);
  return (
    <section className="py-5">
      <div className="container">
        <div className="cta-banner">
          <div className="row align-items-center g-3">
            <div className="col-lg-8">
              <h2 className="h3 fw-bold mb-2">
                {title || t("আজই নিজের GPF হিসাব শুরু করুন", "Start tracking your GPF today")}
              </h2>
              <p className="mb-0 opacity-75">
                {text ||
                  t(
                    "অ্যাকাউন্ট খুলতে এক মিনিটও লাগে না — মোবাইল নম্বর আর একটা পাসওয়ার্ডই যথেষ্ট। সম্পূর্ণ বিনামূল্যে।",
                    "Signing up takes less than a minute — just a mobile number and a password. Completely free."
                  )}
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <Link href={localePath("/register", lang)} className="btn btn-light btn-lg fw-semibold">
                <i className="bi bi-person-plus me-2" />
                {t("ফ্রি অ্যাকাউন্ট খুলুন", "Create a free account")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
