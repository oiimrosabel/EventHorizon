<script lang="ts" setup>
import TextButton from '@/components/buttons/TextButton.vue'
import { ref } from 'vue'
import { animationService } from '@/assets/code/animations/animations.service'

const ANIM_DURATION = '0.5s'
const ANIM_CLASS = 'away'

const emit = defineEmits(['hide'])

const backgroundRef = ref(null)
const menuRef = ref(null)

const animate = () =>
  animationService.animateAway(
    [backgroundRef.value, menuRef.value],
    ANIM_DURATION,
    ANIM_CLASS,
    () => emit('hide')
  )
</script>

<template>
  <div class="OverlayBackground" ref="backgroundRef">
    <div ref="menuRef">
      <div class="OverlayTitle">
        <slot name="title"></slot>
      </div>
      <slot></slot>
      <TextButton @click="animate()">
        <img alt="Back" src="/icons/back.png" />
      </TextButton>
    </div>
  </div>
</template>

<style lang="sass">
.OverlayBackground
  z-index: 99
  position: fixed
  top: 0
  bottom: 0
  left: 0
  right: 0
  display: flex
  flex-direction: column
  background: color-mix(in srgb, var(--background), transparent 10%)
  animation: Background ease-in-out v-bind(ANIM_DURATION)

  @media (min-width: 1201px)
    justify-content: center
    align-items: center

    > div
      width: 500px

  @media (max-width: 1200px)
    padding: 16px
    justify-content: end
    align-items: stretch

  &.away
    animation: BackgroundAway ease-in-out v-bind(ANIM_DURATION)

  > div
    padding: 32px
    background: var(--surface)
    display: flex
    flex-direction: column
    gap: 32px
    align-items: stretch
    justify-content: start
    animation: Overlay ease-in-out v-bind(ANIM_DURATION)
    border-radius: var(--radius-med)
    transform-origin: center

    &.away
      animation: OverlayAway ease-in-out v-bind(ANIM_DURATION)

    > h4
      text-align: center
      opacity: 0.66
      margin-bottom: -20px

    > .TextButton
      align-self: center

.OverlayTitle
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  gap: 12px

  > *
    text-align: center

  > img
    height: 56px
</style>
