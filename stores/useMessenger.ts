import { animationService } from "~/services/animation/animation.service";
import type { DurationInSeconds } from "~/services/animation/animation.common";

export const useMessenger = defineStore("messenger", () => {
  const messageRef = ref<string[]>([]);

  const beforeRef = ref<string>("✅");

  const durationRef = ref<number>(2);

  const messages = computed(() => messageRef.value);

  const before = computed(() => beforeRef.value);

  const duration = computed((): DurationInSeconds => `${durationRef.value}s`);

  const setMessage = (message: string, before = "✅") => {
    messageRef.value.push(message);
    beforeRef.value = before;
    animationService
      .executeAfterDelay(() => {
        if (messageRef.value.length > 0) messageRef.value.shift();
      }, duration.value)
      .then();
  };

  return { messages, before, duration, setMessage };
});
