import Link from "next/link";
import PageHero from "@/components/public/PageHero";
import CtaBanner from "@/components/public/CtaBanner";
import JsonLd from "@/components/JsonLd";
import { getLang } from "@/lib/lang";
import { tr, localePath } from "@/lib/i18n";
import { SITE, pageMetadata } from "@/lib/site";
import { breadcrumbLd, faqLd } from "@/lib/seo";

const COPY = {
  bn: {
    title: "GPF প্রশ্নোত্তর — সাধারণ ভবিষ্য তহবিলের মুনাফা নিয়ে সচরাচর প্রশ্ন",
    description:
      "GPF-এর মুনাফা কীভাবে হিসাব হয়, চাঁদায় কত হার বসে, স্টেটমেন্ট কেন মেলে না, অগ্রিম-উত্তোলনে কী হয় — GPF ক্যালকুলেটর ও ভবিষ্য তহবিল নিয়ে সব প্রশ্নের উত্তর।",
  },
  en: {
    title: "GPF FAQ — common questions on General Provident Fund profit",
    description:
      "How GPF profit is calculated, what rate subscriptions earn, why statements don't match, what advances and withdrawals do — answers about GPF Calculator and the provident fund.",
  },
};

export async function generateMetadata() {
  return pageMetadata(await getLang(), "/faq", COPY);
}

