<template>
  <div class="WidgetPanel">
    <slot />
  </div>
</template>

<style lang="sass">
.WidgetPanel
  display: flex
  flex-direction: column
  justify-content: start
  align-items: stretch
  gap: 24px
  overflow-y: auto
  overflow-x: hidden
  padding: 16px
  backdrop-filter: var(--blur)
  background: var(--background)
  border-radius: var(--radius-med)

  > h4
    text-align: center

  @media (min-width: 801px)
    flex: 0 0 312px

  @media (max-width: 800px)
    width: 100%
    border-radius: 0 0 var(--radius-med) var(--radius-med)
</style>
