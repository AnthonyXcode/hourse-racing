// Analyzer performance: how the form analyzer + Monte Carlo model's predictions
// held up against real results. The server runs the analysis for the chosen
// date range; every panel below it is computed client-side from that payload.
import { useEffect, useMemo, useState } from "react";
import { api } from "../api";
import { type AnalyzerPayload, type Filters, EMPTY_FILTERS, applyFilters, isSettled } from "../../shared/analyzer/model";
import { WinPlaceTab } from "./WinPlaceTab";
import { TrioTab } from "./TrioTab";
import "./analyzer.css";

export type AnalyzerTab = "win-place" | "trio";

const ymd = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
function lastYear(): { from: string; to: string } {
  const to = new Date(), from = new Date(to);
  from.setFullYear(from.getFullYear() - 1);
  return { from: ymd(from), to: ymd(to) };
}

type Opt = [string, string];
const opts = (xs: Opt[]) => xs.map(([v, l]) => <option key={v} value={v}>{l}</option>);
type NumKey = "fieldMin" | "diffMin" | "sparse" | "close" | "gap" | "mcPlace" | "trip" | "mktPos";
/** Numeric filters. The label carries the comparison applied. */
const NUM_FIELDS: { label: string; inputs: { key: NumKey; placeholder: string }[]; step?: number }[] = [
  { label: "Field size (≥)", inputs: [{ key: "fieldMin", placeholder: "any" }] },
  { label: "avgDiff (≥)", inputs: [{ key: "diffMin", placeholder: "any" }] },
  { label: "Sparse form (≤)", inputs: [{ key: "sparse", placeholder: "any" }] },
  { label: "Close < 8 (≤)", inputs: [{ key: "close", placeholder: "any" }] },
  { label: "Top-2 gap (≥)", inputs: [{ key: "gap", placeholder: "any" }], step: 0.5 },
  { label: "MC place % (≥)", inputs: [{ key: "mcPlace", placeholder: "any" }], step: 5 },
  { label: "Trip runs (≥)", inputs: [{ key: "trip", placeholder: "any" }] },
  { label: "Market position (≤)", inputs: [{ key: "mktPos", placeholder: "any" }] },
];

