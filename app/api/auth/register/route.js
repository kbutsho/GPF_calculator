import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { authCookie, tokenFor, normalizePhone, isValidPhone, isValidEmail } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const phone = normalizePhone(body.phone);
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");

    const errors = {};
    if (name.length < 2) errors.name = "নাম লিখুন";
    if (!isValidPhone(phone)) errors.phone = "সঠিক মোবাইল নম্বর দিন (01XXXXXXXXX)";
    if (email && !isValidEmail(email)) errors.email = "সঠিক ইমেইল দিন";
    if (password.length < 6) errors.password = "পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে";
    if (Object.keys(errors).length) {
      return NextResponse.json({ message: "ইনপুট ঠিক নেই", errors }, { status: 422 });
    }

    await dbConnect();
    if (await User.exists({ phone })) {
      return NextResponse.json(
        { message: "এই মোবাইল নম্বরে আগেই অ্যাকাউন্ট আছে", errors: { phone: "নম্বরটি ব্যবহৃত" } },
        { status: 409 }
      );
    }
    if (email && (await User.exists({ email }))) {
      return NextResponse.json(
        { message: "এই ইমেইলে আগেই অ্যাকাউন্ট আছে", errors: { email: "ইমেইলটি ব্যবহৃত" } },
        { status: 409 }
      );
    }

    const user = await User.create({
      name,
      phone,
      email: email || undefined,
      password: await bcrypt.hash(password, 10),
    });

    const response = NextResponse.json({ message: "অ্যাকাউন্ট তৈরি হয়েছে" }, { status: 201 });
    response.headers.set("Set-Cookie", authCookie(tokenFor(user)));
    return response;
  } catch (e) {
    return NextResponse.json({ message: e.message || "রেজিস্ট্রেশন করা যায়নি" }, { status: 500 });
  }
}
