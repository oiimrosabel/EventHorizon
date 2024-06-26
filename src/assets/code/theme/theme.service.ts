import { cookiesService } from '@/assets/code/cookies/cookies.service'

export const themeNames = {
  SYSTEM: 'system',
  TIME: 'time',

  DAY: 'sage',
  AFTERNOON: 'solstice',
  EVENING: 'stars',
  NIGHT: 'comet',

  OLED: 'oled'
}

const COOKIE_NAME = 'ade-theme'

export class ThemeService {
  getThemeFromSystem() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? themeNames.EVENING
      : themeNames.DAY
  }

  getThemeFromCookie() {
    return cookiesService.getCookieOrFallback(COOKIE_NAME, themeNames.SYSTEM)
  }

  getThemeBasedOnTime() {
    const hours = new Date().getHours()
    if (hours > 7 && hours <= 13) return themeNames.DAY
    if (hours > 13 && hours <= 15) return themeNames.AFTERNOON
    if (hours > 15 && hours <= 21) return themeNames.EVENING
    else return themeNames.NIGHT
  }

  switchTheme(theme: string) {
    if (!Object.values(themeNames).includes(theme)) return
    let finalTheme = theme
    switch (theme) {
      case themeNames.SYSTEM:
        finalTheme = this.getThemeFromSystem()
        break
      case themeNames.TIME:
        finalTheme = this.getThemeBasedOnTime()
        break
    }
    const head = document.querySelector('html')
    if (!head) return
    head.dataset.theme = finalTheme
    cookiesService.setCookie(COOKIE_NAME, theme)
  }
}

export const themeService = new ThemeService()
