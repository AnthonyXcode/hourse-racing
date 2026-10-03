import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./i18n"; // must run before App reads the language
import { initAnalytics } from "./analytics";
import { MotionConfig } from "motion/react";
import App from "./App";
import "./index.css";

initAnalytics();

// The admin panel is a separate, lazily loaded bundle: only /admin paths fetch it (docs/admin/PRD.md §7.4).
const isAdmin = /^\/admin(\/|$)/.test(window.location.pathname);
const AdminApp = lazy(() => import("./admin/AdminApp"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Every animation respects the OS "reduce motion" setting. */}
    <MotionConfig reducedMotion="user">
      {isAdmin ? (
        <Suspense fallback={null}>
          <AdminApp />
        </Suspense>
      ) : (
        <App />
      )}
    </MotionConfig>
  </StrictMode>
);
