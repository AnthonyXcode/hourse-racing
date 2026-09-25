import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./i18n"; // must run before App reads the language
import { MotionConfig } from "motion/react";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Every animation respects the OS "reduce motion" setting. */}
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </StrictMode>
);
