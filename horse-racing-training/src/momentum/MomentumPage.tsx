// Market momentum: live pre-race odds movement (server polls HKJC every 30 s inside the
// 30-min window) and, over settled races, whether that movement predicts the result.
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { api, type MomentumDay, type MomentumDayRef } from "../api";
import {
  type RaceSeries, type HorseRow, type Window, type BucketStats, type Mover, type ModelRank, type Bucket,
  WINDOWS, BUCKETS, MODEL_PICKS, MOVE_PICKS, TRIO_UNIT, choose3, movers, suggestPicks, pickResults, byBucket, byBandAndBucket, stats,
} from "../../shared/momentum/model";
import { C, GroupedBars, type Series } from "../analyzer/charts";
import { Kpi, Legend, SortTh, cls, pc, signed, useSort } from "../analyzer/format";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import { useGlossary } from "../i18n/glossary";
import { useFmt } from "../i18n/useLanguage";
import { OddsChart, Swatch, horseStyle, useRunnerNames } from "./OddsChart";
import { PoolDonut } from "./PoolDonut";
import {
  Display, H2, btn, dateControl, btnPrimary, control, cx, dim, empty, errorBox, field, fieldLabel, figure, grid2, h3, kpis, modal, modalBg, note, page, panel,
  pill, pillRow, rangeBar, rangeMeta, scroll, seg, segBtn, strong, table, tablePad, tablePadTight,
} from "../kit";

const REFRESH_MS = 30_000;

// Local class strings for patterns only this page uses.
/** Panel header row: title left, meta/controls pushed right. */
/** Panel header row: title left, meta/controls pushed right (own line on phones). */
const moHead = "mb-3 flex flex-wrap items-center gap-x-2 gap-y-1";
const moMeta = "basis-full text-xs text-ink-3 sm:ml-auto sm:basis-auto";
/** Chart + donut stack beside the movers from `lg`; one column below. */
// Row height comes from the left column; the movers panel (right) fills it and scrolls inside.
const gridLive = "grid grid-cols-1 items-stretch gap-4 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1.1fr)]";
/** Suggested-pick row: label above the chips on phones, beside them from `sm`. */
const pickRow = "flex flex-col gap-1.5 py-1.5 sm:flex-row sm:items-baseline sm:gap-3";
const pickLbl = "text-xs text-ink-2 sm:w-[118px] sm:flex-none";
const chips = "flex flex-wrap gap-1.5";
const chipBase = "inline-flex cursor-default items-center gap-[5px] rounded-full py-1 pr-2.5 pl-2 text-[12.5px] shadow-btn";
/** Pick chip: `on` (hovered horse) beats `both` (in both lists). */
const chipCls = (both: boolean, on: boolean) =>
  cx(chipBase, on ? "bg-accent-soft ring-1 ring-accent" : both ? "bg-surface ring-1 ring-ink" : "bg-surface");
const chipOdds = "-ml-[3px] text-ink-3 tabular-nums";
const chipDetail = "text-ink-2 tabular-nums";
const MIN_N = 30; // below this a bucket's hit rate is noise — shown greyed

