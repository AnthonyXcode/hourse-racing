// Crop step after picking a profile photo: drag to move, pinch / scroll / slider to zoom, inside a round mask.
// The chosen square is cut in the browser to a CROP_PX JPEG and staged in place of the original file; the server
// still checks and re-encodes it (256px WebP), so this only decides which part of the photo is kept.
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import Cropper, { type Area, type Point } from "react-easy-crop";
import { btn, btnPrimary, modalBgTop, modalNarrow } from "../kit";
import { Spinner, useDialog } from "./ui";

const CROP_PX = 512;
const MAX_ZOOM = 4;

/** Cut `area` (natural-size pixels) out of the image into a CROP_PX square JPEG. */
async function cropToFile(src: string, area: Area, name: string): Promise<File> {
  const img = new Image();
  img.src = src;
  await img.decode();
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = CROP_PX;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#ffffff"; // a transparent PNG would otherwise turn black in the JPEG
  ctx.fillRect(0, 0, CROP_PX, CROP_PX);
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, area.x, area.y, area.width, area.height, 0, 0, CROP_PX, CROP_PX);
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.92));
  if (!blob) throw new Error("crop failed");
  return new File([blob], name.replace(/\.\w+$/, "") + ".jpg", { type: "image/jpeg" });
}

export function AvatarCropper({ file, onCancel, onDone }: { file: File; onCancel: () => void; onDone: (cropped: File) => void }) {
  const { t } = useTranslation("account");
  const src = useMemo(() => URL.createObjectURL(file), [file]);
  useEffect(() => () => URL.revokeObjectURL(src), [src]);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [area, setArea] = useState<Area | null>(null);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  useDialog(ref, onCancel, cancelRef);

  const done = async () => {
    if (!area) return;
    setBusy(true);
    setFailed(false);
    try {
      onDone(await cropToFile(src, area, file.name));
    } catch {
      setFailed(true);
      setBusy(false);
    }
  };

  // Portal + stopPropagation: it opens over the login modal, whose backdrop click would otherwise close it.
  return createPortal(
    <div
      className={modalBgTop}
      onClick={(e) => {
        e.stopPropagation();
        if (!busy) onCancel();
      }}
    >
      <div ref={ref} className={modalNarrow} role="dialog" aria-modal="true" aria-labelledby="avatar-crop-title" onClick={(e) => e.stopPropagation()}>
        <h2 id="avatar-crop-title" className="text-[17px] font-medium text-navy-900">
          {t("avatar.cropTitle")}
        </h2>
        <p className="mt-1 text-[13px] text-ink-muted">{t("avatar.cropHint")}</p>
        <div className="relative mt-3 aspect-square w-full overflow-hidden rounded-card bg-ink">
          <Cropper
            image={src}
            crop={crop}
            zoom={zoom}
            maxZoom={MAX_ZOOM}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={(_, px) => setArea(px)}
          />
        </div>
        <label className="mt-4 flex items-center gap-3 text-[13px] text-ink">
          <span className="flex-none">{t("avatar.zoom")}</span>
          <input
            type="range"
            min={1}
            max={MAX_ZOOM}
            step={0.01}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="h-11 min-w-0 flex-1 cursor-pointer accent-navy-700"
          />
        </label>
        {failed && (
          <p className="mt-2 text-[13px] text-bad" role="alert">
            {t("avatar.cropFailed")}
          </p>
        )}
        <div className="mt-4 flex justify-end gap-2">
          <button ref={cancelRef} type="button" className={btn} disabled={busy} onClick={onCancel}>
            {t("avatar.cropCancel")}
          </button>
          <button type="button" className={btnPrimary} disabled={!area || busy} onClick={() => void done()}>
            {busy && <Spinner />}
            {t("avatar.cropDone")}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
