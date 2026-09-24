import RegisterForm from "@/components/public/RegisterForm";
import { getLang } from "@/lib/lang";
import { pageMetadata } from "@/lib/site";

export async function generateMetadata() {
  return pageMetadata(await getLang(), "/register", {
    bn: {
      title: "ফ্রি অ্যাকাউন্ট খুলুন",
      description: "মোবাইল নম্বর দিয়ে এক মিনিটে GPF ক্যালকুলেটরের বিনামূল্যের অ্যাকাউন্ট খুলুন এবং নিজের GPF হিসাব রাখা শুরু করুন।",
    },
    en: {
      title: "Create a free account",
      description: "Sign up for GPF Calculator in a minute with your mobile number and start tracking your GPF.",
    },
  });
}

export default function RegisterPage() {
  return (
    <div className="auth-wrap">
      <div className="container">
        <RegisterForm />
      </div>
    </div>
  );
}
