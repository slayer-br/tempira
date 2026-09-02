export interface GeoLocation {
  name: string;
  latitude: number;
  longitude: number;
  country_code: string;
  timezone: string;
}

export interface GeoApiResultItem {
  id?: number;
  name: string;
  latitude: number;
  longitude: number;
  country_code: string;
  timezone: string;
  elevation?: number;
  feature_code?: string;
  admin1?: string;
  admin2?: string;
  country?: string;
}

export interface GeoApiResponse {
  results?: GeoApiResultItem[];
  generationtime_ms?: number;
}
