import {
  EDate,
  EDateLite,
  EDuration,
  ETime,
  type ETimeLike,
  ETimeLite,
} from '@/code/calendar/calendar.classes.ts'
import type { RCalendar, RDay, REvent } from '@/code/fetch/fetch.common.ts'
import type { IESummary } from '@/code/calendar/calendar.commons.ts'

const now = new Date()
const nowTime = new ETimeLite(now)
const nowDate = new EDateLite(now)

const getTimeCoefficient = (time: ETimeLike) => time.hours * 60 + time.minutes

const getProgression = (start: ETimeLike, end: ETimeLike) => {
  const stCo = getTimeCoefficient(start)
  const edCo = getTimeCoefficient(end)
  const nwCo = getTimeCoefficient(nowTime)
  return Math.round(Math.min(Math.max(((nwCo - stCo) / (edCo - stCo)) * 100, 0), 100))
}

export class EEvent {
  public readonly start: ETime
  public readonly end: ETime
  public readonly duration: EDuration
  public readonly title: {
    type: string
    subject: string
  }
  public readonly locations: string[]
  public readonly teachers: string[]
  public readonly parent: EDay | undefined

  constructor(rawEvent: REvent, parent?: EDay) {
    this.start = new ETime(rawEvent.s)
    this.end = new ETime(rawEvent.e)
    this.duration = new EDuration(rawEvent.dr)
    this.title = {
      type: rawEvent.tt.t,
      subject: rawEvent.tt.s,
    }
    this.locations = rawEvent.lc
    this.teachers = rawEvent.tc
    this.parent = parent
  }

  public isNow() {
    if (!this.parent) return false
    return (
      this.parent.date.compare(nowDate) === 0 &&
      this.start.compare(nowTime) <= 0 &&
      this.end.compare(nowTime) >= 0
    )
  }

  public getProgression() {
    return getProgression(this.start, this.end)
  }
}

export class EDay {
  public readonly events: EEvent[]
  public readonly date: EDate
  public readonly duration: EDuration
  public readonly length: number

  constructor(rawDay: RDay) {
    this.date = new EDate(rawDay.d)
    this.duration = new EDuration(rawDay.dr)
    const events: EEvent[] = []
    rawDay.e.forEach((e) => events.push(new EEvent(e, this)))
    this.events = events
    this.length = events.length
  }

  public isNow() {
    return this.date.compare(nowDate) === 0
  }

  public getProgression() {
    return this.length === 0
      ? 0
      : getProgression(this.events[0].start, this.events[this.length - 1].end)
  }
}

export class ESummary implements IESummary {
  public readonly current: EEvent | undefined
  public readonly next: EEvent | undefined
  public readonly length: number
  public readonly duration: EDuration
  public readonly types: Map<string, number>
  public readonly progression: number

  constructor(day: EDay) {
    this.current = this.getCurrentEvent(day.events)
    this.next = this.getNextEvent(day.events)
    this.length = day.length
    this.duration = day.duration
    this.types = this.getEventTypes(day.events)
    this.progression = day.getProgression()
  }

  private getCurrentEvent(events: EEvent[]) {
    for (const e of events) if (e.isNow()) return e
    return undefined
  }

  private getNextEvent(events: EEvent[]) {
    for (const e of events) if (e.start.compare(nowTime) > 0) return e
    return undefined
  }

  private getEventTypes(events: EEvent[]) {
    const stats = new Map<string, number>()
    for (const event of events) {
      let type = event.title.type
      if (!type) type = 'Autre'
      stats.set(type, (stats.get(type) ?? 0) + 1)
    }
    return stats
  }
}

export class ELog {
  public readonly dateUpdated: EDate
  public readonly timeUpdated: ETime
  public readonly weeks: number

  public constructor(calendar?: RCalendar) {
    if (!calendar) {
      this.dateUpdated = new EDate()
      this.timeUpdated = new ETime()
      this.weeks = 0
      return
    }
    this.weeks = calendar.u.w
    this.dateUpdated = new EDate(calendar.u.dt.slice(0, 9))
    this.timeUpdated = new ETime(calendar.u.dt.slice(9))
  }
}

export class ECalendar {
  public readonly log: ELog
  public readonly days: EDay[]

  constructor(rawCalendar?: RCalendar) {
    if (!rawCalendar) {
      this.log = new ELog()
      this.days = []
      return
    }
    const days: EDay[] = []
    rawCalendar.d.forEach((e) => days.push(new EDay(e)))
    this.days = days
    this.log = new ELog(rawCalendar)
  }

  public getToday() {
    const supposedDay = this.days[0]
    return supposedDay && supposedDay.isNow() && supposedDay.length > 0 ? supposedDay : undefined
  }

  public getSummary() {
    const today = this.getToday()
    if (!today) return undefined
    return new ESummary(today)
  }
}
