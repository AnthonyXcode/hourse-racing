// Slim strip at the bottom of the sticky header: date · race number · the Combined pick numbers
// (Momentum page) for the next race, or the last race run when none is coming. Links to Momentum.
// Lives inside the header, so --header-h (used by other sticky bars) includes it.
import { useEffect, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { api } from "../api";
import type { Highlight } from "../../shared/momentum/model";
import { useLanguage } from "../i18n/useLanguage";
import { container, cx } from "../kit";
import { viewHref } from "../LegalPages";

const REFRESH_MS = 60_000;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/** "23 Sep(9)" / "9月23日(9)" — date (YYYY-MM-DD) and race number in one token. */
const dayRace = (date: string, raceNo: number, lang: string) => {
  const m = Number(date.slice(5, 7)), d = Number(date.slice(8, 10));
  return lang === "en" ? `${d} ${MONTHS[m - 1]}(${raceNo})` : `${m}月${d}日(${raceNo})`;
};
const EASE = [0.2, 0, 0, 1] as const;
/**
 * Slowly drifting blue gradient behind the strip. The layer is 200% wide and its gradient repeats
 * twice (light → deep → light → deep → light), so sliding it by -50% loops seamlessly.
 * Transform-only, so MotionConfig's reducedMotion="user" stills it.
 */
function GradientFlow() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-y-0 left-0 w-[200%] bg-[linear-gradient(90deg,#d6e2fc_0%,#a9c1f7_25%,#d6e2fc_50%,#a9c1f7_75%,#d6e2fc_100%)]"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

const list = { hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 4 }, show: { opacity: 1, y: 0, transition: { duration: 0.22, ease: EASE } } };

export function PicksBanner({ onSelect, linked }: { onSelect: (v: string) => void; linked: boolean }) {
  const { t } = useTranslation(["momentum", "common"]);
  const { lang } = useLanguage();
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

  const open = (e: MouseEvent) => {
    if (!linked || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    onSelect("momentum");
    window.scrollTo(0, 0);
  };
  const upcoming = h?.mode === "upcoming";

  return (
    <AnimatePresence initial={false}>
      {h && h.picks.length > 0 && (
        <motion.div
          key="picks-strip"
          className="relative overflow-hidden border-t border-edge bg-[#d6e2fc]"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          <GradientFlow />
          <a
            href={linked ? viewHref("momentum") : undefined}
            onClick={open}
            aria-label={`${upcoming ? t("banner.upcoming") : t("banner.last")} · ${t("banner.title")}`}
            className={cx(container, "relative flex h-8 items-center gap-3 text-xs text-ink-2", linked && "cursor-pointer hover:text-ink")}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={h.race.raceId}
                className="flex w-full min-w-0 items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {upcoming && (
                  <span className="relative flex size-1.5 flex-none" aria-hidden>
                    <motion.span className="absolute inset-0 rounded-full bg-accent" animate={{ scale: [1, 2.4], opacity: [0.6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }} />
                    <span className="relative size-1.5 rounded-full bg-accent" />
                  </span>
                )}
                <span className="flex-none font-semibold text-ink tabular-nums">{dayRace(h.race.date, h.race.raceNo, lang)}</span>
                <motion.span className="ml-auto flex min-w-0 items-center gap-1 overflow-hidden p-0.5 sm:ml-0" variants={list} initial="hidden" animate="show">
                  {h.picks.map((p) => {
                    const placed = p.finishPos != null && p.finishPos <= 3;
                    return (
                      <motion.span
                        key={p.horseNo}
                        variants={item}
                        title={p.both ? t("banner.both") : undefined}
                        className={cx(
                          "inline-flex h-5 min-w-5 flex-none items-center justify-center gap-px rounded-full px-1 text-[11px] font-semibold tabular-nums",
                          placed ? "bg-good text-white" : "bg-surface text-ink shadow-btn",
                          p.both && "px-1.5 ring-1 ring-accent"
                        )}
                      >
                        {p.horseNo}
                        {/* ★ = in both the model and the market-move lists, as on the Momentum page */}
                        {p.both && (
                          <span aria-label={t("banner.both")} className={cx("text-[9px] leading-none", placed ? "text-white" : "text-accent")}>
                            ★
                          </span>
                        )}
                      </motion.span>
                    );
                  })}
                </motion.span>
              </motion.span>
            </AnimatePresence>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
