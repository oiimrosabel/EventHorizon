<script lang="ts" setup>
import ButtonsList from "~/components/containers/ButtonsList.vue";
import TextButton from "~/components/buttons/TextButton.vue";
import { linksService } from "~/services/links/links.service";
import ImageButton from "~/components/buttons/ImageButton.vue";

const LINKS = {
  dev: "https://github.com/oiimrosabel",
  github: "https://github.com/oiimrosabel/EventHorizon",
  pfp: "https://avatars.githubusercontent.com/u/42437280?v=4",
  credits: "https://github.com/oiimrosabel/EventHorizon/blob/main/README.md",
};
</script>

<template>
  <div class="CreditsWidget">
    <p class="subtitle">Crédits</p>
    <ButtonsList>
      <ImageButton
        title="Créé par Rosabel"
        @click="linksService.changeLocation(LINKS.dev, true)"
      >
        <img alt="Dev" :src="LINKS.pfp" >
      </ImageButton>
      <TextButton
        title="Crédits"
        @click="linksService.changeLocation(LINKS.credits, true)"
      >
        <img alt="Crédits" src="/icons/credits.svg" >
        <p>Crédits</p>
      </TextButton>
      <TextButton
        title="Contribuer"
        @click="linksService.changeLocation(LINKS.github, true)"
      >
        <img alt="GitHub" src="/icons/github.svg" >
        <p>Contribuer</p>
      </TextButton>
    </ButtonsList>
  </div>
</template>

<style lang="sass">
.CreditsWidget
  display: flex
  flex-direction: column
  justify-content: stretch
  align-items: stretch
  gap: 16px
  padding: 16px
  background: var(--widget)
  border-radius: var(--radius-small)
</style>
