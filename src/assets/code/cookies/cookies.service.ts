import { CookieError, type sameSiteType } from '@/assets/code/cookies/cookies-interfaces'

class CookiesService {
  sameSite: sameSiteType
  defaultExpiration: number
  private errorCodes = {
    emptyKey: 'Unable to fetch a cookie with an empty key.',
    doesntExist: `The cookie doesn't exist.`
  }

  constructor(sameSite: sameSiteType = 'Lax', defaultExpiration: number = 2) {
    this.defaultExpiration = defaultExpiration
    this.sameSite = sameSite
  }

  hasCookie(key: string): boolean {
    try {
      this.getCookie(key)
      return true
    } catch (_) {
      return false
    }
  }

  setCookie(key: string, value: string, days = this.defaultExpiration) {
    if (key === '') throw new CookieError(this.errorCodes.emptyKey, key)
    const date = new Date()
    date.setTime(date.getTime() + days * 86400 * 1000)
    document.cookie = `${key}=${value}; expires=${date.toUTCString()}; SameSite=${this.sameSite}`
  }

  getCookie(key: string): string {
    if (key === '') throw new CookieError(this.errorCodes.emptyKey, key)
    const cookies = decodeURIComponent(document.cookie).split(new RegExp('; ?'))
    for (const cookie of cookies) {
      const pair = cookie.split('=')
      if (pair[0].trim() === key.trim()) return pair[1]
    }
    throw new CookieError(this.errorCodes.doesntExist, key)
  }

  getCookieOrFallback(key: string, fallback: any): any {
    try {
      return this.getCookie(key)
    } catch (_) {
      return fallback
    }
  }

  getAllCookies(): Map<string, any> {
    const map = new Map<string, any>()
    const cookies = decodeURIComponent(document.cookie).split(new RegExp('; ?'))
    for (const cookie of cookies) {
      const pair = cookie.split('=')
      map.set(pair[0], pair[1])
    }
    return map
  }

  deleteCookie(key: string) {
    if (key === '') throw new CookieError(this.errorCodes.emptyKey, key)
    this.setCookie(key, '; expires=-1')
  }

  deleteAllCookies() {
    const cookies = this.getAllCookies()
    for (const [e, _] of cookies) {
      this.deleteCookie(e)
    }
  }
}

export const cookiesService = new CookiesService('Strict')
