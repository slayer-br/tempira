/**
 * Mapeamento dos 16 pontos cardeais e colaterais em português (pt-BR).
 */
export const WIND_COMPASS_POINTS = [
  "N",
  "NNE",
  "NE",
  "ENE",
  "E",
  "ESE",
  "SE",
  "SSE",
  "S",
  "SSO",
  "SO",
  "OSO",
  "O",
  "ONO",
  "NO",
  "NNO",
] as const;

/**
 * Converte a direção do vento de graus (0 a 360) para o ponto da bússola correspondente.
 * @param degrees Direção em graus
 * @returns Sigla do ponto cardeal (ex: "N", "SSO", "SE")
 */
export function getWindDirectionText(degrees: number): string {
  if (typeof degrees !== "number" || isNaN(degrees)) {
    return "N";
  }

  // Normaliza graus negativos ou maiores que 360
  const normalized = ((degrees % 360) + 360) % 360;
  const index = Math.round(normalized / 22.5) % 16;
  return WIND_COMPASS_POINTS[index] || "N";
}
