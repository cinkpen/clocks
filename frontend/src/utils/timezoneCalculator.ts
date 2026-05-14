export function getLocalTime(timezoneId: string): string {
  return new Date().toLocaleTimeString('en-US', {
    timeZone: timezoneId,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
}
