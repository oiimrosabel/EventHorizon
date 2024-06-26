<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: undefined
  }
})
</script>

<template>
  <div class="WidgetContainer">
    <h4>{{ title }}</h4>
    <slot></slot>
  </div>
</template>

<style lang="sass">
.WidgetContainer
  display: flex
  flex-direction: column
  align-items: stretch
  justify-content: start
  gap: 8px
  padding: 8px 0 0
  background: var(--widget)
  border-radius: var(--radius-med)

  > h4
    text-align: center
</style>
