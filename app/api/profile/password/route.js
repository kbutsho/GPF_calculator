import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { requireAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function PUT(request) {
  const session = requireAuth(request);
  if (!session) return NextResponse.json({ message: "লগইন করুন" }, { status: 401 });

  try {
    const { currentPassword, newPassword } = await request.json();
    if (!newPassword || String(newPassword).length < 6) {
      return NextResponse.json({ message: "নতুন পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে" }, { status: 422 });
    }

    await dbConnect();
    const user = await User.findById(session.id);
    if (!user) return NextResponse.json({ message: "অ্যাকাউন্ট পাওয়া যায়নি" }, { status: 404 });
    if (!(await bcrypt.compare(String(currentPassword || ""), user.password))) {
      return NextResponse.json({ message: "বর্তমান পাসওয়ার্ড ভুল" }, { status: 401 });
    }

    user.password = await bcrypt.hash(String(newPassword), 10);
    await user.save();
    return NextResponse.json({ message: "পাসওয়ার্ড পরিবর্তন হয়েছে" });
  } catch (e) {
    return NextResponse.json({ message: e.message || "পরিবর্তন করা যায়নি" }, { status: 500 });
  }
}
