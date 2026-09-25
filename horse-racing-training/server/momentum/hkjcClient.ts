// HKJC info GraphQL client. The endpoint only accepts WHITELISTED query texts, so the
// queries in ./queries/*.graphql are byte-for-byte copies of what bet.hkjc.com sends —
// do not reformat or edit them. Re-capture from the site's network tab if HKJC changes them.
import { readFileSync } from "fs";
import { fileURLToPath } from "url";

const ENDPOINT = "https://info.cld.hkjc.com/graphql/base/";
const q = (name: string) => readFileSync(fileURLToPath(new URL(`./queries/${name}.graphql`, import.meta.url)), "utf8");
const QUERIES = {
  meeting: { op: "raceMeetings", text: q("meeting") },
  runners: { op: "racing", text: q("runners") },
  odds: { op: "racing", text: q("odds") },
  investment: { op: "racing", text: q("investment") },
  results: { op: "resultMeetings", text: q("results") },
};

export interface MeetingRace {
  raceNo: number;
  postTime: string; // ISO with +08:00
  status: string; // e.g. DECLARED | SELLING? | CLOSED | RESULT
}
export interface Runner {
  raceNo: number;
  horseNo: number;
  name: string;
  /** Traditional Chinese name (name_ch); null when HKJC sends none. */
  nameZh?: string | null;
  status: string; // Declared | Ran | Scratched | ...
  finalPosition: number | null;
  winOdds: number | null;
}
export interface RaceOdds {
  win: Map<number, number>;
  pla: Map<number, number>;
  winPool: number | null;
  plaPool: number | null;
  sellStatus: string | null;
  hkjcUpdatedAt: string | null; // WIN pool lastUpdateTime, HKJC's clock
}

export interface Dividend {
  raceNo: number;
  pool: string; // WIN | PLA | QIN | QPL | TRI | ...
  comb: string; // e.g. "1,4,6"
  div: number; // HK$ per $10 unit
}

export interface HkjcClient {
  meeting(date: string, venue: string): Promise<MeetingRace[]>;
  runners(date: string, venue: string): Promise<Runner[]>;
  odds(date: string, venue: string, raceNo: number): Promise<RaceOdds>;
  /** Official single-race dividends for the meeting (empty for races not yet paid out). */
  dividends(date: string, venue: string): Promise<Dividend[]>;
}

const DIVIDEND_POOLS = new Set(["WIN", "PLA", "QIN", "QPL", "TRI"]);

async function post<T>(key: keyof typeof QUERIES, variables: Record<string, unknown>): Promise<T> {
  const { op, text } = QUERIES[key];
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ operationName: op, variables, query: text }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`HKJC ${key}: HTTP ${res.status}`);
  const json = (await res.json()) as { data?: T; errors?: { message: string }[] };
  if (json.errors?.length) throw new Error(`HKJC ${key}: ${json.errors.map((e) => e.message).join("; ")}`);
  return json.data as T;
}

const num = (s: unknown): number | null => {
  const n = typeof s === "number" ? s : parseFloat(String(s ?? ""));
  return Number.isFinite(n) && n > 0 ? n : null;
};

interface PoolNode {
  oddsType: string;
  sellStatus?: string;
  lastUpdateTime?: string;
  investment?: string;
  oddsNodes?: { combString: string; oddsValue: string }[];
}

export const hkjcClient: HkjcClient = {
  async meeting(date, venue) {
    const d = await post<{ raceMeetings: { races: { no: number; postTime: string; status: string }[] }[] | null }>(
      "meeting",
      { date, venueCode: venue }
    );
    return (d.raceMeetings?.[0]?.races ?? []).map((r) => ({ raceNo: r.no, postTime: r.postTime, status: r.status }));
  },

  async runners(date, venue) {
    type R = { no: string; status: string; name_en: string; name_ch: string | null; finalPosition: number | null; winOdds: string };
    const d = await post<{ raceMeetings: { races: { no: number; runners: R[] }[] }[] | null }>("runners", {
      date,
      venueCode: venue,
    });
    return (d.raceMeetings?.[0]?.races ?? []).flatMap((race) =>
      race.runners
        .filter((r) => /^\d+$/.test(r.no)) // standbys have no number
        .map((r) => ({
          raceNo: race.no,
          horseNo: Number(r.no),
          name: r.name_en,
          nameZh: r.name_ch?.trim() || null,
          status: r.status,
          finalPosition: typeof r.finalPosition === "number" && r.finalPosition > 0 ? r.finalPosition : null,
          winOdds: num(r.winOdds),
        }))
    );
  },

  async dividends(date, venue) {
    type P = { oddsType: string; leg: { races: number[] }; dividends: { winComb: string; div: string; status: string }[] };
    const d = await post<{ raceMeetings: { resPools: P[] }[] | null }>("results", {
      date,
      venueCode: venue,
      foOddsTypes: ["JKC", "TNC"],
      foFilter: null,
      // Same list the results page sends; we keep only the single-race pools we show.
      resultOddsType: ["WIN", "PLA", "QIN", "QPL", "CWA", "CWB", "CWC", "IWN", "FCT", "TCE", "TRI", "FF", "QTT", "DBL", "TBL", "DT", "TT", "SixUP"],
    });
    return (d.raceMeetings?.[0]?.resPools ?? [])
      .filter((p) => DIVIDEND_POOLS.has(p.oddsType) && p.leg.races.length === 1)
      .flatMap((p) =>
        p.dividends
          .filter((x) => x.status === "OFFICIAL")
          .map((x) => ({ raceNo: p.leg.races[0]!, pool: p.oddsType, comb: x.winComb, div: num(x.div) }))
          .filter((x): x is Dividend => x.div != null)
      );
  },

  async odds(date, venue, raceNo) {
    const vars = { date, venueCode: venue, raceNo };
    const [o, inv] = await Promise.all([
      post<{ raceMeetings: { pmPools: PoolNode[] }[] }>("odds", { ...vars, oddsTypes: ["WIN", "PLA"] }),
      post<{ raceMeetings: { poolInvs: PoolNode[] }[] }>("investment", { ...vars, oddsTypes: ["WIN", "PLA"] }),
    ]);
    const pools = o.raceMeetings?.[0]?.pmPools ?? [];
    const invs = inv.raceMeetings?.[0]?.poolInvs ?? [];
    const nodes = (t: string) =>
      new Map(
        (pools.find((p) => p.oddsType === t)?.oddsNodes ?? [])
          .map((n) => [Number(n.combString), num(n.oddsValue)] as const)
          .filter((e): e is [number, number] => e[1] != null)
      );
    return {
      win: nodes("WIN"),
      pla: nodes("PLA"),
      winPool: num(invs.find((p) => p.oddsType === "WIN")?.investment),
      plaPool: num(invs.find((p) => p.oddsType === "PLA")?.investment),
      sellStatus: pools.find((p) => p.oddsType === "WIN")?.sellStatus ?? null,
      hkjcUpdatedAt: pools.find((p) => p.oddsType === "WIN")?.lastUpdateTime ?? null,
    };
  },
};
