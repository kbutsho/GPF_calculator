import PageHero from "@/components/public/PageHero";
import CtaBanner from "@/components/public/CtaBanner";
import JsonLd from "@/components/JsonLd";
import { getLang } from "@/lib/lang";
import { tr } from "@/lib/i18n";
import { pageMetadata } from "@/lib/site";
import { breadcrumbLd } from "@/lib/seo";

const COPY = {
  bn: {
    title: "GPF ক্যালকুলেটরের সুবিধাসমূহ",
    description:
      "স্ল্যাব-ভিত্তিক মুনাফা, মাসভিত্তিক চাঁদার মুনাফা, স্টেটমেন্ট মিলানো, আসল হার খুঁজে বের করা, পরের বছরে ব্যালেন্স নেওয়া — GPF ক্যালকুলেটরের সব সুবিধা।",
    keywords: ["GPF অ্যাপ", "GPF সফটওয়্যার"],
  },
  en: {
    title: "GPF Calculator features",
    description:
      "Slab-based profit, month-wise subscription profit, statement matching, finding the real rate, carrying balances forward — everything GPF Calculator does.",
    keywords: ["GPF app", "GPF software Bangladesh"],
  },
};

export async function generateMetadata() {
  return pageMetadata(await getLang(), "/features", COPY);
}

