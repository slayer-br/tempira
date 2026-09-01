import "./style.css";

type CityLocation = {
  name: string;
  latitude: number;
  longitude: number;
  country_code: string;
  timezone: string;
};

type WeatherCurrent = {
  temperature_2m: number | null;
  apparent_temperature: number | null;
  relative_humidity_2m: number | null;
  wind_speed_10m: number | null;
  precipitation_probability: number | null;
  precipitation: number | null;
  weather_code: number | null;
  is_day: number | null;
};

type WeatherApiResponse = {
  current?: WeatherCurrent;
  timezone?: string;
};

const WEATHER_DESCRIPTIONS: Record<number, string> = {
  0: "Céu limpo",
  1: "Parcialmente nublado",
  2: "Parcialmente nublado",
  3: "Nublado",
  45: "Neblina",
  48: "Neblina com nevoeiro",
  51: "Chuvisco leve",
  53: "Chuvisco",
  55: "Chuvisco forte",
  56: "Chuvisco gelado",
  57: "Chuvisco gelado forte",
  61: "Chuva leve",
  63: "Chuva moderada",
  65: "Chuva forte",
  66: "Chuva gelada",
  67: "Chuva gelada forte",
  71: "Neve leve",
  73: "Neve moderada",
  75: "Neve forte",
  77: "Granizo",
  80: "Pancadas de chuva",
  81: "Chuva intensa",
  82: "Chuva muito intensa",
  85: "Neve leve",
  86: "Neve forte",
  95: "Trovoada",
  96: "Trovoada com granizo",
  99: "Trovoada severa",
};

const WEATHER_ICONS: Record<number, string> = {
  0: "☀️",
  1: "🌤️",
  2: "⛅",
  3: "☁️",
  45: "🌫️",
  48: "🌫️",
  51: "🌦️",
  53: "🌦️",
  55: "🌧️",
  56: "🌧️",
  57: "🌧️",
  61: "🌦️",
  63: "🌧️",
  65: "🌧️",
  66: "🌧️",
  67: "🌧️",
  71: "❄️",
  73: "❄️",
  75: "❄️",
  77: "🌨️",
  80: "🌦️",
  81: "🌧️",
  82: "🌧️",
  85: "❄️",
  86: "❄️",
  95: "⛈️",
  96: "⛈️",
  99: "⛈️",
};

const app = document.querySelector<HTMLDivElement>("#app");

