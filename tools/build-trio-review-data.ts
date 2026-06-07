/**
 * Build post-race review data for a meeting from strategy reports + results JSON.
 * Usage: npx tsx tools/build-trio-review-data.ts --date=2026-06-03 --venue=HV
 */
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(import.meta.dirname, '..');

type RaceResult = {
  raceNumber: number;
  class: string;
  distance: number;
  surface: string;
  trioDividend: number;
  finishOrder: { horseNumber: number; finishPosition: number; winOdds: number }[];
};

function parseArgs() {
  const date = process.argv.find((a) => a.startsWith('--date='))?.split('=')[1] ?? '20260603';
  const venue = process.argv.find((a) => a.startsWith('--venue='))?.split('=')[1] ?? 'HV';
  const d = date.replace(/-/g, '');
  return { date: d, venue };
}

function readResults(date: string, venue: string): RaceResult[] {
  const p = path.join(ROOT, 'data/historical', `results_${date}_${venue}.json`);
  const raw = JSON.parse(fs.readFileSync(p, 'utf8')) as RaceResult[];
  return raw.sort((a, b) => a.raceNumber - b.raceNumber);
}

function readReport(date: string, venue: string, race: number): string {
  const p = path.join(ROOT, 'data/reports', `trio_strategy_${date}_${venue}_R${race}.md`);
  return fs.readFileSync(p, 'utf8');
}

function extract(re: RegExp, text: string): string | null {
  const m = text.match(re);
  return m ? m[1].trim() : null;
}

function parseMcTable(text: string): { num: number; win: number; place: number }[] {
  const rows: { num: number; win: number; place: number }[] = [];
  const lineRe = /\|\s*(\d+)\s*\|[^|]+\|\s*([\d.]+)%\s*\|\s*([\d.]+)%/g;
  let inMc = false;
  for (const line of text.split('\n')) {
    if (line.includes('MC SIMULATION (raw)')) inMc = true;
    if (inMc && line.includes('HORSE RANKINGS')) break;
    if (!inMc || !line.includes('|')) continue;
    const m = line.match(/\|\s*(\d+)\s*\|[^|]+\|\s*([\d.]+)%\s*\|\s*([\d.]+)%/);
    if (m) rows.push({ num: +m[1], win: +m[2], place: +m[3] });
  }
  return rows;
}

