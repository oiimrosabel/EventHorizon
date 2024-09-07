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
  padding: 16px

  background: var(--background)
  border-radius: var(--radius-med)

  > h4
    text-align: center

  @media (min-width: 801px)
    flex: 0 0 312px
    overflow-y: auto
    overflow-x: hidden
    animation: FromLeft ease-in-out 0.5s

  @media (max-width: 800px)
    width: 100%
    animation: FromAbove ease-in-out 0.5s
</style>
