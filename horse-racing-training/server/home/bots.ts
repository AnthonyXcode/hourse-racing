// Strategy bots for the Home leaderboard. They are NOT members and have no profile: each one "bets" every
// settled race in a window by a fixed rule, at the app's unit (10 credits per combination), and is settled on
// the analyzer's real results and dividends — the same maths as shared/analyzer/model.ts (metrics / trioStats).
// They only fill a board up to 5 rows when fewer than 5 members qualify, and always rank below members.
import { FIN, HNUM, MC, MKT, PLACED, PODDS, SBY, UNIT, WODDS, WON, isSettled, trioOutcome, type AnalyzerPayload, type AnalyzerRace, type HorseRow, type RankIdx } from "../../shared/analyzer/model";
import type { BotProfile, BotProfileBet, LeaderboardRow, LeaderboardStats } from "../../shared/types";
import { stats } from "./leaderboard";

export const BOT_KEYS = ["model1Win", "model1Place", "favWin", "favPlace", "trioK16", "trioBox3", "trioBox4"] as const;
export type BotKey = (typeof BOT_KEYS)[number];
/**
 * Public names for the bots. The internal keys describe each strategy, so they never leave the server:
 * the leaderboard JSON only carries these neutral aliases.
 */
export const BOT_ALIAS: Record<BotKey, string> = {
  model1Win: "comet",
  model1Place: "thunder",
  favWin: "jade",
  favPlace: "phoenix",
  trioK16: "typhoon",
  trioBox3: "harbour",
  trioBox4: "dragon",
};
export interface BotStats extends LeaderboardStats {
  bot: BotKey;
}

/** One race's bet for a bot: null = no bet (no pick, or the odds / dividend needed to settle it are missing). */
interface Bet {
  pool: "WIN" | "PLACE" | "TRIO";
  /** Horse numbers: bankers (Trio banker bets only) and legs; win / place bets have a single leg. */
  bankers: number[];
  legs: number[];
  combos: number;
  stake: number;
  ret: number;
  hit: boolean;
}

const pick = (race: AnalyzerRace, idx: RankIdx): HorseRow | undefined => race.h.find((h) => h[idx] === 1);
const winBet = (race: AnalyzerRace, idx: RankIdx): Bet | null => {
  const h = pick(race, idx);
  if (!h || !(h[WODDS] > 0)) return null; // unpriced: can't be settled
  return { pool: "WIN", bankers: [], legs: [h[HNUM]], combos: 1, stake: UNIT, ret: h[WON] ? h[WODDS] * UNIT : 0, hit: !!h[WON] };
};
const placeBet = (race: AnalyzerRace, idx: RankIdx): Bet | null => {
  const h = pick(race, idx);
  // Place dividends are only stored per placed horse; a race with none stored can't be settled.
  if (!h || !race.h.some((x) => x[PODDS] > 0)) return null;
  if (h[PLACED] && !(h[PODDS] > 0)) return null;
  return { pool: "PLACE", bankers: [], legs: [h[HNUM]], combos: 1, stake: UNIT, ret: h[PLACED] ? h[PODDS] * UNIT : 0, hit: !!h[PLACED] };
};
const trioBet = (race: AnalyzerRace, key: string): Bet | null => {
  if (!(race.td > 0)) return null; // like trioStats: only races with a recorded Trio dividend
  const s = SBY[key]!;
  const o = trioOutcome(race, MC, s);
  if (!o.n) return null;
  const covered = race.h.filter((h) => h[MC] > 0 && h[MC] <= s.L).sort((a, b) => a[MC] - b[MC]);
  return {
    pool: "TRIO",
    bankers: covered.filter((h) => h[MC] <= s.B).map((h) => h[HNUM]),
    legs: covered.filter((h) => h[MC] > s.B).map((h) => h[HNUM]),
    combos: o.n,
    stake: o.n * UNIT,
    ret: o.hit ? race.td : 0,
    hit: o.hit,
  };
};

const RULES: Record<BotKey, (r: AnalyzerRace) => Bet | null> = {
  model1Win: (r) => winBet(r, MC),
  model1Place: (r) => placeBet(r, MC),
  favWin: (r) => winBet(r, MKT),
  favPlace: (r) => placeBet(r, MKT),
  trioK16: (r) => trioBet(r, "k16"),
  trioBox3: (r) => trioBet(r, "b3"),
  trioBox4: (r) => trioBet(r, "b4"),
};

const r1 = (n: number) => Math.round(n * 10) / 10;

/** The races a bot actually bet (settled races, same skip rules as the stats), with each bet. */
export function botBets(races: AnalyzerRace[], bot: BotKey): { race: AnalyzerRace; bet: Bet }[] {
  const out: { race: AnalyzerRace; bet: Bet }[] = [];
  for (const race of races.filter(isSettled)) {
    const bet = RULES[bot](race);
    if (bet) out.push({ race, bet });
  }
  return out;
}

