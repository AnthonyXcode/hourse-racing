import { useMemo, useState } from "react";
import {
  type AnalyzerRace, type HorseRow, type TrioStrat, MC, MKT, FIN, HNUM, UNIT,
  TRIO_STRATS, SBY, trioOutcome, trioStats, foundIn, isSettled, groupBy, diffBucket, DIFF_ORDER,
  doubleTrio, mean, median, rate,
} from "../../shared/analyzer/model";
import { C, GroupedBars, LineChart, type Series } from "./charts";
import { Bar, Kpi, Legend, SortTh, cls, money, pc, signed, useSort, vs } from "./format";
import { H2, code, control, cx, dim, empty, good, grid2, grid2Wide, h3, kpis, note, panel, row, scroll, strong, table, tablePad, tablePadTight, tag, tall, totalRow } from "../kit";

const ACCENT = C.accent, WARN = C.warn;
const PAIR: Series<{ mc: number; mk: number }>[] = [
  { name: "model", color: ACCENT, get: (r) => r.mc },
  { name: "market", color: WARN, get: (r) => r.mk },
];
const statsBy = (races: AnalyzerRace[]) => ({
  mc: Object.fromEntries(TRIO_STRATS.map((s) => [s.key, trioStats(races, MC, s)])),
  mk: Object.fromEntries(TRIO_STRATS.map((s) => [s.key, trioStats(races, MKT, s)])),
});

export function TrioTab({ races }: { races: AnalyzerRace[] }) {
  const settled = useMemo(() => races.filter(isSettled), [races]);
  if (!settled.length) return <div className={cx(panel, empty)}>No settled races match these filters.</div>;
  return <TrioBody settled={settled} />;
}

