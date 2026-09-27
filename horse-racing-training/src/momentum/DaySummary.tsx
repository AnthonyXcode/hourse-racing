// Momentum → Summary: review of a racing day — how each race's Combined picks did, with day totals.
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { api } from "../api";
import type { DaySummary as Summary } from "../../shared/momentum/model";
import { C, GroupedBars, type Series } from "../analyzer/charts";
import { Kpi, Legend, cls, money, pc, signed } from "../analyzer/format";
import { useNames } from "../i18n/names";
import { useLanguage } from "../i18n/useLanguage";
import { cx, dim, empty, errorBox, h3, kpis, note, panel, scroll, table, tablePad } from "../kit";
import { HorseLink } from "./HorseRecord";
import { cutoffLabel, useCutoff } from "./cutoff";

const REFRESH_MS = 60_000;

export function DaySummary({ date, live, onOpenRace }: { date: string; live: boolean; onOpenRace: (raceId: string) => void }) {
  const { t } = useTranslation(["momentum", "common"]);
  const { lang } = useLanguage();
  const name = useNames();
  const cutoff = useCutoff();
  const [data, setData] = useState<{ key: string; s: Summary | null; error?: string } | null>(null);
  const key = `${date}|${cutoff}`;
  /** Drill-down: which bar of the position chart is open (row = pick position index, series 0 = model, 1 = move). */
  const [sel, setSel] = useState<{ row: number; series: number } | null>(null);

  useEffect(() => {
    let on = true;
    const load = () =>
      api
        .momentumSummary(date, cutoff)
        .then((s) => on && setData({ key, s }))
        .catch((e) => on && setData({ key, s: null, error: String(e instanceof Error ? e.message : e) }));
    load();
    const timer = live ? setInterval(load, REFRESH_MS) : undefined; // today: results come in during the day
    return () => {
      on = false;
      clearInterval(timer);
    };
  }, [date, cutoff, key, live]);

  const s = data?.key === key ? data.s : null;
  if (!data || data.key !== key) return <div className={cx(panel, empty, "mt-4")}>{t("summary.loading")}</div>;
  if (data.error || !s) return <div className={errorBox}>{data.error ?? t("summary.none")}</div>;

  const run = s.races.filter((r) => r.status === "result" && r.combined);
  const pending = s.races.length - run.length;
  const sum = (f: (r: (typeof run)[number]) => number) => run.reduce((a, r) => a + f(r), 0);
  const winners = sum((r) => (r.combined!.winner ? 1 : 0));
  const top3 = sum((r) => r.combined!.top3);
  const trioHits = sum((r) => (r.combined!.trio ? 1 : 0));
  const priced = run.filter((r) => r.combined!.trioReturn != null);
  const cost = priced.reduce((a, r) => a + r.combined!.trioCost, 0);
  const ret = priced.reduce((a, r) => a + (r.combined!.trioReturn ?? 0), 0);
  // Place picks: races with a result and posted Place dividends.
  // Place picks: races with a result and posted Place dividends. Two views: as of the last snapshot,
  // and as they stood 5 min before post (still bettable).
  const pl = placeTotals(run.map((r) => ({ r, picks: r.place, cost: r.placeCost, ret: r.placeReturn })));
  const when = cutoffLabel(t, cutoff);
  const topPlaced = run.filter((r) => r.modelTop?.finishPos != null && r.modelTop.finishPos <= 3).length;
  const best = run.reduce<(typeof run)[number] | null>((b, r) => ((r.combined!.trioReturn ?? 0) > (b?.combined!.trioReturn ?? 0) ? r : b), null);
  // Place hit rate by pick position: for position k, the share of finished races whose k-th model /
  // market-move pick finished in the first three.
  type PosRow = { pos: number; n: number; model: number; move: number };
  const byPos: PosRow[] = [0, 1, 2, 3, 4].map((k) => {
    const rate = (list: (r: (typeof run)[number]) => number[]) => {
      const withPick = run.filter((r) => list(r).length > k);
      const hits = withPick.filter((r) => r.placed.some((p) => p.horseNo === list(r)[k])).length;
      return { n: withPick.length, pct: withPick.length ? (hits / withPick.length) * 100 : NaN };
    };
    const m = rate((r) => r.modelList), v = rate((r) => r.moveList);
    return { pos: k + 1, n: m.n, model: m.pct, move: v.pct };
  });
  const overall = (list: (r: (typeof run)[number]) => number[]) => {
    const all = run.flatMap((r) => list(r).map((h) => r.placed.some((p) => p.horseNo === h)));
    return all.length ? (all.filter(Boolean).length / all.length) * 100 : NaN;
  };
  const posSeries: Series<PosRow>[] = [
    { name: t("summary.chart.model"), color: C.accent, get: (r) => r.model },
    { name: t("summary.chart.move"), color: C.accent2, get: (r) => r.move },
  ];
  const horse = (h: { code: string | null; name: string; nameZh: string | null }) => (lang === "zh-HK" && h.nameZh ? h.nameZh : name("horse", h.code, h.name));
  const of = (a: number, b: number) => (b ? `${a}/${b}` : "–");
  /** Net money with ROI (net ÷ stake) beside it in smaller type. */
  const netRoi = (net: number, stake: number) => (
    <>
      {money(net)}
      {stake > 0 && <span className="ml-2 inline-block font-sans text-sm font-semibold whitespace-nowrap tabular-nums" title={t("summary.kpi.roiT")}>{t("summary.kpi.roi", { v: signed((100 * net) / stake) })}</span>}
    </>
  );

  return (
    <section className="mt-4">
      {run.length > 0 ? (
        <div className={kpis}>
          <Kpi label={t("summary.kpi.winner")} value={of(winners, run.length)} sub={t("summary.kpi.winnerSub")} />
          <Kpi label={t("summary.kpi.top3")} value={of(top3, run.length * 3)} sub={t("summary.kpi.top3Sub")} />
          <Kpi label={t("summary.kpi.trio")} value={of(trioHits, run.length)} sub={t("summary.kpi.trioSub")} />
          <Kpi
            label={t("summary.kpi.net")}
            value={priced.length ? netRoi(ret - cost, cost) : "–"}
            sub={t("summary.kpi.netSub", { cost: money(cost), ret: money(ret) })}
            tone={priced.length ? cls(ret - cost) : ""}
          />
          <Kpi
            label={t("summary.kpi.place", { when })}
            value={pl.races ? netRoi(pl.ret - pl.cost, pl.cost) : "–"}
            sub={pl.races ? t("summary.kpi.placeSub", { hits: pl.hits, n: pl.picks, cost: money(pl.cost), ret: money(pl.ret) }) : t("summary.kpi.placeZero", { n: run.length })}
            tone={pl.races ? cls(pl.ret - pl.cost) : ""}
          />
          <Kpi label={t("summary.kpi.modelTop")} value={of(topPlaced, run.length)} sub={t("summary.kpi.modelTopSub")} />
          <Kpi
            label={t("summary.kpi.best")}
            value={best?.combined!.trioReturn ? money(best.combined.trioReturn) : "–"}
            sub={best?.combined!.trioReturn ? t("common:raceShort", { n: best.raceNo }) : t("summary.kpi.bestNone")}
            tone={best?.combined!.trioReturn ? "text-good" : ""}
          />
        </div>
      ) : (
        <div className={cx(panel, empty)}>{t("summary.noneRun")}</div>
      )}

      {run.length > 0 && (
        <div className={cx(panel, "mt-4")}>
          <h3 className={h3}>{t("summary.chart.title")}</h3>
          <Legend
            items={[
              [C.accent, t("summary.chart.modelOverall", { pct: pc(overall((r) => r.modelList)) })],
              [C.accent2, t("summary.chart.moveOverall", { pct: pc(overall((r) => r.moveList)) })],
            ]}
          />
          <GroupedBars
            rows={byPos}
            labelOf={(r) => t("summary.chart.pos", { n: r.pos })}
            series={posSeries}
            max={100}
            selected={sel}
            onSelect={(row, series) => setSel((cur) => (cur && cur.row === row && cur.series === series ? null : { row, series }))}
          />
          <AnimatePresence initial={false}>
            {sel && (
              <motion.div
                key={`${sel.row}-${sel.series}`}
                className="overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.24, ease: [0.2, 0, 0, 1] }}
              >
                <PositionBreakdown
                  pos={sel.row}
                  list={sel.series === 0 ? "model" : "move"}
                  label={posSeries[sel.series]!.name}
                  races={run}
                  horse={horse}
                  onOpenRace={onOpenRace}
                  onClose={() => setSel(null)}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <p className={note}>
            {t("summary.chart.note", { n: run.length, m: run.filter((r) => r.moveList.length > 0).length })} {t("summary.chart.clickHint")}
          </p>
        </div>
      )}

      {run.length > 0 && <PlaceByMinute run={run} />}

      <div className={cx(panel, scroll, "mt-4")}>
        <table className={cx(table, tablePad, "[&_td:nth-child(2)]:text-left [&_td:nth-child(3)]:text-left [&_th:nth-child(2)]:text-left [&_th:nth-child(3)]:text-left")}>
          <thead>
            <tr>
              <th>{t("summary.col.race")}</th>
              <th>{t("summary.col.result")}</th>
              <th>{t("summary.col.picks")}</th>
              <th>{t("summary.col.winner")}</th>
              <th>{t("summary.col.top3")}</th>
              <th>{t("summary.col.trio")}</th>
              <th>{t("summary.col.cost")}</th>
              <th>{t("summary.col.return")}</th>
              <th className="border-l border-edge text-left!" title={t("summary.col.placeT")}>{t("summary.col.place")}</th>
            </tr>
          </thead>
          <tbody>
            {s.races.map((r) => {
              const c = r.combined;
              const placedNos = new Set(r.placed.map((p) => p.horseNo));
              return (
                <tr key={r.raceId} className="cursor-pointer" onClick={() => onOpenRace(r.raceId)} title={t("summary.openRace")}>
                  <td className="font-semibold">{t("common:raceShort", { n: r.raceNo })}</td>
                  <td>
                    {r.placed.length ? (
                      <span className="inline-flex gap-1">
                        {r.placed.map((p) => (
                          <span key={`${p.finishPos}-${p.horseNo}`} title={horse(p)} className="inline-flex min-w-6 justify-center rounded-full bg-surface-2 px-1.5 text-xs font-semibold tabular-nums">
                            {p.horseNo}
                          </span>
                        ))}
                      </span>
                    ) : (
                      <span className={dim}>{t("summary.pending")}</span>
                    )}
                  </td>
                  <td>
                    <span className="inline-flex flex-wrap gap-1">
                      {r.picks.map((p) => (
                        <span
                          key={p.horseNo}
                          title={horse(p)}
                          className={cx(
                            "inline-flex min-w-6 items-center justify-center gap-px rounded-full px-1.5 text-xs font-semibold tabular-nums",
                            placedNos.has(p.horseNo) ? "bg-good text-white" : "bg-surface text-ink shadow-btn",
                            p.both && "ring-1 ring-accent",
                            p.marketOnly && "ring-1 ring-warn"
                          )}
                        >
                          {p.horseNo}
                          {p.both && <span className={cx("text-[9px]", placedNos.has(p.horseNo) ? "text-white" : "text-accent")}>★</span>}
                          {p.marketOnly && <span className={cx("text-[10px]", placedNos.has(p.horseNo) ? "text-white" : "text-warn")}>↑</span>}
                        </span>
                      ))}
                    </span>
                  </td>
                  <td className={c ? (c.winner ? "text-good" : "text-bad") : ""}>{c ? (c.winner ? "✓" : "✗") : "–"}</td>
                  <td className={c ? (c.top3 === 3 ? "text-good" : c.top3 === 0 ? "text-bad" : "") : ""}>{c ? `${c.top3}/3` : "–"}</td>
                  <td className={c ? (c.trio ? "text-good" : "text-bad") : ""}>{c ? (c.trio ? "✓" : "✗") : "–"}</td>
                  <td>{c ? money(c.trioCost) : "–"}</td>
                  <td className={c?.trioReturn != null ? (c.trioReturn > c.trioCost ? "text-good" : "text-bad") : dim}>{c?.trioReturn != null ? money(c.trioReturn) : "–"}</td>
                  <td className="border-l border-edge text-left">
                    <PlaceCell picks={r.place} cost={r.placeCost} ret={r.placeReturn} placed={placedNos} horse={horse} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className={note}>{pending ? t("summary.notePending", { n: pending }) : t("summary.note")}</p>
    </section>
  );
}

/** The races behind one bar: the horse at pick position `pos` of the chosen list, and where it finished. */
function PositionBreakdown({ pos, list, label, races, horse, onOpenRace, onClose }: {
  pos: number;
  list: "model" | "move";
  label: string;
  races: Summary["races"];
  horse: (h: { code: string | null; name: string; nameZh: string | null }) => string;
  onOpenRace: (raceId: string) => void;
  onClose: () => void;
}) {
  const { t } = useTranslation(["momentum", "common"]);
  const rows = races
    .map((r) => {
      const no = (list === "model" ? r.modelList : r.moveList)[pos];
      if (no == null) return null;
      const p = r.picks.find((x) => x.horseNo === no);
      const fin = r.finishPos[no] ?? null;
      return { race: r, no, name: p ? horse(p) : "", code: p?.code ?? null, fin, placed: fin != null && fin <= 3 };
    })
    .filter((x): x is NonNullable<typeof x> => x != null);
  const hits = rows.filter((r) => r.placed).length;
  return (
    <div className="mt-3 rounded-control bg-surface-2 p-3 sm:p-4">
      <div className="mb-2 flex items-center gap-2">
        <p className="text-sm font-semibold text-ink">
          {t("summary.chart.pos", { n: pos + 1 })} · {label}
          <span className="ml-2 font-normal text-ink-2">
            {t("summary.chart.breakdown", { hits, n: rows.length, pct: rows.length ? ((hits / rows.length) * 100).toFixed(1) : "0.0" })}
          </span>
        </p>
        <button type="button" onClick={onClose} aria-label={t("common:action.close")} className="ml-auto cursor-pointer rounded-full px-2 text-ink-3 hover:text-ink">
          ✕
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className={cx(table, "[&_td]:bg-transparent [&_th]:bg-transparent [&_td]:px-2 [&_td]:py-1.5 [&_th]:px-2 [&_th]:py-1.5 [&_td:nth-child(2)]:text-left [&_th:nth-child(2)]:text-left")}>
          <thead>
            <tr>
              <th>{t("summary.col.race")}</th>
              <th>{t("common:word.horse")}</th>
              <th>{t("summary.chart.finish")}</th>
              <th>{t("summary.chart.placed")}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.race.raceId} className="cursor-pointer" onClick={() => onOpenRace(r.race.raceId)} title={t("summary.openRace")}>
                <td className="font-semibold">{t("common:raceShort", { n: r.race.raceNo })}</td>
                <td>
                  <b className="tabular-nums">{r.no}</b> <HorseLink raceId={r.race.raceId} horseNo={r.no} code={r.code} name={r.name} className="text-ink-2" />
                </td>
                <td className="tabular-nums">{r.fin ?? "–"}</td>
                <td className={r.placed ? "text-good" : "text-bad"}>{r.placed ? "✓" : "✗"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

type PlacePick = Summary["races"][number]["place"][number];

/** Day totals for one Place view, over races with a result and posted Place dividends. */
function placeTotals(rows: { r: Summary["races"][number]; picks: PlacePick[]; cost: number; ret: number | null }[]) {
  const settled = rows.filter((x) => x.picks.length && x.ret != null);
  return {
    races: settled.length,
    picks: settled.reduce((a, x) => a + x.picks.length, 0),
    hits: settled.reduce((a, x) => a + x.picks.filter((p) => x.r.placed.some((y) => y.horseNo === p.horseNo)).length, 0),
    cost: settled.reduce((a, x) => a + x.cost, 0),
    ret: settled.reduce((a, x) => a + (x.ret ?? 0), 0),
  };
}

/** A race's Place picks (green = placed) and return / cost. */
function PlaceCell({ picks, cost, ret, placed, horse }: {
  picks: PlacePick[]; cost: number; ret: number | null; placed: Set<number>; horse: (h: PlacePick) => string;
}) {
  if (!picks.length) return <span className={dim}>–</span>;
  return (
    <span className="inline-flex flex-wrap items-center gap-1">
      {picks.map((p) => (
        <span
          key={p.horseNo}
          title={`${horse(p)} · ${signed(100 * p.change)}`}
          className={cx(
            "inline-flex min-w-6 items-center justify-center rounded-full px-1.5 text-xs font-semibold tabular-nums",
            placed.has(p.horseNo) ? "bg-good text-white" : "bg-surface text-ink shadow-btn"
          )}
        >
          {p.horseNo}
        </span>
      ))}
      <span className={cx("ml-1 text-xs whitespace-nowrap tabular-nums", ret == null ? dim : ret > cost ? "text-good" : "text-bad")}>
        {ret != null ? `${money(ret)} / ${money(cost)}` : money(cost)}
      </span>
    </span>
  );
}

/** Place rule judged at each minute from T−5 to T+5: how many picks, how many placed, and the money. */
function PlaceByMinute({ run }: { run: Summary["races"] }) {
  const { t } = useTranslation(["momentum", "common"]);
  const mins = run[0]?.placeByMinute.map((m) => m.min) ?? [];
  const rows = mins.map((min) => {
    const at = run.map((r) => ({ r, m: r.placeByMinute.find((x) => x.min === min)! }));
    const settled = at.filter(({ m }) => m.picks.length && m.return != null);
    const picks = settled.reduce((a, { m }) => a + m.picks.length, 0);
    const hits = settled.reduce((a, { r, m }) => a + m.picks.filter((h) => r.placed.some((p) => p.horseNo === h)).length, 0);
    const cost = settled.reduce((a, { m }) => a + m.cost, 0);
    const ret = settled.reduce((a, { m }) => a + (m.return ?? 0), 0);
    const detail = settled.map(({ r, m }) => `${t("common:raceShort", { n: r.raceNo })} #${m.picks.join(", #")}`).join(" · ");
    return { min, races: settled.length, picks, hits, cost, ret, detail };
  });
  const label = (min: number) => (min < 0 ? t("summary.byMin.before", { n: -min }) : t("summary.byMin.after", { n: min }));

  return (
    <div className={cx(panel, scroll, "mt-4")}>
      <h3 className={h3}>{t("summary.byMin.title")}</h3>
      <table className={cx(table, tablePad, "[&_td:first-child]:text-left [&_th:first-child]:text-left [&_td:last-child]:text-left [&_th:last-child]:text-left")}>
        <thead>
          <tr>
            <th>{t("summary.byMin.when")}</th>
            <th>{t("summary.byMin.races")}</th>
            <th>{t("summary.byMin.picks")}</th>
            <th>{t("summary.byMin.placed")}</th>
            <th>{t("summary.byMin.cost")}</th>
            <th>{t("summary.col.return")}</th>
            <th>{t("summary.byMin.net")}</th>
            <th>{t("summary.byMin.roi")}</th>
            <th>{t("summary.byMin.detail")}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((x) => (
            <tr key={x.min} className={cx(x.min === 1 && "[&_td]:border-t-2 [&_td]:border-t-ink/25", x.min > 0 && "[&_td]:text-ink-3")}>
              <td className="font-semibold whitespace-nowrap">{label(x.min)}</td>
              <td>{x.races ? `${x.races}/${run.length}` : <span className={dim}>0/{run.length}</span>}</td>
              <td>{x.picks || <span className={dim}>0</span>}</td>
              <td>{x.picks ? `${x.hits}/${x.picks} (${pc((100 * x.hits) / x.picks, 0)})` : "–"}</td>
              <td>{x.picks ? money(x.cost) : "–"}</td>
              <td>{x.picks ? money(x.ret) : "–"}</td>
              <td className={x.picks ? cls(x.ret - x.cost) : ""}>{x.picks ? money(x.ret - x.cost) : "–"}</td>
              <td className={x.picks ? cls(x.ret - x.cost) : ""}>{x.picks ? signed((100 * (x.ret - x.cost)) / x.cost) : "–"}</td>
              <td className="max-w-[320px] truncate text-xs" title={x.detail}>{x.detail || "–"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className={note}>{t("summary.byMin.note")}</p>
    </div>
  );
}
