/**
 * Generate trio_review and trio_review_stratC markdown from build-trio-review-data output.
 */
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(import.meta.dirname, '..');

type RaceRow = {
  race: number;
  class: string;
  distance: number;
  surface: string;
  top3: number[];
  trio: number;
  resultStr: string;
  a: Record<string, unknown>;
  bReport: Record<string, unknown>;
  bMc6: Record<string, unknown>;
  mc: { num: number; win: number; place: number; name?: string; sp?: number }[];
};

type Data = {
  date: string;
  venue: string;
  summary: Record<string, unknown>;
  races: RaceRow[];
};

function readReportMcFull(date: string, venue: string, race: number) {
  const text = fs.readFileSync(
    path.join(ROOT, 'data/reports', `trio_strategy_${date}_${venue}_R${race}.md`),
    'utf8',
  );
  const rows: { num: number; name: string; win: number; place: number; sp: number }[] = [];
  let inMc = false;
  for (const line of text.split('\n')) {
    if (line.includes('MC SIMULATION (raw)')) inMc = true;
    if (inMc && line.includes('HORSE RANKINGS')) break;
    const m = line.match(/^\|\s*(\d+)\s*\|\s*([^|]+?)\s*\|\s*([\d.]+)%\s*\|\s*([\d.]+)%\s*\|\s*([\d.]+)/);
    if (m)
      rows.push({
        num: +m[1],
        name: m[2].trim(),
        win: +m[3],
        place: +m[4],
        sp: +m[5],
      });
  }
  return rows;
}

function readResultsPos(date: string, venue: string) {
  const raw = JSON.parse(
    fs.readFileSync(path.join(ROOT, 'data/historical', `results_${date}_${venue}.json`), 'utf8'),
  ) as {
    raceNumber: number;
    finishOrder: { horseNumber: number; finishPosition: number; winOdds: number }[];
  }[];
  const map = new Map<number, Map<number, { pos: number; sp: number }>>();
  for (const r of raw) {
    const m = new Map<number, { pos: number; sp: number }>();
    for (const h of r.finishOrder) m.set(h.horseNumber, { pos: h.finishPosition, sp: h.winOdds });
    map.set(r.raceNumber, m);
  }
  return map;
}

function pct(n: number, d: number) {
  return d ? ((n / d) * 100).toFixed(1) : '0.0';
}

function roi(pnl: number, staked: number) {
  return staked ? ((pnl / staked) * 100).toFixed(1) : '0.0';
}

