import Link from "next/link";
import PageHero from "@/components/public/PageHero";
import CtaBanner from "@/components/public/CtaBanner";
import JsonLd from "@/components/JsonLd";
import { getLang } from "@/lib/lang";
import { tr, localePath } from "@/lib/i18n";
import { SITE, pageMetadata } from "@/lib/site";
import { breadcrumbLd } from "@/lib/seo";

const COPY = {
  bn: {
    title: "আমাদের সম্পর্কে",
    description: "GPF ক্যালকুলেটর কেন ও কীভাবে তৈরি হলো, এর পেছনের মানুষ ও লক্ষ্য।",
  },
  en: {
    title: "About GPF Calculator",
    description: "Why and how GPF Calculator was built, who is behind it and what it aims to do.",
  },
};

export async function generateMetadata() {
  return pageMetadata(await getLang(), "/about", COPY);
}

export default async function AboutPage() {
  const lang = await getLang();
  const t = tr(lang);
  const values = [
    ["bi-bullseye", "", t("নির্ভুলতা", "Accuracy"), t("প্রতিটি নিয়ম বাস্তব স্টেটমেন্টের সাথে পয়সা পর্যন্ত মিলিয়ে তৈরি।", "Every rule was matched to a real statement, to the paisa.")],
    ["bi-eye", "amber", t("স্বচ্ছতা", "Transparency"), t("শুধু ফলাফল নয় — কোন অঙ্ক কোথা থেকে এল, সবটা খুলে দেখানো হয়।", "Not just a result — every figure's origin is shown.")],
    ["bi-translate", "blue", t("বাংলা ও ইংরেজি", "Bangla and English"), t("পুরো অ্যাপ দুই ভাষায়, যাতে সবাই সহজে বুঝতে পারেন।", "The whole app in two languages, so everyone can follow it.")],
    ["bi-heart", "rose", t("বিনামূল্যে", "Free"), t("সহকর্মীদের কাজে লাগবে — এটুকুই উদ্দেশ্য, কোনো ব্যবসা নয়।", "Built to help colleagues — not a business.")],
  ];

  return (
    <>
      <JsonLd data={breadcrumbLd(lang, [{ name: t("আমাদের সম্পর্কে", "About"), path: "/about" }])} />
      <PageHero
        lang={lang}
        icon="bi-people"
        eyebrow={t("আমাদের সম্পর্কে", "About")}
        title={t("একটা স্টেটমেন্ট বোঝার চেষ্টা থেকে শুরু", "It started with trying to understand one statement")}
        text={t(
          "নিজের GPF-এর হিসাব মেলাতে গিয়ে তৈরি হয়েছিল এই ক্যালকুলেটর — এখন সবার জন্য উন্মুক্ত।",
          "This calculator was built to reconcile one person's own GPF — now it's open to everyone."
        )}
      />
      <section className="section">
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="prose">
            <p>
              {t(
                "প্রতি বছর GPF স্টেটমেন্ট হাতে পেয়ে একটা প্রশ্নই মাথায় আসত — মুনাফার এই অঙ্কটা আসলে কীভাবে এল? প্রচলিত ধারণা ছিল চাঁদার উপর ৮.৫% বসে, কিন্তু সেভাবে হিসাব করলে স্টেটমেন্টের সাথে কিছুতেই মিলত না।",
                "Every year the GPF statement raised the same question — where does this profit figure come from? The common belief was that subscriptions earn 8.5%, but calculating that way never matched the statement."
              )}
            </p>
            <p>
              {t(
                "তাই একটা বাস্তব স্টেটমেন্ট ধরে ধরে উল্টো দিক থেকে হিসাব শুরু হলো। বের হলো তিনটা নিয়ম — প্রারম্ভিক জমায় স্ল্যাব হার, নতুন চাঁদায় সর্বোচ্চ ধাপের হার মাস অনুপাতে, আর পয়সার পরের অংশ বাদ। এই তিন নিয়মে হিসাব করতেই স্টেটমেন্টের মুনাফা আর সমাপনী জমা পয়সা পর্যন্ত মিলে গেল।",
                "So a real statement was worked backwards, line by line. Three rules emerged — slab rates on the opening balance, the top band's rate on new subscriptions pro-rated by month, and truncation past the paisa. With those three rules the profit and closing balance matched to the paisa."
              )}
            </p>
            <p>
              {t(
                `মনে হলো, এই সমস্যা শুধু একজনের নয় — হাজারো সরকারি চাকরিজীবী প্রতি বছর একই প্রশ্ন নিয়ে বসে থাকেন। সেই ভাবনা থেকেই ${SITE.name.bn}: যেকোনো চাকরিজীবী নিজের অ্যাকাউন্টে বছরের পর বছর নিজের ভবিষ্য তহবিলের হিসাব রাখতে, মিলিয়ে দেখতে আর বুঝতে পারবেন।`,
                `It clearly wasn't one person's problem — thousands of government employees face the same question every year. Hence ${SITE.name.en}: anyone can keep, check and understand their provident fund, year after year, in their own account.`
              )}
            </p>
          </div>

          <div className="row g-4 my-4">
            {values.map(([icon, color, title, text]) => (
              <div className="col-sm-6" key={title}>
                <div className="feature-card">
                  <div className={`feature-icon ${color}`}>
                    <i className={`bi ${icon}`} />
                  </div>
                  <h2 className="h5 fw-semibold">{title}</h2>
                  <p className="text-secondary mb-0">{text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="card">
            <div className="card-body d-flex flex-wrap align-items-center gap-3">
              <div className="brand-mark" style={{ width: 56, height: 56, fontSize: "1.5rem" }}>
                <i className="bi bi-person" />
              </div>
              <div className="flex-grow-1">
                <div className="fw-semibold fs-5">{SITE.contact.name[lang]}</div>
                <div className="text-secondary small">{t("নির্মাতা ও রক্ষণাবেক্ষণকারী", "Creator and maintainer")}</div>
              </div>
              <Link href={localePath("/contact", lang)} className="btn btn-brand">
                {t("যোগাযোগ করুন", "Get in touch")}
              </Link>
            </div>
          </div>

          <div className="info-box warn mt-4 small">
            <i className="bi bi-info-circle me-1" />
            {t(
              `${SITE.name.bn} একটি ব্যক্তিগত উদ্যোগ। এটি কোনো সরকারি দপ্তর, হিসাবরক্ষণ অফিস বা ব্যাংকের অফিসিয়াল সেবা নয় এবং তাদের সাথে সংশ্লিষ্ট নয়।`,
              `${SITE.name.en} is an independent project. It is not an official service of, or affiliated with, any government office, accounts office or bank.`
            )}
          </div>
        </div>
      </section>
      <CtaBanner lang={lang} />
    </>
  );
}
