<script setup lang="ts">
import LoadingMessage from '@/bundles/LoadingBundle.vue'
import CalendarBundle from '@/views/CalendarContent.vue'
</script>

<template>
  <Suspense>
    <template #fallback>
      <LoadingMessage />
    </template>
    <CalendarBundle />
  </Suspense>
</template>
