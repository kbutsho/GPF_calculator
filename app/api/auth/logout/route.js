import { NextResponse } from "next/server";
import { clearAuthCookie } from "@/lib/auth";

export async function POST() {
  const response = NextResponse.json({ message: "লগআউট হয়েছে" });
  response.headers.set("Set-Cookie", clearAuthCookie());
  return response;
}
