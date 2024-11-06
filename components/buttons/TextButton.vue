<script lang="ts" setup>
defineProps({
  noFilter: {
    type: Boolean,
    default: false,
  },
  destructive: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <a
    :class="{ nofilter: noFilter, destructive: destructive }"
    class="TextButton"
  >
    <slot />
  </a>
</template>

<style lang="sass">
.TextButton
  display: flex
  flex-direction: row
  align-items: center
  justify-content: center
  padding: 10px
  border-radius: var(--radius-button)
  background: var(--button)
  transition: var(--trans)
  cursor: pointer
  gap: 8px

  &:not(.nofilter) > img
    filter: var(--filter)

  > img
    height: 16px
    width: 16px

  > p
    min-width: 0
    text-wrap: nowrap
    overflow: hidden
    white-space: nowrap
    text-overflow: ellipsis
    font-weight: 600


  &:hover, &:focus
    background: var(--hover)

  &:active
    background: var(--active)

  &.destructive > img
    filter: var(--destructive)
</style>
