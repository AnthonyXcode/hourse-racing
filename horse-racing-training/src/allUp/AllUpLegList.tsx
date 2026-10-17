// All Up: the legs being built, in race order (docs/all-up/DESIGN-SPEC.md §3.3). Tap a row to edit that leg's
// pool and horses; ✕ removes it.
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTranslation } from "react-i18next";
import type { AllUpPool } from "../../shared/types";
import { btnPill, cx } from "../kit";

export interface LegRow {
  raceNumber: number;
  pool: AllUpPool;
  /** Display picks ("膽 1  腳 4,9" / "B 1  L 4,9"); "" when nothing is ticked. */
  picks: string;
  combos: number;
  /** LIVE: the race can't take bets any more. */
  closed?: boolean;
}

const ROW = { duration: 0.15, ease: [0.2, 0, 0, 1] } as const;

export function AllUpLegList({
  legs,
  editing,
  onEdit,
  onRemove,
}: {
  legs: LegRow[];
  editing: number;
  onEdit: (raceNumber: number) => void;
  onRemove: (raceNumber: number) => void;
}) {
  const { t } = useTranslation(["bet", "common", "credits"]);
  const reduce = useReducedMotion();

  if (!legs.length) return <p className="py-6 text-center text-[13px] text-ink-muted">{t("allUp.empty")}</p>;

  return (
    <ol aria-label={t("allUp.legsTitle")} className="divide-y divide-edge">
      <AnimatePresence initial={false}>
        {legs.map((l, i) => {
          const on = l.raceNumber === editing;
          const pool = t(`common:betType.${l.pool}`);
          return (
            <motion.li
              key={l.raceNumber}
              initial={reduce ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reduce ? undefined : { height: 0, opacity: 0 }}
              transition={ROW}
              className="overflow-hidden"
            >
              <div className={cx("flex items-center gap-2 py-1", on && "rounded-control bg-sky-50 ring-1 ring-navy-700 ring-inset", l.closed && "bg-bad-soft")}>
                <button
                  type="button"
                  data-leg-edit={l.raceNumber}
                  aria-current={on ? "true" : undefined}
                  aria-label={t("allUp.editAria", { n: i + 1, race: l.raceNumber, pool })}
                  className="flex min-h-14 min-w-0 flex-1 cursor-pointer flex-col justify-center rounded-control px-2 text-left lg:grid lg:min-h-11 lg:grid-cols-[4.5rem_4.5rem_6rem_minmax(0,1fr)_4.5rem] lg:items-center lg:gap-2"
                  onClick={() => onEdit(l.raceNumber)}
                >
                  <span className="flex items-baseline gap-2 lg:contents">
                    <span className="text-[13px] text-ink-muted tabular-nums">{t("allUp.legN", { n: i + 1 })}</span>
                    <span className="text-[13px] font-medium text-navy-900 lg:text-[15px]">{t("common:raceShort", { n: l.raceNumber })}</span>
                    <span className="text-[13px] text-ink">
                      <span className="lg:hidden">· </span>
                      {pool}
                    </span>
                    <span className="ml-auto text-[13px] text-ink-muted tabular-nums lg:hidden">{l.combos ? t("allUp.combos", { count: l.combos }) : "—"}</span>
                  </span>
                  <span className={cx("text-[13px] break-words", l.picks ? "text-ink" : "text-warn")}>
                    {l.closed ? <span className="text-bad">🔒 {t("credits:slip.closedTag")} · </span> : null}
                    {l.picks || t("allUp.noPicks")}
                  </span>
                  <span className="hidden text-right text-[13px] text-ink-muted tabular-nums lg:block">{l.combos ? t("allUp.combos", { count: l.combos }) : "—"}</span>
                </button>
                {!on && (
                  <span aria-hidden="true" className={cx(btnPill, "pointer-events-none hidden h-8 text-[13px] lg:inline-flex")}>
                    {t("allUp.edit")}
                  </span>
                )}
                <button
                  type="button"
                  className="inline-flex size-11 flex-none cursor-pointer items-center justify-center rounded-full text-ink-muted hover:bg-bad-soft hover:text-bad"
                  aria-label={t("allUp.removeLeg", { n: l.raceNumber })}
                  onClick={() => onRemove(l.raceNumber)}
                >
                  ✕
                </button>
              </div>
            </motion.li>
          );
        })}
      </AnimatePresence>
    </ol>
  );
}
