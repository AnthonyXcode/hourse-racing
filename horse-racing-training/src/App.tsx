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
  const [view, setView] = useState<"bet" | "history">("bet");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [raceResult, setRaceResult] = useState<RaceResult | null>(null);

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
    <div className="app">
      <header>
        <h1>HKJC Bet Trainer</h1>
        <nav className="tabs">
          <button className={view === "bet" ? "active" : ""} onClick={() => setView("bet")}>Bet</button>
          <button className={view === "history" ? "active" : ""} onClick={() => setView("history")}>History</button>
        </nav>
        {view === "bet" && (
          <select value={meetingKey} onChange={(e) => setMeetingKey(e.target.value)}>
            <option value="">Select a racing day…</option>
            {days.map((m) => (
              <option key={`${m.date}_${m.venue}`} value={`${m.date}_${m.venue}`}>
                {fmtDate(m.date)} · {m.venue} · {m.races.length} races{m.hasResults ? "" : " (no results)"}
              </option>
            ))}
          </select>
        )}
      </header>

      {error && <div className="error">{error}</div>}

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
          <nav className="racetabs">
            {meeting.races.map((rn) => (
              <button
                key={rn}
                className={rn === activeRace ? "active" : ""}
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
            <div className="legchooser">
              {officialPools.length > 0 && (
                <div className="lc-pools">
                  <span className="lc-label">{BET_TYPES[betType].label} pools:</span>
                  {officialPools.map((pool) => {
                    const active = [...dtLegs].sort((a, b) => a - b).join() === [...pool].sort((a, b) => a - b).join();
                    return (
                      <button
                        key={pool.join()}
                        className={`lc-pool ${active ? "active" : ""}`}
                        onClick={() => { setDtLegs(pool); setEditRace(pool[0]!); }}
                      >
                        R{pool.join("-R")}
                      </button>
                    );
                  })}
                </div>
              )}
              <span className="lc-label">
                Or pick any {legCount} races ({dtLegs.length}/{legCount}):
              </span>
              <div className="lc-races">
                {meeting.races.map((rn) => {
                  const picked = dtLegs.includes(rn);
                  const isEdit = rn === editRace && picked;
                  return (
                    <button
                      key={rn}
                      className={`lc-race ${picked ? "picked" : ""} ${isEdit ? "editing" : ""}`}
                      disabled={!picked && dtLegs.length >= legCount}
                      onClick={() => toggleLeg(rn)}
                    >
                      R{rn}
                    </button>
                  );
                })}
              </div>
              <span className="lc-note">Only an official pool pays a dividend; a custom combo still grades hit/miss.</span>
            </div>
          )}

          {/* Edit which leg's picks you're entering. */}
          {legCount > 1 && legRaces.length > 0 && (
            <div className="legtabs">
              <span>Editing:</span>
              {legRaces.map((rn) => (
                <button key={rn} className={rn === editRace ? "active" : ""} onClick={() => setEditRace(rn)}>
                  R{rn} <em>{legSummary(selection.raceLegs.find((l) => l.raceNumber === rn) ?? { raceNumber: rn, bankers: [], legs: [] })}</em>
                </button>
              ))}
            </div>
          )}

          <div className="cardbar">
            <button
              className="showresult"
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
            <div className="loading">Loading race {editRace}…</div>
          )}

          <CostBar combos={combos} cost={totalCost} canSubmit={canSubmit} onSubmit={submit} />
          {!meeting.hasResults && <p className="warn">No results saved for this meeting — settlement disabled.</p>}
        </>
      )}

      {result && <ResultModal result={result} onClose={() => setResult(null)} />}
      {raceResult && <ResultPanel result={raceResult} onClose={() => setRaceResult(null)} />}
    </div>
  );
}
