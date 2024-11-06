<script lang="ts" setup>
import BreathingPicture from "~/components/BreathingPicture.vue";
</script>

<template>
  <div class="WelcomeWidget">
    <div>
      <BreathingPicture size="64px">
        <img src="/images/logo.svg" alt="Logo" >
      </BreathingPicture>
      <p class="subtitle">Bienvenue sur</p>
      <h3 class="statTitle">EventHorizon</h3>
    </div>
    <p>Veuillez entrer un ID pour commencer</p>
  </div>
</template>

<style lang="sass">
.WelcomeWidget
  display: flex
  flex-direction: column
  justify-content: stretch
  align-items: stretch
  gap: 16px
  padding: 128px 8px 8px

  > div
    display: flex
    flex-direction: column
    justify-content: stretch
    align-items: stretch

    > .BreathingPicture
      margin-bottom: 16px
</style>
