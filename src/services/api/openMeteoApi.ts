import type { GeoLocation, GeoApiResponse } from "../../types/geo.types";
import type { WeatherResult, WeatherUnits, ForecastApiResponse } from "../../types/weather.types";

const GEOCODING_BASE_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_BASE_URL = "https://api.open-meteo.com/v1/forecast";

/**
 * Busca coordenadas e fuso horário a partir do nome da cidade.
 * Endpoint: https://geocoding-api.open-meteo.com/v1/search?name={NOME}&count=1&language=en&format=json
 * @param cityName Nome da cidade digitada pelo usuário
 * @returns GeoLocation com nome, lat, lon, country_code e timezone, ou null se não encontrada/inválida
 */
export async function fetchGeoLocation(cityName: string): Promise<GeoLocation | null> {
  if (!cityName || typeof cityName !== "string" || !cityName.trim()) {
    return null;
  }

  try {
    const params = new URLSearchParams({
      name: cityName.trim(),
      count: "1",
      language: "en",
      format: "json",
    });

    const response = await fetch(`${GEOCODING_BASE_URL}?${params.toString()}`);

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as GeoApiResponse;
    const location = data.results?.[0];

    if (
      !location ||
      typeof location.name !== "string" ||
      typeof location.latitude !== "number" ||
      typeof location.longitude !== "number" ||
      !location.country_code ||
      !location.timezone
    ) {
      return null;
    }

    return {
      name: location.name,
      latitude: location.latitude,
      longitude: location.longitude,
      country_code: location.country_code.toUpperCase(),
      timezone: location.timezone,
    };
  } catch {
    return null;
  }
}

/**
 * Busca os dados meteorológicos atuais da localização especificada.
 * Endpoint: https://api.open-meteo.com/v1/forecast?latitude={LAT}&longitude={LON}&hourly=temperature_2m&current=...&timezone={TZ}
 * @param latitude Latitude
 * @param longitude Longitude
 * @param timezone Fuso horário IANA
 * @returns WeatherResult com dados e unidades, ou null se inválido/erro
 */
export async function fetchWeather(
  latitude: number,
  longitude: number,
  timezone: string
): Promise<WeatherResult | null> {
  if (
    typeof latitude !== "number" ||
    isNaN(latitude) ||
    typeof longitude !== "number" ||
    isNaN(longitude) ||
    !timezone ||
    typeof timezone !== "string" ||
    !timezone.trim()
  ) {
    return null;
  }

  try {
    const params = new URLSearchParams({
      latitude: String(latitude),
      longitude: String(longitude),
      hourly: "temperature_2m",
      current:
        "precipitation_probability,temperature_2m,relative_humidity_2m,is_day,apparent_temperature,wind_speed_10m,wind_direction_10m,precipitation,weather_code",
      timezone: timezone.trim(),
    });

    const response = await fetch(`${FORECAST_BASE_URL}?${params.toString()}`);

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as ForecastApiResponse;
    const weather = data.current;

    if (!weather) {
      return null;
    }

    const units: WeatherUnits = {
      temperature_2m: data.current_units?.temperature_2m || "°C",
      relative_humidity_2m: data.current_units?.relative_humidity_2m || "%",
      apparent_temperature: data.current_units?.apparent_temperature || "°C",
      wind_speed_10m: data.current_units?.wind_speed_10m || "km/h",
      wind_direction_10m: data.current_units?.wind_direction_10m || "°",
      precipitation_probability: data.current_units?.precipitation_probability || "%",
      precipitation: data.current_units?.precipitation || "mm",
      weather_code: data.current_units?.weather_code || "wmo code",
    };

    return {
      current: weather,
      units,
    };
  } catch {
    return null;
  }
}
