import { animationService } from "~/services/animation/animation.service";

export const useMessenger = defineStore("messenger", () => {
  const messageRef = ref<string[]>([]);

  const durationRef = ref<`${number}s`>("2s");

  const messages = computed(() => messageRef.value);

  const duration = computed(() => durationRef.value);

  const setMessage = (message: string) => {
    messageRef.value.push(message);
    animationService
      .executeAfterDelay(() => {
        if (messageRef.value.length > 0) messageRef.value.shift();
      }, durationRef.value)
      .then();
  };

  return { messages, duration, setMessage };
});
