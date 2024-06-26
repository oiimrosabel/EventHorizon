export interface Event {
  date: Array<string>
  start: string
  end: string
  duration: string
  title: string
  locations: Array<string>
  teachers: Array<string>
}

export interface Calendar {
  [e: string]: Array<Event>
}
