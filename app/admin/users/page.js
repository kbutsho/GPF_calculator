import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { getLang } from "@/lib/lang";
import { tr } from "@/lib/i18n";
import { fmt } from "@/lib/calc";
import { UserStatus, UserRole, UserStatusLabels, UserRoleLabels } from "@/lib/constants";
import { yearSummaries, fmtDate } from "@/lib/admin";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 25;
const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export default async function AdminUsersPage({ searchParams }) {
  const params = await searchParams;
  const lang = await getLang();
  const t = tr(lang);
  const q = String(params.q || "").trim();
  const status = params.status ?? "";
  const page = Math.max(1, parseInt(params.page, 10) || 1);

  const filter = {};
  if (q) {
    const rx = new RegExp(escapeRegex(q), "i");
    filter.$or = [{ name: rx }, { email: rx }, { phone: rx }, { designation: rx }, { office: rx }];
  }
  if (status !== "") filter.status = Number(status);

  await dbConnect();
  const [total, users] = await Promise.all([
    User.countDocuments(filter),
    User.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .select("-password")
      .lean(),
  ]);
  const summaries = await yearSummaries(users.map((u) => u._id));
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const pageHref = (p) => {
    const sp = new URLSearchParams();
    if (q) sp.set("q", q);
    if (status !== "") sp.set("status", status);
    if (p > 1) sp.set("page", String(p));
    const s = sp.toString();
    return `/admin/users${s ? `?${s}` : ""}`;
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-end flex-wrap gap-2 mb-3">
        <div>
          <h1 className="h4 mb-1">{t("ব্যবহারকারী", "Users")}</h1>
          <div className="section-hint">{t(`মোট ${total} জন`, `${total} total`)}</div>
        </div>
      </div>

      <form className="card mb-3" method="get">
        <div className="card-body row g-2 align-items-end">
          <div className="col-md-6">
            <label className="form-label small" htmlFor="q">{t("খুঁজুন", "Search")}</label>
            <input
              id="q"
              name="q"
              className="form-control"
              defaultValue={q}
              placeholder={t("নাম, মোবাইল, ইমেইল, পদবি বা অফিস", "Name, mobile, email, designation or office")}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label small" htmlFor="status">{t("অবস্থা", "Status")}</label>
            <select id="status" name="status" className="form-select" defaultValue={status}>
              <option value="">{t("সব", "All")}</option>
              {Object.values(UserStatus).map((s) => (
                <option key={s} value={s}>{UserStatusLabels[s][lang]}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3 d-flex gap-2">
            <button className="btn btn-brand flex-fill">
              <i className="bi bi-search me-1" />
              {t("খুঁজুন", "Search")}
            </button>
            {(q || status !== "") && (
              <Link href="/admin/users" className="btn btn-outline-secondary">{t("রিসেট", "Reset")}</Link>
            )}
          </div>
        </div>
      </form>

      <div className="card">
        <div className="table-responsive">
          <table className="table table-hover table-tight align-middle mb-0">
            <thead>
              <tr>
                <th>{t("নাম", "Name")}</th>
                <th>{t("মোবাইল / ইমেইল", "Mobile / email")}</th>
                <th>{t("পদবি / অফিস", "Designation / office")}</th>
                <th className="num">{t("বছর", "Years")}</th>
                <th className="num">{t("সর্বশেষ সমাপনী জমা", "Latest closing")}</th>
                <th>{t("যোগদান", "Joined")}</th>
                <th>{t("শেষ লগইন", "Last login")}</th>
                <th>{t("অবস্থা", "Status")}</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center text-muted py-4">{t("কাউকে পাওয়া যায়নি", "No users found")}</td>
                </tr>
              )}
              {users.map((u) => {
                const s = summaries.get(String(u._id));
                const st = UserStatusLabels[u.status] || UserStatusLabels[UserStatus.ACTIVE];
                return (
                  <tr key={String(u._id)}>
                    <td>
                      <Link href={`/admin/users/${u._id}`} className="fw-semibold text-decoration-none">{u.name}</Link>
                      {u.role === UserRole.ADMIN && (
                        <span className="badge bg-warning text-dark ms-1">{UserRoleLabels[UserRole.ADMIN][lang]}</span>
                      )}
                    </td>
                    <td className="small">
                      <div>{u.phone || "—"}</div>
                      <div className="text-muted">{u.email || ""}</div>
                    </td>
                    <td className="small">
                      <div>{u.designation || "—"}</div>
                      <div className="text-muted">{u.office || ""}</div>
                    </td>
                    <td className="num">{s?.count || 0}</td>
                    <td className="num">
                      {s?.latest ? (
                        <>
                          {fmt(s.latest.result.closingBalance)}
                          <div className="small text-muted">{s.latest.startYear}–{s.latest.startYear + 1}</div>
                        </>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="small text-nowrap">{fmtDate(u.createdAt, lang)}</td>
                    <td className="small text-nowrap">{fmtDate(u.lastLoginAt, lang, true)}</td>
                    <td>
                      <span className={`badge text-bg-${st.color}`}>{st[lang]}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {pages > 1 && (
        <nav className="mt-3" aria-label={t("পেজ", "Pages")}>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${page <= 1 ? "disabled" : ""}`}>
              <Link className="page-link" href={pageHref(page - 1)}>«</Link>
            </li>
            {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
              <li className={`page-item ${p === page ? "active" : ""}`} key={p}>
                <Link className="page-link" href={pageHref(p)}>{p}</Link>
              </li>
            ))}
            <li className={`page-item ${page >= pages ? "disabled" : ""}`}>
              <Link className="page-link" href={pageHref(page + 1)}>»</Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}
