// Market momentum: live pre-race odds movement (server polls HKJC every 30 s inside the
// 30-min window) and, over settled races, whether that movement predicts the result.
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { api, type MomentumDay, type MomentumDayRef } from "../api";
import {
  type RaceSeries, type HorseRow, type Window, type BucketStats, type Mover, type ModelRank,
  WINDOWS, BUCKETS, MODEL_PICKS, MOVE_PICKS, TRIO_UNIT, choose3, movers, suggestPicks, pickResults, byBucket, byBandAndBucket, stats,
} from "../../shared/momentum/model";
import { GroupedBars, type Series } from "../analyzer/charts";
import { Kpi, Legend, SortTh, cls, pc, signed, useSort } from "../analyzer/format";
import { OddsChart, Swatch, horseStyle } from "./OddsChart";
import { PoolDonut } from "./PoolDonut";
import "../analyzer/analyzer.css";
import "./momentum.css";

const REFRESH_MS = 30_000;
const MIN_N = 30; // below this a bucket's hit rate is noise — shown greyed

const hkTime = (iso: string) => new Date(iso).toLocaleTimeString("en-GB", { timeZone: "Asia/Hong_Kong", hour: "2-digit", minute: "2-digit" });
const hkClock = (iso: string) => new Date(iso).toLocaleTimeString("en-GB", { timeZone: "Asia/Hong_Kong" });
/** HH:MM:SS.mmm in HK time — for request/response timing. */
const hkClockMs = (iso: string) => `${hkClock(iso)}.${String(new Date(iso).getMilliseconds()).padStart(3, "0")}`;
const fmtDay = (d: string) =>
  new Date(`${d}T12:00:00+08:00`).toLocaleDateString("en-GB", { timeZone: "Asia/Hong_Kong", weekday: "short", day: "numeric", month: "short", year: "numeric" });
const ago = (iso: string, now: number) => {
  const s = Math.max(0, Math.round((now - Date.parse(iso)) / 1000));
  return s < 90 ? `${s}s ago` : `${Math.round(s / 60)} min ago`;
};
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
  const [days, setDays] = useState<{ today: string; days: MomentumDayRef[] } | null>(null);
  const [day, setDay] = useState(""); // "" = today

  useEffect(() => {
    const load = () => api.momentumDays().then(setDays).catch(() => {});
    load();
    const t = setInterval(load, 5 * 60_000);
    return () => clearInterval(t);
  }, []);

  const options = days?.days ?? [];
  const hasToday = options.some((d) => d.date === days?.today);

  return (
    <div className="analyzer momentum">
      <div className="page-head mo-page-head">
        <div>
          <h1>Market momentum</h1>
          <p>Win and place odds are recorded every 30 s from 30 minutes before each race. Races that have finished feed the hit-rate analysis below.</p>
        </div>
        <div className="field">
          <label htmlFor="mDay">Racing day</label>
          <select id="mDay" value={day} onChange={(e) => setDay(e.target.value)}>
            <option value="">Today{days ? ` · ${fmtDay(days.today)}` : ""}</option>
            {options
              .filter((d) => d.date !== days?.today || !hasToday)
              .map((d) => (
                <option key={d.date} value={d.date}>
                  {fmtDay(d.date)} · {d.venue} · {d.races} races · {d.snapshots.toLocaleString()} snapshots
                </option>
              ))}
          </select>
        </div>
      </div>
      <LivePanel key={day || "today"} date={day || days?.today || ""} isToday={!day} />
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
  const next = races.find((r) => Date.parse(r.post_time) > now - 5 * 60_000) ?? races[races.length - 1];
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
  const secsToPost = race ? (Date.parse(race.post_time) - now) / 1000 : NaN;
  const lastPt = series?.points[series.points.length - 1];

  return (
    <>
      <h2>
        {isToday ? "Live" : "Replay"} <span>{today ? `${fmtDay(today.date)} · ${races[0]?.venue ?? "no meeting"}` : "loading…"}</span>
      </h2>
      {error && <div className="error">{error}</div>}
      {isToday && today?.poller.lastError && <div className="error">Poller: {today.poller.lastError}</div>}

      {races.length > 0 && (
        <nav className="racetabs mo-races">
          {races.map((r) => {
            const on = today!.poller.polling.includes(r.race_id);
            return (
              <button key={r.race_id} className={r.race_id === selected ? "active" : ""} onClick={() => setRaceId(r.race_id)} title={`${r.snapshots} snapshots`}>
                R{r.race_no} <small>{hkTime(r.post_time)}</small>
                {on && <i className="mo-dot" aria-label="polling" />}
                {r.status === "settled" && <small className="dim"> ✓</small>}
              </button>
            );
          })}
        </nav>
      )}

      {race && series && (
        <div className="grid-live">
          <div className="stack">
          <div className="panel">
            <div className="mo-head">
              <b>R{race.race_no}</b> · off {hkTime(race.post_time)} ·{" "}
              {secsToPost > 0 ? <span className="strong">{mmss(secsToPost)} to go</span> : <span className="dim">{race.hkjc_status?.toLowerCase()}</span>}
              <span className="meta">
                {series.points.length} snapshots
                {lastPt?.winPool ? ` · win pool $${Math.round(lastPt.winPool).toLocaleString()}` : ""}
              </span>
            </div>
            <OddsChart series={series} focus={focus} onFocus={setFocus} />
            <div className="note">Short prices are at the top, so a rising line means money is coming for that horse. Horses 9 and up use dashed lines. Hover the chart to see every horse's last-5-minute move at that moment.</div>
          </div>
          {lastPt && <PoolDonut series={series} focus={focus} onFocus={setFocus} />}
          </div>

          <MoversTable
            series={series}
            model={modelHere}
            focus={focus}
            onFocus={setFocus}
            stamp={lastPt && <span title={lastPt.fetchedAt}>Last update {hkClock(lastPt.fetchedAt)} · {ago(lastPt.fetchedAt, now)}</span>}
          />
        </div>
      )}
      {race && series && series.points.length > 0 && <RecordsTable series={series} model={modelHere} />}
      {today && !races.length && (
        <div className="panel empty">
          {isToday ? "No HKJC meeting today. Recording starts automatically on the next race day." : "Nothing was recorded on this day."}
        </div>
      )}
    </>
  );
}

