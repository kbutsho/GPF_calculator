import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { requireActiveAdmin } from "@/lib/adminAuth";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import PfYear from "@/models/PfYear";
import { normalizePhone, isValidPhone, isValidEmail } from "@/lib/auth";
import { UserStatus, UserRole } from "@/lib/constants";
import { requestLang } from "@/lib/lang";
import { tr } from "@/lib/i18n";

export const dynamic = "force-dynamic";

async function guard(request, params) {
  const t = tr(requestLang(request));
  const admin = await requireActiveAdmin(request);
  if (!admin) return { t, error: NextResponse.json({ message: t("অনুমতি নেই", "Not allowed") }, { status: 403 }) };
  const { id } = await params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return { t, error: NextResponse.json({ message: t("ভুল আইডি", "Invalid id") }, { status: 400 }) };
  }
  return { t, admin, id };
}

/**
 * Update a user. Accepts any subset of: status, role, name, phone, email,
 * designation, office. An admin can't lock themselves out (status/role on self).
 */
export async function PATCH(request, { params }) {
  const { t, admin, id, error } = await guard(request, params);
  if (error) return error;

  try {
    const body = await request.json();
    const isSelf = id === admin.id;
    const set = {};
    const unset = {};
    const errors = {};

    if ("status" in body) {
      if (!Object.values(UserStatus).includes(Number(body.status))) errors.status = t("ভুল অবস্থা", "Invalid status");
      else if (isSelf && Number(body.status) !== UserStatus.ACTIVE)
        errors.status = t("নিজের অ্যাকাউন্ট নিষ্ক্রিয় করা যায় না", "You can't deactivate your own account");
      else set.status = Number(body.status);
    }
    if ("role" in body) {
      if (!Object.values(UserRole).includes(Number(body.role))) errors.role = t("ভুল ভূমিকা", "Invalid role");
      else if (isSelf && Number(body.role) !== UserRole.ADMIN)
        errors.role = t("নিজের অ্যাডমিন ক্ষমতা সরানো যায় না", "You can't remove your own admin role");
      else set.role = Number(body.role);
    }
    if ("name" in body) {
      const name = String(body.name || "").trim();
      if (name.length < 2) errors.name = t("নাম লিখুন", "Enter a name");
      else set.name = name;
    }
    if ("phone" in body) {
      const phone = normalizePhone(body.phone);
      if (!phone) unset.phone = 1;
      else if (!isValidPhone(phone)) errors.phone = t("সঠিক মোবাইল নম্বর দিন", "Enter a valid mobile number");
      else set.phone = phone;
    }
    if ("email" in body) {
      const email = String(body.email || "").trim().toLowerCase();
      if (!email) unset.email = 1;
      else if (!isValidEmail(email)) errors.email = t("সঠিক ইমেইল দিন", "Enter a valid email");
      else set.email = email;
    }
    if ("designation" in body) set.designation = String(body.designation || "").trim();
    if ("office" in body) set.office = String(body.office || "").trim();

    if (Object.keys(errors).length) {
      return NextResponse.json({ message: Object.values(errors)[0], errors }, { status: 422 });
    }

    await dbConnect();
    const current = await User.findById(id).lean();
    if (!current) return NextResponse.json({ message: t("ব্যবহারকারী পাওয়া যায়নি", "User not found") }, { status: 404 });

    // Everyone needs at least one way to log in.
    const phoneAfter = unset.phone ? null : set.phone ?? current.phone;
    const emailAfter = unset.email ? null : set.email ?? current.email;
    if (!phoneAfter && !emailAfter) {
      return NextResponse.json(
        { message: t("মোবাইল অথবা ইমেইল — অন্তত একটি থাকতে হবে", "Keep at least a mobile number or an email") },
        { status: 422 }
      );
    }
    const others = { _id: { $ne: id } };
    if (set.phone && (await User.exists({ ...others, phone: set.phone }))) {
      return NextResponse.json({ message: t("এই মোবাইল নম্বরটি অন্য অ্যাকাউন্টে আছে", "This mobile number is on another account") }, { status: 409 });
    }
    if (set.email && (await User.exists({ ...others, email: set.email }))) {
      return NextResponse.json({ message: t("এই ইমেইলটি অন্য অ্যাকাউন্টে আছে", "This email is on another account") }, { status: 409 });
    }

    const update = {};
    if (Object.keys(set).length) update.$set = set;
    if (Object.keys(unset).length) update.$unset = unset;
    const user = await User.findByIdAndUpdate(id, update, { new: true });

    let message = t("তথ্য আপডেট হয়েছে", "Details updated");
    if (Object.keys(body).length === 1 && "status" in body) {
      message =
        user.status === UserStatus.ACTIVE
          ? t("অ্যাকাউন্ট সক্রিয় করা হয়েছে", "Account activated")
          : t("অ্যাকাউন্ট নিষ্ক্রিয় করা হয়েছে", "Account deactivated");
    }
    return NextResponse.json({ message });
  } catch (e) {
    return NextResponse.json({ message: e.message || t("আপডেট করা যায়নি", "Could not update") }, { status: 500 });
  }
}

/** Delete a user together with every year they saved. */
export async function DELETE(request, { params }) {
  const { t, admin, id, error } = await guard(request, params);
  if (error) return error;
  if (id === admin.id) {
    return NextResponse.json({ message: t("নিজের অ্যাকাউন্ট মোছা যায় না", "You can't delete your own account") }, { status: 422 });
  }

  try {
    await dbConnect();
    const user = await User.findByIdAndDelete(id);
    if (!user) return NextResponse.json({ message: t("ব্যবহারকারী পাওয়া যায়নি", "User not found") }, { status: 404 });
    const { deletedCount } = await PfYear.deleteMany({ userId: id });
    return NextResponse.json({
      message: t(
        `${user.name} ও তাঁর ${deletedCount}টি হিসাব মুছে ফেলা হয়েছে`,
        `Deleted ${user.name} and ${deletedCount} saved year(s)`
      ),
    });
  } catch (e) {
    return NextResponse.json({ message: e.message || t("মুছে ফেলা যায়নি", "Could not delete") }, { status: 500 });
  }
}
