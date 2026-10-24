// Marketing "context" gatherer: reads the PUBLIC Post Time API and prints one JSON object for one post slot.
// Every number a post may quote must come from this object (see marketing/CONTENT.md).
//
//   npx tsx marketing/scripts/gather.ts --slot daily|pre-meeting|mid-meeting|late-meeting|post-meeting
//       [--date YYYY-MM-DD] [--base https://posttimehk.com] [--now ISO] [--no-member-names] [--out file.json]
//
// --date  the HK day the post is about (default: today in Hong Kong).
// --now   pretend "now" is this instant (testing: splits races into settled / upcoming by it).
// --no-member-names  drop opted-in member names too (bots only).
// --pillar P  override the UTM campaign pillar (picks|recap|learn|board|feature|community; default from slot/weekday).
// --include-live  also add today's open tickets (members' LIVE bets + bot tickets). Off by default: PLAN.md §6.7(4)
//              bars LIVE betting / credits content until legal sign-off.
//
// Privacy: only public, non-personal data. Member names appear only for members who opted into the public
// leaderboard (the API never returns the others); hidden members' tickets are dropped; avatars and public ids
// are never copied. Strategy bots are fine: they are labelled bots.
import { writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { confidence, strategyChecks, type PreRaceAnalysis } from "../../shared/analyzer/model";
import { common as zhCommon } from "../../src/i18n/locales/zh-HK/common";
import { common as enCommon } from "../../src/i18n/locales/en/common";
import { home as zhHome } from "../../src/i18n/locales/zh-HK/home";
import { home as enHome } from "../../src/i18n/locales/en/home";
import type { HomeMeetings, HomeRecordDay, HomeSummary, HomeTickets, LeaderboardResponse, LeaderboardRow, LeaderboardStats } from "../../shared/types";

export const SLOTS = ["daily", "pre-meeting", "mid-meeting", "late-meeting", "post-meeting"] as const;
export type Slot = (typeof SLOTS)[number];
export const CHANNELS = ["facebook", "instagram", "threads", "telegram"] as const;
export type Channel = (typeof CHANNELS)[number];

type Venue = "ST" | "HV";
export const PILLARS = ["picks", "recap", "learn", "board", "feature", "community"] as const;
export type Pillar = (typeof PILLARS)[number];
/** PLAN.md §2 utm_source values. */
const UTM_SOURCE: Record<Channel, string> = { facebook: "fb", instagram: "ig", threads: "threads", telegram: "tg" };
type BotKey = keyof typeof zhHome.bots;

export interface Pick {
  rank: number;
  num: number;
  name: string;
  nameZh: string | null;
  /** Model win / place chance, % (upcoming races only). */
  winPct?: number;
  placePct?: number;
  /** Finishing position (settled races only; null = did not finish). */
  fin?: number | null;
}

export interface RaceCtx {
  raceNo: number;
  postTime: string | null;
  /** HH:mm Hong Kong time. */
  postTimeHK: string | null;
  status: "upcoming" | "awaiting-result" | "settled";
  name: string | null;
  classEn: string | null;
  classZh: string | null;
  distance: number | null;
  surface: string | null;
  runners: number | null;
  /** App confidence: share of the venue's strategy rules met, out of 5 (same as the Bet page). */
  stars: number | null;
  rulesMet: number | null;
  rulesTotal: number | null;
  fiveStar: boolean;
  /** Model top 3 picks, best first. */
  picks: Pick[];
  result?: {
    top3: { pos: number; num: number; name: string; nameZh: string | null; picked: boolean }[];
    /** Winner among the model's top 3. */
    winHit: boolean;
    /** At least one of the top 3 finished 1st–3rd. */
    placeHit: boolean;
    /** Model's #1 pick won. */
    topPickWon: boolean;
    /** All 3 picks filled the first three (a Trio hit). */
    trioHit: boolean;
    /** HKJC dividends per $10 unit. PLAN §6.7(2): never next to model/robot results; P3 pool-education
     *  examples only, labelled 過往賽果. */
    winDividend: number | null;
    trioDividend: number | null;
    quinellaDividend: number | null;
  };
}

export interface MeetingCtx {
  date: string;
  venue: Venue;
  venueZh: string;
  venueEn: string;
  raceCount: number;
  firstPostHK: string | null;
  lastPostHK: string | null;
  races: RaceCtx[];
  tally: { settled: number; winHits: number; placeHits: number; topPickWins: number; trioHits: number; fiveStarSettled: number; fiveStarTopPickPlaced: number };
  fiveStarRaces: number[];
  /** Race numbers for an honest recap (PLAN P2: report misses as prominently as hits). */
  highlights: { topPickWon: number[]; trioHit: number[]; winHit: number[]; allMissed: number[]; pending: number[] };
}

export interface Context {
  schema: "posttime.marketing.context/v1";
  slot: Slot;
  /** What the post should lead with, in order. */
  focus: string[];
  generatedAt: string;
  now: string;
  /** The HK day this post is about. */
  date: string;
  base: string;
  isRaceDay: boolean;
  /** UTM campaign pillar (PLAN.md §2). */
  pillar: Pillar;
  /** PLAN.md §6.6 {DISCLAIMER_SHORT} / {DISCLAIMER_FULL}. */
  disclaimer: { short: { zh: string; en: string }; full: { zh: string; en: string } };
  guardrails: string[];
  /** UTM-tagged links per channel. Only free pages: home (model record, leaderboard), practice (a settled
   *  meeting on the Bet tab), the Win/Place and Trio record pages. Never live betting, credits or pricing. */
  links: Record<Channel, { home: string; practice: string | null; winPlace: string; trio: string }>;
  /** The meeting on `date` (null when there is none). */
  meeting: MeetingCtx | null;
  /** Upcoming races to feature next (mid/late slots). */
  nextUp?: number[];
  /** Most recent settled meeting before `date` (daily). */
  lastMeeting?: MeetingCtx | null;
  nextMeeting?: { date: string; venue: Venue; venueZh: string; venueEn: string; raceCount: number } | null;
  modelRecord?: {
    from: string;
    to: string;
    firstRace: string | null;
    lastRace: string | null;
    races: number;
    meetings: number;
    top3WinHits: number;
    top3WinPct: number | null;
    top3PlaceHits: number;
    top3PlacePct: number | null;
    fiveStarRaces: number;
    fiveStarPlaceHits: number;
    fiveStarPlacePct: number | null;
    fiveStarRoiPct: number | null;
    /** Trio "model #1 banker with #2–L" over the same window (PLAN P2 weekly). */
    trio: { bankers: number; last: number; races: number; hits: number; hitPct: number | null; roiPct: number | null };
  };
  /** Daily: the previous 7 days, meeting by meeting (Monday weekly summary). */
  lastWeek?: { from: string; to: string; meetings: { date: string; venue: Venue; venueZh: string; races: number; winHits: number; placeHits: number }[]; races: number; winHits: number; placeHits: number } | null;
  /** Daily: all strategy bots over the last 30 days (PLAN P4 robot report), best ROI first. Credits, not HK$. */
  bots?: BoardRow[];
  leaderboard?: {
    lastDay: { date: string | null; minBets: number; rows: BoardRow[] };
    last30: { from: string; minBets: number; rows: BoardRow[] };
  };
  tickets?: TicketCtx[];
  explainer?: { topic: string; zh: string; en: string };
  sources: string[];
  warnings: string[];
}

export interface BoardRow {
  rank: number;
  kind: "bot" | "member";
  /** Opted-in member's display name, or the bot's name. null when --no-member-names. */
  name: string | null;
  nameZh: string | null;
  strategyZh?: string;
  strategyEn?: string;
  bets: number;
  hits: number;
  hitRate: number;
  staked: number;
  returned: number;
  net: number;
  roi: number;
}

export interface TicketCtx {
  kind: "bot" | "member";
  name: string | null;
  nameZh: string | null;
  betType: string;
  betTypeZh: string;
  races: number[];
  picks: string;
  stake: number;
  postTimeHK: string | null;
}

// Verbatim from marketing/PLAN.md §6.6.
const DISCLAIMER: Context["disclaimer"] = {
  short: {
    zh: "18+｜模擬練習及數據分析，非投注建議｜與香港賽馬會無關｜過往表現不代表將來｜賭博輔導熱線 1834 633",
    en: "18+ | Practice & analysis only, not betting advice | Not affiliated with HKJC | Gambling help: 1834 633",
  },
  full: {
    zh: "只供18歲或以上人士。「開跑前」是賽馬模擬練習及數據分析平台，不接受金錢投注，亦不派發金錢；積分沒有現金價值。本平台與香港賽馬會或任何投注機構無任何關係。模型及排行榜數據只屬已完成賽事的過往表現，並非投注建議，亦不保證日後結果。如你或身邊的人受賭博問題困擾，請致電平和基金戒賭輔導熱線 1834 633。",
    en: "18+ only. Post Time is a racing practice and analytics platform. It takes no money bets and pays no money, and credits have no cash value. Not affiliated with The Hong Kong Jockey Club or any betting operator. Model and leaderboard figures reflect past completed races only; they are not betting advice and do not guarantee future results. If gambling is causing problems for you or someone close to you, call the Ping Wo Fund counselling hotline 1834 633.",
  },
};

const GUARDRAILS = [
  "Quote only numbers present in this object; never round differently, extrapolate or invent.",
  "Model picks are not betting advice: every post carries disclaimer.short (FB/Threads/TG) or disclaimer.full (IG captions, weekly summaries).",
  "No tipping language (穩膽, 必勝, sure thing, guaranteed); say 模型首選 / the model's top pick.",
  "Members: only names in leaderboard/tickets (opted in). Never mention anyone else.",
  "Bots are strategy bots (機械人), not people.",
  "Dividends are HKJC dividends per $10 and may only appear in pool-education examples labelled 過往賽果, never next to model or robot results; never show HK$ next to model/robot/member results.",
  "Leaderboard and bot figures are credits (積分), which have no cash value; say so.",
  "If a figure needed for the post is missing (null / absent), drop that line or skip the post; never estimate.",
];

/** Educational rotation (static, checked against HKJC pool rules). One per day. */
const EXPLAINERS: { topic: string; zh: string; en: string }[] = [
  { topic: "win", zh: "獨贏：所選馬匹須跑第一。", en: "Win: your horse must finish first." },
  { topic: "place", zh: "位置：所選馬匹須跑入前三名（4至6匹馬出賽時為前兩名）。", en: "Place: your horse must finish in the first three (first two when 4–6 horses run)." },
  { topic: "quinella", zh: "連贏：選中頭兩名馬匹，不分先後。", en: "Quinella: pick the first two finishers in either order." },
  { topic: "qpl", zh: "位置Q：所選兩匹馬同時跑入前三名，不分先後。", en: "Quinella Place: both of your two horses finish in the first three, any order." },
  { topic: "trio", zh: "單T：選中頭三名馬匹，不分先後。", en: "Trio: pick the first three finishers in any order." },
  { topic: "tierce", zh: "三重彩：順序選中頭三名馬匹。", en: "Tierce: pick the first three finishers in exact order." },
  { topic: "first4", zh: "四連環：選中頭四名馬匹，不分先後。", en: "First 4: pick the first four finishers in any order." },
  { topic: "banker", zh: "膽拖：「膽」必須跑入名次，其餘名次由「腳」組成，可減少注數。", en: "Banker: the banker must be in the result and the legs fill the other places, so you need fewer combinations." },
  { topic: "doubleTrio", zh: "孖T：在兩場指定賽事都選中頭三名（不分先後）。", en: "Double Trio: pick the first three (any order) in both designated races." },
  { topic: "tripleTrio", zh: "三T：在三場指定賽事都選中頭三名（不分先後）。", en: "Triple Trio: pick the first three (any order) in all three designated races." },
  { topic: "allUp", zh: "過關：把不同場次的投注串連，前一關的派彩自動投入下一關。", en: "All Up: chain bets across races; each leg's return rolls into the next." },
  { topic: "stars", zh: "星級：開跑前按場地策略規則評分，規則全部符合即為5星賽事。", en: "Stars: each race is scored against the venue's strategy rules; meeting every rule makes it a 5-star race." },
  { topic: "practice", zh: "練習模式：用過往賽事模擬投注，即時對比真實賽果及派彩，無需真金白銀。", en: "Practice mode: bet on past meetings and settle against the real results and dividends, no real money." },
];

// ---------- helpers ----------

const HK = "Asia/Hong_Kong";
export const hkDay = (ms: number) => new Intl.DateTimeFormat("en-CA", { timeZone: HK, year: "numeric", month: "2-digit", day: "2-digit" }).format(ms);
const hkTime = (iso: string | null | undefined) =>
  iso ? new Intl.DateTimeFormat("en-GB", { timeZone: HK, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(Date.parse(iso)) : null;
const compact = (d: string) => d.replaceAll("-", "");
const dashed = (c: string) => `${c.slice(0, 4)}-${c.slice(4, 6)}-${c.slice(6, 8)}`;
const venueZh = (v: Venue) => zhCommon.venue[v];
const venueEn = (v: Venue) => enCommon.venue[v];
const classZh = (c: string | null) => (c ? ((zhCommon.class as Record<string, string>)[c] ?? null) : null);
const isBot = (k: string | undefined): k is BotKey => !!k && k in zhHome.bots;
const betTypeZh = (t: string) => (zhCommon.betType as Record<string, string>)[t] ?? t;
const betTypeEn = (t: string) => (enCommon.betType as Record<string, string>)[t] ?? t;

class Api {
  sources: string[] = [];
  warnings: string[] = [];
  constructor(readonly base: string) {}
  get<T>(path: string): Promise<T | null> {
    return this.request<T>("GET", path);
  }
  post<T>(path: string, body: unknown): Promise<T | null> {
    return this.request<T>("POST", path, body);
  }
  /** JSON or null (404, or any other failure after one retry, which is logged in warnings). */
  private async request<T>(method: "GET" | "POST", path: string, body?: unknown): Promise<T | null> {
    this.sources.push(`${method} ${path}`);
    let last = "";
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const r = await fetch(this.base + path, {
          method,
          headers: { accept: "application/json", "user-agent": "posttime-marketing-gather/1", ...(body === undefined ? {} : { "content-type": "application/json" }) },
          body: body === undefined ? undefined : JSON.stringify(body),
          signal: AbortSignal.timeout(30_000),
        });
        if (r.status === 404) return null;
        if (r.ok) return (await r.json()) as T;
        last = `HTTP ${r.status}`;
        if (r.status < 500) break;
      } catch (e) {
        last = e instanceof Error ? e.message : String(e);
      }
      await new Promise((ok) => setTimeout(ok, 1500));
    }
    this.warnings.push(`${method} ${path} → ${last}`);
    return null;
  }
}

interface DayRef { date: string; venue: Venue; races: number[]; hasResults: boolean; mode?: string }
interface MeetingDetailDTO { raceInfo?: { raceNumber: number; postTime: string | null; status: string }[] }
interface CardDTO { name?: string; class?: string; distance?: number; surface?: string; entries?: { isScratched?: boolean }[] }
interface ResultDTO { winDividend?: number | null; trioDividend?: number | null; quinellaDividend?: number | null }

/** Chinese horse names by HKJC code (null when the lookup has none yet). */
async function zhNames(api: Api, codes: (string | null | undefined)[]): Promise<Map<string, string | null>> {
  const uniq = [...new Set(codes.filter((c): c is string => !!c))];
  const out = new Map<string, string | null>();
  for (let i = 0; i < uniq.length; i += 100) {
    const keys = uniq.slice(i, i + 100).map((code) => ({ kind: "horse", code }));
    const r = await api.post<{ names: Record<string, { zh?: string | null }> }>("/api/names/lookup", { keys });
    for (const k of keys) out.set(k.code, r?.names[`horse:${k.code}`]?.zh ?? null);
  }
  return out;
}

/** One meeting: card basics, model picks + stars for every race, results for the settled ones. */
async function buildMeeting(api: Api, ref: DayRef, nowMs: number, today: string): Promise<MeetingCtx> {
  const c = ref.date; // YYYYMMDD
  const d = dashed(c);
  const detail = await api.get<MeetingDetailDTO>(`/api/meeting/${c}/${ref.venue}`);
  const records = d <= today ? await api.get<HomeRecordDay>(`/api/home/records?date=${d}`) : null;
  const settled = new Map((records?.races ?? []).filter((r) => r.venue === ref.venue).map((r) => [r.raceNo, r]));

  const races = await Promise.all(
    ref.races.map(async (rn) => {
      const [card, analysis, result] = await Promise.all([
        api.get<CardDTO>(`/api/race/${c}/${ref.venue}/${rn}`),
        api.get<PreRaceAnalysis>(`/api/race-analysis?date=${c}&venue=${ref.venue}&race=${rn}`),
        settled.has(rn) ? api.get<ResultDTO>(`/api/result/${c}/${ref.venue}/${rn}`) : Promise.resolve(null),
      ]);
      return { rn, card, analysis, result };
    })
  );

  const codes: (string | null)[] = [];
  for (const r of races) {
    const rec = settled.get(r.rn);
    if (rec) codes.push(...rec.picks.map((p) => p.code), ...rec.top3.map((p) => p.code));
    else codes.push(...(r.analysis?.horses.slice(0, 3).map((h) => h.code) ?? []));
  }
  const zh = await zhNames(api, codes);
  const zhOf = (code: string | null) => (code ? (zh.get(code) ?? null) : null);

  const out: RaceCtx[] = races.map(({ rn, card, analysis, result }) => {
    const info = detail?.raceInfo?.find((x) => x.raceNumber === rn);
    const postTime = info?.postTime ?? null;
    const conf = analysis && analysis.horses.length ? confidence(strategyChecks(analysis)) : null;
    // A result for a race whose post time is still ahead of `now` only happens with --now (replaying a past day): hide it.
    const rec = postTime && Date.parse(postTime) > nowMs ? undefined : settled.get(rn);
    const status: RaceCtx["status"] = rec ? "settled" : postTime && Date.parse(postTime) <= nowMs ? "awaiting-result" : "upcoming";
    const base: RaceCtx = {
      raceNo: rn,
      postTime,
      postTimeHK: hkTime(postTime),
      status,
      name: card?.name ?? null,
      classEn: card?.class ?? null,
      classZh: classZh(card?.class ?? null),
      distance: card?.distance ?? null,
      surface: card?.surface ?? null,
      runners: analysis?.runners ?? (card?.entries ? card.entries.filter((e) => !e.isScratched).length : null),
      stars: conf ? Math.round(conf.stars * 10) / 10 : null,
      rulesMet: conf?.met ?? null,
      rulesTotal: conf?.total ?? null,
      fiveStar: !!conf && conf.total > 0 && conf.met === conf.total,
      picks: [],
    };
    if (rec) {
      base.picks = rec.picks.map((p) => ({ rank: p.rank, num: p.num, name: p.name, nameZh: zhOf(p.code), fin: p.fin }));
      base.result = {
        top3: rec.top3.map((t) => ({ pos: t.pos, num: t.num, name: t.name, nameZh: zhOf(t.code), picked: t.picked })),
        winHit: rec.win,
        placeHit: rec.place,
        topPickWon: rec.picks.some((p) => p.rank === 1 && p.won),
        trioHit: rec.picks.length === 3 && rec.picks.every((p) => p.fin != null && p.fin <= 3),
        winDividend: result?.winDividend ?? null,
        trioDividend: result?.trioDividend ?? null,
        quinellaDividend: result?.quinellaDividend ?? null,
      };
    } else if (analysis) {
      base.picks = [...analysis.horses]
        .sort((a, b) => a.modelRank - b.modelRank)
        .slice(0, 3)
        .map((h) => ({ rank: h.modelRank, num: h.horseNo, name: h.name, nameZh: zhOf(h.code), winPct: h.winPct, placePct: h.placePct }));
    } else api.warnings.push(`no model analysis for ${d} ${ref.venue} R${rn}`);
    return base;
  });

  const s = out.filter((r) => r.result);
  const posts = out.map((r) => r.postTimeHK).filter((t): t is string => !!t);
  return {
    date: d,
    venue: ref.venue,
    venueZh: venueZh(ref.venue),
    venueEn: venueEn(ref.venue),
    raceCount: out.length,
    firstPostHK: posts[0] ?? null,
    lastPostHK: posts[posts.length - 1] ?? null,
    races: out,
    tally: {
      settled: s.length,
      winHits: s.filter((r) => r.result!.winHit).length,
      placeHits: s.filter((r) => r.result!.placeHit).length,
      topPickWins: s.filter((r) => r.result!.topPickWon).length,
      trioHits: s.filter((r) => r.result!.trioHit).length,
      fiveStarSettled: s.filter((r) => r.fiveStar).length,
      fiveStarTopPickPlaced: s.filter((r) => r.fiveStar && r.picks.some((p) => p.rank === 1 && p.fin != null && p.fin <= 3)).length,
    },
    fiveStarRaces: out.filter((r) => r.fiveStar).map((r) => r.raceNo),
    highlights: {
      topPickWon: s.filter((r) => r.result!.topPickWon).map((r) => r.raceNo),
      trioHit: s.filter((r) => r.result!.trioHit).map((r) => r.raceNo),
      winHit: s.filter((r) => r.result!.winHit).map((r) => r.raceNo),
      allMissed: s.filter((r) => !r.result!.placeHit).map((r) => r.raceNo),
      pending: out.filter((r) => !r.result && r.status !== "upcoming").map((r) => r.raceNo),
    },
  };
}

function boardRows(rows: LeaderboardRow[], memberNames: boolean): BoardRow[] {
  return rows.map((r) => {
    const bot = isBot(r.bot) ? r.bot : null;
    return {
      rank: r.rank,
      kind: bot ? "bot" : "member",
      // Members on this board opted in (show_on_leaderboard); the API never returns anyone else.
      name: bot ? enHome.bots[bot].name : memberNames ? r.displayName : null,
      nameZh: bot ? zhHome.bots[bot].name : memberNames ? r.displayName : null,
      ...(bot ? { strategyZh: zhHome.bots[bot].strategy, strategyEn: enHome.bots[bot].strategy } : {}),
      bets: r.bets,
      hits: r.hits,
      hitRate: r.hitRate,
      staked: r.staked,
      returned: r.returned,
      net: r.net,
      roi: r.roi,
    };
  });
}

function links(base: string, slot: Slot, pillar: Pillar, date: string, practiceDate: string | null): Context["links"] {
  const mk = (ch: Channel, q: string) => {
    const u = new URL(base + "/" + q);
    u.searchParams.set("utm_source", UTM_SOURCE[ch]);
    u.searchParams.set("utm_medium", "social");
    u.searchParams.set("utm_campaign", pillar);
    u.searchParams.set("utm_content", `${compact(date)}-${slot}`);
    return u.toString().replaceAll("%2F", "/");
  };
  return Object.fromEntries(
    CHANNELS.map((ch) => [
      ch,
      {
        home: mk(ch, ""),
        practice: practiceDate ? mk(ch, `?tab=bet&date=${practiceDate.replaceAll("-", "/")}`) : null,
        winPlace: mk(ch, "?tab=win-place"),
        trio: mk(ch, "?tab=trio"),
      },
    ])
  ) as Context["links"];
}

/** PLAN.md §5 calendar: race-day slots by slot; non-race days by weekday (Mon recap, Tue learn, Thu board, Fri feature, Sat community). */
export function defaultPillar(slot: Slot, date: string): Pillar {
  if (slot === "pre-meeting") return "picks";
  if (slot === "mid-meeting" || slot === "post-meeting") return "recap";
  if (slot === "late-meeting") return "learn";
  const dow = new Date(`${date}T00:00:00Z`).getUTCDay();
  return (["community", "recap", "learn", "feature", "board", "feature", "community"] as const)[dow]!;
}

const FOCUS: Record<Slot, string[]> = {
  daily: ["pillar (by weekday)", "recap: lastWeek / lastMeeting.tally", "board: bots / leaderboard", "learn: explainer", "feature: nextMeeting", "modelRecord"],
  "pre-meeting": ["meeting.fiveStarRaces", "meeting.races[].picks", "modelRecord (3-month hit rate)", "explainer", "leaderboard.last30 (star-users board, held for review)"],
  "mid-meeting": ["meeting.tally", "meeting.highlights (hits AND misses)", "nextUp races' picks"],
  "late-meeting": ["explainer tied to today", "meeting.tally", "nextUp races' picks (remaining card)"],
  "post-meeting": ["meeting.tally", "meeting.highlights: best (topPickWon/trioHit) and worst (allMissed) races", "modelRecord", "leaderboard.lastDay", "nextMeeting"],
};

// ---------- main ----------

export async function gather(opts: { slot: Slot; date?: string; base?: string; now?: string; memberNames?: boolean; pillar?: Pillar; includeLive?: boolean }): Promise<Context> {
  const base = (opts.base ?? "https://posttimehk.com").replace(/\/+$/, "");
  const nowMs = opts.now ? Date.parse(opts.now) : Date.now();
  if (!Number.isFinite(nowMs)) throw new Error(`bad --now: ${opts.now}`);
  const realToday = hkDay(Date.now());
  const date = opts.date ?? hkDay(nowMs);
  const memberNames = opts.memberNames ?? true;
  const api = new Api(base);
  const slot = opts.slot;

  const days = (await api.get<DayRef[]>("/api/days")) ?? [];
  if (!days.length) api.warnings.push("/api/days returned no meetings");
  const todayRef = days.find((m) => m.date === compact(date)) ?? null;
  // Practice link: the latest fully settled meeting before `date` (practice mode, free).
  const prev = days.filter((m) => m.hasResults && m.date < compact(date)).sort((a, b) => b.date.localeCompare(a.date))[0];
  const pillar = opts.pillar ?? defaultPillar(slot, date);

  const ctx: Context = {
    schema: "posttime.marketing.context/v1",
    slot,
    focus: FOCUS[slot],
    generatedAt: new Date().toISOString(),
    now: new Date(nowMs).toISOString(),
    date,
    base,
    isRaceDay: !!todayRef,
    pillar,
    disclaimer: DISCLAIMER,
    guardrails: GUARDRAILS,
    links: links(base, slot, pillar, date, prev ? dashed(prev.date) : null),
    meeting: null,
    sources: api.sources,
    warnings: api.warnings,
  };

  const wantMeeting = slot !== "daily" || !!todayRef;
  if (todayRef && wantMeeting) ctx.meeting = await buildMeeting(api, todayRef, nowMs, realToday);
  else if (slot !== "daily") api.warnings.push(`no meeting on ${date}: nothing for a ${slot} post (post a daily instead)`);

  // Slim the meeting to what the slot needs.
  if (ctx.meeting) {
    const upcoming = ctx.meeting.races.filter((r) => r.status === "upcoming").map((r) => r.raceNo);
    if (slot === "mid-meeting") ctx.nextUp = upcoming.slice(0, 3);
    if (slot === "late-meeting") ctx.nextUp = upcoming;
    if (slot === "pre-meeting" && ctx.meeting.tally.settled > 0) api.warnings.push("pre-meeting slot but races have already settled");
    const unsettled = ctx.meeting.races.filter((r) => r.status !== "settled").map((r) => `R${r.raceNo}`);
    if (slot === "post-meeting" && unsettled.length) api.warnings.push(`post-meeting slot but no result yet for ${unsettled.join(", ")}: say "results pending" for them, never guess`);
  }

  const needSummary = slot === "daily" || slot === "pre-meeting" || slot === "post-meeting";
  const summary = needSummary ? await api.get<HomeSummary>("/api/home/summary") : null;
  if (summary)
    ctx.modelRecord = {
      from: summary.from,
      to: summary.to,
      firstRace: summary.firstRace,
      lastRace: summary.lastRace,
      races: summary.races,
      meetings: summary.meetings,
      top3WinHits: summary.top3WinHits,
      top3WinPct: summary.top3Win,
      top3PlaceHits: summary.top3PlaceHits,
      top3PlacePct: summary.top3Place,
      fiveStarRaces: summary.fiveStarRaces,
      fiveStarPlaceHits: summary.fiveStarPlaceHits,
      fiveStarPlacePct: summary.fiveStarPlace,
      fiveStarRoiPct: summary.fiveStarRoi,
      trio: { bankers: summary.trio.bankers, last: summary.trio.last, races: summary.trio.races, hits: summary.trio.hits, hitPct: summary.trio.hit, roiPct: summary.trio.roi },
    };

  if (slot === "daily") {
    ctx.lastMeeting = prev ? await buildMeeting(api, prev, nowMs, realToday) : null;
    const from = hkDay(Date.parse(`${date}T12:00:00+08:00`) - 7 * 86_400_000);
    const to = hkDay(Date.parse(`${date}T12:00:00+08:00`) - 86_400_000);
    const wk = await api.get<HomeMeetings>(`/api/home/meetings?from=${from}&to=${to}`);
    ctx.lastWeek = wk
      ? {
          from: wk.from,
          to: wk.to,
          meetings: wk.meetings.map((m) => ({ date: m.date, venue: m.venue, venueZh: venueZh(m.venue), races: m.races.length, winHits: m.winHits, placeHits: m.placeHits })),
          races: wk.races,
          winHits: wk.winHits,
          placeHits: wk.placeHits,
        }
      : null;
    const bots = await Promise.all(
      (Object.keys(zhHome.bots) as BotKey[]).map(async (k) => {
        const p = await api.get<LeaderboardStats & { alias: string }>(`/api/leaderboard/bot-${k}?range=30d`);
        if (!p) return null;
        const row: LeaderboardRow = { bets: p.bets, hits: p.hits, hitRate: p.hitRate, staked: p.staked, returned: p.returned, net: p.net, roi: p.roi, rank: 0, publicId: `bot-${k}`, displayName: "", avatarUrl: null, bot: k };
        return row;
      })
    );
    ctx.bots = boardRows(
      bots.filter((b): b is LeaderboardRow => !!b).sort((a, b) => b.roi - a.roi).map((b, i) => ({ ...b, rank: i + 1 })),
      false
    );
  }
  if (slot === "daily" || slot === "post-meeting") {
    const next = days.filter((m) => m.date > compact(date)).sort((a, b) => a.date.localeCompare(b.date))[0];
    ctx.nextMeeting = next ? { date: dashed(next.date), venue: next.venue, venueZh: venueZh(next.venue), venueEn: venueEn(next.venue), raceCount: next.races.length } : null;
  }
  // pre-meeting: past 30-day board only (PLAN P4 Ex 4); today's bets stay behind --include-live.
  if (slot === "daily" || slot === "pre-meeting" || slot === "post-meeting") {
    const lb = await api.get<LeaderboardResponse>("/api/leaderboard");
    if (lb)
      ctx.leaderboard = {
        lastDay: { date: lb.lastDay.date, minBets: lb.lastDay.minBets, rows: boardRows(lb.lastDay.rows, memberNames) },
        last30: { from: lb.last30.from, minBets: lb.last30.minBets, rows: boardRows(lb.last30.rows, memberNames) },
      };
  }
  if (opts.includeLive && (slot === "pre-meeting" || slot === "mid-meeting")) {
    const t = await api.get<HomeTickets>("/api/home/tickets");
    ctx.tickets = (t?.tickets ?? [])
      .filter((x) => x.date === date && !x.hidden) // hidden members: never shown, not even anonymised
      .filter((x) => isBot(x.bot) || (memberNames && !!x.publicId && !!x.displayName))
      .map((x) => {
        const bot = isBot(x.bot) ? x.bot : null;
        return {
          kind: bot ? "bot" : "member",
          name: bot ? enHome.bots[bot].name : x.displayName,
          nameZh: bot ? zhHome.bots[bot].name : x.displayName,
          betType: betTypeEn(x.betType),
          betTypeZh: betTypeZh(x.betType),
          races: x.races,
          picks: x.picks,
          stake: x.stake,
          postTimeHK: hkTime(x.postTime),
        } satisfies TicketCtx;
      });
  }
  if (slot === "daily" || slot === "pre-meeting" || slot === "late-meeting") {
    const doy = Math.floor((Date.parse(`${date}T00:00:00Z`) - Date.parse(`${date.slice(0, 4)}-01-01T00:00:00Z`)) / 86_400_000);
    ctx.explainer = EXPLAINERS[doy % EXPLAINERS.length]!;
  }
  return ctx;
}

function parseArgs(argv: string[]) {
  const a: Record<string, string | true> = {};
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i]!;
    if (!k.startsWith("--")) throw new Error(`unexpected argument: ${k}`);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith("--")) a[k.slice(2)] = true;
    else a[k.slice(2)] = (i++, next);
  }
  return a;
}

