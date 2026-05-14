import { useEffect, useState } from 'react';
import type { CityConfig } from '../types/city';
import { getLocalTime } from '../utils/timezoneCalculator';

interface TimezoneDisplayItemProps {
  city: CityConfig;
}

export function TimezoneDisplayItem({ city }: TimezoneDisplayItemProps) {
  const [time, setTime] = useState(() => getLocalTime(city.timezone_id));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getLocalTime(city.timezone_id));
    }, 1000);
    return () => clearInterval(interval);
  }, [city.timezone_id]);

  return (
    <div className="timezone-item">
      <span className="city-name">{city.name}</span>
      <span className="city-time">{time}</span>
    </div>
  );
}
