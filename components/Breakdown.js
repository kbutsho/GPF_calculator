"use client";

import { fmt, show } from "@/lib/calc";
import { DepositMethods, Rounding } from "@/lib/constants";

const ordinal = ["প্রথম", "দ্বিতীয়", "তৃতীয়", "চতুর্থ", "পঞ্চম", "ষষ্ঠ"];

const pad = (value, width = 14) => fmt(value).padStart(width);

export default function Breakdown({ result }) {
  const r = result;
  const truncating = r.rounding === Rounding.TRUNCATE;
  const monthwise = r.depositMethod === DepositMethods.MONTHWISE;

  const julyBase =
    r.rows[0].subscription + r.rows[0].refund - r.rows[0].withdrawal;

  return (
    <div className="d-flex flex-column gap-3">
      {/* ---------------- Part 1: opening balance ---------------- */}
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span>
            <i className="bi bi-1-circle me-2" />
            ওপেনিং ব্যালেন্সের প্রফিট (স্ল্যাব নিয়ম)
          </span>
          <span className="num fw-bold">{fmt(r.openingInterest)}</span>
        </div>
        <div className="card-body">
          <p className="section-hint mb-3">
            স্ল্যাব মানে পুরো টাকার উপর এক রেট নয় — টাকাকে সিঁড়ির মতো টুকরো করে প্রতি টুকরোয়
            আলাদা রেট। এই টাকা পুরো ১২ মাসই ফান্ডে ছিল, তাই পুরো বছরের প্রফিট পায়।
          </p>
          <div className="table-responsive">
            <table className="table table-sm table-tight align-middle mb-0">
              <thead>
                <tr>
                  <th>স্ল্যাব</th>
                  <th className="num">যত টাকা এই ধাপে</th>
                  <th className="num">রেট</th>
                  <th className="num">প্রফিট</th>
                </tr>
              </thead>
              <tbody>
                {r.slabLines.map((l, i) => (
                  <tr key={i} className={l.amount <= 0 ? "text-muted" : ""}>
                    <td>
                      {l.band === null
                        ? "বাকি অংশ"
                        : `${ordinal[i] || i + 1} ধাপ — ${fmt(l.band, 0)} পর্যন্ত`}
                    </td>
                    <td className="num">{fmt(l.amount)}</td>
                    <td className="num">{l.rate}%</td>
                    <td className="num">{fmt(show(l.interest))}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="table-light fw-bold">
                <tr>
                  <td>মোট</td>
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
              আসল হিসাব {r.openingInterestRaw.toFixed(4)} — ফান্ড পয়সার পরের অংশ ফেলে দেয়, তাই{" "}
              {fmt(r.openingInterest)}।
            </p>
          )}
        </div>
      </div>

      {/* ---------------- Part 2: this year's deposits ---------------- */}
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span>
            <i className="bi bi-2-circle me-2" />
            এ বছরের জমার প্রফিট — রেট {r.depositRate}%
          </span>
          <span className="num fw-bold">{fmt(r.depositInterest)}</span>
        </div>
        <div className="card-body">
          <p className="section-hint mb-2">
            {monthwise ? (
              <>
                জুলাইয়ের টাকা পুরো ১২ মাস বসে ছিল, কিন্তু জুনের টাকা মাত্র ১ মাস। তাই প্রতি মাসের
                টাকা <strong>যত মাস বসেছে সেই অনুপাতেই</strong> প্রফিট পায়।
              </>
            ) : (
              <>নির্বাচিত পদ্ধতি অনুযায়ী প্রতিটি জমাকে একই অনুপাতে প্রফিট দেওয়া হয়েছে।</>
            )}
          </p>
          <div className="formula mb-3">
            {`প্রফিট = জমা × ${r.depositRate}% × (কত মাস বসেছে ÷ 12)`}
          </div>

          <div className="table-responsive">
            <table className="table table-sm table-tight align-middle mb-0">
              <thead>
                <tr>
                  <th>মাস</th>
                  <th className="num">চাঁদা</th>
                  <th className="num">রিফান্ড</th>
                  <th className="num">উত্তোলন</th>
                  <th className="num">কত মাস</th>
                  <th className="num">হিসাব</th>
                  <th className="num">প্রফিট</th>
                </tr>
              </thead>
              <tbody>
                {r.rows.map((row) => {
                  const base = row.subscription + row.refund - row.withdrawal;
                  const full = (base * r.depositRate) / 100;
                  return (
                    <tr key={row.index} className={base === 0 ? "text-muted" : ""}>
                      <td>{row.bn}</td>
                      <td className="num">{fmt(row.subscription)}</td>
                      <td className="num">{row.refund ? fmt(row.refund) : "—"}</td>
                      <td className="num">{row.withdrawal ? fmt(row.withdrawal) : "—"}</td>
                      <td className="num">{monthwise ? row.held : "—"}</td>
                      <td className="num small text-muted">
                        {base === 0
                          ? "—"
                          : `${fmt(show(full))} × ${
                              monthwise ? `${row.held}/12` : row.factor.toFixed(2)
                            }`}
                      </td>
                      <td className="num">{fmt(show(row.netInterest))}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="table-light fw-bold">
                <tr>
                  <td>মোট</td>
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
            প্রতিটি লাইন দেখানোর সময় রাউন্ড করা হয়েছে, কিন্তু মোট হিসাবটা পূর্ণ নির্ভুলতায় করে
            শেষে একবার {truncating ? "ট্রাংকেট" : "রাউন্ড"} করা হয় — ঠিক যেভাবে ফান্ড করে।
          </p>

          {monthwise && (
            <>
              <p className="section-hint mt-3 mb-1 fw-semibold">শর্টকাট (পুরো টেবিল না লিখে):</p>
              <div className="formula">
                {`জুলাই     : ${fmt(julyBase)} × ${r.depositRate}% × 12/12
আগস্ট–জুন  : বাকি মাসের যোগফল 11+10+9+…+1 = 66  →  × 66/12 = × 5.5
──────────────────────────────────────────────────────
মোট জমার প্রফিট ..................... ${fmt(r.depositInterest)}`}
              </div>
            </>
          )}

          {r.totalDeposits > 0 && (
            <div className="alert alert-light border mt-3 mb-0 section-hint">
              <strong>ক্রস-চেক:</strong> {fmt(r.depositInterest)} ÷ {fmt(r.totalDeposits)} ={" "}
              <strong>{r.effectiveDepositRate.toFixed(2)}%</strong> — এটাকে দেখে &quot;কম&quot; মনে
              হলেও এটা {r.depositRate}%-এরই আংশিক রূপ, কারণ টাকা গড়ে{" "}
              {(r.takaMonths / r.totalDeposits).toFixed(2)} মাস বসেছিল।
            </div>
          )}
        </div>
      </div>

      {/* ---------------- Part 3: totals ---------------- */}
      <div className="card">
        <div className="card-header">
          <i className="bi bi-3-circle me-2" />
          সব মিলিয়ে
        </div>
        <div className="card-body">
          <div className="formula">
            {`ওপেনিং ব্যালেন্সের প্রফিট  ......  ${pad(r.openingInterest)}   (পার্ট ১)
জমার প্রফিট  ..................  ${pad(r.depositInterest)}   (পার্ট ২)
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
