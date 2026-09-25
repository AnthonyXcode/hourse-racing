import { useMemo, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useGlossary } from "../i18n/glossary";
import { useNames } from "../i18n/names";
import {
  type AnalyzerRace, MC, MKT, PWIN, PPLACE, WON, PLACED, WODDS, FIN, TRIP,
  metrics, byRank, calibration, groupBy, topOf, diffBucket, DIFF_ORDER,
} from "../../shared/analyzer/model";
import { C, CalibChart, GroupedBars, LineChart, type Series } from "./charts";
import { Bar, Kpi, Legend, SortTh, cls, pc, signed, useSort, vs } from "./format";
import { H2, code, control, cx, good, grid2, h3, kpis, note, panel, row, scroll, strong, table, tablePad, tablePadTight, tag, tall, totalRow } from "../kit";

const ACCENT = C.accent, ACCENT2 = C.accent2, WARN = C.warn;

type RowKey = "date" | "venue" | "race" | "cls" | "dist" | "runners" | "avgDiff" | "close8" | "sparse" | "gap" | "horse" | "trip" | "predWin" | "predPlace" | "mkt" | "odds" | "finish" | "jockey";

export function WinPlaceTab({ races }: { races: AnalyzerRace[] }) {
  const { t } = useTranslation(["analyzer", "common"]);
  const g = useGlossary();
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
    { name: t("wp.winSeries"), color: ACCENT, get: (r) => r.win },
    { name: t("wp.placeSeries"), color: ACCENT2, get: (r) => r.place },
  ];

  return (
    <>
      <div className={kpis}>
        <Kpi label={t("wp.kpi.topWin")} value={pc(M.mcTopWin)} sub={t("wp.kpi.topWinSub", { pred: pc(M.predWin), fav: pc(M.favWin) })} tone={vs(M.mcTopWin, M.favWin)} />
        <Kpi label={t("wp.kpi.topPlace")} value={pc(M.mcTopPlace)} sub={t("wp.kpi.topPlaceSub", { pred: pc(M.predPlace), fav: pc(M.favPlace) })} tone={vs(M.mcTopPlace, M.favPlace)} />
        <Kpi label={t("wp.kpi.placeRoi")} value={signed(M.placeRoi)} sub={t("wp.kpi.placeRoiSub")} tone={cls(M.placeRoi)} />
        <Kpi label={t("wp.kpi.winRoi")} value={signed(M.winRoi)} sub={t("wp.kpi.winRoiSub")} tone={cls(M.winRoi)} />
        <Kpi label={t("wp.kpi.brier")} value={M.brier.toFixed(3)} sub={t("wp.kpi.brierSub", { v: M.brierPlace.toFixed(3) })} />
        <Kpi label={t("wp.kpi.posErr")} value={M.ePosErr.toFixed(2)} sub={t("wp.kpi.posErrSub")} />
        <Kpi label={t("wp.kpi.agree")} value={pc(M.agree)} sub={t("wp.kpi.agreeSub")} />
        <Kpi label={t("wp.kpi.formTop")} value={pc(M.ratingPlace)} sub={t("wp.kpi.formTopSub", { v: pc(M.mcTopPlace) })} />
      </div>

      <H2 sub={t("wp.calibrationSub")}>{t("wp.calibration")}</H2>
      <div className={grid2}>
        <div className={panel}>
          <Legend items={[[ACCENT, t("chart.actual")], [C.muted, t("wp.perfectCalib")]]} />
          <CalibChart buckets={charts.calibWin} color={ACCENT} />
          <div className={note}>{t("wp.calibWinNote")}</div>
        </div>
        <div className={panel}>
          <Legend items={[[ACCENT2, t("chart.actual")], [C.muted, t("wp.perfectCalib")]]} />
          <CalibChart buckets={charts.calibPlace} color={ACCENT2} />
          <div className={note}>{t("wp.calibPlaceNote")}</div>
        </div>
      </div>

      <H2 sub={t("wp.rankSub")}>{t("wp.rank")}</H2>
      <div className={grid2}>
        <div className={panel}>
          <Legend items={[[ACCENT, t("wp.winPct")], [ACCENT2, t("wp.placePct")]]} />
          <GroupedBars rows={charts.mcRank} labelOf={(r) => r.rank} series={rankBars} max={100} />
          <div className={note}>{t("wp.rankMcNote")}</div>
        </div>
        <div className={panel}>
          <Legend items={[[ACCENT, t("wp.winPct")], [ACCENT2, t("wp.placePct")]]} />
          <GroupedBars rows={charts.mktRank} labelOf={(r) => r.rank} series={rankBars} max={100} />
          <div className={note}>{t("wp.rankMktNote")}</div>
        </div>
      </div>

      <H2 sub={t("wp.monthlySub")}>{t("wp.monthly")}</H2>
      <div className={panel}>
        <Legend items={[[ACCENT, t("wp.mcTopPlaceLegend")], [WARN, t("wp.favPlaceLegend")]]} />
        <LineChart
          rows={charts.monthly}
          series={[
            { name: t("wp.mcTopSeries"), color: ACCENT, get: (r) => r.mcTopPlace },
            { name: t("wp.favSeries"), color: WARN, get: (r) => r.favPlace },
          ]}
          max={100}
        />
      </div>

      <H2>{t("breakdowns")}</H2>
      <div className={grid2}>
        <Breakdown title={t("byVenue")} head={t("common:word.venue")} rows={charts.venue} label={g.venue} />
        <Breakdown title={t("byDiff")} head={t("col.avgDiff")} rows={charts.diff} />
        <Breakdown title={t("byClass")} head={t("common:word.class")} rows={charts.cls} label={g.raceClass} />
        <Breakdown title={t("byField")} head={t("col.runners")} rows={charts.field} />
      </div>

      <H2 sub={t("wp.raceByRaceSub")}>{t("wp.raceByRace")}</H2>
      <RaceTable races={races} />

      <H2 sub={t("wp.monthByMonthSub")}>{t("wp.monthByMonth")}</H2>
      <MonthlyTable races={races} rows={charts.monthly} />
    </>
  );
}

