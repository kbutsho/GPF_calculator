import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { Hind_Siliguri } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { SITE } from "@/lib/site";

const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-bn",
});

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — সাধারণ ভবিষ্য তহবিলের বছর সমাপনী হিসাব`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: SITE.keywords,
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "bn_BD",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" className={hind.variable}>
      <body>
        {children}
        <ToastContainer position="top-right" autoClose={2500} newestOnTop theme="colored" />
      </body>
    </html>
  );
}
