import Link from "next/link";
import PageHero from "@/components/public/PageHero";
import CtaBanner from "@/components/public/CtaBanner";
import { sampleResult } from "@/lib/sample";
import { bnMoney, bnNum, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "কীভাবে কাজ করে",
  description:
    "GPF ক্যালকুলেটর কীভাবে প্রারম্ভিক জমার স্ল্যাব মুনাফা আর মাসভিত্তিক চাঁদার মুনাফা হিসাব করে — একটি পূর্ণাঙ্গ উদাহরণসহ।",
  path: "/how-it-works",
});

const STEPS = [
  {
    title: "রেজিস্ট্রেশন করুন",
    text: "নাম, মোবাইল নম্বর (ইমেইল ঐচ্ছিক) আর একটি পাসওয়ার্ড দিন। সাথে সাথেই আপনার ড্যাশবোর্ড খুলে যাবে।",
  },
  {
    title: "নতুন অর্থবছর খুলুন",
    text: "“নতুন হিসাব” চাপুন। অর্থবছর (জুলাই–জুন) আর স্টেটমেন্টের Opening Balance বসান।",
  },
  {
    title: "স্ল্যাব ও হার দেখে নিন",
    text: "ডিফল্ট স্ল্যাব ১৫ লক্ষ @১৩%, পরের ১৫ লক্ষ @১২%, বাকি @১১%। আপনার ফান্ডের হার আলাদা হলে বদলে নিন।",
  },
  {
    title: "১২ মাসের চাঁদা বসান",
    text: "প্রতি মাসের চাঁদা, রিফান্ড বা উত্তোলন লিখুন। সব মাসে একই চাঁদা হলে একবার লিখে “বসান” চাপলেই হবে।",
  },
  {
    title: "ফলাফল মিলিয়ে দেখুন",
    text: "ডান পাশে সাথে সাথে মুনাফা আর Closing Balance দেখাবে। স্টেটমেন্টের অঙ্ক বসিয়ে মিলিয়েও নিতে পারেন।",
  },
  {
    title: "সংরক্ষণ করে পরের বছরে যান",
    text: "সংরক্ষণ করুন, প্রিন্ট করুন, আর “পরের বছর” চাপলে সমাপনী জমা নিয়েই নতুন বছর শুরু হবে।",
  },
];

