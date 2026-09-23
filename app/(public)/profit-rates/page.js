import PageHero from "@/components/public/PageHero";
import CtaBanner from "@/components/public/CtaBanner";
import { splitSlabs, marginalRate, money } from "@/lib/calc";
import { DEFAULT_SLABS } from "@/lib/constants";
import { bnMoney, bnNum, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "মুনাফার হার",
  description:
    "GPF-এর স্ল্যাব-ভিত্তিক মুনাফার হার: ১৫ লক্ষ পর্যন্ত ১৩%, ১৫–৩০ লক্ষ ১২%, ৩০ লক্ষের বেশি ১১% — বিভিন্ন জমার অঙ্কে বছরে কত মুনাফা হয় তার তালিকা।",
  path: "/profit-rates",
});

const BALANCES = [500000, 1000000, 1500000, 2000000, 2500000, 3000000, 4000000, 5000000, 7500000, 10000000];

const lakh = (v) => `${bnNum(v / 100000)} লক্ষ`;

export default function ProfitRatesPage() {
  const rows = BALANCES.map((balance) => {
    const lines = splitSlabs(balance, DEFAULT_SLABS);
    const interest = money(lines.reduce((s, l) => s + l.interest, 0));
    return {
      balance,
      lines,
      interest,
      effective: (interest / balance) * 100,
      marginal: marginalRate(balance, DEFAULT_SLABS),
    };
  });

  return (
    <>
      <PageHero
        icon="bi-percent"
        eyebrow="মুনাফার হার"
        title="কত জমায় বছরে কত মুনাফা?"
        text="ধাপভিত্তিক হার, কার্যকর গড় হার আর নতুন চাঁদার হার — বিভিন্ন অঙ্কের উদাহরণসহ।"
      />

      <section className="section">
        <div className="container">
          <div className="row g-4 mb-5">
            {DEFAULT_SLABS.map((s, i) => (
              <div className="col-md-4" key={i}>
                <div className="feature-card text-center">
                  <div className="text-secondary mb-1">
                    {i === 0
                      ? "প্রথম ১৫ লক্ষ টাকা"
                      : s.upTo
                        ? "পরবর্তী ১৫ লক্ষ টাকা"
                        : "৩০ লক্ষের উপরের অংশ"}
                  </div>
                  <div className="display-5 fw-bold text-success">{bnNum(s.rate)}%</div>
                  <div className="small text-secondary">বার্ষিক মুনাফা</div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="section-title">জমার অঙ্ক অনুযায়ী প্রারম্ভিক জমার বার্ষিক মুনাফা</h2>
          <p className="text-secondary mb-3">
            নিচের টেবিলে ধরা হয়েছে টাকাটা পুরো বছর (১ জুলাই থেকে ৩০ জুন) তহবিলে ছিল। “কার্যকর হার” মানে
            পুরো জমার উপর গড়ে কত শতাংশ পড়ল; “নতুন চাঁদার হার” মানে ঐ জমায় বছরে নতুন চাঁদা কত হার পাবে।
          </p>
          <div className="card mb-4">
            <div className="table-responsive">
              <table className="table table-hover mb-0 align-middle">
                <thead>
                  <tr>
                    <th>প্রারম্ভিক জমা</th>
                    <th className="text-end d-none d-md-table-cell">১৩% ধাপে</th>
                    <th className="text-end d-none d-md-table-cell">১২% ধাপে</th>
                    <th className="text-end d-none d-md-table-cell">১১% ধাপে</th>
                    <th className="text-end">বার্ষিক মুনাফা</th>
                    <th className="text-end">কার্যকর হার</th>
                    <th className="text-end">নতুন চাঁদার হার</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.balance}>
                      <td className="fw-semibold text-nowrap">৳ {lakh(r.balance)}</td>
                      {r.lines.map((l) => (
                        <td className="text-end d-none d-md-table-cell text-secondary" key={l.order}>
                          {l.amount ? bnMoney(l.interest, 0) : "—"}
                        </td>
                      ))}
                      <td className="text-end fw-bold text-success text-nowrap">৳ {bnMoney(r.interest, 0)}</td>
                      <td className="text-end">{bnNum(r.effective.toFixed(2))}%</td>
                      <td className="text-end">
                        <span className="badge text-bg-light border">{bnNum(r.marginal)}%</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-lg-6">
              <div className="info-box h-100">
                <div className="fw-semibold mb-1">
                  <i className="bi bi-graph-down me-1" />
                  জমা যত বাড়ে, গড় হার তত কমে
                </div>
                <p className="small mb-0">
                  ১৫ লক্ষ পর্যন্ত পুরো জমা ১৩% পায়। এর উপরের টাকা কম হার পায়, তাই বড় জমায় কার্যকর গড়
                  হার ধীরে ধীরে ১১%-এর দিকে নামে। তবে মোট মুনাফার অঙ্ক সবসময়ই বাড়তে থাকে।
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="info-box warn h-100">
                <div className="fw-semibold mb-1">
                  <i className="bi bi-info-circle me-1" />
                  হার বদলাতে পারে
                </div>
                <p className="small mb-0">
                  সরকার বিভিন্ন সময়ে GPF-এর মুনাফার হার পুনর্নির্ধারণ করে। নতুন প্রজ্ঞাপন এলে
                  ক্যালকুলেটরে স্ল্যাবের পরিমাণ ও হার নিজেই বদলে নিতে পারবেন — কোনো আপডেটের অপেক্ষা
                  লাগবে না।
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner title="আপনার জমায় কত মুনাফা হবে?" text="নিজের প্রারম্ভিক জমা আর মাসিক চাঁদা বসিয়ে সঠিক অঙ্কটা দেখে নিন।" />
    </>
  );
}
