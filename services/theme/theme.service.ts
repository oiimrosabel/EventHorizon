import {
  type Color,
  COLOR_COOKIE_NAME,
  DEFAULT_COLOR,
  DEFAULT_THEME,
  Theme,
  THEME_COOKIE_NAME,
} from "~/services/theme/theme-commons";

class ThemeService {
  setThemeFromCookie() {
    this.setTheme(this.getThemeFromCookie());
  }

  setColorFromCookie() {
    this.setColor(this.getColorFromCookie());
  }

  setTheme(theme: Theme) {
    let themeToApply = theme;
    if (theme == Theme.SYSTEM) themeToApply = this.getThemeFromSystem();
    else if (theme == Theme.TIME) themeToApply = this.getThemeBasedOnTime();
    document.querySelector("html")!.dataset.theme = themeToApply;
    localStorage.setItem(THEME_COOKIE_NAME, theme);
  }

  setColor(color: Color) {
    document.querySelector("html")!.dataset.color = color;
    localStorage.setItem(COLOR_COOKIE_NAME, color);
  }

  private getThemeFromCookie() {
    return (localStorage.getItem(THEME_COOKIE_NAME) as Theme) ?? DEFAULT_THEME;
  }

  private getThemeFromSystem() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? Theme.NIGHT
      : Theme.DAY;
  }

  private getThemeBasedOnTime() {
    return new Date().getHours() <= 12 ? Theme.DAY : Theme.NIGHT;
  }

  private getColorFromCookie() {
    return (localStorage.getItem(COLOR_COOKIE_NAME) as Color) ?? DEFAULT_COLOR;
  }
}

export const themeService = new ThemeService();
