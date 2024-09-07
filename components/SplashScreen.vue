<script lang="ts" setup>
import BreathingPicture from "@/components/BreathingPicture.vue";

defineProps({
  state: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <div :class="{ hidden: state }" class="SplashScreen">
    <BreathingPicture size="160px">
      <img alt="Logo" src="/images/logo.svg" />
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

  &.hidden
    animation: Splash 0.5s
    opacity: 0
    z-index: -99
</style>
