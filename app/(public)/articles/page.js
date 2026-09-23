import Link from "next/link";
import PageHero from "@/components/public/PageHero";
import CtaBanner from "@/components/public/CtaBanner";
import JsonLd from "@/components/JsonLd";
import { getLang } from "@/lib/lang";
import { tr, localePath } from "@/lib/i18n";
import { pageMetadata } from "@/lib/site";
import { breadcrumbLd } from "@/lib/seo";
import { ARTICLES } from "@/lib/articles";

const COPY = {
  bn: {
    title: "GPF নিয়ে লেখা — নিয়ম, উদাহরণ ও পরামর্শ",
    description:
      "সাধারণ ভবিষ্য তহবিলের মুনাফা হিসাব, চাঁদার হার, স্টেটমেন্ট যাচাই ও অবসরের পরিকল্পনা নিয়ে সহজ বাংলায় লেখা।",
  },
  en: {
    title: "GPF articles — rules, examples and tips",
    description:
      "Plain-language articles on General Provident Fund profit calculation, subscription rates, checking your statement and planning for retirement.",
  },
};

export async function generateMetadata() {
  return pageMetadata(await getLang(), "/articles", COPY);
}

export default async function ArticlesPage() {
  const lang = await getLang();
  const t = tr(lang);
  return (
    <>
      <JsonLd data={breadcrumbLd(lang, [{ name: t("লেখা", "Articles"), path: "/articles" }])} />
      <PageHero
        lang={lang}
        icon="bi-journal-text"
        eyebrow={t("লেখা", "Articles")}
        title={COPY[lang].title}
        text={COPY[lang].description}
      />
      <section className="section">
        <div className="container">
          <div className="row g-4">
            {ARTICLES.map((a) => (
              <div className="col-md-6 col-lg-4" key={a.slug}>
                <Link href={localePath(`/articles/${a.slug}`, lang)} className="contact-card">
                  <div className="feature-icon">
                    <i className={`bi ${a.icon}`} />
                  </div>
                  <h2 className="h5 fw-semibold">{a[lang].title}</h2>
                  <p className="text-secondary small mb-2">{a[lang].description}</p>
                  <span className="small fw-semibold text-success">
                    {t("পড়ুন", "Read")} <i className="bi bi-arrow-right" />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBanner lang={lang} />
    </>
  );
}
