import { useState } from 'react';
import type { CityConfig } from './types/city';
import { TimezoneList } from './components/TimezoneList';
import './App.css';

const DEFAULT_CITIES: CityConfig[] = [
  { id: '1', timezone_id: 'America/New_York', name: 'New York' },
  { id: '2', timezone_id: 'Europe/London', name: 'London' },
  { id: '3', timezone_id: 'Asia/Tokyo', name: 'Tokyo' },
  { id: '4', timezone_id: 'Australia/Sydney', name: 'Sydney' },
];

function App() {
  const [cities] = useState<CityConfig[]>(DEFAULT_CITIES);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Clocks</h1>
      </header>
      <main className="app-main">
        <TimezoneList cities={cities} />
      </main>
    </div>
  );
}

export default App;
