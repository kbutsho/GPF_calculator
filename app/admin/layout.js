import { redirect } from "next/navigation";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { getCurrentUser } from "@/lib/session";
import { getLang } from "@/lib/lang";
import { tr } from "@/lib/i18n";
import { UserRole } from "@/lib/constants";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const LINKS = [
  { href: "/admin", icon: "bi-grid-1x2", bn: "ওভারভিউ", en: "Overview", exact: true },
  { href: "/admin/users", icon: "bi-people", bn: "ব্যবহারকারী", en: "Users" },
  { href: "/dashboard", icon: "bi-calculator", bn: "আমার হিসাব", en: "My calculations", exact: true },
  { href: "/dashboard/profile", icon: "bi-person-gear", bn: "প্রোফাইল", en: "Profile" },
];

export default async function AdminLayout({ children }) {
  const lang = await getLang();
  const t = tr(lang);

  let user = null;
  try {
    user = await getCurrentUser();
  } catch (e) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          {t("ডেটাবেজে যুক্ত হওয়া যায়নি", "Could not connect to the database")} — <code>{e.message}</code>
        </div>
      </div>
    );
  }
  // Proxy checks the token's role; this re-checks against the database.
  if (!user) redirect("/login");
  if (user.role !== UserRole.ADMIN) redirect("/dashboard");

  return (
    <>
      <DashboardNavbar userName={user.name} links={LINKS} badge={t("অ্যাডমিন", "Admin")} />
      <main className="container py-4">{children}</main>
    </>
  );
}
