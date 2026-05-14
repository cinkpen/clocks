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

## 2026-05-14 — Story: As a user, I want to be able to add new cities to my tracking list so I can customize which timezones I monitor

**What was done:**
- Created `timezoneData.ts` utility with curated list of 55 popular cities mapped to IANA timezone IDs, plus a `searchCities()` function for fuzzy matching by city name or timezone ID
- Implemented `CitySearch` component with search input, filtered dropdown, keyboard navigation (arrow keys + Enter + Escape), click-outside-to-close, and "Already added" badge for duplicates
- Updated `App.tsx` to manage mutable cities state with `useState`, compute `existingIds` set via `useMemo`, and pass `handleAddCity` callback to `CitySearch`
- Styled `CitySearch` with dark mode aesthetic matching existing theme (purple accent focus ring, surface backgrounds, monospace timezone labels)
- Verified production build passes (`npm run build` — TypeScript compilation and Vite bundling succeed)
- Newly added cities update in real-time (inherited from existing `useTimeTick` → `TimezoneList` architecture)

**Files changed:**
- `frontend/src/utils/timezoneData.ts` (new — city/timezone data and search function)
- `frontend/src/components/CitySearch.tsx` (new — search input with dropdown component)
- `frontend/src/App.tsx` (updated — mutable state, CitySearch integration)
- `frontend/src/App.css` (updated — CitySearch styles)

**Decisions:**
- Used a curated city list (55 entries) instead of `Intl.supportedValuesOf('timeZone')` to provide user-friendly city names rather than raw IANA identifiers. The raw timezone IDs are shown as secondary text in the dropdown for disambiguation.
- No third-party timezone library added — kept consistent with the project's approach of using native browser APIs.
- Deduplication uses `timezone_id + ':' + name` composite key to allow same timezone with different city names (e.g., "Shanghai" and "Beijing" both map to Asia/Shanghai but are different entries).
- Used `crypto.randomUUID()` for new city IDs — simple, collision-free, no dependency needed.

## 2026-05-14 — Story: As a user, I want my selected timezones to be saved so I don't have to re-add them every time I open the application

**What was done:**
- Created `usePersistedCities` custom hook (`frontend/src/hooks/usePersistedCities.ts`) that manages city state with localStorage persistence
- Loads cities from `localStorage` on initialization, falling back to default cities if storage is empty or data is corrupted
- Saves cities to `localStorage` automatically via `useEffect` whenever the cities list changes
- Validates loaded data with `isCityConfig` type guard — rejects non-array values, non-object entries, and entries missing required string fields (`id`, `timezone_id`, `name`)
- Silently ignores `localStorage` write failures (e.g., storage full or unavailable)
- Updated `App.tsx` to use `usePersistedCities` instead of raw `useState`, keeping the same `DEFAULT_CITIES` fallback
- Hook exposes `addCity` and `removeCity` callbacks for future use (remove feature is a separate story)
- Verified production build passes (`npm run build`)

**Files changed:**
- `frontend/src/hooks/usePersistedCities.ts` (new — localStorage persistence hook)
- `frontend/src/App.tsx` (updated — uses `usePersistedCities` instead of `useState`)

**Decisions:**
- Used `localStorage` (key: `clocks-selected-cities`) over `sessionStorage` — data must survive across browser sessions.
- Validation uses a runtime type guard (`isCityConfig`) rather than a schema library — lightweight and sufficient for three string fields.
- If stored data is an array but all entries are invalid, falls back to defaults rather than showing an empty list.
- Kept `removeCity` in the hook's return value since the remove-city story will need it, but omitted it from App.tsx destructuring to avoid unused-variable lint errors.
