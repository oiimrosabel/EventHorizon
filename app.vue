<script lang="ts" setup>
import { themeService } from "~/services/theme/theme.service";
import SplashScreen from "~/components/SplashScreen.vue";
import { bookmarkService } from "~/services/bookmark/bookmark.service";
import { animationService } from "~/services/animation/animation.service";
import { SplashState } from "~/services/animation/animation.common";

const splashRef = ref<number>(SplashState.IDLE);

useNuxtApp().hook("app:mounted", () => {
  bookmarkService.fetchBookmarksFromCookies();
  themeService.setThemeFromCookie();
  themeService.setColorFromCookie();
  animationService.executeAfterDelay(
    () => (splashRef.value = SplashState.OUT),
    "0.750s",
  );
});
</script>

<template>
  <SplashScreen :state="splashRef" />
  <NuxtPage />
</template>
