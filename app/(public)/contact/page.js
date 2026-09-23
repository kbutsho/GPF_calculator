import PageHero from "@/components/public/PageHero";
import { SITE, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "যোগাযোগ",
  description: "GPF ক্যালকুলেটর নিয়ে প্রশ্ন, মতামত বা সাহায্যের জন্য ফোন, হোয়াটসঅ্যাপ বা ইমেইলে যোগাযোগ করুন।",
  path: "/contact",
});

export default function ContactPage() {
  const c = SITE.contact;
  const cards = [
    {
      icon: "bi-telephone",
      title: "ফোন করুন",
      value: c.phone,
      hint: "সরাসরি কথা বলুন",
      href: `tel:${c.phoneIntl}`,
    },
    {
      icon: "bi-whatsapp",
      color: "blue",
      title: "হোয়াটসঅ্যাপ",
      value: c.phone,
      hint: "মেসেজ দিন, সুবিধামতো উত্তর দেওয়া হবে",
      href: `https://wa.me/${c.whatsapp}`,
      external: true,
    },
    {
      icon: "bi-envelope",
      color: "amber",
      title: "ইমেইল",
      value: c.email,
      hint: "বিস্তারিত লিখে পাঠান",
      href: `mailto:${c.email}?subject=${encodeURIComponent("GPF ক্যালকুলেটর")}`,
    },
  ];

  return (
    <>
      <PageHero
        icon="bi-chat-dots"
        eyebrow="যোগাযোগ"
        title="প্রশ্ন, মতামত বা সাহায্য — জানান"
        text="হিসাব মিলছে না, নতুন কোনো সুবিধা চান, বা পাসওয়ার্ড রিসেট দরকার — যেকোনো মাধ্যমে যোগাযোগ করুন।"
      />
      <section className="section">
        <div className="container" style={{ maxWidth: 1000 }}>
          <div className="text-center mb-4">
            <div className="brand-mark mb-2" style={{ width: 64, height: 64, fontSize: "1.8rem" }}>
              <i className="bi bi-person" />
            </div>
            <h3 className="fw-bold mb-0">{c.name}</h3>
            <div className="text-secondary">{c.nameEn} • নির্মাতা, {SITE.name}</div>
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
                  <h5 className="fw-semibold mb-1">{card.title}</h5>
                  <div className="fw-semibold text-success text-break">{card.value}</div>
                  <div className="small text-secondary mt-1">{card.hint}</div>
                </a>
              </div>
            ))}
          </div>

          <div className="row g-4">
            <div className="col-lg-6">
              <div className="feature-card">
                <h5 className="fw-semibold">
                  <i className="bi bi-list-check me-2 text-success" />
                  যোগাযোগের সময় যা জানালে সুবিধা হয়
                </h5>
                <ul className="text-secondary mb-0">
                  <li>যে মোবাইল নম্বর/ইমেইলে অ্যাকাউন্ট খুলেছেন</li>
                  <li>কোন অর্থবছরের হিসাব নিয়ে প্রশ্ন</li>
                  <li>স্টেটমেন্টের সাথে কত টাকার পার্থক্য হচ্ছে</li>
                  <li>সম্ভব হলে স্ক্রিনশট</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="feature-card">
                <h5 className="fw-semibold">
                  <i className="bi bi-shield-exclamation me-2 text-warning" />
                  সতর্কতা
                </h5>
                <p className="text-secondary mb-0">
                  আমরা কখনো আপনার পাসওয়ার্ড, ব্যাংক কার্ড বা OTP জানতে চাইব না। কেউ {SITE.name}-এর নাম করে
                  এসব চাইলে দেবেন না।
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
