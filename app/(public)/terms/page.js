import PageHero from "@/components/public/PageHero";
import JsonLd from "@/components/JsonLd";
import { getLang } from "@/lib/lang";
import { tr } from "@/lib/i18n";
import { SITE, pageMetadata } from "@/lib/site";
import { breadcrumbLd } from "@/lib/seo";

const COPY = {
  bn: { title: "ব্যবহারের শর্তাবলি", description: "GPF ক্যালকুলেটর ব্যবহারের শর্তাবলি ও দায়সীমা।" },
  en: { title: "Terms of use", description: "Terms of use and limitation of liability for GPF Calculator." },
};

export async function generateMetadata() {
  return pageMetadata(await getLang(), "/terms", COPY);
}

export default async function TermsPage() {
  const lang = await getLang();
  const t = tr(lang);
  const c = SITE.contact;
  return (
    <>
      <JsonLd data={breadcrumbLd(lang, [{ name: COPY[lang].title, path: "/terms" }])} />
      <PageHero lang={lang} icon="bi-file-text" eyebrow={COPY[lang].title} title={t("ব্যবহারের আগে জেনে নিন", "Please read before using")} />
      <section className="section">
        <div className="container prose" style={{ maxWidth: 860 }}>
          <p className="text-secondary">{t("সর্বশেষ হালনাগাদ: ২৪ সেপ্টেম্বর ২০২৬", "Last updated: 24 September 2026")}</p>

          <h2>{t("সেবার ধরন", "The service")}</h2>
          <p>
            {t(
              `${SITE.name.bn} একটি বিনামূল্যের সহায়ক টুল, যা সাধারণ ভবিষ্য তহবিলের বছর সমাপনী মুনাফা ও জমা আনুমানিক হিসাব করতে সাহায্য করে। এটি কোনো সরকারি দপ্তর বা হিসাবরক্ষণ অফিসের অফিসিয়াল সেবা নয়।`,
              `${SITE.name.en} is a free helper tool that estimates General Provident Fund year-end profit and balances. It is not an official service of any government office or accounts office.`
            )}
          </p>

          <h2>{t("হিসাবের দায়সীমা", "Limitation of liability")}</h2>
          <p>
            {t(
              "হিসাবের ফলাফল আপনার দেওয়া তথ্য ও নির্বাচিত নিয়মের উপর নির্ভর করে। নিয়ম ও হার সময়ে সময়ে বদলাতে পারে। তাই অফিসিয়াল উদ্দেশ্যে আপনার হিসাবরক্ষণ অফিসের স্টেটমেন্টই চূড়ান্ত বলে গণ্য হবে। এই টুলের ফলাফলের ভিত্তিতে নেওয়া কোনো আর্থিক সিদ্ধান্তের দায় নির্মাতার উপর বর্তাবে না।",
              "Results depend on the figures you enter and the rules you choose, and rules and rates can change. For official purposes your accounts office statement is final. The creator is not responsible for financial decisions made on the basis of this tool."
            )}
          </p>

          <h2>{t("আপনার দায়িত্ব", "Your responsibilities")}</h2>
          <ul>
            <li>{t("সঠিক তথ্য দিয়ে অ্যাকাউন্ট খুলুন এবং পাসওয়ার্ড গোপন রাখুন।", "Sign up with accurate details and keep your password secret.")}</li>
            <li>{t("অন্যের নামে বা অনুমতি ছাড়া অন্যের তথ্য দিয়ে অ্যাকাউন্ট খুলবেন না।", "Don't create accounts in someone else's name or with their data without permission.")}</li>
            <li>{t("সেবার অপব্যবহার, অননুমোদিত প্রবেশের চেষ্টা বা ক্ষতিকর কাজ করবেন না।", "Don't misuse the service, attempt unauthorised access or do anything harmful.")}</li>
          </ul>

          <h2>{t("অ্যাকাউন্ট স্থগিত", "Suspension")}</h2>
          <p>{t("শর্ত ভঙ্গ হলে বা অপব্যবহারের প্রমাণ পেলে অ্যাকাউন্ট নিষ্ক্রিয় করা হতে পারে।", "Accounts may be deactivated if these terms are broken or abuse is found.")}</p>

          <h2>{t("সেবার পরিবর্তন", "Changes to the service")}</h2>
          <p>{t("সেবা উন্নত করতে সুবিধা যোগ, বদল বা বন্ধ করা হতে পারে। গুরুত্বপূর্ণ পরিবর্তন এই পেজে জানানো হবে।", "Features may be added, changed or removed to improve the service. Important changes will be posted here.")}</p>

          <h2>{t("যোগাযোগ", "Contact")}</h2>
          <p>
            {c.name[lang]}, <a href={`mailto:${c.email}`}>{c.email}</a>, {c.phone}
          </p>
        </div>
      </section>
    </>
  );
}
