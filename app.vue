<script lang="ts" setup>
import { themeService } from "~/services/theme/theme.service";
import SplashScreen from "~/components/SplashScreen.vue";
const $splash = useSplash();

useNuxtApp().hook("app:mounted", () => {
  themeService.setThemeFromCookie();
  themeService.setColorFromCookie();
  $splash.unlock();
  $splash.fadeOut();
});
</script>

<template>
  <SplashScreen />
  <Suspense>
    <NuxtPage />
  </Suspense>
</template>
