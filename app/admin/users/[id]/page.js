import Link from "next/link";
import { notFound } from "next/navigation";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import PfYear from "@/models/PfYear";
import YearsOverview, { withResults } from "@/components/dashboard/YearsOverview";
import UserActions from "@/components/admin/UserActions";
import UserEditForm from "@/components/admin/UserEditForm";
import { getLang } from "@/lib/lang";
import { getSession } from "@/lib/session";
import { tr } from "@/lib/i18n";
import { UserStatus, UserStatusLabels, UserRole } from "@/lib/constants";
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

  const isSelf = session?.id === String(user._id);
  const meta = [
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
          <UserEditForm
            isSelf={isSelf}
            meta={meta}
            user={{
              id: String(user._id),
              name: user.name || "",
              phone: user.phone || "",
              email: user.email || "",
              designation: user.designation || "",
              office: user.office || "",
              role: user.role || UserRole.USER,
            }}
          />
        </div>
        <div className="col-lg-4">
          <UserActions
            userId={String(user._id)}
            userName={user.name}
            status={user.status ?? UserStatus.ACTIVE}
            isSelf={isSelf}
            yearCount={years.length}
          />
        </div>
      </div>

      <h2 className="h5 mb-3">{t("সংরক্ষিত হিসাব", "Saved calculations")}</h2>
      <YearsOverview years={years} lang={lang} hrefBase={`/admin/users/${id}/years`} />
    </>
  );
}
