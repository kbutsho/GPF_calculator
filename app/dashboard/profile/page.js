import ProfileForms from "@/components/dashboard/ProfileForms";
import { getCurrentUser } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  return (
    <>
      <h4 className="mb-1">প্রোফাইল</h4>
      <p className="section-hint mb-4">আপনার অ্যাকাউন্টের তথ্য ও পাসওয়ার্ড</p>
      <ProfileForms
        user={{
          name: user.name,
          phone: user.phone,
          email: user.email || "",
          designation: user.designation || "",
          office: user.office || "",
        }}
      />
    </>
  );
}
