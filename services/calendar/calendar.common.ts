export interface EDate {
  day: {
    dg: string;
    nm: string;
  };
  month: {
    dg: string;
    nm: string;
  };
}

export interface ETime {
  h: string;
  m: string;
}

export interface EDuration {
  h: number;
  m: number;
}

export interface ETitle {
  raw: string;
  type?: string;
  domain: string;
}

export interface EDetails {
  date?: EDate;
  start: ETime;
  end: ETime;
  duration: EDuration;
  title: ETitle;
  locations: string[];
  teachers: string[];
  id: string;
}

export interface EDay {
  date: EDate;
  duration: EDuration;
  events: EDetails[];
  id: string;
}

export interface ECalendarInfo {
  date: EDate;
  time: ETime;
  weeks: number;
}

export interface ECalendar {
  days: EDay[];
  lastUpdated: ECalendarInfo;
}

export interface ESummary {
  current?: EDetails;
  next?: EDetails;
  length: number;
  duration: string;
  types: Map<string, number>;
  progression: number;
}

export interface EFetchLog {
  statusCode: number;
  message: string;
}

export class EFetchError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}
