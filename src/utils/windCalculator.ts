export interface CompassPoint {
  abbr: string;
  name: string;
}

/**
 * Mapeamento dos 16 pontos cardeais e colaterais com nome por extenso em português.
 */
export const COMPASS_POINTS: readonly CompassPoint[] = [
  { abbr: "N", name: "Norte" },
  { abbr: "NNE", name: "Norte-Nordeste" },
  { abbr: "NE", name: "Nordeste" },
  { abbr: "ENE", name: "Leste-Nordeste" },
  { abbr: "E", name: "Leste" },
  { abbr: "ESE", name: "Leste-Sudeste" },
  { abbr: "SE", name: "Sudeste" },
  { abbr: "SSE", name: "Sul-Sudeste" },
  { abbr: "S", name: "Sul" },
  { abbr: "SSO", name: "Sul-Sudoeste" },
  { abbr: "SO", name: "Sudoeste" },
  { abbr: "OSO", name: "Oeste-Sudoeste" },
  { abbr: "O", name: "Oeste" },
  { abbr: "ONO", name: "Oeste-Noroeste" },
  { abbr: "NO", name: "Noroeste" },
  { abbr: "NNO", name: "Norte-Noroeste" },
] as const;

export interface WindDetails {
  speed: string;
  degrees: number;
  abbr: string;
  fullName: string;
  intensity: string;
}

/**
 * Classifica a intensidade do vento com base em uma escala simplificada de Beaufort.
 */
export function getWindIntensityText(speedKmH: number): string {
  if (speedKmH < 6) return "Calmo";
  if (speedKmH < 20) return "Brisa suave";
  if (speedKmH < 39) return "Vento moderado";
  if (speedKmH < 62) return "Vento forte";
  return "Ventania";
}

/**
 * Converte graus para a sigla do ponto cardeal correspondente (retrocompatibilidade).
 */
export function getWindDirectionText(degrees: number): string {
  const normalized = ((degrees % 360) + 360) % 360;
  const index = Math.round(normalized / 22.5) % 16;
  return COMPASS_POINTS[index]?.abbr || "N";
}

/**
 * Consolida todas as métricas detalhadas de vento.
 */
export function getWindDetails(speedKmH: number, degrees: number): WindDetails {
  const safeDegrees = typeof degrees === "number" && !isNaN(degrees) ? degrees : 0;
  const normalized = ((safeDegrees % 360) + 360) % 360;
  const index = Math.round(normalized / 22.5) % 16;
  const point = COMPASS_POINTS[index] || { abbr: "N", name: "Norte" };

  return {
    speed: speedKmH.toFixed(1).replace(".", ","),
    degrees: Math.round(normalized),
    abbr: point.abbr,
    fullName: point.name,
    intensity: getWindIntensityText(speedKmH),
  };
}
