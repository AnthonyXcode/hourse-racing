// The server's credits instance, on the real members DB, the race DB (momentum.sqlite) and stored race data.
import { getManifest, readCard, readResults } from "../dataIndex";
import { momentum } from "../momentum/service";
import { members } from "../members/service";
import type { Venue } from "../../shared/types";
import type { CardRunner } from "./grade";
import { credits, type Credits } from "./service";

export function appCredits(): Credits {
  return credits(() => ({
    membersDb: members().db,
    raceDb: momentum().db,
    data: {
      races: (date: string, venue: Venue) => getManifest().find((m) => m.date === date && m.venue === venue)?.races ?? null,
      results: (date: string, venue: Venue) => readResults(date, venue),
      card: (date: string, venue: Venue, raceNo: number) => (readCard(date, venue, raceNo)?.race.entries as CardRunner[] | undefined) ?? null,
    },
  }));
}
