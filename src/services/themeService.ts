import type { ThemeMode } from "../types/theme.types";

const STORAGE_THEME_KEY = "climora_user_theme";

export interface ThemeServiceListener {
  (isLight: boolean): void;
}

class ThemeService {
  private listeners: ThemeServiceListener[] = [];
  private mediaQuery = window.matchMedia("(prefers-color-scheme: light)");

  constructor() {
    this.handleSystemChange = this.handleSystemChange.bind(this);
    this.mediaQuery.addEventListener("change", this.handleSystemChange);
  }

  /**
   * Determina se o modo claro está ativo considerando preferência salva ou do sistema operacional.
   */
  public isLightMode(): boolean {
    const savedTheme = localStorage.getItem(STORAGE_THEME_KEY) as ThemeMode | null;
    if (savedTheme) {
      return savedTheme === "light";
    }
    return this.mediaQuery.matches;
  }

  /**
   * Aplica a classe correspondente no body e notifica ouvintes.
   */
  public applyTheme(): void {
    const isLight = this.isLightMode();
    if (isLight) {
      document.body.classList.add("light-theme");
    } else {
      document.body.classList.remove("light-theme");
    }
    this.notifyListeners(isLight);
  }

  /**
   * Alterna entre modo claro e escuro, persistindo a escolha no localStorage.
   */
  public toggleTheme(): boolean {
    const nextIsLight = !this.isLightMode();
    const newTheme: ThemeMode = nextIsLight ? "light" : "dark";

    localStorage.setItem(STORAGE_THEME_KEY, newTheme);
    this.applyTheme();

    return nextIsLight;
  }

  /**
   * Registra um ouvinte para alterações de tema.
   */
  public subscribe(listener: ThemeServiceListener): () => void {
    this.listeners.push(listener);
    listener(this.isLightMode());

    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private handleSystemChange(): void {
    // Se o usuário não definiu tema explicitamente, reage à mudança do sistema
    if (!localStorage.getItem(STORAGE_THEME_KEY)) {
      this.applyTheme();
    }
  }

  private notifyListeners(isLight: boolean): void {
    this.listeners.forEach((listener) => listener(isLight));
  }
}

export const themeService = new ThemeService();
