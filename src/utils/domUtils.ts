/**
 * Sanitiza texto para evitar injeções XSS ao concatenar strings em templates HTML.
 */
export function escapeHtml(str: string): string {
  if (!str) return "";
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
