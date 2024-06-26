<template>
  <a class="StatButton">
    <slot></slot>
  </a>
</template>

<style lang="sass">
.StatButton
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  padding: 12px 0
  border-radius: var(--radius-small)
  background: var(--surface)
  transition: var(--trans)

  &:hover
    background: var(--widget)
</style>
