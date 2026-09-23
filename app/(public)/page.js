import Link from "next/link";
import CtaBanner from "@/components/public/CtaBanner";
import JsonLd from "@/components/JsonLd";
import { sampleResult } from "@/lib/sample";
import { getLang } from "@/lib/lang";
import { tr, localePath, localMoney, localNum } from "@/lib/i18n";
import { pageMetadata } from "@/lib/site";
import { webAppLd } from "@/lib/seo";
import { ARTICLES } from "@/lib/articles";

export async function generateMetadata() {
  const lang = await getLang();
  const meta = pageMetadata(lang, "/", {
    bn: {
      title: "GPF ক্যালকুলেটর — সাধারণ ভবিষ্য তহবিলের মুনাফা ও ক্লোজিং ব্যালেন্স হিসাব",
      description:
        "বিনামূল্যের GPF ক্যালকুলেটর: ১৩%, ১২%, ১১% স্ল্যাব হারে সাধারণ ভবিষ্য তহবিলের মুনাফা, মাসভিত্তিক চাঁদার মুনাফা ও বছর শেষের ক্লোজিং ব্যালেন্স হিসাব করুন। অফিসের GPF স্টেটমেন্টের সাথে পয়সা পর্যন্ত মিলিয়ে দেখুন।",
      keywords: ["GPF হিসাব অনলাইন", "GPF ক্যালকুলেটর বাংলা"],
    },
    en: {
      title: "GPF Calculator Bangladesh — General Provident Fund Profit & Closing Balance",
      description:
        "Free GPF calculator for Bangladesh: calculate General Provident Fund profit at the 13%, 12%, 11% slab rates, month-wise subscription profit and year-end closing balance, and match your official GPF statement to the paisa.",
      keywords: ["online GPF calculator", "GPF calculation Bangladesh"],
    },
  });
  // The home page owns the brand title; skip the "| GPF Calculator" suffix.
  return { ...meta, title: { absolute: meta.title } };
}

