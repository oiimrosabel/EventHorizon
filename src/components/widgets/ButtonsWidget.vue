<script lang="ts" setup>
defineProps({
  isReduced: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div :class="{ reduced: isReduced }" class="ButtonsWidget">
    <slot></slot>
  </div>
</template>

<style lang="sass">
.ButtonsWidget
  display: flex
  flex-direction: row
  align-items: center
  justify-content: space-between

  @media (min-width: 1201px)
    gap: 8px

    &.reduced
      flex-direction: column
      justify-content: end
      flex: 1 1
      gap: 12px

  @media (max-width: 1200px)
    flex-wrap: wrap
    gap: 12px
</style>
