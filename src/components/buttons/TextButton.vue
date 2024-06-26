<template>
  <a class="TextButton">
    <slot></slot>
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
  border-radius: var(--radius-inf)
  background: var(--widget)
  cursor: pointer
  transition: var(--trans)

  > p
    font-weight: bold

  > img
    height: 20px
    width: 20px
    filter: var(--filter)

  &:hover, &:focus
    background: var(--hover)

  &:active
    background: var(--active)
</style>
