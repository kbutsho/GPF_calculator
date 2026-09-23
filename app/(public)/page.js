import Link from "next/link";
import CtaBanner from "@/components/public/CtaBanner";
import { sampleResult } from "@/lib/sample";
import { bnMoney, bnNum } from "@/lib/site";

const FEATURES = [
  {
    icon: "bi-bar-chart-steps",
    title: "স্ল্যাব-ভিত্তিক মুনাফা",
    text: "১৫ লক্ষ পর্যন্ত ১৩%, পরের ১৫ লক্ষে ১২%, বাকিতে ১১% — প্রতিটি ধাপ আলাদা করে হিসাব হয়, ধাপের হার নিজেও বদলাতে পারবেন।",
  },
  {
    icon: "bi-calendar3",
    color: "amber",
    title: "মাসভিত্তিক চাঁদার মুনাফা",
    text: "জুলাইয়ের চাঁদা ১২ মাসের, জুনের চাঁদা ১ মাসের মুনাফা পায় — প্রতিটি মাস আলাদা লাইনে দেখায়।",
  },
  {
    icon: "bi-clipboard-check",
    color: "blue",
    title: "স্টেটমেন্টের সাথে মিলিয়ে দেখা",
    text: "অফিসের স্টেটমেন্টের অঙ্ক বসালেই দেখাবে মিলেছে কিনা; না মিললে ফান্ড কোন হার ব্যবহার করেছে তা বের করে দেবে।",
  },
  {
    icon: "bi-arrow-right-circle",
    color: "rose",
    title: "এক ক্লিকে পরের বছর",
    text: "এ বছরের ক্লোজিং ব্যালেন্স পরের বছরের ওপেনিং হিসেবে নিজেই বসে যায় — প্রতি বছর নতুন করে কিছু টাইপ করতে হয় না।",
  },
  {
    icon: "bi-shield-lock",
    title: "নিজস্ব, সুরক্ষিত অ্যাকাউন্ট",
    text: "আপনার হিসাব শুধু আপনার অ্যাকাউন্টেই থাকে। অন্য কেউ দেখতে পায় না — পাসওয়ার্ড এনক্রিপ্ট করে রাখা হয়।",
  },
  {
    icon: "bi-printer",
    color: "amber",
    title: "প্রিন্ট ও সংরক্ষণ",
    text: "প্রতিটি অর্থবছরের হিসাব সংরক্ষণ করে রাখুন, যখন খুশি খুলে দেখুন বা প্রিন্ট করে ফাইলে রাখুন।",
  },
];

const AUDIENCE = [
  { icon: "bi-building", title: "সরকারি কর্মকর্তা-কর্মচারী", text: "যাঁদের বেতন থেকে প্রতি মাসে GPF চাঁদা কাটা হয়।" },
  { icon: "bi-mortarboard", title: "সরকারি শিক্ষক", text: "স্কুল, কলেজ ও বিশ্ববিদ্যালয়ের শিক্ষক যাঁরা ভবিষ্য তহবিলে টাকা রাখেন।" },
  { icon: "bi-briefcase", title: "স্বায়ত্তশাসিত প্রতিষ্ঠান", text: "যেসব প্রতিষ্ঠানে একই ধরনের স্ল্যাব-ভিত্তিক প্রভিডেন্ট ফান্ড চালু আছে।" },
  { icon: "bi-person-walking", title: "অবসরের প্রস্তুতি নিচ্ছেন যাঁরা", text: "অবসরের সময় তহবিলে মোট কত দাঁড়াবে, আগেভাগেই জেনে নিতে।" },
];

