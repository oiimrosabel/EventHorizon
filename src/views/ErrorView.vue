<script lang="ts" setup>
import { useError } from '@/stores/useError.ts'
import { setTitle } from '@/code/links/links.main.ts'
import { useRoute, useRouter } from 'vue-router'
import { useSplash } from '@/stores/useSplash.ts'
import BreathingPicture from '@/components/BreathingPicture.vue'

const $route = useRoute()
const $error = useError()
const $router = useRouter()
const $splash = useSplash()

setTitle(`Erreur`)

if ($route.name === 'NotFound') $error.setMessage(`Page inconnue : ${$route.fullPath}`)

const goToIndex = () =>
  $splash.fadeIn(() => {
    $router.push('/').then(() => $splash.fadeOut())
  })

const errorMessages = [
  'Aïe...',
  'Guru mediation',
  'Bonjour, ; DROP DATABASE calendars; --',
  "J'ai mal ! J'AI MAAAAAAAL !",
  'This is fine 🔥',
  '*Windows XP error sound effect*',
  'Ã©rreur [object Object]',
  ':(',
  ':3',
  'SCP-████ a ██████ les ███████.',
  "J'ai glissé chef !",
  'Raptors on fire (ow)',
]

const errorMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)]
</script>

<template>
  <div class="_errorPage">
    <div class="_errorCard">
      <BreathingPicture size="156px" @click="goToIndex()">
        <img alt="Logo" src="/gifs/error.gif" />
      </BreathingPicture>
      <h1>{{ errorMessage }}</h1>
      <p>{{ $error.message }}</p>
    </div>
  </div>
</template>

<style lang="sass">
._errorPage
  flex-grow: 1
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  background: #000000

  *
    color: #FFFFFF

  > ._errorCard
    display: flex
    flex-direction: column
    justify-content: center
    align-items: stretch
    gap: 32px

    > .BreathingPicture
      align-self: center

    > *
      text-align: center

    > p
      margin-top: -24px
</style>
