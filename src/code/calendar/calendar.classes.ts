const compIntAsInt = (s1: number, s2: number) => Number(s1 > s2) - Number(s1 < s2)

export interface ETimeLike {
  hours: number
  minutes: number
}

export class ETime implements ETimeLike {
  public readonly hours: number
  public readonly minutes: number

  constructor(code = '') {
    this.hours = 0
    this.minutes = 0
    if (code.length !== 4) return
    const matches = /^(\d{2})(\d{2})$/.exec(code)
    if (!matches || matches.length !== 3) return
    this.hours = Number(matches[1])
    this.minutes = Number(matches[2])
  }

  public toString() {
    return `${this.hours}:${this.minutes.toString().padStart(2, '0')}`
  }

  public compare(other: ETimeLike) {
    let res = compIntAsInt(this.hours, other.hours)
    if (res === 0) res = compIntAsInt(this.minutes, other.minutes)
    return res
  }
}

export class ETimeLite implements ETimeLike {
  public readonly hours: number
  public readonly minutes: number

  constructor(date: Date) {
    this.hours = date.getHours()
    this.minutes = date.getMinutes()
  }
}

export interface EDateLike {
  day: number
  date: number
  month: number
  year: number
}

export class EDate implements EDateLike {
  public static days = ['lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.', 'dim.']
  public static months = [
    'janv.',
    'fév.',
    'mars',
    'avr.',
    'mai',
    'juin',
    'juil.',
    'août',
    'sept.',
    'oct.',
    'nov.',
    'déc.',
  ]

  public readonly day: number
  public readonly date: number
  public readonly month: number
  public readonly year: number

  constructor(code = '') {
    this.day = 0
    this.date = 1
    this.month = 1
    this.year = 2000
    if (code.length !== 9) return
    const matches = /^(\d{4})(\d{2})(\d{2})(\d)$/.exec(code)
    if (!matches || matches.length !== 5) return
    this.year = Number(matches[1])
    this.month = Number(matches[2])
    this.date = Number(matches[3])
    this.day = Number(matches[4])
  }

  public toString(short = false) {
    return short
      ? `${this.date.toString().padStart(2, '0')}/${this.month.toString().padStart(2, '0')}/${this.year}`
      : this.toList().join(' ')
  }

  public toList() {
    return [EDate.days[this.day], this.date.toString(), EDate.months[this.month - 1]]
  }

  public compare(other: EDateLike) {
    let res = compIntAsInt(this.year, other.year)
    if (res === 0) res = compIntAsInt(this.month, other.month)
    if (res === 0) res = compIntAsInt(this.date, other.date)
    return res
  }
}

export class EDateLite implements EDateLike {
  public readonly day: number
  public readonly date: number
  public readonly month: number
  public readonly year: number

  constructor(date: Date) {
    this.day = Math.abs((date.getDay() - 1) % 7)
    this.date = date.getDate()
    this.month = date.getMonth() + 1
    this.year = date.getFullYear()
  }
}

export class EDuration implements ETimeLike {
  public readonly hours: number
  public readonly minutes: number

  constructor(duration = 0) {
    this.hours = Math.floor(duration / 60)
    this.minutes = duration % 60
  }

  public toString() {
    return this.minutes === 0
      ? `${this.hours}h`
      : `${this.hours}h${this.minutes.toString().padStart(2, '0')}`
  }
}
