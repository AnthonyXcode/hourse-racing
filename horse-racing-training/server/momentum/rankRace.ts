// Child-process entry: prints the analyzer ranking for one race as JSON.
// Must run with cwd = the parent repo — its engine finds data/ via process.cwd().
//   tsx server/momentum/rankRace.ts <YYYY-MM-DD> <ST|HV> <raceNo>
import path from "path";
import { fileURLToPath } from "url";

const [date, venue, raceNo] = process.argv.slice(2);
const src = fileURLToPath(new URL("../../../src/", import.meta.url));
// Computed path: the parent src/ doesn't pass this package's tsconfig.
const { runRaceAnalysis } = await import(/* @vite-ignore */ path.join(src, "pipeline/raceAnalysis.ts"));

const result = await runRaceAnalysis({
  date: new Date(`${date}T00:00:00`),
  venue: venue === "HV" ? "Happy Valley" : "Sha Tin",
  raceNumber: Number(raceNo),
  formData: "all",
  useSaved: true,
});
type Sim = { horseNumber: number; horseName: string; winProbability: number; placeProbability: number };
const ranks = (result.rankings as { simulation: Sim }[]).map(({ simulation: s }) => ({
  horseNo: s.horseNumber,
  name: s.horseName,
  winProb: s.winProbability,
  placeProb: s.placeProbability,
}));
// The engine may log to stdout; the marker line is what the parent reads.
console.log(`__RANKS__${JSON.stringify(ranks)}`);
