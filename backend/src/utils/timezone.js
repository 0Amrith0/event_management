import tz from "date-fns-tz";

const { zonedTimeToUtc, utcToZonedTime, format } = tz;

export function toUtc(dateString, timeString, timezone) {
  const combined = `${dateString}T${timeString}:00`;
  return zonedTimeToUtc(combined, timezone);
}

export function fromUtc(dateObj, timezone) {
  return utcToZonedTime(dateObj, timezone);
}

export function formatInTz(dateObj, timezone, pattern = "MMM dd, yyyy h:mm aa") {
  const zoned = utcToZonedTime(dateObj, timezone);
  return format(zoned, pattern, { timeZone: timezone });
}
