// Credit plans: the only place prices live. The client sends a plan id; the server sets the amount
// (docs/credits/PRD.md §5.1). Ids per the lead's decision: hk10 / hk100 / hk300.

export interface Plan {
  id: "hk10" | "hk100" | "hk300";
  priceHkd: number;
  credits: number;
  /** Extra credits vs the base rate (10 credits per HK$1), in percent; 0 for the base plan. */
  bonusPct: number;
  badge: "popular" | "best" | null;
}

export const PLANS: readonly Plan[] = [
  { id: "hk10", priceHkd: 10, credits: 100, bonusPct: 0, badge: null },
  { id: "hk100", priceHkd: 100, credits: 1200, bonusPct: 20, badge: "popular" },
  { id: "hk300", priceHkd: 300, credits: 4000, bonusPct: 33, badge: "best" },
];

export const planById = (id: unknown): Plan | null => PLANS.find((p) => p.id === id) ?? null;