function Breakdown({ title, head, rows, label = String }: { title: string; head: string; rows: ({ key: string | number } & ReturnType<typeof metrics>)[]; label?: (k: string) => string }) {
  const { t } = useTranslation(["analyzer", "common"]);
  return (
    <div className={panel}>
      <h3 className={h3}>{title}</h3>
      <div className={scroll}>
        <table className={cx(table, tablePadTight)}>
          <thead>
            <tr>
              <th>{head}</th>
              <th>{t("col.races")}</th>
              <th>{t("col.winPct")}</th>
              <th>{t("col.placePct")}</th>
              <th>{t("col.favPlacePct")}</th>
              <th>{t("col.placeRoi")}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.key}>
                <td>{label(String(r.key))}</td>
                <td>{r.races}</td>
                <td>{pc(r.mcTopWin)}</td>
                <td>
                  {pc(r.mcTopPlace)} <Bar v={r.mcTopPlace} narrow />
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
  const { t } = useTranslation(["analyzer", "common"]);
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
      <td className={cls(m.mcTopPlace - m.favPlace)}>{Number.isFinite(m.mcTopPlace - m.favPlace) ? t("pts", { v: (m.mcTopPlace >= m.favPlace ? "+" : "") + (m.mcTopPlace - m.favPlace).toFixed(1) }) : "–"}</td>
      <td>{pc(m.agree)}</td>
      <td className={cls(m.winRoi)}>{signed(m.winRoi)}</td>
      <td className={cls(m.placeRoi)}>{signed(m.placeRoi)}</td>
      <td>{m.brier.toFixed(3)}</td>
    </>
  );
  return (
    <div className={panel}>
      <div className={scroll}>
        <table className={cx(table, tablePad)}>
          <thead>
            <tr>
              {[t("common:word.month"), t("col.races"), t("col.winPct"), t("col.placePct"), t("col.predPlace"), t("col.favWinPct"), t("col.favPlacePct"), t("col.placeVsFav"), t("col.agree"), t("col.winRoi"), t("col.placeRoi"), t("col.brier")].map((h) => (
                <th key={h}>{h}</th>
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
            <tr className={totalRow}>
              <td>{t("common:word.all")}</td>
              {cells(total)}
            </tr>
          </tfoot>
        </table>
      </div>
      <div className={note}>
        <Trans t={t} i18nKey="wp.monthlyNote" components={{ code: <code className={code} /> }} />
      </div>
    </div>
  );
}

function RaceTable({ races }: { races: AnalyzerRace[] }) {
  const { t } = useTranslation(["analyzer", "common"]);
  const g = useGlossary();
  const name = useNames();
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
          horse: `#${r.tnum} ${r.tn}`, horseNo: r.tnum, horseName: r.tn, horseCode: r.tc, trip: t[TRIP], predWin: t[PWIN] * 100, predPlace: t[PPLACE] * 100,
          mkt: t[MKT] || null, odds: t[WODDS], finish: t[FIN], placed: !!t[PLACED], jockey: r.tj, jockeyCode: r.tjc,
        };
      }),
    [races]
  );
  // Display names in the current language; search matches both English and the shown text.
  const shown = (r: (typeof rows)[number]) => ({
    horse: `#${r.horseNo} ${name("horse", r.horseCode, r.horseName)}`,
    jockey: r.jockey ? name("jockey", r.jockeyCode, r.jockey) : "",
  });
  const needle = q.trim().toLowerCase();
  const list = sort.sort(
    rows.filter((r) => {
      if (!needle) return true;
      const s = shown(r);
      return `${r.date} ${r.venue} ${g.venue(r.venue)} r${r.race} ${r.cls} ${g.raceClass(r.cls)} ${r.horse} ${r.jockey} ${s.horse} ${s.jockey}`.toLowerCase().includes(needle);
    })
  );
  const th = (k: RowKey, label: string) => <SortTh key={k} k={k} sort={sort}>{label}</SortTh>;

  return (
    <div className={panel}>
      <div className={row}>
        <input type="search" className={cx(control, "w-full flex-1 sm:w-auto sm:min-w-[260px]")} value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("wp.search")} />
        <span className={cx(tag, "whitespace-normal")}>
          {t("common:races", { count: list.length })}
        </span>
      </div>
      <div className={cx(scroll, tall)}>
        <table className={cx(table, tablePad)}>
          <thead>
            <tr>
              {th("date", t("common:word.date"))}{th("venue", t("common:word.venue"))}{th("race", t("col.race"))}{th("cls", t("common:word.class"))}
              {th("dist", t("col.dist"))}{th("runners", t("col.run"))}{th("avgDiff", t("col.avgDiff"))}
              {th("close8", t("col.close8"))}{th("sparse", t("col.sparse"))}{th("gap", t("col.gap"))}
              {th("horse", t("col.topPick"))}{th("trip", t("col.trip"))}{th("predWin", t("col.predWin"))}{th("predPlace", t("col.predPlace"))}
              {th("mkt", t("col.mkt"))}{th("odds", t("common:word.odds"))}{th("finish", t("col.finish"))}{th("jockey", t("common:word.jockey"))}
            </tr>
          </thead>
          <tbody>
            {list.map((r) => (
              <tr key={r.id}>
                <td>{r.date}</td>
                <td>{g.venue(r.venue)}</td>
                <td>{t("common:raceShort", { n: r.race })}</td>
                <td>{g.raceClass(r.cls)}</td>
                <td>{t("common:metres", { n: r.dist })}</td>
                <td>{r.runners}</td>
                <td>{r.avgDiff}</td>
                <td>{r.close8}</td>
                <td>{r.sparse}</td>
                <td>{r.gap >= 999 ? "–" : r.gap}</td>
                <td>{shown(r).horse}</td>
                <td>{r.trip}</td>
                <td>{r.predWin.toFixed(1)}%</td>
                <td>{r.predPlace.toFixed(1)}%</td>
                <td>{r.mkt ?? "–"}</td>
                <td>{r.odds > 0 ? r.odds.toFixed(1) : "–"}</td>
                <td className={r.placed ? cx(good, strong) : ""}>{r.finish > 0 ? r.finish : "–"}</td>
                <td>{shown(r).jockey || "–"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={note}>
        <Trans t={t} i18nKey="wp.raceNote" components={{ code: <code className={code} /> }} />
      </div>
    </div>
  );
}
