// Slim strip at the bottom of the sticky header: date · race number · the Combined pick numbers
// (Momentum page) for the next race, or the last race run when none is coming. Links to Momentum.
// Lives inside the header, so --header-h (used by other sticky bars) includes it.
import { useEffect, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { api } from "../api";
import type { Highlight } from "../../shared/momentum/model";
import { useFmt } from "../i18n/useLanguage";
import { container, cx } from "../kit";
import { viewHref } from "../LegalPages";

const REFRESH_MS = 60_000;
const EASE = [0.2, 0, 0, 1] as const;
const list = { hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 4 }, show: { opacity: 1, y: 0, transition: { duration: 0.22, ease: EASE } } };

export function PicksBanner({ onSelect, linked }: { onSelect: (v: string) => void; linked: boolean }) {
  const { t } = useTranslation(["momentum", "common"]);
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
          className="overflow-hidden border-t border-edge bg-accent-soft/70"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          <a
            href={linked ? viewHref("momentum") : undefined}
            onClick={open}
            aria-label={`${upcoming ? t("banner.upcoming") : t("banner.last")} · ${t("banner.title")}`}
            className={cx(container, "flex h-8 items-center gap-3 text-xs text-ink-2", linked && "cursor-pointer hover:text-ink")}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={h.race.raceId}
                className="flex min-w-0 items-center gap-3"
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
                <span className="flex-none tabular-nums">{fmt.date(`${h.race.date}T12:00:00+08:00`, { month: "short", day: "numeric" })}</span>
                <span className="flex-none font-semibold text-ink">{t("common:race", { n: h.race.raceNo })}</span>
                <motion.span className="flex min-w-0 items-center gap-1 overflow-hidden" variants={list} initial="hidden" animate="show">
                  {h.picks.map((p) => (
                    <motion.span
                      key={p.horseNo}
                      variants={item}
                      className={cx(
                        "inline-flex h-5 min-w-5 flex-none items-center justify-center rounded-full px-1 text-[11px] font-semibold tabular-nums",
                        p.finishPos != null && p.finishPos <= 3 ? "bg-good text-white" : "bg-surface text-ink shadow-btn"
                      )}
                    >
                      {p.horseNo}
                    </motion.span>
                  ))}
                </motion.span>
              </motion.span>
            </AnimatePresence>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
