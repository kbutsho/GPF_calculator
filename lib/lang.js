import { headers, cookies } from "next/headers";
import { LANG_COOKIE, LANG_HEADER, normalizeLang } from "@/lib/i18n";

/**
 * Active language for a server component. Public pages get it from the URL via
 * the proxy header; private pages (no header) fall back to the cookie.
 */
export async function getLang() {
  const h = await headers();
  const fromUrl = h.get(LANG_HEADER);
  if (fromUrl) return normalizeLang(fromUrl);
  const store = await cookies();
  return normalizeLang(store.get(LANG_COOKIE)?.value);
}

/** Same, for API route handlers, which only have the request cookie. */
export const requestLang = (request) => normalizeLang(request.cookies.get(LANG_COOKIE)?.value);
