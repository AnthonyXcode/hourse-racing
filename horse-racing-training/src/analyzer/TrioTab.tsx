import { useMemo, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useGlossary } from "../i18n/glossary";
import type { analyzer as EnAnalyzer } from "../i18n/locales/en/analyzer";
import {
  type AnalyzerRace, type HorseRow, type TrioStrat, MC, MKT, FIN, HNUM, UNIT,
  TRIO_STRATS, SBY, trioOutcome, trioStats, foundIn, isSettled, groupBy, diffBucket, DIFF_ORDER,
  doubleTrio, mean, median, rate,
} from "../../shared/analyzer/model";
import { C, GroupedBars, LineChart, type Series } from "./charts";
import { Bar, Kpi, Legend, SortTh, cls, money, pc, signed, useSort, vs } from "./format";
import { H2, code, control, cx, dim, empty, good, grid2, grid2Wide, h3, kpis, note, panel, row, scroll, strong, table, tablePad, tablePadTight, tag, tall, totalRow } from "../kit";

const ACCENT = C.accent, WARN = C.warn;
type Pair = { mc: number; mk: number };
const pair = (model: string, market: string): Series<Pair>[] => [
  { name: model, color: ACCENT, get: (r) => r.mc },
  { name: market, color: WARN, get: (r) => r.mk },
];
/** Strategy display name (the shared model keeps English names; translate by key). */
const stratKey = (k: string) => `trio.strat.${k}` as `trio.strat.${keyof typeof EnAnalyzer.trio.strat}`;
const statsBy = (races: AnalyzerRace[]) => ({
  mc: Object.fromEntries(TRIO_STRATS.map((s) => [s.key, trioStats(races, MC, s)])),
  mk: Object.fromEntries(TRIO_STRATS.map((s) => [s.key, trioStats(races, MKT, s)])),
});

export function TrioTab({ races }: { races: AnalyzerRace[] }) {
  const { t } = useTranslation(["analyzer", "common"]);
  const settled = useMemo(() => races.filter(isSettled), [races]);
  if (!settled.length) return <div className={cx(panel, empty)}>{t("filters.noSettled")}</div>;
  return <TrioBody settled={settled} />;
}

