import type {
  MeetingRef,
  MeetingDetail,
  RaceCard,
  SettleRequest,
  SettleResult,
  HistoryEntry,
} from "../shared/types";

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
  days: () => get<MeetingRef[]>("/api/days"),
  meeting: (date: string, venue: string) => get<MeetingDetail>(`/api/meeting/${date}/${venue}`),
  race: (date: string, venue: string, rn: number) =>
    get<RaceCard>(`/api/race/${date}/${venue}/${rn}`),
  settle: (req: SettleRequest) => send<SettleResult>("POST", "/api/settle", req),
  history: () => get<HistoryEntry[]>("/api/history"),
  addHistory: (e: HistoryEntry) => send<HistoryEntry[]>("POST", "/api/history", e),
  deleteHistory: (id: string) => send<HistoryEntry[]>("DELETE", `/api/history/${id}`),
  clearHistory: () => send<HistoryEntry[]>("DELETE", "/api/history"),
};

/** "20260627" → "27 Jun 2026" */
export function fmtDate(d: string): string {
  const y = d.slice(0, 4);
  const m = Number(d.slice(4, 6));
  const day = Number(d.slice(6, 8));
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${day} ${months[m - 1]} ${y}`;
}
