import PublicNavbar from "@/components/public/PublicNavbar";
import PublicFooter from "@/components/public/PublicFooter";
import { getSession } from "@/lib/session";

export default async function PublicLayout({ children }) {
  const session = await getSession();
  return (
    <div className="public-shell">
      <PublicNavbar userName={session?.name || null} />
      <main>{children}</main>
      <PublicFooter />
    </div>
  );
}
