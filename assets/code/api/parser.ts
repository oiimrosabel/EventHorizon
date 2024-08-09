import type Tokenizr from "tokenizr";
import {
  iCalLexer,
  EVENTEND,
  EVENTSTART,
  SUMMARY,
  TIMEEND,
  TIMESTART,
  VCALSTART,
  LOCATION,
  TEACHERS,
  VCALEND,
} from "assets/code/api/lexer";
import type { Calendar, Event } from "assets/code/calendar/calendar-interfaces";
import dateFormat from "dateformat";

export interface RawEvent extends Event {
  dateRaw?: string;
}

const TIME_LOCALE = "FR-fr";

const compareEvents = (event1: Event, event2: Event) => {
  const strCmp = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);
  let res = 0;
  res = strCmp(event1.start.join(""), event2.start.join(""));
  if (res === 0) res = strCmp(event1.end.join(""), event2.end.join(""));
  return res;
};

export class iCalParser {
  private lexer: Tokenizr;

  constructor() {
    this.lexer = iCalLexer;
  }

  parseCal(data: string) {
    this.lexer.input(data);

    const res = {} as Calendar;
    let t = this.nextToken();

    if (t.type !== VCALSTART) return undefined;

    t = this.nextToken();

    while (t.type === EVENTSTART) {
      const event = this.parseEvent();
      if (!event) return undefined;
      t = this.nextToken();
      const key = event.dateRaw!;
      if (!res.hasOwnProperty(key)) res[key] = [];
      delete event.dateRaw;
      res[key]!.push(event as Event);
    }

    if (t.type !== VCALEND) return undefined;
    for (const key in res) res[key]!.sort(compareEvents);
    return res;
  }

  private nextToken() {
    return this.lexer.token();
  }

  private formatHour(date: Date) {
    return [dateFormat(date, "HH"), dateFormat(date, "MM")];
  }

  private formatDate(date: Date) {
    return [
      date.toLocaleString(TIME_LOCALE, { weekday: "long" }),
      date.toLocaleString(TIME_LOCALE, { day: "numeric" }),
      date.toLocaleString(TIME_LOCALE, { month: "short" }),
    ];
  }

  private formatRaw(date: Date) {
    return dateFormat(date, "mmdd");
  }

  private getDuration(date1: Date, date2: Date) {
    const diff = new Date(date2.getTime() - date1.getTime());
    const hours = String(diff.getHours() - 1);
    const minutes = String(diff.getMinutes());
    return [hours, minutes === "0" ? "" : minutes];
  }

  private parseEvent() {
    let t = this.nextToken();
    const res = {} as RawEvent;
    let startDate = new Date(0);
    let endDate = new Date(0);

    while (true) {
      switch (t.type) {
        case EVENTEND:
          res.duration = this.getDuration(startDate, endDate);
          return res;
        case TIMESTART:
          startDate = t.value;
          res.date = this.formatDate(startDate);
          res.dateRaw = this.formatRaw(startDate);
          res.start = this.formatHour(startDate);
          break;
        case TIMEEND:
          endDate = t.value;
          res.end = this.formatHour(endDate);
          break;
        case SUMMARY:
          res.title = t.value;
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
  }
}