function TrioBody({ settled }: { settled: AnalyzerRace[] }) {
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
        <Kpi label="Top 3 = trio" value={pc(mc.b3!.hit)} sub={`1 combo · market ${pc(mk.b3!.hit)}`} tone={vs(mc.b3!.hit, mk.b3!.hit)} />
        <Kpi label="Box 4 hits" value={pc(mc.b4!.hit)} sub={`4 combos · market ${pc(mk.b4!.hit)}`} tone={vs(mc.b4!.hit, mk.b4!.hit)} />
        <Kpi label="Box 5 hits" value={pc(mc.b5!.hit)} sub={`10 combos · market ${pc(mk.b5!.hit)}`} tone={vs(mc.b5!.hit, mk.b5!.hit)} />
        <Kpi label="Box 5 ROI" value={signed(mc.b5!.roi)} sub={`${money(mc.b5!.stake)} staked · market ${signed(mk.b5!.roi)}`} tone={cls(mc.b5!.roi)} />
        <Kpi label="Banker #1 + 2–6 ROI" value={signed(mc.k16!.roi)} sub={`hit ${pc(mc.k16!.hit)} · market ${signed(mk.k16!.roi)}`} tone={cls(mc.k16!.roi)} />
        <Kpi label="Placegetters found" value={`${d.foundMc.toFixed(2)} / 3`} sub={`in model top 3 · market ${d.foundMk.toFixed(2)}`} tone={vs(d.foundMc, d.foundMk)} />
        <Kpi label="Best model strategy" value={best ? signed(mc[best.key]!.roi) : "–"} sub={best ? best.name : "no priced races"} tone={best ? cls(mc[best.key]!.roi) : ""} />
        <Kpi label="Trio dividend" value={money(median(d.paid))} sub={`median per $10 · mean ${money(mean(d.paid))} · ${d.paid.length} paid`} />
      </div>

      <H2 sub="— $10 per combination, model rank vs market rank">Strategies</H2>
      <div className={panel}>
        <div className={scroll}>
          <table className={cx(table, tablePad)}>
            <thead>
              <tr>
                {["Strategy", "Combos", "Model hit %", "Model ROI", "Model avg div", "Market hit %", "Market ROI", "Model − market"].map((t) => (
                  <th key={t}>{t}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TRIO_STRATS.map((s) => {
                const a = mc[s.key]!, b = mk[s.key]!, diff = a.hit - b.hit;
                return (
                  <tr key={s.key}>
                    <td>{s.name}</td>
                    <td>{a.combos.toFixed(1)}</td>
                    <td>
                      {pc(a.hit)} <Bar v={a.hit} />
                    </td>
                    <td className={cls(a.roi)}>{signed(a.roi)}</td>
                    <td>{money(a.avgDiv)}</td>
                    <td>{pc(b.hit)}</td>
                    <td className={cls(b.roi)}>{signed(b.roi)}</td>
                    <td className={cls(diff)}>{Number.isFinite(diff) ? (diff >= 0 ? "+" : "") + diff.toFixed(1) + " pts" : "–"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className={note}>
          Box top N = every 3-horse combination from the top N. Banker = the banked horse(s) must place, the rest come from the legs. Hit % counts every race with a result; ROI only races
          with a recorded Trio dividend. <code className={code}>Model</code> ranks by Monte Carlo win probability, <code className={code}>Market</code> by win odds.
        </div>
      </div>

      <H2 sub="— how often the actual top 3 land inside the picks">Coverage</H2>
      <div className={grid2}>
        <div className={panel}>
          <Legend items={[[ACCENT, "model"], [WARN, "market"]]} />
          <GroupedBars rows={d.cover} labelOf={(r) => r.rank} series={PAIR} max={100} />
          <div className={note}>Box-N hit rate: all three placegetters inside the top N (x-axis = N).</div>
        </div>
        <div className={panel}>
          <Legend items={[[ACCENT, "model"], [WARN, "market"]]} />
          <GroupedBars rows={d.found} labelOf={(r) => r.rank} series={PAIR} max={100} />
          <div className={note}>Share of races by how many of the actual top 3 are among the top-3 picks (x-axis = placegetters found).</div>
        </div>
      </div>

      <H2 sub="— box top 4 hit rate, model vs market">Monthly trend</H2>
      <div className={panel}>
        <Legend items={[[ACCENT, "model box 4 hit %"], [WARN, "market box 4 hit %"]]} />
        <LineChart rows={d.monthly} series={PAIR} max={100} />
      </div>

      <H2>Breakdowns</H2>
      <div className={grid2Wide}>
        <Breakdown title="By venue" head="Venue" groups={d.venue} />
        <Breakdown title="By field spread (avgDiff)" head="avgDiff" groups={d.diff} />
        <Breakdown title="By class" head="Class" groups={d.cls} />
        <Breakdown title="By field size" head="Runners" groups={d.field} />
      </div>

      <H2 sub="— the chosen strategy's picks against the result">Race by race</H2>
      <RaceTable settled={settled} />

      <H2 sub="— model ranks, $10 per combination">Month by month</H2>
      <MonthlyTable settled={settled} />
    </>
  );
}

function Breakdown({ title, head, groups }: { title: string; head: string; groups: { key: string | number; rs: AnalyzerRace[] }[] }) {
  return (
    <div className={panel}>
      <h3 className={h3}>{title}</h3>
      <div className={scroll}>
        <table className={cx(table, tablePadTight)}>
          <thead>
            <tr>
              {[head, "Races", "Top 3", "Box 4", "Box 5", "Mkt box 4", "Box 5 ROI", "Bank ROI"].map((t) => (
                <th key={t}>{t}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {groups.map(({ key, rs }) => {
              const b3 = trioStats(rs, MC, SBY.b3!), b4 = trioStats(rs, MC, SBY.b4!), b5 = trioStats(rs, MC, SBY.b5!);
              const m4 = trioStats(rs, MKT, SBY.b4!), k = trioStats(rs, MC, SBY.k16!);
              return (
                <tr key={key}>
                  <td>{key}</td>
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
      <td>{m.key}</td>
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
              {["Month", "Races", "Top 3", "Box 4", "Box 5", "Mkt box 4", "Found", "Box 4 ROI", "Box 5 ROI", "Bank ROI", "DT box 4", "Med. div"].map((t) => (
                <th key={t}>{t}</th>
              ))}
            </tr>
          </thead>
          <tbody>{rows.months.map((m) => tr(m))}</tbody>
          <tfoot>{tr(rows.total, totalRow)}</tfoot>
        </table>
      </div>
      <div className={note}>
        Newest month first. Hit rates use model ranks except <code className={code}>Mkt box 4</code>. <code className={code}>Found</code> = mean placegetters in the model's top 3. <code className={code}>Bank ROI</code> = Banker #1 + 2–6.
        <code className={code}>DT box 4</code> = Double Trio playing box 4 in both legs: pools hit / pools with both legs in that month, then ROI. <code className={code}>Med. div</code> = median Trio dividend per $10.
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
  const list = sort.sort(rows.filter((r) => !needle || `${r.date} ${r.venue} r${r.race} ${r.cls} ${r.picks} ${r.result}`.toLowerCase().includes(needle)));
  const hits = list.filter((r) => r.hit).length, bankHits = list.filter((r) => r.bankHit === 1).length;
  const paid = list.filter((r) => r.td > 0);
  const stake = paid.reduce((t, r) => t + r.combos * UNIT, 0), ret = paid.reduce((t, r) => t + (r.hit ? r.td : 0), 0);
  const roi = stake ? ((ret - stake) / stake) * 100 : NaN;
  const dt = doubleTrio(list);
  const th = (k: RowKey, label: string) => <SortTh key={k} k={k} sort={sort}>{label}</SortTh>;

  return (
    <div className={panel}>
      <div className={row}>
        <input type="search" className={control} value={q} onChange={(e) => setQ(e.target.value)} placeholder="search date, venue, class, horse no…" />
        <select className={control} value={sk} onChange={(e) => setSk(e.target.value)} aria-label="Strategy">
          {TRIO_STRATS.map((s) => (
            <option key={s.key} value={s.key}>
              {s.name}
            </option>
          ))}
        </select>
        <span className={tag}>
          {list.length} race{list.length === 1 ? "" : "s"} · {hits} hit{hits === 1 ? "" : "s"} ({pc(rate(hits, list.length))})
          {st.B ? ` · banker hit ${bankHits} (${pc(rate(bankHits, list.length))})` : ""} · ROI <b className={cls(roi)}>{signed(roi)}</b> · Double Trio {dt.hits}/{dt.pools} (
          {pc(rate(dt.hits, dt.pools))}) ROI <b className={cls(dt.roi)}>{signed(dt.roi)}</b>
        </span>
      </div>
      <div className={cx(scroll, tall)}>
        <table className={cx(table, tablePad)}>
          <thead>
            <tr>
              {th("date", "Date")}{th("venue", "Venue")}{th("race", "Race")}{th("gap", "Top-2 gap")}{th("close8", "Close < 8")}{th("sparse", "Sparse")}{th("avgDiff", "avgDiff")}
              {th("picks", "Picks")}{th("result", "Result")}{th("found", "Found")}{th("combos", "Combos")}{th("bankHit", "Banker hit")}{th("hit", "Hit")}{th("td", "Dividend")}{th("dd", "Double Trio")}
            </tr>
          </thead>
          <tbody>
            {list.map((r) => (
              <tr key={r.id}>
                <td>{r.date}</td>
                <td>{r.venue}</td>
                <td>R{r.race}</td>
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
                <td>{r.bankHit < 0 ? <span className={dim}>n/a</span> : <Tick v={r.bankHit === 1} />}</td>
                <td>
                  <Tick v={r.hit === 1} />
                </td>
                <td>{r.td > 0 ? money(r.td) : "–"}</td>
                <td>
                  {r.dd > 0 ? (
                    <>
                      {money(r.dd)} <span className={dim}>R{r.ddl.join("+R")}</span>
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
        Click a column to sort. <code className={code}>Picks</code> are the horses the chosen strategy covers, in model rank order; bankers sit before the <code className={code}>/</code>. <b className={good}>Bold green</b> picks
        finished in the top 3. <code className={code}>Found</code> = placegetters among the model's top 3. <code className={code}>Combos</code>, <code className={code}>Banker hit</code> and <code className={code}>Hit</code> are for the strategy picked in the
        selector, using model ranks; <code className={code}>Banker hit</code> means every banker finished in the top 3 (n/a for box strategies). ROI in the summary counts only races with a recorded dividend.
        Double Trio plays the same strategy in both legs (leg 1 combos × leg 2 combos tickets at $10) and counts a pool only when both leg races are in the list. <code className={code}>Dividend</code> is the
        Trio payout per $10; <code className={code}>Double Trio</code> is the Double Trio payout per $10 for the pool this race is a leg of, with its leg races.
      </div>
    </div>
  );
}
