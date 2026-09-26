/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** "1" = send analytics from `npm run dev` too (production builds always do). */
  readonly VITE_ANALYTICS?: string;
}
