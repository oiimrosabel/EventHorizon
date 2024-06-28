export interface Event {
  date: Array<string>
  start: Array<string>
  end: Array<string>
  duration: Array<string>
  title: string
  locations: Array<string>
  teachers: Array<string>
}

export type Day = Array<Event>

export type Calendar = { [p: string]: Day }