function main() {
  const { date, venue } = (() => {
    const d = process.argv.find((a) => a.startsWith('--date='))?.split('=')[1] ?? '20260603';
    const v = process.argv.find((a) => a.startsWith('--venue='))?.split('=')[1] ?? 'HV';
    return { date: d.replace(/-/g, ''), venue: v };
  })();

  const dataPath = path.join(ROOT, 'data/temp', `trio_review_data_${date}_${venue}.json`);
  const data: Data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const posMap = readResultsPos(date, venue);

  const sa = data.summary.a as { races: number; hits: number; staked: number; returned: number; pnl: number };
  const sb = data.summary.bReport as typeof sa;
  const s6 = data.summary.bMc6 as typeof sa;

  const played = data.races.filter((r) => !(r.a as { pass: boolean }).pass);
  const hitsA = played.filter((r) => (r.a as { hit: boolean }).hit);
  const confGroups: Record<string, { races: number; hits: number; staked: number; returned: number }> = {};

  for (const r of played) {
    const a = r.a as { conf: string; stake: number; return: number; hit: boolean };
    const c = a.conf.replace(/\s+/g, ' ').trim();
    if (!confGroups[c]) confGroups[c] = { races: 0, hits: 0, staked: 0, returned: 0 };
    confGroups[c].races++;
    if (a.hit) confGroups[c].hits++;
    confGroups[c].staked += a.stake;
    confGroups[c].returned += a.return;
  }

  let banker1 = 0,
    banker23 = 0,
    bankerOut = 0;
  const b1: string[] = [],
    b23: string[] = [],
    bout: string[] = [];
  let all3Pool = 0,
    bankerHitGap = 0;

  for (const r of played) {
    const a = r.a as { banker: number; hit: boolean; bankerTop3: boolean; allInPool: boolean };
    const pm = posMap.get(r.race)!;
    const bp = pm.get(a.banker)?.pos ?? 99;
    if (bp === 1) {
      banker1++;
      b1.push(`R${r.race}`);
    } else if (bp <= 3) {
      banker23++;
      b23.push(`R${r.race}`);
    } else {
      bankerOut++;
      bout.push(`R${r.race}`);
    }
    const pool = new Set([a.banker, ...((r.a as { legs: number[] }).legs || [])]);
    if (r.top3.every((h) => pool.has(h))) all3Pool++;
    if (a.bankerTop3 && !a.hit) bankerHitGap++;
  }

  // Section 2 table
  const s2Rows = data.races
    .map((r) => {
      const a = r.a as {
        pass: boolean;
        mode: string;
        banker: number;
        legs: number[];
        hit: boolean;
        return: number;
        stake: number;
        pnl: number;
        miss: string;
        resultFmt: string;
      };
      if (a.pass) {
        return `| R${r.race} | ${r.class} ${r.distance}m | **PASS (D)** | #${a.banker} (optional) | ${a.legs.map((n) => `#${n}`).join(', ')} | ${r.resultStr} | — | $${r.trio} | $0 | $0 | **PASS** — not staked |`;
      }
      const hitStr = a.hit ? '**HIT ✅**' : 'MISS ❌';
      return `| R${r.race} | ${r.class} ${r.distance}m | ${a.mode} | **#${a.banker}** | ${a.legs.map((n) => `#${n}`).join(', ')} | ${a.resultFmt} | ${hitStr} | $${r.trio} | $${a.return} | ${a.pnl >= 0 ? '+' : ''}$${a.pnl} | ${a.miss} |`;
    })
    .join('\n');

  // A/B table
  const abRows = data.races
    .map((r) => {
      const a = r.a as { pass: boolean; banker: number; legs: number[]; hit: boolean; return: number; stake: number };
      const b6 = r.bMc6 as { pool: number[]; banker: number; hit: boolean; return: number };
      const aPool = a.pass ? 'PASS' : [...new Set([a.banker, ...a.legs])].sort((x, y) => x - y).map((n) => `#${n}`).join(',');
      const bPool = b6.pool.map((n) => `#${n}`).join(',');
      const aHit = a.pass ? '—' : a.hit ? '✅' : '❌';
      const diff =
        a.pass
          ? 'A PASS; B still plays'
          : a.banker !== b6.banker
            ? `Banker A=#${a.banker} B=#${b6.banker}`
            : aPool !== bPool
              ? 'Pool size/members differ'
              : 'Same banker; pool overlap';
      return `| R${r.race} | ${aPool} | #${a.banker} | ${bPool} | #${b6.banker} | ${r.resultStr} | ${aHit} | ${b6.hit ? '✅' : '❌'} | $${r.trio} | $${a.pass ? 0 : a.return} | $${b6.return} | $${a.pass ? 0 : a.stake} | $100 | ${diff} |`;
    })
    .join('\n');

  const diverged = data.races.filter((r) => {
    const a = r.a as { pass: boolean; hit: boolean };
    const b6 = r.bMc6 as { hit: boolean };
    if (a.pass) return b6.hit;
    return a.hit !== b6.hit;
  });

  const venueLabel = venue === 'ST' ? 'Sha Tin' : 'Happy Valley';
  const fmtDate = `${date.slice(6, 8)} ${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][+date.slice(4,6)-1]} ${date.slice(0,4)}`;
  const nRaces = data.races.length;
  const passCount = data.races.filter((r) => (r.a as { pass: boolean }).pass).length;
  const stakedA = played.length;

  const hitsAnalysis = hitsA
    .map((r) => {
      const a = r.a as { banker: number; legs: number[]; stake: number; pnl: number; return: number };
      const mcRows = readReportMcFull(date, venue, r.race);
      const pm = posMap.get(r.race)!;
      const horseLine = (n: number, role: string) => {
        const mc = mcRows.find((h) => h.num === n);
        const fin = pm.get(n);
        return `| #${n} ${mc?.name ?? ''} | ${role} | ${mc?.sp ?? '—'} | ${mc?.win ?? '—'}% | ${mc?.place ?? '—'}% | ${fin && fin.pos <= 3 ? '**' + fin.pos + '**' : fin?.pos ?? '—'} |`;
      };
      return `### R${r.race} — HIT ✅

**Result:** ${r.resultStr} | **Trio:** $${r.trio} | **Stake:** $${a.stake} | **P&L:** ${a.pnl >= 0 ? '+' : ''}$${a.pnl}

| Horse | Role | SP | MC Win% | MC Place% | Result |
|-------|------|-----|---------|-----------|--------|
${horseLine(a.banker, '★ Banker')}
${a.legs.map((n) => horseLine(n, 'Leg')).join('\n')}

**Return:** $${a.return} − $${a.stake} = **${a.pnl >= 0 ? '+' : ''}$${a.pnl}**
`;
    })
    .join('\n');

  const patA = played.filter((r) => (r.a as { miss: string }).miss.includes('Pattern A'));
  const patB = played.filter((r) => (r.a as { miss: string }).miss.includes('Pattern B'));
  const patC = played.filter((r) => (r.a as { miss: string }).miss.includes('Pattern C'));

  const bestHit = [...hitsA].sort((a, b) => (b.a as { pnl: number }).pnl - (a.a as { pnl: number }).pnl)[0];
  const worstMiss = [...played]
    .filter((r) => !(r.a as { hit: boolean }).hit)
    .sort((a, b) => b.trio - a.trio)[0];
  const frustrating = patA[0] ?? patB.find((r) => r.trio > 500);
  const biggestSurprise = [...data.races].sort((a, b) => {
    const aMc1 = a.mc.sort((x, y) => y.win - x.win)[0];
    const bMc1 = b.mc.sort((x, y) => y.win - x.win)[0];
    const aWon = a.top3[0] === aMc1?.num;
    const bWon = b.top3[0] === bMc1?.num;
    return (aWon ? 0 : a.trio) - (bWon ? 0 : b.trio);
  }).reverse()[0];

  const mc1Wins = data.races.filter((r) => {
    const mc1 = [...r.mc].sort((a, b) => b.win - a.win)[0];
    return r.top3[0] === mc1?.num;
  });

  const going =
    JSON.parse(
      fs.readFileSync(path.join(ROOT, 'data/historical', `results_${date}_${venue}.json`), 'utf8'),
    )[0]?.going ?? '—';

  const bHits = data.races.filter((r) => (r.bReport as { hit: boolean }).hit);
  const bPatAEarly = data.races.filter((r) => (r.bReport as { miss: string }).miss.includes('Pattern A'));
  const mc6WouldHit = played.filter((r) => !(r.a as { hit: boolean }).hit && (r.bMc6 as { hit: boolean }).hit);
  const fixableMisses = played.filter(
    (r) => !(r.a as { hit: boolean }).hit && ((r.bMc6 as { hit: boolean }).hit || (r.bReport as { hit: boolean }).hit),
  );
  const fixableTrio = fixableMisses.reduce((s, r) => s + r.trio, 0);

  const notableMissBullets = [
    patA.length
      ? `**Pattern A (×${patA.length}):** ${patA.map((r) => `R${r.race}`).join(', ')} — all three placers in pool but banker missed top 3.`
      : null,
    patB.length
      ? `**Pattern B (×${patB.length}):** ${patB.map((r) => `R${r.race}`).join(', ')} — banker placed but excluded horse(s) in the frame.`
      : null,
    worstMiss
      ? `**R${worstMiss.race} (Trio $${worstMiss.trio.toLocaleString()}):** ${(worstMiss.a as { miss: string }).miss}.`
      : null,
    mc6WouldHit.length
      ? `**MC top-6 would have hit:** ${mc6WouldHit.map((r) => `R${r.race} ($${r.trio})`).join(', ') || '—'}.`
      : null,
  ]
    .filter(Boolean)
    .map((line) => `- ${line}`)
    .join('\n');

  const bestHitLine = bestHit
    ? `**R${bestHit.race}** — only Strategy A hit; Trio **$${bestHit.trio}**; **${(bestHit.a as { pnl: number }).pnl >= 0 ? '+' : ''}$${(bestHit.a as { pnl: number }).pnl}** on $${(bestHit.a as { stake: number }).stake} stake.`
    : '_No Strategy A hits._';
  const worstBetLine = played
    .filter((r) => !(r.a as { hit: boolean }).hit)
    .sort((a, b) => (b.a as { pnl: number }).pnl - (a.a as { pnl: number }).pnl)[0];
  const worstBetText = worstBetLine
    ? `**R${worstBetLine.race}** — **${(worstBetLine.a as { pnl: number }).pnl >= 0 ? '+' : ''}$${(worstBetLine.a as { pnl: number }).pnl}** stake; missed **$${worstBetLine.trio.toLocaleString()}** Trio (${worstBetLine.resultStr}).`
    : '—';
  const frustratingText = frustrating
    ? `**R${frustrating.race}** — ${(frustrating.a as { miss: string }).miss}; result **${frustrating.resultStr}**.`
    : bPatAEarly[0]
      ? `**R${bPatAEarly[0].race} (B)** — Pattern A; all placers in B legs but MC #1 banker missed.`
      : '—';
  const surpriseRace = biggestSurprise;
  const surpriseMc1 = surpriseRace ? [...surpriseRace.mc].sort((a, b) => b.win - a.win)[0] : null;
  const surpriseText = surpriseRace
    ? `**R${surpriseRace.race}** — MC #1 **#${surpriseMc1?.num}** (${surpriseMc1?.win.toFixed(1)}% Win) upset; winner **#${surpriseRace.top3[0]}**; Trio **$${surpriseRace.trio.toLocaleString()}**.`
    : '—';
  const bestMcCall = mc1Wins.sort((a, b) => {
    const aw = [...a.mc].sort((x, y) => y.win - x.win)[0]!.win;
    const bw = [...b.mc].sort((x, y) => y.win - x.win)[0]!.win;
    return bw - aw;
  })[0];
  const bestMcText = bestMcCall
    ? `**R${bestMcCall.race}** — MC #1 **#${bestMcCall.top3[0]}** won (${[...bestMcCall.mc].sort((a, b) => b.win - a.win)[0]!.win.toFixed(1)}% Win).`
    : '—';

  const abWinner =
    sb.pnl > sa.pnl && sb.pnl > s6.pnl
      ? 'B (report)'
      : s6.pnl > sa.pnl && s6.pnl >= sb.pnl
        ? 'B (MC top-6)'
        : sa.pnl >= sb.pnl && sa.pnl >= s6.pnl
          ? 'A'
          : sb.pnl >= s6.pnl
            ? 'B (report)'
            : 'B (MC top-6)';

  const whatIfRows = played
    .filter((r) => !(r.a as { hit: boolean }).hit)
    .slice(0, 8)
    .map((r) => {
      const a = r.a as { mode: string; banker: number; legs: number[]; miss: string };
      const gaps = r.top3.filter((h) => ![a.banker, ...a.legs].includes(h));
      const alt = gaps.length ? `Add **#${gaps.join(', #')}** or expand to Mode B/C` : 'Switch banker';
      const wouldHit = r.bMc6.hit ? '✅ (MC top-6 would hit)' : gaps.length === 1 ? 'Maybe' : '❌';
      return `| R${r.race} | ${a.miss} | ${alt} | ${wouldHit} | +$40–90 |`;
    })
    .join('\n');

  const review = `# Trio Post-Race Review — ${venueLabel} | ${fmtDate}

**Venue:** ${venueLabel} | **Date:** ${fmtDate} | **Races:** ${nRaces} (R1–R${nRaces}) | **Going:** ${going}

**Strategy reports:** \`data/reports/trio_strategy_${date}_${venue}_R1.md\` … **R${nRaces}\`

**Results:** \`data/historical/results_${date}_${venue}.json\`

**Note:** SCMP data was not loaded for this meeting — Strategy A used **raw MC only** (no form/jockey adjustments).

---

## Section 1: Summary

| Metric | Value |
|--------|-------|
| Races played (Strategy A) | **${sa.races} (R1–R${nRaces}${passCount ? `; ${passCount} PASS` : ''})** |
| Hit rate | **${sa.hits}/${sa.races} (${pct(sa.hits, sa.races)}%)** |
| Total staked | **$${sa.staked}** |
| Total returned | **$${sa.returned}** |
| **Net P&L** | **${sa.pnl >= 0 ? '+' : ''}$${sa.pnl}** |
| **ROI** | **${sa.pnl >= 0 ? '+' : ''}${roi(sa.pnl, sa.staked)}%** |
| Session Result | **${sa.pnl >= 0 ? 'WIN' : 'LOSS'}** |

**Strategy B (report tickets, MC#1 + Place% legs):** ${sb.hits}/${nRaces} hits | $${sb.staked} staked | $${sb.returned} returned | **${sb.pnl >= 0 ? '+' : ''}$${sb.pnl}** | ${roi(sb.pnl, sb.staked)}% ROI

**Strategy B benchmark (MC top 6 + MC#1 banker, $100/race):** ${s6.hits}/${nRaces} | $${s6.staked} staked | **${s6.pnl >= 0 ? '+' : ''}$${s6.pnl}** | ${roi(s6.pnl, s6.staked)}% ROI

---

## Section 2: Race-by-Race Cross-Reference

| Race | Class | Mode | Banker(s) | Legs | Result (1→2→3) | Hit? | Trio $ | Return | P&L | Miss Reason |
|------|-------|------|-----------|------|----------------|------|--------|--------|-----|-------------|
${s2Rows}

---

## Section 3: Hits Analysis

${hitsAnalysis || '_No Strategy A hits this meeting._'}

---

## Section 4: Miss Classification

| Pattern | Count (A) | Races |
|---------|-------------|-------|
| **A** — Banker fail, all 3 in legs | ${patA.length} | ${patA.map((r) => `R${r.race}`).join(', ') || '—'} |
| **B** — Banker hit, pool gap | ${patB.length} | ${patB.map((r) => `R${r.race}`).join(', ') || '—'} |
| **C** — Banker fail + pool gap | ${patC.length} | ${patC.map((r) => `R${r.race}`).join(', ') || '—'} |
| **PASS** | ${passCount} | ${passCount ? data.races.filter((r) => (r.a as { pass: boolean }).pass).map((r) => `R${r.race}`).join(', ') : '—'} |

**Strategy B (report) hits:** R${data.races.filter((r) => (r.bReport as { hit: boolean }).hit).map((r) => r.race).join(', R') || '—'}

### Notable misses

${notableMissBullets || '- No standout miss patterns beyond variance.'}

---

## Section 5: What-If Analysis

| Race | Current miss | Alternative | Would Hit? | Cost Change |
|------|--------------|-------------|------------|-------------|
${whatIfRows}

**Fixable (structural):** ${fixableMisses.map((r) => `R${r.race}`).join(', ') || '—'} — expanded pool / MC top-6 would capture **~$${fixableTrio.toLocaleString()}** in missed Trio dividends.

**Unfixable / variance:** ${played.filter((r) => !(r.a as { hit: boolean }).hit && !(r.bMc6 as { hit: boolean }).hit && !(r.bReport as { hit: boolean }).hit).slice(0, 3).map((r) => `R${r.race} (${r.resultStr}, Trio $${r.trio})`).join('; ') || '—'}.

---

## Section 6: Key Moments

- **Best Bet:** ${bestHitLine}
- **Worst Bet:** ${worstBetText}
- **Most Frustrating:** ${frustratingText}
- **Biggest Surprise:** ${surpriseText}
- **Best MC Call:** ${bestMcText}

---

## Section 7: Model Calibration

### 7a. Banker Performance (Strategy A)

| Result | Count | Races |
|--------|-------|-------|
| Banker 1st | ${banker1} | ${b1.join(', ') || '—'} |
| Banker 2nd–3rd | ${banker23} | ${b23.join(', ') || '—'} |
| Banker out of top 3 | ${bankerOut} | ${bout.join(', ') || '—'} |

**Banker strike rate (top 3):** ${banker1 + banker23}/${stakedA} = **${pct(banker1 + banker23, stakedA)}%**  
**Banker win rate:** ${banker1}/${stakedA} = **${pct(banker1, stakedA)}%**

### 7b. Pool Coverage

| Metric | Count |
|--------|-------|
| All 3 placers in pool | ${all3Pool}/${stakedA} |
| Banker hit + pool gap (Pattern B) | ${bankerHitGap}/${stakedA} |
| MC top-6 full coverage hits | ${s6.hits}/${nRaces} |

### 7c. MC–Market Divergence

| Race | MC #1 | MC Win% | Winner | Outcome |
|------|-------|---------|--------|---------|
${data.races
  .map((r) => {
    const mc1 = [...r.mc].sort((a, b) => b.win - a.win)[0]!;
    const won = r.top3[0] === mc1.num;
    return `| R${r.race} | #${mc1.num} | ${mc1.win.toFixed(1)}% | #${r.top3[0]} | ${won ? '✅ MC #1 won' : '❌ Upset'} |`;
  })
  .join('\n')}

