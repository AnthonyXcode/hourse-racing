import type {
  MeetingRef,
  MeetingDetail,
  RaceCard,
  SettleRequest,
  SettleResult,
} from "../shared/types";

async function get<T>(url: string): Promise<T> {
  const r = await fetch(url);
  if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error || r.statusText);
  return r.json();
}

export const api = {
  days: () => get<MeetingRef[]>("/api/days"),
  meeting: (date: string, venue: string) => get<MeetingDetail>(`/api/meeting/${date}/${venue}`),
  race: (date: string, venue: string, rn: number) =>
    get<RaceCard>(`/api/race/${date}/${venue}/${rn}`),
  settle: async (req: SettleRequest): Promise<SettleResult> => {
    const r = await fetch("/api/settle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req),
    });
    if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error || r.statusText);
    return r.json();
  },
};

/** "20260627" → "27 Jun 2026" */
export function fmtDate(d: string): string {
  const y = d.slice(0, 4);
  const m = Number(d.slice(4, 6));
  const day = Number(d.slice(6, 8));
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${day} ${months[m - 1]} ${y}`;
}
