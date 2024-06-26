<template>
  <div class="TextWidget">
    <slot></slot>
  </div>
</template>

<style lang="sass">
.TextWidget
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  background: var(--surface)
  border-radius: var(--radius-small)
  padding: 12px 20px
</style>
