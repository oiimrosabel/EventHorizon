import type { BridgeResponse, FailureResponse, RequestData } from '@/code/fetch/fetch.common.ts'

const BRIDGE_URL = new URL('https://blahaj.land/ade-api')

export const fetchCalendar = async (data: RequestData) => {
  let res: Response
  try {
    res = await fetch(BRIDGE_URL, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  } catch (_) {
    return {
      success: false,
      message: 'Une erreur est survenue.',
    } as FailureResponse
  }
  return (await res.json()) as BridgeResponse
}
