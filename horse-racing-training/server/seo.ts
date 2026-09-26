// robots.txt and sitemap.xml, built from the request's own host so no site URL needs configuring.
// Page list mirrors the ?tab= views in src/App.tsx (history is per-user, so left out).
import { Router, type Request } from "express";

const VIEWS = ["bet", "win-place", "trio", "momentum", "privacy", "terms", "sales", "legal", "sitemap"];
const LANGS = ["zh-HK", "en"] as const;

// Behind a TLS proxy req.protocol is "http"; the proxy's X-Forwarded-Proto says what the visitor used.
// Read here only (not app-wide "trust proxy", which would also make req.ip spoofable).
const origin = (req: Request) => {
  const proto = req.get("x-forwarded-proto")?.split(",")[0].trim() === "https" ? "https" : req.protocol;
  return `${proto}://${req.get("host")}`;
};
function pageUrl(base: string, view: string, lang: (typeof LANGS)[number]) {
  const url = new URL("/", base);
  if (view !== "bet") url.searchParams.set("tab", view);
  if (lang === "en") url.searchParams.set("language", "en");
  return url.href.replace(/&/g, "&amp;");
}

export const seo = Router();

seo.get("/robots.txt", (req, res) => {
  res.type("text/plain").send(`User-agent: *\nDisallow: /api/\n\nSitemap: ${origin(req)}/sitemap.xml\n`);
});

seo.get("/sitemap.xml", (req, res) => {
  const base = origin(req);
  const alternates = (view: string) =>
    [...LANGS.map((l) => [l, pageUrl(base, view, l)]), ["x-default", pageUrl(base, view, "zh-HK")]]
      .map(([l, href]) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${href}"/>`)
      .join("\n");
  const urls = VIEWS.flatMap((view) =>
    LANGS.map((lang) => `  <url>\n    <loc>${pageUrl(base, view, lang)}</loc>\n${alternates(view)}\n  </url>`)
  );
  res
    .type("application/xml")
    .send(
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`
    );
});
