import { Router } from "express";
import { getManifest, cardPath, resultPath, readJson } from "./dataIndex";
import { settle } from "../shared/betEngine/index";
import { readHistory, addEntry, deleteEntry, clearHistory } from "./history";
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

// ---- Pick history ----
api.get("/history", (_req, res) => res.json(readHistory()));
api.post("/history", (req, res) => res.json(addEntry(req.body as HistoryEntry)));
api.delete("/history/:id", (req, res) => res.json(deleteEntry(req.params.id)));
api.delete("/history", (_req, res) => {
  clearHistory();
  res.json([]);
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

  const detail: MeetingDetail = { ...ref };
  if (ref.hasResults) {
    const results = readJson<RaceResult[]>(resultPath(date!, venue!));
    detail.doubleTrioLegs = results?.find((r) => r.doubleTrioLegs)?.doubleTrioLegs;
    detail.tripleTrioLegs = results?.find((r) => r.tripleTrioLegs)?.tripleTrioLegs;
  }
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

  const card: RaceCard = { ...raw.race, winOdds };
  res.json(card);
});

/** POST /api/settle → grade a bet slip against the meeting results. */
api.post("/settle", (req, res) => {
  const { date, venue, selection } = req.body as SettleRequest;
  if (!date || !venue || !selection) return res.status(400).json({ error: "missing fields" });

  const results = readJson<RaceResult[]>(resultPath(date, venue as Venue));
  if (!results) return res.status(404).json({ error: "no results for this meeting yet" });

  const byRace = new Map<number, RaceResult>(results.map((r) => [r.raceNumber, r]));

  // The DT/TT dividend lives on whichever race object carries it; for single-race
  // pools the dividend source is the bet's own race.
  let dividendSource: RaceResult | undefined;
  if (selection.type === "doubleTrio") {
    dividendSource = results.find((r) => r.doubleTrioDividend != null);
  } else if (selection.type === "tripleTrio") {
    dividendSource = results.find((r) => r.tripleTrioDividend != null);
  }
  dividendSource ??= byRace.get(selection.raceLegs[0]?.raceNumber ?? -1);
  if (!dividendSource) return res.status(400).json({ error: "no result for selected race" });

  const out: SettleResult = settle(selection, byRace, dividendSource);
  res.json(out);
});
