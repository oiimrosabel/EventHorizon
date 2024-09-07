import { cookiesService } from "@/assets/code/cookies/cookies.service";
import { currentContext } from "unplugin-vue-router/runtime";

export const themeNames = {
  SYSTEM: "system",
  TIME: "time",
  DAY: "light",
  NIGHT: "dark",
  OLED: "oled",
};

export const colorNames = {
  BLUE: "fang",
  PURPLE: "trish",
  PINK: "sage",
  RED: "reed",
  ORANGE: "rosa",
  PEACH: "naomi",
  YELLOW: "energix",
  GREEN: "stella",
  BLACK: "naser",
};

const DEFAULT_THEME = themeNames.SYSTEM;
const DEFAULT_COLOR = colorNames.PURPLE;

const THEME_COOKIE_NAME = "ade-theme";
const COLOR_COOKIE_NAME = "ade-color";

export class ThemeService {
  private currentTheme: string;
  private currentColor: string;
  private contrastIssues: Map;

  constructor() {
    this.currentTheme = DEFAULT_THEME;
    this.currentColor = DEFAULT_COLOR;
    this.contrastIssues = new Map<string, string[]>();

    this.contrastIssues
      .set(themeNames.DAY, [colorNames.YELLOW, colorNames.PEACH])
      .set(themeNames.NIGHT, [colorNames.BLACK])
      .set(themeNames.OLED, [colorNames.BLACK]);
  }

  getThemeFromSystem() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? themeNames.NIGHT
      : themeNames.DAY;
  }

  getThemeFromCookie() {
    return cookiesService.getCookieOrFallback(THEME_COOKIE_NAME, DEFAULT_THEME);
  }

  getThemeBasedOnTime() {
    return new Date().getHours() <= 12 ? themeNames.DAY : themeNames.NIGHT;
  }

  switchTheme(theme: string) {
    if (!Object.values(themeNames).includes(theme)) return;
    let appliedTheme = theme;
    switch (theme) {
      case themeNames.SYSTEM:
        appliedTheme = this.getThemeFromSystem();
        break;
      case themeNames.TIME:
        appliedTheme = this.getThemeBasedOnTime();
        break;
    }
    const head = document.querySelector("html");
    if (!head) return;
    head.dataset.theme = appliedTheme;
    this.currentTheme = appliedTheme;
    cookiesService.setCookie(THEME_COOKIE_NAME, theme, 32);
  }

  getColorFromCookie() {
    return cookiesService.getCookieOrFallback(COLOR_COOKIE_NAME, DEFAULT_COLOR);
  }

  switchColor(color: string) {
    if (!Object.values(colorNames).includes(color)) return;
    const head = document.querySelector("html");
    if (!head) return;
    head.dataset.color = color;
    this.currentColor = color;
    cookiesService.setCookie(COLOR_COOKIE_NAME, color, 32);
  }

  private hasContrastIssues(theme: string, color: string) {
    if (this.contrastIssues.has(theme))
      return this.contrastIssues.get(theme).includes(color);
    return false;
  }

  checkContrast() {
    return this.hasContrastIssues(this.currentTheme, this.currentColor);
  }
}

export const themeService = new ThemeService();
