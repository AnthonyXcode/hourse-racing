// Home ticket carousel: members' pending LIVE bets on races not yet run, biggest stake first. When fewer than
// TICKETS_SIZE qualify, the strategy bots (bots.ts) fill it with the bet each would make on an upcoming race, from the
// pre-race analysis (model / market ranks, no results). Members who don't show on the leaderboard are anonymous:
// their bet is listed but no name, avatar or public id leaves the server.
import type { MembersDB } from "../members/db";
import { picksText } from "../../shared/credits/format";
import { choose } from "../../shared/betEngine/combinatorics";
import { SBY, UNIT, type PreRaceAnalysis } from "../../shared/analyzer/model";
import type {
  BetSelection,
  BetTypeId,
  HomeTicket,
  Venue,
} from "../../shared/types";
import { BOT_ALIAS, BOT_KEYS, type BotKey } from "./bots";

export const TICKETS_SIZE = 8;

/** A race still open for betting (YYYY-MM-DD date, ISO post time). */
export interface OpenRace {
  date: string;
  venue: Venue;
  raceNo: number;
  postTime: string;
}

const avatarUrl = (file: string | null) =>
  file ? `/api/avatars/${file}` : null;
const dashed = (c: string) =>
  `${c.slice(0, 4)}-${c.slice(4, 6)}-${c.slice(6, 8)}`;
const shortRef = (s: string) =>
  s
    .replace(/[^a-z0-9]/gi, "")
    .slice(-6)
    .toUpperCase();
/** WIN / PLA read as plain numbers ("R1 4,7"); other pools use the 膽 / 腳 form. */
const ticketPicks = (sel: BetSelection) =>
  sel.type === "win" || sel.type === "place"
    ? sel.raceLegs
        .map((l) => `R${l.raceNumber} ${[...l.bankers, ...l.legs].join(",")}`)
        .join("  |  ")
    : picksText(sel);

/** Members' pending LIVE bets whose first race is still to run, biggest stake first (hidden members anonymised). */
export function memberTickets(
  db: MembersDB,
  now: number,
  today: string,
  limit = TICKETS_SIZE,
): HomeTicket[] {
  const rows = db
    .prepare(
      `SELECT b.id, b.date, b.venue, b.bet_type, b.selection, b.race_ids, b.first_post_time, b.stake, u.public_id, u.display_name, u.avatar_file, u.show_on_leaderboard
         FROM live_bets b JOIN users u ON u.id = b.user_id
        WHERE b.status = 'pending' AND b.date >= ?
        ORDER BY b.stake DESC, b.created_at DESC`,
    )
    .all(today) as {
    id: string;
    date: string;
    venue: Venue;
    bet_type: BetTypeId;
    selection: string;
    race_ids: string;
    first_post_time: string | null;
    stake: number;
    public_id: string | null;
    display_name: string;
    avatar_file: string | null;
    show_on_leaderboard: number;
  }[];
  return rows
    .filter((r) => !r.first_post_time || Date.parse(r.first_post_time) > now)
    .slice(0, limit)
    .map((r) => {
      const shown = !!r.show_on_leaderboard && !!r.public_id;
      return {
        ref: shortRef(r.id),
        publicId: shown ? r.public_id! : "",
        displayName: shown ? r.display_name : "",
        avatarUrl: shown ? avatarUrl(r.avatar_file) : null,
        ...(shown ? {} : { hidden: true }),
        date: dashed(r.date),
        venue: r.venue,
        betType: r.bet_type,
        races: JSON.parse(r.race_ids) as number[],
        picks: ticketPicks(JSON.parse(r.selection) as BetSelection),
        stake: r.stake,
        postTime: r.first_post_time,
      };
    });
}

/** The bet a bot would make on this race before it runs (same rules as bots.ts), or null (no pick / too few runners). */
export function botPreBet(
  bot: BotKey,
  a: PreRaceAnalysis,
): {
  betType: BetTypeId;
  bankers: number[];
  legs: number[];
  combos: number;
} | null {
  const byModel = [...a.horses].sort((x, y) => x.modelRank - y.modelRank);
  const fav = a.horses.find((h) => h.marketRank === 1);
  const single = (betType: BetTypeId, h: { horseNo: number } | undefined) =>
    h ? { betType, bankers: [], legs: [h.horseNo], combos: 1 } : null;
  const trio = (key: string) => {
    const s = SBY[key]!;
    if (byModel.length < s.L) return null;
    const top = byModel.slice(0, s.L).map((h) => h.horseNo);
    const asc = (ns: number[]) => ns.sort((x, y) => x - y);
    return {
      betType: "trio" as const,
      bankers: asc(top.slice(0, s.B)),
      legs: asc(top.slice(s.B)),
      combos: choose(s.L - s.B, 3 - s.B),
    };
  };
  switch (bot) {
    case "model1Win":
      return single("win", byModel[0]);
    case "model1Place":
      return single("place", byModel[0]);
    case "favWin":
      return single("win", fav);
    case "favPlace":
      return single("place", fav);
    case "trioK16":
      return trio("k16");
    case "trioBox3":
      return trio("b3");
    case "trioBox4":
      return trio("b4");
  }
}

/**
 * One ticket per bot, spread over the open races in post-time order (bot i bets race i, wrapping round),
 * biggest stake first. Races without a pre-race analysis are skipped.
 */
export async function botTickets(
  races: OpenRace[],
  analyze: (r: OpenRace) => Promise<PreRaceAnalysis | null>,
  limit: number,
): Promise<HomeTicket[]> {
  if (limit <= 0 || !races.length) return [];
  const open = [...races].sort((a, b) => a.postTime.localeCompare(b.postTime));
  const analyses = new Map<OpenRace, Promise<PreRaceAnalysis | null>>();
  const of = (r: OpenRace) =>
    analyses.get(r) ??
    analyses
      .set(
        r,
        analyze(r).catch(() => null),
      )
      .get(r)!;
  const out: HomeTicket[] = [];
  for (const [i, bot] of BOT_KEYS.entries()) {
    const race = open[i % open.length]!;
    const a = await of(race);
    const bet = a && botPreBet(bot, a);
    if (!bet) continue;
    const alias = BOT_ALIAS[bot];
    const sel: BetSelection = {
      type: bet.betType,
      raceLegs: [
        { raceNumber: race.raceNo, bankers: bet.bankers, legs: bet.legs },
      ],
    };
    out.push({
      ref: `${alias.slice(0, 3)}${race.date.slice(5).replace("-", "")}${race.raceNo}`.toUpperCase(),
      publicId: `bot-${alias}`,
      displayName: "",
      avatarUrl: null,
      bot: alias,
      date: race.date,
      venue: race.venue,
      betType: bet.betType,
      races: [race.raceNo],
      picks: ticketPicks(sel),
      stake: bet.combos * UNIT,
      postTime: race.postTime,
    });
  }
  return out.sort((a, b) => b.stake - a.stake).slice(0, limit);
}
