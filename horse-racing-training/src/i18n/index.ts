// i18next setup. The URL is the only source of the language (see ./url.ts):
// no parameter = 繁體中文 (default), ?language=en = English. Nothing is cached in storage.
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { en, zhHK, NAMESPACES } from "./resources";
import { DEFAULT_LANG, LANGS, htmlLang, normalizeHref, readLang } from "./url";

const detector = new LanguageDetector();
// Same rule as readLang, so the URL and the active language can never disagree
// (the stock querystring lookup would map e.g. "en-US" to English).
detector.addDetector({ name: "languageParam", lookup: () => readLang(window.location.search) });

// Drop an invalid ?language= (e.g. "zh-HK", "xx") before anything reads the URL.
const canonical = normalizeHref(window.location.href);
if (canonical) window.history.replaceState(window.history.state, "", canonical);

void i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources: { en, "zh-HK": zhHK },
    supportedLngs: [...LANGS],
    fallbackLng: DEFAULT_LANG,
    load: "currentOnly",
    ns: NAMESPACES,
    defaultNS: "common",
    initAsync: false, // resources are bundled; render translated on the first paint
    interpolation: { escapeValue: false }, // React escapes
    returnNull: false,
    detection: { order: ["languageParam"], caches: [] },
  });

const syncHtmlLang = (lng: string) => {
  document.documentElement.lang = htmlLang(lng === "en" ? "en" : "zh-HK");
};
syncHtmlLang(i18n.language);
i18n.on("languageChanged", syncHtmlLang);

// Back/forward can cross a language switch made with replaceState on another entry.
window.addEventListener("popstate", () => {
  const lng = readLang(window.location.search);
  if (i18n.language !== lng) void i18n.changeLanguage(lng);
});

export default i18n;
