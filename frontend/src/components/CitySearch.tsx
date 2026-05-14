import { useState, useRef, useEffect, useCallback } from 'react';
import { searchCities } from '../utils/timezoneData';
import type { TimezoneEntry } from '../utils/timezoneData';
import type { CityConfig } from '../types/city';

interface CitySearchProps {
  onAdd: (city: CityConfig) => void;
  existingIds: Set<string>;
}

export function CitySearch({ onAdd, existingIds }: CitySearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<TimezoneEntry[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const updateResults = useCallback((value: string) => {
    const matches = searchCities(value);
    setResults(matches);
    setIsOpen(matches.length > 0 && value.trim().length > 0);
    setHighlightedIndex(-1);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSelect(entry: TimezoneEntry) {
    const id = entry.timezone_id + ':' + entry.name;
    if (existingIds.has(id)) return;

    onAdd({
      id: crypto.randomUUID(),
      timezone_id: entry.timezone_id,
      name: entry.name,
    });
    setQuery('');
    setResults([]);
    setIsOpen(false);
    setHighlightedIndex(-1);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!isOpen || results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      handleSelect(results[highlightedIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  }

  return (
    <div className="city-search" ref={wrapperRef}>
      <input
        type="text"
        className="city-search-input"
        placeholder="Search for a city..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          updateResults(e.target.value);
        }}
        onFocus={() => {
          if (query.trim()) updateResults(query);
        }}
        onKeyDown={handleKeyDown}
        aria-label="Search for a city to add"
        aria-autocomplete="list"
        role="combobox"
        aria-expanded={isOpen}
      />
      {isOpen && (
        <ul className="city-search-dropdown" role="listbox">
          {results.map((entry, index) => {
            const id = entry.timezone_id + ':' + entry.name;
            const isAlreadyAdded = existingIds.has(id);

            return (
              <li
                key={id}
                className={`city-search-option ${index === highlightedIndex ? 'highlighted' : ''} ${isAlreadyAdded ? 'already-added' : ''}`}
                role="option"
                aria-selected={index === highlightedIndex}
                onClick={() => !isAlreadyAdded && handleSelect(entry)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                <span className="option-city">{entry.name}</span>
                <span className="option-tz">{entry.timezone_id}</span>
                {isAlreadyAdded && <span className="option-badge">Added</span>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