**MC #1 win rate:** ${mc1Wins.length}/${nRaces} = **${pct(mc1Wins.length, nRaces)}%**

### 7d. SCMP +Excuses Flag Performance

SCMP not loaded this meeting — no +Excuses flags applied.

### 7e. Divergence Override

No manual override. Strategy A = raw MC (no SCMP/jockey layer).

---

## Section 8: Learnings

**What Worked**
${hitsA.length ? `- **Strategy A hit R${hitsA.map((r) => r.race).join(', R')}** — ${hitsA.length}/${stakedA} staked races (${pct(hitsA.length, stakedA)}%).` : '- No Strategy A hits.'}
- **Strategy B (report)** ${sb.pnl >= sa.pnl ? 'outperformed' : 'underperformed'} A (**${sb.pnl >= 0 ? '+' : ''}$${sb.pnl}** vs **${sa.pnl >= 0 ? '+' : ''}$${sa.pnl}**) with **${sb.hits}** hit(s)${bHits.length ? `: ${bHits.map((r) => `R${r.race}`).join(', ')}` : ''}.
- **Banker top-3 rate** ${pct(banker1 + banker23, stakedA)}% (${banker1 + banker23}/${stakedA}) — frame often correct even when Trio missed.
${passCount ? `- **R${data.races.filter((r) => (r.a as { pass: boolean }).pass).map((r) => r.race).join(', R')} PASS** — avoided wide-open ${passCount > 1 ? 'races' : 'race'} (MC #1 Win% < 20%).` : ''}

