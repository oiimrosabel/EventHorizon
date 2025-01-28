<template>
  <div class="DayContainer">
    <slot />
  </div>
</template>

<style lang="sass">
.DayContainer
  display: flex
  flex-direction: column
  align-items: stretch
  justify-content: start
  gap: 12px

  @media (min-width: 801px)
    border-radius: 0 0 var(--radius-med) var(--radius-med)
    flex: 0 0 320px
    max-width: 320px
    height: 100%
    overflow-x: visible
    overflow-y: auto
</style>
