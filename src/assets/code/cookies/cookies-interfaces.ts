export class CookieError extends Error {
  public key: string

  constructor(message: string, key: string) {
    super(message)
    this.key = key
  }
}

export type sameSiteType = 'strict' | 'Strict' | 'lax' | 'Lax' | 'none' | 'None' | undefined
