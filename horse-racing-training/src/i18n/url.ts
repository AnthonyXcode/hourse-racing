// Language lives in the URL as one query parameter: none = Chinese (default), ?language=en = English.
// Any other value (including an explicit zh-HK) is invalid and gets stripped.

export const LANGS = ["zh-HK", "en"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "zh-HK";
export const PARAM = "language";

/** Language named by a query string ("?tab=trio&language=en" → "en"). */
export function readLang(search: string): Lang {
  return new URLSearchParams(search).get(PARAM) === "en" ? "en" : DEFAULT_LANG;
}

/** `href` rewritten to show `lang`, keeping every other parameter. */
export function withLang(href: string, lang: Lang): string {
  const url = new URL(href);
  if (lang === "en") url.searchParams.set(PARAM, "en");
  else url.searchParams.delete(PARAM);
  return url.pathname + url.search + url.hash;
}

/** The canonical form of `href` if its language parameter is invalid, else null. */
export function normalizeHref(href: string): string | null {
  const url = new URL(href);
  const v = url.searchParams.get(PARAM);
  if (v === null || v === "en") return null;
  return withLang(href, DEFAULT_LANG);
}

/** <html lang> value for a language. */
export const htmlLang = (lang: Lang) => (lang === "en" ? "en" : "zh-Hant-HK");