// ---------------- Movers ----------------

/** Per-horse moves up to the series' last snapshot. Click a header to sort. */
type ModelState = { ranks: ModelRank[] | null; error?: string } | null;

function MoversTable({ series, model, focus, onFocus, stamp }: { series: RaceSeries; model: ModelState; focus: number | null; onFocus: (h: number | null) => void; stamp?: ReactNode }) {
  const sort = useSort<MoverKey>("momentum", -1);
  const fin = useMemo(() => new Map(series.results.map((r) => [r.horseNo, r.finishPos])), [series.results]);
  const all = useMemo(() => movers(series), [series]);
  const mv = useMemo(
    () => sortMovers(all.map((m) => ({ ...m, fin: fin.get(m.horseNo) ?? null })), sort.key, sort.dir),
    [all, fin, sort.key, sort.dir]
  );

  return (
    <div className="panel scroll">
      <div className="mo-head">
        <h3>Movers</h3>
        {stamp && <span className="meta">{stamp}</span>}
      </div>
      <table className="movers">
        <thead>
          <tr>
            <SortTh k="horseNo" sort={sort}>#</SortTh>
            <SortTh k="name" sort={sort}>Horse</SortTh>
            <SortTh k="start" sort={sort}>Start</SortTh>
            <SortTh k="now" sort={sort}>Now</SortTh>
            <SortTh k="momentum" sort={sort}>Move</SortTh>
            <SortTh k="recent" sort={sort}>Last 5m</SortTh>
            {fin.size > 0 && <SortTh k="fin" sort={sort}>Fin</SortTh>}
          </tr>
        </thead>
        <tbody>
          {mv.map((m) => (
            <tr key={m.horseNo} onMouseEnter={() => onFocus(m.horseNo)} onMouseLeave={() => onFocus(null)} className={focus === m.horseNo ? "hl" : ""}>
              <td><Swatch {...horseStyle(m.horseNo)} />{m.horseNo}</td>
              <td>{m.name}</td>
              <td>{m.start ?? "–"}</td>
              <td>{m.now ?? "–"}</td>
              <td className={m.momentum == null ? "" : cls(m.momentum)} title={m.bucket ?? ""}>
                {m.momentum == null ? "–" : signed(100 * m.momentum)}
              </td>
              <td className={m.recent == null ? "" : cls(m.recent)}>{m.recent == null ? "–" : signed(100 * m.recent)}</td>
              {fin.size > 0 && <td className={m.fin === 1 ? "strong" : ""}>{m.fin ?? "–"}</td>}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="note">Move = change in the horse's share of the market (implied win probability) since the first snapshot. Last 5m = the same change over the last 5 minutes only. Click a column title to sort.</div>
      <SuggestedPicks model={model} series={series} mv={all} fin={fin} focus={focus} onFocus={onFocus} />
    </div>
  );
}

// ---------------- Suggested picks ----------------

function PickChip({ horseNo, name, odds, detail, both, fin, focus, onFocus }: {
  horseNo: number; name: string; odds?: number | null; detail?: ReactNode; both?: boolean; fin?: number | null; focus: number | null; onFocus: (h: number | null) => void;
}) {
  return (
    <span
      className={`chip${both ? " both" : ""}${focus === horseNo ? " on" : ""}`}
      title={name}
      onMouseEnter={() => onFocus(horseNo)}
      onMouseLeave={() => onFocus(null)}
    >
      <Swatch {...horseStyle(horseNo)} />
      <b>{horseNo}</b>
      {odds != null && <span className="odds" title="Current win odds">({odds})</span>}
      {detail && <span className="d">{detail}</span>}
      {fin != null && <span className={`fin${fin <= 3 ? " placed" : ""}`}>{fin === 1 ? "1st" : fin === 2 ? "2nd" : fin === 3 ? "3rd" : `${fin}th`}</span>}
    </span>
  );
}

function SuggestedPicks({ model, series, mv, fin, focus, onFocus }: {
  model: ModelState; series: RaceSeries; mv: Mover[]; fin: Map<number, number | null>; focus: number | null; onFocus: (h: number | null) => void;
}) {
  const picks = suggestPicks(model?.ranks ?? [], mv);
  const result = pickResults(picks, series.results, series.dividends);
  const divOf = (pool: string) => result?.dividends.filter((d) => d.pool === pool) ?? [];
  const names = new Map(series.runners.map((r) => [r.horseNo, r.name]));
  const off = Date.parse(series.postTime) <= Date.now();
  const odds = new Map(mv.map((m) => [m.horseNo, m.now]));
  const chip = { focus, onFocus };
  const f = (h: number) => (fin.size ? fin.get(h) ?? null : undefined);

  return (
    <div className="picks">
      <h3>Suggested picks</h3>
      <div className="pick-row">
        <span className="lbl">Model top {MODEL_PICKS}</span>
        <div className="chips">
          {model?.error ? (
            <span className="dim" title={model.error}>analyzer unavailable</span>
          ) : !model?.ranks ? (
            <span className="dim">running analyzer…</span>
          ) : (
            picks.model.map((r) => <PickChip key={r.horseNo} horseNo={r.horseNo} name={r.name} odds={odds.get(r.horseNo)} detail={pc(100 * r.winProb)} fin={f(r.horseNo)} {...chip} />)
          )}
        </div>
      </div>
      <div className="pick-row">
        <span className="lbl">Move top {MOVE_PICKS}</span>
        <div className="chips">
          {picks.move.length ? (
            picks.move.map((m) => (
              <PickChip key={m.horseNo} horseNo={m.horseNo} name={m.name} odds={m.now} detail={<span className={cls(m.momentum!)}>{signed(100 * m.momentum!)}</span>} fin={f(m.horseNo)} {...chip} />
            ))
          ) : (
            <span className="dim">needs a second snapshot</span>
          )}
        </div>
      </div>
      <div className="pick-row combined">
        <span className="lbl">Combined ({picks.combined.length})</span>
        <div className="chips">
          {picks.combined.map((c) => (
            <PickChip key={c.horseNo} horseNo={c.horseNo} name={c.name} odds={odds.get(c.horseNo)} both={c.inModel && c.inMove} detail={c.inModel && c.inMove ? "★ both" : undefined} fin={f(c.horseNo)} {...chip} />
          ))}
        </div>
      </div>
      {picks.combined.length >= 3 && (
        <div className="pick-row">
          <span className="lbl" />
          <span className="trio-cost" title="Trio box: every 3-horse combination of the combined picks">
            Trio box: {choose3(picks.combined.length)} combinations × ${TRIO_UNIT} = <b>${(choose3(picks.combined.length) * TRIO_UNIT).toLocaleString()}</b>
          </span>
        </div>
      )}
      <div className="pick-result">
        <h3>Result</h3>
        {!result ? (
          <span className="dim">{off ? "waiting for HKJC to post the result…" : "after the race"}</span>
        ) : (
          <>
            <div className="pick-row">
              <span className="lbl">Placings{result.complete ? "" : " (so far)"}</span>
              <div className="chips">
                {result.placed.map((r) => (
                  <span key={r.horseNo} className={`chip placing${focus === r.horseNo ? " on" : ""}`} title={names.get(r.horseNo)} onMouseEnter={() => onFocus(r.horseNo)} onMouseLeave={() => onFocus(null)}>
                    <span className="pos">{r.finishPos === 1 ? "1st" : r.finishPos === 2 ? "2nd" : "3rd"}</span>
                    <Swatch {...horseStyle(r.horseNo)} />
                    <b>{r.horseNo}</b>
                    {r.sp != null && <span className="odds">({r.sp})</span>}
                    <span className="d">{names.get(r.horseNo)}</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="pick-row">
              <span className="lbl">Dividends <span className="dim">/ $10</span></span>
              <div className="divs">
                {divOf("TRI").length ? (
                  divOf("TRI").map((d) => (
                    <span key={d.comb} className="div-trio">
                      Trio <b>{d.comb.replaceAll(",", "-")}</b> <b className="amt">${d.div.toLocaleString()}</b>
                    </span>
                  ))
                ) : (
                  <span className="dim">Trio: waiting for official dividend…</span>
                )}
                {divOf("WIN").map((d) => <span key={`w${d.comb}`} className="div-sm">Win {d.comb} ${d.div}</span>)}
                {divOf("QIN").map((d) => <span key={`q${d.comb}`} className="div-sm">Quinella {d.comb.replaceAll(",", "-")} ${d.div}</span>)}
              </div>
            </div>
            <table className="hits">
              <thead>
                <tr>
                  <th>List</th>
                  <th title="Has the winner">Win</th>
                  <th title="How many of the first three it holds">Top 3</th>
                  <th title="Holds both of the first two">Qin</th>
                  <th title="Holds all of the first three">Trio</th>
                  <th title="Trio box: every 3-horse combination of the list at $10">Cost</th>
                  <th title="Trio dividend collected if the box hits">Return</th>
                </tr>
              </thead>
              <tbody>
                {result.lists.map((l) => (
                  <tr key={l.label}>
                    <td>{l.label} <span className="dim">({l.horses.length})</span></td>
                    <td className={l.winner ? "good" : "bad"}>{l.winner ? "✓" : "✗"}</td>
                    <td className={l.top3 === 3 ? "good" : l.top3 === 0 ? "bad" : ""}>{l.top3}/3</td>
                    <td className={l.quinella ? "good" : "bad"}>{l.quinella ? "✓" : "✗"}</td>
                    <td className={l.trio ? "good" : "bad"}>{l.trio ? "✓" : "✗"}</td>
                    <td>{l.trioCost ? `$${l.trioCost.toLocaleString()}` : "–"}</td>
                    <td className={l.trioReturn == null ? "dim" : l.trioReturn > l.trioCost ? "good" : "bad"} title={l.trioReturn == null ? "" : `net ${l.trioReturn - l.trioCost >= 0 ? "+" : "−"}$${Math.abs(l.trioReturn - l.trioCost).toLocaleString()}`}>
                      {l.trioReturn == null ? "…" : `$${l.trioReturn.toLocaleString()}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
      <div className="note">Number in brackets = current win odds; in Result, the final odds. Trio box = every 3-horse combination of the list at $10; hover Return for the net. Model = analyze-race.ts ranking (saved racecard, all-venue form, 10,000-run simulation). ★ = in both lists.</div>
    </div>
  );
}

// ---------------- Snapshot popup ----------------

/** The chart + movers exactly as they stood at snapshot `index`. ← / → step through snapshots, Esc closes. */
function SnapshotModal({ series, model, index, onIndex, onClose }: { series: RaceSeries; model: ModelState; index: number; onIndex: (i: number) => void; onClose: () => void }) {
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
    <div className="mo-modal-bg" onClick={onClose}>
      <div className="mo-modal" role="dialog" aria-modal="true" aria-label={`R${series.raceNo} at ${hkClock(p.fetchedAt)}`} onClick={(e) => e.stopPropagation()}>
        <div className="mo-head">
          <h3>
            R{series.raceNo} at {hkClock(p.fetchedAt)} <span className="dim">· {mmss(p.secsToPost)} to post · snapshot {index + 1} of {n}</span>
          </h3>
          <div className="mo-modal-nav">
            <button onClick={() => onIndex(index - 1)} disabled={index === 0} title="Earlier snapshot (←)">← Earlier</button>
            <button onClick={() => onIndex(index + 1)} disabled={index === n - 1} title="Later snapshot (→)">Later →</button>
            <button onClick={onClose} title="Close (Esc)" aria-label="Close">✕</button>
          </div>
        </div>
        <div className="grid-live">
          <div className="panel">
            <OddsChart series={at} focus={focus} onFocus={setFocus} />
          </div>
          <MoversTable series={at} model={model} focus={focus} onFocus={setFocus} stamp={p.winPool ? `win pool $${Math.round(p.winPool).toLocaleString()}` : undefined} />
        </div>
      </div>
    </div>
  );
}

// ---------------- Records ----------------

/** Every snapshot for the race, newest first: one row per snapshot, one column per horse. */
function RecordsTable({ series, model }: { series: RaceSeries; model: ModelState }) {
  const [pool, setPool] = useState<"win" | "pla">("win");
  const horses = series.runners.filter((r) => series.points.some((p) => p[pool][r.horseNo] != null));
  const pts = series.points;
  const rows = [...pts.keys()].reverse();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <h2>
        Records <span>— {pts.length} snapshots for R{series.raceNo}, newest first</span>
      </h2>
      <div className="panel">
        <div className="mo-head">
          <div className="seg" role="group" aria-label="Odds shown">
            <button className={pool === "win" ? "on" : ""} onClick={() => setPool("win")}>Win</button>
            <button className={pool === "pla" ? "on" : ""} onClick={() => setPool("pla")}>Place</button>
          </div>
          <span className="meta">Green means the price shortened since the previous snapshot; red means it drifted. Click a row to see the chart and movers at that moment.</span>
        </div>
        <div className="records">
          <table>
            <thead>
              <tr>
                <th title="When the query was sent (HK time)">Query time</th>
                <th title="When HKJC's response arrived (HK time)">Response time</th>
                <th title="Response time − query time">Latency</th>
                <th title="HKJC's own last update time for the WIN pool">HKJC updated</th>
                <th>To post</th>
                <th>{pool === "win" ? "Win" : "Place"} pool</th>
                {horses.map((h) => (
                  <th key={h.horseNo} title={h.name}>
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
                    className="clickable"
                    tabIndex={0}
                    onClick={() => setOpen(i)}
                    onKeyDown={(e) => e.key === "Enter" && setOpen(i)}
                  >
                    <td>{hkClockMs(p.fetchedAt)}</td>
                    <td>{p.respondedAt ? hkClockMs(p.respondedAt) : "–"}</td>
                    <td>{p.respondedAt ? `${Date.parse(p.respondedAt) - Date.parse(p.fetchedAt)} ms` : "–"}</td>
                    <td>{p.hkjcUpdatedAt ? hkClock(p.hkjcUpdatedAt) : "–"}</td>
                    <td>{mmss(p.secsToPost)}</td>
                    <td>{poolAmt ? `$${Math.round(poolAmt).toLocaleString()}` : "–"}</td>
                    {horses.map((h) => {
                      const o = p[pool][h.horseNo], was = prev?.[pool][h.horseNo];
                      const tone = o == null || was == null || o === was ? "" : o < was ? "good" : "bad";
                      return (
                        <td key={h.horseNo} className={tone} title={was != null && tone ? `was ${was}` : undefined}>
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
    { name: "actual", color: "var(--accent)", get: hit },
    { name: "market-implied", color: "var(--muted)", get: implied },
  ];
  const max = Math.max(10, ...buckets.flatMap((b) => [hit(b), implied(b)]).filter(Number.isFinite)) * 1.15;

  return (
    <>
      <h2>
        Momentum vs hit rate <span>— do horses that shorten late win more often than their final price suggests?</span>
      </h2>
      <form className="range" onSubmit={(e) => { e.preventDefault(); if (draft.from && draft.to && draft.from <= draft.to) setRange(draft); }}>
        <div className="field">
          <label htmlFor="mFrom">From</label>
          <input type="date" id="mFrom" value={draft.from} onChange={(e) => setDraft({ ...draft, from: e.target.value })} />
        </div>
        <div className="field">
          <label htmlFor="mTo">To</label>
          <input type="date" id="mTo" value={draft.to} onChange={(e) => setDraft({ ...draft, to: e.target.value })} />
        </div>
        <button type="submit" className="primary">Apply</button>
        <div className="field">
          <label htmlFor="mWin">Measure from</label>
          <select id="mWin" value={w} onChange={(e) => setW(Number(e.target.value) as Window)}>
            {WINDOWS.map((x) => <option key={x} value={x}>{x} min before</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="mMetric">Hit =</label>
          <select id="mMetric" value={metric} onChange={(e) => setMetric(e.target.value as "win" | "place")}>
            <option value="win">Win</option>
            <option value="place">Place (top 3)</option>
          </select>
        </div>
        <span className="meta">{data ? `${data.races} races · ${measured.length} runners measured` : "loading…"}</span>
      </form>
      {error && <div className="error">{error}</div>}

      {data && data.races === 0 ? (
        <div className="panel empty">No finished races recorded in this range yet. Results appear here once a recorded race has been run.</div>
      ) : (
        <>
          <div className="kpis">
            <Kpi label={`Steamers (${metric})`} value={pc(hit(steam))} sub={`market-implied ${pc(implied(steam))} · n=${steam.n}`} tone={cls(edge(steam))} />
            <Kpi label="Steamer edge" value={signed(edge(steam))} sub="actual minus implied, in points" tone={cls(edge(steam))} />
            <Kpi label={`Drifters (${metric})`} value={pc(hit(drift))} sub={`market-implied ${pc(implied(drift))} · n=${drift.n}`} tone={cls(edge(drift))} />
            <Kpi label="Steamer win ROI" value={signed(steam.winRoi)} sub="flat stake at final odds" tone={cls(steam.winRoi)} />
          </div>

          <div className="grid2">
            <div className="panel">
              <Legend items={[["var(--accent)", "actual"], ["var(--muted)", "market-implied"]]} />
              <GroupedBars rows={buckets} labelOf={(b) => b.key} series={bars} max={max} />
              <div className="note">A bar above its grey partner means that bucket beat its final odds. Steam or drift is a change of 10% or more in implied probability; strong is 25% or more.</div>
            </div>
            <div className="panel scroll">
              <table>
                <thead>
                  <tr><th>Bucket</th><th>N</th><th>Hit</th><th>Implied</th><th>Edge</th><th>Win ROI</th></tr>
                </thead>
                <tbody>
                  {buckets.map((b) => (
                    <tr key={b.key} className={b.n < MIN_N ? "dim" : ""}>
                      <td>{b.key}</td>
                      <td>{b.n}</td>
                      <td>{pc(hit(b))}</td>
                      <td>{pc(implied(b))}</td>
                      <td className={cls(edge(b))}>{signed(edge(b))}</td>
                      <td className={cls(b.winRoi)}>{signed(b.winRoi)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="note">Greyed rows have fewer than {MIN_N} runners, which is too few to trust.</div>
            </div>
          </div>

          <h2>
            By final odds <span>— edge (actual − implied) per bucket, so favourite bias doesn't masquerade as momentum</span>
          </h2>
          <div className="panel scroll">
            <table>
              <thead>
                <tr><th>Final odds</th>{BUCKETS.map((b) => <th key={b}>{b}</th>)}</tr>
              </thead>
              <tbody>
                {bands.map(({ band, cells }) => (
                  <tr key={band}>
                    <td>{band}</td>
                    {cells.map((c) => (
                      <td key={c.key} className={c.n < MIN_N ? "dim" : cls(edge(c))} title={`hit ${pc(hit(c))} vs implied ${pc(implied(c))}`}>
                        {c.n ? signed(edge(c)) : "–"} <small className="dim">n={c.n}</small>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
