import { Suspense } from "react";
import LoginForm from "@/components/public/LoginForm";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "লগইন",
  description: "মোবাইল নম্বর বা ইমেইল দিয়ে আপনার GPF ক্যালকুলেটর অ্যাকাউন্টে লগইন করুন।",
  path: "/login",
});

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
