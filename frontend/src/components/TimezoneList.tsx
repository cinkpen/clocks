import type { CityConfig } from '../types/city';
import { TimezoneDisplayItem } from './TimezoneDisplayItem';
import { useTimeTick } from '../hooks/useTimeTick';

interface TimezoneListProps {
  cities: CityConfig[];
}

export function TimezoneList({ cities }: TimezoneListProps) {
  const tick = useTimeTick();

  if (cities.length === 0) {
    return <p className="empty-message">No cities selected. Add a city to get started.</p>;
  }

  return (
    <div className="timezone-list">
      {cities.map((city) => (
        <TimezoneDisplayItem key={city.id} city={city} tick={tick} />
      ))}
    </div>
  );
}
