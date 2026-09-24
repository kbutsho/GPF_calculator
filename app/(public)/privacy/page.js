import PageHero from "@/components/public/PageHero";
import JsonLd from "@/components/JsonLd";
import { getLang } from "@/lib/lang";
import { tr } from "@/lib/i18n";
import { SITE, pageMetadata } from "@/lib/site";
import { breadcrumbLd } from "@/lib/seo";

const COPY = {
  bn: { title: "গোপনীয়তা নীতি", description: "GPF ক্যালকুলেটর আপনার কোন তথ্য রাখে, কেন রাখে এবং কীভাবে সুরক্ষিত রাখে।" },
  en: { title: "Privacy policy", description: "What data GPF Calculator keeps, why, and how it is protected." },
};

export async function generateMetadata() {
  return pageMetadata(await getLang(), "/privacy", COPY);
}

export default async function PrivacyPage() {
  const lang = await getLang();
  const t = tr(lang);
  const c = SITE.contact;
  return (
    <>
      <JsonLd data={breadcrumbLd(lang, [{ name: COPY[lang].title, path: "/privacy" }])} />
      <PageHero lang={lang} icon="bi-shield-lock" eyebrow={COPY[lang].title} title={t("আপনার তথ্য, আপনারই", "Your data stays yours")} />
      <section className="section">
        <div className="container prose" style={{ maxWidth: 860 }}>
          <p className="text-secondary">{t("সর্বশেষ হালনাগাদ: ২৪ সেপ্টেম্বর ২০২৬", "Last updated: 24 September 2026")}</p>

          <h2>{t("আমরা যে তথ্য রাখি", "What we keep")}</h2>
          <ul>
            <li>{t("অ্যাকাউন্টের তথ্য: নাম, মোবাইল নম্বর, ইমেইল (ঐচ্ছিক), পদবি ও অফিস (ঐচ্ছিক)।", "Account details: name, mobile number, email (optional), designation and office (optional).")}</li>
            <li>{t("পাসওয়ার্ড: এনক্রিপ্ট করা (bcrypt hash) অবস্থায় — আসল পাসওয়ার্ড কেউ দেখতে পারে না।", "Password: only as an encrypted bcrypt hash — nobody can see the real password.")}</li>
            <li>{t("হিসাবের তথ্য: আপনি যা বসান — অর্থবছর, প্রারম্ভিক জমা, মাসিক চাঁদা, স্ল্যাব, নোট ইত্যাদি।", "Calculation data: what you enter — fiscal year, opening balance, monthly subscriptions, slabs, notes.")}</li>
            <li>{t("শেষ লগইনের সময়।", "The time of your last login.")}</li>
          </ul>

          <h2>{t("কেন রাখি", "Why we keep it")}</h2>
          <p>
            {t(
              "শুধু আপনাকে লগইন করাতে, আপনার হিসাব সংরক্ষণ ও দেখাতে, এবং আপনি যোগাযোগ করলে সাহায্য করতে। বিজ্ঞাপন, মার্কেটিং বা অন্য কোনো উদ্দেশ্যে আপনার তথ্য ব্যবহার করা হয় না।",
              "Only to log you in, store and show your calculations, and help you when you contact us. Your data is never used for advertising, marketing or anything else."
            )}
          </p>

          <h2>{t("কারা দেখতে পারে", "Who can see it")}</h2>
          <p>
            {t(
              "আপনার হিসাব আপনি লগইন করে দেখতে পারেন। সাপোর্ট ও অপব্যবহার রোধের প্রয়োজনে সাইটের অ্যাডমিন অ্যাকাউন্টের তথ্য দেখতে পারেন। আপনার তথ্য কোনো তৃতীয় পক্ষের কাছে বিক্রি, ভাড়া বা শেয়ার করা হয় না; আইনগত বাধ্যবাধকতা থাকলে কেবল সেই পরিমাণ তথ্য প্রকাশ করা হতে পারে।",
              "You can see your figures when logged in. The site administrator can view account data for support and to prevent abuse. Your data is never sold, rented or shared with third parties, except where the law requires it."
            )}
          </p>

          <h2>{t("কুকি", "Cookies")}</h2>
          <p>
            {t(
              "লগইন ধরে রাখার জন্য একটি প্রয়োজনীয় কুকি (৩০ দিন, HttpOnly) এবং আপনার পছন্দের ভাষা মনে রাখার জন্য একটি কুকি ব্যবহার হয়। কোনো ট্র্যাকিং বা বিজ্ঞাপনী কুকি নেই।",
              "We use one essential cookie to keep you logged in (30 days, HttpOnly) and one to remember your language. No tracking or advertising cookies."
            )}
          </p>

          <h2>{t("তথ্য মুছে ফেলা", "Deleting your data")}</h2>
          <p>
            {t("যেকোনো বছরের হিসাব আপনি নিজেই মুছতে পারেন। পুরো অ্যাকাউন্ট মুছতে চাইলে ", "You can delete any year yourself. To delete your whole account, write to ")}
            <a href={`mailto:${c.email}`}>{c.email}</a>
            {t(` ঠিকানায় বা ${c.phone} নম্বরে যোগাযোগ করুন।`, ` or call ${c.phone}.`)}
          </p>

          <h2>{t("পরিবর্তন", "Changes")}</h2>
          <p>{t("এই নীতিতে পরিবর্তন হলে এই পেজেই হালনাগাদ তারিখসহ জানানো হবে।", "Any change to this policy will be posted here with a new date.")}</p>
        </div>
      </section>
    </>
  );
}