**What Didn't Work**
- **Hit rate ${pct(sa.hits, stakedA)}%** on ${stakedA} staked races — **${sa.pnl >= 0 ? '+' : ''}$${sa.pnl}** session P&L.
${patB.length ? `- **Pattern B ×${patB.length}** — banker placed but pool too tight (${patB.map((r) => `R${r.race}`).join(', ')}).` : ''}
${patC.length ? `- **Pattern C ×${patC.length}** — banker and pool both missed (${patC.map((r) => `R${r.race}`).join(', ')}).` : ''}
- **MC #1 won only ${mc1Wins.length}/${nRaces}** races — upset-heavy card.

**Strategy Adjustments**
- [ ] Re-enable SCMP + jockey boost — this meeting ran MC-only (no form/jockey layer).
${patB.some((r) => r.race === 6) ? '- [ ] **R6:** Banker **#8** won — adding **#4** (MC rank 8) would have hit; include MC Place% >15% tails in Mode B.' : ''}
${patB.some((r) => r.race === 3) ? '- [ ] **R3:** Winner **#8** and **#11** ranked 9th/12th in MC — consider market SP floor for leg inclusion.' : ''}
${patC.some((r) => r.race === 7) ? '- [ ] **R7:** MC dominant **#10** (51% Win) ran 4th; winner **#5** was in A pool — review banker vs leg weight on 1800m HV.' : ''}
- [ ] Track B vs A divergence — **${abWinner}** won P&L this session.

