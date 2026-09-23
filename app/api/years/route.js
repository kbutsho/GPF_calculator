import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import PfYear from "@/models/PfYear";
import { requireAuth } from "@/lib/auth";
import { normalizeYear, validateYear } from "@/lib/payload";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const session = requireAuth(request);
  if (!session) return NextResponse.json({ message: "লগইন করুন" }, { status: 401 });
  try {
    await dbConnect();
    const years = await PfYear.find({ userId: session.id })
      .sort({ startYear: -1, createdAt: -1 })
      .lean();
    return NextResponse.json({ data: years });
  } catch (e) {
    return NextResponse.json({ message: e.message || "ডেটা আনা যায়নি" }, { status: 500 });
  }
}

export async function POST(request) {
  const session = requireAuth(request);
  if (!session) return NextResponse.json({ message: "লগইন করুন" }, { status: 401 });
  try {
    const body = await request.json();
    const data = normalizeYear(body);
    const errors = validateYear(data);
    if (Object.keys(errors).length) {
      return NextResponse.json({ message: "ইনপুট ঠিক নেই", errors }, { status: 422 });
    }

    await dbConnect();
    const created = await PfYear.create({ ...data, userId: session.id });
    return NextResponse.json({ data: created, message: "বছর সংরক্ষিত হয়েছে" }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: e.message || "সংরক্ষণ করা যায়নি" }, { status: 500 });
  }
}