export default async function HomePage() {
  const lang = await getLang();
  const t = tr(lang);
  const m = (v, d) => localMoney(v, lang, d);
  const n = (v) => localNum(v, lang);
  const href = (p) => localePath(p, lang);
  const r = sampleResult();

  const features = [
    {
      icon: "bi-bar-chart-steps",
      title: t("স্ল্যাব-ভিত্তিক মুনাফা", "Slab-based profit"),
      text: t(
        "১৫ লক্ষ পর্যন্ত ১৩%, পরের ১৫ লক্ষে ১২%, বাকিতে ১১% — প্রতিটি ধাপ আলাদা করে হিসাব হয়, ধাপের হার নিজেও বদলাতে পারবেন।",
        "13% on the first 15 lakh, 12% on the next 15 lakh, 11% on the rest — each band is worked out separately, and you can change the bands yourself."
      ),
    },
    {
      icon: "bi-calendar3",
      color: "amber",
      title: t("মাসভিত্তিক চাঁদার মুনাফা", "Month-wise subscription profit"),
      text: t(
        "জুলাইয়ের চাঁদা ১২ মাসের, জুনের চাঁদা ১ মাসের মুনাফা পায় — প্রতিটি মাস আলাদা লাইনে দেখায়।",
        "July's subscription earns 12 months of profit, June's earns one — every month is shown on its own line."
      ),
    },
    {
      icon: "bi-clipboard-check",
      color: "blue",
      title: t("স্টেটমেন্টের সাথে মিলিয়ে দেখা", "Check your statement"),
      text: t(
        "অফিসের স্টেটমেন্টের অঙ্ক বসালেই দেখাবে মিলেছে কিনা; না মিললে ফান্ড কোন হার ব্যবহার করেছে তা বের করে দেবে।",
        "Enter the figures from your official statement to see if they match — if not, the app works out which rate the fund actually used."
      ),
    },
    {
      icon: "bi-arrow-right-circle",
      color: "rose",
      title: t("এক ক্লিকে পরের বছর", "Next year in one click"),
      text: t(
        "এ বছরের ক্লোজিং ব্যালেন্স পরের বছরের ওপেনিং হিসেবে নিজেই বসে যায় — প্রতি বছর নতুন করে কিছু টাইপ করতে হয় না।",
        "This year's closing balance becomes next year's opening balance automatically — no retyping every year."
      ),
    },
    {
      icon: "bi-shield-lock",
      title: t("নিজস্ব, সুরক্ষিত অ্যাকাউন্ট", "Private, secure account"),
      text: t(
        "আপনার হিসাব শুধু আপনার অ্যাকাউন্টেই থাকে। অন্য কেউ দেখতে পায় না — পাসওয়ার্ড এনক্রিপ্ট করে রাখা হয়।",
        "Your calculations stay in your own account. Nobody else can see them, and passwords are stored encrypted."
      ),
    },
    {
      icon: "bi-translate",
      color: "amber",
      title: t("বাংলা ও ইংরেজি", "Bangla and English"),
      text: t(
        "পুরো অ্যাপ বাংলা ও ইংরেজি — দুই ভাষাতেই চলে, এক ক্লিকে ভাষা বদলান।",
        "The whole app works in Bangla and English — switch with a single click."
      ),
    },
  ];

  const audience = [
    {
      icon: "bi-building",
      title: t("সরকারি কর্মকর্তা-কর্মচারী", "Government employees"),
      text: t("যাঁদের বেতন থেকে প্রতি মাসে GPF চাঁদা কাটা হয়।", "Whose GPF subscription is deducted from salary every month."),
    },
    {
      icon: "bi-mortarboard",
      title: t("সরকারি শিক্ষক", "Government teachers"),
      text: t(
        "স্কুল, কলেজ ও বিশ্ববিদ্যালয়ের শিক্ষক যাঁরা ভবিষ্য তহবিলে টাকা রাখেন।",
        "School, college and university teachers who save in the provident fund."
      ),
    },
    {
      icon: "bi-briefcase",
      title: t("স্বায়ত্তশাসিত প্রতিষ্ঠান", "Autonomous bodies"),
      text: t(
        "যেসব প্রতিষ্ঠানে একই ধরনের স্ল্যাব-ভিত্তিক প্রভিডেন্ট ফান্ড চালু আছে।",
        "Organisations running a similar slab-based provident fund (CPF/PF)."
      ),
    },
    {
      icon: "bi-person-walking",
      title: t("অবসরের প্রস্তুতি নিচ্ছেন যাঁরা", "Planning for retirement"),
      text: t(
        "অবসরের সময় তহবিলে মোট কত দাঁড়াবে, আগেভাগেই জেনে নিতে।",
        "See in advance how much your fund will hold when you retire."
      ),
    },
  ];

  const steps = [
    [t("অ্যাকাউন্ট খুলুন", "Create an account"), t("নাম, মোবাইল নম্বর আর পাসওয়ার্ড দিয়ে এক মিনিটে রেজিস্ট্রেশন।", "Sign up in a minute with your name, mobile number and a password.")],
    [
      t("তথ্য বসান", "Enter your figures"),
      t(
        "অর্থবছর, প্রারম্ভিক জমা আর ১২ মাসের চাঁদা — একবারে সব মাসে একই চাঁদাও বসানো যায়।",
        "Fiscal year, opening balance and the 12 monthly subscriptions — or fill all months at once."
      ),
    ],
    [
      t("ফলাফল দেখুন ও রাখুন", "See, save, carry forward"),
      t(
        "মুনাফা আর সমাপনী জমা সাথে সাথে দেখুন, সংরক্ষণ করুন, পরের বছরে নিয়ে যান।",
        "See profit and closing balance instantly, save it, and carry it into next year."
      ),
    ],
  ];

  return (
    <>
      <JsonLd data={webAppLd(lang)} />

      {/* ---------------- Hero ---------------- */}
      <section className="hero">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="eyebrow">
                <i className="bi bi-stars me-1" />
                {t("সম্পূর্ণ বিনামূল্যে • বাংলা ও ইংরেজি", "100% free • Bangla & English")}
              </div>
              <h1 className="fw-bold mb-3">
                {lang === "en" ? (
                  <>
                    <span className="highlight">GPF Calculator</span> — your provident fund year-end,{" "}
                    <span className="highlight">accurate to the paisa</span>
                  </>
                ) : (
                  <>
                    <span className="highlight">GPF ক্যালকুলেটর</span> — আপনার ভবিষ্য তহবিলের বছর শেষের হিসাব,{" "}
                    <span className="highlight">পয়সা পর্যন্ত নির্ভুল</span>
                  </>
                )}
              </h1>
              <p className="lead text-secondary mb-4">
                {t(
                  "অফিসের স্টেটমেন্ট আসার জন্য আর অপেক্ষা নয়। ওপেনিং ব্যালেন্স আর মাসিক চাঁদা বসান — সাধারণ ভবিষ্য তহবিলের স্ল্যাব-ভিত্তিক মুনাফা, মাসভিত্তিক চাঁদার মুনাফা আর ক্লোজিং ব্যালেন্স সাথে সাথেই দেখে নিন।",
                  "No more waiting for the office statement. Enter your opening balance and monthly subscriptions and instantly see your General Provident Fund slab profit, month-wise subscription profit and closing balance."
                )}
              </p>
              <div className="d-flex flex-wrap gap-2 mb-4">
                <Link href={href("/register")} className="btn btn-brand btn-lg">
                  <i className="bi bi-person-plus me-2" />
                  {t("ফ্রি অ্যাকাউন্ট খুলুন", "Create a free account")}
                </Link>
                <Link href={href("/how-it-works")} className="btn btn-outline-brand btn-lg">
                  {t("কীভাবে কাজ করে", "How it works")}
                </Link>
              </div>
              <div className="d-flex flex-wrap gap-3 small text-secondary">
                <span>
                  <i className="bi bi-check-circle-fill text-success me-1" />
                  {t("কোনো চার্জ নেই", "No charges")}
                </span>
                <span>
                  <i className="bi bi-check-circle-fill text-success me-1" />
                  {t("মোবাইল নম্বর দিয়েই লগইন", "Log in with your mobile number")}
                </span>
                <span>
                  <i className="bi bi-check-circle-fill text-success me-1" />
                  {t("মোবাইলেও চলে", "Works on phones")}
                </span>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="statement-card">
                <div className="statement-head d-flex justify-content-between align-items-center">
                  <span>
                    <i className="bi bi-receipt me-2" />
                    {t("বছর সমাপনী হিসাব (উদাহরণ)", "Year-end statement (example)")}
                  </span>
                  <span className="badge bg-white text-success">{n("2025–26")}</span>
                </div>
                <div className="statement-body">
                  <div className="result-line">
                    <span className="label">{t("প্রারম্ভিক জমা (Opening)", "Opening balance")}</span>
                    <span className="value">৳ {m(r.openingBalance)}</span>
                  </div>
                  <div className="result-line">
                    <span className="label">{t("১২ মাসের চাঁদা (মাসে ১২,০০০)", "12 months' subscription (12,000/month)")}</span>
                    <span className="value">৳ {m(r.totalSubscription)}</span>
                  </div>
                  <div className="result-line">
                    <span className="label">{t("প্রারম্ভিক জমার মুনাফা (স্ল্যাব)", "Profit on opening balance (slabs)")}</span>
                    <span className="value">৳ {m(r.openingInterest)}</span>
                  </div>
                  <div className="result-line">
                    <span className="label">
                      {t("চাঁদার মুনাফা", "Subscription profit")} ({n(r.depositRate)}%, {t("মাসভিত্তিক", "month-wise")})
                    </span>
                    <span className="value">৳ {m(r.depositInterest)}</span>
                  </div>
                  <div className="result-line">
                    <span className="label fw-semibold text-dark">{t("মোট মুনাফা", "Total profit")}</span>
                    <span className="value text-success">৳ {m(r.profit)}</span>
                  </div>
                  <div className="mt-3 p-3 rounded-3" style={{ background: "#f0fdfa" }}>
                    <div className="small text-secondary">{t("বছর শেষে সমাপনী জমা (Closing)", "Closing balance at year end")}</div>
                    <div className="result-big text-success">৳ {m(r.closingBalance)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Stats ---------------- */}
      <section className="pb-2">
        <div className="container">
          <div className="stat-strip">
            <div className="row text-center g-3">
              {[
                [t("৩ ধাপ", "3 bands"), t("স্ল্যাব হার আলাদা করে হিসাব", "Slab rates worked out separately")],
                [t("১২ মাস", "12 months"), t("প্রতিটি মাসের আলাদা মুনাফা", "Profit for every month")],
                [t("৳ ০.০০", "৳ 0.00"), t("বাস্তব স্টেটমেন্টের সাথে পার্থক্য", "Difference from a real statement")],
                [t("১০০%", "100%"), t("বিনামূল্যে, কোনো বিজ্ঞাপন নেই", "Free, no ads")],
              ].map(([value, label]) => (
                <div className="col-6 col-md-3" key={label}>
                  <div className="stat-value">{value}</div>
                  <div className="stat-label">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Problem ---------------- */}
      <section className="section">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <h2 className="section-title">{t("অফিসের GPF স্টেটমেন্ট বুঝতে কষ্ট হয়?", "Finding your GPF statement hard to follow?")}</h2>
              <p className="text-secondary">
                {t(
                  "বছর শেষে হাতে আসে একটা স্টেটমেন্ট — Opening Balance, Subscription, Profit for the year, Closing Balance। কিন্তু মুনাফাটা ঠিক কীভাবে এল, কোন টাকায় কত হার বসল, হিসাবে ভুল হলো কিনা — সেটা বোঝার উপায় থাকে না।",
                  "Each year you get a statement — Opening Balance, Subscription, Profit for the year, Closing Balance. But there is no way to see how the profit was reached, which rate applied to which money, or whether there was a mistake."
                )}
              </p>
              <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                {[
                  t("কেউ ভাবেন চাঁদার উপর ৮.৫% বসে, কেউ ভাবেন ১৩% — আসলে কোনটা?", "Some say subscriptions earn 8.5%, others say 13% — which is it?"),
                  t("এক্সেলে হিসাব করলে কয়েক টাকা/পয়সা এদিক-ওদিক হয়ে যায়।", "Spreadsheet calculations end up a few taka or paisa off."),
                  t("প্রতি বছর নতুন করে সব অঙ্ক বসাতে হয়, আগের বছরের হিসাব হারিয়ে যায়।", "Every year you start over, and last year's working gets lost."),
                ].map((line) => (
                  <li key={line}>
                    <i className="bi bi-x-circle text-danger me-2" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-6">
              <div className="info-box mb-3">
                <div className="fw-semibold mb-1">
                  <i className="bi bi-lightbulb me-1" />
                  {t("GPF ক্যালকুলেটর যা করে", "What GPF Calculator does")}
                </div>
                <p className="mb-0 small">
                  {t(
                    "একটি বাস্তব অফিসিয়াল স্টেটমেন্ট ধরে ধরে ফান্ডের আসল নিয়মগুলো বের করা হয়েছে — প্রারম্ভিক জমায় স্ল্যাব হার, চাঁদায় সর্বোচ্চ ধাপের হার মাস অনুপাতে, আর পয়সার পরের অংশ বাদ (ট্রাংকেট)। এই নিয়মে হিসাব করে স্টেটমেন্টের সাথে পয়সা পর্যন্ত মিলেছে।",
                    "The fund's real rules were worked out line by line from an official statement — slab rates on the opening balance, the top band's rate on subscriptions pro-rated by month, and truncation past the paisa. Calculated this way, the result matched the statement to the paisa."
                  )}
                </p>
              </div>
              <div className="info-box warn">
                <div className="fw-semibold mb-1">
                  <i className="bi bi-sliders me-1" />
                  {t("আপনার ফান্ডের নিয়ম আলাদা?", "Does your fund use different rules?")}
                </div>
                <p className="mb-0 small">
                  {t(
                    "সমস্যা নেই — স্ল্যাবের পরিমাণ, হার, চাঁদার হার, মুনাফা ছড়ানোর পদ্ধতি আর পয়সার নিয়ম সবই বদলানো যায়। স্টেটমেন্টের অঙ্ক দিলে অ্যাপ নিজেই সঠিক হার খুঁজে দেবে।",
                    "No problem — slab sizes, rates, subscription rate, spreading method and rounding can all be changed. Give it your statement's figure and the app finds the right rate itself."
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Features ---------------- */}
      <section className="section section-alt">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">{t("GPF ক্যালকুলেটরে যা যা পাচ্ছেন", "What you get with GPF Calculator")}</h2>
            <p className="section-sub">
              {t(
                "একটা সাধারণ ক্যালকুলেটর নয় — পুরো চাকরিজীবনের ভবিষ্য তহবিলের খাতা, এক জায়গায়।",
                "Not just a calculator — a record of your provident fund across your whole career, in one place."
              )}
            </p>
          </div>
          <div className="row g-4">
            {features.map((f) => (
              <div className="col-md-6 col-lg-4" key={f.title}>
                <div className="feature-card">
                  <div className={`feature-icon ${f.color || ""}`}>
                    <i className={`bi ${f.icon}`} />
                  </div>
                  <h3 className="h5 fw-semibold">{f.title}</h3>
                  <p className="text-secondary mb-0">{f.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link href={href("/features")} className="btn btn-outline-brand">
              {t("সব সুবিধা দেখুন", "See all features")} <i className="bi bi-arrow-right ms-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- Steps ---------------- */}
      <section className="section">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">{t("মাত্র ৩ ধাপে GPF হিসাব", "Your GPF worked out in 3 steps")}</h2>
            <p className="section-sub">{t("কোনো সূত্র মনে রাখতে হবে না — তথ্য বসালেই ফলাফল।", "No formulas to remember — enter the figures, get the result.")}</p>
          </div>
          <div className="row g-4">
            {steps.map(([title, text], i) => (
              <div className="col-md-4" key={title}>
                <div className="d-flex gap-3">
                  <div className="step-num">{n(i + 1)}</div>
                  <div>
                    <h3 className="h5 fw-semibold">{title}</h3>
                    <p className="text-secondary mb-0">{text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Rates teaser ---------------- */}
      <section className="section section-alt">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-5">
              <h2 className="section-title">{t("GPF মুনাফার হার এক নজরে", "GPF profit rates at a glance")}</h2>
              <p className="text-secondary">
                {t(
                  "প্রারম্ভিক জমার উপর মুনাফা ধাপে ধাপে বসে। যত বেশি জমা, উপরের অংশে হার তত কম। ব্যালেন্স যে ধাপে গিয়ে পৌঁছায়, নতুন চাঁদা সাধারণত সেই ধাপের হার পায়।",
                  "Profit on the opening balance is charged band by band — the larger the balance, the lower the rate on the top part. New subscriptions usually earn the rate of the band the balance has reached."
                )}
              </p>
              <Link href={href("/profit-rates")} className="btn btn-brand">
                {t("বিস্তারিত উদাহরণসহ দেখুন", "See detailed examples")}
              </Link>
            </div>
            <div className="col-lg-7">
              <div className="card">
                <div className="table-responsive">
                  <table className="table mb-0 align-middle">
                    <thead>
                      <tr>
                        <th>{t("জমার ধাপ", "Balance band")}</th>
                        <th className="text-end">{t("মুনাফার হার", "Profit rate")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{t("প্রথম ১৫ লক্ষ টাকা পর্যন্ত", "Up to the first 15 lakh taka")}</td>
                        <td className="text-end fw-bold text-success">{n(13)}%</td>
                      </tr>
                      <tr>
                        <td>{t("পরবর্তী ১৫ লক্ষ টাকা (১৫–৩০ লক্ষ)", "Next 15 lakh taka (15–30 lakh)")}</td>
                        <td className="text-end fw-bold text-success">{n(12)}%</td>
                      </tr>
                      <tr>
                        <td>{t("৩০ লক্ষ টাকার বেশি অংশ", "Above 30 lakh taka")}</td>
                        <td className="text-end fw-bold text-success">{n(11)}%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="small text-secondary mt-2 mb-0">
                {t(
                  "* সরকার সময়ে সময়ে হার পুনর্নির্ধারণ করে। অ্যাপে প্রতিটি ধাপের পরিমাণ ও হার নিজে বদলানো যায়।",
                  "* The government revises rates from time to time. Every band's size and rate can be edited in the app."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Audience ---------------- */}
      <section className="section">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">{t("কাদের জন্য", "Who it's for")}</h2>
            <p className="section-sub">
              {t(
                "যাঁদের বেতন থেকে ভবিষ্য তহবিলে টাকা জমা হয় এবং বছর শেষে স্ল্যাব হারে মুনাফা যোগ হয়।",
                "Anyone whose salary feeds a provident fund that adds slab-rate profit at year end."
              )}
            </p>
          </div>
          <div className="row g-4">
            {audience.map((a) => (
              <div className="col-sm-6 col-lg-3" key={a.title}>
                <div className="feature-card text-center">
                  <div className="feature-icon mx-auto">
                    <i className={`bi ${a.icon}`} />
                  </div>
                  <h3 className="h6 fw-semibold">{a.title}</h3>
                  <p className="small text-secondary mb-0">{a.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Articles teaser ---------------- */}
      <section className="section section-alt">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">{t("GPF নিয়ে জরুরি লেখা", "Useful reading on GPF")}</h2>
            <p className="section-sub">{t("হিসাবের নিয়ম সহজ ভাষায়, উদাহরণসহ।", "The rules in plain language, with examples.")}</p>
          </div>
          <div className="row g-4">
            {ARTICLES.slice(0, 3).map((a) => (
              <div className="col-md-4" key={a.slug}>
                <Link href={href(`/articles/${a.slug}`)} className="contact-card">
                  <div className="small text-success fw-semibold mb-1">
                    <i className="bi bi-journal-text me-1" />
                    {t("লেখা", "Article")}
                  </div>
                  <h3 className="h6 fw-semibold">{a[lang].title}</h3>
                  <p className="small text-secondary mb-0">{a[lang].description}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FAQ teaser ---------------- */}
      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          <div className="text-center">
            <h2 className="section-title">{t("সাধারণ কিছু প্রশ্ন", "Common questions")}</h2>
            <p className="section-sub">{t("আরও প্রশ্নের উত্তর পাবেন প্রশ্নোত্তর পেজে।", "More answers on the FAQ page.")}</p>
          </div>
          {[
            [
              t("GPF ক্যালকুলেটর ব্যবহার করতে কি টাকা লাগবে?", "Does GPF Calculator cost anything?"),
              t("না। সম্পূর্ণ বিনামূল্যে, কোনো লুকানো চার্জ নেই।", "No. It is completely free, with no hidden charges."),
            ],
            [
              t("আমার হিসাব কি অন্য কেউ দেখতে পাবে?", "Can anyone else see my figures?"),
              t(
                "না। প্রতিটি হিসাব আপনার অ্যাকাউন্টের সাথে যুক্ত থাকে এবং লগইন ছাড়া কেউ দেখতে পারে না।",
                "No. Every calculation is tied to your account and can't be seen without logging in."
              ),
            ],
            [
              t("হিসাব কি অফিসের স্টেটমেন্টের সাথে মিলবে?", "Will it match my official statement?"),
              t(
                "একটি বাস্তব স্টেটমেন্টের সাথে পয়সা পর্যন্ত মিলিয়ে নিয়মগুলো তৈরি। আপনার ফান্ডের নিয়ম আলাদা হলে স্টেটমেন্টের মুনাফা বসিয়ে দিন — অ্যাপ সঠিক হার খুঁজে বের করবে।",
                "The rules were built by matching a real statement to the paisa. If your fund differs, enter the statement's profit and the app finds the right rate."
              ),
            ],
          ].map(([q, a]) => (
            <details className="faq-item" key={q}>
              <summary>{q}</summary>
              <div className="faq-body">{a}</div>
            </details>
          ))}
          <div className="text-center mt-3">
            <Link href={href("/faq")} className="btn btn-outline-brand">
              {t("সব প্রশ্নোত্তর দেখুন", "See all FAQs")}
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner lang={lang} />
    </>
  );
}
