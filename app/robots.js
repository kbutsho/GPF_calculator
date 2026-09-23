import { SITE } from "@/lib/site";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/dashboard", "/api"] },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
