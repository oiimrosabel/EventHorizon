import {
  CalFetchError,
  type CalFetchErrorData,
  type ECalendar,
  type EDay,
  type EDetails,
  type EDuration,
  type ESummary,
  type ETime,
} from "~/services/calendar/calendar.common";
import dateFormat from "dateformat";

const BFF_URL = "/api/adebridge";
const CAL_ID_REGEX = /^\d+$/;
const DEFAULT_WEEKS = "4";

class CalendarService {
  private readonly dateCode: string;
  private readonly timeCode: string;

  constructor() {
    const date = new Date();
    this.dateCode = dateFormat(date, "mmdd");
    this.timeCode = dateFormat(date, "HHMM");
  }

  async fetchCalendar(calId: string) {
    const { data, error } = await useFetch<ECalendar>(BFF_URL, {
      method: "post",
      body: {
        cal: calId,
        weeks: DEFAULT_WEEKS,
      },
    });
    if (error.value && error.value.data) {
      const errorData = error.value.data as CalFetchErrorData;
      throw new CalFetchError(errorData.statusCode, errorData.message);
    }
    if (!data.value) throw new CalFetchError(500, "Calendrier corrompu.");
    return data.value;
  }

  isCalIdValid(id: string) {
    return CAL_ID_REGEX.test(id);
  }

  createSummary(cal: ECalendar): ESummary | undefined {
    const today = this.getToday(cal);
    if (!today) return undefined;
    return {
      current: this.getCurrentCourse(today),
      next: this.getNextCourse(today),
      length: today.events.length,
      duration: this.getDuration(today.duration),
      types: this.getTypes(today),
      progression: this.getDayProgression(today),
    };
  }

  getProgression(event1?: EDetails, event2?: EDetails) {
    if (!event1 || !event2) return 0;
    const startCoef = this.getTimeCoefficient(event1.start);
    const endCoef = this.getTimeCoefficient(event2.end);
    const currCoef = this.getTimeCoefficient({
      h: this.timeCode.slice(0, 2),
      m: this.timeCode.slice(2, 4),
    });
    return Math.min(
      Math.max(
        Math.floor(((currCoef - startCoef) / (endCoef - startCoef)) * 100),
        0,
      ),
      100,
    );
  }

  isHappening(event?: EDetails) {
    if (!event || !this.happensToday(event)) return false;
    const startCode = `${event.start.h}${event.start.m}`;
    const endCode = `${event.end.h}${event.end.m}`;
    return startCode < this.timeCode && this.timeCode < endCode;
  }

  private happensToday(event?: EDetails) {
    return event && event.id.slice(0, 4) === this.dateCode;
  }

  private getTimeCoefficient(time: ETime) {
    return Number(time.h) + Number(time.m) / 60;
  }

  private getDayProgression(day: EDay) {
    return this.getProgression(
      day.events[0],
      day.events[day.events.length - 1],
    );
  }

  private getToday(cal: ECalendar) {
    if (!cal) return undefined;
    const supposedDay = cal.days[0];
    return supposedDay &&
      supposedDay.id == this.dateCode &&
      supposedDay.events.length !== 0
      ? supposedDay
      : undefined;
  }

  private getDuration(time: EDuration) {
    return `${time.h}h${time.m === 0 ? "" : time.m}`;
  }

  private getCurrentCourse(day: EDay) {
    for (const e of day.events) if (this.isHappening(e)) return e;
    return undefined;
  }

  private getNextCourse(day: EDay) {
    for (const event of day.events)
      if (this.timeCode < `${event.start.h}${event.start.m}`) return event;
    return undefined;
  }

  private getTypes(day: EDay) {
    const stats = new Map<string, number>();
    for (const event of day.events) {
      let type = event.title.type;
      if (!type) type = "Autre";
      stats.set(type, (stats.get(type) ?? 0) + 1);
    }
    return stats;
  }
}

export const calendarService = new CalendarService();
