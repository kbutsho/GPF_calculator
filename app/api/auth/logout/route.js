import { NextResponse } from "next/server";
import { clearAuthCookie } from "@/lib/auth";
import { requestLang } from "@/lib/lang";
import { tr } from "@/lib/i18n";

export async function POST(request) {
  const t = tr(requestLang(request));
  const response = NextResponse.json({ message: t("লগআউট হয়েছে", "Logged out") });
  response.headers.set("Set-Cookie", clearAuthCookie());
  return response;
}
