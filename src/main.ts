import "./style.css";
import {
  renderAppLayout,
  updateThemeToggleIcon,
  renderInitialEmptyState,
  renderLoadingState,
  renderNotFoundState,
  renderWeatherCard,
  showFeedback,
} from "./ui";
import { searchCityWeather } from "./services/weatherService";
import { themeService } from "./services/themeService";

function initApp(): void {
  const root = document.querySelector<HTMLDivElement>("#app");
  if (!root) {
    throw new Error("Elemento raiz #app não foi encontrado no documento.");
  }

  // 1. Renderiza a estrutura básica e obtém referências tipadas dos nós
  const ui = renderAppLayout(root);

  // 2. Conecta o gerenciador de tema com a UI
  themeService.subscribe((isLight) => {
    updateThemeToggleIcon(ui.themeIcon, ui.themeToggleBtn, isLight);
  });

  themeService.applyTheme();

  ui.themeToggleBtn.addEventListener("click", () => {
    themeService.toggleTheme();
  });

  // 3. Renderiza o Empty State Inicial
  renderInitialEmptyState(ui.weatherContainer);

  // 4. Tratamento do fluxo de busca com controle de concorrência
  let isSearching = false;

  async function handleSearch(): Promise<void> {
    const query = ui.cityInput.value.trim();

    if (!query) {
      showFeedback(ui.feedbackBanner, "Por favor, digite o nome de uma cidade.");
      ui.cityInput.focus();
      return;
    }

    if (isSearching) return;
    isSearching = true;

    ui.searchBtn.disabled = true;
    ui.cityInput.disabled = true;

    renderLoadingState(ui.weatherContainer);

    try {
      const result = await searchCityWeather(query);

      if (!result) {
        renderNotFoundState(ui.weatherContainer, query);
      } else {
        renderWeatherCard(ui.weatherContainer, result.location, result.weather);
      }
    } catch {
      renderNotFoundState(ui.weatherContainer, query);
    } finally {
      isSearching = false;
      ui.searchBtn.disabled = false;
      ui.cityInput.disabled = false;
      ui.cityInput.focus();
    }
  }

  ui.searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    void handleSearch();
  });
}

// Inicializa a aplicação
initApp();
