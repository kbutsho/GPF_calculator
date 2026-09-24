import Link from "next/link";
import { notFound } from "next/navigation";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import PfYear from "@/models/PfYear";
import YearForm from "@/components/YearForm";
import { normalizeYear } from "@/lib/payload";
import { getLang } from "@/lib/lang";
import { tr } from "@/lib/i18n";

export const dynamic = "force-dynamic";

/** Admin's read-only view of one saved year, with the full working. */
export default async function AdminYearPage({ params }) {
  const { id, yearId } = await params;
  if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(yearId)) notFound();
  const lang = await getLang();
  const t = tr(lang);

  await dbConnect();
  const [user, doc] = await Promise.all([
    User.findById(id).select("name").lean(),
    PfYear.findOne({ _id: yearId, userId: id }).lean(),
  ]);
  if (!user || !doc) notFound();

  const plain = JSON.parse(JSON.stringify(doc));
  const initial = { ...normalizeYear(plain), _id: plain._id };

  return (
    <>
      <div className="d-flex justify-content-between align-items-end flex-wrap gap-2 mb-1">
        <h1 className="h4 mb-0">
          {user.name} — {t("অর্থবছর", "fiscal year")} {initial.startYear} – {initial.startYear + 1}
        </h1>
        <Link href={`/admin/users/${id}`} className="btn btn-sm btn-outline-secondary no-print">
          <i className="bi bi-arrow-left me-1" />
          {t("ব্যবহারকারীতে ফিরুন", "Back to user")}
        </Link>
      </div>
      <p className="section-hint mb-3">
        {initial.subscriber || t("গ্রাহকের নাম দেওয়া নেই", "No subscriber name")}
        {initial.accountNo ? ` • ${t("অ্যাকাউন্ট", "Account")} ${initial.accountNo}` : ""}
      </p>
      <div className="alert alert-info py-2 small no-print">
        <i className="bi bi-eye me-1" />
        {t("শুধু দেখার জন্য — অ্যাডমিন এখান থেকে ব্যবহারকারীর হিসাব বদলাতে পারেন না।", "Read-only — admins can't change a user's calculation here.")}
      </div>

      <YearForm initial={initial} readOnly />
    </>
  );
}
