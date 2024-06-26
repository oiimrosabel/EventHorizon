<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: undefined
  }
})
</script>

<template>
  <div class="DayWidget">
    <h4>{{ title }}</h4>
    <slot></slot>
  </div>
</template>

<style lang="sass">
.DayWidget
  display: flex
  flex-direction: column
  align-items: stretch
  justify-content: start
  gap: 16px
  border-radius: var(--radius-med)

  > h4
    text-align: center
</style>
