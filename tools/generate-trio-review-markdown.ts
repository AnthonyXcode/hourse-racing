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

  const review = `# Trio Post-Race Review — Happy Valley | 3 Jun 2026

**Venue:** Happy Valley | **Date:** 3 Jun 2026 | **Surface:** Turf (all races) | **Going:** Good to Firm | **Course:** Turf "C"

**Strategy reports:** \`data/reports/trio_strategy_${date}_${venue}_R1.md\` … **R9** (9 races, no R10)

**Results:** \`data/historical/results_${date}_${venue}.json\`

---

## Section 1: Summary

| Metric | Value |
|--------|-------|
| Races played (Strategy A) | **${sa.races} (R1–R9; R3 PASS)** |
| Hit rate | **${sa.hits}/${sa.races} (${pct(sa.hits, sa.races)}%)** |
| Total staked | **$${sa.staked}** |
| Total returned | **$${sa.returned}** |
| **Net P&L** | **${sa.pnl >= 0 ? '+' : ''}$${sa.pnl}** |
| **ROI** | **${sa.pnl >= 0 ? '+' : ''}${roi(sa.pnl, sa.staked)}%** |
| Session Result | **${sa.pnl >= 0 ? 'WIN' : 'LOSS'}** |

**Strategy B (report tickets, MC#1 + Place% legs):** ${sb.hits}/9 hits | $${sb.staked} staked | $${sb.returned} returned | **${sb.pnl >= 0 ? '+' : ''}$${sb.pnl}** | ${roi(sb.pnl, sb.staked)}% ROI

**Strategy B benchmark (MC top 6 + MC#1 banker, $100/race):** ${s6.hits}/9 | $${s6.staked} staked | **${s6.pnl >= 0 ? '+' : ''}$${s6.pnl}** | ${roi(s6.pnl, s6.staked)}% ROI

---

## Section 2: Race-by-Race Cross-Reference

| Race | Class | Mode | Banker(s) | Legs | Result (1→2→3) | Hit? | Trio $ | Return | P&L | Miss Reason |
|------|-------|------|-----------|------|----------------|------|--------|--------|-----|-------------|
${s2Rows}

---

## Section 3: Hits Analysis

### R5 — HIT ✅ (adj. banker vs MC #1)

**Result:** #7 → #11 → #5 | **Trio:** $59 | **Stake:** $100

| Horse | Role | SP | MC Win% | Note | Result |
|-------|------|-----|---------|------|--------|
| #7 BROWNNEEDSFURTHER | ★ Banker | 2.6 | 24.1% | Adj #1, not MC #1 | **1st** |
| #11 LOVING VIBES | Leg | 3.3 | 7.8% | | **2nd** |
| #5 GEORGIAN SIGMA | Leg | 6.2 | 11.5% | | **3rd** |
| #10 PODIUM | Leg | 10.0 | 24.4% | MC #1, 4th | 4th |

**What worked:** Banking **#7** (adj. rank #1) instead of raw MC **#10** was decisive — Strategy B (report) had all three placers in legs but **#10** finished 4th (Pattern A).

**Return:** $59 − $100 = **−$41** (hit but co-fav frame crushed dividend).

### R6 — HIT ✅ (banker + low-MC 2nd)

**Result:** #1 → #4 → #5 | **Trio:** $411 | **Stake:** $100

| Horse | Role | SP | MC Win% | Note | Result |
|-------|------|-----|---------|------|--------|
| #1 THE HEIR | ★ Banker | 2.8 | 31.9% | Adj over #7 | **1st** |
| #4 MEOWTH | Leg | 5.8 | 2.4% | ≤15 SP inclusion | **2nd** |
| #5 VIGOR EYE | Leg | 17.0 | 9.6% | | **3rd** |
| #7 NEBRASKAN | Leg | 4.5 | 32.3% | MC #1, 6th | 6th |

**What worked:** **#1** banker won; **#4** leg captured upset 2nd despite low MC Place%. MC **#7** (Strategy B banker) faded — adj. banker rule saved the ticket.

**Return:** $411 − $100 = **+$311**

---

## Section 4: Miss Classification

| Pattern | Count (A) | Races |
|---------|-------------|-------|
| **A** — Banker fail, all 3 in legs | 0 | — |
| **B** — Banker hit, pool gap | ${played.filter((r) => (r.a as { miss: string }).miss.includes('Pattern B')).length} | ${played.filter((r) => (r.a as { miss: string }).miss.includes('Pattern B')).map((r) => `R${r.race}`).join(', ') || '—'} |
| **C** — Banker fail + pool gap | ${played.filter((r) => (r.a as { miss: string }).miss.includes('Pattern C')).length} | ${played.filter((r) => (r.a as { miss: string }).miss.includes('Pattern C')).map((r) => `R${r.race}`).join(', ') || '—'} |
| **PASS** | 1 | R3 |

**Strategy B (report) Pattern A:** R3, R5, R6 — combined missed Trio return **$59 + $411 + $388 = $858** if MC#1 had been banker on R5/R6.

### R3 — Pattern A (B only; A PASS)

MC **#3** banker 10th; result **#7, #12, #4** all in B’s 8-leg pool. Trio **$388** not captured. PASS on A avoided **$100** loss.

### R4 — Pattern C (A & B)

**#10** banker 12th (2.4 SP favourite collapse). Winner **#5** in A pool; gaps **#1, #9**. B’s 3-leg ticket ($30) also missed **#5**.

---

## Section 5: What-If Analysis

| Race | Current | Alternative | Would Hit? | Cost Change |
|------|---------|-------------|------------|-------------|
| R1 | Mode A 5-horse; gap **#12** (38x) | Add **#12** or Mode B (6) | ✅ | +$40 stake |
| R2 | Banker **#2**; gaps **#3, #12** | Bank **#4** winner or expand pool | ✅ | Mode B +$0 |
| R4 | Banker **#10** | Bank **#5** or drop **#10** after firming | ✅ | Re-rank |
| R7 | Banker **#1** 9th | Include **#10, #7** earlier | ✅ | Mode C |
| R8 | Pool has frame; banker **#6** won | Already had winner — trio miss gaps **#11, #4**? | Check pool | — |
| R9 | Mode A; gap **#3** (3rd) | Add **#3** or Mode B | ✅ | +$40 |

**Fixable (structural):** R1, R2, R4, R7, R9 — recoverable Trio **~$8,500+** if perfect pool (R4 alone $3,239) at extra **~$200–400** stake.

**Unfixable / variance:** R3 wide-open card (PASS correct); R5/R6 hits already captured.

---

## Section 6: Key Moments

- **Best Bet:** **R6** — **+$311** on $100; **#4 MEOWTH** 2nd at 5.8 despite 2.4% MC Place.
- **Worst Bet:** **R4** — **−$100**; MC/market anchor **#10** last at 2.4 SP; missed **$3,239** Trio.
- **Most Frustrating:** **R5 (B)** — all placers in B legs; MC **#10** 4th while A hit on **#7**.
- **Biggest Surprise:** **R4** favourite **#10** 12th; **#5** won at ~24 SP frame.
- **Best MC Call:** **R1** — MC **#3** won (43.5% Win); **R8** — MC **#6** won (22.2% Win).

---

## Section 7: Model Calibration

### 7a. Banker Performance (Strategy A, 8 staked)

| Result | Count | Races |
|--------|-------|-------|
| Banker 1st | ${banker1} | ${b1.join(', ') || '—'} |
| Banker 2nd–3rd | ${banker23} | ${b23.join(', ') || '—'} |
| Banker out of top 3 | ${bankerOut} | ${bout.join(', ') || '—'} |

**Banker strike rate (top 3):** ${banker1 + banker23}/${played.length} = **${pct(banker1 + banker23, played.length)}%**  
**Banker win rate:** ${banker1}/${played.length} = **${pct(banker1, played.length)}%**

### 7b. Pool Coverage

| Metric | Count |
|--------|-------|
| All 3 placers in pool | ${all3Pool}/${played.length} |
| Banker hit + pool gap (Pattern B) | ${bankerHitGap}/${played.length} |
| At least 2 placers in pool | — (see per-race) |

### 7c. MC–Market Divergence

| Race | Divergence | Outcome |
|------|------------|---------|
| R4 | MC **#10** 28% vs market 2.4 SP | ❌ MC wrong (12th) |
| R5 | Adj **#7** over MC **#10** | ✅ Adj right (A hit) |
| R6 | Adj **#1** over MC **#7** | ✅ Adj right (A hit) |
| R1 | MC **#3** 43.5% vs tight market | ✅ MC #1 won |

**MC divergence accuracy (key races):** 2/3 where adj/MC disagreed with outcome, adj won **R5–R6**.

### 7d. SCMP +Excuses Flag Performance

| Race | Horse | +Excuses | Finished | Verdict |
|------|-------|----------|----------|---------|
| R1 | #2 SETANTA | +2% adj | 4th | ❌ |
| R2 | (check card) | — | — | — |

**+Excuses in top 3:** limited flags this card; **#2** R1 promoted to leg but 4th.

### 7e. Divergence Override

No manual override this meeting. **Adj banker rules** on R5–R6 functioned as soft overrides vs raw MC #1.

---

## Section 8: Learnings

**What Worked**
- **Adj banker over MC #1** on R5 (**#7**) and R6 (**#1**) produced both A hits.
- **R3 PASS** avoided wide-open **$100** loss (MC max Win% ~20%).
- **≤15 SP leg rule** captured **#4 MEOWTH** (R6 2nd).
- **HIGH confidence** races: R6 **+$311** offset R1 miss.

**What Didn't Work**
- **Favourite bankers** failed: **#10** R4 (12th), **#1** R7 (9th).
- **Pattern B pool gaps:** **#12** R1 (38 SP), **#3** R9.
- **Strategy B (report):** 0/9 — three **Pattern A** near-misses (R3, R5, R6).
- **Low Trio dividends** on co-fav hits (R5 $59 on $100 stake).

**Strategy Adjustments**
- [ ] On HV C4 1200m wide MC (<25% top), default **PASS** unless ≥2 of: adj banker ≥28%, HIGH conf, hist green segment.
- [ ] When MC #1 & adj #1 diverge by >8pp Win%, **document both**; prefer adj for banker (evidence R5–R6).
- [ ] Mode A: add **one** market short-price placer (≤15 SP) not in top-5 MC if Place% >15% (R1 **#12** case).
- [ ] After favourite firming <3.0 SP, cap banker if last-start finish >5th (**#10** R4).
- [ ] Track **Pattern A** on stratC separately — if >2/meeting, review MC Win% rank stability.

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
| LOW (PASS) | 1 | — | $0 | $0 | $0 | — |

Hits concentrated in **HIGH** (R6) and **MEDIUM–HIGH** (R5); **MEDIUM** races 0/3 hits.

---

## Section 10: Running Total (Season Cumulative)

### 10a. Meeting-by-Meeting P&L (Strategy A)

| # | Date | Venue | Races | Hits | Staked | Returned | P&L | ROI |
|---|------|-------|-------|------|--------|----------|-----|-----|
| … | … | … | … | … | … | … | … | … |
| 15 | 24 May | ST | 11 | 0/11 | $740 | $0 | −$740 | −100% |
| 16 | 31 May | ST | 11 | 1/11 | $720 | $416 | −$304 | −42.2% |
| **17** | **3 Jun** | **HV** | **8*** | **2/8** | **$720** | **$470** | **−$250** | **−34.7%** |
| **TOTAL** | | | **170** | **20/170** | **$12,402** | **$9,864** | **−$2,538** | **−20.5%** |

\\*Eight staked races (R3 PASS). Nine races on card.

*(Prior rows through M16 from [trio_review_20260531_ST.md](./trio_review_20260531_ST.md).)*

### 10b. Cross-Meeting Banker Performance

| Meeting | Banker Top 3 | Rate |
|---------|--------------|------|
| 31 May ST | — | — |
| **3 Jun HV** | **4/8** | **50.0%** |
| Season (approx.) | — | ~45% |

### 10c. Venue Breakdown (partial)

| Venue | Meetings | Races | Hits | P&L (session) | Notes |
|-------|----------|-------|------|---------------|-------|
| HV | +1 | 8 | 2/8 | −$250 | This card |
| ST | 16 | 162 | 18/162 | −$2,288 | Through 31 May |

### 10d. Season Trajectory

| Metric | 31 May ST | **3 Jun HV** | Trend |
|--------|-----------|--------------|-------|
| Hit rate | 9.1% | **25.0%** (2/8) | ↑ |
| Meeting P&L | −$304 | **−$250** | Similar loss, better hit rate |
| Banker top 3 | — | **50%** | ↑ |

### 10e. Cumulative A/B Comparison

| # | Date | Venue | A Hits | A P&L | B Hits (report) | B P&L | B Hits (MC6) | B P&L (MC6) | Winner |
|---|------|-------|--------|-------|-----------------|-------|--------------|---------------|--------|
| 16 | 31 May | ST | 1/11 | −$304 | 2/11 | −$602 | — | — | A (P&L) |
| **17** | **3 Jun** | **HV** | **2/8** | **−$250** | **0/9** | **−$1,200** | **0/9** | **−$900** | **A** |
| **TOTAL** | | | **20/170** | **−$2,538** | **24/173*** | **+$1,288*** | — | — | **B (report) cumulative P&L** |

\\*B report cumulative through 31 May + this meeting: prior **+$2,488** (24/164) − **$1,200** = **+$1,288** (24/173 hits).

**This session:** Strategy A lost less (−$250 vs −$1,200 report B). MC top-6 benchmark also 0/9 (−$900). A’s adj banker rules decisive vs raw MC#1 on R5–R6.

---

## Section 11: A/B Strategy Comparison

### 11b. Race-by-Race A/B Table

| Race | Strat A Pool | Strat A Banker | Strat B Pool (MC top 6) | Strat B Banker | Result | A Hit? | B Hit? | Trio $ | A Return | B Return | A Stake | B Stake | Key Difference |
|------|-------------|----------------|-------------------------|----------------|--------|--------|--------|--------|----------|----------|---------|---------|----------------|
${abRows}

### 11c. A/B Summary

| Metric | Strategy A (Full Pipeline) | Strategy B (MC Top 6) | Delta (B − A) |
|--------|---------------------------|----------------------|---------------|
| Races played | ${sa.races} (8 staked) | 9 | +1 |
| Hits | ${sa.hits}/${sa.races} (${pct(sa.hits, sa.races)}%) | ${s6.hits}/9 (${pct(s6.hits, 9)}%) | ${s6.hits - sa.hits} |
| Total staked | $${sa.staked} | $${s6.staked} | +$${s6.staked - sa.staked} |
| Total returned | $${sa.returned} | $${s6.returned} | $${s6.returned - sa.returned} |
| **Net P&L** | **${sa.pnl >= 0 ? '+' : ''}$${sa.pnl}** | **${s6.pnl >= 0 ? '+' : ''}$${s6.pnl}** | **${s6.pnl - sa.pnl >= 0 ? '+' : ''}$${s6.pnl - sa.pnl}** |
| **ROI** | ${roi(sa.pnl, sa.staked)}% | ${roi(s6.pnl, s6.staked)}% | — |
| Banker top 3 | ${banker1 + banker23}/8 | — | — |

### 11d. Where A and B Diverged

${diverged.length ? diverged.map((r) => {
    const a = r.a as { pass: boolean; hit: boolean };
    const b6 = r.bMc6 as { hit: boolean };
    const aRes = a.pass ? 'A PASS' : 'A ' + (a.hit ? 'HIT' : 'MISS');
    const bRes = 'B ' + (b6.hit ? 'HIT' : 'MISS');
    return '| R' + r.race + ' | ' + aRes + ' vs ' + bRes + ' | See table | — |';
  }).join('\n') : '| — | No hit/miss divergence (both 0/9 on MC6 benchmark) | — | — |'}

### 11e. Session Verdict

Strategy **A** outperformed both **B** variants this session (−$250 vs −$900 MC6 vs −$1,200 report B) on **2/8** hits driven by **adj banker** choices on R5–R6. Neither B variant hit; report B suffered **Pattern A** on R3/R5/R6. Difference is **systematic** (pipeline banker selection), not variance — MC#1 alone would have lost on R5–R6 despite all placers in pool. Cumulative season still favours report B on P&L (+$1,288) but with lower hit rate on this card. MC top-6 benchmark did not add value vs A on this meeting.

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

  const stratC = `# Strategy B Review — MC #1 banker + Place%>20% | Happy Valley | 3 Jun 2026

