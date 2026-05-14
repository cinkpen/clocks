import { useState, useEffect, useCallback } from 'react';
import type { CityConfig } from '../types/city';

const STORAGE_KEY = 'clocks-selected-cities';

function isCityConfig(value: unknown): value is CityConfig {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as CityConfig).id === 'string' &&
    typeof (value as CityConfig).timezone_id === 'string' &&
    typeof (value as CityConfig).name === 'string'
  );
}

function loadCities(fallback: CityConfig[]): CityConfig[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return fallback;
    const valid = parsed.filter(isCityConfig);
    return valid.length > 0 ? valid : fallback;
  } catch {
    return fallback;
  }
}

export function usePersistedCities(fallback: CityConfig[]) {
  const [cities, setCities] = useState<CityConfig[]>(() => loadCities(fallback));

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cities));
    } catch {
      // localStorage full or unavailable — silently ignore
    }
  }, [cities]);

  const addCity = useCallback((city: CityConfig) => {
    setCities((prev) => [...prev, city]);
  }, []);

  const removeCity = useCallback((id: string) => {
    setCities((prev) => prev.filter((c) => c.id !== id));
  }, []);

  return { cities, addCity, removeCity };
}
