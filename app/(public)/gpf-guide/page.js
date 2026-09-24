import Link from "next/link";
import PageHero from "@/components/public/PageHero";
import CtaBanner from "@/components/public/CtaBanner";
import JsonLd from "@/components/JsonLd";
import { getLang } from "@/lib/lang";
import { tr, localePath } from "@/lib/i18n";
import { pageMetadata } from "@/lib/site";
import { articleLd, breadcrumbLd } from "@/lib/seo";

const COPY = {
  bn: {
    title: "সাধারণ ভবিষ্য তহবিল (GPF) নির্দেশিকা — নিয়ম, হার ও হিসাব",
    description:
      "সাধারণ ভবিষ্য তহবিল (GPF) কী, কারা চাঁদা দেন, মুনাফা কীভাবে হিসাব হয়, স্ল্যাব হার, মাসভিত্তিক মুনাফা, অগ্রিম ও উত্তোলন, স্টেটমেন্ট পড়ার নিয়ম — সহজ বাংলায় পূর্ণাঙ্গ নির্দেশিকা।",
    keywords: ["GPF কী", "সাধারণ ভবিষ্য তহবিল বিধিমালা", "GPF নিয়ম"],
  },
  en: {
    title: "General Provident Fund (GPF) guide — rules, rates and calculation",
    description:
      "What the General Provident Fund (GPF) is, who subscribes, how profit is calculated, slab rates, month-wise profit, advances and withdrawals, and how to read your statement — a complete guide.",
    keywords: ["what is GPF", "GPF rules Bangladesh", "General Provident Fund Rules 1979"],
  },
};

export async function generateMetadata() {
  return pageMetadata(await getLang(), "/gpf-guide", COPY);
}

