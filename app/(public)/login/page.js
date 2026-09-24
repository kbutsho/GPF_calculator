import { Suspense } from "react";
import LoginForm from "@/components/public/LoginForm";
import { getLang } from "@/lib/lang";
import { pageMetadata } from "@/lib/site";

export async function generateMetadata() {
  return pageMetadata(await getLang(), "/login", {
    bn: { title: "লগইন", description: "মোবাইল নম্বর বা ইমেইল দিয়ে আপনার GPF ক্যালকুলেটর অ্যাকাউন্টে লগইন করুন।" },
    en: { title: "Log in", description: "Log in to your GPF Calculator account with your mobile number or email." },
  });
}

export default function LoginPage() {
  return (
    <div className="auth-wrap">
      <div className="container">
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
