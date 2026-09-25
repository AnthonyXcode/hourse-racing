// Analyzer performance: how the form analyzer + model's predictions
// held up against real results. The server runs the analysis for the chosen
// date range; every panel below it is computed client-side from that payload.
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Trans, useTranslation } from "react-i18next";
import { useGlossary } from "../i18n/glossary";
import { api } from "../api";
import { type AnalyzerPayload, type Filters, EMPTY_FILTERS, VENUE_DEFAULTS, applyFilters, isSettled, untouchedPreset } from "../../shared/analyzer/model";
import { WinPlaceTab } from "./WinPlaceTab";
import { TrioTab } from "./TrioTab";
import { Display, btn, btnPrimary, code, control, cx, empty, errorBox, field, fieldLabel, note, page, panel, rangeBar, rangeMeta } from "../kit";

export type AnalyzerTab = "win-place" | "trio";

const ymd = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
/** The last `n` months up to today. */
function lastMonths(n: number): { from: string; to: string } {
  const to = new Date(), from = new Date(to);
  from.setMonth(from.getMonth() - n);
  return { from: ymd(from), to: ymd(to) };
}
// Presets beside Run. The first is the default: a short range keeps the first analysis quick.
const PRESETS = [
  { months: 3, key: "range.last3" },
  { months: 12, key: "range.last12" },
] as const;

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
/** Open/close of the filter grid: quick, eased out, height + fade. */
const COLLAPSE = { duration: 0.24, ease: [0.2, 0, 0, 1] } as const;

export function AnalyzerPage({ tab }: { tab: AnalyzerTab }) {
  const { t } = useTranslation("analyzer");
  const { t: tc } = useTranslation();
  const g = useGlossary();
  const [range, setRange] = useState(() => lastMonths(PRESETS[0].months));
  const [draft, setDraft] = useState(range);
  const [data, setData] = useState<AnalyzerPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [F, setF] = useState<Filters>(EMPTY_FILTERS);
  // Default filters = the tuned strategy for the venue of the next meeting (else the last one).
  const [homeVenue, setHomeVenue] = useState<"HV" | "ST" | null>(null);
  useEffect(() => {
    api
      .days()
      .then((days) => {
        const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Hong_Kong" }).format(new Date()).replaceAll("-", "");
        const next = [...days].filter((m) => m.date >= today).sort((a, b) => a.date.localeCompare(b.date))[0];
        const v = (next ?? days[0])?.venue; // days: newest first
        if (v !== "HV" && v !== "ST") return;
        setHomeVenue(v);
        setF((cur) => (cur === EMPTY_FILTERS ? VENUE_DEFAULTS[v] : cur)); // unless the user already changed something
      })
      .catch(() => {}); // no meetings list: stay unfiltered
  }, []);
  // The filter grid is collapsed behind a toggle (all widths); a one-line summary shows what's applied.
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
  /** "Happy Valley · Turf · Sparse form ≤ 3 · …" — labels carry their comparison, e.g. "Sparse form (≤)". */
  const filterSummary = [
    F.venue && g.venue(F.venue),
    F.surface && g.surface(F.surface),
    F.cls && g.raceClass(F.cls),
    ...NUM_FIELDS.filter((f) => F[f.key].trim() !== "").map((f) => `${t(f.label).replace(/\s*[(（]\s*([≥≤])\s*[)）]\s*$/, " $1")} ${F[f.key]}`),
    F.mkt && { fav: t("filters.mktFav"), nonfav: t("filters.mktNonFav"), long: t("filters.mktLong") }[F.mkt],
  ]
    .filter(Boolean)
    .join(" · ");

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
        <button type="submit" className={cx(btnPrimary, "col-span-2 sm:col-span-1")} disabled={loading || !validDraft || (!dirty && !error)}>
          {loading ? t("range.running") : t("range.run")}
        </button>
        {PRESETS.map(({ months, key }) => {
          const r = lastMonths(months);
          const on = range.from === r.from && range.to === r.to;
          return (
            <button
              key={months}
              type="button"
              className={cx(btn, on && "bg-accent-soft! font-semibold text-accent! shadow-none ring-1 ring-accent enabled:hover:bg-accent-soft!")}
              aria-pressed={on}
              disabled={loading}
              onClick={() => {
                setDraft(r);
                if (!on || error) setRange(r); // already showing it: no re-run unless the last run failed
              }}
            >
              {t(key)}
            </button>
          );
        })}
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
          <div className="sticky top-(--header-h,64px) z-20 -mx-4 mt-4 border-b border-edge bg-canvas/85 px-4 pt-3 pb-3 backdrop-blur-md sm:mx-0 sm:px-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              <button
                type="button"
                className={cx(btn, "h-9 w-full flex-none justify-between gap-3 sm:w-auto")}
                aria-expanded={filtersOpen}
                aria-controls="analyzer-filters"
                onClick={() => setFiltersOpen((o) => !o)}
              >
                <span>{activeFilters ? t("filters.toggleActive", { n: activeFilters }) : t("filters.toggle")}</span>
                <motion.span aria-hidden className="inline-block text-ink-3" animate={{ rotate: filtersOpen ? 180 : 0 }} transition={COLLAPSE}>
                  ▼
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {!filtersOpen && filterSummary && (
                  <motion.p
                    key="summary"
                    className="min-w-0 truncate text-xs text-ink-2"
                    title={filterSummary}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {filterSummary}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <AnimatePresence initial={false}>
              {filtersOpen && (
            <motion.div
              key="filters"
              id="analyzer-filters"
              className="overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={COLLAPSE}
            >
            {/* inner padding keeps focus rings from being clipped by overflow-hidden */}
            <div className="grid grid-cols-2 gap-x-3 gap-y-3 px-0.5 pt-3 pb-0.5 sm:grid-cols-3 lg:grid-cols-6">
              <div className={field}>
                <label htmlFor="fcls" className={fieldLabel}>{tc("word.class")}</label>
                <select id="fcls" className={filterControl} value={F.cls} onChange={(e) => setF({ ...F, cls: e.target.value })}>
                  {opts([["", tc("word.all")], ...classes.map((c): Opt => [c, g.raceClass(c)])])}
                </select>
              </div>
              <div className={field}>
                <label htmlFor="fvenue" className={fieldLabel}>{tc("word.venue")}</label>
                <select
                  id="fvenue"
                  className={filterControl}
                  value={F.venue}
                  onChange={(e) => {
                    const v = e.target.value;
                    // Untouched defaults follow the venue (each venue has its own strategy); edited filters are kept.
                    if ((v === "HV" || v === "ST") && untouchedPreset(F)) setF(VENUE_DEFAULTS[v]);
                    else setF({ ...F, venue: v });
                  }}
                >
                  {opts([["", tc("word.all")], ["HV", g.venue("HV")], ["ST", g.venue("ST")]])}
                </select>
              </div>
              <div className={field}>
                <label htmlFor="fsurface" className={fieldLabel}>{t("filters.surface")}</label>
                <select id="fsurface" className={filterControl} value={F.surface} onChange={(e) => setF({ ...F, surface: e.target.value })}>
                  {opts([["", tc("word.all")], ["Turf", g.surface("Turf")], ["AWT", g.surface("AWT")]])}
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
              <button type="button" className={cx(btn, "self-end justify-self-start")} onClick={() => setF(homeVenue ? VENUE_DEFAULTS[homeVenue] : EMPTY_FILTERS)} title={t("filters.resetT")}>
                {tc("action.reset")}
              </button>
            </div>
            </motion.div>
              )}
            </AnimatePresence>
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
