/**
 * CLI Tool: Scrape Jockey and Horse Profiles
 *
 * Usage:
 *   npx tsx tools/scrape-profiles.ts --type jockeys [--all]
 *   npx tsx tools/scrape-profiles.ts --type horses --codes "J157,J481,H197"
 *   npx tsx tools/scrape-profiles.ts --type horses --from-results results_20251001_ST.json
 */

import { parseArgs } from "util";
import { JockeyStatsScraper, ELITE_JOCKEYS } from "../src/scrapers/jockeyStats.js";
import { HorseProfileScraper } from "../src/scrapers/horseProfile.js";
import * as fs from "fs/promises";
import * as path from "path";

async function main() {
  const { values } = parseArgs({
    options: {
      type: { type: "string", short: "t" },
      all: { type: "boolean", short: "a", default: false },
      codes: { type: "string", short: "c" },
      "from-results": { type: "string", short: "f" },
      output: { type: "string", short: "o" },
      help: { type: "boolean", short: "h", default: false },
    },
  });

  if (values.help || !values.type) {
    console.log(`
Scrape Jockey and Horse Profiles from HKJC

Usage:
  npx tsx tools/scrape-profiles.ts --type jockeys [--all]
  npx tsx tools/scrape-profiles.ts --type horses --codes "J157,J481"
  npx tsx tools/scrape-profiles.ts --type horses --from-results results_20251001_ST.json

Options:
  -t, --type         Type to scrape: "jockeys" or "horses"
  -a, --all          Scrape all active jockeys (jockeys only)
  -c, --codes        Comma-separated horse/jockey codes
  -f, --from-results Extract horse codes from a results file
  -o, --output       Output filename (default: auto-generated)
  -h, --help         Show this help message
`);
    process.exit(0);
  }

  if (values.type === "jockeys") {
    await scrapeJockeys(values.all || false, values.codes, values.output);
  } else if (values.type === "horses") {
    await scrapeHorses(values.codes, values["from-results"], values.output);
  } else {
    console.error(`Unknown type: ${values.type}`);
    process.exit(1);
  }
}

async function scrapeJockeys(
  all: boolean,
  codes?: string,
  outputFile?: string
): Promise<void> {
  const scraper = new JockeyStatsScraper({ headless: true });

  try {
    console.log("Initializing jockey stats scraper...\n");
    await scraper.init();

    if (all) {
      console.log("Scraping all active jockeys...");
      const profiles = await scraper.scrapeAllJockeys();
      
      const filename = outputFile || `jockeys_all_${formatDate(new Date())}.json`;
      await scraper.saveProfiles(profiles, filename);
      
      console.log(`\nSaved ${profiles.length} jockey profiles to data/jockeys/${filename}`);
    } else if (codes) {
      const codeList = codes.split(",").map(c => c.trim().toUpperCase());
      console.log(`Scraping ${codeList.length} jockeys: ${codeList.join(", ")}`);
      
      const profiles = [];
      for (const code of codeList) {
        try {
          const profile = await scraper.scrapeJockeyProfile(code);
          profiles.push(profile);
          console.log(`  ✓ ${profile.name} (${code}): ${profile.seasonStats.wins}W`);
        } catch (error) {
          console.log(`  ✗ ${code}: Failed - ${error}`);
        }
      }

      const filename = outputFile || `jockeys_${formatDate(new Date())}.json`;
      await scraper.saveProfiles(profiles, filename);
    } else {
      // Default: scrape elite jockeys
      console.log("Scraping elite jockeys...\n");
      
      const profiles = [];
      for (const elite of ELITE_JOCKEYS) {
        try {
          console.log(`Scraping ${elite.name}...`);
          const profile = await scraper.scrapeJockeyProfile(elite.code);
          profiles.push(profile);
          
          console.log(`  Season: ${profile.seasonStats.wins}W / ${profile.seasonStats.rides}R`);
          console.log(`  Win Rate: ${(profile.seasonStats.winRate * 100).toFixed(1)}%`);
          console.log("");
        } catch (error) {
          console.log(`  Failed: ${error}\n`);
        }
      }

      const filename = outputFile || `jockeys_elite_${formatDate(new Date())}.json`;
      await scraper.saveProfiles(profiles, filename);
      
      console.log(`\nSaved ${profiles.length} elite jockey profiles`);
    }

  } finally {
    await scraper.close();
  }
}

async function scrapeHorses(
  codes?: string,
  fromResults?: string,
  outputFile?: string
): Promise<void> {
  const scraper = new HorseProfileScraper({ headless: true });

  try {
    console.log("Initializing horse profile scraper...\n");
    await scraper.init();

    let horseCodes: string[] = [];

    if (codes) {
      horseCodes = codes.split(",").map(c => c.trim().toUpperCase());
    } else if (fromResults) {
      // Load horse codes from results file
      const resultsPath = path.join(process.cwd(), "data", "historical", fromResults);
      const data = await fs.readFile(resultsPath, "utf-8");
      const results = JSON.parse(data);

      // Extract unique horse codes
      const codesSet = new Set<string>();
      
      // Handle both array of results and single meeting
      const races = Array.isArray(results) ? results : results.races || [results];
      
      for (const race of races) {
        if (race.finishOrder) {
          for (const horse of race.finishOrder) {
            if (horse.horseCode) {
              // Use the FULL horse code (e.g., "HK_2023_J157") - HKJC requires this format
              codesSet.add(horse.horseCode);
            }
          }
        }
      }

      horseCodes = Array.from(codesSet);
      console.log(`Found ${horseCodes.length} unique horse codes in ${fromResults}`);
    } else {
      console.error("Please provide --codes or --from-results");
      process.exit(1);
    }

    console.log(`\nScraping ${horseCodes.length} horses...\n`);

    const profiles = [];
    let success = 0;
    let failed = 0;

    for (let i = 0; i < horseCodes.length; i++) {
      const code = horseCodes[i]!;
      try {
        process.stdout.write(`[${i + 1}/${horseCodes.length}] ${code}... `);
        const profile = await scraper.scrapeHorseProfile(code);
        profiles.push(profile);
        success++;
        console.log(`✓ ${profile.name} (Form: ${profile.formFigures})`);
      } catch (error) {
        failed++;
        console.log(`✗ Failed — ${error instanceof Error ? error.message : error}`);
      }
    }

    if (profiles.length > 0) {
      const filename = outputFile || `horses_${formatDate(new Date())}.json`;
      await scraper.saveProfiles(profiles, filename);
      
      console.log(`\n✓ Saved ${profiles.length} horse profiles to data/horses/${filename}`);
    } else {
      console.log(`\n[WARNING] No horse profiles scraped successfully — nothing saved`);
    }

    if (failed > 0) {
      console.log(`[WARNING] ${failed}/${horseCodes.length} horse profiles failed to scrape — output is partial`);
    }
    console.log(`\nSummary: ${success} success, ${failed} failed`);

  } finally {
    await scraper.close();
  }
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0]!.replace(/-/g, "");
}

main().catch(console.error);
