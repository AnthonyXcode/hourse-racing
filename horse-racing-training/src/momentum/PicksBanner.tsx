// Site-wide banner under the navigation bar: the Momentum page's Combined picks for the next race
// (or, when none is coming up, the last race run — with how the picks did). Refreshes every minute.
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { api } from "../api";
import type { Highlight } from "../../shared/momentum/model";
import { useGlossary } from "../i18n/glossary";
import { Name, useNames } from "../i18n/names";
import { useFmt, useLanguage } from "../i18n/useLanguage";
import { cx } from "../kit";
import { ViewLink } from "../LegalPages";

const REFRESH_MS = 60_000;
const EASE = [0.2, 0, 0, 1] as const;
const list = { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.12 } } };
const item = { hidden: { opacity: 0, y: 6, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.28, ease: EASE } } };

export function PicksBanner({ onSelect, showCta }: { onSelect: (v: string) => void; showCta: boolean }) {
  const { t } = useTranslation(["momentum", "common"]);
  const { lang } = useLanguage();
  const name = useNames();
  const g = useGlossary();
  const fmt = useFmt();
  const [h, setH] = useState<Highlight | null>(null);

  useEffect(() => {
    let live = true;
    const load = () => api.momentumHighlight().then((x) => live && setH(x)).catch(() => {});
    load();
    const timer = setInterval(load, REFRESH_MS);
    return () => {
      live = false;
      clearInterval(timer);
    };
  }, []);

  const upcoming = h?.mode === "upcoming";
  const hits = h ? h.placed.filter((p) => h.picks.some((k) => k.horseNo === p.horseNo)).length : 0;
  const horseName = (p: Highlight["picks"][number]) => (lang === "zh-HK" && p.nameZh ? p.nameZh : name("horse", p.code, p.name));

  return (
    <AnimatePresence mode="wait">
      {h && h.picks.length > 0 && (
        <motion.section
          key={h.race.raceId}
          aria-label={t("banner.aria")}
          className="mt-4 overflow-hidden rounded-card bg-linear-to-r from-accent-soft via-surface to-surface shadow-card"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.32, ease: EASE }}
        >
          <div className="flex flex-col gap-3 p-4 lg:flex-row lg:items-center lg:gap-5 lg:px-5">
            {/* Which race */}
            <div className="flex min-w-0 flex-none flex-col gap-1.5 lg:w-60">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-white">
                  {upcoming && (
                    <span className="relative flex size-2">
                      <motion.span
                        className="absolute inset-0 rounded-full bg-white"
                        animate={{ scale: [1, 2.2], opacity: [0.7, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                      />
                      <span className="relative size-2 rounded-full bg-white" />
                    </span>
                  )}
                  {upcoming ? t("banner.upcoming") : t("banner.last")}
                </span>
                <span className="text-xs font-medium text-ink-2">{t("banner.title")}</span>
              </div>
              <p className="font-display text-lg leading-tight text-ink">
                {t("common:race", { n: h.race.raceNo })} · {g.venue(h.race.venue)}
                {h.race.postTime && <span className="font-sans text-sm text-ink-2"> · {fmt.date(h.race.postTime, { hour: "2-digit", minute: "2-digit", hourCycle: "h23" })}</span>}
              </p>
              <p className="truncate text-xs text-ink-3">
                {fmt.date(`${h.race.date}T12:00:00+08:00`, { dateStyle: "medium" })}
                {h.race.name && (
                  <>
                    {" · "}
                    <Name kind="race" code={h.race.raceId} en={h.race.name} />
                  </>
                )}
              </p>
            </div>

            {/* The picks */}
            <motion.ul
              className="-mx-4 flex min-w-0 flex-1 gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0 lg:pb-0"
              variants={list}
              initial="hidden"
              animate="show"
            >
              {h.picks.map((p) => {
                const placed = p.finishPos != null && p.finishPos <= 3;
                return (
                  <motion.li
                    key={p.horseNo}
                    variants={item}
                    className={cx(
                      "inline-flex h-9 flex-none items-center gap-1.5 rounded-full bg-surface px-3 text-sm whitespace-nowrap shadow-btn",
                      p.both && "ring-1 ring-accent",
                      placed && "bg-good-soft!"
                    )}
                    title={p.both ? t("banner.both") : undefined}
                  >
                    <b className="tabular-nums">{p.horseNo}</b>
                    <span className="text-ink-2">{horseName(p)}</span>
                    {p.both && <span className="text-accent" aria-label={t("banner.both")}>★</span>}
                    {p.odds != null && <span className="text-xs text-ink-3 tabular-nums">({p.odds})</span>}
                    {placed && <span className="text-xs font-semibold text-good">{t(`ordinal.${p.finishPos}` as "ordinal.1")}</span>}
                  </motion.li>
                );
              })}
            </motion.ul>

            {/* Outcome (last race) + link */}
            <div className="flex flex-none items-center justify-between gap-4 lg:flex-col lg:items-end lg:gap-1">
              {!upcoming && h.placed.length > 0 && <span className="text-xs font-medium text-good">{t("banner.placed", { n: hits })}</span>}
              {showCta && (
                <ViewLink view="momentum" onSelect={onSelect} className="group inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
                  {upcoming ? t("banner.cta") : t("banner.ctaLast")}
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                </ViewLink>
              )}
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
