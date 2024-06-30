import type {
  AnimationStep,
  DurationInSeconds
} from '@/assets/code/animations/animations-interfaces'

class AnimationsService {
  async animateSteps(elements: Array<Element | null>, steps: Array<AnimationStep>) {
    for (const step of steps) await this.animateStep(elements, step)
  }

  async animateStep(elements: Array<Element | null>, step: AnimationStep) {
    this.toggleClasses(elements, step.classTag)
    await this.wait(this.getMsFromDuration(step.duration))
    this.toggleClasses(elements, step.classTag)
    step.callback()
  }

  private toggleClasses(elements: Array<Element | null>, classTag: string) {
    for (const e of elements) if (e) e.classList.toggle(classTag)
  }

  private getMsFromDuration(duration: DurationInSeconds) {
    return Number(duration.replace('s', '')) * 1000 - 100
  }

  private async wait(duration: number) {
    return new Promise((res) => setTimeout(res, duration))
  }
}

export const animationService = new AnimationsService()
