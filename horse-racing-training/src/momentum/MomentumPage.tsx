// Market momentum: live pre-race odds movement (server polls HKJC every 30 s inside the
// 30-min window) and, over settled races, whether that movement predicts the result.
import { Fragment, useEffect, useMemo, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { api, type MomentumDay, type MomentumDayRef } from "../api";
import {
  type RaceSeries, type HorseRow, type Window, type BucketStats, type Mover, type ModelRank, type Bucket,
  WINDOWS, bucketOf, bucketRange, byMoveRange, bettableSteamers, moveBetween, MODEL_PICKS, MOVE_PICKS, TRIO_UNIT, PLACE_SURGE, PLACE_MAX, RECENT_SECS, CUTOFF_MINUTES, cutAt, isCutoff, choose3, movers, placeResult, placeSurges, suggestPicks, pickResults, byBucket, stats,
} from "../../shared/momentum/model";
import { C, EdgeChart, GroupedBars, type Series } from "../analyzer/charts";
import { Kpi, Legend, SortTh, cls, pc, signed, useSort } from "../analyzer/format";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import { useGlossary } from "../i18n/glossary";
import { useFmt, useLanguage } from "../i18n/useLanguage";
import { OddsChart, Swatch, horseStyle, useRunnerNames } from "./OddsChart";
import { DaySummary } from "./DaySummary";
import { HorseLink } from "./HorseRecord";
import { CutoffContext, cutoffLabel, useCutoff, useStoredCutoff } from "./cutoff";
import { track } from "../analytics";
import { RaceAnalysisPanel } from "../RaceAnalysisPanel";
import {
  Display, H2, btn, dateControl, btnPrimary, control, cx, dim, empty, errorBox, field, fieldLabel, figure, grid2, h3, kpis, modal, modalBg, note, page, panel,
  pill, pillRow, rangeBar, rangeMeta, scroll, seg, segBtn, strong, table, tablePad, tablePadTight,
} from "../kit";

const REFRESH_MS = 30_000;
/** Pseudo race id for the racing-day review tab. */
const SUMMARY = "summary";

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
/** both = in the model and market-move lists; marketOnly = market-move list only (not the model's top N). */
/** `steam`: Place chips get a border by their Last 5m bucket — green = Steam, red = Strong steam. */
const chipCls = (both: boolean, on: boolean, marketOnly = false, steam: Bucket | null = null) =>
  cx(
    chipBase,
    on ? "bg-accent-soft ring-1 ring-accent"
      : both ? "bg-surface ring-1 ring-ink"
      : marketOnly ? "bg-surface ring-1 ring-warn"
      : steam === "Strong steam" ? "bg-surface ring-2 ring-bad"
      : steam === "Steam" ? "bg-surface ring-2 ring-good"
      : "bg-surface"
  );
const chipOdds = "-ml-[3px] text-ink-3 tabular-nums";
const chipDetail = "text-ink-2 tabular-nums";
/** Dividend pools in HKJC results-page order; ordered pools print their combination with ">". */
const POOL_ORDER = ["WIN", "PLA", "QIN", "QPL", "FCT", "TCE", "TRI", "FF", "QTT"] as const;
const ORDERED_POOLS = new Set<string>(["FCT", "TCE", "QTT"]);
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

/**
 * Shareable state in the URL: ?tab=momentum&day=YYYY-MM-DD&race=N|summary&cutoff=−5…5.
 * Read once on load; kept in sync with replaceState (switching races doesn't add history entries).
 */
const urlParams = () => new URLSearchParams(window.location.search);
const URL_DAY = (() => {
  const d = urlParams().get("day");
  return d && /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : "";
})();
const URL_RACE = urlParams().get("race") ?? "";
function writeUrl(day: string, race: string, cutoff: number) {
  const url = new URL(window.location.href);
  if (url.searchParams.get("tab") !== "momentum") return; // page left meanwhile
  url.searchParams.set("day", day);
  if (race) url.searchParams.set("race", race);
  else url.searchParams.delete("race");
  url.searchParams.set("cutoff", String(cutoff));
  if (url.href !== window.location.href) window.history.replaceState(window.history.state, "", url);
}

export function MomentumPage() {
  const { t } = useTranslation(["momentum", "common"]);
  const { t: tc } = useTranslation();
  const f = useMoFmt();
  const g = useGlossary();
  const [days, setDays] = useState<{ today: string; days: MomentumDayRef[] } | null>(null);
  const [day, setDay] = useState(URL_DAY); // "" = default racing day (see below)
  const [cutoff, setCutoff] = useStoredCutoff();

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
        <Display>{t("title")}</Display>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:pb-2">
        <div className={cx(field, "w-full sm:w-auto")}>
          <label htmlFor="mCutoff" className={fieldLabel} title={t("cutoff.hint")}>{t("cutoff.label")}</label>
          <select
            id="mCutoff"
            className={cx(control, "w-full sm:w-auto")}
            value={cutoff}
            title={t("cutoff.hint")}
            onChange={(e) => {
              const v = Number(e.target.value);
              if (isCutoff(v)) setCutoff(v);
            }}
          >
            {CUTOFF_MINUTES.map((m) => (
              <option key={m} value={m}>{cutoffLabel(t, m)}</option>
            ))}
          </select>
        </div>
        <div className={cx(field, "w-full sm:w-auto")}>
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
      </div>
      <CutoffContext.Provider value={cutoff}>
      {date ? (
        <LivePanel key={date} date={date} isToday={isToday} initialRace={date === URL_DAY ? URL_RACE : ""} />
      ) : (
        days && <div className={cx(panel, empty, "mt-6")}>{t("noDaysYet")}</div>
      )}
      </CutoffContext.Provider>
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

function LivePanel({ date, isToday, initialRace }: { date: string; isToday: boolean; initialRace: string }) {
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
  // ?race= from a shared link (number or "summary"), then: today's meeting → next race; any other day → Summary.
  const fromUrl = initialRace === SUMMARY ? SUMMARY : races.find((r) => String(r.race_no) === initialRace)?.race_id;
  const selected = raceId || fromUrl || (isToday ? next?.race_id : races.length ? SUMMARY : "") || "";
  const summary = selected === SUMMARY;
  const raceSel = summary ? "" : selected; // race-specific loads skip the Summary view

  useEffect(() => {
    if (!raceSel) return;
    let live = true;
    const load = () => api.momentumRace(raceSel).then((s) => live && setSeries(s)).catch((e) => live && setError(String(e)));
    load();
    const t = isToday ? setInterval(load, REFRESH_MS) : undefined;
    return () => {
      live = false;
      clearInterval(t);
    };
  }, [raceSel, isToday]);

  // Analyzer ranking for the selected race (computed once per race server-side).
  const [model, setModel] = useState<{ raceId: string; ranks: ModelRank[] | null; error?: string } | null>(null);
  useEffect(() => {
    if (!raceSel) return;
    let live = true;
    setModel({ raceId: raceSel, ranks: null });
    api
      .momentumPicks(raceSel)
      .then((r) => live && setModel({ raceId: raceSel, ranks: r.ranks }))
      .catch((e) => live && setModel({ raceId: raceSel, ranks: null, error: String(e instanceof Error ? e.message : e) }));
    return () => {
      live = false;
    };
  }, [raceSel]);
  const modelHere = model?.raceId === selected ? model : null;

  // Per-race outcome of the suggestions (same cut-off as the picks) for the race pills: ★ gold = Trio box hit,
  // ★ green = Place picks returned more than they cost.
  const cutoff = useCutoff();
  useEffect(() => {
    if (!selected) return;
    writeUrl(date, selected === SUMMARY ? SUMMARY : String(races.find((r) => r.race_id === selected)?.race_no ?? ""), cutoff);
  }, [date, selected, cutoff, races]);
  const [outcome, setOutcome] = useState<Map<string, { trio: boolean; place: boolean }>>(new Map());
  useEffect(() => {
    let live = true;
    const load = () =>
      api
        .momentumSummary(date, cutoff)
        .then((s) => live && setOutcome(new Map(s.races.filter((r) => r.status === "result").map((r) => [r.raceId, { trio: !!r.combined?.trio, place: r.placeReturn != null && r.placeReturn > r.placeCost }]))))
        .catch(() => live && setOutcome(new Map()));
    load();
    const timer = isToday ? setInterval(load, 60_000) : undefined;
    return () => {
      live = false;
      clearInterval(timer);
    };
  }, [date, cutoff, isToday]);

  const race = races.find((r) => r.race_id === selected);
  const secsToPost = race?.post_time ? (Date.parse(race.post_time) - now) / 1000 : NaN;
  const upcomingDay = races.length > 0 && races.every((r) => !r.post_time);
  // Chart + movers show the race as of the cut-off (same odds the picks use); Records still lists every
  // snapshot, and clicking one opens the race as it stood then.
  const view = useMemo(() => (series ? cutAt(series, cutoff) : null), [series, cutoff]);
  const lastPt = view?.points[view.points.length - 1];
  const truncated = !!series && !!view && view.points.length < series.points.length;

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
            const o = outcome.get(r.race_id);
            return (
              <button key={r.race_id} className={cx(pill(sel), "flex-none")} onClick={() => setRaceId(r.race_id)} title={t("snapshots", { count: r.snapshots })}>
                {t("common:raceShort", { n: r.race_no })} <small className={sel ? "text-xs font-normal text-white/70" : "text-xs font-normal text-ink-3"}>{r.post_time ? f.hm(r.post_time) : ""}</small>
                {on && <i className="size-[7px] animate-pulse rounded-full bg-good motion-reduce:animate-none" aria-label={t("polling")} />}
                {r.status === "settled" && <small className={cx(dim, "text-xs")}>✓</small>}
                {o?.trio && <span className={cx("text-xs leading-none", sel ? "text-[#f5c542]" : "text-[#c99300]")} title={t("pillTrio")} aria-label={t("pillTrio")}>★</span>}
                {o?.place && <span className={cx("text-xs leading-none", sel ? "text-[#6fdca0]" : "text-good")} title={t("pillPlace")} aria-label={t("pillPlace")}>★</span>}
              </button>
            );
          })}
          <button className={cx(pill(summary), "flex-none")} onClick={() => { track("open_day_summary", { date }); setRaceId(SUMMARY); }} aria-pressed={summary}>
            {t("summary.tab")}
          </button>
        </nav>
      )}
      {summary && <DaySummary date={date} live={isToday} onOpenRace={(id) => setRaceId(id)} />}
      {/* this day's buckets at the cut-off, then the cross-day momentum vs hit-rate study: Summary tab only */}
      {summary && <DayBuckets date={date} />}
      {summary && <AnalysisPanel />}

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
                {truncated ? t("snapshotsOf", { n: view!.points.length, count: series.points.length }) : t("snapshots", { count: series.points.length })}
                {truncated ? ` · ${t("cutoff.asOf", { when: cutoffLabel(t, cutoff) }).replace(/^·\s*/, "")}` : ""}
                {lastPt?.winPool ? ` · ${t("winPoolMeta", { amount: `$${Math.round(lastPt.winPool).toLocaleString()}` })}` : ""}
              </span>
            </div>
            <OddsChart series={view!} focus={focus} onFocus={setFocus} />
            <div className={note}>{t("chartNote")}</div>
          </div>
          </div>

          <MoversTable
            series={view!}
            focus={focus}
            onFocus={setFocus}
            stamp={lastPt && <span title={lastPt.fetchedAt}>{t("lastUpdate", { time: f.clock(lastPt.fetchedAt), ago: f.ago(lastPt.fetchedAt, now) })}</span>}
          />
        </div>
      )}
      {/* pre-race model analysis (same panel as the Bet page), collapsed, above the odds records */}
      {race && <RaceAnalysisPanel date={date.replace(/-/g, "")} venue={race.venue} raceNo={race.race_no} />}
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
  const codes = useMemo(() => new Map(series.runners.map((r) => [r.horseNo, r.code ?? null])), [series.runners]);
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
      {/* scrolls inside the panel (as tall as the race chart on lg; capped on phones), header stays put */}
      <div className="max-h-[420px] min-h-0 flex-1 overflow-auto lg:max-h-none">
      <table
        className={cx(
          table,
          tablePadTight,
          "[&_th]:z-10",
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
              <td><HorseLink raceId={series.raceId} horseNo={m.horseNo} code={codes.get(m.horseNo)} name={nameOf(m.horseNo, m.name)} /></td>
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

function PickChip({ horseNo, name, odds, oddsTitle, detail, both, marketOnly, steam, struck, fin, focus, onFocus }: {
  horseNo: number; name: string; odds?: number | null; oddsTitle?: string; detail?: ReactNode; struck?: boolean; both?: boolean; marketOnly?: boolean; steam?: Bucket | null; fin?: number | null; focus: number | null; onFocus: (h: number | null) => void;
}) {
  const { t } = useTranslation(["momentum", "common"]);
  return (
    <span
      className={cx(chipCls(!!both, focus === horseNo, !!marketOnly, steam), struck && "text-ink-3")}
      title={[name, struck && t("picks.drifted"), steam && steam !== "Flat" && t(`bucket.${steam}`)].filter(Boolean).join(" · ")}
      onMouseEnter={() => onFocus(horseNo)}
      onMouseLeave={() => onFocus(null)}
    >
      <Swatch {...horseStyle(horseNo)} className="w-3.5" />
      {/* struck = Strong drift: shown, but left out of Combined */}
      <span className={cx("inline-flex items-center gap-[inherit]", struck && "line-through decoration-bad decoration-2")}>
        <b>{horseNo}</b>
        {odds != null && <span className={chipOdds} title={oddsTitle ?? t("picks.currentOdds")}>({odds})</span>}
        {detail && <span className={chipDetail}>{detail}</span>}
      </span>
      {fin != null && <span className={cx("border-l border-edge pl-[5px] text-[11px]", fin <= 3 ? "font-semibold text-good" : "text-ink-3")}>{ordinal(t, fin)}</span>}
    </span>
  );
}

/**
 * "Suggested picks" from the cut-off onwards (and for good after): the text burns with a moving
 * fire gradient and a flickering 🔥. With reduced motion: static fire colours, no movement.
 */
function FireTitle({ children }: { children: ReactNode }) {
  const still = useReducedMotion();
  return (
    <span className="relative isolate inline-flex items-baseline gap-1">
      <motion.span
        aria-hidden
        className="inline-block"
        animate={still ? undefined : { scale: [1, 1.25, 0.95, 1.15, 1], rotate: [0, -8, 6, -4, 0], opacity: [1, 0.85, 1, 0.9, 1] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
      >
        🔥
      </motion.span>
      <motion.span
        className="bg-[linear-gradient(90deg,#c92a2a,#f76707,#fcc419,#f76707,#c92a2a)] bg-[length:200%_100%] bg-clip-text text-transparent"
        animate={still ? undefined : { backgroundPosition: ["0% 50%", "200% 50%"] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
      >
        {children}
      </motion.span>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -inset-x-1 -inset-y-0.5 -z-10 rounded-md bg-[#ff922b]/25 blur-md"
        animate={still ? undefined : { opacity: [0.2, 0.7, 0.3, 0.6, 0.2] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </span>
  );
}

/** Full-width section above the chart + movers: the picks (left) and how they did (right on lg). */
function SuggestedPicks({ model, series, focus, onFocus, className }: {
  model: ModelState; series: RaceSeries; focus: number | null; onFocus: (h: number | null) => void; className?: string;
}) {
  const { t } = useTranslation(["momentum", "common"]);
  const cutoff = useCutoff();
  // Picks see only the odds recorded up to the cut-off; results below are the final ones.
  const cut = useMemo(() => cutAt(series, cutoff), [series, cutoff]);
  const mv = useMemo(() => movers(cut), [cut]);
  const fin = useMemo(() => new Map(series.results.map((r) => [r.horseNo, r.finishPos])), [series.results]);
  const nameOf = useRunnerNames(series);
  const picks = suggestPicks(model?.ranks ?? [], mv);
  const place = useMemo(() => placeSurges(cut), [cut]);
  // Ready to bet: from the cut-off onwards the picks are final. Lights up at the cut-off and stays lit.
  const now = useNow();
  const post = series.postTime ? Date.parse(series.postTime) : NaN;
  const ready = now >= post + cutoff * 60_000;
  const result = pickResults(picks, series.results, series.dividends);
  const divOf = (pool: string) => result?.dividends.filter((d) => d.pool === pool) ?? [];
  // Place picks at $10 each: cost, and the PLA dividends of the ones that placed (null until paid).
  const { cost: placeCost, return: placeReturn } = placeResult(place.map((p) => p.horseNo), series.dividends);
  const span = cut.points.length ? cut.points[0]!.secsToPost - cut.points[cut.points.length - 1]!.secsToPost : 0;
  // Every runner in finishing order; scratched / did not finish (no position) last.
  const order = [...series.results].sort((a, b) => (a.finishPos ?? 99) - (b.finishPos ?? 99) || a.horseNo - b.horseNo);
  // Collapsed: first three only (dead-heats included). Collapses again when the race changes.
  const [allRunners, setAllRunners] = useState(false);
  useEffect(() => setAllRunners(false), [series.raceId]);
  const shown = allRunners ? order : order.filter((r) => r.finishPos != null && r.finishPos <= 3);
  const pools = POOL_ORDER.filter((p) => divOf(p).length);
  // Within a pool, combinations in finishing order (e.g. Place: 1st, 2nd, 3rd).
  const posOf = new Map(series.results.map((r) => [String(r.horseNo), r.finishPos ?? 99]));
  const combRank = (comb: string) => comb.split(",").reduce((a, h) => a + (posOf.get(h) ?? 99), 0);
  const divsOf = (pool: string) => [...divOf(pool)].sort((a, b) => combRank(a.comb) - combRank(b.comb));
  const off = series.postTime != null && Date.parse(series.postTime) <= Date.now();
  const odds = new Map(mv.map((m) => [m.horseNo, m.now]));
  const chip = { focus, onFocus };
  const f = (h: number) => (fin.size ? fin.get(h) ?? null : undefined);

  return (
    <section className={cx(panel, "grid gap-x-8 lg:grid-cols-2", className)}>
      <div className="min-w-0">
      <h3 className={cx(h3, "mb-2")}>
        {ready ? <FireTitle>{t("picks.title")}</FireTitle> : t("picks.title")}{" "}
        <span className="font-sans text-xs text-ink-3">{t("cutoff.asOf", { when: cutoffLabel(t, cutoff) })}</span>
      </h3>
      <div className={pickRow}>
        <span className={pickLbl}>{t("picks.modelTop", { n: MODEL_PICKS })}</span>
        <div className={chips}>
          {model?.error ? (
            <span className={dim} title={model.error}>{t("picks.analyzerUnavailable")}</span>
          ) : !model?.ranks ? (
            <span className={dim}>{t("picks.runningAnalyzer")}</span>
          ) : (
            picks.model.map((r) => <PickChip key={r.horseNo} horseNo={r.horseNo} name={nameOf(r.horseNo, r.name)} odds={odds.get(r.horseNo)} detail={pc(100 * r.winProb)} struck={picks.drifted.includes(r.horseNo)} fin={f(r.horseNo)} {...chip} />)
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
        <span className={cx(pickLbl, "font-semibold text-ink")}>
          {t("picks.combined", { n: picks.combined.length })}
          {/* same stars as the race pills: gold = Trio box hit */}
          {result?.lists[2]?.trio && <span className="ml-1 text-[#c99300]" title={t("pillTrio")} aria-label={t("pillTrio")}>★</span>}
        </span>
        <div className={chips}>
          {picks.combined.map((c) => (
            <PickChip key={c.horseNo} horseNo={c.horseNo} name={nameOf(c.horseNo, c.name)} odds={odds.get(c.horseNo)} both={c.inModel && c.inMove} marketOnly={c.inMove && !c.inModel} fin={f(c.horseNo)} {...chip} />
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
      <div className={cx(pickRow, "mt-1 border-t border-edge pt-3")}>
        <span className={cx(pickLbl, "font-semibold text-ink")} title={t("picks.placeT", { pct: 100 * PLACE_SURGE, max: PLACE_MAX })}>
          {t("picks.place", { pct: 100 * PLACE_SURGE, max: PLACE_MAX })}
          {/* green = Place picks returned more than they cost */}
          {place.length > 0 && placeReturn != null && placeReturn > placeCost && <span className="ml-1 text-good" title={t("pillPlace")} aria-label={t("pillPlace")}>★</span>}
        </span>
        <div className={chips}>
          {place.length ? (
            place.map((p) => (
              <PickChip
                key={p.horseNo}
                horseNo={p.horseNo}
                name={nameOf(p.horseNo, p.name)}
                odds={p.now}
                steam={bucketOf(p.change)}
                detail={<span className="text-good" title={t("picks.placeFrom", { before: p.before, now: p.now, pla: p.placeNow ?? "–" })}>{signed(100 * p.change)}</span>}
                fin={f(p.horseNo)}
                {...chip}
              />
            ))
          ) : (
            <span className={dim}>{span < RECENT_SECS ? t("picks.placeNeeds5") : t("picks.placeNone", { pct: 100 * PLACE_SURGE })}</span>
          )}
        </div>
      </div>
      {place.length > 0 && (
        <div className={pickRow}>
          <span className={cx(pickLbl, "hidden sm:block")} />
          <span className="text-[12.5px] text-ink-2 tabular-nums">
            {t("picks.placeBet", { n: place.length, unit: TRIO_UNIT })} <b className="text-ink">${placeCost.toLocaleString()}</b>
            {placeReturn != null && (
              <>
                {" · "}{t("picks.placeReturn")}{" "}
                <b className={placeReturn > placeCost ? "text-good" : "text-bad"}>${placeReturn.toLocaleString()}</b>
              </>
            )}
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
            {!result.complete && <div className="text-xs text-ink-2">{t("result.placingsSoFar")}</div>}
            <div className={cx(scroll, "mt-1")}>
              <table className={cx(table, "text-[12.5px] [&_td]:px-2 [&_td]:py-1.5 [&_th]:px-2 [&_th]:py-1.5 [&_td:nth-child(3)]:text-left [&_th:nth-child(3)]:text-left")}>
                <thead>
                  <tr>
                    <th>{t("common:word.placing")}</th>
                    <th>#</th>
                    <th>{t("common:word.horse")}</th>
                    <th title={t("result.finalOddsT")}>{t("result.finalOdds")}</th>
                  </tr>
                </thead>
                <tbody>
                  {shown.map((r) => {
                    const top = r.finishPos != null && r.finishPos <= 3;
                    return (
                      <tr
                        key={r.horseNo}
                        onMouseEnter={() => onFocus(r.horseNo)}
                        onMouseLeave={() => onFocus(null)}
                        className={cx(top && "font-semibold", focus === r.horseNo ? "[&_td]:bg-accent-soft" : top && "[&_td]:bg-good-soft", r.finishPos == null && dim)}
                      >
                        <td className={top ? "text-good" : "text-ink-2"}>{r.finishPos == null ? "–" : top ? ordinal(t, r.finishPos) : r.finishPos}</td>
                        <td className="tabular-nums"><Swatch {...horseStyle(r.horseNo)} className="w-3.5" />{r.horseNo}</td>
                        <td className="max-w-[180px] truncate">{nameOf(r.horseNo)}</td>
                        <td className="tabular-nums">{r.sp ?? "–"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {order.length > shown.length || allRunners ? (
              <button type="button" className="mt-1.5 cursor-pointer text-xs text-accent hover:underline" onClick={() => setAllRunners((v) => !v)} aria-expanded={allRunners}>
                {allRunners ? t("result.showTop3") : t("result.showAll", { n: order.length })}
              </button>
            ) : null}
            <div className="mt-3 text-xs text-ink-2">{t("result.dividends")} <span className={dim}>{t("result.per10")}</span></div>
            {pools.length ? (
              <dl className="mt-1.5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-[12.5px]">
                {pools.map((pool) => (
                  <Fragment key={pool}>
                    <dt className={cx("text-ink-2", pool === "TRI" && "font-semibold text-ink")}>{t(`result.pool.${pool}`)}</dt>
                    <dd className="flex flex-wrap gap-x-3 gap-y-0.5 tabular-nums">
                      {divsOf(pool).map((d) => (
                        <span key={d.comb}>
                          <b>{d.comb.replaceAll(",", ORDERED_POOLS.has(pool) ? ">" : "-")}</b>{" "}
                          <span className={pool === "TRI" ? cx(figure, "ml-0.5 text-[18px] text-ink") : "text-ink-2"}>${d.div.toLocaleString()}</span>
                        </span>
                      ))}
                    </dd>
                  </Fragment>
                ))}
              </dl>
            ) : (
              <p className={cx(dim, "mt-1.5 text-[12.5px]")}>{t("result.divWaiting")}</p>
            )}
            {!divOf("TRI").length && pools.length > 0 && <p className={cx(dim, "mt-1 text-[12.5px]")}>{t("result.trioWaiting")}</p>}
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
  const [betAt, setBetAt] = useState<Window>(1);
  const [venue, setVenue] = useState<"all" | "ST" | "HV">("all");
  /** The steamer list modal (opened by clicking a tile). */
  /** The runner list modal: the steamers (cards) or one table row. */
  const [picksOf, setPicksOf] = useState<{ title: string; rows: HorseRow[] } | null>(null);
  const [metric, setMetric] = useState<"win" | "place">("win");
  const [data, setData] = useState<{ races: number; rows: HorseRow[] } | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.momentumAnalysis(range.from, range.to).then(setData).catch((e) => setError(String(e)));
  }, [range]);

  const rows = useMemo(() => (data?.rows ?? []).filter((r) => venue === "all" || r.venue === venue), [data, venue]);
  const races = useMemo(() => new Set(rows.map((r) => r.raceId)).size, [rows]);
  // Bet time must be after the measure-from checkpoint (smaller = closer to/after post).
  const betWhen: Window = betAt < w ? betAt : (WINDOWS.find((x) => x < w) ?? w);
  // Everything here groups runners by their move from Measure from to Bet at — odds known when you'd bet.
  const buckets = useMemo(() => byBucket(rows, (r) => moveBetween(r, w, betWhen)), [rows, w, betWhen]);
  const placeRanges = useMemo(() => byMoveRange(rows, (r) => moveBetween(r, w, betWhen)), [rows, w, betWhen]);
  const measured = rows.filter((r) => moveBetween(r, w, betWhen) != null);
  // Steamers as you could have backed them: up ≥10% from Measure from to Bet at, odds known by then.
  const steamRows = bettableSteamers(rows, w, betWhen);
  const steam = stats("steam", steamRows);
  /** "10 min before" / "At post" / "3 min after" */
  const windowLabel = (x: number) => (x > 0 ? t("analysis.minBefore", { n: x }) : x === 0 ? t("analysis.atPost") : t("analysis.minAfter", { n: -x }));

  const hit = (b: BucketStats) => (metric === "win" ? b.winPct : b.placePct);
  const implied = (b: BucketStats) => (metric === "win" ? b.impliedWinPct : b.impliedPlacePct);
  const edge = (b: BucketStats) => (metric === "win" ? b.winEdge : b.placeEdge);
  const bars: Series<BucketStats>[] = [
    { name: t("analysis.actual"), color: C.accent, get: hit },
    { name: t("analysis.implied"), color: C.muted, get: implied },
  ];
  const metricLabel = metric === "win" ? t("analysis.metricWin") : t("analysis.metricPlace");
  const from = windowLabel(w), to = windowLabel(betWhen);
  const openPicks = () => setPicksOf({ title: t("analysis.picksTitle"), rows: steamRows });
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
            {WINDOWS.map((x) => <option key={x} value={x}>{windowLabel(x)}</option>)}
          </select>
        </div>
        <div className={field}>
          <label htmlFor="mBetAt" className={fieldLabel}>{t("analysis.betAt")}</label>
          <select id="mBetAt" className={control} value={betWhen} onChange={(e) => setBetAt(Number(e.target.value) as Window)}>
            {WINDOWS.filter((x) => x < w).map((x) => <option key={x} value={x}>{windowLabel(x)}</option>)}
          </select>
        </div>
        <div className={field}>
          <label htmlFor="mVenue" className={fieldLabel}>{t("analysis.venue")}</label>
          <select id="mVenue" className={control} value={venue} onChange={(e) => setVenue(e.target.value as "all" | "ST" | "HV")}>
            <option value="all">{t("analysis.venueAll")}</option>
            <option value="ST">{t("common:venue.ST")}</option>
            <option value="HV">{t("common:venue.HV")}</option>
          </select>
        </div>
        <div className={field}>
          <label htmlFor="mMetric" className={fieldLabel}>{t("analysis.hitIs")}</label>
          <select id="mMetric" className={control} value={metric} onChange={(e) => setMetric(e.target.value as "win" | "place")}>
            <option value="win">{t("analysis.win")}</option>
            <option value="place">{t("analysis.place")}</option>
          </select>
        </div>
        <span className={rangeMeta}>{data ? t("analysis.meta", { races: t("common:races", { count: races }), n: measured.length }) : t("common:state.loading")}</span>
      </form>
      {error && <div className={errorBox}>{error}</div>}

      {data && races === 0 ? (
        <div className={cx(panel, empty)}>{t("analysis.noRaces")}</div>
      ) : (
        <>
          <div className={kpis}>
            <Kpi
              label={t("analysis.steamers", { metric: metricLabel })}
              value={steam.n ? pc(hit(steam)) : "–"}
              sub={t("analysis.impliedSub", { p: pc(implied(steam)), n: steam.n })}
              tone={steam.n ? cls(edge(steam)) : ""}
              info={t("analysis.steamersInfo", { from, to, metric: metricLabel })}
              onClick={openPicks}
            />
            <Kpi
              label={t("analysis.steamerEdge")}
              value={steam.n ? pts(edge(steam)) : "–"}
              sub={t("analysis.spanSub", { from, to, n: steam.n })}
              tone={steam.n ? cls(edge(steam)) : ""}
              info={t("analysis.steamerEdgeInfo", { metric: metricLabel })}
              onClick={openPicks}
            />
            <Kpi
              label={t("analysis.steamerRoi")}
              value={steam.n ? signed(steam.winRoi) : "–"}
              sub={t("analysis.betsSub", { n: steam.n, hit: pc(steam.winPct) })}
              tone={steam.n ? cls(steam.winRoi) : ""}
              info={t("analysis.winRoiInfo", { from, to })}
              onClick={openPicks}
            />
            <Kpi
              label={t("analysis.steamerPlaceRoi")}
              value={steam.placeBets ? signed(steam.placeRoi) : "–"}
              sub={t("analysis.placeBetsSub", { n: steam.placeBets, hit: pc(steam.placePct) })}
              tone={steam.placeBets ? cls(steam.placeRoi) : ""}
              info={t("analysis.placeRoiInfo", { from, to })}
              onClick={openPicks}
            />
          </div>
          {picksOf && (
            <PicksModal
              title={picksOf.title}
              rows={picksOf.rows}
              from={w}
              to={betWhen}
              span={t("analysis.moveSpan", { from, to })}
              onClose={() => setPicksOf(null)}
            />
          )}

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
                  <tr><th>{t("analysis.bucket")}</th><th>{t("analysis.n")}</th><th>{t("analysis.hit")}</th><th>{t("analysis.impliedH")}</th><th>{t("analysis.edge")}</th><th>{t("analysis.winRoi")}</th><th>{t("analysis.placeRoi")}</th></tr>
                </thead>
                <tbody>
                  {buckets.map((b) => (
                    <tr
                      key={b.key}
                      className={cx(b.n < MIN_N && dim, b.n > 0 && "cursor-pointer")}
                      onClick={b.n ? () => setPicksOf({ title: `${t(`bucket.${b.key as Bucket}`)} ${bucketRange(b.key as Bucket)}`, rows: b.rows }) : undefined}
                      title={b.n ? t("analysis.rowHint") : undefined}
                    >
                      <td className="whitespace-nowrap">
                        {t(`bucket.${b.key as Bucket}`)} <small className={dim}>{bucketRange(b.key as Bucket)}</small>
                      </td>
                      <td>{b.n}</td>
                      <td>{pc(hit(b))}</td>
                      <td>{pc(implied(b))}</td>
                      <td className={cls(edge(b))}>{pts(edge(b))}</td>
                      <td className={cls(b.winRoi)}>{signed(b.winRoi)}</td>
                      <td className={cls(b.placeRoi)}>{signed(b.placeRoi)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
              <div className={note}>{t("analysis.greyNote", { n: MIN_N })}</div>
            </div>
          </div>

          <H2 sub={t("analysis.placeEdgeSub", { from, to })}>{t("analysis.placeEdge")}</H2>
          <div className={cx(panel, "mt-4")}>
            <Legend items={[[C.accent, t("analysis.placedActual")], [C.muted, t("analysis.implied")]]} />
            <EdgeChart
              rows={placeRanges}
              labelOf={(g) => g.key}
              tickOf={(g) => g.key.replace(/ ~ .*$/, "").replace(/\s/g, "")}
              hit={(g) => g.placePct}
              implied={(g) => g.impliedPlacePct}
              color={C.accent}
              hitName={t("analysis.placedActual")}
              impliedName={t("analysis.implied")}
              edgeName={t("analysis.edge")}
              onSelect={(i) => setPicksOf({ title: `${t("analysis.move")} ${placeRanges[i]!.key}`, rows: placeRanges[i]!.rows })}
            />
            <div className={note}>{t("analysis.placeEdgeNote")}</div>
          </div>
        </>
      )}
    </>
  );
}

/** Measure-from checkpoint for the racing-day bucket table, in minutes before post. */
const DAY_FROM: Window = 5;

/** One racing day's runners by momentum bucket, moves measured from 5 min before post to the "Suggestions as of" cut-off. */
function DayBuckets({ date }: { date: string }) {
  const { t } = useTranslation(["momentum", "common"]);
  const cutoff = useCutoff();
  const [picksOf, setPicksOf] = useState<{ title: string; rows: HorseRow[] } | null>(null);
  const [data, setData] = useState<{ date: string; rows: HorseRow[] } | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let live = true;
    api.momentumAnalysis(date, date).then((d) => live && setData({ date, rows: d.rows })).catch((e) => live && setError(String(e)));
    return () => {
      live = false;
    };
  }, [date]);

  // Cut-off counts minutes from post (− = before); a Window counts minutes before post (+ = before).
  const betAt = -cutoff as Window;
  const rows = useMemo(() => (data?.date === date ? data.rows : []), [data, date]);
  const buckets = useMemo(() => (betAt < DAY_FROM ? byBucket(rows, (r) => moveBetween(r, DAY_FROM, betAt)) : []), [rows, betAt]);
  const races = new Set(rows.map((r) => r.raceId)).size;
  const span = t("analysis.moveSpan", { from: t("analysis.minBefore", { n: DAY_FROM }), to: cutoffLabel(t, cutoff) });

  if (error) return <div className={errorBox}>{error}</div>;
  if (!data) return null;
  return (
    <div className={cx(panel, "mt-4")}>
      {races === 0 ? (
        <div className={empty}>{t("analysis.dayNone")}</div>
      ) : betAt >= DAY_FROM ? (
        <div className={empty}>{t("analysis.dayTooEarly", { n: DAY_FROM })}</div>
      ) : (
        <div className={scroll}>
          <table className={cx(table, tablePadTight)}>
            <thead>
              <tr>
                <th>{t("analysis.bucket")}</th><th>{t("analysis.n")}</th><th>{t("analysis.hitWin")}</th><th>{t("analysis.hitPlace")}</th>
                <th>{t("analysis.edge")}</th><th>{t("analysis.winRoi")}</th><th>{t("analysis.placeRoi")}</th>
              </tr>
            </thead>
            <tbody>
              {buckets.map((b) => (
                <tr
                  key={b.key}
                  className={cx(b.n > 0 && "cursor-pointer")}
                  onClick={b.n ? () => setPicksOf({ title: `${t(`bucket.${b.key as Bucket}`)} ${bucketRange(b.key as Bucket)}`, rows: b.rows }) : undefined}
                  title={b.n ? t("analysis.rowHint") : undefined}
                >
                  <td className="whitespace-nowrap">
                    {t(`bucket.${b.key as Bucket}`)} <small className={dim}>{bucketRange(b.key as Bucket)}</small>
                  </td>
                  <td>{b.n}</td>
                  <td>{pc(b.winPct)}</td>
                  <td>{pc(b.placePct)}</td>
                  <td className={cls(b.placeEdge)}>{pts(b.placeEdge)}</td>
                  <td className={cls(b.winRoi)}>{signed(b.winRoi)}</td>
                  <td className={cls(b.placeRoi)}>{signed(b.placeRoi)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className={note}>{t("analysis.dayNote", { span, races: t("common:races", { count: races }) })}</div>
      {picksOf && <PicksModal title={picksOf.title} rows={picksOf.rows} from={DAY_FROM} to={betAt} span={span} onClose={() => setPicksOf(null)} />}
    </div>
  );
}

/** Signed percentage points, e.g. "+15.0" (no % sign: it's a difference of two percentages). */
const pts = (v: number) => (Number.isFinite(v) ? `${v >= 0 ? "+" : ""}${v.toFixed(1)}` : "–");

/** Every runner behind a Momentum-analysis tile: race, horse, move, final odds, finish and the $1 win return. */
function PicksModal({ title, rows, from, to, span, onClose }: {
  title: string; rows: HorseRow[]; from: Window; to: Window; span: string; onClose: () => void;
}) {
  const { t } = useTranslation(["momentum", "common"]);
  const { lang } = useLanguage();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  const raceNo = (id: string) => Number(id.split("-").pop());
  const move = (r: HorseRow) => moveBetween(r, from, to);
  const sorted = [...rows].sort((a, b) => b.date.localeCompare(a.date) || raceNo(a.raceId) - raceNo(b.raceId) || (move(b) ?? 0) - (move(a) ?? 0));
  const won = rows.filter((r) => r.finishPos === 1);
  const placed = rows.filter((r) => r.finishPos <= 3).length;
  const st = stats("picks", rows);
  // Edge as you'd have seen it when betting: placed (100) or not (0) minus the place chance at Bet at.
  const betImplied = (r: HorseRow) => (r.placeProb[to] == null ? null : 100 * r.placeProb[to]!);
  const edgeOf = (r: HorseRow) => {
    const imp = betImplied(r);
    return imp == null ? NaN : (r.finishPos <= 3 ? 100 : 0) - imp;
  };
  const priced = rows.filter((r) => betImplied(r) != null);
  const avg = (f: (r: HorseRow) => number) => (priced.length ? priced.reduce((s, r) => s + f(r), 0) / priced.length : NaN);
  const betPlaced = avg((r) => (r.finishPos <= 3 ? 100 : 0)), betImpliedAvg = avg((r) => betImplied(r)!), betEdge = betPlaced - betImpliedAvg;

  return (
    <div className={modalBg} onClick={onClose}>
      <div className={cx(modal, "sm:w-[min(760px,100%)]")} role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}>
        <div className="mb-3 flex items-start gap-3">
          <h3 className={cx(h3, "mb-0")}>
            {title}
            <span className="block font-sans text-sm text-ink-3">{span}</span>
          </h3>
          <button className={cx(btn, "ml-auto")} onClick={onClose} aria-label={t("common:action.close")}>✕</button>
        </div>
        <p className="mb-3 text-sm text-ink-2">
          {t("analysis.picksSummary", { n: rows.length, won: won.length, placed, winRoi: signed(st.winRoi), placeRoi: signed(st.placeRoi) })}
          <br />
          {t("analysis.picksEdge", { placed: pc(betPlaced), implied: pc(betImpliedAvg), edge: pts(betEdge), n: priced.length })}
        </p>
        {rows.length ? (
          <div className={scroll}>
            <table className={cx(table, tablePadTight, "[&_td:nth-child(3)]:text-left [&_th:nth-child(3)]:text-left")}>
              <thead>
                <tr>
                  <th>{t("analysis.col.date")}</th>
                  <th>{t("analysis.col.race")}</th>
                  <th>{t("common:word.horse")}</th>
                  <th>{t("analysis.move")}</th>
                  <th title={t("analysis.col.oddsT")}>{t("analysis.col.odds")}</th>
                  <th>{t("analysis.col.finish")}</th>
                  <th title={t("analysis.col.impliedPlaceT")}>{t("analysis.col.impliedPlace")}</th>
                  <th title={t("analysis.col.edgeT")}>{t("analysis.edge")}</th>
                  <th>{t("analysis.col.winReturn")}</th>
                  <th>{t("analysis.col.placeReturn")}</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((r) => {
                  const m = move(r);
                  const imp = betImplied(r);
                  const e = edgeOf(r);
                  const o0 = r.odds[from], o1 = r.odds[to];
                  return (
                    <tr key={`${r.raceId}-${r.horseNo}`}>
                      <td className="whitespace-nowrap tabular-nums">{r.date}</td>
                      <td className="whitespace-nowrap">{r.venue} R{raceNo(r.raceId)}</td>
                      <td className="whitespace-nowrap">
                        <b className="tabular-nums">{r.horseNo}</b> <span className="text-ink-2">{lang === "zh-HK" && r.nameZh ? r.nameZh : r.name}</span>
                      </td>
                      <td className={m == null ? "" : cls(m)}>{m == null ? "–" : signed(100 * m)}</td>
                      <td className="whitespace-nowrap tabular-nums">
                        {o0 ?? "–"} <span className="text-ink-3">→</span> <span className={o0 && o1 ? (o1 < o0 ? "text-good" : o1 > o0 ? "text-bad" : "") : ""}>{o1 ?? "–"}</span>
                      </td>
                      <td className={cx("tabular-nums", r.finishPos === 1 ? "font-semibold text-good" : r.finishPos <= 3 ? "text-good" : "")}>{r.finishPos}</td>
                      <td className="tabular-nums">{imp == null ? "–" : pc(imp)}</td>
                      <td className={cx("tabular-nums", cls(e))}>{pts(e)}</td>
                      <td className="tabular-nums">{r.finishPos === 1 ? `$${r.sp.toFixed(2)}` : "–"}</td>
                      <td className="tabular-nums">{r.plaDiv ? `$${r.plaDiv.toFixed(2)}` : r.plaDiv == null ? "?" : "–"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={cx(empty, "p-4")}>{t("analysis.picksNone")}</div>
        )}
        <p className={note}>{t("analysis.picksNote")}</p>
      </div>
    </div>
  );
}
