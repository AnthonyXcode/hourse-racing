// Avatar picker shared by the welcome step and the account page: 72px circle, Change/Upload button,
// optional Remove. A picked photo opens the crop step (AvatarCropper); the cropped square is only staged here
// (local preview) and the caller uploads it on Save / Done.
import { useEffect, useId, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { AVATAR_MAX_BYTES } from "../../shared/validation";
import { btn, cx } from "../kit";
import { Avatar, fieldErr, textBtn } from "./ui";
import { AvatarCropper } from "./AvatarCropper";

/** A newly picked file, a removal, or nothing staged. */
export type StagedAvatar = { file: File } | "remove" | null;

const TYPES = ["image/jpeg", "image/png", "image/webp"];

/** A picked photo can be bigger than the upload limit: only the cropped square (a few hundred KB) is uploaded. */
const PICK_MAX_BYTES = 4 * AVATAR_MAX_BYTES;

/** Client-side check before cropping (the server checks magic bytes and size again on the cropped upload). */
export function avatarProblem(file: File): "avatarType" | "avatarTooLarge" | null {
  if (!TYPES.includes(file.type)) return "avatarType";
  if (file.size > PICK_MAX_BYTES) return "avatarTooLarge";
  return null;
}

export function AvatarField({
  name,
  currentUrl,
  staged,
  onStage,
  error,
  onError,
  disabled,
  showRemove,
}: {
  name: string;
  currentUrl: string | null;
  staged: StagedAvatar;
  onStage: (s: StagedAvatar) => void;
  error: string;
  onError: (msg: string) => void;
  disabled?: boolean;
  showRemove?: boolean;
}) {
  const { t } = useTranslation("account");
  const inputId = useId();
  const preview = useMemo(() => (staged && staged !== "remove" ? URL.createObjectURL(staged.file) : null), [staged]);
  useEffect(() => () => void (preview && URL.revokeObjectURL(preview)), [preview]);
  const shown = staged === "remove" ? null : (preview ?? currentUrl);
  /** The photo just picked, waiting in the crop step. */
  const [picked, setPicked] = useState<File | null>(null);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <Avatar name={name} src={shown} size="size-18" text="text-[26px]" ring alt={t("avatar.alt", { name })} />
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-3">
            <label htmlFor={inputId} className={cx(btn, "hover:bg-sky-50 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-navy-700", disabled && "pointer-events-none opacity-45")}>
              {shown ? t("avatar.change") : t("avatar.upload")}
              <input
                id={inputId}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="sr-only"
                disabled={disabled}
                aria-describedby={`${inputId}-hint${error ? ` ${inputId}-err` : ""}`}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  e.target.value = ""; // allow picking the same file again
                  if (!f) return;
                  const p = avatarProblem(f);
                  if (p) return onError(t(`err.${p}`));
                  onError("");
                  setPicked(f);
                }}
              />
            </label>
            {showRemove && shown && (
              <button type="button" className={textBtn} disabled={disabled} onClick={() => onStage(currentUrl ? "remove" : null)}>
                {t("avatar.remove")}
              </button>
            )}
          </div>
          <p id={`${inputId}-hint`} className="mt-1 text-[13px] text-ink-muted">
            {t("avatar.hint")}
          </p>
        </div>
      </div>
      {error && (
        <p id={`${inputId}-err`} className={fieldErr} role="alert">
          {error}
        </p>
      )}
      {picked && (
        <AvatarCropper
          file={picked}
          onCancel={() => setPicked(null)}
          onDone={(cropped) => {
            setPicked(null);
            onStage({ file: cropped });
          }}
        />
      )}
    </div>
  );
}
