import Link from "next/link";
import PageHero from "@/components/public/PageHero";
import CtaBanner from "@/components/public/CtaBanner";
import JsonLd from "@/components/JsonLd";
import { getLang } from "@/lib/lang";
import { tr, localePath } from "@/lib/i18n";
import { pageMetadata, absoluteUrl } from "@/lib/site";
import { breadcrumbLd } from "@/lib/seo";

const COPY = {
  bn: {
    title: "GPF পরিভাষা — সাধারণ ভবিষ্য তহবিলের শব্দগুলোর সহজ মানে",
    description:
      "Opening Balance, Closing Balance, Subscription, Refund, Withdrawal, স্ল্যাব, প্রান্তিক হার, ট্রাংকেট — GPF স্টেটমেন্ট ও হিসাবের সব শব্দের সহজ বাংলা ব্যাখ্যা।",
    keywords: ["GPF শব্দের অর্থ", "Opening Balance মানে", "GPF স্টেটমেন্ট বোঝা"],
  },
  en: {
    title: "GPF glossary — General Provident Fund terms explained",
    description:
      "Opening Balance, Closing Balance, Subscription, Refund, Withdrawal, slab, marginal rate, truncation — every term on a GPF statement explained simply.",
    keywords: ["GPF terms", "GPF statement meaning", "GPF opening balance meaning"],
  },
};

const TERMS = [
  ["gpf", "GPF (General Provident Fund)", "সাধারণ ভবিষ্য তহবিল — সরকারি চাকরিজীবীদের বেতন থেকে কাটা চাঁদায় গড়া সঞ্চয় তহবিল, যাতে প্রতি বছর সরকার-নির্ধারিত হারে মুনাফা যোগ হয় এবং চাকরি শেষে পুরোটা ফেরত পাওয়া যায়।", "A savings fund built from subscriptions deducted from government employees' salaries; profit is added every year at government-set rates and the whole balance is paid out when service ends."],
  ["fiscal-year", "অর্থবছর / Fiscal year", "১ জুলাই থেকে ৩০ জুন। GPF-এর প্রতিটি হিসাব এই সময় ধরে হয়, আর মুনাফা যোগ হয় ৩০ জুন।", "1 July to 30 June. Every GPF calculation runs over this period, and profit is added on 30 June."],
  ["opening-balance", "Opening Balance / প্রারম্ভিক জমা", "অর্থবছরের শুরুতে (১ জুলাই) তহবিলে থাকা মোট টাকা — আগের বছরের সমাপনী জমা।", "The total in the fund at the start of the fiscal year (1 July) — last year's closing balance."],
  ["subscription", "Subscription / চাঁদা", "প্রতি মাসে বেতন থেকে GPF-এ কাটা টাকা। সাধারণত মূল বেতনের একটি নির্দিষ্ট শতাংশ।", "The amount deducted from salary into GPF each month, usually a chosen percentage of basic pay."],
  ["advance", "Advance / অগ্রিম", "GPF থেকে ধার হিসেবে নেওয়া টাকা, যা মাসিক কিস্তিতে তহবিলে ফেরত দিতে হয়।", "Money borrowed from your GPF that is repaid to the fund in monthly instalments."],
  ["refund", "Refund / অগ্রিম ফেরত", "অগ্রিমের কিস্তি হিসেবে তহবিলে ফেরত দেওয়া টাকা। জমার মাস থেকে চাঁদার মতোই মুনাফা পায়।", "Advance instalments paid back into the fund. They earn profit from the month paid, like a subscription."],
  ["withdrawal", "Withdrawal / উত্তোলন", "নির্দিষ্ট কারণে তহবিল থেকে তোলা অফেরতযোগ্য টাকা। তোলার মাস থেকে বছরের বাকি সময়ের মুনাফা হারায়।", "A non-refundable amount taken out for a specified purpose. It loses profit for the rest of the year from the month taken."],
  ["slab", "Slab / স্ল্যাব (ধাপ)", "প্রারম্ভিক জমাকে কয়েকটি ধাপে ভাগ করে প্রতিটিতে আলাদা হার — বর্তমানে প্রথম ১৫ লক্ষে ১৩%, পরের ১৫ লক্ষে ১২%, বাকিতে ১১%।", "Splitting the opening balance into bands with different rates — currently 13% on the first 15 lakh, 12% on the next 15 lakh, 11% on the rest."],
  ["marginal-rate", "Marginal rate / প্রান্তিক হার", "প্রারম্ভিক জমা যে ধাপে গিয়ে পৌঁছেছে সেই ধাপের হার। বছরের নতুন চাঁদা সাধারণত এই হারে মুনাফা পায়।", "The rate of the band the opening balance has reached. The year's new subscriptions usually earn this rate."],
  ["month-wise", "Month-wise profit / মাসভিত্তিক মুনাফা", "প্রতিটি মাসের চাঁদা যত মাস তহবিলে থাকে তত মাসের মুনাফা: চাঁদা × হার × (মাস ÷ ১২)। জুলাই ১২ মাস, জুন ১ মাস।", "Each month's subscription earns for the months it stays: subscription × rate × (months ÷ 12). July earns 12 months, June one."],
  ["effective-rate", "Effective rate / কার্যকর হার", "মোট মুনাফাকে মোট টাকা দিয়ে ভাগ করে পাওয়া গড় হার। স্ল্যাব ও মাসভিত্তিক হিসাবের কারণে এটি ঘোষিত হারের চেয়ে কম দেখায়।", "Total profit divided by the total amount. Because of slabs and month-wise profit it looks lower than the headline rate."],
  ["profit-for-the-year", "Profit for the year / বছরের মুনাফা", "প্রারম্ভিক জমার স্ল্যাব মুনাফা + এ বছরের চাঁদার মাসভিত্তিক মুনাফা।", "Slab profit on the opening balance plus month-wise profit on this year's subscriptions."],
  ["truncation", "Truncation / ট্রাংকেট", "দুই দশমিকের পরের অংশ ফেলে দেওয়া (রাউন্ড নয়)। যেমন ১৭৯,৫১৭.১৬৬৪ → ১৭৯,৫১৭.১৬। অফিসিয়াল হিসাব সাধারণত এভাবে হয়।", "Dropping everything past two decimals instead of rounding, e.g. 179,517.1664 → 179,517.16. Official statements usually do this."],
  ["closing-balance", "Closing Balance / সমাপনী জমা", "Opening + Subscription + Refund − Withdrawal + Profit। এটাই পরের বছরের প্রারম্ভিক জমা।", "Opening + Subscription + Refund − Withdrawal + Profit. It becomes next year's opening balance."],
  ["cpf", "CPF / প্রদেয় ভবিষ্য তহবিল", "Contributory Provident Fund — কিছু স্বায়ত্তশাসিত প্রতিষ্ঠানে চালু তহবিল, যেখানে কর্মচারীর সাথে প্রতিষ্ঠানও চাঁদা দেয়। মুনাফার হিসাব অনেকটা একই রকম হতে পারে।", "Contributory Provident Fund — used by some autonomous bodies, where the employer also contributes. Profit can be worked out in a similar way."],
];

