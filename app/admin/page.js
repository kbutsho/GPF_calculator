import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import PfYear from "@/models/PfYear";
import { getLang } from "@/lib/lang";
import { tr, localNum } from "@/lib/i18n";
import { fmt } from "@/lib/calc";
import { UserStatus, UserRole, UserStatusLabels } from "@/lib/constants";
import { yearSummaries, fmtDate } from "@/lib/admin";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const lang = await getLang();
  const t = tr(lang);
  const n = (v) => localNum(v, lang);
  await dbConnect();

  const since30 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const since7 = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const users = { role: { $ne: UserRole.ADMIN } };

  const [total, active, new30, new7, activeLogins, totalYears, usersWithYears, recentUsers, recentLogins] =
    await Promise.all([
      User.countDocuments(users),
      User.countDocuments({ ...users, status: UserStatus.ACTIVE }),
      User.countDocuments({ ...users, createdAt: { $gte: since30 } }),
      User.countDocuments({ ...users, createdAt: { $gte: since7 } }),
      User.countDocuments({ ...users, lastLoginAt: { $gte: since30 } }),
      PfYear.countDocuments({}),
      PfYear.distinct("userId").then((ids) => ids.length),
      User.find(users).sort({ createdAt: -1 }).limit(8).select("-password").lean(),
      User.find({ ...users, lastLoginAt: { $ne: null } }).sort({ lastLoginAt: -1 }).limit(8).select("-password").lean(),
    ]);

  const summaries = await yearSummaries(recentUsers.map((u) => u._id));

  const stats = [
    { icon: "bi-people", label: t("মোট ব্যবহারকারী", "Total users"), value: n(total), sub: t(`${n(active)} জন সক্রিয়`, `${active} active`) },
    { icon: "bi-person-plus", label: t("নতুন (৩০ দিন)", "New (30 days)"), value: n(new30), sub: t(`গত ৭ দিনে ${n(new7)}`, `${new7} in the last 7 days`) },
    { icon: "bi-box-arrow-in-right", label: t("সক্রিয় (৩০ দিনে লগইন)", "Active (logged in, 30 days)"), value: n(activeLogins), sub: t("শেষ লগইন অনুযায়ী", "by last login") },
    { icon: "bi-journal-check", label: t("সংরক্ষিত অর্থবছর", "Saved fiscal years"), value: n(totalYears), sub: t(`${n(usersWithYears)} জন অন্তত একটি হিসাব রেখেছেন`, `${usersWithYears} users saved at least one`) },
  ];

  return (
    <>
      <div className="d-flex justify-content-between align-items-end flex-wrap gap-2 mb-4">
        <div>
          <h1 className="h4 mb-1">{t("অ্যাডমিন ড্যাশবোর্ড", "Admin dashboard")}</h1>
          <div className="section-hint">{t("সব ব্যবহারকারী ও তাঁদের হিসাবের সারাংশ", "All users and a summary of their calculations")}</div>
        </div>
        <Link href="/admin/users" className="btn btn-brand">
          <i className="bi bi-people me-1" />
          {t("সব ব্যবহারকারী", "All users")}
        </Link>
      </div>

      <div className="row g-3 mb-4">
        {stats.map((s) => (
          <div className="col-sm-6 col-lg-3" key={s.label}>
            <div className="dash-stat">
              <div className="label">
                <i className={`bi ${s.icon} me-1`} />
                {s.label}
              </div>
              <div className="value">{s.value}</div>
              <div className="section-hint">{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        <div className="col-lg-7">
          <div className="card h-100">
            <div className="card-header d-flex justify-content-between align-items-center">
              <span>
                <i className="bi bi-person-plus me-2" />
                {t("সাম্প্রতিক রেজিস্ট্রেশন", "Recent sign-ups")}
              </span>
              <Link href="/admin/users" className="small">{t("সব দেখুন", "View all")}</Link>
            </div>
            <div className="table-responsive">
              <table className="table table-hover table-tight align-middle mb-0">
                <thead>
                  <tr>
                    <th>{t("নাম", "Name")}</th>
                    <th>{t("যোগাযোগ", "Contact")}</th>
                    <th className="num">{t("বছর", "Years")}</th>
                    <th className="num">{t("সর্বশেষ জমা", "Latest balance")}</th>
                    <th>{t("যোগদান", "Joined")}</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center text-muted py-4">{t("এখনো কেউ নেই", "No users yet")}</td>
                    </tr>
                  )}
                  {recentUsers.map((u) => {
                    const s = summaries.get(String(u._id));
                    const status = UserStatusLabels[u.status] || UserStatusLabels[UserStatus.ACTIVE];
                    return (
                      <tr key={String(u._id)}>
                        <td>
                          <Link href={`/admin/users/${u._id}`} className="fw-semibold text-decoration-none">{u.name}</Link>
                          {u.status !== UserStatus.ACTIVE && (
                            <span className={`badge text-bg-${status.color} ms-1`}>{status[lang]}</span>
                          )}
                        </td>
                        <td className="small">
                          <div>{u.phone || "—"}</div>
                          <div className="text-muted">{u.email || ""}</div>
                        </td>
                        <td className="num">{s?.count || 0}</td>
                        <td className="num">{s?.latest ? fmt(s.latest.result.closingBalance) : "—"}</td>
                        <td className="small text-nowrap">{fmtDate(u.createdAt, lang)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card h-100">
            <div className="card-header">
              <i className="bi bi-clock-history me-2" />
              {t("সাম্প্রতিক লগইন", "Recent logins")}
            </div>
            <ul className="list-group list-group-flush">
              {recentLogins.length === 0 && (
                <li className="list-group-item text-muted small">{t("এখনো কোনো লগইন নেই", "No logins yet")}</li>
              )}
              {recentLogins.map((u) => (
                <li className="list-group-item d-flex justify-content-between align-items-center" key={String(u._id)}>
                  <Link href={`/admin/users/${u._id}`} className="text-decoration-none">{u.name}</Link>
                  <span className="small text-muted">{fmtDate(u.lastLoginAt, lang, true)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
