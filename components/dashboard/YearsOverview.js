import Link from "next/link";
import { calculateYear, fmt } from "@/lib/calc";
import { normalizeYear } from "@/lib/payload";
import { tr } from "@/lib/i18n";

/** Attach the calculated result to each stored year (lean docs straight from Mongo). */
export function withResults(rows) {
  return rows.map((y) => {
    const plain = JSON.parse(JSON.stringify(y));
    return { ...plain, result: calculateYear(normalizeYear(plain)) };
  });
}

/**
 * Summary cards, growth bars and the year table. Shared by the user's own
 * dashboard and the admin's view of a user; `hrefBase` decides where rows link.
 */
export default function YearsOverview({ years, lang, hrefBase, emptyAction }) {
  const t = tr(lang);
  const latest = years[0];
  const totalProfit = years.reduce((sum, y) => sum + y.result.profit, 0);
  const totalSubscription = years.reduce((sum, y) => sum + y.result.totalSubscription, 0);
  // Oldest first for the growth chart; bars are scaled against the largest closing balance.
  const growth = [...years].reverse();
  const maxClosing = Math.max(1, ...years.map((y) => y.result.closingBalance));

  if (years.length === 0) {
    return (
      <div className="card">
        <div className="card-body text-center py-5">
          <i className="bi bi-inbox fs-1 text-muted d-block mb-2" />
          <p className="text-muted mb-3">{t("এখনো কোনো বছর সংরক্ষণ করা হয়নি।", "No years saved yet.")}</p>
          {emptyAction}
        </div>
      </div>
    );
  }

  const nextRate = calculateYear(
    normalizeYear({ ...latest, openingBalance: latest.result.closingBalance })
  ).autoRate;

  return (
    <>
      <div className="card mb-4 border-success">
        <div className="card-body">
          <div className="row g-3 align-items-center">
            <div className="col-md-4">
              <div className="text-muted small">{t("সর্বশেষ ক্লোজিং ব্যালেন্স", "Latest closing balance")}</div>
              <div className="result-big text-success">{fmt(latest.result.closingBalance)}</div>
              <div className="section-hint">
                {t(
                  `জুলাই ${latest.startYear} – জুন ${latest.startYear + 1}`,
                  `July ${latest.startYear} – June ${latest.startYear + 1}`
                )}
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-muted small">{t("ঐ বছরের প্রফিট", "Profit that year")}</div>
              <div className="fs-5 fw-semibold num">{fmt(latest.result.profit)}</div>
              <div className="section-hint">
                {t("ব্যালেন্সে", "Balance")} {fmt(latest.result.openingInterest)} + {t("জমায়", "deposits")}{" "}
                {fmt(latest.result.depositInterest)}
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-muted small">{t("পরের বছরের সর্বোচ্চ স্ল্যাব রেট", "Next year's top slab rate")}</div>
              <div className="fs-5 fw-semibold">{nextRate}%</div>
              <div className="section-hint">{t("নতুন জমা এই রেটে বসবে", "New deposits will earn this rate")}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-lg-4">
          <div className="d-flex flex-column gap-3 h-100">
            <div className="dash-stat">
              <div className="label">{t("সংরক্ষিত অর্থবছর", "Saved fiscal years")}</div>
              <div className="value">{years.length}</div>
            </div>
            <div className="dash-stat">
              <div className="label">{t("সব বছরের মোট প্রফিট", "Total profit, all years")}</div>
              <div className="value text-success">{fmt(totalProfit)}</div>
            </div>
            <div className="dash-stat">
              <div className="label">{t("সব বছরের মোট চাঁদা", "Total subscriptions, all years")}</div>
              <div className="value">{fmt(totalSubscription)}</div>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="card h-100">
            <div className="card-header">
              <i className="bi bi-graph-up-arrow me-2" />
              {t("বছরওয়ারি ক্লোজিং ব্যালেন্স", "Closing balance by year")}
            </div>
            <div className="card-body d-flex flex-column gap-3">
              {growth.map((y) => (
                <div key={y._id}>
                  <div className="d-flex justify-content-between small mb-1">
                    <span className="fw-semibold">
                      {y.startYear}–{y.startYear + 1}
                    </span>
                    <span className="num">
                      {fmt(y.result.closingBalance)}
                      <span className="text-success ms-2">+{fmt(y.result.profit)}</span>
                    </span>
                  </div>
                  <div className="growth-bar">
                    <span style={{ width: `${(y.result.closingBalance / maxClosing) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="table-responsive">
          <table className="table table-hover table-tight align-middle mb-0">
            <thead>
              <tr>
                <th>{t("অর্থবছর", "Fiscal year")}</th>
                <th>{t("গ্রাহক", "Subscriber")}</th>
                <th className="num">Opening</th>
                <th className="num">Deposits</th>
                <th className="num">Profit</th>
                <th className="num">Closing</th>
                <th className="num">{t("রেট", "Rate")}</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {years.map((y) => {
                const matched =
                  y.reportedProfit !== null &&
                  y.reportedProfit !== undefined &&
                  Math.abs(y.result.profit - y.reportedProfit) < 0.005;
                return (
                  <tr key={y._id}>
                    <td className="text-nowrap fw-semibold">
                      {y.startYear}–{y.startYear + 1}
                      {matched && (
                        <i
                          className="bi bi-patch-check-fill text-success ms-1"
                          title={t("রিপোর্টের সাথে মিলেছে", "Matches the statement")}
                        />
                      )}
                    </td>
                    <td className="text-nowrap">{y.subscriber || "—"}</td>
                    <td className="num">{fmt(y.result.openingBalance)}</td>
                    <td className="num">{fmt(y.result.totalDeposits)}</td>
                    <td className="num">{fmt(y.result.profit)}</td>
                    <td className="num fw-semibold">{fmt(y.result.closingBalance)}</td>
                    <td className="num">
                      <span className="badge text-bg-light border">{y.result.depositRate}%</span>
                    </td>
                    <td className="text-end">
                      <Link href={`${hrefBase}/${y._id}`} className="btn btn-sm btn-outline-secondary">
                        <i className="bi bi-box-arrow-up-right me-1" />
                        {t("খুলুন", "Open")}
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
