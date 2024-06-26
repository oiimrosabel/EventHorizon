<script lang="ts" setup>
defineProps({
  noImage: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="TextEvent">
    <img v-if="!noImage" alt="Calendar" src="/icons/calendar.png" />
    <slot></slot>
  </div>
</template>

<style lang="sass">
.TextEvent
  display: flex
  flex-direction: column
  align-items: center
  justify-content: start
  background: var(--surface)
  padding: 16px
  gap: 4px
  border-radius: var(--radius-small)

  > img
    height: 32px
    filter: var(--filter)
    margin-bottom: 8px

  > *
    text-align: center
</style>
