// Momentum page: the cut-off (minutes from post) the suggestions are computed at. Picks only see the odds
// recorded up to then, so a finished race shows what you could have acted on. Remembered per browser.
import { createContext, useContext, useEffect, useState } from "react";
import type { TFunction } from "i18next";
import { DEFAULT_CUTOFF, isCutoff, type Cutoff } from "../../shared/momentum/model";

export const CUTOFF_KEY = "momentum.cutoff";

export const CutoffContext = createContext<Cutoff>(DEFAULT_CUTOFF);
export const useCutoff = () => useContext(CutoffContext);

/** "1 min before post" / "3 min after post" */
export const cutoffLabel = (t: TFunction<["momentum", "common"]>, m: number) => (m < 0 ? t("cutoff.before", { n: -m }) : t("cutoff.after", { n: m }));

export function useStoredCutoff() {
  const [cutoff, setCutoff] = useState<Cutoff>(() => {
    // A shared link's ?cutoff= wins over this browser's remembered choice.
    const fromUrl = new URLSearchParams(window.location.search).get("cutoff");
    if (fromUrl != null && isCutoff(Number(fromUrl))) return Number(fromUrl) as Cutoff;
    try {
      const v = Number(localStorage.getItem(CUTOFF_KEY));
      return isCutoff(v) ? v : DEFAULT_CUTOFF;
    } catch {
      return DEFAULT_CUTOFF;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(CUTOFF_KEY, String(cutoff));
    } catch {
      // storage blocked: keep it for this visit only
    }
  }, [cutoff]);
  return [cutoff, setCutoff] as const;
}
