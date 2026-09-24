import { SITE, absoluteUrl } from "@/lib/site";
import { ARTICLES } from "@/lib/articles";

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** RSS feed of the articles (Bangla, with the English twin linked). ?lang=en for English. */
export function GET(request) {
  const lang = new URL(request.url).searchParams.get("lang") === "en" ? "en" : "bn";
  const items = [...ARTICLES]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((a) => {
      const url = absoluteUrl(`/articles/${a.slug}`, lang);
      return `    <item>
      <title>${esc(a[lang].title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${esc(a[lang].description)}</description>
      <pubDate>${new Date(a.date).toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(SITE.name[lang])}</title>
    <link>${absoluteUrl("/articles", lang)}</link>
    <description>${esc(SITE.description[lang])}</description>
    <language>${lang === "en" ? "en" : "bn-BD"}</language>
    <atom:link href="${SITE.url}/feed.xml${lang === "en" ? "?lang=en" : ""}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
