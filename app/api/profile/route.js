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
import { UserRole } from "@/lib/constants";
import { requestLang } from "@/lib/lang";
import { tr } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export async function PUT(request) {
  const t = tr(requestLang(request));
  const session = requireAuth(request);
  if (!session) return NextResponse.json({ message: t("লগইন করুন", "Please log in") }, { status: 401 });

  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const phone = normalizePhone(body.phone);
    const email = String(body.email || "").trim().toLowerCase();
    // An admin may run without a phone; everyone else needs one to log in.
    const phoneOptional = session.role === UserRole.ADMIN && !phone;

    const errors = {};
    if (name.length < 2) errors.name = t("নাম লিখুন", "Enter your name");
    if (!phoneOptional && !isValidPhone(phone)) errors.phone = t("সঠিক মোবাইল নম্বর দিন", "Enter a valid mobile number");
    if (email && !isValidEmail(email)) errors.email = t("সঠিক ইমেইল দিন", "Enter a valid email");
    if (phoneOptional && !email) errors.email = t("ইমেইল দিন", "Enter an email");
    if (Object.keys(errors).length) {
      return NextResponse.json({ message: Object.values(errors)[0], errors }, { status: 422 });
    }

    await dbConnect();
    const others = { _id: { $ne: session.id } };
    if (phone && (await User.exists({ ...others, phone }))) {
      return NextResponse.json(
        { message: t("এই মোবাইল নম্বরটি অন্য অ্যাকাউন্টে আছে", "This mobile number is on another account") },
        { status: 409 }
      );
    }
    if (email && (await User.exists({ ...others, email }))) {
      return NextResponse.json(
        { message: t("এই ইমেইলটি অন্য অ্যাকাউন্টে আছে", "This email is on another account") },
        { status: 409 }
      );
    }

    const set = {
      name,
      designation: String(body.designation || "").trim(),
      office: String(body.office || "").trim(),
    };
    const unset = {};
    // Blank optional fields are removed rather than stored as "", so the sparse unique indexes keep working.
    if (email) set.email = email;
    else unset.email = 1;
    if (phone) set.phone = phone;
    else unset.phone = 1;

    const user = await User.findByIdAndUpdate(
      session.id,
      Object.keys(unset).length ? { $set: set, $unset: unset } : { $set: set },
      { new: true }
    );
    if (!user) return NextResponse.json({ message: t("অ্যাকাউন্ট পাওয়া যায়নি", "Account not found") }, { status: 404 });

    // Name lives in the token too, so reissue it.
    const response = NextResponse.json({ message: t("প্রোফাইল আপডেট হয়েছে", "Profile updated") });
    response.headers.set("Set-Cookie", authCookie(tokenFor(user)));
    return response;
  } catch (e) {
    return NextResponse.json({ message: e.message || t("আপডেট করা যায়নি", "Could not update") }, { status: 500 });
  }
}
