import { getParameters } from '@/code/links/links.main.ts'

export const formatSearchInput = (text?: string) => {
  if (!text) return undefined
  if (text.startsWith('http')) {
    text = getParameters(text, 'resources')
    if (!text) return undefined
  }
  return /^\d+$/.test(text) ? text : undefined
}
