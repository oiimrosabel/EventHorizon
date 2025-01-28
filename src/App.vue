<script lang="ts" setup>
import { initColor, initTheme } from '@/code/theme/theme.main.ts'
import SplashScreen from '@/components/SplashScreen.vue'
import { useSplash } from '@/stores/useSplash.ts'
import { onMounted } from 'vue'
import { executeAfterDelay } from '@/code/animation/animation.main.ts'
import { useWidgets } from '@/stores/useWidgets.ts'
import { useBookmarker } from '@/stores/useBookmarker.ts'

const $bookmarker = useBookmarker()
const $splash = useSplash()
const $widgets = useWidgets()

onMounted(() => {
  $bookmarker.sync()
  $widgets.sync()
  initTheme()
  initColor()
  executeAfterDelay(() => $splash.fadeOut())
})
</script>

<template>
  <SplashScreen />
  <Suspense>
    <RouterView :key="$route.path" />
  </Suspense>
</template>
