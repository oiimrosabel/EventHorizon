<script lang="ts" setup>
import { themeService } from '@/assets/code/theme/theme.service'

themeService.switchTheme(themeService.getThemeFromCookie())
</script>

<template>
  <RouterView />
</template>
