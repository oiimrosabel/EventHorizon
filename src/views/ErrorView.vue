<script lang="ts" setup>
import { ref } from 'vue'
import ThemeBundle from '@/bundles/ThemeBundle.vue'
import LookupBundle from '@/bundles/LookupBundle.vue'
import ButtonsList from '@/components/widgets/ButtonsList.vue'
import TextButton from '@/components/buttons/TextButton.vue'
import CustomFooter from '@/components/CustomFooter.vue'

const isThemeShown = ref(false)
const isLookupShown = ref(false)

const sillySecret = (mod: number = 5) => Math.round(Math.random() * mod) === mod
</script>

<template>
  <ThemeBundle v-if="isThemeShown" @hide="isThemeShown = false" />
  <LookupBundle v-if="isLookupShown" @hide="isLookupShown = false" />
  <div class="ErrorView">
    <div class="ErrorTitle">
      <img v-if="sillySecret()" alt="Logo" src="/images/oi.png" />
      <img v-else alt="Logo" src="/images/error.png" />
      <h1>Une erreur est survenue</h1>
      <p>Veuillez réessayer</p>
    </div>
    <ButtonsList>
      <TextButton @click="isLookupShown = true">
        <img alt="Search" src="/icons/search.png" />
        <p>Réssayer</p>
      </TextButton>
      <TextButton @click="$router.push('/')">
        <img alt="Home" src="/icons/home.png" />
        <p>Accueil</p>
      </TextButton>
      <TextButton @click="isThemeShown = true">
        <img alt="Theme" src="/icons/theme.png" />
      </TextButton>
    </ButtonsList>
  </div>
  <CustomFooter />
</template>

<style lang="sass">
.ErrorView
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

  > .ErrorTitle
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    gap: 32px

    > img
      height: 128px


    > *
      text-align: center

    > p
      margin-top: -24px
</style>
