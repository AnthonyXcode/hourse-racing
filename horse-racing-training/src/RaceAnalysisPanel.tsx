// Bet page: collapsible pre-race model analysis of the race being edited, for reference.
// Built only from the saved racecard (no results or starting prices), so it can't give away the outcome.
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { api } from "./api";
import { strategyChecks, type PreRaceAnalysis } from "../shared/analyzer/model";
import { useGlossary } from "./i18n/glossary";
import { useNames } from "./i18n/names";
import { cx, panel, table, tablePadTight } from "./kit";

const COLLAPSE = { duration: 0.24, ease: [0.2, 0, 0, 1] } as const;

export function RaceAnalysisPanel({ date, venue, raceNo }: { date: string; venue: string; raceNo: number }) {
  const { t } = useTranslation(["bet", "common"]);
  const g = useGlossary();
  const name = useNames();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<{ key: string; data: PreRaceAnalysis | null; error?: boolean } | null>(null);
  const key = `${date}_${venue}_${raceNo}`;

  useEffect(() => {
    let live = true;
    api
      .raceAnalysis(date, venue, raceNo)
      .then((data) => live && setState({ key, data }))
      .catch(() => live && setState({ key, data: null, error: true }));
    return () => {
      live = false;
    };
  }, [date, venue, raceNo, key]);

  const a = state?.key === key ? state.data : null;
  const loading = state?.key !== key;
  const top = a?.horses[0];
  const checks = a ? strategyChecks(a) : [];
  const fits = checks.length > 0 && checks.every((c) => c.ok);
  const venueName = a ? g.venue(a.venue) : "";

  return (
    <section className={cx(panel, "mt-3 p-0 sm:p-0")}>
      <button
        type="button"
        className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left sm:px-5"
        aria-expanded={open}
        aria-controls="race-analysis"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-3">
          <span className="flex-none text-sm font-semibold text-ink">{t("analysis.title")}</span>
          <span className="min-w-0 truncate text-xs text-ink-2">
            {loading
              ? t("analysis.loading")
              : !a || !top
                ? t("analysis.unavailable")
                : t("analysis.summary", { n: top.horseNo, name: name("horse", top.code, top.name), win: top.winPct.toFixed(1), place: top.placePct.toFixed(1) })}
          </span>
          {a && checks.length > 0 && (
            <span className={cx("w-fit flex-none rounded-full px-2 py-0.5 text-[11px] font-semibold", fits ? "bg-good-soft text-good" : "bg-surface-2 text-ink-2")}>
              {fits ? t("analysis.fits", { venue: venueName }) : t("analysis.outside", { venue: venueName })}
            </span>
          )}
        </span>
        <motion.span aria-hidden className="flex-none text-ink-3" animate={{ rotate: open ? 180 : 0 }} transition={COLLAPSE}>
          ▼
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && a && (
          <motion.div
            key="analysis"
            id="race-analysis"
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={COLLAPSE}
          >
            <div className="border-t border-edge px-4 pt-3 pb-4 sm:px-5">
              {/* Race-level metrics */}
              <dl className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                {(
                  [
                    ["runners", a.runners],
                    ["avgDiff", a.avgDiff],
                    ["close8", a.close8],
                    ["sparse", a.sparse],
                    ["gap", a.gap >= 999 ? "–" : a.gap],
                  ] as const
                ).map(([k, v]) => (
                  <div key={k} className="rounded-control bg-surface-2 px-3 py-2">
                    <dt className="text-[11px] text-ink-3">{t(`analysis.${k}`)}</dt>
                    <dd className="font-display text-xl leading-tight tabular-nums">{v}</dd>
                  </div>
                ))}
              </dl>

              {/* The venue's default strategy, rule by rule */}
              {checks.length > 0 && (
                <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
                  <span className="mr-1 font-medium text-ink-2">{t("analysis.strategy", { venue: venueName })}</span>
                  {checks.map((c) => (
                    <span key={c.key} className={cx("rounded-full px-2 py-0.5", c.ok ? "bg-good-soft text-good" : "bg-bad-soft text-bad")}>
                      {c.ok ? "✓" : "✗"} {t(`analysis.rule.${c.key}`, { limit: c.key === "surface" ? g.surface(c.limit) : c.limit })}
                    </span>
                  ))}
                </div>
              )}

              {/* Runners in model order */}
              <div className="mt-3 overflow-x-auto">
                <table className={cx(table, tablePadTight, "text-[13px] [&_td:nth-child(3)]:text-left [&_th:nth-child(3)]:text-left")}>
                  <thead>
                    <tr>
                      <th>{t("analysis.col.model")}</th>
                      <th>{t("common:word.number")}</th>
                      <th>{t("common:word.horse")}</th>
                      <th>{t("analysis.col.win")}</th>
                      <th>{t("analysis.col.place")}</th>
                      <th>{t("analysis.col.rating")}</th>
                      <th>{t("analysis.col.market")}</th>
                      <th>{t("analysis.col.odds")}</th>
                      <th>{t("analysis.col.trip")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {a.horses.map((h) => (
                      <tr key={h.horseNo} className={h.modelRank === 1 ? "[&_td]:bg-accent-soft/60" : undefined} title={h.modelRank === 1 ? t("analysis.topPick") : undefined}>
                        <td className="font-semibold">{h.modelRank}</td>
                        <td>{h.horseNo}</td>
                        <td className="max-w-[180px] truncate">{name("horse", h.code, h.name)}</td>
                        <td>{h.winPct.toFixed(1)}</td>
                        <td>{h.placePct.toFixed(1)}</td>
                        <td>{h.ratingRank || "–"}</td>
                        <td>{h.marketRank || "–"}</td>
                        <td>{h.odds > 0 ? h.odds : "–"}</td>
                        <td>{h.tripRuns}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-ink-3">{t("analysis.note")}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
