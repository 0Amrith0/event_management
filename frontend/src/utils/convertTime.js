import { utcToZonedTime, format } from "date-fns-tz";

export function convertUtcToTimezone(utcString, timezone) {
  if (!utcString || !timezone) return "";

  const date = new Date(utcString);

  const zoned = utcToZonedTime(date, timezone);

  return format(zoned, "yyyy-MM-dd HH:mm", { timeZone: timezone });
}
