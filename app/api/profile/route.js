import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import {
  requireAuth,
  authCookie,
  tokenFor,
  normalizePhone,
  isValidPhone,
  isValidEmail,
} from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function PUT(request) {
  const session = requireAuth(request);
  if (!session) return NextResponse.json({ message: "লগইন করুন" }, { status: 401 });

  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const phone = normalizePhone(body.phone);
    const email = String(body.email || "").trim().toLowerCase();

    const errors = {};
    if (name.length < 2) errors.name = "নাম লিখুন";
    if (!isValidPhone(phone)) errors.phone = "সঠিক মোবাইল নম্বর দিন";
    if (email && !isValidEmail(email)) errors.email = "সঠিক ইমেইল দিন";
    if (Object.keys(errors).length) {
      return NextResponse.json({ message: "ইনপুট ঠিক নেই", errors }, { status: 422 });
    }

    await dbConnect();
    const others = { _id: { $ne: session.id } };
    if (await User.exists({ ...others, phone })) {
      return NextResponse.json({ message: "এই মোবাইল নম্বরটি অন্য অ্যাকাউন্টে আছে" }, { status: 409 });
    }
    if (email && (await User.exists({ ...others, email }))) {
      return NextResponse.json({ message: "এই ইমেইলটি অন্য অ্যাকাউন্টে আছে" }, { status: 409 });
    }

    const fields = {
      name,
      phone,
      designation: String(body.designation || "").trim(),
      office: String(body.office || "").trim(),
    };
    // A blank email is removed rather than stored as "", so the sparse unique index keeps working.
    const update = email ? { $set: { ...fields, email } } : { $set: fields, $unset: { email: 1 } };
    const user = await User.findByIdAndUpdate(session.id, update, { new: true });
    if (!user) return NextResponse.json({ message: "অ্যাকাউন্ট পাওয়া যায়নি" }, { status: 404 });

    // Name lives in the token too, so reissue it.
    const response = NextResponse.json({ message: "প্রোফাইল আপডেট হয়েছে" });
    response.headers.set("Set-Cookie", authCookie(tokenFor(user)));
    return response;
  } catch (e) {
    return NextResponse.json({ message: e.message || "আপডেট করা যায়নি" }, { status: 500 });
  }
}
