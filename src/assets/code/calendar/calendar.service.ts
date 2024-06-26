import axios, { type AxiosResponse } from 'axios'
import type { Calendar, Event } from '@/assets/code/calendar/calendar-interfaces'
import dateFormat from 'dateformat'

const BFF_URL = 'https://horizon.blahaj.land/api/'

class CalendarService {
  async getCalendar(calendar: string) {
    const res = await this.fetchCalendar(Number(calendar))
    if (!res) {
      return undefined
    }
    const today = this.getDayEvents(res)
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
    const today = this.getCurrentDay('dd')
    if (event.date[1] !== today) return false
    const now = this.getCurrentTime()
    return event.start <= now && now <= event.end
  }

  getDayEvents(calendar: Calendar) {
    const currentDay = this.getCurrentDay()
    return calendar[currentDay]
  }

  getCurrentCourse(day: Array<Event>) {
    for (const event of day) if (this.isHappening(event)) return event
    return undefined
  }

  getNextCourse(calendar: Calendar) {
    const today = this.getDayEvents(calendar)
    if (!today) return undefined
    const currentHour = this.getCurrentTime()
    for (const event of today) if (currentHour < event.start) return event
    const nextDay = calendar[this.getTomorrow()]
    return !nextDay ? undefined : nextDay[0]
  }

  getNumberOfCoursesToday(day: Array<Event>) {
    return day.length
  }

  getDayLenght(day: Array<Event>) {
    let hours = 0
    let minutes = 0
    day.forEach((e) => {
      const duration = e.duration.split('h')
      if (!duration[1]) duration[1] = '0'
      hours += Number(duration[0])
      minutes += Number(duration[1])
    })
    hours += Math.round(minutes / 60)
    minutes %= 60
    return [hours, minutes]
  }

  getCoursesTypes(day: Array<Event>) {
    const stats: { [e: string]: number } = {
      CM: 0,
      TD: 0,
      TP: 0,
      CC: 0
    }
    const types = Object.keys(stats)
    day.forEach((e) => {
      types.forEach((t) => {
        if (e.title.startsWith(t)) {
          stats[t] += 1
        }
      })
    })
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

  private getCurrentDay(format = 'dd-mm') {
    const now = new Date()
    return dateFormat(now, format)
  }

  private getTomorrow(format = 'dd-mm') {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return dateFormat(tomorrow, format)
  }

  private getCurrentTime(format = 'HH:mm') {
    const now = new Date()
    return dateFormat(now, format)
  }
}

export const calendarService = new CalendarService()
