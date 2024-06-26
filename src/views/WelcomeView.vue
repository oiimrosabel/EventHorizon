<script lang="ts" setup>
import { ref } from 'vue'
import ThemeBundle from '@/bundles/ThemeBundle.vue'
import LookupBundle from '@/bundles/LookupBundle.vue'
import ButtonsList from '@/components/widgets/ButtonsList.vue'
import TextButton from '@/components/buttons/TextButton.vue'
import CustomFooter from '@/components/CustomFooter.vue'

const isThemeShown = ref(false)
const isLookupShown = ref(false)
</script>

<template>
  <ThemeBundle v-if="isThemeShown" @hide="isThemeShown = false" />
  <LookupBundle v-if="isLookupShown" @hide="isLookupShown = false" />
  <div class="WelcomeView">
    <div class="WelcomeTitle">
      <div class="LogoOverlay">
        <img alt="Logo" src="/images/logo.png" />
        <img alt="Logo" src="/images/halo.png" />
      </div>
      <div>
        <h3>Bienvenue sur</h3>
        <h1>EventHorizon</h1>
      </div>
      <p>Parce que AdeCampus est horrible</p>
    </div>
    <ButtonsList>
      <TextButton @click="isLookupShown = true">
        <img alt="Search" src="/icons/search.png" />
        <p>Voir un emploi du temps</p>
      </TextButton>
      <TextButton @click="isThemeShown = true">
        <img alt="Theme" src="/icons/theme.png" />
      </TextButton>
    </ButtonsList>
  </div>
  <CustomFooter />
</template>

<style lang="sass">
.WelcomeView
  position: absolute
  left: 0
  right: 0
  top: 0
  bottom: 0
  display: flex
  flex-direction: column
  justify-content: center
  align-items: stretch
  gap: 32px
  padding: 32px

  > .WelcomeTitle
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    gap: 32px

    > *
      text-align: center

    > div
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center

    > p
      margin-top: -16px

.LogoOverlay
  height: 128px
  width: 128px

  > img
    height: 128px
    animation: Breath 5s infinite

    &:first-of-type
      z-index: 5

    &:last-of-type
      margin-top: -128px
      animation: BreathBlur 5s infinite ease-in-out
</style>
