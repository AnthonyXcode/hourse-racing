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
 * A soft band of light sweeping across the strip every few seconds. Transform-only, so
 * MotionConfig's reducedMotion="user" leaves it parked off-screen.
 */
function Shine() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-white/30 to-transparent"
        initial={{ x: "-120%" }}
        animate={{ x: ["-120%", "420%"] }}
        transition={{ duration: 1.4, ease: "easeInOut", repeat: Infinity, repeatDelay: 6 }}
      />
    </div>
  );
}

/** Ticks every second while `on`. */
function useNow(on: boolean) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!on) return;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [on]);
  return now;
}

/** "12:34" or "1:02:03". */
const clock = (secs: number) => {
  const s = Math.max(0, Math.floor(secs)), h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), r = s % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return h ? `${h}:${pad(m)}:${pad(r)}` : `${m}:${pad(r)}`;
};

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
  const postMs = upcoming && h?.race.postTime ? Date.parse(h.race.postTime) : NaN;
  const now = useNow(Number.isFinite(postMs));
  const toPost = Number.isFinite(postMs) ? (postMs - now) / 1000 : NaN;

  return (
    <AnimatePresence initial={false}>
      {h && h.picks.length > 0 && (
        <motion.div
          key="picks-strip"
          className="relative overflow-hidden bg-accent"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          <Shine />
          <a
            href={linked ? viewHref("momentum") : undefined}
            onClick={open}
            aria-label={`${upcoming ? t("banner.upcoming") : t("banner.last")} · ${t("banner.title")}`}
            className={cx(container, "relative flex h-8 items-center gap-3 text-xs text-white/85", linked && "cursor-pointer hover:text-white")}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={h.race.raceId}
                className="flex w-full min-w-0 items-center gap-2 sm:gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {upcoming && (
                  <span className={cx("relative size-1.5 flex-none", toPost > 0 ? "hidden sm:flex" : "flex")} aria-hidden>
                    <motion.span className="absolute inset-0 rounded-full bg-white" animate={{ scale: [1, 2.4], opacity: [0.7, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }} />
                    <span className="relative size-1.5 rounded-full bg-white" />
                  </span>
                )}
                <span className="flex-none font-semibold text-white tabular-nums">{dayRace(h.race.date, h.race.raceNo, lang)}</span>
                {toPost > 0 && (
                  <span
                    className="inline-flex flex-none items-center gap-1 rounded-full bg-white/15 px-1.5 py-0.5 font-semibold text-white tabular-nums sm:px-2"
                    aria-label={t("banner.toPost", { time: clock(toPost) })}
                    role="timer"
                  >
                    <svg aria-hidden viewBox="0 0 16 16" className="size-3 sm:hidden" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                      <circle cx="8" cy="9" r="5.5" />
                      <path d="M8 6v3l2 1.5M6.5 1.5h3" />
                    </svg>
                    <span className="hidden sm:inline">{t("banner.toPostLabel")}</span>
                    {clock(toPost)}
                  </span>
                )}
                <motion.span className="ml-auto flex min-w-0 items-center gap-0.5 overflow-x-auto p-0.5 [scrollbar-width:none] sm:ml-0 sm:gap-1 [&::-webkit-scrollbar]:hidden" variants={list} initial="hidden" animate="show">
                  {h.picks.map((p) => {
                    const placed = p.finishPos != null && p.finishPos <= 3;
                    return (
                      <motion.span
                        key={p.horseNo}
                        variants={item}
                        title={p.both ? t("banner.both") : undefined}
                        className={cx(
                          "inline-flex h-5 min-w-5 flex-none items-center justify-center gap-px rounded-full px-1 text-[11px] font-semibold tabular-nums",
                          placed ? "bg-good text-white ring-1 ring-white/70" : "bg-white text-accent",
                          p.both && "px-1.5 ring-2 ring-white/45"
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