export default async function FaqPage() {
  const lang = await getLang();
  const t = tr(lang);

  const sections = [
    {
      title: t("অ্যাপ ও অ্যাকাউন্ট", "App and account"),
      items: [
        [t("GPF ক্যালকুলেটর ব্যবহার করতে কি টাকা লাগে?", "Does GPF Calculator cost anything?"), t("না, সম্পূর্ণ বিনামূল্যে। কোনো সাবস্ক্রিপশন, লুকানো চার্জ বা বিজ্ঞাপন নেই।", "No, it's completely free — no subscription, hidden charges or ads.")],
        [t("অ্যাকাউন্ট খুলতে কী কী লাগে?", "What do I need to sign up?"), t("শুধু নাম, মোবাইল নম্বর আর একটি পাসওয়ার্ড। ইমেইল ঐচ্ছিক — দিলে ইমেইল দিয়েও লগইন করতে পারবেন।", "Just your name, mobile number and a password. Email is optional — add it to log in by email too.")],
        [t("লগইন কীভাবে করব?", "How do I log in?"), t("রেজিস্ট্রেশনের মোবাইল নম্বর (যেমন 01XXXXXXXXX) অথবা ইমেইল, আর পাসওয়ার্ড দিয়ে। +880 দিয়ে লিখলেও চলবে।", "With your registered mobile number (e.g. 01XXXXXXXXX) or email, and your password. +880 format works too.")],
        [t("পাসওয়ার্ড ভুলে গেলে কী করব?", "I forgot my password — what now?"), t(`যোগাযোগ পেজের নম্বর বা ইমেইলে (${SITE.contact.email}) যোগাযোগ করুন — অ্যাকাউন্ট যাচাই করে পাসওয়ার্ড রিসেটে সাহায্য করা হবে। লগইন অবস্থায় প্রোফাইল পেজ থেকে নিজেই পাসওয়ার্ড বদলাতে পারবেন।`, `Contact us by phone or email (${SITE.contact.email}) — we'll verify your account and help reset it. While logged in, you can change it yourself on the profile page.`)],
        [t("লগইন ছাড়া কি হিসাব করা যায়?", "Can I calculate without logging in?"), t("না। হিসাবগুলো আপনার ব্যক্তিগত আর্থিক তথ্য, তাই এগুলো শুধু লগইন করা ড্যাশবোর্ডেই থাকে। পাবলিক পেজে শুধু নিয়ম ও উদাহরণ দেখানো হয়।", "No. Your figures are personal financial data, so they live only in your logged-in dashboard. Public pages show rules and examples only.")],
        [t("ইংরেজিতে ব্যবহার করা যায়?", "Is it available in English?"), t("হ্যাঁ। উপরের বাংলা/EN বোতামে চাপলেই পুরো সিস্টেম ইংরেজিতে চলে যায়। ডিফল্ট ভাষা বাংলা।", "Yes. Use the বাংলা/EN switch at the top to change the whole system to English. Bangla is the default.")],
        [t("মোবাইলে কি চলবে?", "Does it work on mobile?"), t("হ্যাঁ। ফোন, ট্যাবলেট ও কম্পিউটার — যেকোনো আধুনিক ব্রাউজারে চলে, কিছু ইনস্টল করতে হয় না।", "Yes — on phones, tablets and computers in any modern browser, with nothing to install.")],
      ],
    },
    {
      title: t("তথ্য ও নিরাপত্তা", "Data and security"),
      items: [
        [t("আমার হিসাব কি অন্য কেউ দেখতে পাবে?", "Can anyone else see my figures?"), t("না। প্রতিটি হিসাব আপনার অ্যাকাউন্টের সাথে যুক্ত, এবং সার্ভার প্রতিটি অনুরোধে যাচাই করে যে হিসাবটা আপনার কিনা। শুধু সাপোর্টের প্রয়োজনে সাইটের অ্যাডমিন অ্যাকাউন্টের তথ্য দেখতে পারেন।", "No. Every calculation is tied to your account and the server checks ownership on every request. Only the site administrator can view accounts, for support.")],
        [t("পাসওয়ার্ড কীভাবে রাখা হয়?", "How are passwords stored?"), t("পাসওয়ার্ড কখনো সরাসরি সংরক্ষণ করা হয় না — এনক্রিপ্ট (bcrypt hash) করে রাখা হয়, তাই কেউ আপনার আসল পাসওয়ার্ড দেখতে পারে না।", "Never in plain text — only as an encrypted bcrypt hash, so nobody can see your actual password.")],
        [t("অ্যাকাউন্ট নম্বর দেওয়া কি বাধ্যতামূলক?", "Do I have to give my account number?"), t("না। গ্রাহকের নাম ও অ্যাকাউন্ট নম্বর দুটোই ঐচ্ছিক।", "No. Subscriber name and account number are both optional.")],
        [t("হিসাব মুছে ফেলতে পারব?", "Can I delete my data?"), t("হ্যাঁ, যেকোনো বছরের হিসাব খুলে “মুছে ফেলুন” চাপলেই স্থায়ীভাবে মুছে যাবে। পুরো অ্যাকাউন্ট মুছতে চাইলে যোগাযোগ করুন।", "Yes — open any year and click “Delete” to remove it permanently. Contact us to delete your whole account.")],
      ],
    },
    {
      title: t("হিসাবের নিয়ম", "Calculation rules"),
      items: [
        [t("প্রারম্ভিক জমার মুনাফা কীভাবে হিসাব হয়?", "How is profit on the opening balance calculated?"), t("স্ল্যাব পদ্ধতিতে: প্রথম ১৫ লক্ষে ১৩%, পরের ১৫ লক্ষে ১২%, বাকি অংশে ১১%। প্রতিটি ধাপ আলাদা হিসাব হয়ে যোগ হয়।", "By slabs: 13% on the first 15 lakh, 12% on the next 15 lakh, 11% on the rest. Each band is calculated separately and added up.")],
        [t("চাঁদার উপর ৮.৫% নাকি অন্য হার?", "Do subscriptions earn 8.5% or another rate?"), t("একটি বাস্তব স্টেটমেন্ট বিশ্লেষণে দেখা গেছে চাঁদা পায় প্রারম্ভিক জমা যে ধাপে পৌঁছেছে সেই ধাপের হার (যেমন ৩০ লক্ষের বেশি জমায় ১১%)। কোনো ৮.৫% হিসাব ঐ স্টেটমেন্টের সাথে মেলেনি।", "Analysis of a real statement showed subscriptions earn the rate of the band the opening balance has reached (e.g. 11% above 30 lakh). No 8.5% variant matched that statement.")],
        [t("জুনের চাঁদা কি পুরো বছরের মুনাফা পায়?", "Does June's subscription earn a full year?"), t("না। প্রতিটি মাসের চাঁদা যত মাস তহবিলে থাকে তত মাসের মুনাফা পায় — জুলাই ১২ মাস, জুন মাত্র ১ মাস।", "No. Each month earns only for the months it's in the fund — July 12 months, June just one.")],
        [t("হিসাব স্টেটমেন্ট থেকে এক পয়সা কম-বেশি কেন?", "Why is my result one paisa off the statement?"), t("অফিসিয়াল হিসাব সাধারণত দুই দশমিকের পরের অংশ ফেলে দেয় (ট্রাংকেট)। “পয়সার নিয়ম” ট্রাংকেট রাখলে মিলে যাওয়ার কথা।", "The official calculation usually drops everything past two decimals (truncation). Keep the rounding rule on “truncate” and it should match.")],
        [t("হিসাব স্টেটমেন্টের সাথে মিলছে না, কী করব?", "My result doesn't match the statement — what should I do?"), t("“রিপোর্টের সাথে মিলিয়ে দেখুন” অংশে স্টেটমেন্টের Profit for the year বসান। অ্যাপ পার্থক্য দেখাবে এবং ফান্ড আসলে কোন হার ব্যবহার করেছে তা বের করে দেবে।", "Enter the statement's Profit for the year in the “Check against the statement” section. The app shows the difference and works out the rate the fund actually used.")],
        [t("অগ্রিম নিলে বা টাকা তুললে কীভাবে হিসাব হবে?", "How are advances and withdrawals handled?"), t("উত্তোলনের মাসে “উত্তোলন” ঘরে অঙ্কটা লিখুন — ঐ টাকা বাকি মাসগুলোর মুনাফা হারাবে। অগ্রিমের কিস্তি ফেরত দিলে সেটা “রিফান্ড” ঘরে লিখুন।", "Enter a withdrawal in its month's “Withdrawal” box — it loses the remaining months' profit. Advance repayments go in “Refund”.")],
        [t("সরকার হার বদলালে কী হবে?", "What if the government changes the rates?"), t("স্ল্যাবের পরিমাণ ও হার আপনি নিজেই বদলাতে পারেন, নতুন ধাপ যোগ করতে পারেন। প্রতিটি বছরের সেটিংস আলাদা সংরক্ষিত থাকে।", "You can edit band sizes and rates or add bands yourself. Each year keeps its own settings.")],
        [t("এই হিসাব কি অফিসিয়াল?", "Is this an official calculation?"), t("না। এটি একটি ব্যক্তিগত উদ্যোগের সহায়ক টুল। অফিসিয়াল হিসাবের জন্য আপনার হিসাবরক্ষণ অফিসের স্টেটমেন্টই চূড়ান্ত।", "No. It's an independent helper tool; your accounts office statement is final for official purposes.")],
      ],
    },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd(lang, [{ name: t("প্রশ্নোত্তর", "FAQ"), path: "/faq" }]),
          faqLd(sections.flatMap((s) => s.items)),
        ]}
      />
      <PageHero
        lang={lang}
        icon="bi-question-circle"
        eyebrow={t("প্রশ্নোত্তর", "FAQ")}
        title={t("GPF নিয়ে সচরাচর জিজ্ঞাসিত প্রশ্ন", "Frequently asked questions about GPF")}
        text={t(
          "অ্যাকাউন্ট, নিরাপত্তা আর হিসাবের নিয়ম নিয়ে সবচেয়ে বেশি যা জানতে চাওয়া হয়।",
          "The most common questions about accounts, security and the calculation rules."
        )}
      />
      <section className="section">
        <div className="container" style={{ maxWidth: 900 }}>
          {sections.map((s) => (
            <div className="mb-5" key={s.title}>
              <h2 className="section-title h4 mb-3">{s.title}</h2>
              {s.items.map(([q, a]) => (
                <details className="faq-item" key={q}>
                  <summary>{q}</summary>
                  <div className="faq-body">{a}</div>
                </details>
              ))}
            </div>
          ))}
          <div className="info-box">
            <i className="bi bi-chat-dots me-1" />
            {t("আপনার প্রশ্নের উত্তর এখানে নেই? ", "Didn't find your answer? ")}
            <Link href={localePath("/contact", lang)}>{t("যোগাযোগ করুন", "Get in touch")}</Link>
            {t(" — যত দ্রুত সম্ভব উত্তর দেওয়া হবে।", " — we'll reply as soon as we can.")}
          </div>
        </div>
      </section>
      <CtaBanner lang={lang} />
    </>
  );
}
