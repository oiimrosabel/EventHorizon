<script lang="ts" setup>
defineProps({
  color: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <a class="ColorButton">
    <slot />
  </a>
</template>

<style lang="sass">
.ColorButton
  display: flex
  flex-direction: row
  align-items: center
  justify-content: center
  border-radius: var(--radius-button)
  cursor: pointer
  transition: var(--trans)
  overflow: hidden
  height: 48px
  width: 48px
  background: v-bind(color)
  box-shadow: inset 0 0 0 0 var(--active)

  &:hover, &:focus
    box-shadow: inset 0 0 0 4px var(--active)

  &:active
    box-shadow: inset 0 0 0 24px var(--active)
</style>
