import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { requireAuth } from "@/lib/auth";
import { requestLang } from "@/lib/lang";
import { tr } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export async function PUT(request) {
  const t = tr(requestLang(request));
  const session = requireAuth(request);
  if (!session) return NextResponse.json({ message: t("লগইন করুন", "Please log in") }, { status: 401 });

  try {
    const { currentPassword, newPassword } = await request.json();
    if (!newPassword || String(newPassword).length < 6) {
      return NextResponse.json(
        { message: t("নতুন পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে", "The new password must be at least 6 characters") },
        { status: 422 }
      );
    }

    await dbConnect();
    const user = await User.findById(session.id);
    if (!user) return NextResponse.json({ message: t("অ্যাকাউন্ট পাওয়া যায়নি", "Account not found") }, { status: 404 });
    if (!(await bcrypt.compare(String(currentPassword || ""), user.password))) {
      return NextResponse.json({ message: t("বর্তমান পাসওয়ার্ড ভুল", "Current password is wrong") }, { status: 401 });
    }

    user.password = await bcrypt.hash(String(newPassword), 10);
    await user.save();
    return NextResponse.json({ message: t("পাসওয়ার্ড পরিবর্তন হয়েছে", "Password changed") });
  } catch (e) {
    return NextResponse.json({ message: e.message || t("পরিবর্তন করা যায়নি", "Could not change password") }, { status: 500 });
  }
}
