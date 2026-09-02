export interface AppElements {
  searchForm: HTMLFormElement;
  cityInput: HTMLInputElement;
  searchBtn: HTMLButtonElement;
  feedbackBanner: HTMLDivElement;
  weatherContainer: HTMLDivElement;
  themeToggleBtn: HTMLButtonElement;
  themeIcon: SVGElement;
}

/**
 * Renderiza a casca estrutural base da aplicação e retorna referências aos elementos interativos.
 */
export function renderAppLayout(rootElement: HTMLElement): AppElements {
  rootElement.innerHTML = `
    <!-- Top Bar: Logo e Seletor de Tema -->
    <header class="top-bar">
      <div class="brand">
        <svg class="brand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        </svg>
        <span class="brand-title">Tempira</span>
      </div>
      <button type="button" id="theme-toggle-btn" class="theme-toggle-btn" aria-label="Alternar tema claro e escuro">
        <svg id="theme-icon" class="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <!-- Preenchido dinamicamente pelo ThemeService -->
        </svg>
      </button>
    </header>

    <!-- Área Superior Centralizada: Apenas Busca sem background -->
    <section class="search-container">
      <form id="search-form" class="search-form" role="search">
        <div class="search-input-wrapper">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            id="city-input"
            class="city-input"
            placeholder="Digite o nome da cidade..."
            autocomplete="off"
            aria-label="Nome da cidade para consulta do clima"
          />
        </div>
        <button type="submit" id="search-btn" class="search-btn">
          <span>Buscar</span>
        </button>
      </form>
      <div id="feedback-banner" class="feedback-banner" style="display: none;" role="alert"></div>
    </section>

    <!-- Container Principal com Borda Arredondada (máximo 800px) -->
    <main id="weather-card-container" class="weather-card-container" aria-live="polite">
      <!-- Estados dinâmicos (Empty State, Loading, Weather Data) -->
    </main>
  `;

  return {
    searchForm: rootElement.querySelector<HTMLFormElement>("#search-form")!,
    cityInput: rootElement.querySelector<HTMLInputElement>("#city-input")!,
    searchBtn: rootElement.querySelector<HTMLButtonElement>("#search-btn")!,
    feedbackBanner: rootElement.querySelector<HTMLDivElement>("#feedback-banner")!,
    weatherContainer: rootElement.querySelector<HTMLDivElement>("#weather-card-container")!,
    themeToggleBtn: rootElement.querySelector<HTMLButtonElement>("#theme-toggle-btn")!,
    themeIcon: rootElement.querySelector<SVGElement>("#theme-icon")!,
  };
}

/**
 * Atualiza o ícone SVG e o tooltip do botão de alternância de tema.
 */
export function updateThemeToggleIcon(
  themeIcon: SVGElement,
  themeToggleBtn: HTMLButtonElement,
  isLight: boolean
): void {
  if (isLight) {
    // Modo claro ativo -> ícone de lua para transicionar para escuro
    themeIcon.innerHTML = `
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
    `;
    themeToggleBtn.setAttribute("title", "Alternar para tema escuro");
  } else {
    // Modo escuro ativo -> ícone de sol para transicionar para claro
    themeIcon.innerHTML = `
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2"></path>
      <path d="M12 20v2"></path>
      <path d="m4.93 4.93 1.41 1.41"></path>
      <path d="m17.66 17.66 1.41 1.41"></path>
      <path d="M2 12h2"></path>
      <path d="M20 12h2"></path>
      <path d="m6.34 17.66-1.41 1.41"></path>
      <path d="m19.07 4.93-1.41 1.41"></path>
    `;
    themeToggleBtn.setAttribute("title", "Alternar para tema claro");
  }
}
