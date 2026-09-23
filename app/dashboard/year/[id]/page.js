import Link from "next/link";
import { notFound } from "next/navigation";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import PfYear from "@/models/PfYear";
import YearForm from "@/components/YearForm";
import { normalizeYear } from "@/lib/payload";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function EditYearPage({ params }) {
  const { id } = await params;
  if (!mongoose.Types.ObjectId.isValid(id)) notFound();

  const session = await getSession();

  let doc;
  try {
    await dbConnect();
    // Owner filter: another user's year id simply 404s.
    doc = await PfYear.findOne({ _id: id, userId: session?.id }).lean();
  } catch (e) {
    return (
      <div className="alert alert-danger">
        <i className="bi bi-exclamation-octagon me-2" />
        ডেটাবেজে যুক্ত হওয়া যায়নি — <code>{e.message}</code>
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
        <h4 className="mb-0">
          অর্থবছর {initial.startYear} – {initial.startYear + 1}
        </h4>
        <Link href="/dashboard" className="btn btn-sm btn-outline-secondary no-print">
          <i className="bi bi-arrow-left me-1" />
          তালিকায় ফিরুন
        </Link>
      </div>
      <p className="section-hint mb-4">
        {initial.subscriber || "গ্রাহকের নাম দেওয়া নেই"}
        {initial.accountNo ? ` • অ্যাকাউন্ট ${initial.accountNo}` : ""}
      </p>

      <YearForm initial={initial} yearId={id} />
    </>
  );
}
