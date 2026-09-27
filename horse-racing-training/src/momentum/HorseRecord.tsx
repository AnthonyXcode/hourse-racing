// Clickable horse name on the Momentum page → the racecard's past-runs modal (same one as the bet page).
// The racecard is fetched on click; the modal renders in a portal and stops clicks/Esc there,
// so a parent row (Summary opens its race) or modal (snapshot) underneath is untouched.
import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { api } from "../api";
import type { CardHorse } from "../../shared/types";
import { cx } from "../kit";
import { HorseFormModal } from "../ui";

/** "2026-09-27-ST-1" → racecard key (date YYYYMMDD). */
const cardKey = (raceId: string) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})-(ST|HV)-(\d+)$/.exec(raceId);
  return m ? { date: `${m[1]}${m[2]}${m[3]}`, venue: m[4]!, raceNo: Number(m[5]) } : null;
};

/** A runner's name as a button that opens its past runs. Plain text when the race id can't be parsed. */
export function HorseLink({ raceId, horseNo, code, name, className }: { raceId: string; horseNo: number; code: string | null | undefined; name: string; className?: string }) {
  const { t } = useTranslation("bet");
  const [horse, setHorse] = useState<CardHorse | null>(null);
  const key = cardKey(raceId);
  if (!key) return <span className={className}>{name}</span>;

  const open = (e: MouseEvent) => {
    e.stopPropagation(); // e.g. a Summary row that opens its race
    // No card (or horse missing from it): the modal still opens, showing "no past runs".
    const fallback: CardHorse = { code: code ?? "", name };
    api
      .race(key.date, key.venue, key.raceNo)
      .then((card) => setHorse(card.entries.find((x) => x.horseNumber === horseNo)?.horse ?? fallback))
      .catch(() => setHorse(fallback));
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        title={t("form.open")}
        className={cx("max-w-full cursor-pointer truncate text-left underline decoration-ink/25 underline-offset-2 hover:decoration-ink", className)}
      >
        {name}
      </button>
      {horse && createPortal(<Isolated onClose={() => setHorse(null)}><HorseFormModal horse={horse} onClose={() => setHorse(null)} /></Isolated>, document.body)}
    </>
  );
}

/** Keeps the modal's clicks and Esc from reaching whatever opened it. */
function Isolated({ onClose, children }: { onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    // capture + stopImmediatePropagation: Esc closes only this modal, not the snapshot modal underneath
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.stopImmediatePropagation();
      onClose();
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [onClose]);
  return <div onClick={(e) => e.stopPropagation()}>{children}</div>;
}
