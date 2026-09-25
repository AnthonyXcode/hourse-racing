import type {
  MeetingRef,
  MeetingDetail,
  RaceCard,
  RaceResult,
  SettleRequest,
  SettleResult,
  HistoryEntry,
} from "../shared/types";
import type { AnalyzerPayload, PreRaceAnalysis } from "../shared/analyzer/model";
import type { RaceSeries, HorseRow, ModelRank, Highlight } from "../shared/momentum/model";

export interface MomentumDayRef {
  date: string;
  venue: string;
  races: number;
  snapshots: number;
  /** racecards saved, not tracked by the odds poller yet */
  upcoming?: boolean;
}
export interface MomentumDay {
  date: string;
  now: string;
  races: {
    race_id: string;
    venue: string;
    race_no: number;
    /** null for an upcoming day known only from its racecards */
    post_time: string | null;
    status: string;
    hkjc_status: string | null;
    snapshots: number;
  }[];
  poller: { lastTickAt: string | null; lastError: string | null; polling: string[] };
}

export type NameKind = "horse" | "jockey" | "trainer" | "race";
export interface NameLookup {
  names: Record<string, { en: string | null; zh: string | null; fetchedAt: string | null }>;
  pending: string[];
}

async function get<T>(url: string): Promise<T> {
  const r = await fetch(url);
  if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error || r.statusText);
  return r.json();
}

async function send<T>(method: string, url: string, body?: unknown): Promise<T> {
  const r = await fetch(url, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error || r.statusText);
  return r.json();
}

export const api = {
  /** Latest stored names for `kind:code` keys; stale/missing ones are refreshed server-side. */
  names: (keys: { kind: NameKind; code: string }[]) => send<NameLookup>("POST", "/api/names/lookup", { keys }),
  days: () => get<MeetingRef[]>("/api/days"),
  meeting: (date: string, venue: string) => get<MeetingDetail>(`/api/meeting/${date}/${venue}`),
  race: (date: string, venue: string, rn: number) =>
    get<RaceCard>(`/api/race/${date}/${venue}/${rn}`),
  result: (date: string, venue: string, rn: number) =>
    get<RaceResult>(`/api/result/${date}/${venue}/${rn}`),
  settle: (req: SettleRequest) => send<SettleResult>("POST", "/api/settle", req),
  history: () => get<HistoryEntry[]>("/api/history"),
  addHistory: (e: HistoryEntry) => send<HistoryEntry[]>("POST", "/api/history", e),
  deleteHistory: (id: string) => send<HistoryEntry[]>("DELETE", `/api/history/${id}`),
  clearHistory: () => send<HistoryEntry[]>("DELETE", "/api/history"),
  /** Pre-race model analysis of one racecard (date YYYYMMDD); never includes results. */
  raceAnalysis: (date: string, venue: string, race: number) => get<PreRaceAnalysis>(`/api/race-analysis?date=${date}&venue=${venue}&race=${race}`),
  analyzer: (from: string, to: string) => get<AnalyzerPayload>(`/api/analyzer?from=${from}&to=${to}`),
  momentumDays: () => get<{ today: string; days: MomentumDayRef[] }>("/api/momentum/days"),
  momentumDay: (date: string) => get<MomentumDay>(`/api/momentum/day?date=${date}`),
  momentumRace: (raceId: string) => get<RaceSeries>(`/api/momentum/race/${raceId}`),
  /** Banner race (next to run, else last run) with its Combined picks; null when nothing is recorded. */
  momentumHighlight: () => get<Highlight | null>("/api/momentum/highlight"),
  momentumPicks: (raceId: string) => get<{ raceId: string; ranks: ModelRank[] }>(`/api/momentum/picks/${raceId}`),
  momentumAnalysis: (from: string, to: string) =>
    get<{ from: string; to: string; races: number; rows: HorseRow[] }>(`/api/momentum/analysis?from=${from}&to=${to}`),
};

/** "20260627" → "27 Jun 2026" */
export function fmtDate(d: string): string {
  const y = d.slice(0, 4);
  const m = Number(d.slice(4, 6));
  const day = Number(d.slice(6, 8));
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${day} ${months[m - 1]} ${y}`;
}
