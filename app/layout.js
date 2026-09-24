import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { Hind_Siliguri } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { LangProvider } from "@/components/LangProvider";
import { getLang } from "@/lib/lang";
import { SITE } from "@/lib/site";

const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-bn",
});

export async function generateMetadata() {
  const lang = await getLang();
  const name = SITE.name[lang];
  return {
    metadataBase: new URL(SITE.url),
    applicationName: name,
    title: {
      default: `${name} — ${SITE.tagline[lang]}`,
      template: `%s | ${name}`,
    },
    description: SITE.description[lang],
    keywords: SITE.keywords[lang],
    authors: [{ name: SITE.contact.name.en, url: SITE.url }],
    creator: SITE.contact.name.en,
    publisher: SITE.contact.name.en,
    category: "finance",
    formatDetection: { telephone: false },
    alternates: {
      types: { "application/rss+xml": [{ url: "/feed.xml", title: `${name} RSS` }] },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    openGraph: {
      title: name,
      description: SITE.description[lang],
      url: SITE.url,
      siteName: name,
      locale: lang === "en" ? "en_US" : "bn_BD",
      type: "website",
    },
    twitter: { card: "summary_large_image", title: name, description: SITE.description[lang] },
    // Paste the tokens from Google Search Console / Bing Webmaster Tools into .env.
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
      other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
        ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
        : undefined,
    },
  };
}

export const viewport = {
  themeColor: "#0f766e",
};

export default async function RootLayout({ children }) {
  const lang = await getLang();
  return (
    <html lang={lang} className={hind.variable}>
      <body>
        <LangProvider lang={lang}>{children}</LangProvider>
        <ToastContainer position="top-right" autoClose={2500} newestOnTop theme="colored" />
      </body>
    </html>
  );
}
