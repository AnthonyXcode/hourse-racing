// Slim strip at the bottom of the sticky header: date · race number · the Combined pick numbers
// (Momentum page) for the next race, or the last race run when none is coming. Links to Momentum.
// Lives inside the header, so --header-h (used by other sticky bars) includes it.
// Polls while open: picks slide/fade as the list changes, and each pick's win odds roll to the new
// value (green = shortening, red = drifting) as the market moves.
import { useEffect, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { api } from "../api";
import type { Highlight } from "../../shared/momentum/model";
import { useLanguage } from "../i18n/useLanguage";
import { container, cx } from "../kit";
import { viewHref } from "../LegalPages";

const REFRESH_MS = 30_000; // same cadence as the Momentum page
const TICK_HOLD_MS = 4_000; // how long an odds change stays coloured
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/** "23 Sep(R9)" / "9月23日(R9)" — date (YYYY-MM-DD) and race number in one token. */
const dayRace = (date: string, raceNo: number, lang: string) => {
  const m = Number(date.slice(5, 7)), d = Number(date.slice(8, 10));
  return lang === "en" ? `${d} ${MONTHS[m - 1]}(R${raceNo})` : `${m}月${d}日(R${raceNo})`;
};
const EASE = [0.2, 0, 0, 1] as const;
/**
 * Slowly drifting blue gradient behind the strip. The layer is 200% wide and its gradient repeats
 * twice (white → blue → white → blue → white), so sliding it by -50% loops seamlessly.
 * Transform-only, so MotionConfig's reducedMotion="user" stills it.
 */
function GradientFlow() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-y-0 left-0 w-[200%] bg-[linear-gradient(90deg,#ffffff_0%,#86a6f2_25%,#ffffff_50%,#86a6f2_75%,#ffffff_100%)]"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

const list = { hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } } };
const item = {
  hidden: { opacity: 0, y: 4 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.22, ease: EASE } },
  exit: { opacity: 0, scale: 0.6, transition: { duration: 0.18, ease: EASE } },
};
const flag = { initial: { opacity: 0, scale: 0 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0 }, transition: { duration: 0.2, ease: EASE } };
const fmtOdds = (v: number) => (v >= 100 ? v.toFixed(0) : v.toFixed(1));
/** Enters from below when odds shorten (−1), from above when they drift (+1); leaves the opposite way. */
const roll = {
  enter: (dir: number) => ({ y: dir < 0 ? 8 : dir > 0 ? -8 : 0, opacity: 0 }),
  show: { y: 0, opacity: 1, transition: { duration: 0.25, ease: EASE } },
  exit: (dir: number) => ({ y: dir < 0 ? -8 : dir > 0 ? 8 : 0, opacity: 0, transition: { duration: 0.2, ease: EASE } }),
};

/** A pick's win odds; rolls to the new value when it changes and briefly tints the move direction. */
function OddsTick({ value }: { value: number }) {
  // Direction is derived during render (not in an effect) so the entering value already knows it.
  const [seen, setSeen] = useState({ value, dir: 0 });
  if (seen.value !== value) setSeen({ value, dir: value < seen.value ? -1 : 1 });
  const dir = seen.dir;
  useEffect(() => {
    if (!dir) return;
    const t = setTimeout(() => setSeen((s) => ({ ...s, dir: 0 })), TICK_HOLD_MS);
    return () => clearTimeout(t);
  }, [dir, seen.value]);

  return (
    <span className="relative ml-0.5 hidden h-3.5 overflow-hidden text-[10px] font-medium leading-3.5 sm:inline-flex">
      <AnimatePresence mode="popLayout" initial={false} custom={dir}>
        <motion.span
          key={value}
          custom={dir}
          variants={roll}
          initial="enter"
          animate="show"
          exit="exit"
          className={cx("transition-colors duration-700", dir < 0 ? "text-good" : dir > 0 ? "text-bad" : "text-ink-3")}
        >
          {fmtOdds(value)}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function PicksBanner({ onSelect, linked }: { onSelect: (v: string) => void; linked: boolean }) {
  const { t } = useTranslation(["momentum", "common"]);
  const { lang } = useLanguage();
  const [h, setH] = useState<Highlight | null>(null);

  useEffect(() => {
    let live = true;
    const load = () => api.momentumHighlight().then((x) => live && setH(x)).catch(() => {});
    load();
    const onShow = () => document.visibilityState === "visible" && load(); // skip hidden tabs, catch up on return
    const timer = setInterval(onShow, REFRESH_MS);
    document.addEventListener("visibilitychange", onShow);
    return () => {
      live = false;
      clearInterval(timer);
      document.removeEventListener("visibilitychange", onShow);
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
          className="relative overflow-hidden border-t border-edge bg-white"
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
                  <AnimatePresence mode="popLayout" initial={false}>
                  {h.picks.map((p) => {
                    const placed = p.finishPos != null && p.finishPos <= 3;
                    return (
                      <motion.span
                        key={p.horseNo}
                        layout
                        variants={item}
                        exit="exit"
                        title={p.both ? t("banner.both") : p.marketOnly ? t("banner.marketOnly") : undefined}
                        className={cx(
                          "inline-flex h-5 min-w-5 flex-none items-center justify-center gap-px rounded-full px-1 text-[11px] font-semibold tabular-nums",
                          placed ? "bg-good text-white" : "bg-surface text-ink shadow-btn",
                          p.both && "px-1.5 ring-1 ring-accent",
                          p.marketOnly && "px-1.5 ring-1 ring-warn"
                        )}
                      >
                        <motion.span layout="position">{p.horseNo}</motion.span>
                        {/* ★ = in both the model and the market-move lists, as on the Momentum page */}
                        <AnimatePresence initial={false}>
                          {p.both && (
                            <motion.span key="both" {...flag} aria-label={t("banner.both")} className={cx("text-[9px] leading-none", placed ? "text-white" : "text-accent")}>
                              ★
                            </motion.span>
                          )}
                        </AnimatePresence>
                        {/* ↑ = in the market-move list only (money coming), not the model's top picks */}
                        <AnimatePresence initial={false}>
                          {p.marketOnly && (
                            <motion.span key="move" {...flag} aria-label={t("banner.marketOnly")} className={cx("text-[10px] leading-none", placed ? "text-white" : "text-warn")}>
                              ↑
                            </motion.span>
                          )}
                        </AnimatePresence>
                        {/* win odds (sm+); hidden once the horse has placed */}
                        {p.odds != null && !placed && <OddsTick value={p.odds} />}
                      </motion.span>
                    );
                  })}
                  </AnimatePresence>
                </motion.span>
              </motion.span>
            </AnimatePresence>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
