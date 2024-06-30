<script lang="ts" setup>
import TextButton from '@/components/buttons/TextButton.vue'
import { ref } from 'vue'
import { animationService } from '@/assets/code/animations/animations.service'

const ANIM_DURATION = '0.25s'
const ANIM_CLASS = 'away'

const emit = defineEmits(['hide'])

const backgroundRef = ref(null)
const menuRef = ref(null)

const animate = () =>
  animationService
    .animateStep([backgroundRef.value, menuRef.value], {
      duration: ANIM_DURATION,
      classTag: ANIM_CLASS,
      callback: () => emit('hide')
    })
    .then()
</script>

<template>
  <div class="OverlayBackground" ref="backgroundRef" @keydown.esc="animate()">
    <div ref="menuRef">
      <div class="OverlayTitle">
        <slot name="title"></slot>
      </div>
      <slot></slot>
      <TextButton @click="animate()">
        <img alt="Back" src="/icons/back.svg" />
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
  background: color-mix(in srgb, var(--timetable), transparent 10%)
  animation: OverlayBackgroundIn ease-in-out v-bind(ANIM_DURATION)

  &.away
    animation: OverlayBackgroundOut ease-in-out v-bind(ANIM_DURATION)

  > div
    padding: 32px
    background: var(--surface)
    display: flex
    flex-direction: column
    gap: 32px
    align-items: stretch
    justify-content: start
    transform-origin: center
    animation: OverlayMenuIn ease-in-out v-bind(ANIM_DURATION)
    border-radius: var(--radius-med)

    &.away
      animation: OverlayMenuOut ease-in-out v-bind(ANIM_DURATION)

    > h4
      text-align: center
      opacity: 0.66
      margin-bottom: -20px

    > p
      font-size: 0.9em
      text-align: center
      opacity: 0.66
      padding: 0 8%

      &:before
        content: "💡 "

    > .TextButton
      align-self: center

  @media (min-width: 1201px)
    justify-content: center
    align-items: center

    > div
      width: 500px

  @media (max-width: 1200px)
    padding: 16px
    justify-content: end
    align-items: stretch

.OverlayTitle
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  gap: 2px

  > *
    text-align: center

  > p
    opacity: 0.66

  > b
    color: var(--active)

  > img
    height: 56px
    margin-bottom: 10px
</style>
