import { useEffect, useMemo, useState } from "react";
import { api, fmtDate } from "./api";
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
import { RaceCardTable, BetTypePicker, CostBar, ResultModal, ResultPanel, HistoryPage, legSummary, type Role } from "./ui";
import type { RaceResult } from "../shared/types";
import { AnalyzerPage } from "./analyzer/AnalyzerPage";
import { MomentumPage } from "./momentum/MomentumPage";
import { cx, errorBox } from "./kit";

// Unstyled buttons default to 13.33px; preflight makes them inherit, so pin it to keep the old size.
const tabBtn = (on: boolean) =>
  cx(
    "cursor-pointer rounded border px-4 py-1.5 text-[13.33px] font-semibold",
    on ? "border-hkjc-red bg-hkjc-red text-white" : "border-line bg-white"
  );
const raceBtn = (on: boolean) =>
  cx(
    "min-w-10 cursor-pointer rounded-[3px] border px-2.5 py-1.5 text-[13.33px] font-semibold",
    on ? "border-hkjc-red bg-hkjc-red text-white" : "border-line bg-white"
  );

/** false until `v` is first true, then true for good. */
function useOnceTrue(v: boolean): boolean {
  const [seen, setSeen] = useState(v);
  if (v && !seen) setSeen(true);
  return seen || v;
}

const VIEWS = ["bet", "history", "win-place", "trio", "momentum"] as const;
type View = (typeof VIEWS)[number];
const DEFAULT_VIEW: View = "bet";

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
  const [view, setView] = useViewParam();
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [raceResult, setRaceResult] = useState<RaceResult | null>(null);
  const analyzerOpened = useOnceTrue(view === "win-place" || view === "trio");

  // Load meeting list once.
  useEffect(() => {
    api.days().then(setDays).catch((e) => setError(String(e)));
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

  return (
    <div className="mx-auto w-4/5 py-4 max-[1000px]:w-auto max-[1000px]:p-4">
      <header className="flex flex-wrap items-center gap-x-4 gap-y-3 border-b-[3px] border-hkjc-red pb-2.5">
        <h1 className="m-0 flex-none text-[22px] font-bold text-hkjc-red">HKJC Bet Trainer</h1>
        <nav className="flex flex-wrap gap-1">
          <button className={tabBtn(view === "bet")} onClick={() => setView("bet")}>Bet</button>
          <button className={tabBtn(view === "history")} onClick={() => setView("history")}>History</button>
          <button className={tabBtn(view === "win-place")} onClick={() => setView("win-place")}>Win / Place</button>
          <button className={tabBtn(view === "trio")} onClick={() => setView("trio")}>Trio</button>
          <button className={tabBtn(view === "momentum")} onClick={() => setView("momentum")}>Momentum</button>
        </nav>
        {view === "bet" && (
          <select className="ml-auto rounded border border-line bg-white px-2.5 py-2 text-sm" value={meetingKey} onChange={(e) => setMeetingKey(e.target.value)}>
            <option value="">Select a racing day…</option>
            {days.map((m) => (
              <option key={`${m.date}_${m.venue}`} value={`${m.date}_${m.venue}`}>
                {fmtDate(m.date)} · {m.venue} · {m.races.length} races{m.hasResults ? "" : " (no results)"}
              </option>
            ))}
          </select>
        )}
      </header>

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

      {view === "bet" && meeting && (
        <>
          {/* Race tabs (browse + single-race selection) */}
          <nav className="my-3 flex flex-wrap gap-1">
            {meeting.races.map((rn) => (
              <button
                key={rn}
                className={raceBtn(rn === activeRace)}
                onClick={() => {
                  setActiveRace(rn);
                  if (legRaces.length <= 1) setEditRace(rn);
                }}
              >
                R{rn}
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
            <div className="my-2.5 flex flex-col gap-1.5 rounded-md border border-leg-bd bg-white px-3 py-2.5">
              {officialPools.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[13px] font-semibold">{BET_TYPES[betType].label} pools:</span>
                  {officialPools.map((pool) => {
                    const active = [...dtLegs].sort((a, b) => a - b).join() === [...pool].sort((a, b) => a - b).join();
                    return (
                      <button
                        key={pool.join()}
                        className={cx(
                          "cursor-pointer rounded-[14px] border border-banker-bd px-2.5 py-[5px] text-xs font-semibold",
                          active ? "bg-banker" : "bg-white"
                        )}
                        onClick={() => { setDtLegs(pool); setEditRace(pool[0]!); }}
                      >
                        R{pool.join("-R")}
                      </button>
                    );
                  })}
                </div>
              )}
              <span className="text-[13px] font-semibold">
                Or pick any {legCount} races ({dtLegs.length}/{legCount}):
              </span>
              <div className="flex flex-wrap gap-1">
                {meeting.races.map((rn) => {
                  const picked = dtLegs.includes(rn);
                  const isEdit = rn === editRace && picked;
                  return (
                    <button
                      key={rn}
                      className={cx(
                        "min-w-10 cursor-pointer rounded-[3px] border px-2.5 py-1.5 text-[13.33px] font-semibold disabled:cursor-not-allowed disabled:opacity-35",
                        isEdit ? "border-leg-bd bg-leg-bd text-white" : picked ? "border-leg-bd bg-leg" : "border-line bg-white"
                      )}
                      disabled={!picked && dtLegs.length >= legCount}
                      onClick={() => toggleLeg(rn)}
                    >
                      R{rn}
                    </button>
                  );
                })}
              </div>
              <span className="text-xs text-[#888]">Only an official pool pays a dividend; a custom combo still grades hit/miss.</span>
            </div>
          )}

          {/* Edit which leg's picks you're entering. */}
          {legCount > 1 && legRaces.length > 0 && (
            <div className="my-2 flex items-center gap-2 text-[13px]">
              <span>Editing:</span>
              {legRaces.map((rn) => (
                <button
                  key={rn}
                  className={cx("cursor-pointer rounded border border-leg-bd px-2.5 py-1.5 text-[13.33px]", rn === editRace ? "bg-leg" : "bg-white")}
                  onClick={() => setEditRace(rn)}
                >
                  R{rn} <em className="ml-1 text-[#555] not-italic">{legSummary(selection.raceLegs.find((l) => l.raceNumber === rn) ?? { raceNumber: rn, bankers: [], legs: [] })}</em>
                </button>
              ))}
            </div>
          )}

          <div className="my-1.5 flex justify-end">
            <button
              className="cursor-pointer rounded border border-hkjc-dark bg-white px-3.5 py-[7px] text-[13.33px] font-semibold text-hkjc-dark disabled:cursor-not-allowed disabled:opacity-40"
              disabled={!meeting.hasResults}
              title={meeting.hasResults ? "" : "No results for this meeting"}
              onClick={() =>
                date && venue && api.result(date, venue, editRace).then(setRaceResult).catch((e) => setError(String(e)))
              }
            >
              Show result (R{editRace})
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
            <div className="p-[30px] text-center text-[#888]">Loading race {editRace}…</div>
          )}

          <CostBar combos={combos} cost={totalCost} canSubmit={canSubmit} onSubmit={submit} />
          {!meeting.hasResults && <p className="my-[13px] text-[13px] text-[#8a6d00]">No results saved for this meeting — settlement disabled.</p>}
        </>
      )}

      {result && <ResultModal result={result} onClose={() => setResult(null)} />}
      {raceResult && <ResultPanel result={raceResult} onClose={() => setRaceResult(null)} />}
    </div>
  );
}
