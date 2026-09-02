/**
 * Formata uma data ISO ou timestamp em formato por extenso amigável em português (pt-BR).
 * Exemplo: "segunda-feira, 2 de setembro"
 */
export function formatCurrentDate(dateStr?: string): string {
  const date = dateStr ? new Date(dateStr) : new Date();
  const validDate = isNaN(date.getTime()) ? new Date() : date;

  const formatter = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return formatter.format(validDate);
}
