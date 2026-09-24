import { NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { requireAdmin } from "@/lib/auth";
import { UserStatus } from "@/lib/constants";
import { requestLang } from "@/lib/lang";
import { tr } from "@/lib/i18n";

export const dynamic = "force-dynamic";

/** Activate / deactivate a user. */
export async function PATCH(request, { params }) {
  const t = tr(requestLang(request));
  const admin = requireAdmin(request);
  if (!admin) return NextResponse.json({ message: t("অনুমতি নেই", "Not allowed") }, { status: 403 });

  const { id } = await params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: t("ভুল আইডি", "Invalid id") }, { status: 400 });
  }
  if (id === admin.id) {
    return NextResponse.json(
      { message: t("নিজের অ্যাকাউন্ট নিষ্ক্রিয় করা যায় না", "You can't deactivate your own account") },
      { status: 422 }
    );
  }

  try {
    const { status } = await request.json();
    if (!Object.values(UserStatus).includes(Number(status))) {
      return NextResponse.json({ message: t("ভুল অবস্থা", "Invalid status") }, { status: 422 });
    }
    await dbConnect();
    const user = await User.findByIdAndUpdate(id, { $set: { status: Number(status) } }, { new: true });
    if (!user) return NextResponse.json({ message: t("ব্যবহারকারী পাওয়া যায়নি", "User not found") }, { status: 404 });
    return NextResponse.json({
      message:
        user.status === UserStatus.ACTIVE
          ? t("অ্যাকাউন্ট সক্রিয় করা হয়েছে", "Account activated")
          : t("অ্যাকাউন্ট নিষ্ক্রিয় করা হয়েছে", "Account deactivated"),
    });
  } catch (e) {
    return NextResponse.json({ message: e.message || t("আপডেট করা যায়নি", "Could not update") }, { status: 500 });
  }
}
