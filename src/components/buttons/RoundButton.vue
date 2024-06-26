<template>
  <a class="RoundButton">
    <slot></slot>
  </a>
</template>

<style lang="sass">
.RoundButton
  display: flex
  flex-direction: row
  align-items: center
  justify-content: center
  aspect-ratio: 1/1
  padding: 16px
  border-radius: var(--radius-inf)
  background: var(--widget)
  cursor: pointer
  transition: var(--trans)

  > img
    height: 20px
    width: 20px
    filter: var(--filter)

  &:hover, &:focus
    background: var(--hover)

  &:active
    background: var(--active)
</style>
