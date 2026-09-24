import Link from "next/link";
import { notFound } from "next/navigation";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import PfYear from "@/models/PfYear";
import YearForm from "@/components/YearForm";
import { normalizeYear } from "@/lib/payload";
import { getSession } from "@/lib/session";
import { getLang } from "@/lib/lang";
import { tr } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function EditYearPage({ params }) {
  const { id } = await params;
  if (!mongoose.Types.ObjectId.isValid(id)) notFound();

  const [session, lang] = await Promise.all([getSession(), getLang()]);
  const t = tr(lang);

  let doc;
  try {
    await dbConnect();
    // Owner filter: another user's year id simply 404s.
    doc = await PfYear.findOne({ _id: id, userId: session?.id }).lean();
  } catch (e) {
    return (
      <div className="alert alert-danger">
        <i className="bi bi-exclamation-octagon me-2" />
        {t("ডেটাবেজে যুক্ত হওয়া যায়নি", "Could not connect to the database")} — <code>{e.message}</code>
      </div>
    );
  }

  if (!doc) notFound();

  const plain = JSON.parse(JSON.stringify(doc));
  // normalizeYear guarantees a dense 12-month array and well-formed slabs, so
  // the client form never has to defend against half-filled documents.
  const initial = { ...normalizeYear(plain), _id: plain._id };

  return (
    <>
      <div className="d-flex justify-content-between align-items-end flex-wrap gap-2 mb-1">
        <h1 className="h4 mb-0">
          {t("অর্থবছর", "Fiscal year")} {initial.startYear} – {initial.startYear + 1}
        </h1>
        <Link href="/dashboard" className="btn btn-sm btn-outline-secondary no-print">
          <i className="bi bi-arrow-left me-1" />
          {t("তালিকায় ফিরুন", "Back to list")}
        </Link>
      </div>
      <p className="section-hint mb-4">
        {initial.subscriber || t("গ্রাহকের নাম দেওয়া নেই", "No subscriber name")}
        {initial.accountNo ? ` • ${t("অ্যাকাউন্ট", "Account")} ${initial.accountNo}` : ""}
      </p>

      <YearForm initial={initial} yearId={id} />
    </>
  );
}
