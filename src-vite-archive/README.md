# Archived Vite frontend

This was a standalone Vite + React Router SPA built from the Stitch design
export in `verix_civic_verification_system/DESIGN.md`. All 8 screens
(landing, sign-in, sign-up, submit-proof, dashboard, public proof, leaderboard,
settings) were converted here with mock/hardcoded data, styled to match the
brand design system.

It is **not** the active frontend — the project standardized on the Next.js
App Router (`app/`, `components/`) per the README's tech stack. Kept here as
a visual/structural reference while that design gets ported into `app/`.

Not wired into the build (`vite.config.ts` / `index.html` at the repo root
still reference the old `src/` path, so `npm run dev:vite` won't run as-is).
