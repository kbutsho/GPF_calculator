"use client";

import { fmt, show } from "@/lib/calc";
import { DepositMethods, Rounding } from "@/lib/constants";
import { monthName } from "@/lib/i18n";
import { useLang } from "@/components/LangProvider";

const ordinalBn = ["প্রথম", "দ্বিতীয়", "তৃতীয়", "চতুর্থ", "পঞ্চম", "ষষ্ঠ"];
const ordinalEn = ["First", "Second", "Third", "Fourth", "Fifth", "Sixth"];

const pad = (value, width = 14) => fmt(value).padStart(width);

export default function Breakdown({ result }) {
  const { lang, t } = useLang();
  const r = result;
  const truncating = r.rounding === Rounding.TRUNCATE;
  const monthwise = r.depositMethod === DepositMethods.MONTHWISE;
  const ordinal = lang === "en" ? ordinalEn : ordinalBn;

  const julyBase = r.rows[0].subscription + r.rows[0].refund - r.rows[0].withdrawal;

  return (
    <div className="d-flex flex-column gap-3">
      {/* ---------------- Part 1: opening balance ---------------- */}
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span>
            <i className="bi bi-1-circle me-2" />
            {t("ওপেনিং ব্যালেন্সের প্রফিট (স্ল্যাব নিয়ম)", "Profit on the opening balance (slab rule)")}
          </span>
          <span className="num fw-bold">{fmt(r.openingInterest)}</span>
        </div>
        <div className="card-body">
          <p className="section-hint mb-3">
            {t(
              "স্ল্যাব মানে পুরো টাকার উপর এক রেট নয় — টাকাকে সিঁড়ির মতো টুকরো করে প্রতি টুকরোয় আলাদা রেট। এই টাকা পুরো ১২ মাসই ফান্ডে ছিল, তাই পুরো বছরের প্রফিট পায়।",
              "Slabs mean no single rate on the whole amount — the money is cut into steps with a rate for each. This money was in the fund all 12 months, so it earns a full year."
            )}
          </p>
          <div className="table-responsive">
            <table className="table table-sm table-tight align-middle mb-0">
              <thead>
                <tr>
                  <th>{t("স্ল্যাব", "Slab")}</th>
                  <th className="num">{t("যত টাকা এই ধাপে", "Amount in band")}</th>
                  <th className="num">{t("রেট", "Rate")}</th>
                  <th className="num">{t("প্রফিট", "Profit")}</th>
                </tr>
              </thead>
              <tbody>
                {r.slabLines.map((l, i) => (
                  <tr key={i} className={l.amount <= 0 ? "text-muted" : ""}>
                    <td>
                      {l.band === null
                        ? t("বাকি অংশ", "The rest")
                        : t(
                            `${ordinal[i] || i + 1} ধাপ — ${fmt(l.band, 0)} পর্যন্ত`,
                            `${ordinal[i] || i + 1} band — up to ${fmt(l.band, 0)}`
                          )}
                    </td>
                    <td className="num">{fmt(l.amount)}</td>
                    <td className="num">{l.rate}%</td>
                    <td className="num">{fmt(show(l.interest))}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="table-light fw-bold">
                <tr>
                  <td>{t("মোট", "Total")}</td>
                  <td className="num">{fmt(r.openingBalance)}</td>
                  <td />
                  <td className="num">{fmt(r.openingInterest)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          {truncating && Math.abs(r.openingInterestRaw - r.openingInterest) > 0.0001 && (
            <p className="section-hint mt-2 mb-0">
              <i className="bi bi-info-circle me-1" />
              {t(
                `আসল হিসাব ${r.openingInterestRaw.toFixed(4)} — ফান্ড পয়সার পরের অংশ ফেলে দেয়, তাই ${fmt(r.openingInterest)}।`,
                `The exact figure is ${r.openingInterestRaw.toFixed(4)} — the fund drops what's past the paisa, so ${fmt(r.openingInterest)}.`
              )}
            </p>
          )}
        </div>
      </div>

      {/* ---------------- Part 2: this year's deposits ---------------- */}
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span>
            <i className="bi bi-2-circle me-2" />
            {t(`এ বছরের জমার প্রফিট — রেট ${r.depositRate}%`, `Profit on this year's deposits — rate ${r.depositRate}%`)}
          </span>
          <span className="num fw-bold">{fmt(r.depositInterest)}</span>
        </div>
        <div className="card-body">
          <p className="section-hint mb-2">
            {monthwise
              ? t(
                  "জুলাইয়ের টাকা পুরো ১২ মাস বসে ছিল, কিন্তু জুনের টাকা মাত্র ১ মাস। তাই প্রতি মাসের টাকা যত মাস বসেছে সেই অনুপাতেই প্রফিট পায়।",
                  "July's money sat for all 12 months, June's for just one. So each month's money earns in proportion to the months it stayed."
                )
              : t(
                  "নির্বাচিত পদ্ধতি অনুযায়ী প্রতিটি জমাকে একই অনুপাতে প্রফিট দেওয়া হয়েছে।",
                  "Under the chosen method every deposit earns the same proportion."
                )}
          </p>
          <div className="formula mb-3">
            {t(
              `প্রফিট = জমা × ${r.depositRate}% × (কত মাস বসেছে ÷ 12)`,
              `Profit = deposit × ${r.depositRate}% × (months held ÷ 12)`
            )}
          </div>

          <div className="table-responsive">
            <table className="table table-sm table-tight align-middle mb-0">
              <thead>
                <tr>
                  <th>{t("মাস", "Month")}</th>
                  <th className="num">{t("চাঁদা", "Subscription")}</th>
                  <th className="num">{t("রিফান্ড", "Refund")}</th>
                  <th className="num">{t("উত্তোলন", "Withdrawal")}</th>
                  <th className="num">{t("কত মাস", "Months")}</th>
                  <th className="num">{t("হিসাব", "Working")}</th>
                  <th className="num">{t("প্রফিট", "Profit")}</th>
                </tr>
              </thead>
              <tbody>
                {r.rows.map((row) => {
                  const base = row.subscription + row.refund - row.withdrawal;
                  const full = (base * r.depositRate) / 100;
                  return (
                    <tr key={row.index} className={base === 0 ? "text-muted" : ""}>
                      <td>{monthName(row, lang)}</td>
                      <td className="num">{fmt(row.subscription)}</td>
                      <td className="num">{row.refund ? fmt(row.refund) : "—"}</td>
                      <td className="num">{row.withdrawal ? fmt(row.withdrawal) : "—"}</td>
                      <td className="num">{monthwise ? row.held : "—"}</td>
                      <td className="num small text-muted">
                        {base === 0
                          ? "—"
                          : `${fmt(show(full))} × ${monthwise ? `${row.held}/12` : row.factor.toFixed(2)}`}
                      </td>
                      <td className="num">{fmt(show(row.netInterest))}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="table-light fw-bold">
                <tr>
                  <td>{t("মোট", "Total")}</td>
                  <td className="num">{fmt(r.totalSubscription)}</td>
                  <td className="num">{r.totalRefund ? fmt(r.totalRefund) : "—"}</td>
                  <td className="num">{r.totalWithdrawal ? fmt(r.totalWithdrawal) : "—"}</td>
                  <td />
                  <td />
                  <td className="num">{fmt(r.depositInterest)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <p className="section-hint mt-2 mb-0">
            <i className="bi bi-info-circle me-1" />
            {truncating
              ? t(
                  "প্রতিটি লাইন দেখানোর সময় রাউন্ড করা হয়েছে, কিন্তু মোট হিসাবটা পূর্ণ নির্ভুলতায় করে শেষে একবার ট্রাংকেট করা হয় — ঠিক যেভাবে ফান্ড করে।",
                  "Each line is rounded for display, but the total is worked at full precision and truncated once at the end — exactly as the fund does."
                )
              : t(
                  "প্রতিটি লাইন দেখানোর সময় রাউন্ড করা হয়েছে, কিন্তু মোট হিসাবটা পূর্ণ নির্ভুলতায় করে শেষে একবার রাউন্ড করা হয়।",
                  "Each line is rounded for display, but the total is worked at full precision and rounded once at the end."
                )}
          </p>

          {monthwise && (
            <>
              <p className="section-hint mt-3 mb-1 fw-semibold">
                {t("শর্টকাট (পুরো টেবিল না লিখে):", "Shortcut (without the full table):")}
              </p>
              <div className="formula">
                {lang === "en"
                  ? `July        : ${fmt(julyBase)} × ${r.depositRate}% × 12/12
August–June : remaining months 11+10+9+…+1 = 66  →  × 66/12 = × 5.5
──────────────────────────────────────────────────────
Total deposit profit ................ ${fmt(r.depositInterest)}`
                  : `জুলাই     : ${fmt(julyBase)} × ${r.depositRate}% × 12/12
আগস্ট–জুন  : বাকি মাসের যোগফল 11+10+9+…+1 = 66  →  × 66/12 = × 5.5
──────────────────────────────────────────────────────
মোট জমার প্রফিট ..................... ${fmt(r.depositInterest)}`}
              </div>
            </>
          )}

          {r.totalDeposits > 0 && (
            <div className="alert alert-light border mt-3 mb-0 section-hint">
              <strong>{t("ক্রস-চেক:", "Cross-check:")}</strong> {fmt(r.depositInterest)} ÷ {fmt(r.totalDeposits)} ={" "}
              <strong>{r.effectiveDepositRate.toFixed(2)}%</strong>{" "}
              {t(
                `— এটাকে দেখে "কম" মনে হলেও এটা ${r.depositRate}%-এরই আংশিক রূপ, কারণ টাকা গড়ে ${(r.takaMonths / r.totalDeposits).toFixed(2)} মাস বসেছিল।`,
                `— it looks "low", but it is just ${r.depositRate}% applied part-year, because the money sat ${(r.takaMonths / r.totalDeposits).toFixed(2)} months on average.`
              )}
            </div>
          )}
        </div>
      </div>

      {/* ---------------- Part 3: totals ---------------- */}
      <div className="card">
        <div className="card-header">
          <i className="bi bi-3-circle me-2" />
          {t("সব মিলিয়ে", "Putting it together")}
        </div>
        <div className="card-body">
          <div className="formula">
            {`${t("ওপেনিং ব্যালেন্সের প্রফিট  ......", "Opening-balance profit  ........")}  ${pad(r.openingInterest)}   (${t("পার্ট ১", "part 1")})
${t("জমার প্রফিট  ..................", "Deposit profit  ...............")}  ${pad(r.depositInterest)}   (${t("পার্ট ২", "part 2")})
──────────────────────────────────────────────────────
PROFIT FOR THE YEAR  ..........  ${pad(r.profit)}

Opening Balance  ..............  ${pad(r.openingBalance)}
+ Subscription  ...............  ${pad(r.totalSubscription)}
+ Refund  .....................  ${pad(r.totalRefund)}
+ Profit for the year  ........  ${pad(r.profit)}
− Withdrawal(s)  ..............  ${pad(r.totalWithdrawal)}
──────────────────────────────────────────────────────
CLOSING BALANCE  ..............  ${pad(r.closingBalance)}`}
          </div>
        </div>
      </div>
    </div>
  );
}
