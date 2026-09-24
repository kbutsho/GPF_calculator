import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { authCookie, tokenFor, normalizePhone, isValidPhone, isValidEmail } from "@/lib/auth";
import { requestLang } from "@/lib/lang";
import { tr } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export async function POST(request) {
  const t = tr(requestLang(request));
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const phone = normalizePhone(body.phone);
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");

    const errors = {};
    if (name.length < 2) errors.name = t("নাম লিখুন", "Enter your name");
    if (!isValidPhone(phone)) errors.phone = t("সঠিক মোবাইল নম্বর দিন (01XXXXXXXXX)", "Enter a valid mobile number (01XXXXXXXXX)");
    if (email && !isValidEmail(email)) errors.email = t("সঠিক ইমেইল দিন", "Enter a valid email");
    if (password.length < 6) errors.password = t("পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে", "Password must be at least 6 characters");
    if (Object.keys(errors).length) {
      return NextResponse.json({ message: t("ইনপুট ঠিক নেই", "Please fix the highlighted fields"), errors }, { status: 422 });
    }

    await dbConnect();
    if (await User.exists({ phone })) {
      return NextResponse.json(
        {
          message: t("এই মোবাইল নম্বরে আগেই অ্যাকাউন্ট আছে", "An account with this mobile number already exists"),
          errors: { phone: t("নম্বরটি ব্যবহৃত", "Number already in use") },
        },
        { status: 409 }
      );
    }
    if (email && (await User.exists({ email }))) {
      return NextResponse.json(
        {
          message: t("এই ইমেইলে আগেই অ্যাকাউন্ট আছে", "An account with this email already exists"),
          errors: { email: t("ইমেইলটি ব্যবহৃত", "Email already in use") },
        },
        { status: 409 }
      );
    }

    const user = await User.create({
      name,
      phone,
      email: email || undefined,
      password: await bcrypt.hash(password, 10),
      lastLoginAt: new Date(),
    });

    const response = NextResponse.json({ message: t("অ্যাকাউন্ট তৈরি হয়েছে", "Account created") }, { status: 201 });
    response.headers.set("Set-Cookie", authCookie(tokenFor(user)));
    return response;
  } catch (e) {
    return NextResponse.json({ message: e.message || t("রেজিস্ট্রেশন করা যায়নি", "Could not sign up") }, { status: 500 });
  }
}