---

## Section 9: P&L by Confidence Level

| Confidence | Races | Hits | Staked | Returned | P&L | ROI |
|------------|-------|------|--------|----------|-----|-----|
${Object.entries(confGroups)
  .sort()
  .map(([c, g]) => {
    const pnl = g.returned - g.staked;
    return `| ${c} | ${g.races} | ${g.hits}/${g.races} | $${g.staked} | $${g.returned} | ${pnl >= 0 ? '+' : ''}$${pnl} | ${roi(pnl, g.staked)}% |`;
  })
  .join('\n')}

---

## Section 10: Running Total (Season Cumulative)

### 10a. This Meeting — Strategy A

| Date | Venue | Races staked | Hits | Staked | Returned | P&L | ROI |
|------|-------|--------------|------|--------|----------|-----|-----|
| **${fmtDate}** | **${venue}** | **${stakedA}** (${passCount} PASS) | **${sa.hits}/${stakedA}** | **$${sa.staked}** | **$${sa.returned}** | **${sa.pnl >= 0 ? '+' : ''}$${sa.pnl}** | **${roi(sa.pnl, sa.staked)}%** |

_Full season cumulative tables: see prior reviews in \`data/reviews/trio_review_*.md\` and segment stats in \`data/static/\`._

### 10e. This Meeting — A/B Comparison

| Strategy | Races | Hits | Staked | Returned | P&L | ROI |
|----------|-------|------|--------|----------|-----|-----|
| **A (pipeline)** | ${stakedA} | ${sa.hits}/${stakedA} | $${sa.staked} | $${sa.returned} | ${sa.pnl >= 0 ? '+' : ''}$${sa.pnl} | ${roi(sa.pnl, sa.staked)}% |
| **B (report)** | ${nRaces} | ${sb.hits}/${nRaces} | $${sb.staked} | $${sb.returned} | ${sb.pnl >= 0 ? '+' : ''}$${sb.pnl} | ${roi(sb.pnl, sb.staked)}% |
| **B (MC top-6)** | ${nRaces} | ${s6.hits}/${nRaces} | $${s6.staked} | $${s6.returned} | ${s6.pnl >= 0 ? '+' : ''}$${s6.pnl} | ${roi(s6.pnl, s6.staked)}% |

**Session winner (P&L):** **${abWinner}**

---

## Section 11: A/B Strategy Comparison

### 11b. Race-by-Race A/B Table

| Race | Strat A Pool | Strat A Banker | Strat B Pool (MC top 6) | Strat B Banker | Result | A Hit? | B Hit? | Trio $ | A Return | B Return | A Stake | B Stake | Key Difference |
|------|-------------|----------------|-------------------------|----------------|--------|--------|--------|--------|----------|----------|---------|---------|----------------|
${abRows}

### 11c. A/B Summary

| Metric | Strategy A (Full Pipeline) | Strategy B (MC Top 6) | Delta (B − A) |
|--------|---------------------------|----------------------|---------------|
| Races played | ${sa.races} | ${nRaces} | 0 |
| Hits | ${sa.hits}/${sa.races} (${pct(sa.hits, sa.races)}%) | ${s6.hits}/${nRaces} (${pct(s6.hits, nRaces)}%) | +${s6.hits - sa.hits} |
| Total staked | $${sa.staked} | $${s6.staked} | +$${s6.staked - sa.staked} |
| Total returned | $${sa.returned} | $${s6.returned} | $${s6.returned - sa.returned} |
| **Net P&L** | **${sa.pnl >= 0 ? '+' : ''}$${sa.pnl}** | **${s6.pnl >= 0 ? '+' : ''}$${s6.pnl}** | **${s6.pnl - sa.pnl >= 0 ? '+' : ''}$${s6.pnl - sa.pnl}** |
| **ROI** | ${roi(sa.pnl, sa.staked)}% | ${roi(s6.pnl, s6.staked)}% | — |
| Banker top 3 | ${banker1 + banker23}/${stakedA} | — | — |

### 11d. Where A and B Diverged

${diverged.length ? diverged.map((r) => {
    const a = r.a as { pass: boolean; hit: boolean; pnl: number };
    const b6 = r.bMc6 as { hit: boolean; pnl: number };
    const aRes = a.pass ? 'A PASS' : a.hit ? 'A HIT ✅' : 'A MISS ❌';
    const bRes = b6.hit ? 'B HIT ✅' : 'B MISS ❌';
    const impact = b6.hit && !a.hit ? `B +$${b6.pnl}` : a.hit && !b6.hit ? `A only` : `—`;
    return `| R${r.race} | ${aRes} vs ${bRes} | ${impact} | — |`;
  }).join('\n') : '| — | No divergence | — | — |'}

### 11e. Session Verdict

**${abWinner}** led P&L this session: Strategy A **${sa.hits}/${stakedA}** hits (**${sa.pnl >= 0 ? '+' : ''}$${sa.pnl}**), B report **${sb.hits}/${nRaces}** (**${sb.pnl >= 0 ? '+' : ''}$${sb.pnl}**), MC top-6 **${s6.hits}/${nRaces}** (**${s6.pnl >= 0 ? '+' : ''}$${s6.pnl}**). ${sb.hits > sa.hits ? `B report’s extra hit(s) (${bHits.map((r) => `R${r.race}`).join(', ')}) came from wider leg pools.` : sa.hits >= sb.hits ? 'A matched or beat B on hits despite lower absolute P&L.' : ''} MC #1 won only **${mc1Wins.length}/${nRaces}** races — an upset-heavy ${venueLabel} card. ${passCount ? `**${passCount} PASS** race(s) avoided low-edge wide-open frames.` : ''} SCMP/jockey layer was not applied (raw MC only).

---

*Generated by \`tools/generate-trio-review-markdown.ts\` from \`data/temp/trio_review_data_${date}_${venue}.json\`*
`;

  fs.writeFileSync(path.join(ROOT, 'data/reviews', `trio_review_${date}_${venue}.md`), review);

  // StratC
  const stratBlocks = data.races
    .map((r) => {
      const mc = readReportMcFull(date, venue, r.race);
      const br = r.bReport as { banker: number; legs: number[]; hit: boolean; miss: string };
      const pm = posMap.get(r.race)!;
      const pool = new Set([br.banker, ...br.legs]);
      const legOrder = br.legs;
      const seq = (n: number) => {
        if (n === br.banker) return '★';
        const i = legOrder.indexOf(n);
        return i >= 0 ? `L${i + 1}` : '—';
      };
      const rows = mc
        .map((h) => {
          const fin = pm.get(h.num);
          const inPool = pool.has(h.num) ? '✅' : '❌';
          const role = h.num === br.banker ? 'Banker' : legOrder.includes(h.num) ? 'Leg' : '—';
          return `| ${seq(h.num)} | ${h.num} | ${h.name} | ${h.win}% | ${h.place}% | ${h.sp} | ${inPool} | ${role} | ${fin ? (fin.pos <= 3 ? `**${fin.pos}**` : fin.pos) : '—'} |`;
        })
        .join('\n');
      return `### R${r.race} — ${r.class} ${r.distance}m | Result: ${r.resultStr} | Trio $${r.trio}

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
${rows}

**Pattern analysis:** ${br.miss}. ${br.hit ? '**HIT** — banker in top 3 and full pool coverage.' : br.miss.includes('Pattern A') ? 'All three placers were in the leg pool but MC #1 banker missed the frame — classic Pattern A.' : 'Pool and/or banker failed vs result.'}
`;
    })
    .join('\n');

  const bPatA = data.races.filter((r) => (r.bReport as { miss: string }).miss.includes('Pattern A'));
  const bPatB = data.races.filter((r) => (r.bReport as { miss: string }).miss.includes('Pattern B'));
  const bPatC = data.races.filter((r) => (r.bReport as { miss: string }).miss.includes('Pattern C'));

  const stratC = `# Strategy B Review — MC #1 banker + Place%>20% | ${venueLabel} | ${fmtDate}

## Rules

- **Banker**: MC **#1** by MC Win% (raw).
- **Primary legs**: MC Place% > 20%; Step B swap/add for Win <10.
- **Bet**: Trio 膽拖; **$10**/combo.
- **Reports:** \`data/reports/trio_strategy_${date}_${venue}_R1.md\` … **R${nRaces}\`
- **Results:** \`data/historical/results_${date}_${venue}.json\`

---

## Summary

| Metric | Strategy B (report) | Strategy A (8 staked) |
|--------|---------------------|------------------------|
| Races | **${nRaces}** | **${sa.races}** |
| Hit rate | **${sb.hits}/${nRaces} (${pct(sb.hits, nRaces)}%)** | **${sa.hits}/${sa.races} (${pct(sa.hits, sa.races)}%)** |
| Staked | **$${sb.staked}** | **$${sa.staked}** |
| Returned | **$${sb.returned}** | **$${sa.returned}** |
| **Net P&L** | **${sb.pnl >= 0 ? '+' : ''}$${sb.pnl}** | **${sa.pnl >= 0 ? '+' : ''}$${sa.pnl}** |
| **ROI** | **${roi(sb.pnl, sb.staked)}%** | **${roi(sa.pnl, sa.staked)}%** |

---

## Race-by-Race Results — Strategy B

| Race | Class | Dist | Banker (MC#1) | Final legs | Stake | Result | Banker top 3? | Hit? | Trio $ | Return | P&L |
|------|-------|------|---------------|------------|-------|--------|---------------|------|--------|--------|-----|
${data.races
  .map((r) => {
    const br = r.bReport as { banker: number; legs: number[]; stake: number; hit: boolean; return: number; pnl: number; bankerTop3: boolean };
    const mc1 = r.mc.find((h) => h.num === br.banker);
    return `| R${r.race} | ${r.class} | ${r.distance}m | #${br.banker} | ${br.legs.map((n) => `#${n}`).join(',')} | $${br.stake} | ${r.resultStr} | ${br.bankerTop3 ? '✅' : '❌'} | ${br.hit ? '✅' : '❌'} | $${r.trio} | $${br.return} | ${br.pnl >= 0 ? '+' : ''}$${br.pnl} |`;
  })
  .join('\n')}
