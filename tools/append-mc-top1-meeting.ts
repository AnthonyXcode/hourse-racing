/** Append one meeting block to mc_top1_place_allup_summary.md */
import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const date = process.argv.find((a) => a.startsWith("--date="))?.split("=")[1]?.replace(/-/g, "") ?? "20260607";
const venue = process.argv.find((a) => a.startsWith("--venue="))?.split("=")[1] ?? "ST";

const data = JSON.parse(
  fs.readFileSync(path.join(ROOT, "data/temp", `trio_review_data_${date}_${venue}.json`), "utf8"),
);
const results = JSON.parse(
  fs.readFileSync(path.join(ROOT, "data/historical", `results_${date}_${venue}.json`), "utf8"),
);

const venueLabel = venue === "ST" ? "Sha Tin" : "Happy Valley";
const fmtDate = `${date.slice(6, 8)} ${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][+date.slice(4,6)-1]} ${date.slice(0,4)}`;
const n = data.races.length;

let avgW = 0,
  avgP = 0,
  placed = 0,
  pattern = "";
const rows: string[] = [];

for (const race of data.races) {
  const mc1 = [...race.mc].sort((a: { win: number }, b: { win: number }) => b.win - a.win)[0];
  avgW += mc1.win;
  avgP += mc1.place;
  const res = results.find((x: { raceNumber: number }) => x.raceNumber === race.race);
  const fo = res.finishOrder.find((h: { horseNumber: number }) => h.horseNumber === mc1.num);
  const ok = fo && fo.finishPosition <= 3;
  if (ok) placed++;
  pattern += ok ? "✅" : "❌";
  const top3 = res.finishOrder
    .filter((h: { finishPosition: number }) => h.finishPosition <= 3)
    .sort((a: { finishPosition: number }, b: { finishPosition: number }) => a.finishPosition - b.finishPosition);
  const idx = top3.findIndex((h: { horseNumber: number }) => h.horseNumber === mc1.num);
  const pd = idx >= 0 && res.placeDividends ? res.placeDividends[idx] / 10 : 0;
  const posStr = ok
    ? `✅ ${fo.finishPosition === 1 ? "1st" : fo.finishPosition === 2 ? "2nd" : "3rd"}`
    : `❌ (${fo?.finishPosition ?? "?"}th)`;
  rows.push(
    `| R${race.race} | ${race.class} | ${race.distance} | #${mc1.num} ${fo?.horseName ?? ""} | ${mc1.win.toFixed(1)}% | ${mc1.place.toFixed(1)}% | ${posStr} | ${pd || "—"} |`,
  );
}

const summaryPath = path.join(ROOT, "data/test_reports/mc_top1_place_allup_summary.md");
const meetingNum = (fs.readFileSync(summaryPath, "utf8").match(/## Meeting (\d+):/g) ?? []).length + 1;

const block = `
## Meeting ${meetingNum}: ${venueLabel} | ${fmtDate} (${n} races)

**MC #1** = raw MC Win% from trio_strategy_${date}_${venue}_R*.md (10,000 iterations, form=all). **Results** from data/historical/results_${date}_${venue}.json.

| Race | Class | Dist (m) | MC #1 | MC Win% | MC Place% | Placed? | Place $ (if placed) |
|------|-------|----------|-------|---------|-----------|---------|---------------------|
${rows.join("\n")}

**Placed:** ${placed}/${n} (${((placed / n) * 100).toFixed(1)}%) | **Pattern:** ${pattern} | **Max streak:** 4 (R1–R4)

**Trio card note (R1–R${n}):** Strategy A **${data.summary.a.hits}/${n}** (${data.summary.a.pnl >= 0 ? "+" : ""}$${data.summary.a.pnl}); Strategy B (report) **${data.summary.bReport.hits}/${n}** (${data.summary.bReport.pnl >= 0 ? "+" : ""}$${data.summary.bReport.pnl}); MC top-6 **${data.summary.bMc6.hits}/${n}** (${data.summary.bMc6.pnl >= 0 ? "+" : ""}$${data.summary.bMc6.pnl}). R5 Trio **$9,563** upset.
`;

if (!fs.readFileSync(summaryPath, "utf8").includes(`results_${date}_${venue}.json`)) {
  fs.appendFileSync(summaryPath, block);
  let md = fs.readFileSync(summaryPath, "utf8");
  const newRow = `| **${meetingNum}** | **${fmtDate.split(" ").slice(0, 2).join(" ")}** | **${venue}** | **Mixed** | **Yielding** | **${n}** | **${(avgW / n).toFixed(1)}%** | **${(avgP / n).toFixed(1)}%** | **${placed}/${n}** | **${((placed / n) * 100).toFixed(1)}%** | **${pattern}** | **4 (R1–R4)** |`;
  if (!md.includes(`**${meetingNum}** | **7 Jun**`)) {
    md = md.replace(
      '| **23** | **3 Jun** | **HV** | **Turf "C"** | **Good to Firm** | **9** | **31.5%** | **64.8%** | **2/9** | **22.2%** | **✅❌❌❌❌❌❌✅❌** | **1** |',
      '| **23** | **3 Jun** | **HV** | **Turf "C"** | **Good to Firm** | **9** | **31.5%** | **64.8%** | **2/9** | **22.2%** | **✅❌❌❌❌❌❌✅❌** | **1** |\n' + newRow,
    );
    fs.writeFileSync(summaryPath, md);
  }
  console.log("Appended meeting", meetingNum);
} else {
  console.log("Meeting already appended");
}
