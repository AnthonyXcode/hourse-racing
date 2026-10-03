// Cloudflare Turnstile widget. The script is fetched only when a login modal mounts this component.
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

interface TurnstileApi {
  render(el: HTMLElement, opts: Record<string, unknown>): string;
  reset(id: string): void;
  remove(id: string): void;
}
declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
let loading: Promise<TurnstileApi> | null = null;

function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  loading ??= new Promise<TurnstileApi>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = SRC;
    s.async = true;
    s.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error("turnstile missing")));
    s.onerror = () => {
      loading = null;
      s.remove();
      reject(new Error("turnstile failed to load"));
    };
    document.head.appendChild(s);
  });
  return loading;
}

export interface TurnstileHandle {
  /** Discard the current token and get a fresh one (tokens are single-use). */
  reset(): void;
}

/**
 * Managed widget, `interaction-only`: invisible unless Cloudflare wants a click, then 65px tall.
 * Reports each token (or null when it expires / errors) through onToken.
 */
export const Turnstile = forwardRef<TurnstileHandle, { siteKey: string; lang: "zh-HK" | "en"; onToken: (t: string | null) => void; onError: () => void }>(
  function Turnstile({ siteKey, lang, onToken, onError }, ref) {
    const box = useRef<HTMLDivElement>(null);
    const id = useRef<string | null>(null);
    const cb = useRef({ onToken, onError });
    cb.current = { onToken, onError };

    useImperativeHandle(ref, () => ({
      reset() {
        cb.current.onToken(null);
        if (id.current && window.turnstile) window.turnstile.reset(id.current);
      },
    }));

    useEffect(() => {
      let live = true;
      loadTurnstile()
        .then((ts) => {
          if (!live || !box.current) return;
          id.current = ts.render(box.current, {
            sitekey: siteKey,
            appearance: "interaction-only",
            size: "flexible",
            theme: "light",
            language: lang === "en" ? "en" : "zh-tw",
            callback: (token: string) => cb.current.onToken(token),
            "expired-callback": () => cb.current.onToken(null),
            "timeout-callback": () => cb.current.onToken(null),
            "error-callback": () => {
              cb.current.onToken(null);
              cb.current.onError();
            },
          });
        })
        .catch(() => live && cb.current.onError());
      return () => {
        live = false;
        if (id.current && window.turnstile) window.turnstile.remove(id.current);
        id.current = null;
      };
    }, [siteKey]); // eslint-disable-line react-hooks/exhaustive-deps

    // Invisible = no space; when Cloudflare shows a challenge the widget takes its own 65px.
    return <div ref={box} className="min-h-0 [&>div]:w-full" />;
  }
);
