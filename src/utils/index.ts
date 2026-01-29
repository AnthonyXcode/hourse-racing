/**
 * Utility functions for the horse racing analysis system
 */

/**
 * Convert decimal odds to implied probability
 * @param odds - Decimal odds (e.g., 3.5 means 3.5:1)
 * @returns Implied probability as a decimal (0-1)
 */
export function oddsToProb(odds: number): number {
  if (odds <= 1) return 1;
  return 1 / odds;
}

/**
 * Convert probability to decimal odds
 * @param prob - Probability as a decimal (0-1)
 * @returns Decimal odds
 */
export function probToOdds(prob: number): number {
  if (prob <= 0) return Infinity;
  if (prob >= 1) return 1;
  return 1 / prob;
}

/**
 * Calculate edge percentage
 * @param modelProb - Your estimated probability
 * @param marketProb - Market implied probability
 * @returns Edge as percentage
 */
export function calculateEdge(modelProb: number, marketProb: number): number {
  if (marketProb === 0) return 0;
  return ((modelProb - marketProb) / marketProb) * 100;
}

/**
 * Parse HKJC form string into array of positions
 * @param form - Form string like "1-2-4-3-1-2"
 * @returns Array of finish positions (most recent first)
 */
export function parseFormString(form: string): number[] {
  return form
    .split("-")
    .map((pos) => {
      const num = parseInt(pos, 10);
      return isNaN(num) ? 0 : num;
    })
    .filter((pos) => pos > 0);
}

/**
 * Calculate weighted recent form score
 * @param positions - Array of recent finish positions
 * @param fieldSizes - Array of field sizes for each race
 * @returns Weighted form score (higher is better)
 */
export function calculateFormScore(
  positions: number[],
  fieldSizes: number[] = []
): number {
  if (positions.length === 0) return 0;

  // Weights: most recent races weighted more heavily
  const weights = [1.0, 0.85, 0.7, 0.55, 0.4, 0.25];
  let totalWeight = 0;
  let weightedScore = 0;

  for (let i = 0; i < Math.min(positions.length, 6); i++) {
    const position = positions[i]!;
    const fieldSize = fieldSizes[i] ?? 14; // Default field size
    const weight = weights[i]!;

    // Score: (fieldSize - position + 1) / fieldSize
    // Winning gives ~1.0, last place gives ~0.07
    const score = (fieldSize - position + 1) / fieldSize;
    weightedScore += score * weight;
    totalWeight += weight;
  }

  return totalWeight > 0 ? weightedScore / totalWeight : 0;
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number, currency = "HKD"): string {
  return new Intl.NumberFormat("en-HK", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format percentage for display
 */
export function formatPercent(value: number, decimals = 1): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Sleep utility for rate limiting
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generate a random number with normal distribution
 * Using Box-Muller transform
 */
export function randomNormal(mean = 0, stdDev = 1): number {
  const u1 = Math.random();
  const u2 = Math.random();
  const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return z0 * stdDev + mean;
}

/**
 * Clamp a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
