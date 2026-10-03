// Credits / LIVE / purchases API client (docs/credits/PRD.md §6.2). Errors are ApiError (members/api).
import type { CreditsSummary, LiveBet, Member, MeetingDetail, MeetingLiveInfo, BetSelection } from "../../shared/types";
import { call } from "../members/api";

export interface PlanDto {
  id: "hk10" | "hk100" | "hk300";
  priceHkd: number;
  credits: number;
  bonusPct: number;
  badge: "popular" | "best" | null;
}
export interface LiveItem {
  date: string;
  venue: string;
  selection: BetSelection;
  unit: number;
}
export type MeetingWithLive = MeetingDetail & Partial<MeetingLiveInfo> & { serverNow?: string };

export const creditsApi = {
  summary: (cursor?: number | null) => call<CreditsSummary>("GET", `/api/credits${cursor ? `?cursor=${cursor}` : ""}`),
  seen: (kind: "welcome" | "settled") => call<{ ok: true }>("POST", "/api/credits/seen", { kind }),
  plans: () => call<PlanDto[]>("GET", "/api/credits/plans"),
  declare: (termsVersion: string) => call<{ user: Member }>("POST", "/api/me/declarations", { kind: "adult_18", confirm: true, termsVersion }),
  checkout: (planId: string) => call<{ url: string }>("POST", "/api/credits/checkout", { planId }),
  purchase: (sessionId: string) => call<{ status: string; credits: number; balance: number }>("GET", `/api/credits/purchases/${encodeURIComponent(sessionId)}`),
  place: (items: LiveItem[], idempotencyKey: string) =>
    call<{ bets: LiveBet[]; balance: number }>("POST", "/api/live-bets", { items }, { "Idempotency-Key": idempotencyKey }),
  liveBets: (status?: "pending" | "settled") => call<{ bets: LiveBet[]; serverNow: string }>("GET", `/api/live-bets${status ? `?status=${status}` : ""}`),
};
