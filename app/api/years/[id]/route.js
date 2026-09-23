import { NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import PfYear from "@/models/PfYear";
import { requireAuth } from "@/lib/auth";
import { normalizeYear, validateYear } from "@/lib/payload";

export const dynamic = "force-dynamic";

const badId = (id) => !mongoose.Types.ObjectId.isValid(id);
const unauthorized = () => NextResponse.json({ message: "লগইন করুন" }, { status: 401 });

// Every lookup filters by owner as well as id, so another user's year reads as "not found".
export async function GET(request, { params }) {
  const session = requireAuth(request);
  if (!session) return unauthorized();
  const { id } = await params;
  if (badId(id)) return NextResponse.json({ message: "ভুল আইডি" }, { status: 400 });
  try {
    await dbConnect();
    const year = await PfYear.findOne({ _id: id, userId: session.id }).lean();
    if (!year) return NextResponse.json({ message: "বছরটি পাওয়া যায়নি" }, { status: 404 });
    return NextResponse.json({ data: year });
  } catch (e) {
    return NextResponse.json({ message: e.message || "ডেটা আনা যায়নি" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const session = requireAuth(request);
  if (!session) return unauthorized();
  const { id } = await params;
  if (badId(id)) return NextResponse.json({ message: "ভুল আইডি" }, { status: 400 });
  try {
    const body = await request.json();
    const data = normalizeYear(body);
    const errors = validateYear(data);
    if (Object.keys(errors).length) {
      return NextResponse.json({ message: "ইনপুট ঠিক নেই", errors }, { status: 422 });
    }

    await dbConnect();
    const updated = await PfYear.findOneAndUpdate({ _id: id, userId: session.id }, data, {
      new: true,
    });
    if (!updated) return NextResponse.json({ message: "বছরটি পাওয়া যায়নি" }, { status: 404 });
    return NextResponse.json({ data: updated, message: "আপডেট হয়েছে" });
  } catch (e) {
    return NextResponse.json({ message: e.message || "আপডেট করা যায়নি" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const session = requireAuth(request);
  if (!session) return unauthorized();
  const { id } = await params;
  if (badId(id)) return NextResponse.json({ message: "ভুল আইডি" }, { status: 400 });
  try {
    await dbConnect();
    const deleted = await PfYear.findOneAndDelete({ _id: id, userId: session.id });
    if (!deleted) return NextResponse.json({ message: "বছরটি পাওয়া যায়নি" }, { status: 404 });
    return NextResponse.json({ message: "মুছে ফেলা হয়েছে" });
  } catch (e) {
    return NextResponse.json({ message: e.message || "মুছে ফেলা যায়নি" }, { status: 500 });
  }
}
