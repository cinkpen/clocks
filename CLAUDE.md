# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Clocks" is a timezone tracking tool for developers. Users select cities, and the app displays their current local times in a list with real-time updates. Dark mode aesthetic is the default theme.

## Architecture

- **frontend/** — React + TypeScript + Vite app (`frontend/src/`):
  - `components/TimezoneDisplayItem` — single city name + live time (HH:MM:SS AM/PM)
  - `components/TimezoneList` — renders a list of `TimezoneDisplayItem`s
  - `utils/timezoneCalculator` — formats current time for a given IANA timezone ID
  - `types/city.ts` — `CityConfig` interface
  - `App.tsx` — main view (`ClocksAppView`) with default cities
- **backend/** — Python FastAPI service (future: timezone data API, persistence)

### Data Model

`CityConfig`: `{ id: string, timezone_id: string (IANA), name: string }`

## Common Commands

```bash
cd frontend
npm install        # install dependencies
npm run dev        # start dev server with HMR
npm run build      # type-check and production build
npm run preview    # preview production build locally
```

## Design Decisions

- Dark mode is the primary theme, not an add-on
- Times update client-side via interval timer (setInterval), not polling the backend
- IANA timezone identifiers (e.g., `America/New_York`) are the standard format throughout
- Uses native `Intl.DateTimeFormat` (`toLocaleTimeString`) instead of a third-party timezone library