/** Display formats for the active language, in HK time. */
function useMoFmt() {
  const { t } = useTranslation(["momentum", "common"]);
  const { date } = useFmt();
  return useMemo(() => {
    const clock = (iso: string) => date(iso, { hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" });
    return {
      /** "Wed, 23 Sept 2026" / "2026年9月23日 週三" */
      day: (d: string) => date(`${d}T12:00:00+08:00`, { weekday: "short", day: "numeric", month: "short", year: "numeric" }),
      hm: (iso: string) => date(iso, { hour: "2-digit", minute: "2-digit", hourCycle: "h23" }),
      clock,
      /** HH:MM:SS.mmm — for request/response timing. */
      clockMs: (iso: string) => `${clock(iso)}.${String(new Date(iso).getMilliseconds()).padStart(3, "0")}`,
      ago: (iso: string, now: number) => {
        const s = Math.max(0, Math.round((now - Date.parse(iso)) / 1000));
        return s < 90 ? t("agoSecs", { n: s }) : t("agoMins", { n: Math.round(s / 60) });
      },
    };
  }, [date, t]);
}

/** "1st" / "第1名". */
const ordinal = (t: TFunction<["momentum", "common"]>, n: number) => (n === 1 || n === 2 || n === 3 ? t(`ordinal.${n}`) : t("ordinal.n", { n }));
const ymd = (d: Date) => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Hong_Kong" }).format(d);
const mmss = (secs: number) => `${secs < 0 ? "−" : ""}${Math.floor(Math.abs(secs) / 60)}:${String(Math.floor(Math.abs(secs) % 60)).padStart(2, "0")}`;

/** Re-render every second (for countdowns). */
function useNow() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

export function MomentumPage() {
  const { t } = useTranslation(["momentum", "common"]);
  const { t: tc } = useTranslation();
  const f = useMoFmt();
  const g = useGlossary();
  const [days, setDays] = useState<{ today: string; days: MomentumDayRef[] } | null>(null);
  const [day, setDay] = useState(""); // "" = default racing day (see below)

  useEffect(() => {
    const load = () => api.momentumDays().then(setDays).catch(() => {});
    load();
    const t = setInterval(load, 5 * 60_000);
    return () => clearInterval(t);
  }, []);

  // `days` lists racing days only, newest first. Default to today's meeting when there is one,
  // else the most recent racing day.
  const options = days?.days ?? [];
  const today = days?.today ?? "";
  const date = day || (options.find((d) => d.date <= today)?.date ?? "");
  const isToday = date !== "" && date === today;

  return (
    <div className={page}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <Display sub={t("sub")}>{t("title")}</Display>
        <div className={cx(field, "w-full sm:w-auto sm:pb-2")}>
          <label htmlFor="mDay" className={fieldLabel}>{t("racingDay")}</label>
          <select id="mDay" className={cx(control, "w-full sm:w-auto sm:min-w-[300px]")} value={date} disabled={!options.length} onChange={(e) => setDay(e.target.value)}>
            {!options.length && <option value="">{days ? t("noDays") : tc("state.loading")}</option>}
            {options.map((d) => {
              const label = d.upcoming
                ? t("dayOptionUpcoming", { day: f.day(d.date), venue: g.venue(d.venue), races: tc("races", { count: d.races }) })
                : t("dayOption", { day: f.day(d.date), venue: g.venue(d.venue), races: tc("races", { count: d.races }) });
              return (
                <option key={d.date} value={d.date}>
                  {d.date === today ? t("today", { day: label }) : label}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      {date ? (
        <LivePanel key={date} date={date} isToday={isToday} />
      ) : (
        days && <div className={cx(panel, empty, "mt-6")}>{t("noDaysYet")}</div>
      )}
      <AnalysisPanel />
    </div>
  );
}

// ---------------- Live ----------------

type MoverKey = "horseNo" | "name" | "start" | "now" | "momentum" | "recent" | "fin";

/** Sort movers by `key`, keeping blanks (scratched / not yet measured) at the bottom either way. */
function sortMovers(rows: (Mover & { fin: number | null })[], key: MoverKey, dir: 1 | -1) {
  return [...rows].sort((a, b) => {
    const x = a[key], y = b[key];
    if (x == null || y == null) return x == null ? (y == null ? 0 : 1) : -1;
    return (x > y ? 1 : x < y ? -1 : 0) * dir;
  });
}

function LivePanel({ date, isToday }: { date: string; isToday: boolean }) {
  const { t } = useTranslation(["momentum", "common"]);
  const f = useMoFmt();
  const g = useGlossary();
  const now = useNow();
  const [today, setToday] = useState<MomentumDay | null>(null);
  const [raceId, setRaceId] = useState<string>("");
  const [series, setSeries] = useState<RaceSeries | null>(null);
  const [focus, setFocus] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!date) return;
    const load = () => api.momentumDay(date).then(setToday).catch((e) => setError(String(e)));
    load();
    if (!isToday) return; // a past day doesn't change
    const t = setInterval(load, REFRESH_MS);
    return () => clearInterval(t);
  }, [date, isToday]);

  // Default to the next race still to run (or the last race of the day).
  const races = today?.races ?? [];
  // Unknown post time (upcoming day, from racecards) counts as still to run, so race 1 is the default there.
  const next = races.find((r) => !r.post_time || Date.parse(r.post_time) > now - 5 * 60_000) ?? races[races.length - 1];
  const selected = raceId || next?.race_id || "";

  useEffect(() => {
    if (!selected) return;
    let live = true;
    const load = () => api.momentumRace(selected).then((s) => live && setSeries(s)).catch((e) => live && setError(String(e)));
    load();
    const t = isToday ? setInterval(load, REFRESH_MS) : undefined;
    return () => {
      live = false;
      clearInterval(t);
    };
  }, [selected, isToday]);

  // Analyzer ranking for the selected race (computed once per race server-side).
  const [model, setModel] = useState<{ raceId: string; ranks: ModelRank[] | null; error?: string } | null>(null);
  useEffect(() => {
    if (!selected) return;
    let live = true;
    setModel({ raceId: selected, ranks: null });
    api
      .momentumPicks(selected)
      .then((r) => live && setModel({ raceId: selected, ranks: r.ranks }))
      .catch((e) => live && setModel({ raceId: selected, ranks: null, error: String(e instanceof Error ? e.message : e) }));
    return () => {
      live = false;
    };
  }, [selected]);
  const modelHere = model?.raceId === selected ? model : null;

  const race = races.find((r) => r.race_id === selected);
  const secsToPost = race?.post_time ? (Date.parse(race.post_time) - now) / 1000 : NaN;
  const upcomingDay = races.length > 0 && races.every((r) => !r.post_time);
  const lastPt = series?.points[series.points.length - 1];

  return (
    <>
      <H2 sub={today ? `${f.day(today.date)} · ${races[0] ? g.venue(races[0].venue) : t("noMeeting")}` : t("common:state.loading")}>{upcomingDay ? t("upcoming") : isToday ? t("live") : t("replay")}</H2>
      {error && <div className={errorBox}>{error}</div>}
      {isToday && today?.poller.lastError && <div className={errorBox}>{t("poller", { error: today.poller.lastError })}</div>}

      {races.length > 0 && (
        <nav className={cx(pillRow, "my-4")}>
          {races.map((r) => {
            const on = today!.poller.polling.includes(r.race_id);
            const sel = r.race_id === selected;
            return (
              <button key={r.race_id} className={cx(pill(sel), "flex-none")} onClick={() => setRaceId(r.race_id)} title={t("snapshots", { count: r.snapshots })}>
                {t("common:raceShort", { n: r.race_no })} <small className={sel ? "text-xs font-normal text-white/70" : "text-xs font-normal text-ink-3"}>{r.post_time ? f.hm(r.post_time) : ""}</small>
                {on && <i className="size-[7px] animate-pulse rounded-full bg-good motion-reduce:animate-none" aria-label={t("polling")} />}
                {r.status === "settled" && <small className={cx(dim, "text-xs")}>✓</small>}
              </button>
            );
          })}
        </nav>
      )}

      {race && series && <SuggestedPicks model={modelHere} series={series} focus={focus} onFocus={setFocus} className="mb-4" />}
      {race && series && (
        <div className={gridLive}>
          <div className="flex min-w-0 flex-col gap-4">
          <div className={panel}>
            <div className={moHead}>
              <h3 className={cx(h3, "mb-0")}>{t("common:race", { n: race.race_no })}</h3>
              {race.post_time ? <span className="text-ink-2">{t("off", { time: f.hm(race.post_time) })} ·</span> : <span className="text-ink-2">{t("postTimeTbc")}</span>}
              {secsToPost > 0 ? <span className={strong}>{t("toGo", { time: mmss(secsToPost) })}</span> : <span className={dim}>{race.hkjc_status ? t(`status.${race.hkjc_status}` as "status.RESULT", { defaultValue: race.hkjc_status.toLowerCase() }) : ""}</span>}
              <span className={moMeta}>
                {t("snapshots", { count: series.points.length })}
                {lastPt?.winPool ? ` · ${t("winPoolMeta", { amount: `$${Math.round(lastPt.winPool).toLocaleString()}` })}` : ""}
              </span>
            </div>
            <OddsChart series={series} focus={focus} onFocus={setFocus} />
            <div className={note}>{t("chartNote")}</div>
          </div>
          {lastPt && <PoolDonut series={series} focus={focus} onFocus={setFocus} />}
          </div>

          <MoversTable
            series={series}
            focus={focus}
            onFocus={setFocus}
            stamp={lastPt && <span title={lastPt.fetchedAt}>{t("lastUpdate", { time: f.clock(lastPt.fetchedAt), ago: f.ago(lastPt.fetchedAt, now) })}</span>}
          />
        </div>
      )}
      {race && series && series.points.length > 0 && <RecordsTable series={series} model={modelHere} />}
      {today && !races.length && (
        <div className={cx(panel, empty)}>
          {isToday ? t("noMeetingToday") : t("nothingRecorded")}
        </div>
      )}
    </>
  );
}

// ---------------- Movers ----------------

/** Per-horse moves up to the series' last snapshot. Click a header to sort. */
type ModelState = { ranks: ModelRank[] | null; error?: string } | null;

/** On lg the panel is pinned to its grid cell, so it is exactly as tall as the chart column and the table scrolls. */
function MoversTable({ series, focus, onFocus, stamp }: { series: RaceSeries; focus: number | null; onFocus: (h: number | null) => void; stamp?: ReactNode }) {
  const { t } = useTranslation(["momentum", "common"]);
  const nameOf = useRunnerNames(series);
  const sort = useSort<MoverKey>("momentum", -1);
  const fin = useMemo(() => new Map(series.results.map((r) => [r.horseNo, r.finishPos])), [series.results]);
  const all = useMemo(() => movers(series), [series]);
  const mv = useMemo(
    () => sortMovers(all.map((m) => ({ ...m, fin: fin.get(m.horseNo) ?? null })), sort.key, sort.dir),
    [all, fin, sort.key, sort.dir]
  );

  return (
    <div className="min-w-0 lg:relative">
    <div className={cx(panel, "flex flex-col lg:absolute lg:inset-0")}>
      <div className={moHead}>
        <h3 className={cx(h3, "mb-0")}>{t("movers.title")}</h3>
        {stamp && <span className={moMeta}>{stamp}</span>}
      </div>
      <div className="min-h-0 flex-1 overflow-auto">
      <table
        className={cx(
          table,
          tablePadTight,
          "[&_td:first-child]:pr-2.5 [&_td:nth-child(2)]:max-w-[170px] [&_td:nth-child(2)]:truncate [&_td:nth-child(2)]:pl-3 [&_td:nth-child(2)]:text-left [&_th:nth-child(2)]:pl-3 [&_th:nth-child(2)]:text-left"
        )}
      >
        <thead>
          <tr>
            <SortTh k="horseNo" sort={sort}>#</SortTh>
            <SortTh k="name" sort={sort}>{t("common:word.horse")}</SortTh>
            <SortTh k="start" sort={sort}>{t("movers.start")}</SortTh>
            <SortTh k="now" sort={sort}>{t("movers.now")}</SortTh>
            <SortTh k="momentum" sort={sort}>{t("movers.move")}</SortTh>
            <SortTh k="recent" sort={sort}>{t("movers.last5")}</SortTh>
            {fin.size > 0 && <SortTh k="fin" sort={sort}>{t("movers.fin")}</SortTh>}
          </tr>
        </thead>
        <tbody>
          {mv.map((m) => (
            <tr key={m.horseNo} onMouseEnter={() => onFocus(m.horseNo)} onMouseLeave={() => onFocus(null)} className={focus === m.horseNo ? "[&_td]:bg-accent-soft" : ""}>
              <td><Swatch {...horseStyle(m.horseNo)} />{m.horseNo}</td>
              <td>{nameOf(m.horseNo, m.name)}</td>
              <td>{m.start ?? "–"}</td>
              <td>{m.now ?? "–"}</td>
              <td className={m.momentum == null ? "" : cls(m.momentum)} title={m.bucket ? t(`bucket.${m.bucket}`) : ""}>
                {m.momentum == null ? "–" : signed(100 * m.momentum)}
              </td>
              <td className={m.recent == null ? "" : cls(m.recent)}>{m.recent == null ? "–" : signed(100 * m.recent)}</td>
              {fin.size > 0 && <td className={m.fin === 1 ? strong : ""}>{m.fin ?? "–"}</td>}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className={note}>{t("movers.note")}</div>
    </div>
    </div>
  );
}

// ---------------- Suggested picks ----------------

function PickChip({ horseNo, name, odds, detail, both, fin, focus, onFocus }: {
  horseNo: number; name: string; odds?: number | null; detail?: ReactNode; both?: boolean; fin?: number | null; focus: number | null; onFocus: (h: number | null) => void;
}) {
  const { t } = useTranslation(["momentum", "common"]);
  return (
    <span
      className={chipCls(!!both, focus === horseNo)}
      title={name}
      onMouseEnter={() => onFocus(horseNo)}
      onMouseLeave={() => onFocus(null)}
    >
      <Swatch {...horseStyle(horseNo)} className="w-3.5" />
      <b>{horseNo}</b>
      {odds != null && <span className={chipOdds} title={t("picks.currentOdds")}>({odds})</span>}
      {detail && <span className={chipDetail}>{detail}</span>}
      {fin != null && <span className={cx("border-l border-edge pl-[5px] text-[11px]", fin <= 3 ? "font-semibold text-good" : "text-ink-3")}>{ordinal(t, fin)}</span>}
    </span>
  );
}

/** Full-width section above the chart + movers: the picks (left) and how they did (right on lg). */
function SuggestedPicks({ model, series, focus, onFocus, className }: {
  model: ModelState; series: RaceSeries; focus: number | null; onFocus: (h: number | null) => void; className?: string;
}) {
  const { t } = useTranslation(["momentum", "common"]);
  const mv = useMemo(() => movers(series), [series]);
  const fin = useMemo(() => new Map(series.results.map((r) => [r.horseNo, r.finishPos])), [series.results]);
  const nameOf = useRunnerNames(series);
  const picks = suggestPicks(model?.ranks ?? [], mv);
  const result = pickResults(picks, series.results, series.dividends);
  const divOf = (pool: string) => result?.dividends.filter((d) => d.pool === pool) ?? [];
  const off = series.postTime != null && Date.parse(series.postTime) <= Date.now();
  const odds = new Map(mv.map((m) => [m.horseNo, m.now]));
  const chip = { focus, onFocus };
  const f = (h: number) => (fin.size ? fin.get(h) ?? null : undefined);

  return (
    <section className={cx(panel, "grid gap-x-8 lg:grid-cols-2", className)}>
      <div className="min-w-0">
      <h3 className={cx(h3, "mb-2")}>{t("picks.title")}</h3>
      <div className={pickRow}>
        <span className={pickLbl}>{t("picks.modelTop", { n: MODEL_PICKS })}</span>
        <div className={chips}>
          {model?.error ? (
            <span className={dim} title={model.error}>{t("picks.analyzerUnavailable")}</span>
          ) : !model?.ranks ? (
            <span className={dim}>{t("picks.runningAnalyzer")}</span>
          ) : (
            picks.model.map((r) => <PickChip key={r.horseNo} horseNo={r.horseNo} name={nameOf(r.horseNo, r.name)} odds={odds.get(r.horseNo)} detail={pc(100 * r.winProb)} fin={f(r.horseNo)} {...chip} />)
          )}
        </div>
      </div>
      <div className={pickRow}>
        <span className={pickLbl}>{t("picks.moveTop", { n: MOVE_PICKS })}</span>
        <div className={chips}>
          {picks.move.length ? (
            picks.move.map((m) => (
              <PickChip key={m.horseNo} horseNo={m.horseNo} name={nameOf(m.horseNo, m.name)} odds={m.now} detail={<span className={cls(m.momentum!)}>{signed(100 * m.momentum!)}</span>} fin={f(m.horseNo)} {...chip} />
            ))
          ) : (
            <span className={dim}>{t("picks.needsSecond")}</span>
          )}
        </div>
      </div>
      <div className={pickRow}>
        <span className={cx(pickLbl, "font-semibold text-ink")}>{t("picks.combined", { n: picks.combined.length })}</span>
        <div className={chips}>
          {picks.combined.map((c) => (
            <PickChip key={c.horseNo} horseNo={c.horseNo} name={nameOf(c.horseNo, c.name)} odds={odds.get(c.horseNo)} both={c.inModel && c.inMove} detail={c.inModel && c.inMove ? t("picks.both") : undefined} fin={f(c.horseNo)} {...chip} />
          ))}
        </div>
      </div>
      {picks.combined.length >= 3 && (
        <div className={pickRow}>
          <span className={cx(pickLbl, "hidden sm:block")} />
          <span className="text-[12.5px] text-ink-2 tabular-nums" title={t("picks.trioBoxTitle")}>
            {t("picks.trioBox", { combos: choose3(picks.combined.length), unit: TRIO_UNIT })} <b className="text-ink">${(choose3(picks.combined.length) * TRIO_UNIT).toLocaleString()}</b>
          </span>
        </div>
      )}
      </div>
      <div className="mt-4 min-w-0 border-t border-edge pt-4 lg:mt-0 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
        <h3 className={cx(h3, "mb-2")}>{t("result.title")}</h3>
        {!result ? (
          <span className={dim}>{off ? t("result.waiting") : t("result.after")}</span>
        ) : (
          <>
            <div className={pickRow}>
              <span className={pickLbl}>{result.complete ? t("result.placings") : t("result.placingsSoFar")}</span>
              <div className={chips}>
                {result.placed.map((r) => (
                  <span key={r.horseNo} className={chipCls(false, focus === r.horseNo)} title={nameOf(r.horseNo)} onMouseEnter={() => onFocus(r.horseNo)} onMouseLeave={() => onFocus(null)}>
                    <span className="text-[11px] font-bold text-good">{ordinal(t, r.finishPos ?? 3)}</span>
                    <Swatch {...horseStyle(r.horseNo)} className="w-3.5" />
                    <b>{r.horseNo}</b>
                    {r.sp != null && <span className={chipOdds}>({r.sp})</span>}
                    <span className={chipDetail}>{nameOf(r.horseNo)}</span>
                  </span>
                ))}
              </div>
            </div>
            <div className={pickRow}>
              <span className={pickLbl}>{t("result.dividends")} <span className={dim}>{t("result.per10")}</span></span>
              <div className="flex flex-wrap items-baseline gap-x-3.5 gap-y-1.5">
                {divOf("TRI").length ? (
                  divOf("TRI").map((d) => (
                    <span key={d.comb} className="text-[13px]">
                      {t("result.trio")} <b>{d.comb.replaceAll(",", "-")}</b> <b className={cx(figure, "ml-1 text-[20px] font-normal text-ink")}>${d.div.toLocaleString()}</b>
                    </span>
                  ))
                ) : (
                  <span className={dim}>{t("result.trioWaiting")}</span>
                )}
                {divOf("WIN").map((d) => <span key={`w${d.comb}`} className="text-xs text-ink-2 tabular-nums">{t("result.win")} {d.comb} ${d.div}</span>)}
                {divOf("QIN").map((d) => <span key={`q${d.comb}`} className="text-xs text-ink-2 tabular-nums">{t("result.quinella")} {d.comb.replaceAll(",", "-")} ${d.div}</span>)}
              </div>
            </div>
            <div className={scroll}>
            <table
              className={cx(
                table,
                "mt-2 text-[12.5px] [&_td]:px-2 [&_td]:py-2 [&_td]:text-center! [&_th]:px-2 [&_th]:py-2 [&_th]:text-center! [&_td:first-child]:text-left! [&_th:first-child]:text-left!"
              )}
            >
              <thead>
                <tr>
                  <th>{t("result.list")}</th>
                  <th title={t("result.winT")}>{t("result.winH")}</th>
                  <th title={t("result.top3T")}>{t("result.top3")}</th>
                  <th title={t("result.qinT")}>{t("result.qin")}</th>
                  <th title={t("result.trioT")}>{t("result.trioH")}</th>
                  <th title={t("result.costT")}>{t("result.cost")}</th>
                  <th title={t("result.retT")}>{t("result.ret")}</th>
                </tr>
              </thead>
              <tbody>
                {result.lists.map((l, i) => (
                  <tr key={l.label}>
                    <td>{[t("picks.modelTop", { n: MODEL_PICKS }), t("picks.moveTop", { n: MOVE_PICKS }), t("picks.combinedList")][i] ?? l.label} <span className={dim}>({l.horses.length})</span></td>
                    <td className={l.winner ? "text-good" : "text-bad"}>{l.winner ? "✓" : "✗"}</td>
                    <td className={l.top3 === 3 ? "text-good" : l.top3 === 0 ? "text-bad" : ""}>{l.top3}/3</td>
                    <td className={l.quinella ? "text-good" : "text-bad"}>{l.quinella ? "✓" : "✗"}</td>
                    <td className={l.trio ? "text-good" : "text-bad"}>{l.trio ? "✓" : "✗"}</td>
                    <td>{l.trioCost ? `$${l.trioCost.toLocaleString()}` : "–"}</td>
                    <td className={l.trioReturn == null ? dim : l.trioReturn > l.trioCost ? "text-good" : "text-bad"} title={l.trioReturn == null ? "" : t("result.net", { amount: `${l.trioReturn - l.trioCost >= 0 ? "+" : "−"}$${Math.abs(l.trioReturn - l.trioCost).toLocaleString()}` })}>
                      {l.trioReturn == null ? "…" : `$${l.trioReturn.toLocaleString()}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </>
        )}
      </div>
      <div className={cx(note, "lg:col-span-2")}>{t("picks.note")}</div>
    </section>
  );
}

// ---------------- Snapshot popup ----------------

/** The chart + movers exactly as they stood at snapshot `index`. ← / → step through snapshots, Esc closes. */
function SnapshotModal({ series, model, index, onIndex, onClose }: { series: RaceSeries; model: ModelState; index: number; onIndex: (i: number) => void; onClose: () => void }) {
  const { t } = useTranslation(["momentum", "common"]);
  const f = useMoFmt();
  const [focus, setFocus] = useState<number | null>(null);
  const n = series.points.length;
  const at = useMemo(() => ({ ...series, points: series.points.slice(0, index + 1) }), [series, index]);
  const p = series.points[index]!;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft" && index > 0) onIndex(index - 1);
      else if (e.key === "ArrowRight" && index < n - 1) onIndex(index + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, n, onIndex, onClose]);

  return (
    <div className={modalBg} onClick={onClose}>
      <div
        className={cx(modal, "sm:w-[min(1320px,100%)] sm:max-w-none")} role="dialog" aria-modal="true" aria-label={t("modal.aria", { race: series.raceNo, time: f.clock(p.fetchedAt) })} onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <h3 className={cx(h3, "mb-0")}>
            {t("modal.title", { race: series.raceNo, time: f.clock(p.fetchedAt) })}
            <span className="block font-sans text-sm text-ink-3 sm:ml-2 sm:inline">{t("modal.sub", { toPost: mmss(p.secsToPost), i: index + 1, n })}</span>
          </h3>
          <div className="flex flex-wrap gap-2 sm:ml-auto">
            <button className={btn} onClick={() => onIndex(index - 1)} disabled={index === 0} title={t("modal.earlierT")}>{t("common:action.earlier")}</button>
            <button className={btn} onClick={() => onIndex(index + 1)} disabled={index === n - 1} title={t("modal.laterT")}>{t("common:action.later")}</button>
            <button className={btn} onClick={onClose} title={t("modal.closeT")} aria-label={t("common:action.close")}>✕</button>
          </div>
        </div>
        <SuggestedPicks model={model} series={at} focus={focus} onFocus={setFocus} className="mb-4" />
        <div className={gridLive}>
          <div className={panel}>
            <OddsChart series={at} focus={focus} onFocus={setFocus} />
          </div>
          <MoversTable series={at} focus={focus} onFocus={setFocus} stamp={p.winPool ? t("winPoolMeta", { amount: `$${Math.round(p.winPool).toLocaleString()}` }) : undefined} />
        </div>

      </div>
    </div>
  );
}

// ---------------- Records ----------------

/** Every snapshot for the race, newest first: one row per snapshot, one column per horse. */
function RecordsTable({ series, model }: { series: RaceSeries; model: ModelState }) {
  const { t } = useTranslation(["momentum", "common"]);
  const f = useMoFmt();
  const nameOf = useRunnerNames(series);
  const [pool, setPool] = useState<"win" | "pla">("win");
  const horses = series.runners.filter((r) => series.points.some((p) => p[pool][r.horseNo] != null));
  const pts = series.points;
  const rows = [...pts.keys()].reverse();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <H2 sub={t("records.sub", { n: pts.length, race: series.raceNo })}>{t("records.title")}</H2>
      <div className={panel}>
        <div className={cx(moHead, "gap-y-2")}>
          <div className={seg} role="group" aria-label={t("records.oddsShown")}>
            <button className={segBtn(pool === "win")} onClick={() => setPool("win")}>{t("pool.win")}</button>
            <button className={segBtn(pool === "pla")} onClick={() => setPool("pla")}>{t("pool.place")}</button>
          </div>
          <span className={cx(moMeta, "sm:max-w-[60%] sm:text-right")}>{t("records.legend")}</span>
        </div>
        <div className="max-h-[460px] overflow-auto">
          <table
            className={cx(
              table,
              tablePad,
              "whitespace-nowrap [&_thead_th]:z-[1] [&_thead_th]:shadow-[inset_0_-1px_0_var(--color-edge)] [&_th:nth-child(-n+6)]:text-left [&_td:nth-child(-n+6)]:text-left [&_td:nth-child(-n+4)]:text-ink-2 [&_td:nth-child(6)]:text-ink-2"
            )}
          >
            <thead>
              <tr>
                <th title={t("records.queryT")}>{t("records.query")}</th>
                <th title={t("records.responseT")}>{t("records.response")}</th>
                <th title={t("records.latencyT")}>{t("records.latency")}</th>
                <th title={t("records.updatedT")}>{t("records.updated")}</th>
                <th>{t("records.toPost")}</th>
                <th>{pool === "win" ? t("records.winPool") : t("records.placePool")}</th>
                {horses.map((h) => (
                  <th key={h.horseNo} title={nameOf(h.horseNo, h.name)}>
                    <Swatch {...horseStyle(h.horseNo)} />
                    {h.horseNo}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((i) => {
                const p = pts[i]!, prev = pts[i - 1];
                const poolAmt = pool === "win" ? p.winPool : p.plaPool;
                return (
                  <tr
                    key={p.fetchedAt}
                    className="cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
                    tabIndex={0}
                    onClick={() => setOpen(i)}
                    onKeyDown={(e) => e.key === "Enter" && setOpen(i)}
                  >
                    <td>{f.clockMs(p.fetchedAt)}</td>
                    <td>{p.respondedAt ? f.clockMs(p.respondedAt) : "–"}</td>
                    <td>{p.respondedAt ? t("records.ms", { n: Date.parse(p.respondedAt) - Date.parse(p.fetchedAt) }) : "–"}</td>
                    <td>{p.hkjcUpdatedAt ? f.clock(p.hkjcUpdatedAt) : "–"}</td>
                    <td>{mmss(p.secsToPost)}</td>
                    <td>{poolAmt ? `$${Math.round(poolAmt).toLocaleString()}` : "–"}</td>
                    {horses.map((h) => {
                      const o = p[pool][h.horseNo], was = prev?.[pool][h.horseNo];
                      const tone = o == null || was == null || o === was ? "" : o < was ? "text-good" : "text-bad";
                      return (
                        <td key={h.horseNo} className={tone} title={was != null && tone ? t("records.was", { v: was }) : undefined}>
                          {o ?? "–"}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {open != null && open < pts.length && <SnapshotModal series={series} model={model} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </>
  );
}

// ---------------- Analysis ----------------

function AnalysisPanel() {
  const { t } = useTranslation(["momentum", "common"]);
  const [range, setRange] = useState(() => {
    const to = new Date(), from = new Date(to);
    from.setMonth(from.getMonth() - 3);
    return { from: ymd(from), to: ymd(to) };
  });
  const [draft, setDraft] = useState(range);
  const [w, setW] = useState<Window>(10);
  const [metric, setMetric] = useState<"win" | "place">("win");
  const [data, setData] = useState<{ races: number; rows: HorseRow[] } | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.momentumAnalysis(range.from, range.to).then(setData).catch((e) => setError(String(e)));
  }, [range]);

  const rows = data?.rows ?? [];
  const buckets = useMemo(() => byBucket(rows, w), [rows, w]);
  const bands = useMemo(() => byBandAndBucket(rows, w), [rows, w]);
  const measured = rows.filter((r) => r.mom[w] != null);
  const steam = stats("steam", measured.filter((r) => r.mom[w]! >= 0.1));
  const drift = stats("drift", measured.filter((r) => r.mom[w]! <= -0.1));

  const hit = (b: BucketStats) => (metric === "win" ? b.winPct : b.placePct);
  const implied = (b: BucketStats) => (metric === "win" ? b.impliedWinPct : b.impliedPlacePct);
  const edge = (b: BucketStats) => (metric === "win" ? b.winEdge : b.placeEdge);
  const bars: Series<BucketStats>[] = [
    { name: t("analysis.actual"), color: C.accent, get: hit },
    { name: t("analysis.implied"), color: C.muted, get: implied },
  ];
  const metricLabel = metric === "win" ? t("analysis.metricWin") : t("analysis.metricPlace");
  const max = Math.max(10, ...buckets.flatMap((b) => [hit(b), implied(b)]).filter(Number.isFinite)) * 1.15;

  return (
    <>
      <H2 sub={t("analysis.sub")}>{t("analysis.title")}</H2>
      <form className={rangeBar} onSubmit={(e) => { e.preventDefault(); if (draft.from && draft.to && draft.from <= draft.to) setRange(draft); }}>
        <div className={field}>
          <label htmlFor="mFrom" className={fieldLabel}>{t("analysis.from")}</label>
          <input type="date" id="mFrom" className={dateControl} value={draft.from} onChange={(e) => setDraft({ ...draft, from: e.target.value })} />
        </div>
        <div className={field}>
          <label htmlFor="mTo" className={fieldLabel}>{t("analysis.to")}</label>
          <input type="date" id="mTo" className={dateControl} value={draft.to} onChange={(e) => setDraft({ ...draft, to: e.target.value })} />
        </div>
        <button type="submit" className={cx(btnPrimary, "col-span-2 sm:col-span-1")}>{t("common:action.apply")}</button>
        <div className={field}>
          <label htmlFor="mWin" className={fieldLabel}>{t("analysis.measureFrom")}</label>
          <select id="mWin" className={control} value={w} onChange={(e) => setW(Number(e.target.value) as Window)}>
            {WINDOWS.map((x) => <option key={x} value={x}>{t("analysis.minBefore", { n: x })}</option>)}
          </select>
        </div>
        <div className={field}>
          <label htmlFor="mMetric" className={fieldLabel}>{t("analysis.hitIs")}</label>
          <select id="mMetric" className={control} value={metric} onChange={(e) => setMetric(e.target.value as "win" | "place")}>
            <option value="win">{t("analysis.win")}</option>
            <option value="place">{t("analysis.place")}</option>
          </select>
        </div>
        <span className={rangeMeta}>{data ? t("analysis.meta", { races: t("common:races", { count: data.races }), n: measured.length }) : t("common:state.loading")}</span>
      </form>
      {error && <div className={errorBox}>{error}</div>}

      {data && data.races === 0 ? (
        <div className={cx(panel, empty)}>{t("analysis.noRaces")}</div>
      ) : (
        <>
          <div className={kpis}>
            <Kpi label={t("analysis.steamers", { metric: metricLabel })} value={pc(hit(steam))} sub={t("analysis.impliedSub", { p: pc(implied(steam)), n: steam.n })} tone={cls(edge(steam))} />
            <Kpi label={t("analysis.steamerEdge")} value={signed(edge(steam))} sub={t("analysis.edgeSub")} tone={cls(edge(steam))} />
            <Kpi label={t("analysis.drifters", { metric: metricLabel })} value={pc(hit(drift))} sub={t("analysis.impliedSub", { p: pc(implied(drift)), n: drift.n })} tone={cls(edge(drift))} />
            <Kpi label={t("analysis.steamerRoi")} value={signed(steam.winRoi)} sub={t("analysis.roiSub")} tone={cls(steam.winRoi)} />
          </div>

          <div className={cx(grid2, "mt-4")}>
            <div className={panel}>
              <Legend items={[[C.accent, t("analysis.actual")], [C.muted, t("analysis.implied")]]} />
              <GroupedBars rows={buckets} labelOf={(b) => t(`bucket.${b.key as Bucket}`)} series={bars} max={max} />
              <div className={note}>{t("analysis.barsNote")}</div>
            </div>
            <div className={panel}>
              <div className={scroll}>
              <table className={cx(table, tablePadTight)}>
                <thead>
                  <tr><th>{t("analysis.bucket")}</th><th>{t("analysis.n")}</th><th>{t("analysis.hit")}</th><th>{t("analysis.impliedH")}</th><th>{t("analysis.edge")}</th><th>{t("analysis.winRoi")}</th></tr>
                </thead>
                <tbody>
                  {buckets.map((b) => (
                    <tr key={b.key} className={b.n < MIN_N ? dim : ""}>
                      <td>{t(`bucket.${b.key as Bucket}`)}</td>
                      <td>{b.n}</td>
                      <td>{pc(hit(b))}</td>
                      <td>{pc(implied(b))}</td>
                      <td className={cls(edge(b))}>{signed(edge(b))}</td>
                      <td className={cls(b.winRoi)}>{signed(b.winRoi)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
              <div className={note}>{t("analysis.greyNote", { n: MIN_N })}</div>
            </div>
          </div>

          <H2 sub={t("analysis.byOddsSub")}>{t("analysis.byOdds")}</H2>
          <div className={panel}>
            <div className={scroll}>
            <table className={cx(table, tablePad)}>
              <thead>
                <tr><th>{t("analysis.finalOdds")}</th>{BUCKETS.map((b) => <th key={b}>{t(`bucket.${b}`)}</th>)}</tr>
              </thead>
              <tbody>
                {bands.map(({ band, cells }) => (
                  <tr key={band}>
                    <td>{band}</td>
                    {cells.map((c) => (
                      <td key={c.key} className={c.n < MIN_N ? dim : cls(edge(c))} title={t("analysis.cellTitle", { hit: pc(hit(c)), implied: pc(implied(c)) })}>
                        {c.n ? signed(edge(c)) : "–"} <small className={dim}>{t("common:unit.n", { n: c.n })}</small>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </>
      )}
    </>
  );
}
