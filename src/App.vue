<script lang="ts" setup>
import { themeService } from '@/assets/code/theme/theme.service'
import LoadingMessage from '@/bundles/LoadingBundle.vue'

themeService.switchTheme(themeService.getThemeFromCookie())
</script>

<template>
  <Suspense>
    <template #fallback>
      <LoadingMessage />
    </template>
    <RouterView v-slot="{ Component }">
      <Component :is="Component" />
    </RouterView>
  </Suspense>
</template>
