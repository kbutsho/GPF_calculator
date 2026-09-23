// Site-wide constants for the public pages and SEO metadata.
// Set NEXT_PUBLIC_SITE_URL to the deployed origin so canonical URLs and the
// sitemap point at the live site.
export const SITE = {
  name: "GPF ক্যালকুলেটর",
  nameEn: "GPF Calculator",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100").replace(/\/$/, ""),
  tagline: "আপনার ভবিষ্য তহবিলের বছর সমাপনী হিসাব — পয়সা পর্যন্ত নির্ভুল",
  description:
    "GPF ক্যালকুলেটর দিয়ে সাধারণ ভবিষ্য তহবিলের (GPF) স্ল্যাব-ভিত্তিক মুনাফা, মাসভিত্তিক চাঁদার মুনাফা আর ক্লোজিং ব্যালেন্স নিজেই হিসাব করুন, অফিসের স্টেটমেন্টের সাথে মিলিয়ে দেখুন — সম্পূর্ণ বিনামূল্যে।",
  keywords: [
    "GPF calculator",
    "GPF ক্যালকুলেটর",
    "সাধারণ ভবিষ্য তহবিল",
    "প্রভিডেন্ট ফান্ড হিসাব",
    "GPF মুনাফার হার",
    "GPF profit calculator Bangladesh",
    "PF calculator Bangladesh",
    "ভবিষ্য তহবিল সুদ হিসাব",
  ],
  contact: {
    name: "কৌশিক বিশ্বাস",
    nameEn: "Kaushik Biswas",
    email: "kbutsho@gmail.com",
    phone: "01621599321",
    phoneIntl: "+8801621599321",
    whatsapp: "8801621599321",
  },
};

export const PUBLIC_NAV = [
  { href: "/", label: "হোম" },
  { href: "/features", label: "সুবিধাসমূহ" },
  { href: "/how-it-works", label: "কীভাবে কাজ করে" },
  { href: "/gpf-guide", label: "GPF নির্দেশিকা" },
  { href: "/profit-rates", label: "মুনাফার হার" },
  { href: "/faq", label: "প্রশ্নোত্তর" },
  { href: "/contact", label: "যোগাযোগ" },
];

export const FOOTER_LINKS = [
  { href: "/about", label: "আমাদের সম্পর্কে" },
  { href: "/privacy", label: "গোপনীয়তা নীতি" },
  { href: "/terms", label: "ব্যবহারের শর্তাবলি" },
  { href: "/contact", label: "যোগাযোগ" },
];

/** Per-page metadata with a canonical URL and matching Open Graph tags. */
export function pageMetadata({ title, description, path }) {
  const url = `${SITE.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: SITE.name, locale: "bn_BD", type: "website" },
  };
}

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/** Money in Bangladeshi grouping (lakh/crore) with Bangla digits, for the public pages. */
export function bnMoney(value, decimals = 2) {
  const s = Number(value || 0).toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return s.replace(/\d/g, (d) => BN_DIGITS[d]);
}

export const bnNum = (value) => String(value).replace(/\d/g, (d) => BN_DIGITS[d]);
