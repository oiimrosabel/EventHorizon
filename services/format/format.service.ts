import type {
  EFetchLog,
  EFetchError,
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

  private isEFetchError(error: unknown): error is EFetchError {
    const testObject = error as EFetchError;
    return (
      Object.hasOwn(testObject, "statusCode") &&
      Object.hasOwn(testObject, "message")
    );
  }

  interpretError(error: unknown): EFetchLog {
    const errorData = error as Error;
    const errorTemplate = {
      statusCode: 500,
      message: errorData.message,
    };
    if (this.isEFetchError(error)) {
      errorTemplate.statusCode = error.statusCode;
      errorTemplate.message = error.message;
    }
    return errorTemplate;
  }

  formatTitle = (chunk?: string) => {
    const title = "EventHorizon";
    return chunk ? `${chunk} - ${title}` : title;
  };
}

export const formatService = new FormatService();
