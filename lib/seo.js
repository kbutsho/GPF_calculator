import { SITE, absoluteUrl } from "@/lib/site";

// schema.org builders. Pages render them through <JsonLd data={...} />.

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE.url}/#organization`,
  name: SITE.name.en,
  alternateName: SITE.name.bn,
  url: SITE.url,
  logo: `${SITE.url}/icon.svg`,
  email: SITE.contact.email,
  telephone: SITE.contact.phoneIntl,
  founder: { "@type": "Person", name: SITE.contact.name.en },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: SITE.contact.email,
      telephone: SITE.contact.phoneIntl,
      areaServed: "BD",
      availableLanguage: ["Bengali", "English"],
    },
  ],
});

export const websiteLd = (lang) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  name: SITE.name[lang],
  alternateName: [SITE.name.en, SITE.name.bn, "GPF Calculator Bangladesh"],
  url: absoluteUrl("/", lang),
  inLanguage: lang === "en" ? "en" : "bn",
  publisher: { "@id": `${SITE.url}/#organization` },
});

export const webAppLd = (lang) => ({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE.name[lang],
  url: absoluteUrl("/", lang),
  description: SITE.description[lang],
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any (web browser)",
  inLanguage: ["bn", "en"],
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "BDT" },
  featureList:
    lang === "en"
      ? [
          "Slab-based GPF profit (13% / 12% / 11%)",
          "Month-wise subscription profit",
          "Match your official GPF statement",
          "Work out the rate your fund actually used",
          "Carry the closing balance to next year",
        ]
      : [
          "স্ল্যাব-ভিত্তিক GPF মুনাফা (১৩% / ১২% / ১১%)",
          "মাসভিত্তিক চাঁদার মুনাফা",
          "অফিসের GPF স্টেটমেন্টের সাথে মিলানো",
          "ফান্ড আসলে কোন হার দিয়েছে তা বের করা",
          "সমাপনী জমা পরের বছরে নেওয়া",
        ],
  provider: { "@id": `${SITE.url}/#organization` },
});

export const breadcrumbLd = (lang, trail) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { name: lang === "en" ? "Home" : "হোম", path: "/" },
    ...trail,
  ].map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: absoluteUrl(item.path, lang),
  })),
});

export const faqLd = (pairs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: pairs.map(([q, a]) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
});

export const howToLd = (lang, name, steps) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  name,
  inLanguage: lang,
  totalTime: "PT5M",
  estimatedCost: { "@type": "MonetaryAmount", currency: "BDT", value: "0" },
  step: steps.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.title,
    text: s.text,
  })),
});

export const articleLd = (lang, { title, description, path, date }) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  inLanguage: lang,
  datePublished: date,
  dateModified: date,
  mainEntityOfPage: absoluteUrl(path, lang),
  author: { "@type": "Person", name: SITE.contact.name.en },
  publisher: { "@id": `${SITE.url}/#organization` },
  image: `${SITE.url}/opengraph-image`,
});
