import { Suspense } from "react";
import LoginForm from "@/components/public/LoginForm";
import { getLang } from "@/lib/lang";
import { pageMetadata } from "@/lib/site";

export async function generateMetadata() {
  const meta = pageMetadata(await getLang(), "/login", {
    bn: { title: "লগইন", description: "মোবাইল নম্বর বা ইমেইল দিয়ে আপনার GPF ক্যালকুলেটর অ্যাকাউন্টে লগইন করুন।" },
    en: { title: "Log in", description: "Log in to your GPF Calculator account with your mobile number or email." },
  });
  // A bare login form has nothing to rank for; keep it out of the index but let links count.
  return { ...meta, robots: { index: false, follow: true } };
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
