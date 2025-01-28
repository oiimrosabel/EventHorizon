<script setup lang="ts">
defineProps({
  circular: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <a class="WidgetButton" :class="{ circular: circular }">
    <slot></slot>
  </a>
</template>

<style lang="sass">
.WidgetButton
  display: flex
  flex-direction: row
  align-items: center
  justify-content: center
  padding: 10px
  border-radius: var(--radius-small)
  background: var(--button)
  transition: var(--trans)
  cursor: pointer
  gap: 8px

  > img
    height: 24px
    width: 24px

    &.circular
      border-radius: var(--radius-button)

  &:hover, &:focus
    background: var(--hover)

  &:active
    background: var(--active)
</style>
