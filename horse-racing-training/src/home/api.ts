// Home page API (public, no auth).
import type { BotProfile, BotRange, HomeRecordDay, HomeSummary, LeaderboardProfile, LeaderboardRange, LeaderboardResponse } from "../../shared/types";

export class HomeApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: string
  ) {
    super(code);
  }
}

async function get<T>(url: string, signal?: AbortSignal): Promise<T> {
  let r: Response;
  try {
    r = await fetch(url, { signal });
  } catch (e) {
    if ((e as Error).name === "AbortError") throw e;
    throw new HomeApiError(0, "network");
  }
  if (!r.ok) {
    const body = (await r.json().catch(() => null)) as { error?: { code?: string } } | null;
    throw new HomeApiError(r.status, body?.error?.code ?? "server_error");
  }
  return r.json() as Promise<T>;
}

export const homeApi = {
  summary: (signal?: AbortSignal) => get<HomeSummary>("/api/home/summary", signal),
  records: (date: string, signal?: AbortSignal) => get<HomeRecordDay>(`/api/home/records?date=${date}`, signal),
  leaderboard: (signal?: AbortSignal) => get<LeaderboardResponse>("/api/leaderboard", signal),
  bot: (alias: string, range: BotRange, date: string | undefined, signal?: AbortSignal) =>
    get<BotProfile & { range: BotRange }>(`/api/leaderboard/bot-${encodeURIComponent(alias)}?range=${range}${range === "day" && date ? `&date=${date}` : ""}`, signal),
  profile: (publicId: string, range: LeaderboardRange, signal?: AbortSignal) =>
    get<LeaderboardProfile & { range: LeaderboardRange }>(`/api/leaderboard/${encodeURIComponent(publicId)}?range=${range}`, signal),
};
