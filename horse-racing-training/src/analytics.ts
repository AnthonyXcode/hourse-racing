// Google Analytics for Firebase. Loaded lazily (its own chunk, after first paint) and only where it runs:
// production builds by default, or `VITE_ANALYTICS=1` to try it in `npm run dev`.
// Page views: GA4's enhanced measurement records history changes, so ?tab= / ?language= switches count.
// Firebase web config is public by design (it identifies the project; access is governed by Firebase rules).
import type { Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBLkQ2eyzvMRDf3IOlUxzLlLqNUvk4wyOE",
  authDomain: "hkjc-e1de8.firebaseapp.com",
  projectId: "hkjc-e1de8",
  storageBucket: "hkjc-e1de8.firebasestorage.app",
  messagingSenderId: "648569370437",
  appId: "1:648569370437:web:04632b52ec5fbd6c28302c",
  measurementId: "G-N2D0ZNSM54",
};

const enabled = import.meta.env.PROD || import.meta.env.VITE_ANALYTICS === "1";
let ready: Promise<{ analytics: Analytics; log: typeof import("firebase/analytics").logEvent } | null> | null = null;

/** Start analytics once (no-op when disabled or unsupported, e.g. blocked cookies / private mode). */
export function initAnalytics() {
  if (!enabled || ready) return;
  ready = (async () => {
    try {
      const [{ initializeApp }, fa] = await Promise.all([import("firebase/app"), import("firebase/analytics")]);
      if (!(await fa.isSupported())) return null;
      const analytics = fa.getAnalytics(initializeApp(firebaseConfig));
      return { analytics, log: fa.logEvent };
    } catch {
      return null; // analytics must never break the app
    }
  })();
}

/** Record a custom event; silently dropped when analytics is off. */
export function track(event: string, params?: Record<string, string | number | boolean>) {
  void ready?.then((a) => a?.log(a.analytics, event, params));
}