/** Every bot's results over these races (settled races only). */
export function botStats(races: AnalyzerRace[]): BotStats[] {
  return BOT_KEYS.map((bot) => {
    let bets = 0, hits = 0, staked = 0, returned = 0;
    for (const { bet: b } of botBets(races, bot)) {
      bets++;
      if (b.hit) hits++;
      staked += b.stake;
      returned += b.ret;
    }
    const s = stats({ bets, hits, staked: r1(staked), returned: r1(returned) });
    return { bot, ...s, net: r1(s.net) };
  });
}

/** Internal key for a public alias (null when unknown). */
export const botKeyOf = (alias: string): BotKey | null => (BOT_KEYS.find((k) => BOT_ALIAS[k] === alias) as BotKey | undefined) ?? null;

interface CardRunner {
  horseNumber: number;
  horse?: { code?: string; name?: string };
}
export type Runners = (date: string, venue: string, raceNo: number) => CardRunner[] | null;

/** A bot's public page: the board row's stats for the window plus every bet behind them (newest first). */
export function botProfile(races: AnalyzerRace[], bot: BotKey, runners: Runners, window: { from: string; to: string }): BotProfile {
  const st = botStats(races).find((b) => b.bot === bot)!;
  const { bot: _key, ...numbers } = st;
  const records = botBets(races, bot)
    .sort((a, b) => b.race.d.localeCompare(a.race.d) || b.race.v.localeCompare(a.race.v) || b.race.r - a.race.r)
    .map(({ race, bet }): BotProfileBet => {
      const byNum = new Map((runners(race.d, race.v, race.r) ?? []).map((e) => [e.horseNumber, e.horse ?? {}]));
      const horse = (num: number) => ({ num, name: byNum.get(num)?.name ?? null, code: byNum.get(num)?.code ?? null });
      const top3 = race.h
        .filter((h) => h[FIN] >= 1 && h[FIN] <= 3)
        .sort((a, b) => a[FIN] - b[FIN] || a[HNUM] - b[HNUM])
        .map((h) => ({ pos: h[FIN], ...horse(h[HNUM]) }));
      return {
        date: race.d,
        venue: race.v,
        raceNo: race.r,
        pool: bet.pool,
        selection: [...bet.bankers, ...bet.legs].map(horse),
        bankers: bet.bankers,
        legs: bet.legs,
        combos: bet.combos,
        stake: bet.stake,
        returned: r1(bet.ret),
        status: bet.hit ? "won" : "lost",
        top3,
      };
    });
  return { alias: BOT_ALIAS[bot], from: window.from, to: window.to, ...numbers, records };
}

export const BOARD_SIZE = 5;

/**
 * Fill a board to BOARD_SIZE: real (already ranked) rows first, then the best bots by ROI (ties: net, then key)
 * among those that bet at least `minBets` races. With ≥ BOARD_SIZE real rows, no bots.
 */
export function fillWithBots(real: LeaderboardRow[], bots: BotStats[], minBets: number): LeaderboardRow[] {
  if (real.length >= BOARD_SIZE) return real;
  const extra = bots
    .filter((b) => b.bets >= minBets)
    .sort((a, b) => b.roi - a.roi || b.net - a.net || a.bot.localeCompare(b.bot))
    .slice(0, BOARD_SIZE - real.length)
    .map((b, i): LeaderboardRow => ({ ...b, bot: BOT_ALIAS[b.bot], rank: real.length + i + 1, publicId: `bot-${BOT_ALIAS[b.bot]}`, displayName: "", avatarUrl: null }));
  return [...real, ...extra];
}

/** Settled analyzer races per window, cached ~10 min (the analyzer itself caches per race); stats derive from them. */
export function botBoard(deps: { run: (from: string, to: string) => Promise<AnalyzerPayload>; ttlMs?: number; now?: () => number }) {
  const ttl = deps.ttlMs ?? 10 * 60_000;
  const now = deps.now ?? Date.now;
  const cache = new Map<string, { at: number; races: Promise<AnalyzerRace[]>; stats: Promise<BotStats[]> }>();
  const entry = (from: string, to: string) => {
    const key = `${from}_${to}`;
    const hit = cache.get(key);
    if (hit && now() - hit.at < ttl) return hit;
    const races = deps.run(from, to).then((p) => p.races.filter((r) => r.d >= from && r.d <= to && isSettled(r)));
    const e = { at: now(), races, stats: races.then(botStats) };
    races.catch(() => cache.delete(key));
    if (cache.size > 20) cache.clear();
    cache.set(key, e);
    return e;
  };
  return {
    /** Board stats per bot for race dates [from, to] (YYYY-MM-DD). */
    stats: (from: string, to: string): Promise<BotStats[]> => entry(from, to).stats,
    /** The same window's settled races (for a bot's page). */
    races: (from: string, to: string): Promise<AnalyzerRace[]> => entry(from, to).races,
  };
}
