import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import PfYear from "@/models/PfYear";
import { requireAuth } from "@/lib/auth";
import { normalizeYear, validateYear } from "@/lib/payload";
import { requestLang } from "@/lib/lang";
import { tr } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const t = tr(requestLang(request));
  const session = requireAuth(request);
  if (!session) return NextResponse.json({ message: t("লগইন করুন", "Please log in") }, { status: 401 });
  try {
    await dbConnect();
    const years = await PfYear.find({ userId: session.id })
      .sort({ startYear: -1, createdAt: -1 })
      .lean();
    return NextResponse.json({ data: years });
  } catch (e) {
    return NextResponse.json({ message: e.message || t("ডেটা আনা যায়নি", "Could not load data") }, { status: 500 });
  }
}

export async function POST(request) {
  const t = tr(requestLang(request));
  const session = requireAuth(request);
  if (!session) return NextResponse.json({ message: t("লগইন করুন", "Please log in") }, { status: 401 });
  try {
    const body = await request.json();
    const data = normalizeYear(body);
    const errors = validateYear(data, requestLang(request));
    if (Object.keys(errors).length) {
      return NextResponse.json({ message: t("ইনপুট ঠিক নেই", "Please fix the highlighted fields"), errors }, { status: 422 });
    }

    await dbConnect();
    const created = await PfYear.create({ ...data, userId: session.id });
    return NextResponse.json({ data: created, message: t("বছর সংরক্ষিত হয়েছে", "Year saved") }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: e.message || t("সংরক্ষণ করা যায়নি", "Could not save") }, { status: 500 });
  }
}
