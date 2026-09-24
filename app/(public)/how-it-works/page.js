import Link from "next/link";
import PageHero from "@/components/public/PageHero";
import CtaBanner from "@/components/public/CtaBanner";
import JsonLd from "@/components/JsonLd";
import { sampleResult } from "@/lib/sample";
import { getLang } from "@/lib/lang";
import { tr, localePath, localMoney, localNum, monthName } from "@/lib/i18n";
import { pageMetadata } from "@/lib/site";
import { breadcrumbLd, howToLd } from "@/lib/seo";

const COPY = {
  bn: {
    title: "GPF হিসাব কীভাবে করবেন — উদাহরণসহ ধাপে ধাপে",
    description:
      "GPF ক্যালকুলেটর দিয়ে সাধারণ ভবিষ্য তহবিলের প্রারম্ভিক জমার স্ল্যাব মুনাফা আর মাসভিত্তিক চাঁদার মুনাফা কীভাবে হিসাব হয় — একটি পূর্ণাঙ্গ উদাহরণসহ।",
    keywords: ["GPF হিসাব করার নিয়ম", "GPF হিসাব উদাহরণ"],
  },
  en: {
    title: "How to calculate GPF — step by step with an example",
    description:
      "How GPF Calculator works out General Provident Fund slab profit on the opening balance and month-wise profit on subscriptions — with a complete worked example.",
    keywords: ["how to calculate GPF", "GPF calculation example"],
  },
};

export async function generateMetadata() {
  return pageMetadata(await getLang(), "/how-it-works", COPY);
}

