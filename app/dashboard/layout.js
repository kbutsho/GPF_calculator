import { redirect } from "next/navigation";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { getCurrentUser } from "@/lib/session";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "ড্যাশবোর্ড",
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({ children }) {
  // Proxy already checked the token; this also catches deleted or disabled accounts.
  let user = null;
  try {
    user = await getCurrentUser();
  } catch (e) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          <i className="bi bi-exclamation-octagon me-2" />
          ডেটাবেজে যুক্ত হওয়া যায়নি — <code>{e.message}</code>
        </div>
      </div>
    );
  }
  if (!user) redirect("/login");

  return (
    <>
      <DashboardNavbar userName={user.name} />
      <main className="container py-4">{children}</main>
      <footer className="text-center text-muted small py-4">
        জুলাই – জুন অর্থবছর • স্ল্যাব ভিত্তিক প্রফিট হিসাব
      </footer>
    </>
  );
}