function TrioBody({ settled }: { settled: AnalyzerRace[] }) {
  const { t } = useTranslation(["analyzer", "common"]);
  const g = useGlossary();
  const PAIR = pair(t("trio.model"), t("trio.market"));
  const d = useMemo(() => {
    const { mc, mk } = statsBy(settled);
    const priced = settled.filter((r) => r.h.some((h) => h[MKT] > 0));
    const byKey = <K extends string | number>(keyOf: (r: AnalyzerRace) => K, sorter?: (a: K, b: K) => number) => groupBy(settled, keyOf, sorter);
    return {
      mc, mk,
      paid: settled.filter((r) => r.td > 0).map((r) => r.td),
      best: TRIO_STRATS.filter((s) => Number.isFinite(mc[s.key]!.roi)).sort((a, b) => mc[b.key]!.roi - mc[a.key]!.roi)[0],
      foundMc: mean(settled.map((r) => foundIn(r, MC))),
      foundMk: mean(priced.map((r) => foundIn(r, MKT))),
      cover: [3, 4, 5, 6, 7, 8].map((L) => {
        const a = trioStats(settled, MC, { B: 0, L }), b = trioStats(settled, MKT, { B: 0, L });
        return { rank: L, n: a.races, mc: a.hit, mk: b.hit };
      }),
      found: [0, 1, 2, 3].map((k) => ({
        rank: k,
        n: settled.length,
        mc: rate(settled.filter((r) => foundIn(r, MC) === k).length, settled.length),
        mk: rate(priced.filter((r) => foundIn(r, MKT) === k).length, priced.length),
      })),
      monthly: byKey((r) => r.d.slice(0, 7)).map(({ key, rs }) => ({ key, races: rs.length, mc: trioStats(rs, MC, SBY.b4!).hit, mk: trioStats(rs, MKT, SBY.b4!).hit })),
      venue: byKey((r) => r.v),
      diff: byKey(diffBucket, (a, b) => DIFF_ORDER.indexOf(a) - DIFF_ORDER.indexOf(b)),
      cls: byKey((r) => r.c),
      field: byKey((r) => r.n, (a, b) => a - b),
    };
  }, [settled]);
  const { mc, mk, best } = d;

  return (
    <>
      <div className={kpis}>
        <Kpi label={t("trio.kpi.top3")} value={pc(mc.b3!.hit)} sub={t("trio.kpi.top3Sub", { m: pc(mk.b3!.hit) })} tone={vs(mc.b3!.hit, mk.b3!.hit)} />
        <Kpi label={t("trio.kpi.box4")} value={pc(mc.b4!.hit)} sub={t("trio.kpi.box4Sub", { m: pc(mk.b4!.hit) })} tone={vs(mc.b4!.hit, mk.b4!.hit)} />
        <Kpi label={t("trio.kpi.box5")} value={pc(mc.b5!.hit)} sub={t("trio.kpi.box5Sub", { m: pc(mk.b5!.hit) })} tone={vs(mc.b5!.hit, mk.b5!.hit)} />
        <Kpi label={t("trio.kpi.box5Roi")} value={signed(mc.b5!.roi)} sub={t("trio.kpi.box5RoiSub", { stake: money(mc.b5!.stake), m: signed(mk.b5!.roi) })} tone={cls(mc.b5!.roi)} />
        <Kpi label={t("trio.kpi.bankRoi")} value={signed(mc.k16!.roi)} sub={t("trio.kpi.bankRoiSub", { hit: pc(mc.k16!.hit), m: signed(mk.k16!.roi) })} tone={cls(mc.k16!.roi)} />
        <Kpi label={t("trio.kpi.found")} value={`${d.foundMc.toFixed(2)} / 3`} sub={t("trio.kpi.foundSub", { m: d.foundMk.toFixed(2) })} tone={vs(d.foundMc, d.foundMk)} />
        <Kpi label={t("trio.kpi.best")} value={best ? signed(mc[best.key]!.roi) : "–"} sub={best ? t(stratKey(best.key)) : t("trio.kpi.bestNone")} tone={best ? cls(mc[best.key]!.roi) : ""} />
        <Kpi label={t("trio.kpi.div")} value={money(median(d.paid))} sub={t("trio.kpi.divSub", { mean: money(mean(d.paid)), n: d.paid.length })} />
      </div>

      <H2 sub={t("trio.strategiesSub")}>{t("trio.strategies")}</H2>
      <div className={panel}>
        <div className={scroll}>
          <table className={cx(table, tablePad)}>
            <thead>
              <tr>
                {[t("col.strategy"), t("col.combos"), t("col.modelHit"), t("col.modelRoi"), t("col.modelAvgDiv"), t("col.marketHit"), t("col.marketRoi"), t("col.modelMinusMarket")].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TRIO_STRATS.map((s) => {
                const a = mc[s.key]!, b = mk[s.key]!, diff = a.hit - b.hit;
                return (
                  <tr key={s.key}>
                    <td>{t(stratKey(s.key))}</td>
                    <td>{a.combos.toFixed(1)}</td>
                    <td>
                      {pc(a.hit)} <Bar v={a.hit} />
                    </td>
                    <td className={cls(a.roi)}>{signed(a.roi)}</td>
                    <td>{money(a.avgDiv)}</td>
                    <td>{pc(b.hit)}</td>
                    <td className={cls(b.roi)}>{signed(b.roi)}</td>
                    <td className={cls(diff)}>{Number.isFinite(diff) ? t("pts", { v: (diff >= 0 ? "+" : "") + diff.toFixed(1) }) : "–"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className={note}>
          <Trans t={t} i18nKey="trio.strategiesNote" components={{ code: <code className={code} /> }} />
        </div>
      </div>

      <H2 sub={t("trio.coverageSub")}>{t("trio.coverage")}</H2>
      <div className={grid2}>
        <div className={panel}>
          <Legend items={[[ACCENT, t("trio.model")], [WARN, t("trio.market")]]} />
          <GroupedBars rows={d.cover} labelOf={(r) => r.rank} series={PAIR} max={100} />
          <div className={note}>{t("trio.coverBoxNote")}</div>
        </div>
        <div className={panel}>
          <Legend items={[[ACCENT, t("trio.model")], [WARN, t("trio.market")]]} />
          <GroupedBars rows={d.found} labelOf={(r) => r.rank} series={PAIR} max={100} />
          <div className={note}>{t("trio.coverFoundNote")}</div>
        </div>
      </div>

      <H2 sub={t("trio.monthlySub")}>{t("trio.monthly")}</H2>
      <div className={panel}>
        <Legend items={[[ACCENT, t("trio.modelBox4")], [WARN, t("trio.marketBox4")]]} />
        <LineChart rows={d.monthly} series={PAIR} max={100} />
      </div>

      <H2>{t("breakdowns")}</H2>
      <div className={grid2Wide}>
        <Breakdown title={t("byVenue")} head={t("common:word.venue")} groups={d.venue} label={g.venue} />
        <Breakdown title={t("byDiff")} head={t("col.avgDiff")} groups={d.diff} />
        <Breakdown title={t("byClass")} head={t("common:word.class")} groups={d.cls} label={g.raceClass} />
        <Breakdown title={t("byField")} head={t("col.runners")} groups={d.field} />
      </div>

      <H2 sub={t("trio.raceByRaceSub")}>{t("trio.raceByRace")}</H2>
      <RaceTable settled={settled} />

      <H2 sub={t("trio.monthByMonthSub")}>{t("trio.monthByMonth")}</H2>
      <MonthlyTable settled={settled} />
    </>
  );
}

function Breakdown({ title, head, groups, label = String }: { title: string; head: string; groups: { key: string | number; rs: AnalyzerRace[] }[]; label?: (k: string) => string }) {
  const { t } = useTranslation(["analyzer", "common"]);
  return (
    <div className={panel}>
      <h3 className={h3}>{title}</h3>
      <div className={scroll}>
        <table className={cx(table, tablePadTight)}>
          <thead>
            <tr>
              {[head, t("col.races"), t("col.top3"), t("col.box4"), t("col.box5"), t("col.mktBox4"), t("col.box5Roi"), t("col.bankRoi")].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {groups.map(({ key, rs }) => {
              const b3 = trioStats(rs, MC, SBY.b3!), b4 = trioStats(rs, MC, SBY.b4!), b5 = trioStats(rs, MC, SBY.b5!);
              const m4 = trioStats(rs, MKT, SBY.b4!), k = trioStats(rs, MC, SBY.k16!);
              return (
                <tr key={key}>
                  <td>{label(String(key))}</td>
                  <td>{rs.length}</td>
                  <td>{pc(b3.hit)}</td>
                  <td>
                    {pc(b4.hit)} <Bar v={b4.hit} narrow />
                  </td>
                  <td>{pc(b5.hit)}</td>
                  <td>{pc(m4.hit)}</td>
                  <td className={cls(b5.roi)}>{signed(b5.roi)}</td>
                  <td className={cls(k.roi)}>{signed(k.roi)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MonthlyTable({ settled }: { settled: AnalyzerRace[] }) {
  const { t } = useTranslation(["analyzer", "common"]);
  const rows = useMemo(() => {
    const row = (key: string, rs: AnalyzerRace[]) => {
      const b4 = SBY.b4!;
      return {
        key,
        races: rs.length,
        b3: trioStats(rs, MC, SBY.b3!),
        b4: trioStats(rs, MC, b4),
        b5: trioStats(rs, MC, SBY.b5!),
        m4: trioStats(rs, MKT, b4),
        k16: trioStats(rs, MC, SBY.k16!),
        found: mean(rs.map((r) => foundIn(r, MC))),
        dt: doubleTrio(rs.map((r) => {
          const o = trioOutcome(r, MC, b4);
          return { date: r.d, venue: r.v, dd: r.dd, ddl: r.ddl, combos: o.n, hit: o.hit ? 1 : 0 };
        })),
        paid: median(rs.filter((r) => r.td > 0).map((r) => r.td)),
      };
    };
    return {
      months: groupBy(settled, (r) => r.d.slice(0, 7)).reverse().map(({ key, rs }) => row(key, rs)),
      total: row("All", settled),
    };
  }, [settled]);
  const tr = (m: (typeof rows)["total"], className?: string) => (
    <tr key={m.key} className={className}>
      <td>{m.key === "All" ? t("common:word.all") : m.key}</td>
      <td>{m.races}</td>
      <td>{pc(m.b3.hit)}</td>
      <td>
        {pc(m.b4.hit)} <Bar v={m.b4.hit} />
      </td>
      <td>{pc(m.b5.hit)}</td>
      <td>{pc(m.m4.hit)}</td>
      <td>{Number.isFinite(m.found) ? m.found.toFixed(2) : "–"}</td>
      <td className={cls(m.b4.roi)}>{signed(m.b4.roi)}</td>
      <td className={cls(m.b5.roi)}>{signed(m.b5.roi)}</td>
      <td className={cls(m.k16.roi)}>{signed(m.k16.roi)}</td>
      <td>
        {m.dt.hits}/{m.dt.pools} <span className={cls(m.dt.roi)}>{signed(m.dt.roi)}</span>
      </td>
      <td>{money(m.paid)}</td>
    </tr>
  );
  return (
    <div className={panel}>
      <div className={scroll}>
        <table className={cx(table, tablePad)}>
          <thead>
            <tr>
              {[t("common:word.month"), t("col.races"), t("col.top3"), t("col.box4"), t("col.box5"), t("col.mktBox4"), t("col.found"), t("col.box4Roi"), t("col.box5Roi"), t("col.bankRoi"), t("col.dtBox4"), t("col.medDiv")].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>{rows.months.map((m) => tr(m))}</tbody>
          <tfoot>{tr(rows.total, totalRow)}</tfoot>
        </table>
      </div>
      <div className={note}>
        <Trans t={t} i18nKey="trio.monthlyNote" components={{ code: <code className={code} /> }} />
      </div>
    </div>
  );
}

type RowKey = "date" | "venue" | "race" | "gap" | "close8" | "sparse" | "avgDiff" | "picks" | "result" | "found" | "combos" | "bankHit" | "hit" | "td" | "dd";

const isPlaced = (h: HorseRow) => h[FIN] > 0 && h[FIN] <= 3;
const Pick = ({ h }: { h: HorseRow }) => (isPlaced(h) ? <b className={good}>{h[HNUM]}</b> : <>{h[HNUM]}</>);
const Tick = ({ v }: { v: boolean }) => (v ? <span className={cx(good, strong)}>✓</span> : <span className={dim}>–</span>);
const joinDots = (hs: HorseRow[]) => hs.map((h, i) => (
  <span key={h[HNUM]}>
    {i > 0 && " · "}
    <Pick h={h} />
  </span>
));

function RaceTable({ settled }: { settled: AnalyzerRace[] }) {
  const { t } = useTranslation(["analyzer", "common"]);
  const g = useGlossary();
  const [q, setQ] = useState("");
  const [sk, setSk] = useState("b4");
  const sort = useSort<RowKey>("date");
  const st: TrioStrat = SBY[sk]!;

  const rows = useMemo(
    () =>
      settled.map((r) => {
        const byMc = r.h.filter((h) => h[MC] > 0).sort((a, b) => a[MC] - b[MC]);
        const p = byMc.filter((h) => h[MC] <= st.L), bank = p.filter((h) => h[MC] <= st.B), legs = p.filter((h) => h[MC] > st.B);
        const out = trioOutcome(r, MC, st);
        return {
          id: `${r.d}_${r.v}_${r.r}`,
          date: r.d, venue: r.v, race: r.r, cls: r.c, gap: r.gp, close8: r.c8, sparse: r.sp, avgDiff: r.ad,
          bank, legs,
          picks: p.map((h) => h[HNUM]).join("-"),
          result: r.h.filter(isPlaced).sort((a, b) => a[FIN] - b[FIN]).map((h) => h[HNUM]).join("-"),
          found: foundIn(r, MC),
          combos: out.n,
          hit: out.hit ? 1 : 0,
          bankHit: bank.length ? (bank.every(isPlaced) ? 1 : 0) : -1,
          td: r.td, dd: r.dd, ddl: r.ddl,
        };
      }),
    [settled, st]
  );

  const needle = q.trim().toLowerCase();
  const list = sort.sort(
    rows.filter((r) => !needle || `${r.date} ${r.venue} ${g.venue(r.venue)} r${r.race} ${r.cls} ${g.raceClass(r.cls)} ${r.picks} ${r.result}`.toLowerCase().includes(needle))
  );
  const hits = list.filter((r) => r.hit).length, bankHits = list.filter((r) => r.bankHit === 1).length;
  const paid = list.filter((r) => r.td > 0);
  const stake = paid.reduce((t, r) => t + r.combos * UNIT, 0), ret = paid.reduce((t, r) => t + (r.hit ? r.td : 0), 0);
  const roi = stake ? ((ret - stake) / stake) * 100 : NaN;
  const dt = doubleTrio(list);
  const th = (k: RowKey, label: string) => <SortTh key={k} k={k} sort={sort}>{label}</SortTh>;

  return (
    <div className={panel}>
      <div className={row}>
        <input type="search" className={cx(control, "w-full flex-1 sm:w-auto sm:min-w-[260px]")} value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("trio.search")} />
        <select className={cx(control, "w-full sm:w-auto")} value={sk} onChange={(e) => setSk(e.target.value)} aria-label={t("col.strategy")}>
          {TRIO_STRATS.map((s) => (
            <option key={s.key} value={s.key}>
              {t(stratKey(s.key))}
            </option>
          ))}
        </select>
        <span className={cx(tag, "whitespace-normal")}>
          {t("common:races", { count: list.length })} · {t("trio.hits", { count: hits })} ({pc(rate(hits, list.length))})
          {st.B ? ` · ${t("trio.bankerHitSummary", { n: bankHits, p: pc(rate(bankHits, list.length)) })}` : ""} · {t("trio.roi")} <b className={cls(roi)}>{signed(roi)}</b> · {t("col.doubleTrio")} {dt.hits}/
          {dt.pools} ({pc(rate(dt.hits, dt.pools))}) {t("trio.roi")} <b className={cls(dt.roi)}>{signed(dt.roi)}</b>
        </span>
      </div>
      <div className={cx(scroll, tall)}>
        <table className={cx(table, tablePad)}>
          <thead>
            <tr>
              {th("date", t("common:word.date"))}{th("venue", t("common:word.venue"))}{th("race", t("col.race"))}{th("gap", t("col.topGap"))}{th("close8", t("col.close8"))}{th("sparse", t("col.sparse"))}{th("avgDiff", t("col.avgDiff"))}
              {th("picks", t("col.picks"))}{th("result", t("common:word.result"))}{th("found", t("col.found"))}{th("combos", t("col.combos"))}{th("bankHit", t("col.bankerHit"))}{th("hit", t("col.hit"))}{th("td", t("common:word.dividend"))}{th("dd", t("col.doubleTrio"))}
            </tr>
          </thead>
          <tbody>
            {list.map((r) => (
              <tr key={r.id}>
                <td>{r.date}</td>
                <td>{g.venue(r.venue)}</td>
                <td>{t("common:raceShort", { n: r.race })}</td>
                <td>{r.gap >= 999 ? "–" : r.gap}</td>
                <td>{r.close8}</td>
                <td>{r.sparse}</td>
                <td>{r.avgDiff}</td>
                <td>
                  {r.bank.length > 0 && (
                    <>
                      {joinDots(r.bank)} <span className={dim}>/</span>{" "}
                    </>
                  )}
                  {joinDots(r.legs)}
                </td>
                <td>{r.result.replaceAll("-", " · ")}</td>
                <td>{r.found}/3</td>
                <td>{r.combos}</td>
                <td>{r.bankHit < 0 ? <span className={dim}>{t("na")}</span> : <Tick v={r.bankHit === 1} />}</td>
                <td>
                  <Tick v={r.hit === 1} />
                </td>
                <td>{r.td > 0 ? money(r.td) : "–"}</td>
                <td>
                  {r.dd > 0 ? (
                    <>
                      {money(r.dd)} <span className={dim}>{r.ddl.map((n) => t("common:raceShort", { n })).join("+")}</span>
                    </>
                  ) : (
                    "–"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={note}>
        <Trans t={t} i18nKey="trio.raceNote" components={{ code: <code className={code} />, b: <b className={good} /> }} />
      </div>
    </div>
  );
}
