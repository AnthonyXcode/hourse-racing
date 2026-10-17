// All Up: the edited leg's pool, a 5-way segmented radio group (docs/all-up/DESIGN-SPEC.md §2, §3.4, §8).
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { ALL_UP_POOLS } from "../../shared/betEngine/allUp";
import type { AllUpPool } from "../../shared/types";
import { allUpPoolBtn, allUpPoolSeg } from "../kit";

export function AllUpPoolPicker({
  value,
  onChange,
  trioDisabled,
  label,
  reasonId,
}: {
  value: AllUpPool;
  onChange: (p: AllUpPool) => void;
  /** 4+ legs: TRI can't be picked (stays focusable so its reason can be read). */
  trioDisabled: boolean;
  /** Accessible name of the group (bet:allUp.legPool). */
  label: string;
  /** id of the element that explains why TRI is disabled. */
  reasonId: string;
}) {
  const { t } = useTranslation("bet");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const off = (p: AllUpPool) => p === "trio" && trioDisabled;
  const pick = (p: AllUpPool) => !off(p) && p !== value && onChange(p);
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const n = (i + step + ALL_UP_POOLS.length) % ALL_UP_POOLS.length;
    refs.current[n]?.focus();
    pick(ALL_UP_POOLS[n]!);
  };
  return (
    <div role="radiogroup" aria-label={label} className={allUpPoolSeg}>
      {ALL_UP_POOLS.map((p, i) => (
        <button
          key={p}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="button"
          role="radio"
          aria-checked={value === p}
          aria-disabled={off(p) || undefined}
          aria-describedby={off(p) ? reasonId : undefined}
          title={off(p) ? t("allUp.trioCapPool") : undefined}
          tabIndex={value === p ? 0 : -1}
          className={allUpPoolBtn(value === p)}
          onClick={() => pick(p)}
          onKeyDown={(e) => onKey(e, i)}
        >
          {t(`allUp.poolShort.${p}`)}
        </button>
      ))}
    </div>
  );
}