export function AnalyzerPage({ tab }: { tab: AnalyzerTab }) {
  const [range, setRange] = useState(lastYear);
  const [draft, setDraft] = useState(range);
  const [data, setData] = useState<AnalyzerPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [F, setF] = useState<Filters>(EMPTY_FILTERS);

  // Run the analysis whenever the applied range changes (and on first open).
  useEffect(() => {
    let live = true;
    setLoading(true);
    setError("");
    api
      .analyzer(range.from, range.to)
      .then((d) => live && setData(d))
      .catch((e) => live && setError(String(e)))
      .finally(() => live && setLoading(false));
    return () => {
      live = false;
    };
  }, [range]);

  const all = data?.races ?? [];
  const classes = useMemo(() => [...new Set(all.map((r) => r.c))].sort(), [all]);
  const races = useMemo(() => applyFilters(all, F), [all, F]);
  const dates = all.map((r) => r.d).sort();
  const span = dates.length ? `${dates[0]} → ${dates[dates.length - 1]}` : `${data?.from} → ${data?.to}`;
  const dirty = draft.from !== range.from || draft.to !== range.to;
  const validDraft = !!draft.from && !!draft.to && draft.from <= draft.to;

  return (
    <div className="analyzer">
      <form
        className="range"
        onSubmit={(e) => {
          e.preventDefault();
          if (validDraft) setRange(draft);
        }}
      >
        <div className="field">
          <label htmlFor="aFrom">From</label>
          <input type="date" id="aFrom" value={draft.from} max={draft.to} onChange={(e) => setDraft({ ...draft, from: e.target.value })} />
        </div>
        <div className="field">
          <label htmlFor="aTo">To</label>
          <input type="date" id="aTo" value={draft.to} min={draft.from} onChange={(e) => setDraft({ ...draft, to: e.target.value })} />
        </div>
        <button type="submit" className="primary" disabled={loading || !validDraft || (!dirty && !error)}>
          {loading ? "Running…" : "Run analysis"}
        </button>
        <button type="button" disabled={loading} onClick={() => { const r = lastYear(); setDraft(r); setRange(r); }}>
          Last 12 months
        </button>
        {data && !loading && (
          <span className="meta">
            {all.length.toLocaleString()} races · Monte Carlo {data.mcRuns.toLocaleString()} runs, seeded · run {data.generatedAt.slice(0, 16).replace("T", " ")}
          </span>
        )}
      </form>

      {error && <div className="error">{error}</div>}
      {loading && !data && <div className="panel empty">Running analysis for {range.from} → {range.to}… this can take a few seconds the first time.</div>}

      {data && (
        <div className={loading ? "stale" : ""}>
          <div className="filters">
            <div className="field">
              <label htmlFor="fcls">Class</label>
              <select id="fcls" value={F.cls} onChange={(e) => setF({ ...F, cls: e.target.value })}>
                {opts([["", "All"], ...classes.map((c): Opt => [c, c])])}
              </select>
            </div>
            <div className="field">
              <label htmlFor="fvenue">Venue</label>
              <select id="fvenue" value={F.venue} onChange={(e) => setF({ ...F, venue: e.target.value })}>
                {opts([["", "All"], ["HV", "HV"], ["ST", "ST"]])}
              </select>
            </div>
            {NUM_FIELDS.map(({ label, inputs, step }) => (
              <div className="field" key={label}>
                <label htmlFor={`f${inputs[0]!.key}`}>{label}</label>
                <div className="nums">
                  {inputs.map(({ key, placeholder }) => (
                    <input
                      key={key}
                      id={`f${key}`}
                      type="number"
                      min={0}
                      step={step ?? 1}
                      inputMode="decimal"
                      placeholder={placeholder}
                      aria-label={`${label} ${placeholder}`}
                      value={F[key]}
                      onChange={(e) => setF({ ...F, [key]: e.target.value })}
                    />
                  ))}
                </div>
              </div>
            ))}
            <div className="field">
              <label htmlFor="fmkt">Top pick is</label>
              <select id="fmkt" value={F.mkt} onChange={(e) => setF({ ...F, mkt: e.target.value })}>
                {opts([["", "Any market rank"], ["fav", "Favourite"], ["nonfav", "Not favourite"], ["long", "Market rank 5+"]])}
              </select>
            </div>
            <button type="button" onClick={() => setF(EMPTY_FILTERS)}>
              Reset
            </button>
            <div className="status">
              <b>{races.length}</b> of {all.length} races · <b>{races.reduce((s, r) => s + r.h.length, 0).toLocaleString()}</b> predictions
            </div>
          </div>

          <header className="page-head">
            {tab === "win-place" ? (
              <>
                <h1>Race analyzer performance</h1>
                <p>
                  {all.length.toLocaleString()} races ({span}), {all.reduce((s, r) => s + r.h.length, 0).toLocaleString()} horse predictions
                </p>
              </>
            ) : (
              <>
                <h1>Trio performance</h1>
                <p>
                  {all.filter(isSettled).length.toLocaleString()} settled races ({span}) · {all.filter((r) => r.td > 0).length.toLocaleString()} with a recorded Trio dividend
                </p>
              </>
            )}
          </header>

          {races.length === 0 ? (
            <div className="panel empty">No races match these filters.</div>
          ) : tab === "win-place" ? (
            <WinPlaceTab races={races} />
          ) : (
            <TrioTab races={races} />
          )}

          <p className="note">
            Every panel reflects the date range and filters. Source: saved racecards in <code>data/racecards/</code> matched to results in <code>data/historical/</code>. Odds are starting
            prices where recorded; stakes are $10 flat.
          </p>
        </div>
      )}
    </div>
  );
}
