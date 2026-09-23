import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { authCookie, tokenFor, normalizePhone } from "@/lib/auth";
import { UserStatus } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const body = await request.json();
    const identifier = String(body.identifier || "").trim();
    const password = String(body.password || "");

    if (!identifier || !password) {
      return NextResponse.json({ message: "মোবাইল/ইমেইল আর পাসওয়ার্ড দিন" }, { status: 400 });
    }

    await dbConnect();
    // Anything with an @ is an email; otherwise treat it as a phone number.
    const query = identifier.includes("@")
      ? { email: identifier.toLowerCase() }
      : { phone: normalizePhone(identifier) };
    const user = await User.findOne(query);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ message: "মোবাইল/ইমেইল অথবা পাসওয়ার্ড ভুল" }, { status: 401 });
    }
    if (user.status !== UserStatus.ACTIVE) {
      return NextResponse.json({ message: "এই অ্যাকাউন্টটি নিষ্ক্রিয় করা আছে" }, { status: 403 });
    }

    const response = NextResponse.json({ message: `স্বাগতম, ${user.name}` });
    response.headers.set("Set-Cookie", authCookie(tokenFor(user)));
    return response;
  } catch (e) {
    return NextResponse.json({ message: e.message || "লগইন করা যায়নি" }, { status: 500 });
  }
}
