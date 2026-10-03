// Header credits chip (docs/credits/DESIGN-SPEC.md §2): members only, hidden while live betting is off.
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFmt } from "../i18n/useLanguage";
import { creditChip } from "../kit";
import { useAuth } from "../members/auth";
import { useCredits } from "./CreditsProvider";
import { Coin } from "./dialogs";

/** 1,250 → "1,250"; ≥ 100,000 → compact ("12.5萬" / "125K"). */
export function useCompactCredits() {
  const fmt = useFmt();
  return (n: number) => (n >= 100_000 ? new Intl.NumberFormat(fmt.locale, { notation: "compact", maximumFractionDigits: 1 }).format(n) : fmt.num(n));
}

export function CreditChip({ onOpen }: { onOpen: () => void }) {
  const { t } = useTranslation("credits");
  const fmt = useFmt();
  const compact = useCompactCredits();
  const { user } = useAuth();
  const { summary, balance, liveBetting } = useCredits();
  // Announce balance changes (not the first load).
  const [said, setSaid] = useState("");
  const prev = useRef<number | null>(null);
  useEffect(() => {
    if (balance != null && prev.current != null && balance !== prev.current) setSaid(t("chip.changed", { n: fmt.num(balance) }));
    prev.current = balance;
  }, [balance]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user || !liveBetting) return null;
  if (summary === undefined) return <span aria-hidden="true" className="h-7 w-16 flex-none rounded-full bg-white/20" />;
  return (
    <>
      <button type="button" className={creditChip} aria-label={t("chip.aria", { n: balance == null ? "—" : fmt.num(balance) })} onClick={onOpen}>
        <Coin />
        <span key={balance ?? -1} className="motion-safe:animate-[fade-in_150ms_ease-out]">
          {balance == null ? "—" : compact(balance)}
        </span>
        <span className="hidden lg:inline">{t("unitWord")}</span>
      </button>
      <span className="sr-only" aria-live="polite">
        {said}
      </span>
    </>
  );
}
