<script lang="ts" setup>
import ButtonsList from '@/components/containers/ButtonsList.vue'
import TextButton from '@/components/buttons/TextButton.vue'
import ImageButton from '@/components/buttons/ImageButton.vue'
import { changeLocation } from '@/code/links/links.main.ts'
import RetractableWidget from '@/components/containers/RetractableWidget.vue'

const LINKS = {
  dev: 'https://github.com/oiimrosabel',
  github: 'https://github.com/oiimrosabel/EventHorizon',
  pfp: 'https://avatars.githubusercontent.com/u/42437280?v=4',
  credits: 'https://github.com/oiimrosabel/EventHorizon/blob/main/README.md#cr%C3%A9dits',
}
</script>

<template>
  <RetractableWidget tag="credits" :image="LINKS.pfp" title="Crédits" circular>
    <div class="CreditsWidget">
      <ButtonsList>
        <ImageButton title="Créé par Rosabel" @click="changeLocation(LINKS.dev, true)">
          <img alt="Dev" :src="LINKS.pfp" />
        </ImageButton>
        <TextButton title="Crédits" @click="changeLocation(LINKS.credits, true)">
          <img alt="Crédits" src="/icons/credits.svg" />
          <p>Crédits</p>
        </TextButton>
        <TextButton title="Contribuer" @click="changeLocation(LINKS.github, true)">
          <img alt="GitHub" src="/icons/github.svg" />
          <p>Contribuer</p>
        </TextButton>
      </ButtonsList>
    </div>
  </RetractableWidget>
</template>

<style lang="sass">
.CreditsWidget
  display: flex
  flex-direction: column
  justify-content: stretch
  align-items: stretch
  gap: 16px
  background: var(--widget)
  border-radius: var(--radius-small)
</style>
