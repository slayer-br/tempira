import { fetchGeoLocation, fetchWeather } from "./api/openMeteoApi";
import type { SearchResult } from "../types/weather.types";

/**
 * Serviço de alto nível para busca e consolidação de clima por cidade.
 * Orquestra a busca de coordenadas seguida da busca de clima em uma única operação lógica.
 * 
 * Regras do projeto:
 * - Se a cidade não for informada ou for vazia -> retorna null
 * - Se a cidade não for encontrada -> retorna null
 * - Se a cidade for encontrada mas o clima falhar -> retorna null
 */
export async function searchCityWeather(cityName: string): Promise<SearchResult | null> {
  const normalizedQuery = cityName?.trim() ?? "";

  if (!normalizedQuery) {
    return null;
  }

  // 1. Busca localização e fuso
  const location = await fetchGeoLocation(normalizedQuery);
  if (!location) {
    return null;
  }

  // 2. Busca previsão meteorológica com as coordenadas obtidas
  const weather = await fetchWeather(
    location.latitude,
    location.longitude,
    location.timezone
  );

  if (!weather) {
    return null;
  }

  return {
    location,
    weather,
  };
}