if (app) {
  app.innerHTML = `
    <main class="weather-app">
      <section class="weather-shell">
        <header class="topbar">
          <div class="brand-wrap">
            <span class="brand-mark">☼</span>
            <h1>Climora</h1>
          </div>
        </header>

        <section class="search-panel" aria-label="Busca por cidade">
          <label class="sr-only" for="city-input">Digite a cidade</label>
          <div class="search-row">
            <input
              id="city-input"
              type="text"
              placeholder="Digite a cidade"
              aria-label="Digite a cidade"
            />
            <button type="button" class="search-button">Buscar</button>
          </div>
        </section>

        <section class="status-block status-info" aria-live="polite">
          Digite uma cidade para consultar o clima atual.
        </section>

        <section class="weather-card" aria-live="polite">
          <div class="city-row">
            <div>
              <p class="eyebrow">Hoje</p>
              <h2 id="city-name">Informe uma cidade</h2>
            </div>
            <span id="country-tag" class="temp-tag">--</span>
          </div>

          <div class="main-weather">
            <div id="weather-visual" class="weather-visual" aria-hidden="true">☁️</div>
            <div class="temperature-block">
              <div id="temperature" class="temperature">--°</div>
              <div id="weather-description" class="weather-description">Aguardando consulta</div>
            </div>
          </div>

          <div class="meta-row">
            <span id="feels-like">Sensação: --°</span>
            <span>•</span>
            <span id="time-label">Resultado pendente</span>
          </div>
        </section>

        <section class="details-grid" aria-label="Detalhes do clima">
          <article class="detail-card">
            <span class="label">Umidade</span>
            <strong id="humidity">--%</strong>
          </article>
          <article class="detail-card">
            <span class="label">Vento</span>
            <strong id="wind">-- km/h</strong>
          </article>
          <article class="detail-card">
            <span class="label">Chuva</span>
            <strong id="rain-probability">--%</strong>
          </article>
          <article class="detail-card">
            <span class="label">Precipitação</span>
            <strong id="precipitation">-- mm</strong>
          </article>
        </section>
      </section>
    </main>
  `;

  const input = document.querySelector<HTMLInputElement>("#city-input");
  const button = document.querySelector<HTMLButtonElement>(".search-button");
  const statusBlock = document.querySelector<HTMLElement>(".status-block");
  const cityName = document.querySelector<HTMLElement>("#city-name");
  const countryTag = document.querySelector<HTMLElement>("#country-tag");
  const weatherVisual = document.querySelector<HTMLElement>("#weather-visual");
  const temperature = document.querySelector<HTMLElement>("#temperature");
  const weatherDescription = document.querySelector<HTMLElement>("#weather-description");
  const feelsLike = document.querySelector<HTMLElement>("#feels-like");
  const timeLabel = document.querySelector<HTMLElement>("#time-label");
  const humidity = document.querySelector<HTMLElement>("#humidity");
  const wind = document.querySelector<HTMLElement>("#wind");
  const rainProbability = document.querySelector<HTMLElement>("#rain-probability");
  const precipitation = document.querySelector<HTMLElement>("#precipitation");

  const setStatus = (message: string, type: "info" | "error" | "loading" = "info") => {
    if (!statusBlock) return;

    statusBlock.textContent = message;
    statusBlock.classList.remove("status-info", "status-error", "status-loading");
    statusBlock.classList.add(`status-${type}`);
  };

  const getWeatherCodeLabel = (code: number | null) => {
    if (code === null || code === undefined) return "Condição indisponível";
    return WEATHER_DESCRIPTIONS[code] ?? "Condição variável";
  };

  const getWeatherIcon = (code: number | null) => {
    if (code === null || code === undefined) return "☁️";
    return WEATHER_ICONS[code] ?? "🌤️";
  };

  const renderWeatherData = (location: CityLocation, weather: WeatherApiResponse) => {
    const current = (weather.current ?? {}) as WeatherCurrent;

    if (cityName) cityName.textContent = location.name;
    if (countryTag) countryTag.textContent = location.country_code;
    if (temperature) temperature.textContent = `${current.temperature_2m ?? "--"}°`;
    if (weatherDescription) weatherDescription.textContent = getWeatherCodeLabel(current.weather_code ?? null);
    if (weatherVisual) weatherVisual.textContent = getWeatherIcon(current.weather_code ?? null);
    if (feelsLike) feelsLike.textContent = `Sensação: ${current.apparent_temperature ?? "--"}°`;
    if (timeLabel) timeLabel.textContent = weather.timezone ?? "Horário local";
    if (humidity) humidity.textContent = `${current.relative_humidity_2m ?? "--"}%`;
    if (wind) wind.textContent = `${current.wind_speed_10m ?? "--"} km/h`;
    if (rainProbability) rainProbability.textContent = `${current.precipitation_probability ?? "--"}%`;
    if (precipitation) precipitation.textContent = `${current.precipitation ?? "--"} mm`;
  };

  const buildGeoUrl = (city: string) => {
    const params = new URLSearchParams({
      name: city,
      count: "1",
      language: "en",
      format: "json",
    });

    return `https://geocoding-api.open-meteo.com/v1/search?${params.toString()}`;
  };

  const buildWeatherUrl = (latitude: number, longitude: number, timezone: string) => {
    const params = new URLSearchParams({
      latitude: String(latitude),
      longitude: String(longitude),
      current:
        "precipitation_probability,temperature_2m,relative_humidity_2m,is_day,apparent_temperature,wind_speed_10m,wind_direction_10m,precipitation,weather_code",
      timezone,
    });

    return `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
  };

  const handleSearch = async () => {
    const city = input?.value.trim() ?? "";

    if (!city) {
      setStatus("Digite uma cidade antes de consultar.", "error");
      input?.focus();
      return;
    }

    setStatus("Buscando a cidade informada...", "loading");

    try {
      const geoResponse = await fetch(buildGeoUrl(city));

      if (!geoResponse.ok) {
        throw new Error("Falha ao consultar a localização.");
      }

      const geoData = await geoResponse.json();
      const location = geoData.results?.[0] as CityLocation | undefined;

      if (!location) {
        throw new Error("Cidade não encontrada. Tente outro nome.");
      }

      const weatherResponse = await fetch(buildWeatherUrl(location.latitude, location.longitude, location.timezone));

      if (!weatherResponse.ok) {
        throw new Error("Não foi possível buscar o clima dessa cidade.");
      }

      const weatherData = (await weatherResponse.json()) as WeatherApiResponse;
      renderWeatherData(location, weatherData);
      setStatus(`Clima de ${location.name} carregado com sucesso.`, "info");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Não foi possível concluir a busca.";
      setStatus(message, "error");
    }
  };

  button?.addEventListener("click", () => {
    void handleSearch();
  });

  input?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      void handleSearch();
    }
  });
}
