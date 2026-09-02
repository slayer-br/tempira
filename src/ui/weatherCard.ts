import type { GeoLocation } from "../types/geo.types";
import type { WeatherResult } from "../types/weather.types";
import { formatCurrentDate } from "../utils/dateFormatter";
import { getWindDirectionText } from "../utils/windCalculator";
import { getWeatherDescription, getWeatherIconSvg } from "../utils/weatherCodes";
import { escapeHtml } from "../utils/domUtils";

/**
 * Renderiza o card meteorológico completo (Sidebar à esquerda e Área principal de métricas).
 */
export function renderWeatherCard(
  container: HTMLElement,
  location: GeoLocation,
  weatherResult: WeatherResult
): void {
  const { current, units } = weatherResult;
  const isDay = current.is_day === 1;
  const tempRounded = Math.round(current.temperature_2m);
  const apparentTempRounded = Math.round(current.apparent_temperature);
  const windSpeedRounded = Math.round(current.wind_speed_10m);
  const windDirText = getWindDirectionText(current.wind_direction_10m);
  const weatherDesc = getWeatherDescription(current.weather_code);
  const weatherIcon = getWeatherIconSvg(current.weather_code, current.is_day);
  const formattedDate = formatCurrentDate(current.time);

  container.innerHTML = `
    <div class="weather-content">
      <!-- Sidebar Esquerda (Informações de síntese) -->
      <aside class="sidebar">
        <div class="weather-header">
          <div class="location-info">
            <div class="city-title-row">
              <h1 class="city-name">${escapeHtml(location.name)}</h1>
              <span class="country-badge">${escapeHtml(location.country_code)}</span>
            </div>
            <time class="date-text">${escapeHtml(formattedDate)}</time>
          </div>
          <div class="day-night-badge ${isDay ? "is-day" : "is-night"}">
            <span class="badge-dot"></span>
            <span>${isDay ? "Dia" : "Noite"}</span>
          </div>
        </div>

        <div class="weather-hero">
          <div class="temperature-wrapper">
            <span class="temp-num">${tempRounded}</span>
            <span class="temp-deg">${escapeHtml(units.temperature_2m || "°C")}</span>
          </div>
          <div class="weather-icon-wrapper">
            ${weatherIcon}
          </div>
        </div>

        <div class="weather-status-row">
          <span class="weather-desc">${escapeHtml(weatherDesc)}</span>
        </div>
      </aside>

      <!-- Área Principal Direita (Métricas e Indicadores) -->
      <section class="main-area">
        <h2 class="main-area-title">Condições Atuais</h2>

        <div class="metrics-grid">
          <!-- Umidade -->
          <article class="metric-card">
            <div class="metric-icon-box" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
            </div>
            <div class="metric-info">
              <span class="metric-label">Umidade</span>
              <div class="metric-val-row">
                <span class="metric-value">${current.relative_humidity_2m}</span>
                <span class="metric-unit">${escapeHtml(units.relative_humidity_2m || "%")}</span>
              </div>
            </div>
          </article>

          <!-- Sensação Térmica -->
          <article class="metric-card">
            <div class="metric-icon-box" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
              </svg>
            </div>
            <div class="metric-info">
              <span class="metric-label">Sensação Térmica</span>
              <div class="metric-val-row">
                <span class="metric-value">${apparentTempRounded}</span>
                <span class="metric-unit">${escapeHtml(units.apparent_temperature || "°C")}</span>
              </div>
            </div>
          </article>

          <!-- Probabilidade de Chuva -->
          <article class="metric-card">
            <div class="metric-icon-box" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" />
                <path d="m8 19-2 3" />
                <path d="m12 19-2 3" />
                <path d="m16 19-2 3" />
              </svg>
            </div>
            <div class="metric-info">
              <span class="metric-label">Chance de Chuva</span>
              <div class="metric-val-row">
                <span class="metric-value">${current.precipitation_probability}</span>
                <span class="metric-unit">${escapeHtml(units.precipitation_probability || "%")}</span>
              </div>
            </div>
          </article>

          <!-- Velocidade e Direção do Vento -->
          <article class="metric-card">
            <div class="metric-icon-box" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
                <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
                <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
              </svg>
            </div>
            <div class="metric-info">
              <span class="metric-label">Vento</span>
              <div class="metric-val-row">
                <span class="metric-value">${windSpeedRounded}</span>
                <span class="metric-unit">${escapeHtml(units.wind_speed_10m || "km/h")}</span>
                <span class="wind-direction-tag" title="Direção do vento">${windDirText}</span>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  `;
}
