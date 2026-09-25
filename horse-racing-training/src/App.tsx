import { useEffect, useMemo, useRef, useState } from "react";
import { api } from "./api";
import { BET_TYPES, countCombos, cost } from "../shared/betEngine/index";
import type {
  MeetingRef,
  MeetingDetail,
  RaceCard,
  BetTypeId,
  BetSelection,
  SettleResult,
  HistoryEntry,
} from "../shared/types";
import { RaceCardTable, BetTypePicker, CostBar, ResultModal, ResultPanel, HistoryPage, legSummary, ymd, type Role } from "./ui";
import type { RaceResult } from "../shared/types";
import { AnalyzerPage } from "./analyzer/AnalyzerPage";
import { MomentumPage } from "./momentum/MomentumPage";
import { useTranslation } from "react-i18next";
import { useGlossary } from "./i18n/glossary";
import { LangSwitch, useFmt } from "./i18n/useLanguage";
import { MobileNav } from "./MobileNav";
import { Footer, LEGAL_VIEWS, LegalDoc, SiteMap } from "./LegalPages";
import { Display, btn, container, control, cx, errorBox, field, fieldLabel, panel, pill, pillRow } from "./kit";

/** Publish the sticky header's height as --header-h so other sticky bars can sit just below it. */
function useHeaderHeightVar() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const publish = () => document.documentElement.style.setProperty("--header-h", `${el.offsetHeight}px`);
    publish();
    const ro = new ResizeObserver(publish);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return ref;
}

/** false until `v` is first true, then true for good. */
function useOnceTrue(v: boolean): boolean {
  const [seen, setSeen] = useState(v);
  if (v && !seen) setSeen(true);
  return seen || v;
}

const VIEWS = ["bet", "history", "win-place", "trio", "momentum", ...LEGAL_VIEWS] as const;
type View = (typeof VIEWS)[number];
const DEFAULT_VIEW: View = "bet";
const TABS = [
  ["bet", "nav.bet"],
  ["history", "nav.history"],
  ["win-place", "nav.winPlace"],
  ["trio", "nav.trio"],
  ["momentum", "nav.momentum"],
] as const satisfies readonly (readonly [View, `nav.${string}`])[];
const navBtn = (on: boolean) =>
  on
    ? "inline-flex h-9 flex-none cursor-pointer items-center rounded-full bg-surface-2 px-3.5 text-sm font-medium whitespace-nowrap text-ink"
    : "inline-flex h-9 flex-none cursor-pointer items-center rounded-full px-3.5 text-sm font-medium whitespace-nowrap text-ink-2 transition-colors hover:text-ink";
/** A race picked as a DT/TT leg but not the one being edited. */
const pickedLeg =
  "inline-flex h-9 flex-none cursor-pointer items-center justify-center rounded-full bg-accent-soft px-3.5 text-sm font-medium whitespace-nowrap text-accent";

/** Tab named by ?tab= in the URL; unknown or missing → the default tab. */
function readView(): View {
  const t = new URLSearchParams(window.location.search).get("tab");
  return VIEWS.find((v) => v === t) ?? DEFAULT_VIEW;
}

