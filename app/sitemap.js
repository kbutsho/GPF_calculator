import { SITE, PUBLIC_NAV, FOOTER_LINKS } from "@/lib/site";

export default function sitemap() {
  const paths = [...new Set([...PUBLIC_NAV, ...FOOTER_LINKS].map((l) => l.href).concat("/register"))];
  return paths.map((path) => ({
    url: `${SITE.url}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
