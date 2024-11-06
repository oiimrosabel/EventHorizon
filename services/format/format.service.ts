import type {
  CalFetchError,
  EDate,
  EDuration,
  ETime,
} from "~/services/calendar/calendar.common";
import { linksService } from "~/services/links/links.service";
import { calendarService } from "~/services/calendar/calendar.service";

class FormatService {
  modulo(a: number, b: number) {
    return ((a % b) + b) % b;
  }

  formatHour(time: ETime | EDuration, separator = "", reduced = false) {
    return `${time.h}${separator}${reduced && time.m == 0 ? "" : time.m}`;
  }

  formatDate(date: EDate, separator = "", reduced = false) {
    if (reduced) return `${date.day.dg}${separator}${date.month.dg}`;
    return `${date.day.nm} ${date.day.dg} ${date.month.nm}`;
  }

  formatSearchInput(text?: string) {
    if (!text) return undefined;
    if (text.startsWith("http")) {
      text = linksService.getDataFromUrl(text, "resources");
      if (!text) return undefined;
    }
    return calendarService.isCalIdValid(text) ? text : undefined;
  }

  formatErrorAsCalError(error: unknown) {
    const errorData = error as Error;
    const errorTemplate = {
      statusCode: 500,
      message: errorData.message,
    };
    if (Object.hasOwn(errorData, "statusCode")) {
      const calError = error as CalFetchError;
      errorTemplate.statusCode = calError.statusCode;
      errorTemplate.message = calError.message;
    }
    return errorTemplate;
  }
}

export const formatService = new FormatService();
