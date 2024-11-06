<script setup lang="ts"></script>

<template>
  <div class="WidgetPanel">
    <slot />
    <TemporaryMessage />
  </div>
</template>

<style lang="sass">
.WidgetPanel
  display: flex
  flex-direction: column
  justify-content: start
  align-items: stretch
  gap: 20px
  padding: 0 16px 16px
  background: var(--sidebar-bg)

  *
    --widget: var(--sidebar-widget)

  @media (min-width: 801px)
    position: sticky
    left: 0
    z-index: 6
    flex: 0 0 350px
    overflow-y: auto
    overflow-x: hidden

  @media (max-width: 800px)
    width: 100%
</style>
