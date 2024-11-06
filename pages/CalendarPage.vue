<script lang="ts" setup>
import SplashScreen from "~/components/SplashScreen.vue";
import CalendarContent from "~/components/CalendarContent.vue";
import { animationService } from "~/services/animation/animation.service";
import { SplashState } from "~/services/animation/animation.common";

const loadingRef = ref<number>(SplashState.IN);

animationService.executeAfterDelay(
  () => (loadingRef.value = SplashState.IDLE),
  "0.750s",
);
</script>

<template>
  <Suspense>
    <template #fallback>
      <SplashScreen :state="loadingRef" />
    </template>
    <CalendarContent />
  </Suspense>
</template>
