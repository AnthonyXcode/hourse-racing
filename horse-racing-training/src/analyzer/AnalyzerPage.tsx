// Analyzer performance: how the form analyzer + Monte Carlo model's predictions
// held up against real results. The server runs the analysis for the chosen
// date range; every panel below it is computed client-side from that payload.
import { useEffect, useMemo, useState } from "react";
import { api } from "../api";
import { type AnalyzerPayload, type Filters, EMPTY_FILTERS, applyFilters, isSettled } from "../../shared/analyzer/model";
import { WinPlaceTab } from "./WinPlaceTab";
import { TrioTab } from "./TrioTab";
import { Display, btn, btnPrimary, code, control, cx, empty, errorBox, field, fieldLabel, note, page, panel, rangeBar, rangeMeta } from "../kit";

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

/** Filter-grid cell and control: fill the column. */
const filterControl = cx(control, "w-full");

export function AnalyzerPage({ tab }: { tab: AnalyzerTab }) {
  const [range, setRange] = useState(lastYear);
  const [draft, setDraft] = useState(range);
  const [data, setData] = useState<AnalyzerPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [F, setF] = useState<Filters>(EMPTY_FILTERS);
  // Phones only: the 10-field filter grid collapses behind a toggle (always shown from `sm`).
  const [filtersOpen, setFiltersOpen] = useState(false);

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
  const activeFilters = Object.values(F).filter((v) => v !== "").length;

  const sub = !data
    ? "How the form analyzer and Monte Carlo model's predictions held up against real results."
    : tab === "win-place"
      ? `${all.length.toLocaleString()} races (${span}), ${all.reduce((s, r) => s + r.h.length, 0).toLocaleString()} horse predictions`
      : `${all.filter(isSettled).length.toLocaleString()} settled races (${span}) · ${all.filter((r) => r.td > 0).length.toLocaleString()} with a recorded Trio dividend`;

  return (
    <div className={page}>
      <Display sub={sub}>{tab === "win-place" ? "Race analyzer performance" : "Trio performance"}</Display>

      <form
        className={cx(rangeBar, "mt-4")}
        onSubmit={(e) => {
          e.preventDefault();
          if (validDraft) setRange(draft);
        }}
      >
        <div className={field}>
          <label htmlFor="aFrom" className={fieldLabel}>From</label>
          <input type="date" id="aFrom" className={cx(control, "w-full")} value={draft.from} max={draft.to} onChange={(e) => setDraft({ ...draft, from: e.target.value })} />
        </div>
        <div className={field}>
          <label htmlFor="aTo" className={fieldLabel}>To</label>
          <input type="date" id="aTo" className={cx(control, "w-full")} value={draft.to} min={draft.from} onChange={(e) => setDraft({ ...draft, to: e.target.value })} />
        </div>
        <button type="submit" className={btnPrimary} disabled={loading || !validDraft || (!dirty && !error)}>
          {loading ? "Running…" : "Run analysis"}
        </button>
        <button type="button" className={btn} disabled={loading} onClick={() => { const r = lastYear(); setDraft(r); setRange(r); }}>
          Last 12 months
        </button>
        {data && !loading && (
          <span className={rangeMeta}>
            {all.length.toLocaleString()} races · Monte Carlo {data.mcRuns.toLocaleString()} runs, seeded · run {data.generatedAt.slice(0, 16).replace("T", " ")}
          </span>
        )}
      </form>

      {error && <div className={errorBox}>{error}</div>}
      {loading && !data && <div className={cx(panel, empty, "mt-4")}>Running analysis for {range.from} → {range.to}… this can take a few seconds the first time.</div>}

      {data && (
        <div className={loading ? "pointer-events-none opacity-55 transition-opacity" : "transition-opacity"}>
          {/* Sticky under the app header (h-16 on phones, 72px from sm). */}
          <div className="sticky top-(--header-h,64px) z-20 -mx-4 mt-4 border-b border-edge bg-canvas/85 px-4 pt-3 pb-3 backdrop-blur-md sm:mx-0 sm:px-0">
            <button
              type="button"
              className={cx(btn, "mb-3 h-9 w-full justify-between sm:hidden")}
              aria-expanded={filtersOpen}
              aria-controls="analyzer-filters"
              onClick={() => setFiltersOpen((o) => !o)}
            >
              <span>Filters{activeFilters ? ` (${activeFilters} active)` : ""}</span>
              <span aria-hidden className="text-ink-3">{filtersOpen ? "▲" : "▼"}</span>
            </button>
            <div id="analyzer-filters" className={cx(filtersOpen ? "grid" : "hidden", "grid-cols-2 gap-x-3 gap-y-3 sm:grid sm:grid-cols-3 lg:grid-cols-6")}>
              <div className={field}>
                <label htmlFor="fcls" className={fieldLabel}>Class</label>
                <select id="fcls" className={filterControl} value={F.cls} onChange={(e) => setF({ ...F, cls: e.target.value })}>
                  {opts([["", "All"], ...classes.map((c): Opt => [c, c])])}
                </select>
              </div>
              <div className={field}>
                <label htmlFor="fvenue" className={fieldLabel}>Venue</label>
                <select id="fvenue" className={filterControl} value={F.venue} onChange={(e) => setF({ ...F, venue: e.target.value })}>
                  {opts([["", "All"], ["HV", "HV"], ["ST", "ST"]])}
                </select>
              </div>
              {NUM_FIELDS.map(({ label, inputs, step }) => (
                <div className={field} key={label}>
                  <label htmlFor={`f${inputs[0]!.key}`} className={fieldLabel}>{label}</label>
                  <div className="flex gap-1">
                    {inputs.map(({ key, placeholder }) => (
                      <input
                        key={key}
                        id={`f${key}`}
                        type="number"
                        className={cx(filterControl, "tabular-nums")}
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
              <div className={field}>
                <label htmlFor="fmkt" className={fieldLabel}>Top pick is</label>
                <select id="fmkt" className={filterControl} value={F.mkt} onChange={(e) => setF({ ...F, mkt: e.target.value })}>
                  {opts([["", "Any market rank"], ["fav", "Favourite"], ["nonfav", "Not favourite"], ["long", "Market rank 5+"]])}
                </select>
              </div>
              <button type="button" className={cx(btn, "self-end justify-self-start")} onClick={() => setF(EMPTY_FILTERS)}>
                Reset
              </button>
            </div>
            <div className="mt-2 text-[13px] text-ink-2 sm:text-right [&_b]:font-semibold [&_b]:text-ink [&_b]:tabular-nums">
              <b>{races.length}</b> of {all.length} races · <b>{races.reduce((s, r) => s + r.h.length, 0).toLocaleString()}</b> predictions
            </div>
          </div>

          {races.length === 0 ? (
            <div className={cx(panel, empty, "mt-6")}>No races match these filters.</div>
          ) : tab === "win-place" ? (
            <WinPlaceTab races={races} />
          ) : (
            <TrioTab races={races} />
          )}

          <p className={cx(note, "mt-10")}>
            Every panel reflects the date range and filters. Source: saved racecards in <code className={code}>data/racecards/</code> matched to results in <code className={code}>data/historical/</code>. Odds are starting
            prices where recorded; stakes are $10 flat.
          </p>
        </div>
      )}
    </div>
  );
}
