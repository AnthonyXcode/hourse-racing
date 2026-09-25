import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { cx, seg, segBtn } from "../kit";
import { LANGS, readLang, withLang, type Lang } from "./url";

/** Current language plus a switcher that rewrites ?language= in place (no new history entry). */
export function useLanguage() {
  const { i18n } = useTranslation();
  const lang: Lang = i18n.language === "en" ? "en" : "zh-HK";
  return useMemo(
    () => ({
      lang,
      /** URL of the current page in `l`, for real links (open in new tab, copy). */
      hrefFor: (l: Lang) => withLang(window.location.href, l),
      setLang: (l: Lang) => {
        window.history.replaceState(window.history.state, "", withLang(window.location.href, l));
        if (readLang(window.location.search) !== i18n.language) void i18n.changeLanguage(l);
      },
    }),
    [lang, i18n]
  );
}

/** Intl formatters for the active language. */
export function useFmt() {
  const { lang } = useLanguage();
  return useMemo(() => {
    const loc = lang === "en" ? "en-GB" : "zh-HK";
    const num = (v: number, o?: Intl.NumberFormatOptions) => (Number.isFinite(v) ? new Intl.NumberFormat(loc, o).format(v) : "–");
    return {
      locale: loc,
      num,
      money: (v: number) => (Number.isFinite(v) ? (v < 0 ? "−$" : "$") + num(Math.abs(Math.round(v))) : "–"),
      date: (d: Date | string, o: Intl.DateTimeFormatOptions = { dateStyle: "medium" }) => new Intl.DateTimeFormat(loc, { timeZone: "Asia/Hong_Kong", ...o }).format(typeof d === "string" ? new Date(d) : d),
    };
  }, [lang]);
}

/** 繁 | EN toggle. Real links (shareable, open-in-new-tab) with in-place switching on click. */
export function LangSwitch({ className, full }: { className?: string; full?: boolean }) {
  const { t } = useTranslation();
  const { lang, hrefFor, setLang } = useLanguage();
  return (
    <div className={cx(seg, className)} role="group" aria-label={t("language.label")}>
      {LANGS.map((l) => (
        <a
          key={l}
          href={hrefFor(l)}
          hrefLang={l === "en" ? "en" : "zh-Hant-HK"}
          lang={l === "en" ? "en" : "zh-Hant-HK"}
          aria-current={lang === l ? "true" : undefined}
          className={cx(segBtn(lang === l), "no-underline", full && "flex-1 text-center")}
          onClick={(e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // let the browser open a new tab
            e.preventDefault();
            setLang(l);
          }}
        >
          {t(full ? (`language.${l}_full` as const) : (`language.${l}` as const))}
        </a>
      ))}
    </div>
  );
}
