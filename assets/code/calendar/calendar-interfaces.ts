export interface Event {
  date: Array<string>;
  start: Array<string>;
  end: Array<string>;
  duration: Array<string>;
  title: Array<string>;
  locations: Array<string>;
  teachers: Array<string>;
}

export type Day = Array<Event>;

export type Calendar = { [p: string]: Day };

export type CourseStats = {
  CM: number;
  TD: number;
  TP: number;
  CC: number;
};

export interface FormatedCalendar {
  calendar: Calendar;
  current?: Event;
  next?: Event;
  length: number;
  duration: string;
  types: CourseStats;
}
