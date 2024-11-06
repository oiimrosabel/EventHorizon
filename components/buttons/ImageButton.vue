<template>
  <a class="ImageButton">
    <slot />
  </a>
</template>

<style lang="sass">
.ImageButton
  display: flex
  flex-direction: row
  align-items: center
  justify-content: center
  border-radius: var(--radius-button)
  cursor: pointer
  transition: var(--trans)
  overflow: hidden
  height: 36px
  width: 36px

  > img
    height: 100%
    width: 100%

  &:hover, &:focus
    scale: 1.05

  &:active
    scale: 0.9
</style>
