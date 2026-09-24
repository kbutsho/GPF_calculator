import { NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import PfYear from "@/models/PfYear";
import { requireActiveAdmin } from "@/lib/adminAuth";
import { requestLang } from "@/lib/lang";
import { tr } from "@/lib/i18n";

export const dynamic = "force-dynamic";

/** Admin removes any user's saved year. */
export async function DELETE(request, { params }) {
  const t = tr(requestLang(request));
  if (!await requireActiveAdmin(request)) return NextResponse.json({ message: t("অনুমতি নেই", "Not allowed") }, { status: 403 });

  const { id } = await params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: t("ভুল আইডি", "Invalid id") }, { status: 400 });
  }
  try {
    await dbConnect();
    const deleted = await PfYear.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ message: t("বছরটি পাওয়া যায়নি", "Year not found") }, { status: 404 });
    return NextResponse.json({ message: t("হিসাবটি মুছে ফেলা হয়েছে", "Year deleted"), userId: String(deleted.userId) });
  } catch (e) {
    return NextResponse.json({ message: e.message || t("মুছে ফেলা যায়নি", "Could not delete") }, { status: 500 });
  }
}
