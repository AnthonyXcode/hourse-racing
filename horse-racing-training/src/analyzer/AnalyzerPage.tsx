// Analyzer performance: how the form analyzer + model's predictions
// held up against real results. The server runs the analysis for the chosen
// date range; every panel below it is computed client-side from that payload.
import { useEffect, useMemo, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useGlossary } from "../i18n/glossary";
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
const NUM_FIELDS = [
  { label: "filters.fieldMin", key: "fieldMin" },
  { label: "filters.diffMin", key: "diffMin" },
  { label: "filters.sparse", key: "sparse" },
  { label: "filters.close", key: "close" },
  { label: "filters.gap", key: "gap", step: 0.5 },
  { label: "filters.mcPlace", key: "mcPlace", step: 5 },
  { label: "filters.trip", key: "trip" },
  { label: "filters.mktPos", key: "mktPos" },
] as const satisfies readonly { label: `filters.${string}`; key: NumKey; step?: number }[];

/** Filter-grid cell and control: fill the column. */
const filterControl = cx(control, "w-full");

export function AnalyzerPage({ tab }: { tab: AnalyzerTab }) {
  const { t } = useTranslation("analyzer");
  const { t: tc } = useTranslation();
  const g = useGlossary();
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
    ? t("sub.intro")
    : tab === "win-place"
      ? t("sub.winPlace", { races: all.length.toLocaleString(), span, preds: all.reduce((s, r) => s + r.h.length, 0).toLocaleString() })
      : t("sub.trio", { settled: all.filter(isSettled).length.toLocaleString(), span, paid: all.filter((r) => r.td > 0).length.toLocaleString() });

  return (
    <div className={page}>
      <Display sub={sub}>{tab === "win-place" ? t("title.winPlace") : t("title.trio")}</Display>

      <form
        className={cx(rangeBar, "mt-4")}
        onSubmit={(e) => {
          e.preventDefault();
          if (validDraft) setRange(draft);
        }}
      >
        <div className={field}>
          <label htmlFor="aFrom" className={fieldLabel}>{t("range.from")}</label>
          <input type="date" id="aFrom" className={cx(control, "w-full")} value={draft.from} max={draft.to} onChange={(e) => setDraft({ ...draft, from: e.target.value })} />
        </div>
        <div className={field}>
          <label htmlFor="aTo" className={fieldLabel}>{t("range.to")}</label>
          <input type="date" id="aTo" className={cx(control, "w-full")} value={draft.to} min={draft.from} onChange={(e) => setDraft({ ...draft, to: e.target.value })} />
        </div>
        <button type="submit" className={btnPrimary} disabled={loading || !validDraft || (!dirty && !error)}>
          {loading ? t("range.running") : t("range.run")}
        </button>
        <button type="button" className={btn} disabled={loading} onClick={() => { const r = lastYear(); setDraft(r); setRange(r); }}>
          {t("range.last12")}
        </button>
        {data && !loading && (
          <span className={rangeMeta}>
            {t("range.meta", { races: all.length.toLocaleString(), at: data.generatedAt.slice(0, 16).replace("T", " ") })}
          </span>
        )}
      </form>

      {error && <div className={errorBox}>{error}</div>}
      {loading && !data && <div className={cx(panel, empty, "mt-4")}>{t("range.runningFor", { from: range.from, to: range.to })}</div>}

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
              <span>{activeFilters ? t("filters.toggleActive", { n: activeFilters }) : t("filters.toggle")}</span>
              <span aria-hidden className="text-ink-3">{filtersOpen ? "▲" : "▼"}</span>
            </button>
            <div id="analyzer-filters" className={cx(filtersOpen ? "grid" : "hidden", "grid-cols-2 gap-x-3 gap-y-3 sm:grid sm:grid-cols-3 lg:grid-cols-6")}>
              <div className={field}>
                <label htmlFor="fcls" className={fieldLabel}>{tc("word.class")}</label>
                <select id="fcls" className={filterControl} value={F.cls} onChange={(e) => setF({ ...F, cls: e.target.value })}>
                  {opts([["", tc("word.all")], ...classes.map((c): Opt => [c, g.raceClass(c)])])}
                </select>
              </div>
              <div className={field}>
                <label htmlFor="fvenue" className={fieldLabel}>{tc("word.venue")}</label>
                <select id="fvenue" className={filterControl} value={F.venue} onChange={(e) => setF({ ...F, venue: e.target.value })}>
                  {opts([["", tc("word.all")], ["HV", g.venue("HV")], ["ST", g.venue("ST")]])}
                </select>
              </div>
              {NUM_FIELDS.map((f) => (
                <div className={field} key={f.key}>
                  <label htmlFor={`f${f.key}`} className={fieldLabel}>{t(f.label)}</label>
                  <input
                    id={`f${f.key}`}
                    type="number"
                    className={cx(filterControl, "tabular-nums")}
                    min={0}
                    step={"step" in f ? f.step : 1}
                    inputMode="decimal"
                    placeholder={tc("word.any")}
                    value={F[f.key]}
                    onChange={(e) => setF({ ...F, [f.key]: e.target.value })}
                  />
                </div>
              ))}
              <div className={field}>
                <label htmlFor="fmkt" className={fieldLabel}>{t("filters.topPickIs")}</label>
                <select id="fmkt" className={filterControl} value={F.mkt} onChange={(e) => setF({ ...F, mkt: e.target.value })}>
                  {opts([["", t("filters.mktAny")], ["fav", t("filters.mktFav")], ["nonfav", t("filters.mktNonFav")], ["long", t("filters.mktLong")]])}
                </select>
              </div>
              <button type="button" className={cx(btn, "self-end justify-self-start")} onClick={() => setF(EMPTY_FILTERS)}>
                {tc("action.reset")}
              </button>
            </div>
            <div className="mt-2 text-[13px] text-ink-2 sm:text-right [&_b]:font-semibold [&_b]:text-ink [&_b]:tabular-nums">
              <Trans
                t={t}
                i18nKey="filters.status"
                values={{ shown: races.length, total: all.length, preds: races.reduce((s, r) => s + r.h.length, 0).toLocaleString() }}
                components={{ b: <b /> }}
              />
            </div>
          </div>

          {races.length === 0 ? (
            <div className={cx(panel, empty, "mt-6")}>{t("filters.noMatch")}</div>
          ) : tab === "win-place" ? (
            <WinPlaceTab races={races} />
          ) : (
            <TrioTab races={races} />
          )}

          <p className={cx(note, "mt-10")}>
            <Trans t={t} i18nKey="footer" components={{ code: <code className={code} /> }} />
          </p>
        </div>
      )}
    </div>
  );
}
