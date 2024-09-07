import type {
  AnimationStep,
  DurationInSeconds,
} from "@/assets/code/animations/animations-interfaces";

const DEFAULT_DELAY_DURATION: DurationInSeconds = "1s";

class AnimationsService {
  async executeAfterDelay(
    elements: Array<Element | null>,
    callback: () => void,
    duration: DurationInSeconds = DEFAULT_DELAY_DURATION,
  ) {
    await this.animateStep(elements, {
      callback: callback,
      classTag: "",
      duration: duration,
    });
  }

  async animateSteps(
    elements: Array<Element | null>,
    steps: Array<AnimationStep>,
  ) {
    for (const step of steps) await this.animateStep(elements, step);
  }

  async animateStep(elements: Array<Element | null>, step: AnimationStep) {
    if (step.classTag !== "") this.toggleClasses(elements, step.classTag);
    await this.wait(this.getMsFromDuration(step.duration));
    if (step.classTag !== "") this.toggleClasses(elements, step.classTag);
    step.callback();
  }

  private toggleClasses(elements: Array<Element | null>, classTag: string) {
    for (const e of elements) if (e) e.classList.toggle(classTag);
  }

  private getMsFromDuration(duration: DurationInSeconds) {
    return Number(duration.replace("s", "")) * 1000 - 50;
  }

  private async wait(duration: number) {
    return new Promise((res) => setTimeout(res, duration));
  }
}

export const animationService = new AnimationsService();