| **TOTAL** | | | | | **$${sb.staked}** | | | **${sb.hits}/${nRaces}** | | | **$${sb.returned}** | **${sb.pnl >= 0 ? '+' : ''}$${sb.pnl}** |

---

## Race-by-Race Results — Strategy A

| Race | Mode | Banker | Legs | Stake | Result | Hit? | Trio $ | Return | P&L | Miss reason |
|------|------|--------|------|-------|--------|------|--------|--------|-----|-------------|
${data.races
  .map((r) => {
    const a = r.a as { pass: boolean; mode: string; banker: number; legs: number[]; stake: number; hit: boolean; return: number; pnl: number; miss: string };
    if (a.pass)
      return `| R${r.race} | PASS | #${a.banker} | ${a.legs.map((n) => `#${n}`).join(',')} | $0 | ${r.resultStr} | — | $${r.trio} | $0 | $0 | PASS |`;
    return `| R${r.race} | ${a.mode} | #${a.banker} | ${a.legs.map((n) => `#${n}`).join(',')} | $${a.stake} | ${r.resultStr} | ${a.hit ? '✅' : '❌'} | $${r.trio} | $${a.return} | ${a.pnl >= 0 ? '+' : ''}$${a.pnl} | ${a.miss} |`;
  })
  .join('\n')}

