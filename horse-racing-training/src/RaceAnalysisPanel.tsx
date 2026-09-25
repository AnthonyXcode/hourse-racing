// Bet page: collapsible pre-race model analysis of the race being edited, for reference.
// Built only from the saved racecard (no results or starting prices), so it can't give away the outcome.
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { api } from "./api";
import { confidence, strategyChecks, type PreRaceAnalysis } from "../shared/analyzer/model";
import { useNames } from "./i18n/names";
import { cx, panel, table, tablePadTight } from "./kit";

const COLLAPSE = { duration: 0.24, ease: [0.2, 0, 0, 1] } as const;
const STAR = "M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8z";

/** Five stars filled to `value` (0–5, fractional): grey row, gold row clipped to the exact width on top. */
function Stars({ value, size = 14 }: { value: number; size?: number }) {
  const row = (cls: string) => (
    <span className={cx("flex gap-0.5", cls)}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 20 20" width={size} height={size} className="flex-none fill-current">
          <path d={STAR} />
        </svg>
      ))}
    </span>
  );
  // Exact width: whole stars (plus the 2px gap after each), then the fraction of the next star.
  const v = Math.max(0, Math.min(5, value)), whole = Math.floor(v);
  const width = whole * (size + 2) + (v - whole) * size;
  return (
    <span aria-hidden className="relative inline-flex flex-none">
      {row("text-surface-3")}
      <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width }}>
        {row("text-[#e8a317]")}
      </span>
    </span>
  );
}

export function RaceAnalysisPanel({ date, venue, raceNo }: { date: string; venue: string; raceNo: number }) {
  const { t } = useTranslation(["bet", "common"]);
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
  const conf = confidence(checks);
  const confLabel = t("analysis.confidenceAria", { stars: conf.stars.toFixed(1).replace(/\.0$/, "") });

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
            <span className="inline-flex w-fit flex-none items-center gap-1.5" role="img" aria-label={confLabel} title={confLabel}>
              <Stars value={conf.stars} />
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

              {/* Confidence = share of the venue's default-strategy rules met (the rules themselves stay private) */}
              {checks.length > 0 && (
                <div className="mt-3 flex items-center gap-2 text-xs" role="img" aria-label={confLabel} title={confLabel}>
                  <span className="font-medium text-ink-2">{t("analysis.confidence")}</span>
                  <Stars value={conf.stars} size={16} />
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
