<script lang="ts" setup>
import { themeService } from '@/assets/code/theme/theme.service'
import LoadingView from '@/views/LoadingView.vue'

themeService.switchTheme(themeService.getThemeFromCookie())
</script>

<template>
  <Suspense>
    <template #fallback>
      <LoadingView />
    </template>
    <RouterView />
  </Suspense>
</template>