export default function HowItWorksPage() {
  const r = sampleResult();
  const filled = r.slabLines.filter((l) => l.amount > 0);

  return (
    <>
      <PageHero
        icon="bi-gear"
        eyebrow="কীভাবে কাজ করে"
        title="তথ্য বসান, বাকিটা ক্যালকুলেটরের কাজ"
        text="কোন ধাপে কী করতে হবে, আর ভেতরে হিসাবটা ঠিক কীভাবে হয় — উদাহরণসহ পুরোটা নিচে দেখুন।"
      />

      <section className="section">
        <div className="container">
          <h2 className="section-title mb-4">ব্যবহারের ৬টি ধাপ</h2>
          <div className="row g-4">
            {STEPS.map((s, i) => (
              <div className="col-md-6 col-lg-4" key={s.title}>
                <div className="feature-card d-flex gap-3">
                  <div className="step-num">{bnNum(i + 1)}</div>
                  <div>
                    <h5 className="fw-semibold">{s.title}</h5>
                    <p className="text-secondary mb-0">{s.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container" style={{ maxWidth: 960 }}>
          <h2 className="section-title">একটি পূর্ণাঙ্গ উদাহরণ</h2>
          <p className="text-secondary mb-4">
            ধরা যাক, ২০২৫–২৬ অর্থবছরের শুরুতে (১ জুলাই ২০২৫) একজন গ্রাহকের তহবিলে আছে{" "}
            <strong>৳ {bnMoney(r.openingBalance, 0)}</strong>, আর প্রতি মাসে বেতন থেকে{" "}
            <strong>৳ ১২,০০০</strong> চাঁদা কাটা হয়। (এটি একটি কাল্পনিক উদাহরণ।)
          </p>

          <div className="card mb-4">
            <div className="card-header">
              <i className="bi bi-1-circle me-2" />
              ধাপ ১: প্রারম্ভিক জমার মুনাফা (স্ল্যাব হারে)
            </div>
            <div className="table-responsive">
              <table className="table mb-0 align-middle">
                <thead>
                  <tr>
                    <th>ধাপ</th>
                    <th className="text-end">এই ধাপে পড়া টাকা</th>
                    <th className="text-end">হার</th>
                    <th className="text-end">মুনাফা</th>
                  </tr>
                </thead>
                <tbody>
                  {filled.map((l) => (
                    <tr key={l.order}>
                      <td>{bnNum(l.order)} নম্বর ধাপ</td>
                      <td className="text-end">৳ {bnMoney(l.amount)}</td>
                      <td className="text-end">{bnNum(l.rate)}%</td>
                      <td className="text-end">৳ {bnMoney(l.interest)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="table-light fw-bold">
                  <tr>
                    <td colSpan={3}>প্রারম্ভিক জমার মোট মুনাফা</td>
                    <td className="text-end">৳ {bnMoney(r.openingInterest)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-header">
              <i className="bi bi-2-circle me-2" />
              ধাপ ২: চাঁদার মুনাফা (মাস অনুপাতে, {bnNum(r.depositRate)}% হারে)
            </div>
            <div className="card-body">
              <p className="small text-secondary">
                প্রারম্ভিক জমা ১৫ লক্ষ পেরিয়ে দ্বিতীয় ধাপে পৌঁছেছে, তাই নতুন চাঁদা পায় সেই ধাপের হার —{" "}
                <strong>{bnNum(r.depositRate)}%</strong>। প্রতিটি মাসের চাঁদা যত মাস তহবিলে থাকে, তত মাসের
                মুনাফা পায়:
              </p>
              <div className="formula mb-0">
                {`মুনাফা = চাঁদা × হার × (তহবিলে থাকা মাস ÷ ১২)\n\n`}
                {r.rows
                  .map(
                    (row) =>
                      `${row.bn.padEnd(10)} ১২,০০০ × ${bnNum(r.depositRate)}% × ${bnNum(row.held)}/১২ = ${bnMoney(row.netInterest)}`
                  )
                  .join("\n")}
                {`\n\nমোট চাঁদার মুনাফা = ${bnMoney(r.depositInterest)}`}
              </div>
            </div>
          </div>

          <div className="card border-success">
            <div className="card-header bg-success text-white">
              <i className="bi bi-3-circle me-2" />
              ধাপ ৩: বছর শেষের ফলাফল
            </div>
            <div className="card-body">
              <div className="result-line">
                <span className="label">প্রারম্ভিক জমা</span>
                <span className="value">৳ {bnMoney(r.openingBalance)}</span>
              </div>
              <div className="result-line">
                <span className="label">+ বছরের মোট চাঁদা</span>
                <span className="value">৳ {bnMoney(r.totalSubscription)}</span>
              </div>
              <div className="result-line">
                <span className="label">
                  + মোট মুনাফা ({bnMoney(r.openingInterest)} + {bnMoney(r.depositInterest)})
                </span>
                <span className="value text-success">৳ {bnMoney(r.profit)}</span>
              </div>
              <div className="result-line">
                <span className="label fw-bold text-dark">= সমাপনী জমা (৩০ জুন ২০২৬)</span>
                <span className="value fs-5 text-success">৳ {bnMoney(r.closingBalance)}</span>
              </div>
            </div>
          </div>

          <div className="info-box mt-4">
            <i className="bi bi-info-circle me-1" />
            অ্যাপে এই পুরো হিসাব আপনার নিজের অঙ্কে সাথে সাথে হয়ে যায় — কোনো সূত্র লিখতে হয় না।
            নিয়মগুলোর বিস্তারিত পড়ুন <Link href="/gpf-guide">GPF নির্দেশিকা</Link> পেজে।
          </div>
        </div>
      </section>

      <CtaBanner title="নিজের অঙ্কে হিসাবটা দেখতে চান?" />
    </>
  );
}
