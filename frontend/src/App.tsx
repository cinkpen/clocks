import { useMemo } from 'react';
import type { CityConfig } from './types/city';
import { TimezoneList } from './components/TimezoneList';
import { CitySearch } from './components/CitySearch';
import { usePersistedCities } from './hooks/usePersistedCities';
import './App.css';

const DEFAULT_CITIES: CityConfig[] = [
  { id: '1', timezone_id: 'America/New_York', name: 'New York' },
  { id: '2', timezone_id: 'Europe/London', name: 'London' },
  { id: '3', timezone_id: 'Asia/Tokyo', name: 'Tokyo' },
  { id: '4', timezone_id: 'Australia/Sydney', name: 'Sydney' },
];

function App() {
  const { cities, addCity } = usePersistedCities(DEFAULT_CITIES);

  const existingIds = useMemo(
    () => new Set(cities.map((c) => c.timezone_id + ':' + c.name)),
    [cities],
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>Clocks</h1>
      </header>
      <main className="app-main">
        <CitySearch onAdd={addCity} existingIds={existingIds} />
        <TimezoneList cities={cities} />
      </main>
    </div>
  );
}

export default App;
