import PageHero from "@/components/public/PageHero";
import CtaBanner from "@/components/public/CtaBanner";
import JsonLd from "@/components/JsonLd";
import { splitSlabs, marginalRate, money } from "@/lib/calc";
import { DEFAULT_SLABS } from "@/lib/constants";
import { getLang } from "@/lib/lang";
import { tr, localMoney, localNum } from "@/lib/i18n";
import { pageMetadata } from "@/lib/site";
import { breadcrumbLd } from "@/lib/seo";

const COPY = {
  bn: {
    title: "GPF মুনাফার হার ২০২৫–২৬: ১৩%, ১২%, ১১% স্ল্যাব ও উদাহরণ",
    description:
      "সাধারণ ভবিষ্য তহবিলের স্ল্যাব-ভিত্তিক মুনাফার হার: ১৫ লক্ষ পর্যন্ত ১৩%, ১৫–৩০ লক্ষ ১২%, ৩০ লক্ষের বেশি ১১%। ৫ লক্ষ থেকে ১ কোটি পর্যন্ত জমায় বছরে কত মুনাফা হয় তার তালিকা।",
    keywords: ["GPF সুদের হার ২০২৫", "জিপিএফ মুনাফার হার", "GPF ১৩% ১২% ১১%"],
  },
  en: {
    title: "GPF profit rates 2025–26: 13%, 12%, 11% slabs with examples",
    description:
      "General Provident Fund slab profit rates: 13% up to 15 lakh, 12% from 15–30 lakh, 11% above 30 lakh — with the yearly profit for balances from 5 lakh to 1 crore.",
    keywords: ["GPF interest rate 2025", "GPF profit rate Bangladesh", "GPF 13% 12% 11%"],
  },
};

export async function generateMetadata() {
  return pageMetadata(await getLang(), "/profit-rates", COPY);
}

const BALANCES = [500000, 1000000, 1500000, 2000000, 2500000, 3000000, 4000000, 5000000, 7500000, 10000000];

