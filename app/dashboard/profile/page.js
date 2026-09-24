import ProfileForms from "@/components/dashboard/ProfileForms";
import { getCurrentUser } from "@/lib/session";
import { getLang } from "@/lib/lang";
import { tr } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const [user, lang] = await Promise.all([getCurrentUser(), getLang()]);
  const t = tr(lang);
  return (
    <>
      <h1 className="h4 mb-1">{t("প্রোফাইল", "Profile")}</h1>
      <p className="section-hint mb-4">{t("আপনার অ্যাকাউন্টের তথ্য ও পাসওয়ার্ড", "Your account details and password")}</p>
      <ProfileForms
        user={{
          name: user.name,
          phone: user.phone || "",
          email: user.email || "",
          designation: user.designation || "",
          office: user.office || "",
        }}
      />
    </>
  );
}
