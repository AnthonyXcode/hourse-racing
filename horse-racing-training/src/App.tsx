import { useEffect, useMemo, useRef, useState } from "react";
import { api } from "./api";
import { BET_TYPES, countCombos } from "../shared/betEngine/index";
import type { MeetingRef, MeetingDetail, RaceCard, BetTypeId, BetSelection, HistoryEntry } from "../shared/types";
import { RaceCardTable, PoolMenu, StakeBar, ResultModal, ResultPanel, HistoryPage, emptyPicks, legSummary, usePoolName, ymd, type PickCol, type Picks, type Pool } from "./ui";
import { BetSlip } from "./BetSlip";
import { MIN_UNIT, scaleResult, type SettledBet, type SlipItem } from "./slip";
import type { RaceResult } from "../shared/types";
import { AnalyzerPage } from "./analyzer/AnalyzerPage";
import { MomentumPage } from "./momentum/MomentumPage";
import { SettingsPage } from "./SettingsPage";
import { useTranslation } from "react-i18next";
import { useGlossary } from "./i18n/glossary";
import { LangSwitch, useFmt } from "./i18n/useLanguage";
import { track } from "./analytics";
import { Footer, LEGAL_VIEWS, LegalDoc, SiteMap } from "./LegalPages";
import { PicksBanner } from "./momentum/PicksBanner";
import { useCutoffNotifications } from "./momentum/notify";
import { RaceAnalysisPanel } from "./RaceAnalysisPanel";
import { useSeo } from "./seo";
import { btnPill, chipBtn, container, control, cx, errorBox, panel, pill, pillRow } from "./kit";

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

const VIEWS = ["bet", "history", "win-place", "trio", "momentum", "settings", ...LEGAL_VIEWS] as const;
type View = (typeof VIEWS)[number];
const DEFAULT_VIEW: View = "bet";
/** How often the bet page re-polls the meeting list while visible. */
const DAYS_REFRESH_MS = 5 * 60_000;
const TABS = [
  ["bet", "nav.bet"],
  ["history", "nav.history"],
  ["win-place", "nav.winPlace"],
  ["trio", "nav.trio"],
  ["momentum", "nav.momentum"],
  ["settings", "nav.settings"],
] as const satisfies readonly (readonly [View, `nav.${string}`])[];
/** Primary tab: HKJC-style block, navy when active. */
const navBtn = (on: boolean) =>
  on
    ? "inline-flex h-10 flex-none cursor-pointer items-center bg-navy-700 px-4 text-[15px] font-medium whitespace-nowrap text-white"
    : "inline-flex h-10 flex-none cursor-pointer items-center px-4 text-[15px] whitespace-nowrap text-ink transition-colors hover:bg-sky-50";
/** A race picked as a DT/TT leg but not the one being edited. */
const pickedLeg =
  "inline-flex size-8 flex-none cursor-pointer items-center justify-center rounded-full bg-sky-150 text-[15px] font-medium text-navy-900 ring-2 ring-navy-700";

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
    if (v !== "momentum") for (const k of ["day", "race", "cutoff"]) url.searchParams.delete(k); // Momentum-only state
    window.history.pushState(null, "", url);
    setViewState(v);
  };
  return [view, setView];
}