export default async function HowItWorksPage() {
  const lang = await getLang();
  const t = tr(lang);
  const m = (v, d) => localMoney(v, lang, d);
  const n = (v) => localNum(v, lang);
  const r = sampleResult();
  const filled = r.slabLines.filter((l) => l.amount > 0);

  const steps = [
    { title: t("রেজিস্ট্রেশন করুন", "Sign up"), text: t("নাম, মোবাইল নম্বর (ইমেইল ঐচ্ছিক) আর একটি পাসওয়ার্ড দিন। সাথে সাথেই আপনার ড্যাশবোর্ড খুলে যাবে।", "Give your name, mobile number (email optional) and a password. Your dashboard opens straight away.") },
    { title: t("নতুন অর্থবছর খুলুন", "Open a fiscal year"), text: t("“নতুন হিসাব” চাপুন। অর্থবছর (জুলাই–জুন) আর স্টেটমেন্টের Opening Balance বসান।", "Click “New calculation”. Enter the fiscal year (July–June) and the statement's Opening Balance.") },
    { title: t("স্ল্যাব ও হার দেখে নিন", "Check the slabs"), text: t("ডিফল্ট স্ল্যাব ১৫ লক্ষ @১৩%, পরের ১৫ লক্ষ @১২%, বাকি @১১%। আপনার ফান্ডের হার আলাদা হলে বদলে নিন।", "Defaults: 15 lakh @13%, next 15 lakh @12%, the rest @11%. Change them if your fund differs.") },
    { title: t("১২ মাসের চাঁদা বসান", "Enter 12 months"), text: t("প্রতি মাসের চাঁদা, রিফান্ড বা উত্তোলন লিখুন। সব মাসে একই চাঁদা হলে একবার লিখে “বসান” চাপলেই হবে।", "Type each month's subscription, refund or withdrawal. Same every month? Type it once and click “Fill”.") },
    { title: t("ফলাফল মিলিয়ে দেখুন", "Check the result"), text: t("ডান পাশে সাথে সাথে মুনাফা আর Closing Balance দেখাবে। স্টেটমেন্টের অঙ্ক বসিয়ে মিলিয়েও নিতে পারেন।", "Profit and Closing Balance appear instantly. Enter your statement's figures to compare.") },
    { title: t("সংরক্ষণ করে পরের বছরে যান", "Save and carry forward"), text: t("সংরক্ষণ করুন, প্রিন্ট করুন, আর “পরের বছর” চাপলে সমাপনী জমা নিয়েই নতুন বছর শুরু হবে।", "Save, print, and click “Next year” to start the new year with the closing balance.") },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd(lang, [{ name: t("কীভাবে কাজ করে", "How it works"), path: "/how-it-works" }]),
          howToLd(lang, COPY[lang].title, steps),
        ]}
      />
      <PageHero
        lang={lang}
        icon="bi-gear"
        eyebrow={t("কীভাবে কাজ করে", "How it works")}
        title={t("তথ্য বসান, বাকিটা ক্যালকুলেটরের কাজ", "Enter the figures — the calculator does the rest")}
        text={t(
          "কোন ধাপে কী করতে হবে, আর ভেতরে হিসাবটা ঠিক কীভাবে হয় — উদাহরণসহ পুরোটা নিচে দেখুন।",
          "What to do at each step, and exactly how the calculation works — all with an example below."
        )}
      />

      <section className="section">
        <div className="container">
          <h2 className="section-title mb-4">{t("ব্যবহারের ৬টি ধাপ", "Six steps to use it")}</h2>
          <div className="row g-4">
            {steps.map((s, i) => (
              <div className="col-md-6 col-lg-4" key={s.title}>
                <div className="feature-card d-flex gap-3">
                  <div className="step-num">{n(i + 1)}</div>
                  <div>
                    <h3 className="h5 fw-semibold">{s.title}</h3>
                    <p className="text-secondary mb-0">{s.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container" style={{ maxWidth: 960 }}>
          <h2 className="section-title">{t("একটি পূর্ণাঙ্গ উদাহরণ", "A complete worked example")}</h2>
          <p className="text-secondary mb-4">
            {lang === "en" ? (
              <>
                Say that at the start of FY 2025–26 (1 July 2025) a member's fund holds{" "}
                <strong>৳ {m(r.openingBalance, 0)}</strong>, and <strong>৳ 12,000</strong> is deducted from
                salary every month. (An illustrative example.)
              </>
            ) : (
              <>
                ধরা যাক, ২০২৫–২৬ অর্থবছরের শুরুতে (১ জুলাই ২০২৫) একজন গ্রাহকের তহবিলে আছে{" "}
                <strong>৳ {m(r.openingBalance, 0)}</strong>, আর প্রতি মাসে বেতন থেকে <strong>৳ ১২,০০০</strong>{" "}
                চাঁদা কাটা হয়। (এটি একটি কাল্পনিক উদাহরণ।)
              </>
            )}
          </p>

          <div className="card mb-4">
            <div className="card-header">
              <i className="bi bi-1-circle me-2" />
              {t("ধাপ ১: প্রারম্ভিক জমার মুনাফা (স্ল্যাব হারে)", "Step 1: profit on the opening balance (slab rates)")}
            </div>
            <div className="table-responsive">
              <table className="table mb-0 align-middle">
                <thead>
                  <tr>
                    <th>{t("ধাপ", "Band")}</th>
                    <th className="text-end">{t("এই ধাপে পড়া টাকা", "Amount in band")}</th>
                    <th className="text-end">{t("হার", "Rate")}</th>
                    <th className="text-end">{t("মুনাফা", "Profit")}</th>
                  </tr>
                </thead>
                <tbody>
                  {filled.map((l) => (
                    <tr key={l.order}>
                      <td>{t(`${n(l.order)} নম্বর ধাপ`, `Band ${l.order}`)}</td>
                      <td className="text-end">৳ {m(l.amount)}</td>
                      <td className="text-end">{n(l.rate)}%</td>
                      <td className="text-end">৳ {m(l.interest)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="table-light fw-bold">
                  <tr>
                    <td colSpan={3}>{t("প্রারম্ভিক জমার মোট মুনাফা", "Total opening-balance profit")}</td>
                    <td className="text-end">৳ {m(r.openingInterest)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-header">
              <i className="bi bi-2-circle me-2" />
              {t(
                `ধাপ ২: চাঁদার মুনাফা (মাস অনুপাতে, ${n(r.depositRate)}% হারে)`,
                `Step 2: subscription profit (month-wise, at ${r.depositRate}%)`
              )}
            </div>
            <div className="card-body">
              <p className="small text-secondary">
                {t(
                  `প্রারম্ভিক জমা ১৫ লক্ষ পেরিয়ে দ্বিতীয় ধাপে পৌঁছেছে, তাই নতুন চাঁদা পায় সেই ধাপের হার — ${n(r.depositRate)}%। প্রতিটি মাসের চাঁদা যত মাস তহবিলে থাকে, তত মাসের মুনাফা পায়:`,
                  `The opening balance has passed 15 lakh into the second band, so new subscriptions earn that band's rate — ${r.depositRate}%. Each month's subscription earns for the months it is in the fund:`
                )}
              </p>
              <div className="formula mb-0">
                {t("মুনাফা = চাঁদা × হার × (তহবিলে থাকা মাস ÷ ১২)", "Profit = subscription × rate × (months held ÷ 12)")}
                {"\n\n"}
                {r.rows
                  .map(
                    (row) =>
                      `${monthName(row, lang).padEnd(10)} ${m(12000, 0)} × ${n(r.depositRate)}% × ${n(row.held)}/${n(12)} = ${m(row.netInterest)}`
                  )
                  .join("\n")}
                {`\n\n${t("মোট চাঁদার মুনাফা", "Total subscription profit")} = ${m(r.depositInterest)}`}
              </div>
            </div>
          </div>

          <div className="card border-success">
            <div className="card-header bg-success text-white">
              <i className="bi bi-3-circle me-2" />
              {t("ধাপ ৩: বছর শেষের ফলাফল", "Step 3: the year-end result")}
            </div>
            <div className="card-body">
              <div className="result-line">
                <span className="label">{t("প্রারম্ভিক জমা", "Opening balance")}</span>
                <span className="value">৳ {m(r.openingBalance)}</span>
              </div>
              <div className="result-line">
                <span className="label">{t("+ বছরের মোট চাঁদা", "+ Subscriptions for the year")}</span>
                <span className="value">৳ {m(r.totalSubscription)}</span>
              </div>
              <div className="result-line">
                <span className="label">
                  {t("+ মোট মুনাফা", "+ Total profit")} ({m(r.openingInterest)} + {m(r.depositInterest)})
                </span>
                <span className="value text-success">৳ {m(r.profit)}</span>
              </div>
              <div className="result-line">
                <span className="label fw-bold text-dark">{t("= সমাপনী জমা (৩০ জুন ২০২৬)", "= Closing balance (30 June 2026)")}</span>
                <span className="value fs-5 text-success">৳ {m(r.closingBalance)}</span>
              </div>
            </div>
          </div>

          <div className="info-box mt-4">
            <i className="bi bi-info-circle me-1" />
            {t(
              "অ্যাপে এই পুরো হিসাব আপনার নিজের অঙ্কে সাথে সাথে হয়ে যায় — কোনো সূত্র লিখতে হয় না। নিয়মগুলোর বিস্তারিত পড়ুন ",
              "In the app this whole calculation happens instantly with your own figures — no formulas needed. Read the rules in detail in the "
            )}
            <Link href={localePath("/gpf-guide", lang)}>{t("GPF নির্দেশিকা", "GPF guide")}</Link>
            {t(" পেজে।", ".")}
          </div>
        </div>
      </section>

      <CtaBanner lang={lang} title={t("নিজের অঙ্কে হিসাবটা দেখতে চান?", "Want to see it with your own figures?")} />
    </>
  );
}
