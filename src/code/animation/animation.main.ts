import { type DurationInSeconds } from '@/code/animation/animation.common'

const DEFAULT_DELAY_DURATION: DurationInSeconds = '1s'

const wait = async (duration: DurationInSeconds) =>
  new Promise((res) => setTimeout(res, Number(duration.replace('s', '')) * 1000 - 50))

const toggleClasses = (elements: Array<Element | null>, classTag: string) =>
  elements.forEach((e) => {
    if (e) e.classList.toggle(classTag)
  })

export const executeAfterDelay = async (
  callback: () => void,
  duration: DurationInSeconds = DEFAULT_DELAY_DURATION,
) => {
  await wait(duration)
  callback()
}

export const triggerCssAnimation = async (
  elements: Array<Element | null>,
  className: string,
  duration: DurationInSeconds,
  callback: () => void,
) => {
  if (className === '') return
  toggleClasses(elements, className)
  await wait(duration)
  toggleClasses(elements, className)
  callback()
}
