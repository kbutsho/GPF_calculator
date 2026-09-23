import PublicNavbar from "@/components/public/PublicNavbar";
import PublicFooter from "@/components/public/PublicFooter";
import JsonLd from "@/components/JsonLd";
import { getSession } from "@/lib/session";
import { getLang } from "@/lib/lang";
import { homeFor } from "@/lib/auth";
import { organizationLd, websiteLd } from "@/lib/seo";

export default async function PublicLayout({ children }) {
  const [session, lang] = await Promise.all([getSession(), getLang()]);
  return (
    <div className="public-shell">
      <JsonLd data={[organizationLd(), websiteLd(lang)]} />
      <PublicNavbar signedIn={Boolean(session)} home={session ? homeFor(session.role) : null} />
      <main>{children}</main>
      <PublicFooter lang={lang} />
    </div>
  );
}
