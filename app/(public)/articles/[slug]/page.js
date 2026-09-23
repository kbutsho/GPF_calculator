import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/public/PageHero";
import CtaBanner from "@/components/public/CtaBanner";
import JsonLd from "@/components/JsonLd";
import { getLang } from "@/lib/lang";
import { tr, localePath, localMoney, localNum } from "@/lib/i18n";
import { pageMetadata } from "@/lib/site";
import { articleLd, breadcrumbLd } from "@/lib/seo";
import { ARTICLES, findArticle } from "@/lib/articles";
import { calculateYear } from "@/lib/calc";
import { normalizeYear } from "@/lib/payload";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) return {};
  const lang = await getLang();
  const meta = pageMetadata(lang, `/articles/${slug}`, { bn: article.bn, en: article.en });
  return {
    ...meta,
    openGraph: { ...meta.openGraph, type: "article", publishedTime: article.date },
  };
}

/** 10 illustrative years: 10 lakh opening, 10,000 a month, default slabs. */
function projection() {
  const rows = [];
  let opening = 1000000;
  for (let i = 0; i < 10; i++) {
    const r = calculateYear(
      normalizeYear({
        startYear: 2025 + i,
        openingBalance: opening,
        months: Array.from({ length: 12 }, (_, index) => ({ index, subscription: 10000 })),
      })
    );
    rows.push({ year: i + 1, ...r });
    opening = r.closingBalance;
  }
  return rows;
}

function Block({ block, lang }) {
  const [type, content] = block;
  const t = tr(lang);
  if (type === "h2") return <h2>{content}</h2>;
  if (type === "p") return <p>{content}</p>;
  if (type === "ul")
    return (
      <ul>
        {content.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  if (type === "formula") return <div className="formula mb-3">{content}</div>;
  if (type === "note")
    return (
      <div className="info-box my-4">
        <i className="bi bi-lightbulb me-1" />
        {content}
      </div>
    );
  if (type === "projection") {
    const m = (v) => localMoney(v, lang, 0);
    return (
      <div className="card my-3">
        <div className="table-responsive">
          <table className="table table-sm mb-0 align-middle">
            <thead>
              <tr>
                <th>{t("বছর", "Year")}</th>
                <th className="text-end">{t("প্রারম্ভিক জমা", "Opening")}</th>
                <th className="text-end">{t("চাঁদা", "Subscription")}</th>
                <th className="text-end">{t("চাঁদার হার", "Rate")}</th>
                <th className="text-end">{t("মুনাফা", "Profit")}</th>
                <th className="text-end">{t("সমাপনী জমা", "Closing")}</th>
              </tr>
            </thead>
            <tbody>
              {projection().map((r) => (
                <tr key={r.year}>
                  <td>{localNum(r.year, lang)}</td>
                  <td className="text-end">{m(r.openingBalance)}</td>
                  <td className="text-end">{m(r.totalSubscription)}</td>
                  <td className="text-end">{localNum(r.depositRate, lang)}%</td>
                  <td className="text-end text-success">{m(r.profit)}</td>
                  <td className="text-end fw-semibold">{m(r.closingBalance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  return null;
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) notFound();
  const lang = await getLang();
  const t = tr(lang);
  const a = article[lang];
  const path = `/articles/${slug}`;
  const others = ARTICLES.filter((x) => x.slug !== slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          articleLd(lang, { title: a.title, description: a.description, path, date: article.date }),
          breadcrumbLd(lang, [
            { name: t("লেখা", "Articles"), path: "/articles" },
            { name: a.title, path },
          ]),
        ]}
      />
      <PageHero lang={lang} icon={article.icon} eyebrow={t("লেখা", "Articles")} title={a.title} text={a.description} />
      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          <div className="small text-secondary mb-3">
            <i className="bi bi-calendar3 me-1" />
            <time dateTime={article.date}>
              {new Date(article.date).toLocaleDateString(lang === "en" ? "en-GB" : "bn-BD", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </div>
          <article className="prose">
            {a.body.map((block, i) => (
              <Block key={i} block={block} lang={lang} />
            ))}
          </article>

          <div className="mt-5">
            <h2 className="h5 fw-semibold mb-3">{t("আরও পড়ুন", "Read next")}</h2>
            <div className="row g-3">
              {others.map((o) => (
                <div className="col-md-4" key={o.slug}>
                  <Link href={localePath(`/articles/${o.slug}`, lang)} className="contact-card small">
                    <div className="fw-semibold">{o[lang].title}</div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CtaBanner
        lang={lang}
        title={t("নিজের অঙ্কে হিসাব করে দেখুন", "Try it with your own figures")}
      />
    </>
  );
}

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}
