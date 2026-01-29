/**
 * HK Horse Racing AI - Main Entry Point
 *
 * This module exports all the core functionality for horse racing analysis.
 */

// Types
export * from "./types/index.js";

// Scrapers
export * from "./scrapers/raceCard.js";
export * from "./scrapers/historical.js";

// Analysis
export * from "./analysis/speedRating.js";
export * from "./analysis/formAnalysis.js";

// Simulation
export * from "./simulation/monteCarlo.js";

// Betting
export * from "./betting/valueCalculator.js";
export * from "./betting/recommendations.js";

// Utils
export * from "./utils/index.js";
