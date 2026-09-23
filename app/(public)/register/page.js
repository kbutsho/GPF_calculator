import RegisterForm from "@/components/public/RegisterForm";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "ফ্রি অ্যাকাউন্ট খুলুন",
  description: "মোবাইল নম্বর দিয়ে এক মিনিটে GPF ক্যালকুলেটরের বিনামূল্যের অ্যাকাউন্ট খুলুন।",
  path: "/register",
});

export default function RegisterPage() {
  return (
    <div className="auth-wrap">
      <div className="container">
        <RegisterForm />
      </div>
    </div>
  );
}
