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

## 2026-05-14 — Story: As a user, I want the displayed times to update every second so I always see accurate, current time

**What was done:**
- Refactored timer from per-component `setInterval` (N intervals for N cities) to a single shared timer via `useTimeTick` custom hook at the `TimezoneList` level
- Updated `TimezoneDisplayItem` to accept a `tick` prop instead of managing its own interval; uses `useMemo` to recompute formatted time on each tick
- Verified time formatting is consistent across all timezones (HH:MM:SS AM/PM pattern confirmed for America/New_York, Europe/London, Asia/Tokyo, Australia/Sydney)
- Verified production build passes (`npm run build` — TypeScript compilation and Vite bundling succeed)
- Performance: single `setInterval` fires once per second regardless of city count, each re-render only recomputes `getLocalTime` via `useMemo`

**Files changed:**
- `frontend/src/hooks/useTimeTick.ts` (new — custom hook providing a shared 1-second tick counter)
- `frontend/src/components/TimezoneDisplayItem.tsx` (refactored — removed local interval, now accepts `tick` prop, uses `useMemo`)
- `frontend/src/components/TimezoneList.tsx` (updated — uses `useTimeTick`, passes `tick` to each display item)

**Decisions:**
- Moved to a single shared timer (`useTimeTick`) at the list level instead of per-item intervals. This scales to any number of cities with only one `setInterval` running.
- Used `useMemo` in `TimezoneDisplayItem` to avoid unnecessary `getLocalTime` recalculations if the component re-renders for reasons other than a tick change.
- Kept `tick` as a simple incrementing counter rather than a `Date` object — simpler state and sufficient to trigger re-computation.
