import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import PfYear from "@/models/PfYear";
import { calculateYear, fmt } from "@/lib/calc";
import { normalizeYear } from "@/lib/payload";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

async function loadYears(userId) {
  try {
    await dbConnect();
    const rows = await PfYear.find({ userId }).sort({ startYear: -1, createdAt: -1 }).lean();
    return { rows, error: null };
  } catch (e) {
    return { rows: [], error: e.message };
  }
}

export default async function DashboardPage() {
  const session = await getSession();
  const { rows, error } = await loadYears(session.id);

  const years = rows.map((y) => {
    const result = calculateYear(normalizeYear(JSON.parse(JSON.stringify(y))));
    return { ...y, _id: String(y._id), result };
  });

  const latest = years[0];
  const totalProfit = years.reduce((sum, y) => sum + y.result.profit, 0);
  const totalSubscription = years.reduce((sum, y) => sum + y.result.totalSubscription, 0);
  // Oldest first for the growth chart; bars are scaled against the largest closing balance.
  const growth = [...years].reverse();
  const maxClosing = Math.max(1, ...years.map((y) => y.result.closingBalance));

  return (
    <>
      <div className="d-flex justify-content-between align-items-end flex-wrap gap-2 mb-4">
        <div>
          <h4 className="mb-1">স্বাগতম, {session.name}</h4>
          <div className="section-hint">
            প্রতিটি অর্থবছরের ওপেনিং ব্যালেন্স, চাঁদা আর রেট দিয়ে প্রফিট ও ক্লোজিং ব্যালেন্স হিসাব
          </div>
        </div>
        <Link href="/dashboard/year/new" className="btn btn-brand">
          <i className="bi bi-plus-lg me-1" />
          নতুন হিসাব
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger">
          <i className="bi bi-exclamation-octagon me-2" />
          ডেটাবেজে যুক্ত হওয়া যায়নি — <code>{error}</code>
          <div className="small mt-1">
            <code>.env.local</code> ফাইলে <code>MONGODB_URI</code> ঠিক আছে কিনা দেখুন।
          </div>
        </div>
      )}

      {latest && (
        <div className="card mb-4 border-success">
          <div className="card-body">
            <div className="row g-3 align-items-center">
              <div className="col-md-4">
                <div className="text-muted small">সর্বশেষ ক্লোজিং ব্যালেন্স</div>
                <div className="result-big text-success">{fmt(latest.result.closingBalance)}</div>
                <div className="section-hint">
                  জুলাই {latest.startYear} – জুন {latest.startYear + 1}
                </div>
              </div>
              <div className="col-md-4">
                <div className="text-muted small">ঐ বছরের প্রফিট</div>
                <div className="fs-5 fw-semibold num">{fmt(latest.result.profit)}</div>
                <div className="section-hint">
                  ব্যালেন্সে {fmt(latest.result.openingInterest)} + জমায়{" "}
                  {fmt(latest.result.depositInterest)}
                </div>
              </div>
              <div className="col-md-4">
                <div className="text-muted small">পরের বছরের সর্বোচ্চ স্ল্যাব রেট</div>
                <div className="fs-5 fw-semibold">
                  {calculateYear(
                    normalizeYear({
                      ...JSON.parse(JSON.stringify(latest)),
                      openingBalance: latest.result.closingBalance,
                    })
                  ).autoRate}
                  %
                </div>
                <div className="section-hint">নতুন জমা এই রেটে বসবে</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {years.length > 0 && (
        <div className="row g-3 mb-4">
          <div className="col-lg-4">
            <div className="d-flex flex-column gap-3 h-100">
              <div className="dash-stat">
                <div className="label">সংরক্ষিত অর্থবছর</div>
                <div className="value">{years.length} টি</div>
              </div>
              <div className="dash-stat">
                <div className="label">সব বছরের মোট প্রফিট</div>
                <div className="value text-success">{fmt(totalProfit)}</div>
              </div>
              <div className="dash-stat">
                <div className="label">সব বছরের মোট চাঁদা</div>
                <div className="value">{fmt(totalSubscription)}</div>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card h-100">
              <div className="card-header">
                <i className="bi bi-graph-up-arrow me-2" />
                বছরওয়ারি ক্লোজিং ব্যালেন্স
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
      )}

      {!error && years.length === 0 ? (
        <div className="card">
          <div className="card-body text-center py-5">
            <i className="bi bi-inbox fs-1 text-muted d-block mb-2" />
            <p className="text-muted mb-3">এখনো কোনো বছর সংরক্ষণ করা হয়নি।</p>
            <Link href="/dashboard/year/new" className="btn btn-brand">
              প্রথম হিসাবটি করুন
            </Link>
          </div>
        </div>
      ) : (
        years.length > 0 && (
          <div className="card">
            <div className="table-responsive">
              <table className="table table-hover table-tight align-middle mb-0">
                <thead>
                  <tr>
                    <th>অর্থবছর</th>
                    <th>গ্রাহক</th>
                    <th className="num">Opening</th>
                    <th className="num">Deposits</th>
                    <th className="num">Profit</th>
                    <th className="num">Closing</th>
                    <th className="num">রেট</th>
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
                              title="রিপোর্টের সাথে মিলেছে"
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
                          <Link href={`/dashboard/year/${y._id}`} className="btn btn-sm btn-outline-secondary">
                            <i className="bi bi-pencil me-1" />
                            খুলুন
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )
      )}
    </>
  );
}
