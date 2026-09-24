import { SITE } from "@/lib/site";

export default function manifest() {
  return {
    name: `${SITE.name.en} — ${SITE.name.bn}`,
    short_name: "GPF Calculator",
    description: SITE.description.en,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0f766e",
    lang: "bn",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
