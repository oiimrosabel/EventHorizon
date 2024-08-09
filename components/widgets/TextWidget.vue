<script lang="ts" setup>
defineProps({
  noImage: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="TextWidget">
    <img v-if="!noImage" alt="Calendar" src="/images/done.svg" />
    <slot />
  </div>
</template>

<style lang="sass">
.TextWidget
  display: flex
  flex-direction: column
  align-items: center
  justify-content: start
  background: var(--widget)
  padding: 24px 16px
  gap: 2px
  border-radius: var(--radius-small)

  > img
    height: 32px
    margin-bottom: 4px

  > *
    text-align: center
</style>
