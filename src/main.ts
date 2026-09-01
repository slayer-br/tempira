import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app");

if (app) {
  app.innerHTML = `
    <main class="weather-app">
      <section class="weather-shell">
        <header class="topbar">
          <div class="brand-wrap">
            <span class="brand-mark">☼</span>
            <h1>Clima</h1>
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
              <h2>Rio de Janeiro</h2>
            </div>
            <span class="temp-tag">BR</span>
          </div>

          <div class="main-weather">
            <div class="weather-visual" aria-hidden="true">☀️</div>
            <div class="temperature-block">
              <div class="temperature">27°</div>
              <div class="weather-description">Ensolarado</div>
            </div>
          </div>

          <div class="meta-row">
            <span>Sensação: 29°</span>
            <span>•</span>
            <span>Atualizado agora</span>
          </div>
        </section>

        <section class="details-grid" aria-label="Detalhes do clima">
          <article class="detail-card">
            <span class="label">Umidade</span>
            <strong>68%</strong>
          </article>
          <article class="detail-card">
            <span class="label">Vento</span>
            <strong>18 km/h</strong>
          </article>
          <article class="detail-card">
            <span class="label">Chuva</span>
            <strong>12%</strong>
          </article>
          <article class="detail-card">
            <span class="label">Precipitação</span>
            <strong>0,2 mm</strong>
          </article>
        </section>
      </section>
    </main>
  `;

  const input = document.querySelector<HTMLInputElement>("#city-input");
  const button = document.querySelector<HTMLButtonElement>(".search-button");
  const statusBlock = document.querySelector<HTMLElement>(".status-block");

  const setStatus = (message: string, type: "info" | "error" | "loading" = "info") => {
    if (!statusBlock) return;

    statusBlock.textContent = message;
    statusBlock.classList.remove("status-info", "status-error", "status-loading");
    statusBlock.classList.add(`status-${type}`);
  };

  button?.addEventListener("click", () => {
    const city = input?.value.trim() ?? "";

    if (!city) {
      setStatus("Digite uma cidade antes de consultar.", "error");
      input?.focus();
      return;
    }

    setStatus("Buscando o clima da cidade informada...", "loading");
  });
}
