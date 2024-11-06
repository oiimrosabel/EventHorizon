<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: undefined,
  },
});
</script>

<template>
  <div class="WidgetContainer">
    <p class="subtitle">{{ title }}</p>
    <slot />
  </div>
</template>

<style lang="sass">
.WidgetContainer
  display: flex
  flex-direction: column
  align-items: stretch
  justify-content: start
  padding-top: 16px
  gap: 2px
  border-radius: var(--radius-small)
  background: var(--widget)

  > p
    padding-left: 12px
</style>
