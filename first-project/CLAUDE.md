# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # start dev server
pnpm build      # production build
pnpm start      # run production build
```

No test runner is configured.

## Architecture

**More/Less** — a Next.js 16 App Router app where users compare two items (movies, TV shows, brands) and guess which has a higher rating.

### Data flow

1. **TMDB sync** (`/api/sync`) — triggered manually (GET request); fetches 10 pages each of movies and TV from TMDB's discover endpoint sorted by popularity, then upserts all 200+ records into Supabase's `media` table (keyed on `tmdb_id`).
2. **Proxy routes** (`/api/discover/movie`, `/api/discover/tv`) — thin server-side proxies to TMDB that hide `TMDB_READ_ACCESS_TOKEN` from the client.
3. **Frontend** (`src/app/page.tsx`) — currently static/dummy; shows two hardcoded items side-by-side. Real comparison logic against Supabase data is not yet wired up.

### Key files

- `src/lib/supabase.ts` — singleton Supabase client (reads `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
- `src/app/api/sync/route.ts` — the bulk-import cron-style endpoint; upserts into a `media` table.

### Environment variables required

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
TMDB_READ_ACCESS_TOKEN=
```

`TMDB_READ_ACCESS_TOKEN` is server-only (used only in Route Handlers). The two `NEXT_PUBLIC_*` vars are exposed to the browser via the Supabase client.
