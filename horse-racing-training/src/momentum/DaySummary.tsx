// Momentum → Summary: review of a racing day — how each race's Combined picks did, with day totals.
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { api } from "../api";
import type { DaySummary as Summary } from "../../shared/momentum/model";
import { C, GroupedBars, type Series } from "../analyzer/charts";
import { Kpi, Legend, cls, money, pc } from "../analyzer/format";
import { useNames } from "../i18n/names";
import { useLanguage } from "../i18n/useLanguage";
import { cx, dim, empty, errorBox, h3, kpis, note, panel, scroll, table, tablePad } from "../kit";

const REFRESH_MS = 60_000;

export function DaySummary({ date, live, onOpenRace }: { date: string; live: boolean; onOpenRace: (raceId: string) => void }) {
  const { t } = useTranslation(["momentum", "common"]);
  const { lang } = useLanguage();
  const name = useNames();
  const [data, setData] = useState<{ date: string; s: Summary | null; error?: string } | null>(null);

  useEffect(() => {
    let on = true;
    const load = () =>
      api
        .momentumSummary(date)
        .then((s) => on && setData({ date, s }))
        .catch((e) => on && setData({ date, s: null, error: String(e instanceof Error ? e.message : e) }));
    load();
    const timer = live ? setInterval(load, REFRESH_MS) : undefined; // today: results come in during the day
    return () => {
      on = false;
      clearInterval(timer);
    };
  }, [date, live]);

  const s = data?.date === date ? data.s : null;
  if (!data || data.date !== date) return <div className={cx(panel, empty, "mt-4")}>{t("summary.loading")}</div>;
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

  return (
    <section className="mt-4">
      {run.length > 0 ? (
        <div className={kpis}>
          <Kpi label={t("summary.kpi.winner")} value={of(winners, run.length)} sub={t("summary.kpi.winnerSub")} />
          <Kpi label={t("summary.kpi.top3")} value={of(top3, run.length * 3)} sub={t("summary.kpi.top3Sub")} />
          <Kpi label={t("summary.kpi.trio")} value={of(trioHits, run.length)} sub={t("summary.kpi.trioSub")} />
          <Kpi
            label={t("summary.kpi.net")}
            value={priced.length ? money(ret - cost) : "–"}
            sub={t("summary.kpi.netSub", { cost: money(cost), ret: money(ret) })}
            tone={priced.length ? cls(ret - cost) : ""}
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
          <GroupedBars rows={byPos} labelOf={(r) => t("summary.chart.pos", { n: r.pos })} series={posSeries} max={100} />
          <p className={note}>{t("summary.chart.note", { n: run.length, m: run.filter((r) => r.moveList.length > 0).length })}</p>
        </div>
      )}

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
