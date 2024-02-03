export function formatDate(date: string) {
  const newDate = new Date(date);
  const formatted = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    day: "2-digit",
    month: "short",
  });
  return formatted.format(newDate);
}
