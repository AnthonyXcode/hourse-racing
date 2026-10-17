// All Up formula picker, shown inside the stake calculator (docs/all-up/DESIGN-SPEC.md §4.1): formula pills with
// their live line counts, the groups the formula bets, and the cost equation.
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import type { AllUpFormula } from "../../shared/types";
import { cx, formulaPill, pillRow } from "../kit";
import { useFmt } from "../i18n/useLanguage";
import { formulaParts } from "./model";

/** value, but only after it has stopped changing for `ms` (so ticking doesn't flood screen readers). */
function useDebounced<T>(value: T, ms: number): T {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), ms);
    return () => clearTimeout(id);
  }, [value, ms]);
  return v;
}

export function AllUpFormulaPicker({
  legs,
  options,
  value,
  onChange,
  unit,
  live,
}: {
  /** Number of legs chosen. */
  legs: number;
  /** Formulas for this leg count with their line counts (null while a leg has no combination). */
  options: { formula: AllUpFormula; lines: number | null }[];
  value: AllUpFormula | null;
  onChange: (f: AllUpFormula) => void;
  unit: number;
  /** LIVE: amounts in credits. */
  live: boolean;
}) {
  const { t } = useTranslation(["bet", "credits"]);
  const fmt = useFmt();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = options.find((o) => o.formula === value);
  const lines = current?.lines ?? null;
  const equation =
    lines == null
      ? ""
      : live
        ? t("credits:allUp.equation", { lines: fmt.num(lines), unit: fmt.num(unit), total: fmt.num(lines * unit) })
        : t("allUp.equation", { lines: fmt.num(lines), unit: fmt.money(unit), total: fmt.money(lines * unit) });
  const spoken = useDebounced(equation, 300);

  if (legs < 2) return <p className="mb-3 text-[13px] text-ink-muted">{t("allUp.needLegs")}</p>;

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const n = (i + step + options.length) % options.length;
    refs.current[n]?.focus();
    onChange(options[n]!.formula);
  };

  return (
    <div className="mb-3">
      <div id="au-formula-label" className="mb-2 text-[13px] text-ink">
        {t("allUp.formula")}
      </div>
      <div role="radiogroup" aria-labelledby="au-formula-label" className={pillRow}>
        {options.map((o, i) => (
          <button
            key={o.formula}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={o.formula === value}
            aria-label={o.lines == null ? o.formula : t("allUp.formulaAria", { f: o.formula, count: o.lines })}
            tabIndex={o.formula === value ? 0 : -1}
            className={formulaPill(o.formula === value)}
            onClick={() => onChange(o.formula)}
            onKeyDown={(e) => onKey(e, i)}
          >
            <span className="text-[15px] leading-tight font-medium tabular-nums">{o.formula}</span>
            <span className="text-[11px] leading-tight tabular-nums opacity-80">{o.lines == null ? "—" : t("allUp.linesShort", { count: o.lines })}</span>
          </button>
        ))}
      </div>
      {value && (
        <p className="mt-2 text-[13px] text-ink-muted">
          {value} = {formulaParts(value).map((p) => t(`allUp.formulaPart.${p.size}` as "allUp.formulaPart.1", { count: p.count })).join(" + ")}
        </p>
      )}
      {equation && <p className={cx("mt-1 text-[15px] text-navy-900 tabular-nums")}>{equation}</p>}
      <span className="sr-only" aria-live="polite">
        {spoken}
      </span>
    </div>
  );
}
