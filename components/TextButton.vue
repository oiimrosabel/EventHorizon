<script lang="ts" setup>
defineProps({
  noFilter: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <a :class="{ nofilter: noFilter }" class="TextButton">
    <slot />
  </a>
</template>

<style lang="sass">
.TextButton
  display: flex
  flex-direction: row
  align-items: center
  justify-content: center
  padding: 14px
  gap: 12px
  border-radius: var(--radius-button)
  background: var(--button)
  cursor: pointer
  transition: var(--trans)

  &:not(.nofilter) > img
    filter: var(--filter)

  > p
    font-weight: bold

  > img
    height: 20px
    width: 20px

  &:hover, &:focus
    background: var(--hover)

  &:active
    background: var(--active)
</style>
