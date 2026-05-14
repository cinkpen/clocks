import { useMemo } from 'react';
import type { CityConfig } from '../types/city';
import { getLocalTime } from '../utils/timezoneCalculator';

interface TimezoneDisplayItemProps {
  city: CityConfig;
  tick: number;
}

export function TimezoneDisplayItem({ city, tick }: TimezoneDisplayItemProps) {
  const time = useMemo(
    () => getLocalTime(city.timezone_id),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [city.timezone_id, tick],
  );

  return (
    <div className="timezone-item">
      <span className="city-name">{city.name}</span>
      <span className="city-time">{time}</span>
    </div>
  );
}