export default function HomePage() {
  const r = sampleResult();

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="hero">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="eyebrow">
                <i className="bi bi-stars me-1" />
                সম্পূর্ণ বিনামূল্যে • বাংলায়
              </div>
              <h1 className="fw-bold mb-3">
                আপনার <span className="highlight">GPF</span>-এর বছর শেষের হিসাব, এখন{" "}
                <span className="highlight">পয়সা পর্যন্ত নির্ভুল</span>
              </h1>
              <p className="lead text-secondary mb-4">
                অফিসের স্টেটমেন্ট আসার জন্য আর অপেক্ষা নয়। ওপেনিং ব্যালেন্স আর মাসিক চাঁদা বসান —
                স্ল্যাব-ভিত্তিক মুনাফা, মাসভিত্তিক চাঁদার মুনাফা আর ক্লোজিং ব্যালেন্স সাথে সাথেই দেখে
                নিন।
              </p>
              <div className="d-flex flex-wrap gap-2 mb-4">
                <Link href="/register" className="btn btn-brand btn-lg">
                  <i className="bi bi-person-plus me-2" />
                  ফ্রি অ্যাকাউন্ট খুলুন
                </Link>
                <Link href="/how-it-works" className="btn btn-outline-brand btn-lg">
                  কীভাবে কাজ করে
                </Link>
              </div>
              <div className="d-flex flex-wrap gap-3 small text-secondary">
                <span>
                  <i className="bi bi-check-circle-fill text-success me-1" />
                  কোনো চার্জ নেই
                </span>
                <span>
                  <i className="bi bi-check-circle-fill text-success me-1" />
                  মোবাইল নম্বর দিয়েই লগইন
                </span>
                <span>
                  <i className="bi bi-check-circle-fill text-success me-1" />
                  মোবাইলেও চলে
                </span>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="statement-card">
                <div className="statement-head d-flex justify-content-between align-items-center">
                  <span>
                    <i className="bi bi-receipt me-2" />
                    বছর সমাপনী হিসাব (উদাহরণ)
                  </span>
                  <span className="badge bg-white text-success">২০২৫–২৬</span>
                </div>
                <div className="statement-body">
                  <div className="result-line">
                    <span className="label">প্রারম্ভিক জমা (Opening)</span>
                    <span className="value">৳ {bnMoney(r.openingBalance)}</span>
                  </div>
                  <div className="result-line">
                    <span className="label">১২ মাসের চাঁদা (মাসে ১২,০০০)</span>
                    <span className="value">৳ {bnMoney(r.totalSubscription)}</span>
                  </div>
                  <div className="result-line">
                    <span className="label">প্রারম্ভিক জমার মুনাফা (স্ল্যাব)</span>
                    <span className="value">৳ {bnMoney(r.openingInterest)}</span>
                  </div>
                  <div className="result-line">
                    <span className="label">চাঁদার মুনাফা ({bnNum(r.depositRate)}%, মাসভিত্তিক)</span>
                    <span className="value">৳ {bnMoney(r.depositInterest)}</span>
                  </div>
                  <div className="result-line">
                    <span className="label fw-semibold text-dark">মোট মুনাফা</span>
                    <span className="value text-success">৳ {bnMoney(r.profit)}</span>
                  </div>
                  <div className="mt-3 p-3 rounded-3" style={{ background: "#f0fdfa" }}>
                    <div className="small text-secondary">বছর শেষে সমাপনী জমা (Closing)</div>
                    <div className="result-big text-success">৳ {bnMoney(r.closingBalance)}</div>
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
              <div className="col-6 col-md-3">
                <div className="stat-value">৩ ধাপ</div>
                <div className="stat-label">স্ল্যাব হার আলাদা করে হিসাব</div>
              </div>
              <div className="col-6 col-md-3">
                <div className="stat-value">১২ মাস</div>
                <div className="stat-label">প্রতিটি মাসের আলাদা মুনাফা</div>
              </div>
              <div className="col-6 col-md-3">
                <div className="stat-value">৳ ০.০০</div>
                <div className="stat-label">বাস্তব স্টেটমেন্টের সাথে পার্থক্য</div>
              </div>
              <div className="col-6 col-md-3">
                <div className="stat-value">১০০%</div>
                <div className="stat-label">বিনামূল্যে, কোনো বিজ্ঞাপন নেই</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Problem ---------------- */}
      <section className="section">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <h2 className="section-title">অফিসের GPF স্টেটমেন্ট বুঝতে কষ্ট হয়?</h2>
              <p className="text-secondary">
                বছর শেষে হাতে আসে একটা স্টেটমেন্ট — Opening Balance, Subscription, Profit for the
                year, Closing Balance। কিন্তু মুনাফাটা ঠিক কীভাবে এল, কোন টাকায় কত হার বসল, হিসাবে
                ভুল হলো কিনা — সেটা বোঝার উপায় থাকে না।
              </p>
              <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                <li>
                  <i className="bi bi-x-circle text-danger me-2" />
                  কেউ ভাবেন চাঁদার উপর ৮.৫% বসে, কেউ ভাবেন ১৩% — আসলে কোনটা?
                </li>
                <li>
                  <i className="bi bi-x-circle text-danger me-2" />
                  এক্সেলে হিসাব করলে কয়েক টাকা/পয়সা এদিক-ওদিক হয়ে যায়।
                </li>
                <li>
                  <i className="bi bi-x-circle text-danger me-2" />
                  প্রতি বছর নতুন করে সব অঙ্ক বসাতে হয়, আগের বছরের হিসাব হারিয়ে যায়।
                </li>
              </ul>
            </div>
            <div className="col-lg-6">
              <div className="info-box mb-3">
                <div className="fw-semibold mb-1">
                  <i className="bi bi-lightbulb me-1" />
                  GPF ক্যালকুলেটর যা করে
                </div>
                <p className="mb-0 small">
                  একটি বাস্তব অফিসিয়াল স্টেটমেন্ট ধরে ধরে ফান্ডের আসল নিয়মগুলো বের করা হয়েছে —
                  প্রারম্ভিক জমায় স্ল্যাব হার, চাঁদায় সর্বোচ্চ ধাপের হার মাস অনুপাতে, আর পয়সার পরের
                  অংশ বাদ (ট্রাংকেট)। এই নিয়মে হিসাব করে স্টেটমেন্টের সাথে{" "}
                  <strong>পয়সা পর্যন্ত মিলেছে</strong>।
                </p>
              </div>
              <div className="info-box warn">
                <div className="fw-semibold mb-1">
                  <i className="bi bi-sliders me-1" />
                  আপনার ফান্ডের নিয়ম আলাদা?
                </div>
                <p className="mb-0 small">
                  সমস্যা নেই — স্ল্যাবের পরিমাণ, হার, চাঁদার হার, মুনাফা ছড়ানোর পদ্ধতি আর পয়সার নিয়ম
                  সবই বদলানো যায়। স্টেটমেন্টের অঙ্ক দিলে অ্যাপ নিজেই সঠিক হার খুঁজে দেবে।
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
            <h2 className="section-title">যা যা পাচ্ছেন</h2>
            <p className="section-sub">
              একটা সাধারণ ক্যালকুলেটর নয় — পুরো চাকরিজীবনের ভবিষ্য তহবিলের খাতা, এক জায়গায়।
            </p>
          </div>
          <div className="row g-4">
            {FEATURES.map((f) => (
              <div className="col-md-6 col-lg-4" key={f.title}>
                <div className="feature-card">
                  <div className={`feature-icon ${f.color || ""}`}>
                    <i className={`bi ${f.icon}`} />
                  </div>
                  <h5 className="fw-semibold">{f.title}</h5>
                  <p className="text-secondary mb-0">{f.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link href="/features" className="btn btn-outline-brand">
              সব সুবিধা দেখুন <i className="bi bi-arrow-right ms-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- Steps ---------------- */}
      <section className="section">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">মাত্র ৩ ধাপে হিসাব</h2>
            <p className="section-sub">কোনো সূত্র মনে রাখতে হবে না — তথ্য বসালেই ফলাফল।</p>
          </div>
          <div className="row g-4">
            {[
              ["অ্যাকাউন্ট খুলুন", "নাম, মোবাইল নম্বর আর পাসওয়ার্ড দিয়ে এক মিনিটে রেজিস্ট্রেশন।"],
              ["তথ্য বসান", "অর্থবছর, প্রারম্ভিক জমা আর ১২ মাসের চাঁদা — একবারে সব মাসে একই চাঁদাও বসানো যায়।"],
              ["ফলাফল দেখুন ও রাখুন", "মুনাফা আর সমাপনী জমা সাথে সাথে দেখুন, সংরক্ষণ করুন, পরের বছরে নিয়ে যান।"],
            ].map(([title, text], i) => (
              <div className="col-md-4" key={title}>
                <div className="d-flex gap-3">
                  <div className="step-num">{bnNum(i + 1)}</div>
                  <div>
                    <h5 className="fw-semibold">{title}</h5>
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
              <h2 className="section-title">বর্তমান মুনাফার হার এক নজরে</h2>
              <p className="text-secondary">
                প্রারম্ভিক জমার উপর মুনাফা ধাপে ধাপে বসে। যত বেশি জমা, উপরের অংশে হার তত কম।
                ব্যালেন্স যে ধাপে গিয়ে পৌঁছায়, নতুন চাঁদা সাধারণত সেই ধাপের হার পায়।
              </p>
              <Link href="/profit-rates" className="btn btn-brand">
                বিস্তারিত উদাহরণসহ দেখুন
              </Link>
            </div>
            <div className="col-lg-7">
              <div className="card">
                <div className="table-responsive">
                  <table className="table mb-0 align-middle">
                    <thead>
                      <tr>
                        <th>জমার ধাপ</th>
                        <th className="text-end">মুনাফার হার</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>প্রথম ১৫ লক্ষ টাকা পর্যন্ত</td>
                        <td className="text-end fw-bold text-success">১৩%</td>
                      </tr>
                      <tr>
                        <td>পরবর্তী ১৫ লক্ষ টাকা (১৫–৩০ লক্ষ)</td>
                        <td className="text-end fw-bold text-success">১২%</td>
                      </tr>
                      <tr>
                        <td>৩০ লক্ষ টাকার বেশি অংশ</td>
                        <td className="text-end fw-bold text-success">১১%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="small text-secondary mt-2 mb-0">
                * সরকার সময়ে সময়ে হার পুনর্নির্ধারণ করে। অ্যাপে প্রতিটি ধাপের পরিমাণ ও হার নিজে বদলানো
                যায়।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Audience ---------------- */}
      <section className="section">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">কাদের জন্য</h2>
            <p className="section-sub">
              যাঁদের বেতন থেকে ভবিষ্য তহবিলে টাকা জমা হয় এবং বছর শেষে স্ল্যাব হারে মুনাফা যোগ হয়।
            </p>
          </div>
          <div className="row g-4">
            {AUDIENCE.map((a) => (
              <div className="col-sm-6 col-lg-3" key={a.title}>
                <div className="feature-card text-center">
                  <div className="feature-icon mx-auto">
                    <i className={`bi ${a.icon}`} />
                  </div>
                  <h6 className="fw-semibold">{a.title}</h6>
                  <p className="small text-secondary mb-0">{a.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FAQ teaser ---------------- */}
      <section className="section section-alt">
        <div className="container" style={{ maxWidth: 860 }}>
          <div className="text-center">
            <h2 className="section-title">সাধারণ কিছু প্রশ্ন</h2>
            <p className="section-sub">আরও প্রশ্নের উত্তর পাবেন প্রশ্নোত্তর পেজে।</p>
          </div>
          <details className="faq-item">
            <summary>এটা ব্যবহার করতে কি টাকা লাগবে?</summary>
            <div className="faq-body">না। GPF ক্যালকুলেটর সম্পূর্ণ বিনামূল্যে, কোনো লুকানো চার্জ নেই।</div>
          </details>
          <details className="faq-item">
            <summary>আমার হিসাব কি অন্য কেউ দেখতে পাবে?</summary>
            <div className="faq-body">
              না। প্রতিটি হিসাব আপনার অ্যাকাউন্টের সাথে যুক্ত থাকে এবং লগইন ছাড়া কেউ দেখতে পারে না।
            </div>
          </details>
          <details className="faq-item">
            <summary>হিসাব কি অফিসের স্টেটমেন্টের সাথে মিলবে?</summary>
            <div className="faq-body">
              একটি বাস্তব স্টেটমেন্টের সাথে পয়সা পর্যন্ত মিলিয়ে নিয়মগুলো তৈরি। আপনার ফান্ডের নিয়ম
              আলাদা হলে স্টেটমেন্টের মুনাফা বসিয়ে দিন — অ্যাপ সঠিক হার খুঁজে বের করবে।
            </div>
          </details>
          <div className="text-center mt-3">
            <Link href="/faq" className="btn btn-outline-brand">
              সব প্রশ্নোত্তর দেখুন
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
