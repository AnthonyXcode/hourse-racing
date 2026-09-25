// Fixed racing terms that arrive as English data values (class, going, surface, venue, bet type).
// Unknown values fall back to the raw English so new HKJC wording never shows a raw key.
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { BetTypeId } from "../../shared/types";
import { common } from "./locales/en/common";

type Group = "venue" | "class" | "going" | "surface";

export function useGlossary() {
  const { t, i18n } = useTranslation();
  return useMemo(() => {
    const term = (group: Group, value: string | null | undefined) =>
      value && value in common[group] ? t(`${group}.${value}` as `${Group}.${string}` as never) : (value ?? "");
    return {
      venue: (v: string | null | undefined) => term("venue", v),
      raceClass: (v: string | null | undefined) => term("class", v),
      going: (v: string | null | undefined) => term("going", v),
      surface: (v: string | null | undefined) => term("surface", v),
      betType: (id: BetTypeId) => t(`betType.${id}`),
    };
    // i18n.language: re-create on switch so memoised consumers update
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, i18n.language]);
}
