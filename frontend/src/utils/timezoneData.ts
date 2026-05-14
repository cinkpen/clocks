interface TimezoneEntry {
  name: string;
  timezone_id: string;
}

const POPULAR_CITIES: TimezoneEntry[] = [
  { name: 'New York', timezone_id: 'America/New_York' },
  { name: 'Los Angeles', timezone_id: 'America/Los_Angeles' },
  { name: 'Chicago', timezone_id: 'America/Chicago' },
  { name: 'Denver', timezone_id: 'America/Denver' },
  { name: 'Toronto', timezone_id: 'America/Toronto' },
  { name: 'Vancouver', timezone_id: 'America/Vancouver' },
  { name: 'Mexico City', timezone_id: 'America/Mexico_City' },
  { name: 'São Paulo', timezone_id: 'America/Sao_Paulo' },
  { name: 'Buenos Aires', timezone_id: 'America/Argentina/Buenos_Aires' },
  { name: 'London', timezone_id: 'Europe/London' },
  { name: 'Paris', timezone_id: 'Europe/Paris' },
  { name: 'Berlin', timezone_id: 'Europe/Berlin' },
  { name: 'Madrid', timezone_id: 'Europe/Madrid' },
  { name: 'Rome', timezone_id: 'Europe/Rome' },
  { name: 'Amsterdam', timezone_id: 'Europe/Amsterdam' },
  { name: 'Moscow', timezone_id: 'Europe/Moscow' },
  { name: 'Istanbul', timezone_id: 'Europe/Istanbul' },
  { name: 'Athens', timezone_id: 'Europe/Athens' },
  { name: 'Cairo', timezone_id: 'Africa/Cairo' },
  { name: 'Lagos', timezone_id: 'Africa/Lagos' },
  { name: 'Nairobi', timezone_id: 'Africa/Nairobi' },
  { name: 'Johannesburg', timezone_id: 'Africa/Johannesburg' },
  { name: 'Dubai', timezone_id: 'Asia/Dubai' },
  { name: 'Mumbai', timezone_id: 'Asia/Kolkata' },
  { name: 'Bangkok', timezone_id: 'Asia/Bangkok' },
  { name: 'Singapore', timezone_id: 'Asia/Singapore' },
  { name: 'Hong Kong', timezone_id: 'Asia/Hong_Kong' },
  { name: 'Shanghai', timezone_id: 'Asia/Shanghai' },
  { name: 'Beijing', timezone_id: 'Asia/Shanghai' },
  { name: 'Tokyo', timezone_id: 'Asia/Tokyo' },
  { name: 'Seoul', timezone_id: 'Asia/Seoul' },
  { name: 'Sydney', timezone_id: 'Australia/Sydney' },
  { name: 'Melbourne', timezone_id: 'Australia/Melbourne' },
  { name: 'Auckland', timezone_id: 'Pacific/Auckland' },
  { name: 'Honolulu', timezone_id: 'Pacific/Honolulu' },
  { name: 'Anchorage', timezone_id: 'America/Anchorage' },
  { name: 'Lima', timezone_id: 'America/Lima' },
  { name: 'Bogota', timezone_id: 'America/Bogota' },
  { name: 'Santiago', timezone_id: 'America/Santiago' },
  { name: 'Kathmandu', timezone_id: 'Asia/Kathmandu' },
  { name: 'Dhaka', timezone_id: 'Asia/Dhaka' },
  { name: 'Jakarta', timezone_id: 'Asia/Jakarta' },
  { name: 'Taipei', timezone_id: 'Asia/Taipei' },
  { name: 'Kuala Lumpur', timezone_id: 'Asia/Kuala_Lumpur' },
  { name: 'Riyadh', timezone_id: 'Asia/Riyadh' },
  { name: 'Tehran', timezone_id: 'Asia/Tehran' },
  { name: 'Karachi', timezone_id: 'Asia/Karachi' },
  { name: 'Doha', timezone_id: 'Asia/Qatar' },
  { name: 'Edinburgh', timezone_id: 'Europe/London' },
  { name: 'Lisbon', timezone_id: 'Europe/Lisbon' },
  { name: 'Warsaw', timezone_id: 'Europe/Warsaw' },
  { name: 'Zurich', timezone_id: 'Europe/Zurich' },
  { name: 'Stockholm', timezone_id: 'Europe/Stockholm' },
  { name: 'Helsinki', timezone_id: 'Europe/Helsinki' },
  { name: 'Dublin', timezone_id: 'Europe/Dublin' },
  { name: 'Reykjavik', timezone_id: 'Atlantic/Reykjavik' },
];

export type { TimezoneEntry };

export function searchCities(query: string): TimezoneEntry[] {
  if (!query.trim()) return [];

  const normalized = query.toLowerCase().trim();

  return POPULAR_CITIES.filter(
    (city) =>
      city.name.toLowerCase().includes(normalized) ||
      city.timezone_id.toLowerCase().includes(normalized),
  );
}
