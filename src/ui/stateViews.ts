import { escapeHtml } from "../utils/domUtils";

/**
 * Renderiza o Empty State Inicial quando a aplicação é carregada pela primeira vez.
 */
export function renderInitialEmptyState(container: HTMLElement): void {
  container.innerHTML = `
    <div class="empty-state">
      <svg class="empty-state-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        <path d="M12 2v2" />
        <path d="M12 6v1" />
      </svg>
      <h2 class="empty-state-title">Consulte o Clima em Qualquer Cidade</h2>
      <p class="empty-state-desc">
        Digite o nome de uma localidade no campo acima para visualizar temperatura, umidade, velocidade do vento e previsões em tempo real.
      </p>
    </div>
  `;
}

/**
 * Renderiza o estado de busca não encontrada para a localidade digitada.
 */
export function renderNotFoundState(container: HTMLElement, cityName: string): void {
  container.innerHTML = `
    <div class="empty-state">
      <svg class="empty-state-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        <line x1="8" y1="11" x2="14" y2="11"></line>
      </svg>
      <h2 class="empty-state-title">Localidade não encontrada</h2>
      <p class="empty-state-desc">
        Não conseguimos encontrar resultados climáticos para "<strong>${escapeHtml(cityName)}</strong>". Verifique a grafia e tente novamente.
      </p>
    </div>
  `;
}

/**
 * Renderiza o spinner de carregamento unificado.
 */
export function renderLoadingState(container: HTMLElement): void {
  container.innerHTML = `
    <div class="loading-state">
      <div class="spinner" aria-label="Carregando dados meteorológicos"></div>
      <p class="loading-text">Buscando informações climáticas...</p>
    </div>
  `;
}