/** Current tab, mirrored to ?tab= so a copied link reopens it. Each switch is a history entry, so back/forward step between tabs. */
function useViewParam(): [View, (v: View) => void] {
  const [view, setViewState] = useState(readView);
  useEffect(() => {
    const onPop = () => setViewState(readView());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  const setView = (v: View) => {
    if (v === view) return;
    const url = new URL(window.location.href);
    if (v === DEFAULT_VIEW) url.searchParams.delete("tab");
    else url.searchParams.set("tab", v);
    window.history.pushState(null, "", url);
    setViewState(v);
  };
  return [view, setView];
}

interface Picks {
  bankers: number[];
  legs: number[];
}
const emptyPicks = (): Picks => ({ bankers: [], legs: [] });

export default function App() {
  const [days, setDays] = useState<MeetingRef[]>([]);
  const [meetingKey, setMeetingKey] = useState<string>(""); // "date_venue"
  const [meeting, setMeeting] = useState<MeetingDetail | null>(null);
  const [activeRace, setActiveRace] = useState(1);
  const [betType, setBetType] = useState<BetTypeId>("trio");
  const [cards, setCards] = useState<Record<number, RaceCard>>({});
  const [picks, setPicks] = useState<Record<number, Picks>>({});
  const [editRace, setEditRace] = useState(1);
  const [dtLegs, setDtLegs] = useState<number[]>([]); // chosen leg races for DT/TT
  const [result, setResult] = useState<SettleResult | null>(null);
  const [error, setError] = useState<string>("");
  const { t } = useTranslation(["common", "bet"]);
  const g = useGlossary();
  const fmt = useFmt();
  const [view, setView] = useViewParam();
  const headerRef = useHeaderHeightVar();
  /** For links that carry a view name as a string (footer, site map). */
  const selectView = (v: string) => {
    const known = VIEWS.find((x) => x === v);
    if (known) setView(known);
  };
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [raceResult, setRaceResult] = useState<RaceResult | null>(null);
  const analyzerOpened = useOnceTrue(view === "win-place" || view === "trio");

  // Load meeting list once, and open the last racing day (newest meeting on or before today, HK time).
  useEffect(() => {
    api
      .days()
      .then((ds) => {
        setDays(ds);
        const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Hong_Kong" }).format(new Date()).replaceAll("-", "");
        const last = ds.find((m) => m.date <= today) ?? ds[ds.length - 1]; // newest first; else the earliest upcoming
        if (last) setMeetingKey((k) => k || `${last.date}_${last.venue}`);
      })
      .catch((e) => setError(String(e)));
  }, []);

  // Refresh history whenever the History tab is opened.
  useEffect(() => {
    if (view === "history") api.history().then(setHistory).catch((e) => setError(String(e)));
  }, [view]);

  const [date, venue] = meetingKey ? meetingKey.split("_") : ["", ""];

  // When a meeting is picked: load detail, reset to R1, clear picks.
  useEffect(() => {
    if (!date || !venue) return;
    setPicks({});
    setCards({});
    setResult(null);
    api
      .meeting(date, venue)
      .then((m) => {
        setMeeting(m);
        setActiveRace(m.races[0] ?? 1);
        setEditRace(m.races[0] ?? 1);
      })
      .catch((e) => setError(String(e)));
  }, [meetingKey]);

  const legCount = BET_TYPES[betType].legRaces; // 1, 2 (DT), or 3 (TT)

  const dtPools = meeting?.doubleTrioPools ?? [];
  const ttPools = meeting?.tripleTrioPools ?? [];
  const officialPools = betType === "doubleTrio" ? dtPools : betType === "tripleTrio" ? ttPools : [];

  // Default the DT/TT leg races to the first designated pool when switching in.
  useEffect(() => {
    if (!meeting) return;
    if (betType === "doubleTrio") setDtLegs(meeting.doubleTrioPools[0] ?? []);
    else if (betType === "tripleTrio") setDtLegs(meeting.tripleTrioPools[0] ?? []);
  }, [betType, meeting]);

  // Which races this bet type collects picks in.
  const legRaces = useMemo<number[]>(() => {
    if (!meeting) return [];
    if (legCount > 1) return [...dtLegs].sort((a, b) => a - b);
    return [activeRace];
  }, [legCount, dtLegs, activeRace, meeting]);

  // Toggle a race in/out of the DT/TT leg set (max legCount).
  function toggleLeg(rn: number) {
    setDtLegs((prev) =>
      prev.includes(rn) ? prev.filter((x) => x !== rn) : prev.length < legCount ? [...prev, rn] : prev
    );
    setEditRace(rn);
  }

  // Keep editRace inside the current leg set.
  useEffect(() => {
    if (legRaces.length && !legRaces.includes(editRace)) setEditRace(legRaces[0]!);
  }, [legRaces, editRace]);

  // Lazy-load the card for whatever race we're editing.
  useEffect(() => {
    if (!date || !venue || !editRace || cards[editRace]) return;
    api
      .race(date, venue, editRace)
      .then((c) => setCards((p) => ({ ...p, [editRace]: c })))
      .catch((e) => setError(String(e)));
  }, [date, venue, editRace, cards]);

  const bankerEnabled = BET_TYPES[betType].banker;

  function roleOf(rn: number, horse: number): Role {
    const p = picks[rn];
    if (!p) return "none";
    if (p.bankers.includes(horse)) return "banker";
    if (p.legs.includes(horse)) return "leg";
    return "none";
  }

  // Cycle none → leg → banker(if enabled) → none.
  function cycle(rn: number, horse: number) {
    setPicks((prev) => {
      const p = prev[rn] ?? emptyPicks();
      const role = p.bankers.includes(horse) ? "banker" : p.legs.includes(horse) ? "leg" : "none";
      let bankers = p.bankers.filter((h) => h !== horse);
      let legs = p.legs.filter((h) => h !== horse);
      if (role === "none") legs = [...legs, horse];
      else if (role === "leg") {
        if (bankerEnabled) bankers = [...bankers, horse];
        // else: clears
      }
      // role === "banker" → cleared (already filtered out)
      return { ...prev, [rn]: { bankers, legs } };
    });
  }

  // Build the selection DTO. Non-banker pools fold bankers into legs.
  const selection = useMemo<BetSelection>(() => {
    // Engine treats pool = bankers ∪ legs, and counts combos from leg count
    // (excluding bankers). So keep them disjoint. Non-banker pools fold any
    // banker-tagged picks back into plain legs.
    const raceLegs = legRaces.map((rn) => {
      const p = picks[rn] ?? emptyPicks();
      return bankerEnabled
        ? { raceNumber: rn, bankers: p.bankers, legs: p.legs }
        : { raceNumber: rn, bankers: [], legs: [...p.bankers, ...p.legs] };
    });
    return { type: betType, raceLegs };
  }, [legRaces, picks, betType, bankerEnabled]);

  const combos = countCombos(selection);
  const totalCost = cost(selection);
  const canSubmit = combos > 0 && (meeting?.hasResults ?? false);

  async function submit() {
    if (!date || !venue) return;
    setError("");
    try {
      const r = await api.settle({ date, venue: venue as MeetingRef["venue"], selection });
      setResult(r);
      // Record the settled bet to history.
      const picks = selection.raceLegs.map((l) => `R${l.raceNumber} ${legSummary(l)}`).join("  |  ");
      const multi = r.legResults.length > 1;
      const resultStr = r.legResults
        .map((lr) => {
          const top4 = lr.finishers.slice(0, 4).map((f) => f.horseNumber).join("-");
          return multi ? `R${lr.raceNumber}:${top4}` : top4;
        })
        .join("  ");
      const entry: HistoryEntry = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        ts: new Date().toISOString(),
        date,
        venue: venue as MeetingRef["venue"],
        betType,
        betLabel: BET_TYPES[betType].label,
        picks,
        result: resultStr,
        combos,
        cost: totalCost,
        hit: r.hit,
        payout: r.payout,
        net: r.net,
        poolDividendText: r.poolDividendText,
      };
      api.addHistory(entry).catch((e) => setError(String(e)));
    } catch (e) {
      setError(String(e));
    }
  }

  const card = cards[editRace];

  /** Display-only leg summary ("膽 1,2  腳 3" / "B 1,2  L 3"); history keeps legSummary's stored format. */
  const legLabel = (leg: { bankers: number[]; legs: number[] } | undefined) => {
    if (!leg) return "—";
    const parts = [
      leg.bankers.length ? `${t("role.bankerShort")} ${leg.bankers.join(",")}` : "",
      leg.legs.length ? `${t("role.legShort")} ${leg.legs.join(",")}` : "",
    ].filter(Boolean);
    return parts.join("  ") || "—";
  };

  const meetingSelect = (
    <select id="bDay" className={cx(control, "w-full sm:w-auto sm:min-w-[300px]")} value={meetingKey} disabled={!days.length} onChange={(e) => setMeetingKey(e.target.value)}>
      {!meetingKey && <option value="">{days.length ? t("bet:selectDay") : t("state.loading")}</option>}
      {days.map((m) => (
        <option key={`${m.date}_${m.venue}`} value={`${m.date}_${m.venue}`}>
          {t("bet:dayOption", { date: fmt.date(ymd(m.date)), venue: g.venue(m.venue), races: t("races", { count: m.races.length }) })}
          {m.hasResults ? "" : t("bet:noResultsSuffix")}
        </option>
      ))}
    </select>
  );

  return (
    <div className="flex min-h-dvh flex-col">
      <header ref={headerRef} className="sticky top-0 z-40 border-b border-edge bg-canvas/80 backdrop-blur-md">
        <div className={cx(container, "flex h-16 items-center gap-6")}>
          <h1 className="flex-none font-display text-xl leading-none tracking-[-0.01em] text-ink lg:text-[22px]">{t("appName")}</h1>
          {/* Desktop: inline tabs (+ meeting picker on Bet). Below lg: menu button → MobileNav sheet. */}
          <nav aria-label={t("nav.sections")} className="hidden gap-1 lg:flex">
            {TABS.map(([v, key]) => (
              <button key={v} className={navBtn(view === v)} aria-current={view === v ? "page" : undefined} onClick={() => setView(v)}>
                {t(key)}
              </button>
            ))}
          </nav>
          <div className="hidden lg:ml-auto lg:block">
            <LangSwitch />
          </div>
          <MobileNav title={t("appName")} tabs={TABS.map(([v, key]) => [v, t(key)] as [View, string])} view={view} onSelect={setView} />
        </div>
      </header>

      <main className={cx(container, "flex-1 pb-12")}>
        {error && <div className={errorBox}>{error}</div>}

        {/* Analyzer performance. Stays mounted once opened so the range, filters
            and loaded analysis survive switching to other tabs and back. */}
        {analyzerOpened && (
          <div hidden={view !== "win-place" && view !== "trio"}>
            <AnalyzerPage tab={view === "trio" ? "trio" : "win-place"} />
          </div>
        )}

        {view === "momentum" && <MomentumPage />}

        {view === "history" && (
          <HistoryPage
            entries={history}
            onDelete={(id) => api.deleteHistory(id).then(setHistory).catch((e) => setError(String(e)))}
            onClear={() => api.clearHistory().then(setHistory).catch((e) => setError(String(e)))}
          />
        )}

        {view === "bet" && (
          // Page head: title left, racing-day picker right (stacked on phones) — same as Momentum.
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <Display
              sub={
                meeting
                  ? t("bet:subMeeting", { date: fmt.date(ymd(meeting.date)), venue: g.venue(meeting.venue), races: t("races", { count: meeting.races.length }) })
                  : t("bet:subEmpty")
              }
            >
              {t("bet:title")}
            </Display>
            <div className={cx(field, "w-full sm:w-auto sm:pb-2")}>
              <label htmlFor="bDay" className={fieldLabel}>
                {t("bet:racingDay")}
              </label>
              {meetingSelect}
            </div>
          </div>
        )}

        {view === "bet" && meeting && (
          <>
            {/* Race tabs (browse + single-race selection) */}
            <nav aria-label={t("bet:racesNav")} className={cx(pillRow, "mt-5")}>
              {meeting.races.map((rn) => (
                <button
                  key={rn}
                  className={cx(pill(rn === activeRace), "min-w-12 flex-none")}
                  aria-current={rn === activeRace ? "true" : undefined}
                  onClick={() => {
                    setActiveRace(rn);
                    if (legRaces.length <= 1) setEditRace(rn);
                  }}
                >
                  {t("raceShort", { n: rn })}
                </button>
              ))}
            </nav>

            <BetTypePicker
              value={betType}
              onChange={setBetType}
              dtAvailable={dtPools.length > 0}
              ttAvailable={ttPools.length > 0}
            />

            {/* Multi-race leg chooser */}
            {legCount > 1 && (
              <div className={cx(panel, "mt-4 flex flex-col gap-4")}>
                {officialPools.length > 0 && (
                  <div>
                    <div className="mb-2 text-xs font-medium text-ink-2">{t("bet:pools", { type: g.betType(betType) })}</div>
                    <div className={pillRow}>
                      {officialPools.map((pool) => {
                        const active = [...dtLegs].sort((a, b) => a - b).join() === [...pool].sort((a, b) => a - b).join();
                        return (
                          <button
                            key={pool.join()}
                            className={cx(pill(active), "flex-none")}
                            aria-pressed={active}
                            onClick={() => { setDtLegs(pool); setEditRace(pool[0]!); }}
                          >
                            {pool.map((rn) => t("raceShort", { n: rn })).join(" · ")}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
                <div>
                  <div className="mb-2 text-xs font-medium text-ink-2">
                    {t("bet:pickAny", { n: legCount, picked: dtLegs.length })}
                  </div>
                  <div className={pillRow}>
                    {meeting.races.map((rn) => {
                      const picked = dtLegs.includes(rn);
                      const isEdit = rn === editRace && picked;
                      return (
                        <button
                          key={rn}
                          className={cx(isEdit ? pill(true) : picked ? pickedLeg : pill(false), "min-w-12 flex-none")}
                          aria-pressed={picked}
                          disabled={!picked && dtLegs.length >= legCount}
                          onClick={() => toggleLeg(rn)}
                        >
                          {t("raceShort", { n: rn })}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <p className="text-xs text-ink-3">{t("bet:customNote")}</p>
              </div>
            )}

            {/* Edit which leg's picks you're entering. */}
            {legCount > 1 && legRaces.length > 0 && (
              <div className="mt-4">
                <div className="mb-2 text-xs font-medium text-ink-2">{t("bet:editing")}</div>
                <div className={pillRow}>
                  {legRaces.map((rn) => (
                    <button key={rn} className={cx(pill(rn === editRace), "flex-none")} aria-pressed={rn === editRace} onClick={() => setEditRace(rn)}>
                      {t("raceShort", { n: rn })}
                      <em className={cx("not-italic", rn === editRace ? "text-white/70" : "text-ink-3")}>
                        {legLabel(selection.raceLegs.find((l) => l.raceNumber === rn))}
                      </em>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-5 flex justify-end">
              <button
                className={btn}
                disabled={!meeting.hasResults}
                title={meeting.hasResults ? "" : t("bet:noResultsMeeting")}
                onClick={() =>
                  date && venue && api.result(date, venue, editRace).then(setRaceResult).catch((e) => setError(String(e)))
                }
              >
                {t("bet:showResult", { race: t("raceShort", { n: editRace }) })}
              </button>
            </div>

            {card ? (
              <RaceCardTable
                card={card}
                roleOf={(h) => roleOf(editRace, h)}
                onCycle={(h) => cycle(editRace, h)}
                bankerEnabled={bankerEnabled}
              />
            ) : (
              <div className={cx(panel, "mt-3 text-center text-ink-3")}>{t("bet:loadingRace", { n: editRace })}</div>
            )}

            <CostBar combos={combos} cost={totalCost} canSubmit={canSubmit} onSubmit={submit} />
            {!meeting.hasResults && <p className="mt-3 text-[13px] text-warn">{t("bet:settlementDisabled")}</p>}
          </>
        )}

        {(view === "privacy" || view === "terms" || view === "sales" || view === "legal") && <LegalDoc view={view} />}
        {view === "sitemap" && <SiteMap tools={TABS.map(([v, key]) => [v, t(key)])} onSelect={selectView} />}
      </main>

      <Footer onSelect={selectView} />

      {result && <ResultModal result={result} onClose={() => setResult(null)} />}
      {raceResult && <ResultPanel result={raceResult} onClose={() => setRaceResult(null)} />}
    </div>
  );
}
