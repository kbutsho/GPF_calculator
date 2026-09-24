import { PUBLIC_NAV, FOOTER_LINKS, absoluteUrl, languageAlternates } from "@/lib/site";
import { ARTICLES } from "@/lib/articles";

const PRIORITY = {
  "/": 1,
  "/how-it-works": 0.9,
  "/profit-rates": 0.9,
  "/gpf-guide": 0.9,
  "/register": 0.8,
  "/faq": 0.8,
  "/features": 0.8,
  "/articles": 0.8,
  "/glossary": 0.7,
};

// Every public page in both languages, each entry carrying its hreflang twins.
export default function sitemap() {
  const pages = [
    // /login is noindex, so it stays out of the sitemap.
    ...new Set(["/", ...[...PUBLIC_NAV, ...FOOTER_LINKS].map((l) => l.href), "/glossary", "/register"]),
  ].map((path) => ({ path, lastModified: new Date("2026-09-24") }));
  const articles = ARTICLES.map((a) => ({ path: `/articles/${a.slug}`, lastModified: new Date(a.date) }));

  return [...pages, ...articles].flatMap(({ path, lastModified }) =>
    ["bn", "en"].map((lang) => ({
      url: absoluteUrl(path, lang),
      lastModified,
      changeFrequency: path.startsWith("/articles/") ? "yearly" : "monthly",
      priority: (PRIORITY[path] ?? 0.6) * (lang === "bn" ? 1 : 0.9),
      alternates: { languages: languageAlternates(path) },
    }))
  );
}
