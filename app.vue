<script lang="ts" setup>
import { themeService } from "~/services/theme/theme.service";
import SplashScreen from "~/components/SplashScreen.vue";
import { SplashState } from "~/services/animation/animation.common";

const $splash = useSplash();

useNuxtApp().hook("app:mounted", () => {
  themeService.setThemeFromCookie();
  themeService.setColorFromCookie();
  if ($splash.state !== SplashState.HIDDEN) $splash.setState(SplashState.OUT);
});
</script>

<template>
  <SplashScreen />
  <Suspense>
    <NuxtPage />
  </Suspense>
</template>
