<script lang="ts" setup>
defineProps({
  size: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="BreathingPicture">
    <slot />
    <slot />
  </div>
</template>

<style lang="sass">
.BreathingPicture
  display: flex
  flex-direction: column
  gap: 0
  justify-content: center
  align-items: center
  height: v-bind(size)
  width: v-bind(size)

  > img
    height: v-bind(size)
    animation: BreathingPictureFg 2s infinite alternate

    &:first-of-type
      z-index: 5
      transition: var(--trans)

      &:hover
        rotate: 2deg
        scale: 1.1

    &:last-of-type
      margin-top: calc(v-bind(size) * -1)
      animation: BreathingPictureBg 2s infinite ease-in-out alternate
</style>