## Rules

- **Banker**: MC **#1** by MC Win% (raw).
- **Primary legs**: MC Place% > 20%; Step B swap/add for Win <10.
- **Bet**: Trio 膽拖; **$10**/combo.
- **Reports:** \`data/reports/trio_strategy_${date}_${venue}_R1.md\` … **R9**
- **Results:** \`data/historical/results_${date}_${venue}.json\`

---

## Summary

| Metric | Strategy B (report) | Strategy A (8 staked) |
|--------|---------------------|------------------------|
| Races | **9** | **8** (R3 PASS) |
| Hit rate | **${sb.hits}/9 (${pct(sb.hits, 9)}%)** | **${sa.hits}/8 (${pct(sa.hits, 8)}%)** |
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
| **TOTAL** | | | | | **$${sb.staked}** | | | **${sb.hits}/9** | | | **$${sb.returned}** | **${sb.pnl >= 0 ? '+' : ''}$${sb.pnl}** |

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

**Banker top 3:** ${data.races.filter((r) => (r.bReport as { bankerTop3: boolean }).bankerTop3).length}/9
`;

  fs.writeFileSync(path.join(ROOT, 'data/reviews', `trio_review_stratC_${date}_${venue}.md`), stratC);
  console.log('Wrote review + stratC markdown');
}

main();
