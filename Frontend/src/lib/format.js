import { differenceInCalendarDays, format, isValid, parseISO, startOfToday } from "date-fns";
import { it } from "date-fns/locale";

export const toISODate = (date) => (date ? format(date, "yyyy-MM-dd") : "");

export const fromISODate = (value) => {
  if (!value) return undefined;
  const date = parseISO(value);
  return isValid(date) ? date : undefined;
};

export function nightsBetween(start, end) {
  const from = typeof start === "string" ? fromISODate(start) : start;
  const to = typeof end === "string" ? fromISODate(end) : end;
  if (!from || !to) return 0;
  return Math.max(0, differenceInCalendarDays(to, from));
}

export const formatDate = (value, pattern = "d MMM yyyy") => {
  const date = typeof value === "string" ? fromISODate(value) : value;
  return date ? format(date, pattern, { locale: it }) : "";
};

// "12–15 ott 2026", "30 set – 3 ott 2026", "28 dic 2026 – 2 gen 2027"
export function formatRange(start, end) {
  const from = fromISODate(start);
  const to = fromISODate(end);
  if (!from || !to) return "";
  if (from.getFullYear() !== to.getFullYear()) {
    return `${formatDate(from)} – ${formatDate(to)}`;
  }
  if (from.getMonth() === to.getMonth()) {
    return `${format(from, "d")}–${formatDate(to)}`;
  }
  return `${formatDate(from, "d MMM")} – ${formatDate(to)}`;
}

export const formatPrice = (value) =>
  new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: Number.isInteger(Number(value)) ? 0 : 2,
  }).format(Number(value) || 0);

export const pluralNights = (n) => (n === 1 ? "1 notte" : `${n} notti`);

export function bookingStatus(start, end) {
  const today = startOfToday();
  const from = fromISODate(start);
  const to = fromISODate(end);
  if (!from || !to) return "upcoming";
  if (differenceInCalendarDays(to, today) < 0) return "past";
  if (differenceInCalendarDays(from, today) <= 0) return "ongoing";
  return "upcoming";
}

export const STATUS_LABEL = {
  upcoming: "In arrivo",
  ongoing: "In corso",
  past: "Concluso",
};
