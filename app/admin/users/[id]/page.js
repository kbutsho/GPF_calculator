import Link from "next/link";
import { notFound } from "next/navigation";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import PfYear from "@/models/PfYear";
import YearsOverview, { withResults } from "@/components/dashboard/YearsOverview";
import UserActions from "@/components/admin/UserActions";
import { getLang } from "@/lib/lang";
import { getSession } from "@/lib/session";
import { tr } from "@/lib/i18n";
import { UserStatus, UserStatusLabels, UserRoleLabels, UserRole } from "@/lib/constants";
import { fmtDate } from "@/lib/admin";

export const dynamic = "force-dynamic";

export default async function AdminUserPage({ params }) {
  const { id } = await params;
  if (!mongoose.Types.ObjectId.isValid(id)) notFound();
  const [lang, session] = await Promise.all([getLang(), getSession()]);
  const t = tr(lang);

  await dbConnect();
  const user = await User.findById(id).select("-password").lean();
  if (!user) notFound();
  const years = withResults(await PfYear.find({ userId: id }).sort({ startYear: -1, createdAt: -1 }).lean());

  const status = UserStatusLabels[user.status] || UserStatusLabels[UserStatus.ACTIVE];
  const role = UserRoleLabels[user.role] || UserRoleLabels[UserRole.USER];

  const info = [
    [t("মোবাইল", "Mobile"), user.phone ? <a href={`tel:${user.phone}`}>{user.phone}</a> : "—"],
    [t("ইমেইল", "Email"), user.email ? <a href={`mailto:${user.email}`}>{user.email}</a> : "—"],
    [t("পদবি", "Designation"), user.designation || "—"],
    [t("অফিস", "Office"), user.office || "—"],
    [t("ভূমিকা", "Role"), role[lang]],
    [t("যোগদান", "Joined"), fmtDate(user.createdAt, lang, true)],
    [t("শেষ লগইন", "Last login"), fmtDate(user.lastLoginAt, lang, true)],
    [t("শেষ আপডেট", "Last updated"), fmtDate(user.updatedAt, lang, true)],
  ];

  return (
    <>
      <div className="d-flex justify-content-between align-items-end flex-wrap gap-2 mb-3">
        <div>
          <h1 className="h4 mb-1">
            {user.name} <span className={`badge text-bg-${status.color} fs-6 align-middle`}>{status[lang]}</span>
          </h1>
          <div className="section-hint">ID: {String(user._id)}</div>
        </div>
        <Link href="/admin/users" className="btn btn-sm btn-outline-secondary">
          <i className="bi bi-arrow-left me-1" />
          {t("তালিকায় ফিরুন", "Back to users")}
        </Link>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-lg-8">
          <div className="card h-100">
            <div className="card-header">
              <i className="bi bi-person-vcard me-2" />
              {t("ব্যবহারকারীর তথ্য", "User details")}
            </div>
            <div className="card-body">
              <dl className="row mb-0">
                {info.map(([label, value]) => (
                  <div className="col-md-6 d-flex gap-2 py-1" key={label}>
                    <dt className="text-muted fw-normal" style={{ minWidth: 110 }}>{label}</dt>
                    <dd className="mb-0 fw-semibold text-break">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <UserActions
            userId={String(user._id)}
            status={user.status ?? UserStatus.ACTIVE}
            isSelf={session?.id === String(user._id)}
          />
        </div>
      </div>

      <h2 className="h5 mb-3">{t("সংরক্ষিত হিসাব", "Saved calculations")}</h2>
      <YearsOverview years={years} lang={lang} hrefBase={`/admin/users/${id}/years`} />
    </>
  );
}
