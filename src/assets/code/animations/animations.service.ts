import type { SecDuration } from '@/assets/code/animations/animations-interfaces'

class AnimationsService {
  animateAway(
    elements: Array<Element | null>,
    duration: SecDuration,
    classTag: string,
    handler: () => void
  ) {
    const toggleClasses = () => {
      for (const e of elements) if (e) e.classList.toggle(classTag)
    }
    const masterHandler = () => {
      toggleClasses()
      handler()
    }
    toggleClasses()
    setTimeout(masterHandler, this.getMsFromDuration(duration))
  }

  private getMsFromDuration(duration: SecDuration) {
    return Number(duration.replace('s', '')) * 1000 - 100
  }
}

export const animationService = new AnimationsService()
