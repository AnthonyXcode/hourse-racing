import { useMemo, useState } from "react";
import {
  type AnalyzerRace, MC, MKT, PWIN, PPLACE, WON, PLACED, WODDS, FIN, TRIP,
  metrics, byRank, calibration, groupBy, topOf, diffBucket, DIFF_ORDER,
} from "../../shared/analyzer/model";
import { CalibChart, GroupedBars, LineChart, type Series } from "./charts";
import { Bar, Kpi, Legend, SortTh, cls, pc, signed, useSort, vs } from "./format";

const ACCENT = "var(--accent)", ACCENT2 = "var(--accent2)", WARN = "var(--warn)";

type RowKey = "date" | "venue" | "race" | "cls" | "dist" | "runners" | "avgDiff" | "close8" | "sparse" | "gap" | "horse" | "trip" | "predWin" | "predPlace" | "mkt" | "odds" | "finish" | "jockey";

export function WinPlaceTab({ races }: { races: AnalyzerRace[] }) {
  const M = useMemo(() => metrics(races), [races]);
  const charts = useMemo(() => {
    const withMetrics = <K extends string | number>(g: { key: K; rs: AnalyzerRace[] }[]) => g.map(({ key, rs }) => ({ key, ...metrics(rs) }));
    return {
      calibWin: calibration(races, PWIN, WON),
      calibPlace: calibration(races, PPLACE, PLACED),
      mcRank: byRank(races, MC),
      mktRank: byRank(races, MKT),
      monthly: withMetrics(groupBy(races, (r) => r.d.slice(0, 7))),
      venue: withMetrics(groupBy(races, (r) => r.v)),
      diff: withMetrics(groupBy(races, diffBucket, (a, b) => DIFF_ORDER.indexOf(a) - DIFF_ORDER.indexOf(b))),
      cls: withMetrics(groupBy(races, (r) => r.c)),
      field: withMetrics(groupBy(races, (r) => r.n, (a, b) => a - b)),
    };
  }, [races]);

  const rankBars: Series<{ win: number; place: number }>[] = [
    { name: "win", color: ACCENT, get: (r) => r.win },
    { name: "place", color: ACCENT2, get: (r) => r.place },
  ];

  return (
    <>
      <div className="kpis">
        <Kpi label="Top pick wins" value={pc(M.mcTopWin)} sub={`predicted ${pc(M.predWin)} · market fav ${pc(M.favWin)}`} tone={vs(M.mcTopWin, M.favWin)} />
        <Kpi label="Top pick places" value={pc(M.mcTopPlace)} sub={`predicted ${pc(M.predPlace)} · market fav ${pc(M.favPlace)}`} tone={vs(M.mcTopPlace, M.favPlace)} />
        <Kpi label="Place ROI" value={signed(M.placeRoi)} sub="flat $10 place on top pick" tone={cls(M.placeRoi)} />
        <Kpi label="Win ROI" value={signed(M.winRoi)} sub="flat $10 win on top pick" tone={cls(M.winRoi)} />
        <Kpi label="Brier score" value={M.brier.toFixed(3)} sub={`place ${M.brierPlace.toFixed(3)} · lower is better`} />
        <Kpi label="Finish position error" value={M.ePosErr.toFixed(2)} sub="mean abs. error of expected position" />
        <Kpi label="Agrees with market" value={pc(M.agree)} sub="top pick is also the favourite" />
        <Kpi label="Form top-rated places" value={pc(M.ratingPlace)} sub={`rating rank 1 · MC ${pc(M.mcTopPlace)}`} />
      </div>

      <h2>
        Calibration <span>— predicted probability vs what actually happened</span>
      </h2>
      <div className="grid2">
        <div className="panel">
          <Legend items={[[ACCENT, "actual"], ["var(--muted)", "perfect calibration"]]} />
          <CalibChart buckets={charts.calibWin} color={ACCENT} />
          <div className="note">Win probability. Bars below the dashed line mean the model is over-confident.</div>
        </div>
        <div className="panel">
          <Legend items={[[ACCENT2, "actual"], ["var(--muted)", "perfect calibration"]]} />
          <CalibChart buckets={charts.calibPlace} color={ACCENT2} />
          <div className="note">Place probability (top 3).</div>
        </div>
      </div>

      <h2>
        Accuracy by rank <span>— model rank vs market rank</span>
      </h2>
      <div className="grid2">
        <div className="panel">
          <Legend items={[[ACCENT, "win %"], [ACCENT2, "place %"]]} />
          <GroupedBars rows={charts.mcRank} labelOf={(r) => r.rank} series={rankBars} max={100} />
          <div className="note">By Monte Carlo rank (1 = model's top pick). Ranks with fewer than 20 runners are hidden.</div>
        </div>
        <div className="panel">
          <Legend items={[[ACCENT, "win %"], [ACCENT2, "place %"]]} />
          <GroupedBars rows={charts.mktRank} labelOf={(r) => r.rank} series={rankBars} max={100} />
          <div className="note">By market rank (1 = favourite), same races.</div>
        </div>
      </div>

      <h2>
        Monthly trend <span>— top pick place rate vs the favourite</span>
      </h2>
      <div className="panel">
        <Legend items={[[ACCENT, "MC top pick place %"], [WARN, "market favourite place %"]]} />
        <LineChart
          rows={charts.monthly}
          series={[
            { name: "MC top pick", color: ACCENT, get: (r) => r.mcTopPlace },
            { name: "market favourite", color: WARN, get: (r) => r.favPlace },
          ]}
          max={100}
        />
      </div>

      <h2>Breakdowns</h2>
      <div className="grid2">
        <Breakdown title="By venue" head="Venue" rows={charts.venue} />
        <Breakdown title="By field spread (avgDiff)" head="avgDiff" rows={charts.diff} />
        <Breakdown title="By class" head="Class" rows={charts.cls} />
        <Breakdown title="By field size" head="Runners" rows={charts.field} />
      </div>

      <h2>
        Race by race <span>— the model's top pick in each race</span>
      </h2>
      <RaceTable races={races} />

      <h2>
        Month by month <span>— the model's top pick vs the market favourite</span>
      </h2>
      <MonthlyTable races={races} rows={charts.monthly} />
    </>
  );
}

function Breakdown({ title, head, rows }: { title: string; head: string; rows: ({ key: string | number } & ReturnType<typeof metrics>)[] }) {
  return (
    <div className="panel">
      <h3>{title}</h3>
      <div className="scroll">
        <table>
          <thead>
            <tr>
              <th>{head}</th>
              <th>Races</th>
              <th>Win %</th>
              <th>Place %</th>
              <th>Fav place %</th>
              <th>Place ROI</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.key}>
                <td>{r.key}</td>
                <td>{r.races}</td>
                <td>{pc(r.mcTopWin)}</td>
                <td>
                  {pc(r.mcTopPlace)} <Bar v={r.mcTopPlace} />
                </td>
                <td>{pc(r.favPlace)}</td>
                <td className={cls(r.placeRoi)}>{signed(r.placeRoi)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MonthlyTable({ races, rows }: { races: AnalyzerRace[]; rows: ({ key: string } & ReturnType<typeof metrics>)[] }) {
  const total = useMemo(() => metrics(races), [races]);
  const cells = (m: ReturnType<typeof metrics>) => (
    <>
      <td>{m.races}</td>
      <td>{pc(m.mcTopWin)}</td>
      <td>
        {pc(m.mcTopPlace)} <Bar v={m.mcTopPlace} />
      </td>
      <td>{pc(m.predPlace)}</td>
      <td>{pc(m.favWin)}</td>
      <td>{pc(m.favPlace)}</td>
      <td className={cls(m.mcTopPlace - m.favPlace)}>{Number.isFinite(m.mcTopPlace - m.favPlace) ? (m.mcTopPlace >= m.favPlace ? "+" : "") + (m.mcTopPlace - m.favPlace).toFixed(1) + " pts" : "–"}</td>
      <td>{pc(m.agree)}</td>
      <td className={cls(m.winRoi)}>{signed(m.winRoi)}</td>
      <td className={cls(m.placeRoi)}>{signed(m.placeRoi)}</td>
      <td>{m.brier.toFixed(3)}</td>
    </>
  );
  return (
    <div className="panel">
      <div className="scroll">
        <table>
          <thead>
            <tr>
              {["Month", "Races", "Win %", "Place %", "Pred place", "Fav win %", "Fav place %", "Place vs fav", "Agree", "Win ROI", "Place ROI", "Brier"].map((t) => (
                <th key={t}>{t}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...rows].reverse().map((m) => (
              <tr key={m.key}>
                <td>{m.key}</td>
                {cells(m)}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="total">
              <td>All</td>
              {cells(total)}
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="note">
        Newest month first. Win/Place % and ROI are for the model's top pick ($10 flat); <code>Fav</code> is the market favourite in the same races; <code>Agree</code> = top pick is also the
        favourite.
      </div>
    </div>
  );
}

function RaceTable({ races }: { races: AnalyzerRace[] }) {
  const [q, setQ] = useState("");
  const sort = useSort<RowKey>("date");
  const rows = useMemo(
    () =>
      races.map((r) => {
        const t = topOf(r);
        return {
          id: `${r.d}_${r.v}_${r.r}`,
          date: r.d, venue: r.v, race: r.r, cls: r.c, dist: r.dist, runners: r.n, avgDiff: r.ad,
          close8: r.c8, sparse: r.sp, gap: r.gp,
          horse: `#${r.tnum} ${r.tn}`, trip: t[TRIP], predWin: t[PWIN] * 100, predPlace: t[PPLACE] * 100,
          mkt: t[MKT] || null, odds: t[WODDS], finish: t[FIN], placed: !!t[PLACED], jockey: r.tj,
        };
      }),
    [races]
  );
  const needle = q.trim().toLowerCase();
  const list = sort.sort(rows.filter((r) => !needle || `${r.date} ${r.venue} r${r.race} ${r.cls} ${r.horse} ${r.jockey}`.toLowerCase().includes(needle)));
  const th = (k: RowKey, label: string) => <SortTh key={k} k={k} sort={sort}>{label}</SortTh>;

  return (
    <div className="panel">
      <div className="row">
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="search date, venue, class, horse, jockey…" />
        <span className="tag">
          {list.length} race{list.length === 1 ? "" : "s"}
        </span>
      </div>
      <div className="scroll tall">
        <table>
          <thead>
            <tr>
              {th("date", "Date")}{th("venue", "Venue")}{th("race", "Race")}{th("cls", "Class")}
              {th("dist", "Dist")}{th("runners", "Run")}{th("avgDiff", "AvgDiff")}
              {th("close8", "Close<8")}{th("sparse", "Sparse")}{th("gap", "Gap")}
              {th("horse", "Top pick")}{th("trip", "Trip")}{th("predWin", "Pred win")}{th("predPlace", "Pred place")}
              {th("mkt", "Mkt")}{th("odds", "Odds")}{th("finish", "Finish")}{th("jockey", "Jockey")}
            </tr>
          </thead>
          <tbody>
            {list.map((r) => (
              <tr key={r.id}>
                <td>{r.date}</td>
                <td>{r.venue}</td>
                <td>R{r.race}</td>
                <td>{r.cls}</td>
                <td>{r.dist}m</td>
                <td>{r.runners}</td>
                <td>{r.avgDiff}</td>
                <td>{r.close8}</td>
                <td>{r.sparse}</td>
                <td>{r.gap >= 999 ? "–" : r.gap}</td>
                <td>{r.horse}</td>
                <td>{r.trip}</td>
                <td>{r.predWin.toFixed(1)}%</td>
                <td>{r.predPlace.toFixed(1)}%</td>
                <td>{r.mkt ?? "–"}</td>
                <td>{r.odds > 0 ? r.odds.toFixed(1) : "–"}</td>
                <td className={r.placed ? "good strong" : ""}>{r.finish > 0 ? r.finish : "–"}</td>
                <td>{r.jockey || "–"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="note">
        Click a column to sort. <code>Trip</code> is the top pick's past runs at exactly this distance. <code>Mkt</code> is the top pick's market rank; <code>Finish</code> is its actual placing (bold = placed); <code>Jockey</code> is who rode it.
      </div>
    </div>
  );
}
