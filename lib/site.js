import { localePath } from "@/lib/i18n";

// Site-wide constants for the public pages and SEO metadata.
// Set NEXT_PUBLIC_SITE_URL to the deployed origin so canonical URLs, hreflang
// links and the sitemap point at the live site.
export const SITE = {
  name: { bn: "GPF ক্যালকুলেটর", en: "GPF Calculator" },
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100").replace(/\/$/, ""),
  tagline: {
    bn: "সাধারণ ভবিষ্য তহবিলের (GPF) মুনাফা ও বছর সমাপনী হিসাব",
    en: "GPF profit & year-closing balance calculator for Bangladesh",
  },
  description: {
    bn: "বিনামূল্যের GPF ক্যালকুলেটর: সাধারণ ভবিষ্য তহবিলের স্ল্যাব-ভিত্তিক মুনাফা (১৩%, ১২%, ১১%), মাসভিত্তিক চাঁদার মুনাফা ও ক্লোজিং ব্যালেন্স নিজেই হিসাব করুন, অফিসের GPF স্টেটমেন্টের সাথে পয়সা পর্যন্ত মিলিয়ে দেখুন।",
    en: "Free GPF calculator for Bangladesh government employees: work out General Provident Fund slab profit (13%, 12%, 11%), month-wise subscription profit and closing balance, and match your official GPF statement to the paisa.",
  },
  keywords: {
    bn: [
      "GPF ক্যালকুলেটর",
      "জিপিএফ ক্যালকুলেটর",
      "সাধারণ ভবিষ্য তহবিল",
      "সাধারণ ভবিষ্য তহবিল হিসাব",
      "ভবিষ্য তহবিলের মুনাফা",
      "GPF মুনাফার হার",
      "জিপিএফ সুদের হার",
      "প্রভিডেন্ট ফান্ড হিসাব",
      "GPF হিসাব করার নিয়ম",
      "GPF স্টেটমেন্ট",
      "সরকারি কর্মচারী ভবিষ্য তহবিল",
      "PF ক্যালকুলেটর",
    ],
    en: [
      "GPF calculator",
      "GPF calculator Bangladesh",
      "General Provident Fund calculator",
      "GPF profit calculator",
      "GPF interest rate Bangladesh",
      "GPF profit rate 13% 12% 11%",
      "provident fund calculator Bangladesh",
      "GPF closing balance",
      "GPF statement check",
      "government employee provident fund",
      "PF calculator BD",
    ],
  },
  contact: {
    name: { bn: "কৌশিক বিশ্বাস", en: "Kaushik Biswas" },
    email: "kbutsho@gmail.com",
    phone: "01621599321",
    phoneIntl: "+8801621599321",
    whatsapp: "8801621599321",
  },
};

// The brand logo already links home, so "/" is kept out of the navbar.
export const PUBLIC_NAV = [
  { href: "/features", bn: "সুবিধাসমূহ", en: "Features" },
  { href: "/how-it-works", bn: "কীভাবে কাজ করে", en: "How it works" },
  { href: "/gpf-guide", bn: "GPF নির্দেশিকা", en: "GPF guide" },
  { href: "/profit-rates", bn: "মুনাফার হার", en: "Profit rates" },
  { href: "/articles", bn: "লেখা", en: "Articles" },
  { href: "/faq", bn: "প্রশ্নোত্তর", en: "FAQ" },
  { href: "/contact", bn: "যোগাযোগ", en: "Contact" },
];

export const FOOTER_LINKS = [
  { href: "/about", bn: "আমাদের সম্পর্কে", en: "About" },
  { href: "/privacy", bn: "গোপনীয়তা নীতি", en: "Privacy policy" },
  { href: "/terms", bn: "ব্যবহারের শর্তাবলি", en: "Terms of use" },
  { href: "/contact", bn: "যোগাযোগ", en: "Contact" },
];

/** Absolute URL of a public path in a language. */
export const absoluteUrl = (path, lang = "bn") => {
  const p = localePath(path, lang);
  return `${SITE.url}${p === "/" ? "" : p}`;
};

/** hreflang map for a public path: Bangla is also the x-default. */
export const languageAlternates = (path) => ({
  bn: absoluteUrl(path, "bn"),
  en: absoluteUrl(path, "en"),
  "x-default": absoluteUrl(path, "bn"),
});

/**
 * Per-page metadata: localized title/description, canonical in the page's own
 * language, hreflang alternates and matching Open Graph / Twitter tags.
 */
export function pageMetadata(lang, path, copy) {
  const { title, description, keywords = [] } = copy[lang] || copy.bn;
  const url = absoluteUrl(path, lang);
  return {
    title,
    description,
    keywords: [...keywords, ...SITE.keywords[lang]],
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name[lang],
      locale: lang === "en" ? "en_US" : "bn_BD",
      alternateLocale: lang === "en" ? ["bn_BD"] : ["en_US"],
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
