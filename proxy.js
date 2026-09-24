import { NextResponse } from "next/server";
import { COOKIE_NAME, verifyToken, homeFor } from "@/lib/auth";
import { UserRole } from "@/lib/constants";
import { LANG_COOKIE, LANG_HEADER, localePath, stripLocale, isPrivatePath } from "@/lib/i18n";

const YEAR = 365 * 24 * 60 * 60;

function withLang(request, lang) {
  const headers = new Headers(request.headers);
  headers.set(LANG_HEADER, lang);
  return { request: { headers } };
}

// 1. /en/* is rewritten onto the same page files, rendered in English.
// 2. Bare public URLs render in Bangla, unless the visitor chose English
//    before — then they are sent to the /en twin.
// 3. /dashboard needs a session, /admin needs an admin session, and a
//    signed-in user never sees the login/register forms.
export function proxy(request) {
  const { pathname, search } = request.nextUrl;
  const session = verifyToken(request.cookies.get(COOKIE_NAME)?.value);
  const isEnglishUrl = pathname === "/en" || pathname.startsWith("/en/");
  const bare = stripLocale(pathname);

  if (bare.startsWith("/dashboard") || bare.startsWith("/admin")) {
    if (isEnglishUrl) {
      // Private pages have no /en twin and keep their own language; drop the prefix.
      return NextResponse.redirect(new URL(bare + search, request.url));
    }
    if (!session) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("next", bare);
      return NextResponse.redirect(loginUrl);
    }
    if (bare.startsWith("/admin") && session.role !== UserRole.ADMIN) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  const lang = isEnglishUrl ? "en" : "bn";

  if ((bare === "/login" || bare === "/register") && session) {
    return NextResponse.redirect(new URL(homeFor(session.role), request.url));
  }

  if (isEnglishUrl) {
    const res = NextResponse.rewrite(new URL(bare + search, request.url), withLang(request, "en"));
    res.cookies.set(LANG_COOKIE, "en", { path: "/", maxAge: YEAR, sameSite: "lax" });
    return res;
  }

  if (request.cookies.get(LANG_COOKIE)?.value === "en" && !isPrivatePath(bare)) {
    return NextResponse.redirect(new URL(localePath(bare, "en") + search, request.url));
  }

  return NextResponse.next(withLang(request, lang));
}

export const config = {
  // Everything except API routes, Next internals and files with an extension
  // (robots.txt, sitemap.xml, icons, the OG image).
  matcher: ["/((?!api/|_next/|opengraph-image|icon|apple-icon|manifest|.*\\.[a-zA-Z0-9]+$).*)"],
};
