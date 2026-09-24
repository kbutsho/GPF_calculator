import { headers, cookies } from "next/headers";
import { APP_LANG_COOKIE, LANG_HEADER, normalizeLang } from "@/lib/i18n";

/**
 * Active language for a server component. Public pages get it from the URL via
 * the proxy header; private pages (no header) use the app's own cookie.
 */
export async function getLang() {
  const h = await headers();
  const fromUrl = h.get(LANG_HEADER);
  if (fromUrl) return normalizeLang(fromUrl);
  const store = await cookies();
  return normalizeLang(store.get(APP_LANG_COOKIE)?.value);
}

/**
 * Same, for API route handlers. Public forms (login/register) send their page's
 * language in the header; dashboard calls fall back to the app cookie.
 */
export const requestLang = (request) =>
  normalizeLang(request.headers.get(LANG_HEADER) || request.cookies.get(APP_LANG_COOKIE)?.value);
