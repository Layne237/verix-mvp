# Deploying Verix to Vercel

## Prerequisites

- Node.js 18.17+ and npm
- A [Vercel](https://vercel.com) account, with the [Vercel CLI](https://vercel.com/docs/cli) installed if deploying from the terminal (`npm i -g vercel`)
- A [Supabase](https://supabase.com) project with the schema from `scripts/seed.sql` and `scripts/fix-rls-and-storage.sql` applied
- A Google Cloud project with an OAuth 2.0 Client ID (for Google sign-in)
- Optional but required for full functionality: a Google AI Studio key (Gemini), an Upstash Redis database, and a TinyPNG API key

## 1. Environment Variables

Copy `.env.local.example` to `.env.local` for local development, and set the same variables in Vercel (**Project Settings → Environment Variables**) for deployment.

| Variable                                              | Required                 | Notes                                                                                  |
| ----------------------------------------------------- | ------------------------ | -------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`                            | Yes                      | Your project's API URL                                                                 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`                       | Yes                      | Public anon key                                                                        |
| `SUPABASE_SERVICE_ROLE_KEY`                           | Yes                      | **Server-only** - never expose with a `NEXT_PUBLIC_` prefix                            |
| `NEXT_PUBLIC_SUPABASE_PROJECT_ID`                     | Yes                      | Project ref only (e.g. `abcdefghijklmnop`), used by `npm run db:types`                 |
| `NEXTAUTH_URL`                                        | Yes                      | The deployed URL, e.g. `https://your-app.vercel.app` (`http://localhost:3000` locally) |
| `NEXTAUTH_SECRET`                                     | Yes                      | Generate with `openssl rand -base64 32`                                                |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`           | For Google sign-in       | See step 3 below for the redirect URI to register                                      |
| `GEMINI_API_KEY`                                      | For AI verification      | Without it, `/api/submit`'s Gemini call fails                                          |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | For submit rate-limiting | `/api/submit` calls this unconditionally                                               |
| `TINIFY_API_KEY`                                      | For image compression    | `lib/utils/image.ts`'s `compressImage()` needs this                                    |
| `INTERNAL_API_KEY`                                    | Yes                      | Any random string; used for internal/admin-only calls                                  |
| `NEXT_PUBLIC_MOCK_AUTH`                               | **No - see warning**     | Dev-only bypass. See below.                                                            |

**`NEXT_PUBLIC_MOCK_AUTH` must be unset or `false` in the Vercel deployment.** It's a client-side switch (added while the Supabase project wasn't provisioned yet) that fakes a logged-in session and skips `AuthGuard`/middleware checks entirely, purely for previewing pages before a backend existed. Leaving it `true` in production would let anyone see every gated page as a fake logged-in user, and the UI renders a visible amber banner reading "Mock auth mode" whenever it's active - if you ever see that banner on the live site, this variable is set wrong.

## 2. Build Verification (do this before deploying)

```bash
npm install
npm run type-check   # must be 0 errors
npm run lint          # must be 0 errors
npm run build         # must complete without failing
npm run start         # smoke-test the production server locally on :3000
```

`next build` type-checks and lints the whole project - this is stricter than `npm run dev`, which only transpiles. If `build` fails on a type error, `dev` won't have shown it.

## 3. Google OAuth Redirect URI

In the Google Cloud Console, under the OAuth Client's **Authorized redirect URIs**, add:

```
https://your-app.vercel.app/api/auth/callback/google
```

(and keep `http://localhost:3000/api/auth/callback/google` for local dev). Forgetting this is the most common cause of Google sign-in failing only in production.

## 4. Deploy

**Via the Vercel dashboard:** Import the GitHub repo at [vercel.com/new](https://vercel.com/new) - it auto-detects Next.js. Add the environment variables from the table above before the first deploy, then deploy.

**Via the CLI:**

```bash
vercel link      # first time only
vercel env add   # add each variable, or import via the dashboard
vercel --prod
```

`vercel.json` in this repo pins the framework/build/install/output settings explicitly; it does **not** contain any environment variable values or references - those belong in Vercel's Environment Variables UI/CLI only, never committed to the repo.

## 5. Post-Deployment Verification

Check each of these on the deployed URL:

1. `/` loads and looks correct (no "Mock auth mode" banner).
2. `/register` → create an account → redirected to `/login?registered=true`.
3. Sign in → redirected to `/dashboard`, and the navbar shows your avatar/name (confirms `NEXTAUTH_SECRET`/`NEXTAUTH_URL`/Supabase are all wired correctly).
4. Visiting `/dashboard` or `/submit` while signed out redirects to `/login?callbackUrl=...`, and signing in from there returns you to the original page.
5. `/submit` → submit a before/after photo pair → succeeds (confirms `GEMINI_API_KEY`, `UPSTASH_REDIS_REST_*`, and `TINIFY_API_KEY` are all working - this is the one flow that touches every optional integration at once).
6. `/leaderboard` loads without needing to be signed in.
7. The public `/proof/[id]` page for a submitted proof renders its images, verification badge, and AI reasoning.

## Troubleshooting

**`UntrustedHost` error / auth endpoints fail only in production, not in `npm run dev`.**
Auth.js only auto-trusts the request's Host header when `AUTH_URL`, `VERCEL`, or `CF_PAGES` is set, or outside of `NODE_ENV=production`. This project uses the legacy `NEXTAUTH_URL` name, which doesn't satisfy that auto-detection. `trustHost: true` is already set explicitly in `lib/auth/config.ts` and `middleware.ts` to cover this regardless of hosting platform - if you see this error anyway, check that both spots still have it after any auth-related edits.

**Google/Gemini/Supabase Storage image domains don't load with `next/image`.**
`next.config.js` restricts `images.remotePatterns` to the Supabase project's own storage path and `lh3.googleusercontent.com` (Google profile photos). Note that proof before/after photos are stored as base64 data URIs (see `lib/utils/image.ts`), not files - they're deliberately rendered with a plain `<img>`, not `next/image`, and don't need a remote pattern entry at all.

**Middleware build warning about `CompressionStream`/`DecompressionStream` not supported in Edge Runtime.**
This comes from `@auth/core`'s JWE (encrypted JWT) support and shows up even though this app only uses plain signed JWTs (JWS), which don't hit that code path. It's a known, harmless warning for standard Auth.js v5 + Next.js Edge middleware setups - it does not indicate the middleware is broken (verified: redirects work correctly under `npm run start`).

**Leaderboard is slow or hits Supabase on every request.**
`/leaderboard` is intentionally rendered as a static page revalidated every 60 seconds (`export const revalidate = 60`), backed by a cookie-free anon Supabase client (`lib/supabase/public.ts`) rather than the cookie-based server client - using the cookie-based client here would force the whole route into fully dynamic (never cached) rendering, since Next treats any use of `cookies()` as opting out of static generation, even if the query itself doesn't need a session. If this page is rebuilt to need per-user data, expect it to become dynamic again.

**"Supabase connection failed" / registration or sign-in doesn't work at all.**
Run `npm run db:test` against the target environment's env vars. If that also fails, the Supabase project itself is unreachable - the most common cause is a free-tier project that's auto-paused from inactivity (check the Supabase dashboard). This is unrelated to anything in the Next.js app.

**Build fails on `lib/utils/image.ts` with a type error about `Uint8Array`/`Buffer`/`BlobPart`.**
This was a real bug (not a stale/ignorable one) where `tinify`'s `toBuffer()` returns a plain `Uint8Array`, not a Node `Buffer`, and a generic `Uint8Array<ArrayBufferLike>` doesn't satisfy `BlobPart`'s stricter `ArrayBufferView<ArrayBuffer>` type in newer TypeScript DOM lib versions. Already fixed - if it resurfaces after touching this file, wrap the result in `Buffer.from(...)` before calling `.toString('base64')`, and push `.buffer` (not the typed array view) into any `Blob`-bound array.
