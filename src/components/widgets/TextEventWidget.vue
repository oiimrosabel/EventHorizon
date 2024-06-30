<script lang="ts" setup>
defineProps({
  noImage: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="TextEventWidget">
    <img v-if="!noImage" alt="Calendar" src="/images/done.svg" />
    <slot></slot>
  </div>
</template>

<style lang="sass">
.TextEventWidget
  display: flex
  flex-direction: column
  align-items: center
  justify-content: start
  background: var(--surface)
  padding: 24px 16px
  gap: 4px
  border-radius: var(--radius-small)

  > img
    height: 32px
    margin-bottom: 8px

  > *
    text-align: center
</style>
