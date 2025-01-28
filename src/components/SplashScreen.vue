<script lang="ts" setup>
import BreathingPicture from '@/components/BreathingPicture.vue'
import { SplashState } from '@/code/animation/animation.common'
import { useSplash } from '@/stores/useSplash.ts'

const $splash = useSplash()
const length = $splash.duration
</script>

<template>
  <div
    v-if="$splash.isVisible"
    :class="{
      in: $splash.state === SplashState.IN,
      out: $splash.state === SplashState.OUT,
    }"
    class="SplashScreen"
  >
    <BreathingPicture size="160px">
      <img alt="Logo" src="/gifs/splash.gif" />
    </BreathingPicture>
  </div>
</template>

<style lang="sass">
.SplashScreen
  z-index: 99
  background: #000000
  position: fixed
  top: 0
  bottom: 0
  left: 0
  right: 0
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center

  &.in
    animation: SplashIn v-bind(length)

  &.out
    animation: SplashOut v-bind(length)
</style>
