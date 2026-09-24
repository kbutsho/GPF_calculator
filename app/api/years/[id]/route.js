import { NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import PfYear from "@/models/PfYear";
import { requireAuth } from "@/lib/auth";
import { normalizeYear, validateYear } from "@/lib/payload";
import { requestLang } from "@/lib/lang";
import { tr } from "@/lib/i18n";

export const dynamic = "force-dynamic";

const badId = (id) => !mongoose.Types.ObjectId.isValid(id);
const unauthorized = (t) => NextResponse.json({ message: t("লগইন করুন", "Please log in") }, { status: 401 });

// Every lookup filters by owner as well as id, so another user's year reads as "not found".
export async function GET(request, { params }) {
  const t = tr(requestLang(request));
  const session = requireAuth(request);
  if (!session) return unauthorized(t);
  const { id } = await params;
  if (badId(id)) return NextResponse.json({ message: t("ভুল আইডি", "Invalid id") }, { status: 400 });
  try {
    await dbConnect();
    const year = await PfYear.findOne({ _id: id, userId: session.id }).lean();
    if (!year) return NextResponse.json({ message: t("বছরটি পাওয়া যায়নি", "Year not found") }, { status: 404 });
    return NextResponse.json({ data: year });
  } catch (e) {
    return NextResponse.json({ message: e.message || t("ডেটা আনা যায়নি", "Could not load data") }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const t = tr(requestLang(request));
  const session = requireAuth(request);
  if (!session) return unauthorized(t);
  const { id } = await params;
  if (badId(id)) return NextResponse.json({ message: t("ভুল আইডি", "Invalid id") }, { status: 400 });
  try {
    const body = await request.json();
    const data = normalizeYear(body);
    const errors = validateYear(data, requestLang(request));
    if (Object.keys(errors).length) {
      return NextResponse.json({ message: t("ইনপুট ঠিক নেই", "Please fix the highlighted fields"), errors }, { status: 422 });
    }

    await dbConnect();
    const updated = await PfYear.findOneAndUpdate({ _id: id, userId: session.id }, data, {
      new: true,
    });
    if (!updated) return NextResponse.json({ message: t("বছরটি পাওয়া যায়নি", "Year not found") }, { status: 404 });
    return NextResponse.json({ data: updated, message: t("আপডেট হয়েছে", "Updated") });
  } catch (e) {
    return NextResponse.json({ message: e.message || t("আপডেট করা যায়নি", "Could not update") }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const t = tr(requestLang(request));
  const session = requireAuth(request);
  if (!session) return unauthorized(t);
  const { id } = await params;
  if (badId(id)) return NextResponse.json({ message: t("ভুল আইডি", "Invalid id") }, { status: 400 });
  try {
    await dbConnect();
    const deleted = await PfYear.findOneAndDelete({ _id: id, userId: session.id });
    if (!deleted) return NextResponse.json({ message: t("বছরটি পাওয়া যায়নি", "Year not found") }, { status: 404 });
    return NextResponse.json({ message: t("মুছে ফেলা হয়েছে", "Deleted") });
  } catch (e) {
    return NextResponse.json({ message: e.message || t("মুছে ফেলা যায়নি", "Could not delete") }, { status: 500 });
  }
}
