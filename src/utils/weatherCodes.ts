import type { WeatherDescription } from "../types/weather.types";

export const WEATHER_CONDITIONS: Record<number, WeatherDescription> = {
  0: { text: "Céu limpo", category: "clear" },
  1: { text: "Predominantemente limpo", category: "clear" },
  2: { text: "Parcialmente nublado", category: "cloudy" },
  3: { text: "Encoberto", category: "cloudy" },
  45: { text: "Nevoeiro", category: "fog" },
  48: { text: "Nevoeiro com geada", category: "fog" },
  51: { text: "Chuvisco leve", category: "drizzle" },
  53: { text: "Chuvisco moderado", category: "drizzle" },
  55: { text: "Chuvisco denso", category: "drizzle" },
  56: { text: "Chuvisco congelante leve", category: "drizzle" },
  57: { text: "Chuvisco congelante denso", category: "drizzle" },
  61: { text: "Chuva leve", category: "rain" },
  63: { text: "Chuva moderada", category: "rain" },
  65: { text: "Chuva forte", category: "rain" },
  66: { text: "Chuva congelante leve", category: "rain" },
  67: { text: "Chuva congelante forte", category: "rain" },
  71: { text: "Neve leve", category: "snow" },
  73: { text: "Neve moderada", category: "snow" },
  75: { text: "Neve forte", category: "snow" },
  77: { text: "Grãos de neve", category: "snow" },
  80: { text: "Pancadas de chuva leve", category: "rain" },
  81: { text: "Pancadas de chuva moderada", category: "rain" },
  82: { text: "Pancadas de chuva violenta", category: "rain" },
  85: { text: "Pancadas de neve leve", category: "snow" },
  86: { text: "Pancadas de neve forte", category: "snow" },
  95: { text: "Trovoada", category: "thunderstorm" },
  96: { text: "Trovoada com granizo leve", category: "thunderstorm" },
  99: { text: "Trovoada com granizo forte", category: "thunderstorm" },
};

/**
 * Retorna a descrição oficial em português baseada no código WMO.
 */
export function getWeatherDescription(code: number): string {
  return WEATHER_CONDITIONS[code]?.text || "Condição meteorológica identificada";
}

/**
 * Gera ícone SVG responsivo e animável baseado no código WMO e no status de dia/noite (is_day).
 */