export default async function GpfGuidePage() {
  const lang = await getLang();
  const t = tr(lang);
  const rates = localePath("/profit-rates", lang);

  const toc = [
    ["what", t("GPF কী", "What is GPF")],
    ["who", t("কারা চাঁদা দেন", "Who subscribes")],
    ["year", t("অর্থবছর ও হিসাবের সময়", "Fiscal year and timing")],
    ["opening", t("প্রারম্ভিক জমার মুনাফা", "Opening-balance profit")],
    ["monthly", t("চাঁদার মুনাফা মাস ধরে", "Month-wise subscription profit")],
    ["rate", t("চাঁদা কোন হার পায়", "Which rate subscriptions earn")],
    ["advance", t("অগ্রিম, ফেরত ও উত্তোলন", "Advances, refunds, withdrawals")],
    ["paisa", t("পয়সার হিসাব", "Paisa rounding")],
    ["statement", t("স্টেটমেন্ট যেভাবে পড়বেন", "Reading your statement")],
    ["tips", t("কাজের কিছু পরামর্শ", "Practical tips")],
  ];

  const statementRows = [
    ["Opening Balance", t("১ জুলাই তারিখে তহবিলে থাকা মোট টাকা (আগের বছরের সমাপনী জমা)", "Everything in the fund on 1 July (last year's closing balance)")],
    ["Subscription", t("এ বছর বেতন থেকে কাটা মোট চাঁদা", "Total deducted from salary this year")],
    ["Refund", t("অগ্রিমের কিস্তি হিসেবে ফেরত দেওয়া টাকা", "Advance instalments paid back")],
    ["Withdrawal(s)", t("এ বছর তোলা টাকা", "Money taken out this year")],
    ["Profit for the year", t("প্রারম্ভিক জমার স্ল্যাব মুনাফা + চাঁদার মাসভিত্তিক মুনাফা", "Slab profit on opening balance + month-wise subscription profit")],
    ["Closing Balance", "Opening + Subscription + Refund − Withdrawal + Profit"],
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd(lang, [{ name: t("GPF নির্দেশিকা", "GPF guide"), path: "/gpf-guide" }]),
          articleLd(lang, { ...COPY[lang], path: "/gpf-guide", date: "2026-09-23" }),
        ]}
      />
      <PageHero
        lang={lang}
        icon="bi-book"
        eyebrow={t("GPF নির্দেশিকা", "GPF guide")}
        title={t("সাধারণ ভবিষ্য তহবিল — সহজ বাংলায় পুরো ব্যাপারটা", "The General Provident Fund, explained simply")}
        text={t(
          "আপনার বেতন থেকে কাটা টাকা বছর শেষে কীভাবে মুনাফাসহ বাড়ে, স্টেটমেন্টের প্রতিটি লাইনের মানে কী — এক জায়গায়।",
          "How the money deducted from your salary grows with profit each year, and what every line of your statement means."
        )}
      />

      <section className="section">
        <div className="container">
          <div className="row g-5">
            <aside className="col-lg-3 d-none d-lg-block">
              <div className="card" style={{ position: "sticky", top: 90 }}>
                <div className="card-header">{t("সূচিপত্র", "Contents")}</div>
                <div className="list-group list-group-flush small">
                  {toc.map(([id, label]) => (
                    <a key={id} href={`#${id}`} className="list-group-item list-group-item-action">
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </aside>

            <article className="col-lg-9 prose">
              <div className="info-box warn mb-4">
                <i className="bi bi-exclamation-triangle me-1" />
                {t(
                  "এই নির্দেশিকা সাধারণ ধারণা দেওয়ার জন্য। বিধিমালা, হার ও প্রক্রিয়া সময়ে সময়ে বদলায় এবং প্রতিষ্ঠানভেদে ভিন্ন হতে পারে। চূড়ান্ত সিদ্ধান্তের আগে আপনার হিসাবরক্ষণ অফিস বা সর্বশেষ সরকারি প্রজ্ঞাপন দেখে নিন।",
                  "This guide gives a general overview. Rules, rates and procedures change over time and can differ between organisations — check with your accounts office or the latest government circular before making decisions."
                )}
              </div>

              <h2 id="what">{t("GPF কী?", "What is GPF?")}</h2>
              <p>
                {t(
                  "সাধারণ ভবিষ্য তহবিল বা General Provident Fund (GPF) হলো সরকারি চাকরিজীবীদের একটি সঞ্চয় তহবিল। প্রতি মাসে বেতন থেকে নির্দিষ্ট অঙ্কের চাঁদা কেটে এই তহবিলে জমা হয়, আর প্রতি অর্থবছর শেষে জমা টাকার উপর সরকার-নির্ধারিত হারে মুনাফা যোগ হয়। চাকরি শেষে বা অবসরে পুরো জমা মুনাফাসহ ফেরত পাওয়া যায়। বাংলাদেশে এটি মূলত সাধারণ ভবিষ্য তহবিল বিধিমালা, ১৯৭৯ অনুযায়ী পরিচালিত হয়।",
                  "The General Provident Fund (GPF) is a savings fund for government employees. A set subscription is deducted from salary every month, and at the end of each fiscal year profit is added at government-set rates. The whole balance, with profit, is paid out when service ends or at retirement. In Bangladesh it is governed mainly by the General Provident Fund Rules, 1979."
                )}
              </p>
              <p>
                {t(
                  "সহজ কথায়: এটা আপনার নিজের টাকার একটা দীর্ঘমেয়াদি সঞ্চয়, যেখানে ব্যাংকের সাধারণ সঞ্চয়ের চেয়ে সাধারণত বেশি হারে মুনাফা মেলে এবং ঝুঁকি প্রায় নেই।",
                  "Put simply, it is long-term saving of your own money that usually earns more than an ordinary bank deposit, with almost no risk."
                )}
              </p>

              <h2 id="who">{t("কারা চাঁদা দেন?", "Who subscribes?")}</h2>
              <p>
                {t(
                  "স্থায়ী পদে নিয়োগপ্রাপ্ত সরকারি কর্মকর্তা-কর্মচারী, সরকারি শিক্ষকসহ নির্ধারিত শ্রেণির চাকরিজীবীরা GPF-এ চাঁদা দেন। চাঁদার হার সাধারণত মূল বেতনের একটি নির্দিষ্ট শতাংশের মধ্যে নিজে বেছে নেওয়া যায় (প্রচলিতভাবে ন্যূনতম ৫% থেকে সর্বোচ্চ ২৫%)। অনেক স্বায়ত্তশাসিত প্রতিষ্ঠানেও একই ধরনের প্রভিডেন্ট ফান্ড (CPF/PF) চালু আছে।",
                  "Permanent government officers and staff, government teachers and other specified employees subscribe to GPF. The subscription is usually chosen within a range of basic pay (commonly 5% minimum to 25% maximum). Many autonomous bodies run similar provident funds (CPF/PF)."
                )}
              </p>

              <h2 id="year">{t("অর্থবছর ও হিসাবের সময়", "Fiscal year and timing")}</h2>
              <p>
                {t(
                  "GPF-এর হিসাব চলে সরকারি অর্থবছর ধরে — ১ জুলাই থেকে ৩০ জুন। বছরের শুরুতে তহবিলে যা থাকে সেটাই প্রারম্ভিক জমা (Opening Balance)। বছরজুড়ে মাসে মাসে চাঁদা জমা হয়, আর ৩০ জুন বছরের মুনাফা যোগ করা হয়। মুনাফাসহ বছর শেষের অঙ্কটাই সমাপনী জমা (Closing Balance), যা পরের বছরের প্রারম্ভিক জমা হয়।",
                  "GPF runs on the government fiscal year — 1 July to 30 June. What the fund holds at the start is the Opening Balance. Subscriptions arrive month by month, and the year's profit is added on 30 June. The year-end figure with profit is the Closing Balance, which becomes next year's opening balance."
                )}
              </p>

              <h2 id="opening">{t("প্রারম্ভিক জমার মুনাফা — স্ল্যাব পদ্ধতি", "Opening-balance profit — the slab method")}</h2>
              <p>
                {t(
                  "পুরো প্রারম্ভিক জমায় একটাই হার বসে না। জমাকে কয়েকটি ধাপে (স্ল্যাব) ভাগ করা হয়, আর প্রতিটি ধাপের নিজস্ব হার থাকে। বর্তমানে প্রচলিত ধাপগুলো:",
                  "The whole opening balance does not earn a single rate. It is split into bands (slabs), each with its own rate. The current bands are:"
                )}
              </p>
              <ul>
                <li>{t("প্রথম ১৫ লক্ষ টাকায় — ১৩%", "First 15 lakh taka — 13%")}</li>
                <li>{t("পরবর্তী ১৫ লক্ষ টাকায় (১৫ থেকে ৩০ লক্ষ) — ১২%", "Next 15 lakh taka (15 to 30 lakh) — 12%")}</li>
                <li>{t("৩০ লক্ষ টাকার উপরের অংশে — ১১%", "Above 30 lakh taka — 11%")}</li>
              </ul>
              <p>
                {t(
                  "অর্থাৎ ৪০ লক্ষ টাকা জমা থাকলে মুনাফা হবে: ১৫ লক্ষের ১৩% + ১৫ লক্ষের ১২% + বাকি ১০ লক্ষের ১১%। এখানে “১৫ লক্ষ” হলো প্রতিটি ধাপের আকার, মোট সীমা নয়। বিস্তারিত উদাহরণ দেখুন ",
                  "So a balance of 40 lakh earns 13% of 15 lakh + 12% of 15 lakh + 11% of the remaining 10 lakh. Here “15 lakh” is the size of each band, not a cumulative ceiling. See detailed examples on the "
                )}
                <Link href={rates}>{t("মুনাফার হার", "profit rates")}</Link>
                {t(" পেজে।", " page.")}
              </p>

              <h2 id="monthly">{t("চাঁদার মুনাফা — মাস ধরে হিসাব", "Subscription profit — month by month")}</h2>
              <p>
                {t(
                  "বছরের মধ্যে জমা হওয়া চাঁদা পুরো বছরের মুনাফা পায় না — যত মাস তহবিলে ছিল, তত মাসের মুনাফা পায়। জুলাইয়ের চাঁদা থাকে ১২ মাস, আগস্টের ১১ মাস, এভাবে জুনের চাঁদা মাত্র ১ মাস।",
                  "Money subscribed during the year doesn't earn a full year — only the months it was in the fund. July's subscription stays 12 months, August's 11, down to June's single month."
                )}
              </p>
              <div className="formula mb-3">
                {t(
                  "মাসের মুনাফা = চাঁদা × হার × (তহবিলে থাকা মাস ÷ ১২)\n\nজুলাই  → ১২/১২   আগস্ট → ১১/১২   ...   মে → ২/১২   জুন → ১/১২",
                  "Monthly profit = subscription × rate × (months held ÷ 12)\n\nJuly → 12/12   August → 11/12   ...   May → 2/12   June → 1/12"
                )}
              </div>
              <p>
                {t(
                  "তাই একই পরিমাণ চাঁদা হলেও বছরের শুরুর দিকের চাঁদা বেশি মুনাফা আনে। ১২ মাসে সমান চাঁদা হলে গড়ে মোট চাঁদার প্রায় ৬.৫ মাসের মুনাফা পাওয়া যায় (১২+১১+…+১ = ৭৮, ৭৮÷১২ = ৬.৫)।",
                  "So early-year subscriptions earn more than late ones of the same size. With equal monthly amounts, the total earns about 6.5 months' profit on average (12+11+…+1 = 78, 78÷12 = 6.5)."
                )}
              </p>

              <h2 id="rate">{t("চাঁদা কোন হার পায়?", "Which rate do subscriptions earn?")}</h2>
              <p>
                {t(
                  "অনেকে ধারণা করেন চাঁদার উপর আলাদা কম হার (যেমন ৮.৫%) বসে। কিন্তু একটি বাস্তব অফিসিয়াল স্টেটমেন্ট বিশ্লেষণ করে দেখা গেছে, নতুন চাঁদা পায় প্রারম্ভিক জমা যে ধাপে গিয়ে পৌঁছেছে সেই ধাপের হার — যাকে প্রান্তিক (marginal) হার বলা যায়। যেমন জমা ৩০ লক্ষ পেরোলে নতুন চাঁদা পায় ১১%, ১৫–৩০ লক্ষের মধ্যে থাকলে ১২%।",
                  "Many assume subscriptions earn a separate lower rate such as 8.5%. Analysis of a real official statement showed that new subscriptions earn the rate of the band the opening balance has reached — the marginal rate. Above 30 lakh that is 11%; between 15 and 30 lakh, 12%."
                )}
              </p>
              <p>
                {t(
                  "আপনার ফান্ড অন্য নিয়ম মানলে ক্যালকুলেটরে “নিজে রেট লিখব” বেছে যেকোনো হার বসাতে পারেন। স্টেটমেন্টের মুনাফা জানা থাকলে অ্যাপ নিজেই আসল হার খুঁজে বের করে দেয়।",
                  "If your fund works differently, choose “Enter my own rate” in the calculator. If you know the statement's profit, the app finds the real rate for you."
                )}
              </p>

              <h2 id="advance">{t("অগ্রিম, ফেরত ও উত্তোলন", "Advances, refunds and withdrawals")}</h2>
              <p>
                {t(
                  "প্রয়োজনে GPF থেকে অগ্রিম (যা কিস্তিতে ফেরত দিতে হয়) বা নির্দিষ্ট কারণে অফেরতযোগ্য উত্তোলন নেওয়া যায় — শর্ত ও সীমা বিধিমালা অনুযায়ী।",
                  "You can take a refundable advance (repaid in instalments) or, for specified purposes, a non-refundable withdrawal from GPF — subject to the rules' conditions and limits."
                )}
              </p>
              <ul>
                <li>
                  {t(
                    "উত্তোলন: যে মাসে টাকা তোলা হয়, সেই টাকা বছরের বাকি মাসগুলোর মুনাফা হারায়। ক্যালকুলেটর উত্তোলনের মাস ধরে সেই মুনাফা বাদ দেয়।",
                    "Withdrawal: money taken out loses profit for the rest of the year. The calculator removes that profit based on the month."
                  )}
                </li>
                <li>
                  {t(
                    "অগ্রিমের কিস্তি ফেরত (রিফান্ড): ফেরত দেওয়া টাকা চাঁদার মতোই জমা হয় এবং জমার মাস থেকে মুনাফা পায়।",
                    "Advance repayment (refund): repaid money is credited like a subscription and earns profit from that month."
                  )}
                </li>
              </ul>

              <h2 id="paisa">{t("পয়সার হিসাব — ট্রাংকেট", "Paisa — truncation")}</h2>
              <p>
                {t(
                  "অফিসিয়াল হিসাবে মুনাফার দুই দশমিকের পরের অংশ সাধারণত ফেলে দেওয়া হয়, রাউন্ড করা হয় না। যেমন ১৭৯,৫১৭.১৬৬৪ হয় ১৭৯,৫১৭.১৬। এক পয়সার এই পার্থক্যের কারণেই এক্সেলের হিসাব অনেক সময় স্টেটমেন্টের সাথে মেলে না। ক্যালকুলেটরে দুটো নিয়মই আছে, ডিফল্ট ট্রাংকেট।",
                  "Official calculations usually drop everything past two decimals rather than rounding — 179,517.1664 becomes 179,517.16. That one paisa is why spreadsheet results often don't match the statement. The calculator supports both rules; truncation is the default."
                )}
              </p>

              <h2 id="statement">{t("স্টেটমেন্ট যেভাবে পড়বেন", "How to read your statement")}</h2>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="table-light">
                    <tr>
                      <th>{t("স্টেটমেন্টের লাইন", "Statement line")}</th>
                      <th>{t("মানে", "Meaning")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {statementRows.map(([line, meaning]) => (
                      <tr key={line}>
                        <td>{line}</td>
                        <td>{meaning}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 id="tips">{t("কাজের কিছু পরামর্শ", "Practical tips")}</h2>
              <ul>
                <li>{t("প্রতি বছরের স্টেটমেন্ট সংরক্ষণ করুন এবং ক্যালকুলেটরের হিসাবের সাথে মিলিয়ে দেখুন।", "Keep every year's statement and compare it with the calculator.")}</li>
                <li>{t("কোনো মাসের চাঁদা কাটা না পড়লে বা ভুল অঙ্ক কাটা হলে বছরের মুনাফায় প্রভাব পড়ে — বেতন স্লিপ মিলিয়ে নিন।", "A missed or wrong monthly deduction changes the year's profit — check against your salary slips.")}</li>
                <li>{t("বছরের শুরুর দিকে চাঁদা বাড়ালে বেশি মাসের মুনাফা পাওয়া যায়; চাঁদার হার বদলানোর নিয়ম অফিস থেকে জেনে নিন।", "Raising your subscription early in the year earns more months of profit; ask your office how to change it.")}</li>
                <li>{t("গরমিল পেলে ক্যালকুলেটরের “হিসাবটা কীভাবে হলো” অংশ প্রিন্ট করে হিসাবরক্ষণ অফিসে দেখাতে পারেন।", "Found a mismatch? Print the calculator's “How was this calculated” section and show it to the accounts office.")}</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <CtaBanner
        lang={lang}
        title={t("নিয়মগুলো মুখস্থ রাখার দরকার নেই", "No need to memorise the rules")}
        text={t(
          "ক্যালকুলেটর সব নিয়ম মেনে আপনার হিসাব করে দেবে — শুধু অঙ্কগুলো বসান।",
          "The calculator applies every rule for you — just enter your figures."
        )}
      />
    </>
  );
}
