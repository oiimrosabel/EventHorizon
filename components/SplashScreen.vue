<script lang="ts" setup>
import BreathingPicture from "~/components/BreathingPicture.vue";
import { SplashState } from "~/services/animation/animation.common";

defineProps({
  state: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div
    :class="{ in: state === SplashState.IN, out: state === SplashState.OUT }"
    class="SplashScreen"
  >
    <BreathingPicture size="160px">
      <img alt="Logo" src="/gifs/splash.gif" >
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
    animation: SplashIn 0.5s

  &.out
    animation: SplashOut 0.5s
    opacity: 0
    z-index: -99
</style>
