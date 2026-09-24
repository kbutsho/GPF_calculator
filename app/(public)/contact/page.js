import PageHero from "@/components/public/PageHero";
import JsonLd from "@/components/JsonLd";
import { getLang } from "@/lib/lang";
import { tr } from "@/lib/i18n";
import { SITE, pageMetadata } from "@/lib/site";
import { breadcrumbLd } from "@/lib/seo";

const COPY = {
  bn: {
    title: "যোগাযোগ",
    description: "GPF ক্যালকুলেটর নিয়ে প্রশ্ন, মতামত বা সাহায্যের জন্য ফোন, হোয়াটসঅ্যাপ বা ইমেইলে যোগাযোগ করুন।",
  },
  en: {
    title: "Contact",
    description: "Questions, feedback or help with GPF Calculator — reach us by phone, WhatsApp or email.",
  },
};

export async function generateMetadata() {
  return pageMetadata(await getLang(), "/contact", COPY);
}

export default async function ContactPage() {
  const lang = await getLang();
  const t = tr(lang);
  const c = SITE.contact;
  const cards = [
    { icon: "bi-telephone", title: t("ফোন করুন", "Call"), value: c.phone, hint: t("সরাসরি কথা বলুন", "Talk to us directly"), href: `tel:${c.phoneIntl}` },
    {
      icon: "bi-whatsapp",
      color: "blue",
      title: t("হোয়াটসঅ্যাপ", "WhatsApp"),
      value: c.phone,
      hint: t("মেসেজ দিন, সুবিধামতো উত্তর দেওয়া হবে", "Send a message, we'll reply when we can"),
      href: `https://wa.me/${c.whatsapp}`,
      external: true,
    },
    {
      icon: "bi-envelope",
      color: "amber",
      title: t("ইমেইল", "Email"),
      value: c.email,
      hint: t("বিস্তারিত লিখে পাঠান", "Write in detail"),
      href: `mailto:${c.email}?subject=${encodeURIComponent("GPF Calculator")}`,
    },
  ];

  return (
    <>
      <JsonLd data={breadcrumbLd(lang, [{ name: t("যোগাযোগ", "Contact"), path: "/contact" }])} />
      <PageHero
        lang={lang}
        icon="bi-chat-dots"
        eyebrow={t("যোগাযোগ", "Contact")}
        title={t("প্রশ্ন, মতামত বা সাহায্য — জানান", "Questions, feedback or help — get in touch")}
        text={t(
          "হিসাব মিলছে না, নতুন কোনো সুবিধা চান, বা পাসওয়ার্ড রিসেট দরকার — যেকোনো মাধ্যমে যোগাযোগ করুন।",
          "Figures not matching, want a new feature, or need a password reset — reach us any way you like."
        )}
      />
      <section className="section">
        <div className="container" style={{ maxWidth: 1000 }}>
          <div className="text-center mb-4">
            <div className="brand-mark mb-2" style={{ width: 64, height: 64, fontSize: "1.8rem" }}>
              <i className="bi bi-person" />
            </div>
            <h2 className="h3 fw-bold mb-0">{c.name[lang]}</h2>
            <div className="text-secondary">
              {lang === "en" ? c.name.bn : c.name.en} • {t("নির্মাতা", "Creator")}, {SITE.name[lang]}
            </div>
          </div>

          <div className="row g-4 mb-5">
            {cards.map((card) => (
              <div className="col-md-4" key={card.title}>
                <a
                  className="contact-card text-center"
                  href={card.href}
                  {...(card.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <div className={`feature-icon mx-auto ${card.color || ""}`}>
                    <i className={`bi ${card.icon}`} />
                  </div>
                  <h3 className="h5 fw-semibold mb-1">{card.title}</h3>
                  <div className="fw-semibold text-success text-break">{card.value}</div>
                  <div className="small text-secondary mt-1">{card.hint}</div>
                </a>
              </div>
            ))}
          </div>

          <div className="row g-4">
            <div className="col-lg-6">
              <div className="feature-card">
                <h3 className="h5 fw-semibold">
                  <i className="bi bi-list-check me-2 text-success" />
                  {t("যোগাযোগের সময় যা জানালে সুবিধা হয়", "Helpful to include")}
                </h3>
                <ul className="text-secondary mb-0">
                  <li>{t("যে মোবাইল নম্বর/ইমেইলে অ্যাকাউন্ট খুলেছেন", "The mobile number/email on your account")}</li>
                  <li>{t("কোন অর্থবছরের হিসাব নিয়ে প্রশ্ন", "Which fiscal year you're asking about")}</li>
                  <li>{t("স্টেটমেন্টের সাথে কত টাকার পার্থক্য হচ্ছে", "How far off the statement you are")}</li>
                  <li>{t("সম্ভব হলে স্ক্রিনশট", "A screenshot if possible")}</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="feature-card">
                <h3 className="h5 fw-semibold">
                  <i className="bi bi-shield-exclamation me-2 text-warning" />
                  {t("সতর্কতা", "Be careful")}
                </h3>
                <p className="text-secondary mb-0">
                  {t(
                    `আমরা কখনো আপনার পাসওয়ার্ড, ব্যাংক কার্ড বা OTP জানতে চাইব না। কেউ ${SITE.name.bn}-এর নাম করে এসব চাইলে দেবেন না।`,
                    `We will never ask for your password, bank card or OTP. If anyone asks for these in ${SITE.name.en}'s name, don't share them.`
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