function parseStrategyA(text: string) {
  const pass = /DEFAULT:\s*PASS/i.test(text) && !/RECOMMENDED:.*膽拖/i.test(text.split('TICKET SUMMARY (Strategy A)')[1]?.slice(0, 200) ?? '');
  const mode = extract(/MODE:\s*\*\*([A-D][^*]*)\*\*/, text) ?? '—';
  const bankerM = text.match(/膽 \(Banker\):\s*\*\*#(\d+)/);
  const banker = bankerM ? +bankerM[1] : null;
  const legsM = text.match(/腳 \(Legs\):\s*\*\*([^*\n]+)\*\*/);
  const legs: number[] = [];
  if (legsM) {
    const legBlock = legsM[1];
    for (const m of legBlock.matchAll(/#(\d+)/g)) legs.push(+m[1]);
  }
  const stakeM = text.match(/TICKET SUMMARY \(Strategy A\)[\s\S]*?TOTAL STAKE[:\s]*\*\*\$?(\d+)/i)
    ?? text.match(/TOTAL STAKE \*\*\$(\d+)/);
  const stake = pass ? 0 : stakeM ? +stakeM[1] : 0;
  const conf = extract(/CONFIDENCE:\s*\*\*([^*]+)\*\*/, text.split('TICKET SUMMARY (Strategy A)')[1] ?? text) ?? '—';
  return { pass, mode, banker, legs, stake, conf };
}

function parseStrategyBReport(text: string) {
  const block = text.split('STRATEGY B')[1] ?? '';
  const bankerM = block.match(/Banker:\s*\*\*#(\d+)/);
  const banker = bankerM ? +bankerM[1] : null;
  const legsM = block.match(/Final legs:\s*\*\*([^*\n]+)\*\*/)
    ?? block.match(/STRATEGY B TICKET:.*腳 \*\*([^*\n]+)\*\*/);
  const legs: number[] = [];
  if (legsM) for (const m of legsM[1].matchAll(/#(\d+)/g)) legs.push(+m[1]);
  const stakeM = block.match(/TOTAL STAKE:\s*\*\*\$(\d+)/);
  const stake = stakeM ? +stakeM[1] : 0;
  const combosM = block.match(/C\((\d+),2\)\s*=\s*\*\*(\d+)/);
  return { banker, legs, stake, combos: combosM ? +combosM[2] : null };
}

function checkHit(banker: number | null, legs: number[], top3: number[]) {
  if (banker == null) return { hit: false, bankerTop3: false, allInPool: false };
  const pool = new Set([banker, ...legs]);
  const bankerTop3 = top3.includes(banker);
  const allInPool = top3.every((h) => pool.has(h));
  return { hit: bankerTop3 && allInPool, bankerTop3, allInPool };
}

function mcTop6(mc: { num: number; win: number }[]) {
  const sorted = [...mc].sort((a, b) => b.win - a.win);
  const top6 = sorted.slice(0, 6).map((h) => h.num);
  return { pool: top6, banker: top6[0] ?? null };
}

function classifyMiss(
  bankerTop3: boolean,
  allInPool: boolean,
  top3: number[],
  pool: Set<number>
): string {
  const gaps = top3.filter((h) => !pool.has(h));
  if (!bankerTop3 && allInPool) return 'Pattern A: banker fail (all 3 in legs)';
  if (bankerTop3 && gaps.length) return `Pattern B: pool gap (#${gaps.join(', #')})`;
  if (!bankerTop3 && gaps.length)
    return `Pattern C: banker fail + pool gap (#${gaps.join(', #')})`;
  if (!bankerTop3) return 'Banker fail';
  return '—';
}

function formatResult(top3: number[], pool: Set<number>) {
  return top3
    .map((h) => (pool.has(h) ? `${h}` : `**${h}**`))
    .join('→');
}

function main() {
  const { date, venue } = parseArgs();
  const results = readResults(date, venue);
  const races = [];

  for (const r of results) {
    const text = readReport(date, venue, r.raceNumber);
    const mc = parseMcTable(text);
    const a = parseStrategyA(text);
    const br = parseStrategyBReport(text);
    const top3 = r.finishOrder
      .filter((h) => h.finishPosition <= 3)
      .sort((x, y) => x.finishPosition - y.finishPosition)
      .map((h) => h.horseNumber);

    const aPool = a.pass ? new Set<number>() : new Set([...(a.banker ? [a.banker] : []), ...a.legs]);
    const aCheck = a.pass
      ? { hit: false, bankerTop3: false, allInPool: false }
      : checkHit(a.banker, a.legs, top3);

    const bPool = new Set([...(br.banker ? [br.banker] : []), ...br.legs]);
    const bCheck = checkHit(br.banker, br.legs, top3);

    const mc6 = mcTop6(mc);
    const mc6Pool = new Set(mc6.pool);
    const mc6Check = checkHit(mc6.banker, mc6.pool.filter((h) => h !== mc6.banker), top3);

    const sp = (n: number) =>
      r.finishOrder.find((h) => h.horseNumber === n)?.winOdds ?? null;
    const pos = (n: number) =>
      r.finishOrder.find((h) => h.horseNumber === n)?.finishPosition ?? 99;

    races.push({
      race: r.raceNumber,
      class: r.class,
      distance: r.distance,
      surface: r.surface,
      top3,
      trio: r.trioDividend,
      resultStr: top3.join('→'),
      a: {
        ...a,
        ...aCheck,
        return: aCheck.hit ? r.trioDividend : 0,
        pnl: (aCheck.hit ? r.trioDividend : 0) - a.stake,
        miss: a.pass ? 'PASS' : classifyMiss(aCheck.bankerTop3, aCheck.allInPool, top3, aPool),
        resultFmt: a.pass ? top3.join('→') : formatResult(top3, aPool),
        poolList: a.pass ? [] : [...aPool],
      },
      bReport: {
        ...br,
        ...bCheck,
        return: bCheck.hit ? r.trioDividend : 0,
        pnl: (bCheck.hit ? r.trioDividend : 0) - br.stake,
        miss: classifyMiss(bCheck.bankerTop3, bCheck.allInPool, top3, bPool),
        resultFmt: formatResult(top3, bPool),
        poolList: [...bPool],
      },
      bMc6: {
        pool: mc6.pool,
        banker: mc6.banker,
        ...mc6Check,
        stake: 100,
        return: mc6Check.hit ? r.trioDividend : 0,
        pnl: (mc6Check.hit ? r.trioDividend : 0) - 100,
        miss: classifyMiss(mc6Check.bankerTop3, mc6Check.allInPool, top3, mc6Pool),
        resultFmt: formatResult(top3, mc6Pool),
      },
      mc,
      sp,
      pos,
    });
  }

  const sum = (key: 'a' | 'bReport' | 'bMc6', field: 'stake' | 'return' | 'pnl') =>
    races.reduce((s, x) => s + x[key][field], 0);
  const hits = (key: 'a' | 'bReport' | 'bMc6') =>
    races.filter((x) => x[key].hit).length;
  const playedA = races.filter((x) => !x.a.pass).length;

  const out = {
    date,
    venue,
    summary: {
      a: {
        races: playedA,
        hits: hits('a'),
        staked: sum('a', 'stake'),
        returned: sum('a', 'return'),
        pnl: sum('a', 'pnl'),
      },
      bReport: {
        races: races.length,
        hits: hits('bReport'),
        staked: sum('bReport', 'stake'),
        returned: sum('bReport', 'return'),
        pnl: sum('bReport', 'pnl'),
      },
      bMc6: {
        races: races.length,
        hits: hits('bMc6'),
        staked: sum('bMc6', 'stake'),
        returned: sum('bMc6', 'return'),
        pnl: sum('bMc6', 'pnl'),
      },
    },
    races,
  };

  const outPath = path.join(ROOT, 'data/temp', `trio_review_data_${date}_${venue}.json`);
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
  console.log('Wrote', outPath);
  console.log(JSON.stringify(out.summary, null, 2));
}

main();