export async function generateMetadata() {
  return pageMetadata(await getLang(), "/glossary", COPY);
}

export default async function GlossaryPage() {
  const lang = await getLang();
  const t = tr(lang);
  const pageUrl = absoluteUrl("/glossary", lang);
  const terms = TERMS.map(([id, name, bn, en]) => ({ id, name, text: lang === "en" ? en : bn }));

  const definedTerms = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": pageUrl,
    name: COPY[lang].title,
    inLanguage: lang,
    hasDefinedTerm: terms.map((term) => ({
      "@type": "DefinedTerm",
      "@id": `${pageUrl}#${term.id}`,
      name: term.name,
      description: term.text,
      inDefinedTermSet: pageUrl,
    })),
  };

  return (
    <>
      <JsonLd data={[breadcrumbLd(lang, [{ name: t("GPF পরিভাষা", "GPF glossary"), path: "/glossary" }]), definedTerms]} />
      <PageHero
        lang={lang}
        icon="bi-book-half"
        eyebrow={t("GPF পরিভাষা", "GPF glossary")}
        title={t("GPF-এর শব্দগুলোর সহজ মানে", "GPF terms, in plain words")}
        text={t(
          "স্টেটমেন্ট বা নিয়ম পড়তে গিয়ে যে শব্দগুলো আটকে দেয়, সেগুলো এক জায়গায়।",
          "The words that trip you up on a statement or in the rules, all in one place."
        )}
      />
      <section className="section">
        <div className="container" style={{ maxWidth: 900 }}>
          <nav className="d-flex flex-wrap gap-2 mb-4" aria-label={t("শব্দের তালিকা", "Term list")}>
            {terms.map((term) => (
              <a key={term.id} href={`#${term.id}`} className="badge rounded-pill text-bg-light border text-decoration-none fw-normal py-2 px-3">
                {term.name.split(" / ")[0]}
              </a>
            ))}
          </nav>
          <dl className="d-flex flex-column gap-3 mb-0">
            {terms.map((term) => (
              <div key={term.id} id={term.id} className="feature-card" style={{ scrollMarginTop: 90 }}>
                <dt className="h5 fw-semibold mb-2">{term.name}</dt>
                <dd className="text-secondary mb-0" style={{ lineHeight: 1.85 }}>{term.text}</dd>
              </div>
            ))}
          </dl>
          <div className="info-box mt-4">
            <i className="bi bi-book me-1" />
            {t("নিয়মগুলো বিস্তারিত পড়ুন ", "Read the rules in full in the ")}
            <Link href={localePath("/gpf-guide", lang)}>{t("GPF নির্দেশিকায়", "GPF guide")}</Link>
            {t("।", ".")}
          </div>
        </div>
      </section>
      <CtaBanner lang={lang} />
    </>
  );
}
