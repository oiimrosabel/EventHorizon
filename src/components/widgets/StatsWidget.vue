<template>
  <div class="StatsWidget">
    <slot></slot>
  </div>
</template>

<style lang="sass">
.StatsWidget
  display: grid
  grid-auto-rows: 1fr
  grid-template-columns: repeat(3, 1fr)
  justify-content: stretch
  align-items: stretch
  gap: 8px

  > *
    flex: 1 1
</style>
