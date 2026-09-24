import { NextResponse } from "next/server";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { requireAdmin } from "@/lib/auth";
import { requestLang } from "@/lib/lang";
import { tr } from "@/lib/i18n";

export const dynamic = "force-dynamic";

/** Admin sets a new password for a user who forgot theirs. */
export async function PUT(request, { params }) {
  const t = tr(requestLang(request));
  const admin = requireAdmin(request);
  if (!admin) return NextResponse.json({ message: t("অনুমতি নেই", "Not allowed") }, { status: 403 });

  const { id } = await params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: t("ভুল আইডি", "Invalid id") }, { status: 400 });
  }

  try {
    const { password } = await request.json();
    if (!password || String(password).length < 6) {
      return NextResponse.json(
        { message: t("পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে", "Password must be at least 6 characters") },
        { status: 422 }
      );
    }
    await dbConnect();
    const user = await User.findByIdAndUpdate(id, {
      $set: { password: await bcrypt.hash(String(password), 10) },
    });
    if (!user) return NextResponse.json({ message: t("ব্যবহারকারী পাওয়া যায়নি", "User not found") }, { status: 404 });
    return NextResponse.json({ message: t("পাসওয়ার্ড রিসেট হয়েছে", "Password reset") });
  } catch (e) {
    return NextResponse.json({ message: e.message || t("রিসেট করা যায়নি", "Could not reset") }, { status: 500 });
  }
}
