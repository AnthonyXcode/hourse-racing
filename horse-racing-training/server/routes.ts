import { Router } from "express";
import { getManifest, cardPath, resultPath, readJson } from "./dataIndex";
import { settle } from "../shared/betEngine/index";
import { readHistory, addEntry, deleteEntry, clearHistory } from "./history";
import { runAnalyzer } from "./analyzer";
import { momentum } from "./momentum/service";
import { hkDate } from "./momentum/poller";
import { raceSeries } from "./momentum/series";
import { modelRanks } from "./momentum/picks";
import { horseRows } from "../shared/momentum/model";
import { names } from "./names/service";
import { getNameIndex } from "./names/nameIndex";
import { lookupNames, parseLookupBody } from "./names/lookup";
import type {
  RaceCard,
  RaceResult,
  MeetingDetail,
  SettleRequest,
  SettleResult,
  HistoryEntry,
  Venue,
} from "../shared/types";

export const api = Router();

/** date YYYYMMDD → race id "2026-09-23-HV-1" (same format as the momentum DB and the names table). */
const raceKey = (date: string, venue: string, rn: number) => `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}-${venue}-${rn}`;

// ---- Pick history ----
api.get("/history", (_req, res) => res.json(readHistory()));
api.post("/history", (req, res) => res.json(addEntry(req.body as HistoryEntry)));
api.delete("/history/:id", (req, res) => res.json(deleteEntry(req.params.id)));
api.delete("/history", (_req, res) => {
  clearHistory();
  res.json([]);
});

