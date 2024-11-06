import { type DurationInSeconds } from "~/services/animation/animation.common";

const DEFAULT_DELAY_DURATION: DurationInSeconds = "1s";

class AnimationService {
  async executeAfterDelay(
    callback: () => void,
    duration: DurationInSeconds = DEFAULT_DELAY_DURATION,
  ) {
    await this.wait(duration);
    callback();
  }

  async triggerCssAnimation(
    elements: Array<Element | null>,
    className: string,
    duration: DurationInSeconds,
    callback: () => void,
  ) {
    if (className === "")
      throw new Error(`"${className}" is not a valid class name.`);
    this.toggleClasses(elements, className);
    await this.wait(duration);
    this.toggleClasses(elements, className);
    callback();
  }

  private toggleClasses(elements: Array<Element | null>, classTag: string) {
    for (const e of elements) if (e) e.classList.toggle(classTag);
  }

  private async wait(duration: DurationInSeconds) {
    return new Promise((res) =>
      setTimeout(res, Number(duration.replace("s", "")) * 1000 - 50),
    );
  }
}

export const animationService = new AnimationService();