export default async function ProfitRatesPage() {
  const lang = await getLang();
  const t = tr(lang);
  const n = (v) => localNum(v, lang);
  const lakh = (v) => t(`${n(v / 100000)} লক্ষ`, `${v / 100000} lakh`);

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

  const bandLabel = [
    t("প্রথম ১৫ লক্ষ টাকা", "First 15 lakh taka"),
    t("পরবর্তী ১৫ লক্ষ টাকা", "Next 15 lakh taka"),
    t("৩০ লক্ষের উপরের অংশ", "Above 30 lakh"),
  ];

  return (
    <>
      <JsonLd data={breadcrumbLd(lang, [{ name: t("মুনাফার হার", "Profit rates"), path: "/profit-rates" }])} />
      <PageHero
        lang={lang}
        icon="bi-percent"
        eyebrow={t("মুনাফার হার", "Profit rates")}
        title={t("GPF-এ কত জমায় বছরে কত মুনাফা?", "How much profit does your GPF balance earn?")}
        text={t(
          "ধাপভিত্তিক হার, কার্যকর গড় হার আর নতুন চাঁদার হার — বিভিন্ন অঙ্কের উদাহরণসহ।",
          "Band rates, the effective average rate and the rate new subscriptions earn — with examples at different balances."
        )}
      />

      <section className="section">
        <div className="container">
          <div className="row g-4 mb-5">
            {DEFAULT_SLABS.map((s, i) => (
              <div className="col-md-4" key={i}>
                <div className="feature-card text-center">
                  <div className="text-secondary mb-1">{bandLabel[i]}</div>
                  <div className="display-5 fw-bold text-success">{n(s.rate)}%</div>
                  <div className="small text-secondary">{t("বার্ষিক মুনাফা", "annual profit")}</div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="section-title">
            {t("জমার অঙ্ক অনুযায়ী প্রারম্ভিক জমার বার্ষিক মুনাফা", "Annual profit on the opening balance, by amount")}
          </h2>
          <p className="text-secondary mb-3">
            {t(
              "নিচের টেবিলে ধরা হয়েছে টাকাটা পুরো বছর (১ জুলাই থেকে ৩০ জুন) তহবিলে ছিল। “কার্যকর হার” মানে পুরো জমার উপর গড়ে কত শতাংশ পড়ল; “নতুন চাঁদার হার” মানে ঐ জমায় বছরে নতুন চাঁদা কত হার পাবে।",
              "The table assumes the money stayed in the fund all year (1 July to 30 June). “Effective rate” is the average across the whole balance; “new subscription rate” is what new subscriptions earn at that balance."
            )}
          </p>
          <div className="card mb-4">
            <div className="table-responsive">
              <table className="table table-hover mb-0 align-middle">
                <thead>
                  <tr>
                    <th>{t("প্রারম্ভিক জমা", "Opening balance")}</th>
                    {DEFAULT_SLABS.map((s) => (
                      <th className="text-end d-none d-md-table-cell" key={s.rate}>
                        {t(`${n(s.rate)}% ধাপে`, `At ${s.rate}%`)}
                      </th>
                    ))}
                    <th className="text-end">{t("বার্ষিক মুনাফা", "Annual profit")}</th>
                    <th className="text-end">{t("কার্যকর হার", "Effective rate")}</th>
                    <th className="text-end">{t("নতুন চাঁদার হার", "New subscription rate")}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.balance}>
                      <td className="fw-semibold text-nowrap">৳ {lakh(r.balance)}</td>
                      {r.lines.map((l) => (
                        <td className="text-end d-none d-md-table-cell text-secondary" key={l.order}>
                          {l.amount ? localMoney(l.interest, lang, 0) : "—"}
                        </td>
                      ))}
                      <td className="text-end fw-bold text-success text-nowrap">৳ {localMoney(r.interest, lang, 0)}</td>
                      <td className="text-end">{n(r.effective.toFixed(2))}%</td>
                      <td className="text-end">
                        <span className="badge text-bg-light border">{n(r.marginal)}%</span>
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
                  {t("জমা যত বাড়ে, গড় হার তত কমে", "Bigger balance, lower average rate")}
                </div>
                <p className="small mb-0">
                  {t(
                    "১৫ লক্ষ পর্যন্ত পুরো জমা ১৩% পায়। এর উপরের টাকা কম হার পায়, তাই বড় জমায় কার্যকর গড় হার ধীরে ধীরে ১১%-এর দিকে নামে। তবে মোট মুনাফার অঙ্ক সবসময়ই বাড়তে থাকে।",
                    "Up to 15 lakh everything earns 13%. Money above that earns less, so the effective rate drifts towards 11% on large balances — but the total profit always keeps rising."
                  )}
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="info-box warn h-100">
                <div className="fw-semibold mb-1">
                  <i className="bi bi-info-circle me-1" />
                  {t("হার বদলাতে পারে", "Rates can change")}
                </div>
                <p className="small mb-0">
                  {t(
                    "সরকার বিভিন্ন সময়ে GPF-এর মুনাফার হার পুনর্নির্ধারণ করে। নতুন প্রজ্ঞাপন এলে ক্যালকুলেটরে স্ল্যাবের পরিমাণ ও হার নিজেই বদলে নিতে পারবেন।",
                    "The government revises GPF profit rates from time to time. When a new circular comes out you can update band sizes and rates in the calculator yourself."
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        lang={lang}
        title={t("আপনার জমায় কত মুনাফা হবে?", "What will your balance earn?")}
        text={t(
          "নিজের প্রারম্ভিক জমা আর মাসিক চাঁদা বসিয়ে সঠিক অঙ্কটা দেখে নিন।",
          "Enter your own opening balance and monthly subscription to see the exact figure."
        )}
      />
    </>
  );
}
