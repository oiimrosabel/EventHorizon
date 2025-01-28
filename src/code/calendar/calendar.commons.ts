import { EDuration } from '@/code/calendar/calendar.classes.ts'
import { EEvent } from '@/code/calendar/calendar.main.ts'

// Workaround for Vue bug
export interface IESummary {
  current: EEvent | undefined
  next: EEvent | undefined
  length: number
  duration: EDuration
  types: Map<string, number>
  progression: number
}
