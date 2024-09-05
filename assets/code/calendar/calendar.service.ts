import type {
  Calendar,
  CourseStats,
  Day,
  Event,
  FormatedCalendar,
} from "@/assets/code/calendar/calendar-interfaces";
import links from "@/assets/data/links.json";
import dateFormat from "dateformat";
import type { Ref } from "vue";

const BFF_URL = links.bff;

const TYPE_REGEX = /^(CC|CM|TP|TD).*$/i;

class CalendarService {
  private readonly date: Date;

  constructor() {
    this.date = new Date();
  }

  isValidId(id: string) {
    return /^\d+$/.test(id);
  }

  async getCalendar(calendar: string) {
    const fetchedCalendar = await this.fetchCalendar(calendar);
    if (!fetchedCalendar) return undefined;
    return this.formatCalendar(fetchedCalendar.value);
  }

  formatTitle(title: Array<string>) {
    return title.length === 1
      ? title[0]
      : `<span>${title[1]}</span> ${title[0].slice(title[1].length)}`;
  }

  isHappening(event: Event) {
    const currentDay = this.getCurrentDay("d");
    if (event.date[1] !== currentDay) return false;
    const currentTime = this.getCurrentTime();
    return (
      event.start.join("") <= currentTime && currentTime <= event.end.join("")
    );
  }

  getTodayEvents(calendar: Calendar) {
    if (!calendar) return undefined;
    const presumedDay = calendar[this.getCurrentDay()];
    return !presumedDay ? undefined : presumedDay;
  }

  getCurrentCourse(day?: Day) {
    if (!day) return undefined;
    for (const event of day) if (this.isHappening(event)) return event;
    return undefined;
  }

  getNextCourse(calendar?: Calendar) {
    if (!calendar) return undefined;
    const todayEvents = this.getTodayEvents(calendar);
    const currentTime = this.getCurrentTime();
    if (todayEvents)
      for (const event of todayEvents)
        if (currentTime < event.start.join("")) return event;
    return undefined;
  }

  getNumberOfCoursesToday(day?: Day) {
    if (!day) return 0;
    return day.length;
  }

  getDayLenght(day?: Day) {
    if (!day) return "0h";
    let hours = 0;
    let minutes = 0;
    day.forEach((e) => {
      hours += Number(e.duration[0]);
      minutes += Number(e.duration[1]);
    });
    hours += Math.round(minutes / 60);
    minutes %= 60;
    return `${hours}h${minutes === 0 ? "" : minutes}`;
  }

  getCoursesTypes(day?: Day) {
    const stats: CourseStats = {
      CM: 0,
      TD: 0,
      TP: 0,
      CC: 0,
    };
    if (!day) return stats;
    for (const event of day) {
      const extractedType = this.getCourseType(event.title[1]);
      if (extractedType) stats[extractedType as keyof CourseStats] += 1;
    }
    return stats;
  }

  getCourseType(type: string) {
    const matches = TYPE_REGEX.exec(type);
    if (!matches || !matches[1]) return undefined;
    return matches[1];
  }

  private async fetchCalendar(calendar: string) {
    let result: { data: object };
    try {
      result = await useFetch(BFF_URL, {
        method: "post",
        body: {
          cal: calendar,
          weeks: "8",
        },
      });
    } catch (err: any) {
      return undefined;
    }
    return result.data as Ref<Calendar>;
  }

  private getCurrentDay(format = "mmdd") {
    return dateFormat(this.date, format);
  }

  private getCurrentTime(format = "HHMM") {
    return dateFormat(this.date, format);
  }

  private formatCalendar(calendar?: Calendar): FormatedCalendar | undefined {
    if (!calendar || Object.keys(calendar).length === 0) return undefined;
    const today = this.getTodayEvents(calendar);
    return {
      calendar: calendar,
      current: this.getCurrentCourse(today),
      next: this.getNextCourse(calendar),
      length: this.getNumberOfCoursesToday(today),
      duration: this.getDayLenght(today),
      types: this.getCoursesTypes(today),
    };
  }
}

export const calendarService = new CalendarService();
