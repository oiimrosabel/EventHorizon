<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useSplash } from '@/stores/useSplash.ts'
import ButtonsList from '@/components/containers/ButtonsList.vue'
import TextButton from '@/components/buttons/TextButton.vue'
import { copyToClipboard, getFullUrl, reloadPage, shareData } from '@/code/links/links.main.ts'
import { useMessenger } from '@/stores/useMessenger.ts'

const $router = useRouter()
const $splash = useSplash()
const $messenger = useMessenger()

const goToIndex = () =>
  $splash.fadeIn(() => {
    $router.push('/').then(() => $splash.fadeOut())
  })

const SHARE_TITLE = 'EventHorizon'

const shareLink = () => {
  const data = getFullUrl()
  shareData(data, SHARE_TITLE).then((success) => {
    if (!success)
      copyToClipboard(data).then((success) => {
        if (success) $messenger.setMessage('Copié avec succès.')
        else $messenger.setMessage('Une erreur est survenue.', '❌')
      })
    else $messenger.setMessage('Partagé avec succès.')
  })
}
</script>

<template>
  <div class="PanelHeader">
    <a @click="goToIndex()">
      <img alt="Index" src="/images/calendar.svg" />
    </a>
    <ButtonsList>
      <TextButton title="Rafraîchir" @click="reloadPage()">
        <img alt="Refresh" src="/icons/refresh.svg" />
      </TextButton>
      <TextButton title="Partager" @click="shareLink()">
        <img alt="Share" src="/icons/share.svg" />
        <p>Partager</p>
      </TextButton>
    </ButtonsList>
  </div>
</template>

<style lang="sass">
.PanelHeader
  z-index: 6
  display: flex
  flex-direction: row
  justify-content: space-between
  align-items: stretch
  padding: 24px
  margin: 0 -16px -16px
  background: var(--sidebar-bg)
  position: sticky
  top: 0

  > a
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center

    > img
      transition: var(--trans)

      @media (min-width: 801px)
        width: 42px

      @media (max-width: 800px)
        width: 42px

      &:hover
        rotate: 3deg
        scale: 1.05
</style>
