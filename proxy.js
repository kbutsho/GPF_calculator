import { NextResponse } from "next/server";
import { COOKIE_NAME, verifyToken } from "@/lib/auth";

// Dashboard pages need a session; login/register bounce a signed-in user to
// the dashboard. The dashboard layout re-checks against the DB as well.
export function proxy(request) {
  const { pathname } = request.nextUrl;
  const signedIn = Boolean(verifyToken(request.cookies.get(COOKIE_NAME)?.value));

  if (pathname.startsWith("/dashboard") && !signedIn) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if ((pathname === "/login" || pathname === "/register") && signedIn) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