export default function App() {
  const [days, setDays] = useState<MeetingRef[]>([]);
  const [meetingKey, setMeetingKey] = useState<string>(""); // "date_venue"
  const [meeting, setMeeting] = useState<MeetingDetail | null>(null);
  const [activeRace, setActiveRace] = useState(1);
  const [pool, setPool] = useState<Pool>("wp");
  const [cards, setCards] = useState<Record<number, RaceCard>>({});
  const [picks, setPicks] = useState<Record<number, Picks>>({});
  const [editRace, setEditRace] = useState(1);
  const [dtLegs, setDtLegs] = useState<number[]>([]); // chosen leg races for DT/TT
  const [unit, setUnit] = useState(MIN_UNIT);
  const [slip, setSlip] = useState<SlipItem[]>([]);
  const [settled, setSettled] = useState<SettledBet[] | null>(null);
  const [error, setError] = useState<string>("");
  const { t } = useTranslation(["common", "bet"]);
  useCutoffNotifications();
  const g = useGlossary();
  const poolName = usePoolName();
  const fmt = useFmt();
  const [view, setView] = useViewParam();
  useSeo(view);
  const headerRef = useHeaderHeightVar();
  /** For links that carry a view name as a string (footer, site map). */
  const selectView = (v: string) => {
    const known = VIEWS.find((x) => x === v);
    if (known) setView(known);
  };
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [raceResult, setRaceResult] = useState<RaceResult | null>(null);
  const analyzerOpened = useOnceTrue(view === "win-place" || view === "trio");

  // Load the meeting list and open the last racing day (newest meeting on or before today, HK time).
  // Re-poll while the tab is visible and on returning to it: the server fetches new racecards/results
  // every 5 min, so a tab left open would otherwise never see them.
  useEffect(() => {
    let live = true;
    let first = true;
    const load = () =>
      api
        .days()
        .then((ds) => {
          if (!live) return;
          setDays(ds);
          const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Hong_Kong" }).format(new Date()).replaceAll("-", "");
          const last = ds.find((m) => m.date <= today) ?? ds[ds.length - 1]; // newest first; else the earliest upcoming
          if (last) setMeetingKey((k) => k || `${last.date}_${last.venue}`);
        })
        .catch((e) => first && setError(String(e))) // background refresh failures stay quiet
        .finally(() => (first = false));
    load();
    const onShow = () => document.visibilityState === "visible" && load();
    const timer = setInterval(onShow, DAYS_REFRESH_MS);
    document.addEventListener("visibilitychange", onShow);
    return () => {
      live = false;
      clearInterval(timer);
      document.removeEventListener("visibilitychange", onShow);
    };
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
    api
      .meeting(date, venue)
      .then((m) => {
        setMeeting(m);
        setActiveRace(m.races[0] ?? 1);
        setEditRace(m.races[0] ?? 1);
      })
      .catch((e) => setError(String(e)));
  }, [meetingKey]);

  // A refresh changed the open meeting (results posted, races added): reload its detail and cards
  // (cards pick up final odds from results), keeping the user's picks.
  const openRef = days.find((m) => m.date === date && m.venue === venue);
  const openSig = openRef ? `${openRef.races.join(",")}|${openRef.hasResults}` : "";
  useEffect(() => {
    if (!meeting || meeting.date !== date || meeting.venue !== venue) return; // still loading this meeting
    if (!openSig || openSig === `${meeting.races.join(",")}|${meeting.hasResults}`) return;
    api
      .meeting(date, venue)
      .then((m) => {
        setMeeting(m);
        setCards({});
      })
      .catch((e) => setError(String(e)));
  }, [openSig]); // eslint-disable-line react-hooks/exhaustive-deps

  /** The engine bet type behind the pool page (Win/Place settles as Win and/or Place). */
  const betType: BetTypeId = pool === "wp" ? "win" : pool;
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

  const bankerEnabled = pool !== "wp" && BET_TYPES[betType].banker;
  const bankerMax = BET_TYPES[betType].depth - 1;

  // Tick / untick a box. Banker and Select are exclusive for a horse; Win and Place are independent.
  function toggle(rn: number, col: PickCol, horse: number) {
    setPicks((prev) => {
      const p = { ...(prev[rn] ?? emptyPicks()) };
      const on = p[col].includes(horse);
      p[col] = on ? p[col].filter((h) => h !== horse) : [...p[col], horse];
      if (!on && col === "bankers") p.legs = p.legs.filter((h) => h !== horse);
      if (!on && col === "legs") p.bankers = p.bankers.filter((h) => h !== horse);
      return { ...prev, [rn]: p };
    });
  }

  // Field: every runner in a column (bankers stay bankers).
  function field(rn: number, col: PickCol, on: boolean) {
    const runners = (cards[rn]?.entries ?? []).filter((e) => !e.isScratched).map((e) => e.horseNumber);
    setPicks((prev) => {
      const p = { ...(prev[rn] ?? emptyPicks()) };
      p[col] = on ? runners.filter((h) => col !== "legs" || !p.bankers.includes(h)) : [];
      return { ...prev, [rn]: p };
    });
  }

  // The bets the current ticks make. Win/Place can make two; other pools one.
  // Engine counts combos from legs excluding bankers, so keep them disjoint; pools without
  // bankers fold any banker ticks back into legs.
  const selections = useMemo<BetSelection[]>(() => {
    if (pool === "wp") {
      const p = picks[activeRace] ?? emptyPicks();
      return (["win", "place"] as const)
        .filter((c) => p[c].length)
        .map((c) => ({ type: c, raceLegs: [{ raceNumber: activeRace, bankers: [], legs: p[c] }] }));
    }
    const raceLegs = legRaces.map((rn) => {
      const p = picks[rn] ?? emptyPicks();
      return bankerEnabled ? { raceNumber: rn, bankers: p.bankers, legs: p.legs } : { raceNumber: rn, bankers: [], legs: [...p.bankers, ...p.legs] };
    });
    return [{ type: betType, raceLegs }];
  }, [pool, legRaces, picks, betType, bankerEnabled, activeRace]);

  const combos = selections.reduce((s, sel) => s + countCombos(sel), 0);
  const canAdd = meeting?.hasResults ?? false;

  // Stake calculator → bet slip; clear the ticks that went in.
  function addToSlip() {
    if (!date || !venue) return;
    const items = selections
      .map((sel): SlipItem | null => {
        const n = countCombos(sel);
        return n
          ? { id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, date, venue: venue as MeetingRef["venue"], betType: sel.type, selection: sel, unit, combos: n, cost: n * unit }
          : null;
      })
      .filter((x): x is SlipItem => x !== null);
    if (!items.length) return;
    setSlip((s) => [...s, ...items]);
    setPicks((prev) => {
      const next = { ...prev };
      for (const rn of pool === "wp" ? [activeRace] : legRaces) delete next[rn];
      return next;
    });
  }

  // Place bet → Confirm: settle each slip bet, record it in history, show the outcome.
  async function confirmSlip() {
    setError("");
    const done: SettledBet[] = [];
    for (const item of slip) {
      try {
        const r = scaleResult(await api.settle({ date: item.date, venue: item.venue, selection: item.selection }), item.unit);
        done.push({ item, result: r });
        track("practice_bet", { bet_type: item.betType, combos: item.combos, hit: r.hit });
        const multi = r.legResults.length > 1;
        const resultStr = r.legResults
          .map((lr) => {
            const top4 = lr.finishers.slice(0, 4).map((f) => f.horseNumber).join("-");
            return multi ? `R${lr.raceNumber}:${top4}` : top4;
          })
          .join("  ");
        const entry: HistoryEntry = {
          id: item.id,
          ts: new Date().toISOString(),
          date: item.date,
          venue: item.venue,
          betType: item.betType,
          betLabel: BET_TYPES[item.betType].label,
          picks: item.selection.raceLegs.map((l) => `R${l.raceNumber} ${legSummary(l)}`).join("  |  "),
          result: resultStr,
          combos: item.combos,
          cost: r.cost,
          hit: r.hit,
          payout: r.payout,
          net: r.net,
          poolDividendText: r.poolDividendText,
        };
        api.addHistory(entry).catch((e) => setError(String(e)));
      } catch (e) {
        setError(String(e));
        break; // keep this and later bets on the slip
      }
    }
    const ids = new Set(done.map((d) => d.item.id));
    setSlip((s) => s.filter((it) => !ids.has(it.id)));
    if (done.length) setSettled(done);
  }

  const card = cards[editRace];
  const rp = picks[editRace] ?? emptyPicks();

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
      <header ref={headerRef} className="sticky top-0 z-40 shadow-card">
        {/* Navy top bar: our own name (not HKJC's) + practice badge, language. */}
        <div className="bg-navy-900 text-white">
          <div className={cx(container, "flex h-12 items-center gap-3")}>
            <h1 className="flex-none text-lg leading-none font-bold">{t("appName")}</h1>
            <span className="rounded-full border border-gold px-2 py-0.5 text-[11px] leading-none font-medium text-gold">{t("practice")}</span>
            <LangSwitch className="ml-auto" />
          </div>
        </div>
        {/* Primary tabs: navy block marks the current one; scrolls sideways on phones. */}
        <div className="border-b border-edge bg-surface">
          <nav aria-label={t("nav.sections")} className={cx(container, "flex overflow-x-auto")}>
            {TABS.map(([v, key]) => (
              <button key={v} className={navBtn(view === v)} aria-current={view === v ? "page" : undefined} onClick={() => setView(v)}>
                {t(key)}
              </button>
            ))}
          </nav>
        </div>
        {/* Featured Combined picks (next race, else the last one): slim strip inside the sticky header, so
            --header-h covers it. Every app tab; not on legal pages. */}
        {!(LEGAL_VIEWS as readonly string[]).includes(view) && <PicksBanner onSelect={selectView} linked={view !== "momentum"} />}
      </header>

      <main className={cx(container, "flex-1 pb-12", view === "bet" && "pb-24 lg:pb-12")}>
        {error && <div className={errorBox}>{error}</div>}

        {/* Analyzer performance. Stays mounted once opened so the range, filters
            and loaded analysis survive switching to other tabs and back. */}
        {analyzerOpened && (
          <div hidden={view !== "win-place" && view !== "trio"}>
            <AnalyzerPage tab={view === "trio" ? "trio" : "win-place"} />
          </div>
        )}

        {view === "momentum" && <MomentumPage />}
        {view === "settings" && <SettingsPage />}

        {view === "history" && (
          <HistoryPage
            entries={history}
            onDelete={(id) => api.deleteHistory(id).then(setHistory).catch((e) => setError(String(e)))}
            onClear={() => api.clearHistory().then(setHistory).catch((e) => setError(String(e)))}
          />
        )}

        {view === "bet" && (
          // HKJC layout: pool menu · race card · bet slip (one column on phones, slip as a bottom bar).
          <div className="mt-4 grid items-start gap-3 lg:grid-cols-[160px_minmax(0,1fr)_260px]">
            <div className="hidden lg:block">
              <PoolMenu variant="side" value={pool} onChange={setPool} dtAvailable={dtPools.length > 0} ttAvailable={ttPools.length > 0} />
            </div>

            <div className="min-w-0">
              {/* Page head: pool + meeting, then meeting picker and race chips. */}
              <div className="overflow-hidden rounded-card bg-surface shadow-card">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 bg-navy-700 px-[13px] py-2 text-white">
                  <h2 className="text-[15px] font-medium">{poolName(pool)}</h2>
                  <span className="text-[13px] text-white/85">
                    {meeting
                      ? t("bet:subMeeting", { date: fmt.date(ymd(meeting.date)), venue: g.venue(meeting.venue), races: t("races", { count: meeting.races.length }) })
                      : t("bet:subEmpty")}
                  </span>
                </div>
                <div className="flex flex-col gap-2.5 px-[13px] py-2.5 sm:flex-row sm:items-center sm:gap-4">
                  <label htmlFor="bDay" className="sr-only">
                    {t("bet:racingDay")}
                  </label>
                  {meetingSelect}
                  {meeting && legCount === 1 && (
                    <nav aria-label={t("bet:racesNav")} className="-mx-[13px] flex gap-2 overflow-x-auto px-[13px] pt-0.5 sm:mx-0 sm:px-0">
                      {meeting.races.map((rn) => {
                        const on = rn === activeRace;
                        const surface = cards[rn]?.surface;
                        return (
                          <span key={rn} className={cx("flex-none border-b-[3px] pb-1", on ? (surface === "AWT" ? "border-awt" : "border-turf") : "border-transparent")}>
                            <button
                              className={chipBtn(on)}
                              aria-current={on ? "true" : undefined}
                              aria-label={t("common:race", { n: rn })}
                              onClick={() => {
                                setActiveRace(rn);
                                setEditRace(rn);
                              }}
                            >
                              {rn}
                            </button>
                          </span>
                        );
                      })}
                    </nav>
                  )}
                </div>
              </div>

              <div className="lg:hidden">
                <PoolMenu variant="row" value={pool} onChange={setPool} dtAvailable={dtPools.length > 0} ttAvailable={ttPools.length > 0} />
              </div>

              {meeting && (
                <>
                  {/* Multi-race leg chooser */}
                  {legCount > 1 && (
                    <div className={cx(panel, "mt-3 flex flex-col gap-4")}>
                      {officialPools.length > 0 && (
                        <div>
                          <div className="mb-2 text-[13px] text-ink">{t("bet:pools", { type: g.betType(betType) })}</div>
                          <div className={pillRow}>
                            {officialPools.map((op) => {
                              const active = [...dtLegs].sort((a, b) => a - b).join() === [...op].sort((a, b) => a - b).join();
                              return (
                                <button
                                  key={op.join()}
                                  className={cx(pill(active), "flex-none")}
                                  aria-pressed={active}
                                  onClick={() => {
                                    setDtLegs(op);
                                    setEditRace(op[0]!);
                                  }}
                                >
                                  {op.map((rn) => t("raceShort", { n: rn })).join(" · ")}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      <div>
                        <div className="mb-2 text-[13px] text-ink">{t("bet:pickAny", { n: legCount, picked: dtLegs.length })}</div>
                        <div className="flex flex-wrap gap-2">
                          {meeting.races.map((rn) => {
                            const picked = dtLegs.includes(rn);
                            const isEdit = rn === editRace && picked;
                            return (
                              <button
                                key={rn}
                                className={isEdit ? chipBtn(true) : picked ? pickedLeg : chipBtn(false)}
                                aria-pressed={picked}
                                aria-label={t("common:race", { n: rn })}
                                disabled={!picked && dtLegs.length >= legCount}
                                onClick={() => toggleLeg(rn)}
                              >
                                {rn}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      <p className="text-xs text-ink-muted">{t("bet:customNote")}</p>
                    </div>
                  )}

                  {/* Edit which leg's picks you're entering. */}
                  {legCount > 1 && legRaces.length > 0 && (
                    <div className="mt-3">
                      <div className="mb-2 text-[13px] text-ink">{t("bet:editing")}</div>
                      <div className={pillRow}>
                        {legRaces.map((rn) => (
                          <button key={rn} className={cx(pill(rn === editRace), "flex-none")} aria-pressed={rn === editRace} onClick={() => setEditRace(rn)}>
                            {t("raceShort", { n: rn })}
                            <em className={cx("not-italic", rn === editRace ? "text-white/75" : "text-ink-muted")}>
                              {legLabel(selections[0]?.raceLegs.find((l) => l.raceNumber === rn))}
                            </em>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {card ? (
                    <RaceCardTable
                      card={card}
                      pool={pool}
                      picks={rp}
                      onToggle={(col, h) => toggle(editRace, col, h)}
                      onField={(col, on) => field(editRace, col, on)}
                      bankerEnabled={bankerEnabled}
                      bankerMax={bankerMax}
                      head={
                        <button
                          className={btnPill}
                          disabled={!meeting.hasResults}
                          title={meeting.hasResults ? "" : t("bet:noResultsMeeting")}
                          onClick={() => date && venue && api.result(date, venue, editRace).then(setRaceResult).catch((e) => setError(String(e)))}
                        >
                          {t("bet:showResult", { race: t("raceShort", { n: editRace }) })}
                        </button>
                      }
                    />
                  ) : (
                    <div className={cx(panel, "mt-3 text-center text-ink-muted")}>{t("bet:loadingRace", { n: editRace })}</div>
                  )}

                  <StakeBar combos={combos} unit={unit} onUnit={setUnit} onAdd={addToSlip} canAdd={canAdd} />
                  {!meeting.hasResults && <p className="mt-3 text-[13px] text-warn">{t("bet:settlementDisabled")}</p>}

                  {date && venue && <RaceAnalysisPanel date={date} venue={venue} raceNo={editRace} />}
                </>
              )}
            </div>

            <BetSlip items={slip} onRemove={(id) => setSlip((s) => s.filter((it) => it.id !== id))} onClear={() => setSlip([])} onConfirm={confirmSlip} />
          </div>
        )}

        {(view === "privacy" || view === "terms" || view === "sales" || view === "legal") && <LegalDoc view={view} />}
        {view === "sitemap" && <SiteMap tools={TABS.map(([v, key]) => [v, t(key)])} onSelect={selectView} />}
      </main>

      <Footer onSelect={selectView} />

      {settled && <ResultModal bets={settled} onClose={() => setSettled(null)} />}
      {raceResult && <ResultPanel result={raceResult} onClose={() => setRaceResult(null)} />}
    </div>
  );
}