export function slotOf(v: unknown): Slot {
  if (typeof v !== "string" || !(SLOTS as readonly string[]).includes(v)) throw new Error(`--slot must be one of ${SLOTS.join("|")}`);
  return v as Slot;
}

export function pillarOf(v: unknown): Pillar | undefined {
  if (v === undefined) return undefined;
  if (typeof v !== "string" || !(PILLARS as readonly string[]).includes(v)) throw new Error(`--pillar must be one of ${PILLARS.join("|")}`);
  return v as Pillar;
}

async function main() {
  const a = parseArgs(process.argv.slice(2));
  const slot = slotOf(a.slot);
  const date = a.date === undefined ? undefined : String(a.date);
  if (date !== undefined && !/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error("--date must be YYYY-MM-DD");
  const ctx = await gather({
    slot,
    date,
    base: typeof a.base === "string" ? a.base : undefined,
    now: typeof a.now === "string" ? a.now : undefined,
    memberNames: !a["no-member-names"],
    pillar: pillarOf(a.pillar),
    includeLive: !!a["include-live"],
  });
  const json = JSON.stringify(ctx, null, 2);
  if (typeof a.out === "string") writeFileSync(a.out, json + "\n");
  else process.stdout.write(json + "\n");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((e) => {
    console.error(`gather: ${e instanceof Error ? e.message : String(e)}`);
    process.exit(1);
  });
}
