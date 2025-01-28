export enum Theme {
  SYSTEM = 'system',
  TIME = 'time',
  DAY = 'day',
  NIGHT = 'night',
  OLED = 'oled',
}

export enum Color {
  BLUE = 'fang',
  PURPLE = 'trish',
  PINK = 'sage',
  RED = 'reed',
  ORANGE = 'rosa',
  PEACH = 'naomi',
  YELLOW = 'lj',
  GREEN = 'stella',
  BLACK = 'naser',
  NAVY = 'nick',
}

export const DEFAULT_THEME = Theme.SYSTEM
export const DEFAULT_COLOR = Color.PURPLE

export const THEME_COOKIE_NAME = 'ade-theme'
export const COLOR_COOKIE_NAME = 'ade-color'
