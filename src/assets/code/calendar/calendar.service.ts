import axios, { type AxiosResponse } from 'axios'
import type { Calendar, Day, Event } from '@/assets/code/calendar/calendar-interfaces'
import links from '@/assets/data/links.json'
import dateFormat from 'dateformat'

const BFF_URL = links.bff

class CalendarService {
  private readonly date: Date

  constructor() {
    this.date = new Date()
  }

  async getCalendar(calendar: string) {
    const res = await this.fetchCalendar(Number(calendar))
    if (!res) return undefined
    const today = this.getTodayEvents(res)
    return {
      calendar: res,
      current: this.getCurrentCourse(today),
      next: this.getNextCourse(res),
      lenght: this.getNumberOfCoursesToday(today),
      duration: this.getDayLenght(today),
      types: this.getCoursesTypes(today)
    }
  }

  getEventTypeAsSpanner(text: string) {
    const res = text.match('^((?:CM|TD|TP|CC)[0-9]{0,1})(.*)$')
    return res ? `<span class="small">${res[1]}</span>${res[2]}` : text
  }

  isHappening(event: Event) {
    const currentDay = this.getCurrentDay('dd')
    if (event.date[1] !== currentDay) return false
    const currentTime = this.getCurrentTime()
    return event.start.join('') <= currentTime && currentTime <= event.end.join('')
  }

  getTodayEvents(calendar: Calendar) {
    if (!calendar || !calendar[0]) return undefined
    const presumedDay = calendar[0]
    if (!presumedDay[0]) return undefined
    return presumedDay[0].date[1] === this.getCurrentDay('dd') ? presumedDay : undefined
  }

  getCurrentCourse(day?: Day) {
    if (!day) return undefined
    for (const event of day) if (this.isHappening(event)) return event
    return undefined
  }

  getNextCourse(calendar?: Calendar) {
    if (!calendar) return undefined
    const todayEvents = this.getTodayEvents(calendar)
    const currentTime = this.getCurrentTime()
    if (!todayEvents) return !calendar[0] ? undefined : calendar[0][0]
    for (const event of todayEvents) if (currentTime < event.start.join('')) return event
    return undefined
  }

  getNumberOfCoursesToday(day?: Day) {
    if (!day) return 0
    return day.length
  }

  getDayLenght(day?: Day) {
    if (!day) return [0, 0]
    let hours = 0
    let minutes = 0
    day.forEach((e) => {
      hours += Number(e.duration[0])
      minutes += Number(e.duration[1])
    })
    hours += Math.round(minutes / 60)
    minutes %= 60
    return [hours, minutes]
  }

  getCoursesTypes(day?: Day) {
    const stats: { [e: string]: number } = {
      CM: 0,
      TD: 0,
      TP: 0,
      CC: 0
    }
    if (!day) return stats
    const types = Object.keys(stats)
    for (const event of day)
      for (const type of types) if (event.title.startsWith(type)) stats[type] += 1
    return stats
  }

  private async fetchCalendar(calendar: number) {
    const request = new FormData()
    request.append('cal', `${calendar}`)
    request.append('weeks', '8')
    let result: AxiosResponse<any, any>
    try {
      result = await axios.post(BFF_URL, request)
    } catch (err: any) {
      return undefined
    }
    return result.data as Calendar
  }

  private getCurrentDay(format = 'ddmm') {
    return dateFormat(this.date, format)
  }

  private getCurrentTime(format = 'HHmm') {
    return dateFormat(this.date, format)
  }
}

export const calendarService = new CalendarService()
