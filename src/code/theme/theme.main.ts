import {
  type Color,
  COLOR_COOKIE_NAME,
  DEFAULT_COLOR,
  DEFAULT_THEME,
  Theme,
  THEME_COOKIE_NAME,
} from '@/code/theme/theme.commons.ts'

export const initTheme = () => setTheme(getThemeFromCookie())

export const initColor = () => setColor(getColorFromCookie())

export const setTheme = (theme: Theme) => {
  let themeToApply = theme
  if (theme == Theme.SYSTEM) themeToApply = getThemeFromSystem()
  else if (theme == Theme.TIME) themeToApply = getThemeBasedOnTime()
  document.querySelector('html')!.dataset.theme = themeToApply
  localStorage.setItem(THEME_COOKIE_NAME, theme)
}

export const setColor = (color: Color) => {
  document.querySelector('html')!.dataset.color = color
  localStorage.setItem(COLOR_COOKIE_NAME, color)
}

const getThemeFromCookie = () => (localStorage.getItem(THEME_COOKIE_NAME) as Theme) ?? DEFAULT_THEME

const getThemeFromSystem = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.NIGHT : Theme.DAY

const getThemeBasedOnTime = () => {
  const now = new Date().getHours()
  return now >= 8 && now <= 16 ? Theme.DAY : Theme.NIGHT
}

const getColorFromCookie = () => (localStorage.getItem(COLOR_COOKIE_NAME) as Color) ?? DEFAULT_COLOR
