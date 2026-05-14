# PROGRESS.md

## 2026-05-14 — Story: Display selected cities and their local times

**What was done:**
- Scaffolded React + TypeScript frontend with Vite in `frontend/`
- Created `CityConfig` type (`frontend/src/types/city.ts`)
- Created `TimezoneCalculator` utility using `Intl.DateTimeFormat` (`frontend/src/utils/timezoneCalculator.ts`)
- Implemented `TimezoneDisplayItem` component with real-time 1-second interval updates (`frontend/src/components/TimezoneDisplayItem.tsx`)
- Implemented `TimezoneList` component rendering a list of `TimezoneDisplayItem`s (`frontend/src/components/TimezoneList.tsx`)
- Rewrote `App.tsx` as `ClocksAppView` with 4 default cities (New York, London, Tokyo, Sydney)
- Applied dark mode styling (`--bg: #0f0f14`) with responsive layout for mobile
- Cleaned up scaffold boilerplate (removed Vite logos, hero image)
- Verified production build passes (`npm run build`)

**Files changed:**
- `frontend/src/types/city.ts` (new)
- `frontend/src/utils/timezoneCalculator.ts` (new)
- `frontend/src/components/TimezoneDisplayItem.tsx` (new)
- `frontend/src/components/TimezoneList.tsx` (new)
- `frontend/src/App.tsx` (rewritten)
- `frontend/src/App.css` (rewritten)
- `frontend/src/index.css` (rewritten)
- `CLAUDE.md` (created)

**Decisions:**
- Used native `Intl.DateTimeFormat` via `toLocaleTimeString` instead of a third-party library (moment-timezone, date-fns-tz) — avoids extra dependencies and IANA timezone support is built into modern browsers.
- Dark mode is the default/only theme (not toggleable) per PRD aesthetic preference.
- Each `TimezoneDisplayItem` owns its own `setInterval` for simplicity and independent lifecycle cleanup.
