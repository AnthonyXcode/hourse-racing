// Analyzer performance: how the form analyzer + Monte Carlo model's predictions
// held up against real results. The server runs the analysis for the chosen
// date range; every panel below it is computed client-side from that payload.
import { useEffect, useMemo, useState } from "react";
import { api } from "../api";
import { type AnalyzerPayload, type Filters, EMPTY_FILTERS, applyFilters, isSettled } from "../../shared/analyzer/model";
import { WinPlaceTab } from "./WinPlaceTab";
import { TrioTab } from "./TrioTab";
import { btn, btnPrimary, code, control, cx, empty, errorBox, field, fieldLabel, note, page, panel, rangeBar, rangeMeta } from "../kit";

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

/** Filter-grid cell and control: fill the column instead of the 104px minimum. */
const filterField = "flex min-w-0 flex-col gap-1";
const filterControl = "h-8 w-full min-w-0 rounded-[7px] border border-aline bg-panel px-2 py-1.5 text-[13px] text-ink";

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
    <div className={page}>
      <form
        className={rangeBar}
        onSubmit={(e) => {
          e.preventDefault();
          if (validDraft) setRange(draft);
        }}
      >
        <div className={field}>
          <label htmlFor="aFrom" className={fieldLabel}>From</label>
          <input type="date" id="aFrom" className={control} value={draft.from} max={draft.to} onChange={(e) => setDraft({ ...draft, from: e.target.value })} />
        </div>
        <div className={field}>
          <label htmlFor="aTo" className={fieldLabel}>To</label>
          <input type="date" id="aTo" className={control} value={draft.to} min={draft.from} onChange={(e) => setDraft({ ...draft, to: e.target.value })} />
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
      {loading && !data && <div className={cx(panel, empty)}>Running analysis for {range.from} → {range.to}… this can take a few seconds the first time.</div>}

      {data && (
        <div className={loading ? "pointer-events-none opacity-55 transition-opacity" : "transition-opacity"}>
          <div className="sticky top-0 z-20 mt-1 grid grid-cols-6 gap-x-3 gap-y-2.5 border-b border-aline bg-page/88 pt-2.5 pb-3 backdrop-blur-md max-[820px]:grid-cols-3 max-[480px]:grid-cols-2">
            <div className={filterField}>
              <label htmlFor="fcls" className={fieldLabel}>Class</label>
              <select id="fcls" className={filterControl} value={F.cls} onChange={(e) => setF({ ...F, cls: e.target.value })}>
                {opts([["", "All"], ...classes.map((c): Opt => [c, c])])}
              </select>
            </div>
            <div className={filterField}>
              <label htmlFor="fvenue" className={fieldLabel}>Venue</label>
              <select id="fvenue" className={filterControl} value={F.venue} onChange={(e) => setF({ ...F, venue: e.target.value })}>
                {opts([["", "All"], ["HV", "HV"], ["ST", "ST"]])}
              </select>
            </div>
            {NUM_FIELDS.map(({ label, inputs, step }) => (
              <div className={filterField} key={label}>
                <label htmlFor={`f${inputs[0]!.key}`} className={fieldLabel}>{label}</label>
                <div className="flex gap-1">
                  {inputs.map(({ key, placeholder }) => (
                    <input
                      key={key}
                      id={`f${key}`}
                      type="number"
                      className={cx(filterControl, "tabular-nums placeholder:text-[#b3b8c0]")}
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
            <div className={filterField}>
              <label htmlFor="fmkt" className={fieldLabel}>Top pick is</label>
              <select id="fmkt" className={filterControl} value={F.mkt} onChange={(e) => setF({ ...F, mkt: e.target.value })}>
                {opts([["", "Any market rank"], ["fav", "Favourite"], ["nonfav", "Not favourite"], ["long", "Market rank 5+"]])}
              </select>
            </div>
            <button type="button" className={cx(btn, "self-end justify-self-start")} onClick={() => setF(EMPTY_FILTERS)}>
              Reset
            </button>
            <div className="col-span-full -mt-1 justify-self-end whitespace-nowrap text-[13px] text-muted max-[480px]:justify-self-start [&_b]:text-ink [&_b]:tabular-nums">
              <b>{races.length}</b> of {all.length} races · <b>{races.reduce((s, r) => s + r.h.length, 0).toLocaleString()}</b> predictions
            </div>
          </div>

          <header className="block pt-[18px] pb-1 [&_h1]:mb-1 [&_h1]:text-xl [&_h1]:font-semibold [&_h1]:tracking-[-.01em] [&_h1]:text-ink [&_p]:text-[13px] [&_p]:text-muted">
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
            <div className={cx(panel, empty)}>No races match these filters.</div>
          ) : tab === "win-place" ? (
            <WinPlaceTab races={races} />
          ) : (
            <TrioTab races={races} />
          )}

          <p className={note}>
            Every panel reflects the date range and filters. Source: saved racecards in <code className={code}>data/racecards/</code> matched to results in <code className={code}>data/historical/</code>. Odds are starting
            prices where recorded; stakes are $10 flat.
          </p>
        </div>
      )}
    </div>
  );
}