export default async function FeaturesPage() {
  const lang = await getLang();
  const t = tr(lang);

  const groups = [
    {
      title: t("হিসাবের ইঞ্জিন", "The calculation engine"),
      items: [
        ["bi-bar-chart-steps", "", t("স্ল্যাব-ভিত্তিক মুনাফা", "Slab-based profit"), t("প্রারম্ভিক জমাকে ধাপে ভাগ করে প্রতিটি ধাপে আলাদা হার বসায়। কোন ধাপে কত টাকা পড়ল আর তাতে কত মুনাফা এল — সব আলাদা লাইনে দেখায়।", "Splits the opening balance into bands and charges each its own rate, showing how much fell in each band and what it earned.")],
        ["bi-plus-slash-minus", "amber", t("ধাপ যোগ/বাদ, হার বদল", "Edit bands and rates"), t("ধাপের পরিমাণ ও হার নিজের মতো বদলান, নতুন ধাপ যোগ করুন। সরকার হার বদলালে অ্যাপ আপডেটের অপেক্ষা করতে হবে না।", "Change band sizes and rates or add new bands — no need to wait for an app update when the government revises rates.")],
        ["bi-calendar3", "blue", t("মাস অনুপাতে চাঁদার মুনাফা", "Month-wise subscription profit"), t("জুলাইয়ে জমা হওয়া চাঁদা ১২ মাস, আগস্টের ১১ মাস… জুনের ১ মাস — প্রতিটি মাসের চাঁদা যত মাস তহবিলে ছিল, ঠিক ততটুকুর মুনাফা।", "July's subscription earns 12 months, August's 11 … June's one — each month earns exactly for the time it was in the fund.")],
        ["bi-arrow-left-right", "rose", t("রিফান্ড ও উত্তোলন", "Refunds and withdrawals"), t("অগ্রিম ফেরত (রিফান্ড) জমার মতো মুনাফা পায়; উত্তোলন করা টাকা বাকি মাসগুলোর মুনাফা হারায় — দুটোই মাস ধরে হিসাব হয়।", "Advance repayments earn profit like deposits; withdrawn money loses the remaining months' profit — both by month.")],
        ["bi-scissors", "", t("ট্রাংকেট নাকি রাউন্ড", "Truncate or round"), t("অফিসিয়াল স্টেটমেন্ট পয়সার পরের অংশ ফেলে দেয়। চাইলে রাউন্ডও বেছে নিতে পারেন।", "Official statements drop everything past the paisa. You can switch to rounding if your fund rounds.")],
        ["bi-shuffle", "amber", t("তিন পদ্ধতির তুলনা", "Compare three methods"), t("মাস অনুপাতে, পুরো বছর ফ্ল্যাট, আর অর্ধ-বছর — একই ডেটায় তিনভাবে মুনাফা কত হয় পাশাপাশি দেখুন।", "Month-wise, flat full-year and half-year — see the profit from the same data three ways, side by side.")],
      ],
    },
    {
      title: t("স্টেটমেন্ট যাচাই", "Statement checking"),
      items: [
        ["bi-clipboard-check", "blue", t("এক নজরে মিল/অমিল", "Match at a glance"), t("স্টেটমেন্টের Profit for the year আর Closing Balance বসালেই সবুজ টিক বা পার্থক্যের পরিমাণ দেখায়।", "Enter the statement's Profit for the year and Closing Balance to get a green tick or the exact difference.")],
        ["bi-search", "", t("আসল হার খুঁজে বের করা", "Find the real rate"), t("না মিললে অ্যাপ উল্টো দিক থেকে হিসাব করে বলে দেয় ফান্ড চাঁদার উপর আসলে কত শতাংশ হার বসিয়েছে — এক ক্লিকে সেই হার বসানোও যায়।", "If it doesn't match, the app works backwards to the rate the fund actually applied — and sets it with one click.")],
        ["bi-journal-text", "amber", t("ধাপে ধাপে ব্যাখ্যা", "Step-by-step explanation"), t("“হিসাবটা কীভাবে হলো” অংশে প্রতিটি সূত্র আর অঙ্ক খুলে দেখানো হয় — অফিসে প্রশ্ন তুলতে হলে হাতে প্রমাণ থাকে।", "“How was this calculated” lays out every formula and figure — evidence in hand if you need to query the office.")],
      ],
    },
    {
      title: t("আপনার অ্যাকাউন্ট", "Your account"),
      items: [
        ["bi-speedometer2", "rose", t("ব্যক্তিগত ড্যাশবোর্ড", "Personal dashboard"), t("সর্বশেষ সমাপনী জমা, মোট মুনাফা, বছরওয়ারি বৃদ্ধি — সব এক পাতায়।", "Latest closing balance, total profit and year-by-year growth on one page.")],
        ["bi-arrow-right-circle", "", t("পরের বছরে নিয়ে যাওয়া", "Carry forward"), t("এক ক্লিকে এ বছরের সমাপনী জমা পরের বছরের প্রারম্ভিক জমা হয়ে যায়, সাথে স্ল্যাব আর সেটিংসও।", "One click turns this year's closing balance into next year's opening balance, settings included.")],
        ["bi-phone", "blue", t("মোবাইল বা ইমেইলে লগইন", "Log in by mobile or email"), t("রেজিস্ট্রেশনের মোবাইল নম্বর বা ইমেইল — যেটা মনে থাকে সেটা দিয়েই ঢুকুন। ফোন, ট্যাবলেট, কম্পিউটার সবখানে চলে।", "Use whichever you remember — mobile number or email. Works on phones, tablets and computers.")],
        ["bi-translate", "amber", t("বাংলা ও ইংরেজি", "Bangla and English"), t("পুরো সিস্টেম দুই ভাষায় — এক ক্লিকে বদলান।", "The whole system in two languages — switch with one click.")],
        ["bi-shield-lock", "", t("গোপনীয়তা", "Privacy"), t("আপনার হিসাব শুধু আপনার। পাসওয়ার্ড এনক্রিপ্ট করে রাখা হয়, কোনো তথ্য বিক্রি বা শেয়ার করা হয় না।", "Your figures are yours alone. Passwords are encrypted and nothing is sold or shared.")],
        ["bi-printer", "rose", t("প্রিন্ট-বান্ধব ও ফ্রি", "Printable and free"), t("প্রিন্ট বাটনে শুধু হিসাবটুকু পরিষ্কারভাবে ছাপা হয়। কোনো চার্জ বা বিজ্ঞাপন নেই।", "Print gives a clean copy of just the calculation. No charges, no ads.")],
      ],
    },
  ];

  return (
    <>
      <JsonLd data={breadcrumbLd(lang, [{ name: t("সুবিধাসমূহ", "Features"), path: "/features" }])} />
      <PageHero
        lang={lang}
        icon="bi-grid"
        eyebrow={t("সুবিধাসমূহ", "Features")}
        title={t("আপনার ভবিষ্য তহবিলের পূর্ণাঙ্গ হিসাবখাতা", "A complete ledger for your provident fund")}
        text={t(
          "সঠিক হিসাব, স্বচ্ছ ব্যাখ্যা আর বছরের পর বছর সংরক্ষণ — যা যা দরকার সবই এক জায়গায়।",
          "Accurate numbers, transparent working and year-after-year records — everything in one place."
        )}
      />
      {groups.map((g, gi) => (
        <section className={`section ${gi % 2 ? "section-alt" : ""}`} key={g.title}>
          <div className="container">
            <h2 className="section-title mb-4">{g.title}</h2>
            <div className="row g-4">
              {g.items.map(([icon, color, title, text]) => (
                <div className="col-md-6 col-lg-4" key={title}>
                  <div className="feature-card">
                    <div className={`feature-icon ${color}`}>
                      <i className={`bi ${icon}`} />
                    </div>
                    <h3 className="h5 fw-semibold">{title}</h3>
                    <p className="text-secondary mb-0">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
      <CtaBanner lang={lang} />
    </>
  );
}