/** GET /api/analyzer?from=YYYY-MM-DD&to=YYYY-MM-DD → per-horse predictions vs results for the range. */
api.get("/analyzer", async (req, res) => {
  const { from, to } = req.query;
  const ymd = /^\d{4}-\d{2}-\d{2}$/;
  if (typeof from !== "string" || typeof to !== "string" || !ymd.test(from) || !ymd.test(to) || from > to)
    return res.status(400).json({ error: "from and to must be YYYY-MM-DD with from ≤ to" });
  try {
    res.json(await runAnalyzer(from, to));
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

/** GET /api/days → all meetings with saved cards, newest first. */
api.get("/days", (_req, res) => {
  res.json(getManifest());
});

/** GET /api/meeting/:date/:venue → races + multi-race pool legs (from results). */
api.get("/meeting/:date/:venue", (req, res) => {
  const { date, venue } = req.params;
  const ref = getManifest().find((m) => m.date === date && m.venue === venue);
  if (!ref) return res.status(404).json({ error: "meeting not found" });

  // Collect ALL distinct DT/TT pools (each pool is stored on every one of its legs).
  const uniquePools = (legsOf: (r: RaceResult) => number[] | undefined): number[][] => {
    const results = readJson<RaceResult[]>(resultPath(date!, venue!)) ?? [];
    const seen = new Map<string, number[]>();
    for (const r of results) {
      const legs = legsOf(r);
      if (legs && legs.length) seen.set([...legs].sort((a, b) => a - b).join(","), legs);
    }
    return [...seen.values()].sort((a, b) => a[0]! - b[0]!);
  };

  const detail: MeetingDetail = {
    ...ref,
    doubleTrioPools: ref.hasResults ? uniquePools((r) => r.doubleTrioLegs) : [],
    tripleTrioPools: ref.hasResults ? uniquePools((r) => r.tripleTrioLegs) : [],
  };
  res.json(detail);
});

/** GET /api/race/:date/:venue/:rn → the race card (flattened DTO).
 *  Win odds come from the meeting RESULTS (actual starting price) when available,
 *  falling back to the race card's forecast odds. */
api.get("/race/:date/:venue/:rn", (req, res) => {
  const { date, venue, rn } = req.params;
  const raw = readJson<{ race: Omit<RaceCard, "winOdds">; winOdds: Record<string, number> }>(
    cardPath(date!, venue!, Number(rn))
  );
  if (!raw) return res.status(404).json({ error: "race card not found" });

  const winOdds: Record<string, number> = { ...(raw.winOdds ?? {}) };
  const results = readJson<RaceResult[]>(resultPath(date!, venue!));
  const finish = results?.find((r) => r.raceNumber === Number(rn))?.finishOrder;
  if (finish) {
    for (const f of finish) {
      if (typeof f.winOdds === "number") winOdds[String(f.horseNumber)] = f.winOdds;
    }
  }

  const card: RaceCard = { ...raw.race, id: raceKey(date!, venue!, Number(rn)), winOdds };
  res.json(card);
});

/** GET /api/result/:date/:venue/:rn → one race's full result + dividends,
 *  with the meeting's Double/Triple Trio legs+dividend merged on. */
api.get("/result/:date/:venue/:rn", (req, res) => {
  const { date, venue, rn } = req.params;
  const results = readJson<RaceResult[]>(resultPath(date!, venue!));
  if (!results) return res.status(404).json({ error: "no results for this meeting yet" });
  const race = results.find((r) => r.raceNumber === Number(rn));
  if (!race) return res.status(404).json({ error: "race result not found" });

  // Attach the DT/TT pool whose legs include THIS race (not merely the first).
  const dtHere = results.find((r) => r.doubleTrioDividend != null && r.doubleTrioLegs?.includes(Number(rn)));
  const ttHere = results.find((r) => r.tripleTrioDividend != null && r.tripleTrioLegs?.includes(Number(rn)));
  const merged: RaceResult = {
    ...race,
    id: raceKey(date!, venue!, Number(rn)),
    finishOrder: race.finishOrder.map((f) => ({ ...f, jockeyCode: f.jockeyId, trainerCode: f.trainerId })),
    doubleTrioLegs: dtHere?.doubleTrioLegs,
    doubleTrioDividend: dtHere?.doubleTrioDividend,
    tripleTrioLegs: ttHere?.tripleTrioLegs,
    tripleTrioDividend: ttHere?.tripleTrioDividend,
  };
  res.json(merged);
});

/** POST /api/settle → grade a bet slip against the meeting results. */
api.post("/settle", (req, res) => {
  const { date, venue, selection } = req.body as SettleRequest;
  if (!date || !venue || !selection) return res.status(400).json({ error: "missing fields" });

  const results = readJson<RaceResult[]>(resultPath(date, venue as Venue));
  if (!results) return res.status(404).json({ error: "no results for this meeting yet" });

  const byRace = new Map<number, RaceResult>(results.map((r) => [r.raceNumber, r]));

  // The DT/TT dividend lives on whichever race object carries it, and only applies
  // when the user's chosen leg races EXACTLY match the designated pool. Picking a
  // different pair/triple still grades hit/miss but has no official dividend.
  const sameSet = (a: number[], b: number[]) =>
    a.length === b.length && [...a].sort((x, y) => x - y).join() === [...b].sort((x, y) => x - y).join();
  const selRaces = selection.raceLegs.map((l) => l.raceNumber);

  const multi = selection.type === "doubleTrio" || selection.type === "tripleTrio";
  let dividendSource: RaceResult | undefined;
  if (selection.type === "doubleTrio") {
    dividendSource = results.find((r) => r.doubleTrioDividend != null && r.doubleTrioLegs && sameSet(r.doubleTrioLegs, selRaces));
  } else if (selection.type === "tripleTrio") {
    dividendSource = results.find((r) => r.tripleTrioDividend != null && r.tripleTrioLegs && sameSet(r.tripleTrioLegs, selRaces));
  } else {
    dividendSource = byRace.get(selRaces[0] ?? -1);
  }
  // No matching designated pool (or single pool with no result): use the bet's
  // own race but STRIP any DT/TT dividend so a non-designated combo never inherits
  // an unrelated pool's payout.
  if (!dividendSource) {
    const fb = byRace.get(selRaces[0] ?? -1);
    if (!fb) return res.status(400).json({ error: "no result for selected race" });
    dividendSource = multi ? { ...fb, doubleTrioDividend: undefined, tripleTrioDividend: undefined } : fb;
  }

  const out: SettleResult = settle(selection, byRace, dividendSource);
  res.json(out);
});

// ---- Market momentum (live pre-race odds, SQLite-backed) ----

/** GET /api/momentum/days → every recorded meeting, newest first. */
api.get("/momentum/days", (_req, res) => {
  res.json({ today: hkDate(new Date()), days: momentum().repo.days() });
});

/** GET /api/momentum/day?date=YYYY-MM-DD (default today) → that day's races with snapshot counts + poller health. */
api.get("/momentum/day", (req, res) => {
  const { repo: r, poller } = momentum();
  const q = req.query.date;
  if (q != null && (typeof q !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(q)))
    return res.status(400).json({ error: "date must be YYYY-MM-DD" });
  const date = (q as string | undefined) ?? hkDate(new Date());
  res.json({
    date,
    now: new Date().toISOString(),
    races: r.racesOn(date).map((x) => ({ ...x, snapshots: r.snapshotCount(x.race_id) })),
    poller: poller.state,
  });
});

/** GET /api/momentum/race/:raceId → odds time-series for one race. */
api.get("/momentum/race/:raceId", (req, res) => {
  const s = raceSeries(momentum().repo, req.params.raceId);
  if (!s) return res.status(404).json({ error: "race not tracked" });
  res.json(s);
});

/** GET /api/momentum/picks/:raceId → analyzer ranking (analyze-race.ts --use-saved --form-data all), best first. */
api.get("/momentum/picks/:raceId", async (req, res) => {
  const race = momentum().repo.race(req.params.raceId);
  if (!race) return res.status(404).json({ error: "race not tracked" });
  try {
    res.json({ raceId: race.race_id, ranks: await modelRanks(race.date, race.venue as "ST" | "HV", race.race_no) });
  } catch (e) {
    res.status(500).json({ error: String(e instanceof Error ? e.message : e) });
  }
});

/** GET /api/momentum/analysis?from&to → one row per finisher in settled, tracked races. */
api.get("/momentum/analysis", (req, res) => {
  const { from, to } = req.query;
  const ymd = /^\d{4}-\d{2}-\d{2}$/;
  if (typeof from !== "string" || typeof to !== "string" || !ymd.test(from) || !ymd.test(to) || from > to)
    return res.status(400).json({ error: "from and to must be YYYY-MM-DD with from ≤ to" });
  const r = momentum().repo;
  const races = r.settledBetween(from, to).filter((x) => r.snapshotCount(x.race_id) > 0);
  const rows = races.flatMap((x) => horseRows(raceSeries(r, x.race_id)!));
  res.json({ from, to, races: races.length, rows });
});

// ---- Display names (Traditional Chinese) ----

/** POST /api/names/lookup { keys: [{ kind, code }] } → stored names now; stale/missing ones refresh in the background. */
api.post("/names/lookup", (req, res) => {
  const parsed = parseLookupBody(req.body);
  if ("error" in parsed) return res.status(400).json({ error: parsed.error });
  const { store, refresher } = names();
  res.json(lookupNames(parsed.keys, { store, index: getNameIndex, enqueue: (k) => refresher.enqueue(k) }));
});
