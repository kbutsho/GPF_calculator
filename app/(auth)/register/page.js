import RegisterForm from "@/components/public/RegisterForm";
import { getLang } from "@/lib/lang";
import { pageMetadata } from "@/lib/site";

export async function generateMetadata() {
  return pageMetadata(await getLang(), "/register", {
    bn: {
      title: "ফ্রি অ্যাকাউন্ট খুলুন — GPF হিসাব শুরু করুন",
      description:
        "মোবাইল নম্বর দিয়ে এক মিনিটে GPF ক্যালকুলেটরের বিনামূল্যের অ্যাকাউন্ট খুলুন এবং সাধারণ ভবিষ্য তহবিলের মুনাফা ও সমাপনী জমার হিসাব রাখা শুরু করুন।",
    },
    en: {
      title: "Create a free account — start tracking your GPF",
      description:
        "Sign up for GPF Calculator in a minute with your mobile number and start tracking your General Provident Fund profit and closing balance.",
    },
  });
}

export default function RegisterPage() {
  return <RegisterForm />;
}