---

## B Miss Pattern Summary

| Pattern | Count | Races |
|---------|-------|-------|
| **A** | ${bPatA.length} | ${bPatA.map((r) => `R${r.race}`).join(', ') || '—'} |
| **B** | ${bPatB.length} | ${bPatB.map((r) => `R${r.race}`).join(', ') || '—'} |
| **C** | ${bPatC.length} | ${bPatC.map((r) => `R${r.race}`).join(', ') || '—'} |

---

## Full MC Place% Table — Per Race

${stratBlocks}

---

## B Banker Performance

| Race | B Banker | MC Win% | SP | Placed? | Finish |
|------|----------|---------|-----|---------|--------|
${data.races
  .map((r) => {
    const br = r.bReport as { banker: number; bankerTop3: boolean };
    const mc1 = readReportMcFull(date, venue, r.race).find((h) => h.num === br.banker);
    const fin = posMap.get(r.race)!.get(br.banker);
    return `| R${r.race} | #${br.banker} | ${mc1?.win ?? '—'}% | ${mc1?.sp ?? '—'} | ${br.bankerTop3 ? '✅' : '❌'} | ${fin?.pos ?? '—'} |`;
  })
  .join('\n')}

**Banker top 3:** ${data.races.filter((r) => (r.bReport as { bankerTop3: boolean }).bankerTop3).length}/${nRaces}
`;

  fs.writeFileSync(path.join(ROOT, 'data/reviews', `trio_review_stratC_${date}_${venue}.md`), stratC);
  console.log('Wrote review + stratC markdown');
}

main();
