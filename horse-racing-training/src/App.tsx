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
} from "../shared/types";
import { RaceCardTable, BetTypePicker, CostBar, ResultModal, legSummary, type Role } from "./ui";

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
  const [result, setResult] = useState<SettleResult | null>(null);
  const [error, setError] = useState<string>("");

  // Load meeting list once.
  useEffect(() => {
    api.days().then(setDays).catch((e) => setError(String(e)));
  }, []);

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

  // Which races this bet type collects picks in.
  const legRaces = useMemo<number[]>(() => {
    if (!meeting) return [];
    if (betType === "doubleTrio") return meeting.doubleTrioLegs ?? [];
    if (betType === "tripleTrio") return meeting.tripleTrioLegs ?? [];
    return [activeRace];
  }, [betType, activeRace, meeting]);

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
    } catch (e) {
      setError(String(e));
    }
  }

  const card = cards[editRace];

  return (
    <div className="app">
      <header>
        <h1>HKJC Bet Trainer</h1>
        <select value={meetingKey} onChange={(e) => setMeetingKey(e.target.value)}>
          <option value="">Select a racing day…</option>
          {days.map((m) => (
            <option key={`${m.date}_${m.venue}`} value={`${m.date}_${m.venue}`}>
              {fmtDate(m.date)} · {m.venue} · {m.races.length} races{m.hasResults ? "" : " (no results)"}
            </option>
          ))}
        </select>
      </header>

      {error && <div className="error">{error}</div>}

      {meeting && (
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
            dtAvailable={!!meeting.doubleTrioLegs?.length}
            ttAvailable={!!meeting.tripleTrioLegs?.length}
          />

          {/* Multi-race leg selector */}
          {legRaces.length > 1 && (
            <div className="legtabs">
              <span>Legs:</span>
              {legRaces.map((rn) => (
                <button key={rn} className={rn === editRace ? "active" : ""} onClick={() => setEditRace(rn)}>
                  R{rn} <em>{legSummary(selection.raceLegs.find((l) => l.raceNumber === rn) ?? { raceNumber: rn, bankers: [], legs: [] })}</em>
                </button>
              ))}
            </div>
          )}

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
    </div>
  );
}
