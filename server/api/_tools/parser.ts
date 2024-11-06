import type Tokenizr from "tokenizr";
import {
  EVENTEND,
  EVENTSTART,
  LOCATION,
  SUMMARY,
  TEACHERS,
  TIMEEND,
  TIMESTART,
  VCALEND,
  VCALSTART,
} from "~/server/api/_tools/common";
import { iCalLexer } from "~/server/api/_tools/lexer";
import dateFormat from "dateformat";
import type {
  ECalendar,
  EDate,
  EDay,
  EDetails,
  EDuration,
  ETime,
  ETitle,
} from "~/services/calendar/calendar.common";
import { formatService } from "~/services/format/format.service";

const TIME_LOCALE = "FR-fr";

const defaultEDuration: EDuration = {
  h: 0,
  m: 0,
};

const compareEvents = (e1: EDetails, e2: EDetails) =>
  Number(e1.id > e2.id) - Number(e1.id < e2.id);

const compareDays = (d1: EDay, d2: EDay) =>
  Number(d1.id > d2.id) - Number(d1.id < d2.id);

export class iCalParser {
  private lexer: Tokenizr;
  private readonly now: Date;
  private readonly weeks: number;

  constructor(weeks: number) {
    this.lexer = iCalLexer;
    this.now = new Date();
    this.weeks = weeks;
  }

  parseCal(data: string): ECalendar | undefined {
    this.lexer.input(data);

    let t = this.nextToken();
    if (t.type !== VCALSTART) return undefined;

    t = this.nextToken();

    const calMap = new Map<string, EDay>();
    const dayIndex = new Date(this.now);
    for (let day = 0; day < this.weeks * 7; day += 1) {
      if (dayIndex.getDay() !== 0) {
        const dayEDate = this.formatDate(dayIndex);
        calMap.set(this.createDayId(dayEDate), {
          date: dayEDate,
          id: this.createDayId(dayEDate),
          duration: defaultEDuration,
          events: [],
        });
      }
      dayIndex.setDate(dayIndex.getDate() + 1);
    }

    while (t.type === EVENTSTART) {
      const event = this.parseEvent();
      if (!event) return undefined;
      t = this.nextToken();
      const key = event.id.slice(0, 4);
      const calDay = calMap.get(key);
      if (calDay) calDay.events.push(event);
    }

    if (t.type !== VCALEND) return undefined;

    const calList: EDay[] = [];

    for (const day of calMap.values()) {
      day.events.sort(compareEvents);

      const duration: EDuration = {
        h: 0,
        m: 0,
      };

      day.events.forEach((e) => {
        duration.h += e.duration.h;
        duration.m += e.duration.m;
        delete e.date;
      });

      duration.h += Math.floor(duration.m / 60);
      duration.m = formatService.modulo(duration.m, 60);
      day.duration = duration;

      calList.push(day);
    }

    return {
      lastUpdated: {
        date: this.formatDate(this.now),
        time: this.formatHour(this.now),
        weeks: this.weeks,
      },
      days: calList.sort(compareDays),
    };
  }

  private nextToken() {
    return this.lexer.token();
  }

  private formatHour(date: Date): ETime {
    return {
      h: dateFormat(date, "HH"),
      m: dateFormat(date, "MM"),
    };
  }

  private formatDate(date: Date): EDate {
    return {
      day: {
        dg: date.toLocaleString(TIME_LOCALE, { day: "2-digit" }),
        nm: date.toLocaleString(TIME_LOCALE, { weekday: "short" }),
      },
      month: {
        dg: date.toLocaleString(TIME_LOCALE, { month: "2-digit" }),
        nm: date.toLocaleString(TIME_LOCALE, { month: "short" }),
      },
    };
  }

  private getDuration(date1: Date, date2: Date): EDuration {
    const diff = new Date(date2.getTime() - date1.getTime());
    return {
      h: diff.getHours() - 1,
      m: diff.getMinutes(),
    };
  }

  private createEventId(date: Date): string {
    return dateFormat(date, `mmddHHMM`);
  }

  private createDayId(date: EDate): string {
    return `${date.month.dg}${date.day.dg}`;
  }

  private formatTitle(data: string[]): ETitle {
    return {
      raw: data[0],
      type: data[1],
      domain: data[2],
    };
  }

  private parseEvent() {
    let t = this.nextToken();
    const res = {} as EDetails;
    let startDate: Date | undefined;
    let endDate: Date | undefined;

    while (t.type !== EVENTEND) {
      switch (t.type) {
        case TIMESTART:
          startDate = t.value;
          res.date = this.formatDate(startDate!);
          res.id = this.createEventId(startDate!);
          res.start = this.formatHour(startDate!);
          break;
        case TIMEEND:
          endDate = t.value;
          res.end = this.formatHour(endDate!);
          break;
        case SUMMARY:
          res.title = this.formatTitle(t.value);
          break;
        case LOCATION:
          res.locations = t.value;
          break;
        case TEACHERS:
          res.teachers = t.value;
          break;
        default:
          return undefined;
      }
      t = this.nextToken();
    }
    if (startDate && endDate)
      res.duration = this.getDuration(startDate, endDate);
    return res;
  }
}
