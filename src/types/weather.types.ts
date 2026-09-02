export interface WeatherUnits {
  temperature_2m: string;
  relative_humidity_2m: string;
  apparent_temperature: string;
  wind_speed_10m: string;
  wind_direction_10m: string;
  precipitation_probability: string;
  precipitation: string;
  weather_code?: string;
  time?: string;
  interval?: string;
}

export interface WeatherData {
  time: string;
  interval?: number;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  is_day: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  precipitation_probability: number;
  precipitation: number;
  weather_code: number;
}

export interface WeatherResult {
  current: WeatherData;
  units: WeatherUnits;
}

export interface ForecastApiResponse {
  latitude?: number;
  longitude?: number;
  generationtime_ms?: number;
  utc_offset_seconds?: number;
  timezone?: string;
  timezone_abbreviation?: string;
  elevation?: number;
  current_units?: Partial<WeatherUnits>;
  current?: WeatherData;
  hourly_units?: Record<string, string>;
  hourly?: {
    time: string[];
    temperature_2m: number[];
  };
}

export type WeatherCategory =
  | "clear"
  | "cloudy"
  | "fog"
  | "drizzle"
  | "rain"
  | "snow"
  | "thunderstorm";

export interface WeatherDescription {
  text: string;
  category: WeatherCategory;
}

export interface SearchResult {
  location: import("./geo.types").GeoLocation;
  weather: WeatherResult;
}
