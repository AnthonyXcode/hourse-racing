// The server's action context: the real credits instance, admin config and stored race data.
import { getManifest, readResults } from "../dataIndex";
import { appCredits } from "../credits/instance";
import type { Venue } from "../../shared/types";
import { loadAdminConfig, type AdminConfig } from "./config";
import { actions, type Actor } from "./actions";

let cfg: AdminConfig | null = null;
export const adminConfig = () => (cfg ??= loadAdminConfig());

export function appActions(actor: Actor) {
  const c = appCredits();
  return actions({
    db: c.db,
    credits: c,
    cfg: adminConfig(),
    actor,
    meetingRaces: (date: string, venue: Venue) => getManifest().find((m) => m.date === date && m.venue === venue)?.races ?? null,
    results: (date: string, venue: Venue) => readResults(date, venue),
  });
}
