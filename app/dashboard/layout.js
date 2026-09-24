import { redirect } from "next/navigation";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { getCurrentUser } from "@/lib/session";
import { getLang } from "@/lib/lang";
import { tr } from "@/lib/i18n";
import { UserRole } from "@/lib/constants";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

const LINKS = [
  { href: "/dashboard", icon: "bi-speedometer2", bn: "ড্যাশবোর্ড", en: "Dashboard", exact: true },
  { href: "/dashboard/year/new", icon: "bi-plus-lg", bn: "নতুন হিসাব", en: "New calculation", exact: true },
  { href: "/dashboard/profile", icon: "bi-person-gear", bn: "প্রোফাইল", en: "Profile" },
];

const ADMIN_LINK = { href: "/admin", icon: "bi-shield-lock", bn: "অ্যাডমিন", en: "Admin" };

export default async function DashboardLayout({ children }) {
  const lang = await getLang();
  const t = tr(lang);

  // Proxy already checked the token; this also catches deleted or disabled accounts.
  let user = null;
  try {
    user = await getCurrentUser();
  } catch (e) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          <i className="bi bi-exclamation-octagon me-2" />
          {t("ডেটাবেজে যুক্ত হওয়া যায়নি", "Could not connect to the database")} — <code>{e.message}</code>
        </div>
      </div>
    );
  }
  if (!user) redirect("/login");

  const links = user.role === UserRole.ADMIN ? [...LINKS, ADMIN_LINK] : LINKS;

  return (
    <>
      <DashboardNavbar links={links} />
      <main className="container py-4">{children}</main>
      <footer className="text-center text-muted small py-4">
        {t("জুলাই – জুন অর্থবছর • স্ল্যাব ভিত্তিক প্রফিট হিসাব", "July – June fiscal year • slab-based profit")}
      </footer>
    </>
  );
}
