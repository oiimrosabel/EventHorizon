import { animationService } from "~/services/animation/animation.service";
import {
  type DurationInSeconds,
  SplashState,
} from "~/services/animation/animation.common";

export const useSplash = defineStore("splasher", () => {
  const stateRef = ref<SplashState>(SplashState.IDLE);

  const isVisibleRef = ref<boolean>(true);

  const durationRef = ref<number>(0.75);

  const state = computed(() => stateRef.value);

  const isVisible = computed(() => isVisibleRef.value);

  const duration = computed((): DurationInSeconds => `${durationRef.value}s`);

  const changeState = (state: SplashState) => {
    if (state === stateRef.value) return;
    switch (state) {
      case SplashState.IN:
        stateRef.value = SplashState.IN;
        isVisibleRef.value = true;
        animationService
          .executeAfterDelay(
            () => changeState(SplashState.IDLE),
            duration.value,
          )
          .then();
        break;
      case SplashState.OUT:
        stateRef.value = SplashState.OUT;
        animationService
          .executeAfterDelay(
            () => changeState(SplashState.HIDDEN),
            duration.value,
          )
          .then();
        break;
      case SplashState.IDLE:
        stateRef.value = SplashState.IDLE;
        isVisibleRef.value = true;
        break;
      case SplashState.HIDDEN:
        stateRef.value = SplashState.HIDDEN;
        isVisibleRef.value = false;
        break;
    }
  };

  return { state, isVisible, duration, setState: changeState };
});
