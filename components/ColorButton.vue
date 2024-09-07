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

  > img
    height: 100%
    width: 100%

  &:hover, &:focus
    scale: 1.05

  &:active
    scale: 0.9
</style>
