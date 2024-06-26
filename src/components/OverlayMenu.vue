<script lang="ts" setup>
import RoundButton from '@/components/buttons/RoundButton.vue'

defineEmits(['hide'])
</script>

<template>
  <div class="OverlayMenu">
    <div>
      <div class="OverlayTitle">
        <slot name="title"></slot>
      </div>
      <slot></slot>
      <RoundButton @click="$emit('hide')">
        <img alt="Back" src="/icons/back.png" />
      </RoundButton>
    </div>
  </div>
</template>

<style lang="sass">
.OverlayMenu
  z-index: 99
  position: fixed
  top: 0
  bottom: 0
  left: 0
  right: 0
  display: flex
  flex-direction: column
  align-items: center
  background: color-mix(in srgb, var(--background), transparent 10%)
  animation: Background ease-out 0.25s

  > div
    padding: 32px
    background: var(--surface)
    display: flex
    flex-direction: column
    gap: 32px
    align-items: stretch
    justify-content: start
    animation: Overlay ease-out 0.33s

    > h4
      text-align: center
      opacity: 0.66
      margin-bottom: -20px

    > .OverlayTitle
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      gap: 12px

      > *
        text-align: center

      > img
        height: 56px

    > .RoundButton
      align-self: center

  @media (min-width: 1201px)
    justify-content: center

    > div
      border-radius: var(--radius-med)
      width: 500px

  @media (max-width: 1200px)
    justify-content: end

    > div
      width: 90vw
      border-radius: var(--radius-med) var(--radius-med) 0 0
</style>
