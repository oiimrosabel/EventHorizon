export interface REvent {
  s: string
  e: string
  dr: number
  tt: {
    t: string
    s: string
  }
  lc: string[]
  tc: string[]
}

export interface RDay {
  d: string
  dr: number
  e: REvent[]
}

export interface RCalendar {
  d: RDay[]
  u: {
    dt: string
    w: number
  }
}

export interface RequestData {
  cal: number
  weeks: number
}

export interface BridgeResponse {
  success: boolean
}

export interface SuccessResponse extends BridgeResponse {
  success: true
  data: RCalendar
}

export interface FailureResponse extends BridgeResponse {
  success: false
  message: string
}
