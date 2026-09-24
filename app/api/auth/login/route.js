import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { authCookie, tokenFor, normalizePhone, homeFor } from "@/lib/auth";
import { UserStatus } from "@/lib/constants";
import { requestLang } from "@/lib/lang";
import { tr } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export async function POST(request) {
  const t = tr(requestLang(request));
  try {
    const body = await request.json();
    const identifier = String(body.identifier || "").trim();
    const password = String(body.password || "");

    if (!identifier || !password) {
      return NextResponse.json(
        { message: t("মোবাইল/ইমেইল আর পাসওয়ার্ড দিন", "Enter your mobile/email and password") },
        { status: 400 }
      );
    }

    await dbConnect();
    // Anything with an @ is an email; otherwise treat it as a phone number.
    const query = identifier.includes("@")
      ? { email: identifier.toLowerCase() }
      : { phone: normalizePhone(identifier) };
    const user = await User.findOne(query);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { message: t("মোবাইল/ইমেইল অথবা পাসওয়ার্ড ভুল", "Wrong mobile/email or password") },
        { status: 401 }
      );
    }
    if (user.status !== UserStatus.ACTIVE) {
      return NextResponse.json(
        { message: t("এই অ্যাকাউন্টটি নিষ্ক্রিয় করা আছে", "This account has been deactivated") },
        { status: 403 }
      );
    }

    await User.updateOne({ _id: user._id }, { $set: { lastLoginAt: new Date() } });

    const response = NextResponse.json({
      message: t(`স্বাগতম, ${user.name}`, `Welcome, ${user.name}`),
      home: homeFor(user.role),
    });
    response.headers.set("Set-Cookie", authCookie(tokenFor(user)));
    return response;
  } catch (e) {
    return NextResponse.json({ message: e.message || t("লগইন করা যায়নি", "Could not log in") }, { status: 500 });
  }
}
