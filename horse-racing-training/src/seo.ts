// Per-page <head> tags: title, description, canonical, hreflang alternates, Open Graph / Twitter.
// index.html carries the Chinese home-page defaults for crawlers that don't run JS (social previews);
// this keeps them in step with the current tab and language once the app is running.
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LEGAL_VIEWS, type LegalView } from "./LegalPages";
import { LANGS, PARAM, type Lang } from "./i18n/url";

const PAGE_KEY = { history: "history", "win-place": "winPlace", trio: "trio", momentum: "momentum" } as const;
type ToolView = keyof typeof PAGE_KEY;
/** Legal view → its key in the legal namespace (privacy/terms/sales/sitemap share the view name). */
const LEGAL_KEY = { privacy: "privacy", terms: "terms", sales: "sales", legal: "legalNotices", sitemap: "sitemap" } as const satisfies Record<LegalView, string>;
/** Per-user pages: nothing for a search engine to show. */
const NOINDEX = new Set<string>(["history"]);
const OG_LOCALE: Record<Lang, string> = { "zh-HK": "zh_HK", en: "en_US" };

/** Absolute URL of `view` in `lang`, with only the parameters that change the page (tab, language). */
export function pageUrl(origin: string, view: string, lang: Lang): string {
  const url = new URL("/", origin);
  if (view !== "bet") url.searchParams.set("tab", view);
  if (lang === "en") url.searchParams.set(PARAM, "en");
  return url.href;
}

function upsert(selector: string, create: () => HTMLElement, attrs: Record<string, string>) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) document.head.appendChild((el = create()));
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
}
const meta = (key: "name" | "property", id: string, content: string) =>
  upsert(`meta[${key}="${id}"]`, () => document.createElement("meta"), { [key]: id, content });
const link = (rel: string, href: string, hreflang?: string) =>
  upsert(
    hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang])`,
    () => document.createElement("link"),
    hreflang ? { rel, hreflang, href } : { rel, href }
  );

export function useSeo(view: string) {
  const { t, i18n } = useTranslation(["common", "legal"]);
  const lang: Lang = i18n.language === "en" ? "en" : "zh-HK";

  useEffect(() => {
    const brand = t("common:seo.brand");
    const home = t("common:seo.description");
    let title: string;
    let description: string;
    if ((LEGAL_VIEWS as readonly string[]).includes(view)) {
      const page: string = t(`legal:${LEGAL_KEY[view as LegalView]}.title`);
      title = page + t("common:seo.separator") + brand;
      description = t("common:seo.legal", { title: page });
    } else if (view in PAGE_KEY) {
      const key = PAGE_KEY[view as ToolView];
      title = t(`common:seo.pages.${key}.title`) + t("common:seo.separator") + brand;
      description = t(`common:seo.pages.${key}.description`);
    } else {
      title = t("common:seo.homeTitle"); // the bet tab is the home page
      description = home;
    }

    const origin = window.location.origin;
    const canonical = pageUrl(origin, view, lang);
    document.title = title;
    meta("name", "description", description);
    meta("name", "robots", NOINDEX.has(view) ? "noindex, follow" : "index, follow");
    link("canonical", canonical);
    for (const l of LANGS) link("alternate", pageUrl(origin, view, l), l);
    link("alternate", pageUrl(origin, view, "zh-HK"), "x-default");
    meta("property", "og:title", title);
    meta("property", "og:description", description);
    meta("property", "og:url", canonical);
    meta("property", "og:locale", OG_LOCALE[lang]);
    meta("property", "og:locale:alternate", OG_LOCALE[lang === "en" ? "zh-HK" : "en"]);
    meta("name", "twitter:title", title);
    meta("name", "twitter:description", description);
  }, [t, view, lang]);
}
