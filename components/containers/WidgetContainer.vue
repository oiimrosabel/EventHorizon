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
    <h4>{{ title }}</h4>
    <slot />
  </div>
</template>

<style lang="sass">
.WidgetContainer
  display: flex
  flex-direction: column
  align-items: stretch
  justify-content: start
  gap: 8px
  padding: 0 0

  > h4
    padding-left: 4px
    font-size: 0.9em
    opacity: 0.66
    font-weight: 600
</style>