export function getWeatherIconSvg(code: number, isDay: number): string {
  const isNight = isDay === 0;
  const condition = WEATHER_CONDITIONS[code]?.category || "clear";

  // Céu limpo (Sol radiante ou Lua crescente brilhante)
  if (condition === "clear" && (code === 0 || code === 1)) {
    if (isNight) {
      return `
        <svg class="weather-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <linearGradient id="moonGrad" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
              <stop stop-color="#E2E8F0" />
              <stop offset="1" stop-color="#94A3B8" />
            </linearGradient>
            <filter id="moonGlow" x="0" y="0" width="100" height="100" filterUnits="userSpaceOnUse">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <path d="M68 25C65.3 35.8 56.4 44 45.4 44C39.2 44 33.6 41.4 29.5 37.2C30.8 56.5 46.8 72 66.5 72C75.3 72 83.4 68.9 89.8 63.8C86.7 64.9 83.4 65.5 80 65.5C64.5 65.5 52 53 52 37.5C52 32.8 53.2 28.4 55.2 24.6C59.3 24.2 63.8 24.3 68 25Z" fill="url(#moonGrad)" filter="url(#moonGlow)"/>
          <circle cx="28" cy="24" r="1.5" fill="#CBD5E1" />
          <circle cx="78" cy="20" r="1.2" fill="#E2E8F0" />
          <circle cx="84" cy="40" r="1.8" fill="#CBD5E1" />
        </svg>
      `;
    }
    return `
      <svg class="weather-svg sun-pulse" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="sunGrad" x1="25" y1="25" x2="75" y2="75" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FCD34D" />
            <stop offset="1" stop-color="#F59E0B" />
          </linearGradient>
          <filter id="sunGlow" x="0" y="0" width="100" height="100" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <g stroke="#FBBF24" stroke-width="3.5" stroke-linecap="round">
          <line x1="50" y1="12" x2="50" y2="20" />
          <line x1="50" y1="80" x2="50" y2="88" />
          <line x1="12" y1="50" x2="20" y2="50" />
          <line x1="80" y1="50" x2="88" y2="50" />
          <line x1="23.1" y1="23.1" x2="28.8" y2="28.8" />
          <line x1="71.2" y1="71.2" x2="76.9" y2="76.9" />
          <line x1="23.1" y1="76.9" x2="28.8" y2="71.2" />
          <line x1="71.2" y1="28.8" x2="76.9" y2="23.1" />
        </g>
        <circle cx="50" cy="50" r="22" fill="url(#sunGrad)" filter="url(#sunGlow)" />
      </svg>
    `;
  }

  // Parcialmente nublado ou Encoberto
  if (condition === "cloudy") {
    const celestialBody = isNight
      ? `<path d="M48 24C45 32 38 38 29 38C26 38 23 37 21 35C24 45 34 52 46 52C58 52 68 43 69 31C63 32 54 30 48 24Z" fill="#CBD5E1" opacity="0.85"/>`
      : `<circle cx="62" cy="36" r="16" fill="#FBBF24" opacity="0.9" />`;

    return `
      <svg class="weather-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="cloudGrad" x1="20" y1="30" x2="80" y2="80" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FFFFFF" />
            <stop offset="1" stop-color="#94A3B8" />
          </linearGradient>
        </defs>
        ${celestialBody}
        <path d="M35 68C26.7 68 20 61.3 20 53C20 45.4 25.6 39.1 33 38.1C35.2 29.5 43.1 23 52.5 23C63.5 23 72.5 31.5 73 42.4C78.7 43.6 83 48.7 83 54.8C83 62.1 77.1 68 69.8 68H35Z" fill="url(#cloudGrad)" />
      </svg>
    `;
  }

  // Nevoeiro (Fog)
  if (condition === "fog") {
    return `
      <svg class="weather-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M32 46C26 46 21 50.5 21 56C21 61.5 26 66 32 66H68C74 66 79 61.5 79 56C79 50.5 74 46 68 46" stroke="#94A3B8" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.6"/>
        <line x1="22" y1="52" x2="78" y2="52" stroke="#CBD5E1" stroke-width="4.5" stroke-linecap="round" />
        <line x1="28" y1="62" x2="72" y2="62" stroke="#CBD5E1" stroke-width="4.5" stroke-linecap="round" />
        <line x1="34" y1="72" x2="66" y2="72" stroke="#94A3B8" stroke-width="4.5" stroke-linecap="round" />
      </svg>
    `;
  }

  // Chuvisco (Drizzle)
  if (condition === "drizzle") {
    return `
      <svg class="weather-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="drizzleCloud" x1="20" y1="20" x2="75" y2="60" gradientUnits="userSpaceOnUse">
            <stop stop-color="#E2E8F0" />
            <stop offset="1" stop-color="#64748B" />
          </linearGradient>
        </defs>
        <path d="M32 54C25 54 20 48.5 20 42C20 36 24.5 31 30.5 30C32.5 23 38.5 18 46 18C55 18 62.5 25 63 33.5C67.5 34.5 71 38.5 71 43.5C71 49.3 66.2 54 60.5 54H32Z" fill="url(#drizzleCloud)" />
        <g stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round">
          <line x1="32" y1="62" x2="28" y2="70" />
          <line x1="46" y1="62" x2="42" y2="70" />
          <line x1="60" y1="62" x2="56" y2="70" />
          <line x1="39" y1="74" x2="35" y2="82" />
          <line x1="53" y1="74" x2="49" y2="82" />
        </g>
      </svg>
    `;
  }

  // Chuva / Pancadas de Chuva (Rain)
  if (condition === "rain") {
    return `
      <svg class="weather-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="rainCloud" x1="20" y1="15" x2="80" y2="60" gradientUnits="userSpaceOnUse">
            <stop stop-color="#94A3B8" />
            <stop offset="1" stop-color="#475569" />
          </linearGradient>
        </defs>
        <path d="M32 50C24.5 50 18.5 44 18.5 36.5C18.5 29.8 23.5 24.3 30 23.3C32 15.5 39 10 47.5 10C57.5 10 65.5 17.5 66 27C71.5 28 75.5 32.5 75.5 38C75.5 44.6 70.1 50 63.5 50H32Z" fill="url(#rainCloud)" />
        <g stroke="#0284C7" stroke-width="3" stroke-linecap="round">
          <line x1="30" y1="58" x2="24" y2="72" />
          <line x1="45" y1="58" x2="39" y2="72" />
          <line x1="60" y1="58" x2="54" y2="72" />
          <line x1="37" y1="74" x2="31" y2="88" />
          <line x1="52" y1="74" x2="46" y2="88" />
        </g>
      </svg>
    `;
  }

  // Neve (Snow)
  if (condition === "snow") {
    return `
      <svg class="weather-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="snowCloud" x1="20" y1="20" x2="80" y2="60" gradientUnits="userSpaceOnUse">
            <stop stop-color="#F1F5F9" />
            <stop offset="1" stop-color="#94A3B8" />
          </linearGradient>
        </defs>
        <path d="M33 50C25.5 50 19.5 44 19.5 36.5C19.5 29.8 24.5 24.3 31 23.3C33 15.5 40 10 48.5 10C58.5 10 66.5 17.5 67 27C72.5 28 76.5 32.5 76.5 38C76.5 44.6 71.1 50 64.5 50H33Z" fill="url(#snowCloud)" />
        <g fill="#E0F2FE" stroke="#38BDF8" stroke-width="1.2">
          <circle cx="32" cy="64" r="3" />
          <circle cx="48" cy="64" r="3" />
          <circle cx="64" cy="64" r="3" />
          <circle cx="40" cy="78" r="3" />
          <circle cx="56" cy="78" r="3" />
        </g>
      </svg>
    `;
  }

  // Tempestade / Trovoada (Thunderstorm)
  if (condition === "thunderstorm") {
    return `
      <svg class="weather-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="stormCloud" x1="15" y1="15" x2="75" y2="55" gradientUnits="userSpaceOnUse">
            <stop stop-color="#475569" />
            <stop offset="1" stop-color="#1E293B" />
          </linearGradient>
        </defs>
        <path d="M30 48C23 48 17 42.5 17 35.5C17 29.2 21.8 24 28 23.1C30 15.8 36.8 10.5 44.8 10.5C54.2 10.5 61.8 17.5 62.3 26.5C67.5 27.5 71.5 31.8 71.5 37C71.5 43.1 66.5 48 60.3 48H30Z" fill="url(#stormCloud)" />
        <polygon points="46,46 34,64 45,64 38,88 58,60 48,60 56,46" fill="#FACC15" stroke="#EAB308" stroke-width="1.5" stroke-linejoin="round" />
        <line x1="24" y1="56" x2="20" y2="68" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round" />
        <line x1="68" y1="56" x2="64" y2="68" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round" />
      </svg>
    `;
  }

  // Fallback padrão seguro
  return `
    <svg class="weather-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="50" cy="50" r="24" fill="#38BDF8" opacity="0.8" />
    </svg>
  `;
}
