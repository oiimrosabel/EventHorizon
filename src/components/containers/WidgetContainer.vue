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
  gap: 12px
  padding:  0 0

  > h4
    align-self: center
    padding: 6px 12px
    background: var(--widget)
    border-radius: var(--radius-med)
    text-align: center
</style>
