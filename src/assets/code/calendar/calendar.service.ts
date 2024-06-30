import axios, { type AxiosResponse } from 'axios'
import type {
  Calendar,
  CourseStats,
  Day,
  Event,
  FormatedCalendar
} from '@/assets/code/calendar/calendar-interfaces'
import links from '@/assets/data/links.json'
import dateFormat from 'dateformat'
//import dummy from '../../../../test-assets/data.test.json'

const BFF_URL = links.bff

class CalendarService {
  private readonly date: Date

  constructor() {
    this.date = new Date()
  }

  async getCalendar(calendar: string) {
    return this.formatCalendar(await this.fetchCalendar(calendar))
    //return this.formatCalendar(dummy)
  }

  formatTitle(title: Array<string>) {
    return title.length === 1 ? title[0] : `<span>${title[1]}</span> ${title[0]}`
  }

  isHappening(event: Event) {
    const currentDay = this.getCurrentDay('dd')
    if (event.date[1] !== currentDay) return false
    const currentTime = this.getCurrentTime()
    return event.start.join('') <= currentTime && currentTime <= event.end.join('')
  }

  getTodayEvents(calendar: Calendar) {
    if (!calendar) return undefined
    const presumedDay = calendar[this.getCurrentDay()]
    return !presumedDay ? undefined : presumedDay
  }

  getCurrentCourse(day?: Day) {
    if (!day) return undefined
    for (const event of day) if (this.isHappening(event)) return event
    return undefined
  }

  getNextCourse(calendar?: Calendar) {
    if (!calendar) return undefined
    const todayEvents = this.getTodayEvents(calendar)
    const currentDay = this.getCurrentDay()
    const currentTime = this.getCurrentTime()
    if (todayEvents)
      for (const event of todayEvents) if (currentTime < event.start.join('')) return event
    for (const e in calendar) if (e > currentDay && e.length !== 0) return calendar[e][0]
    return undefined
  }

  getNumberOfCoursesToday(day?: Day) {
    if (!day) return 0
    return day.length
  }

  getDayLenght(day?: Day) {
    if (!day) return '0h'
    let hours = 0
    let minutes = 0
    day.forEach((e) => {
      hours += Number(e.duration[0])
      minutes += Number(e.duration[1])
    })
    hours += Math.round(minutes / 60)
    minutes %= 60
    return `${hours}h${minutes === 0 ? '' : minutes}`
  }

  getCoursesTypes(day?: Day) {
    const stats: CourseStats = {
      CM: 0,
      TD: 0,
      TP: 0,
      CC: 0
    }
    if (!day) return stats
    const types = Object.keys(stats)
    for (const event of day)
      if (types.includes(event.title[1])) stats[event.title[1] as keyof CourseStats] += 1
    return stats
  }

  private async fetchCalendar(calendar: string) {
    const request = new FormData()
    request.append('cal', calendar)
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

  private formatCalendar(calendar?: Calendar): FormatedCalendar | undefined {
    if (!calendar || Object.keys(calendar).length === 0) return undefined
    const today = this.getTodayEvents(calendar)
    return {
      calendar: calendar,
      current: this.getCurrentCourse(today),
      next: this.getNextCourse(calendar),
      length: this.getNumberOfCoursesToday(today),
      duration: this.getDayLenght(today),
      types: this.getCoursesTypes(today)
    }
  }
}

export const calendarService = new CalendarService()
