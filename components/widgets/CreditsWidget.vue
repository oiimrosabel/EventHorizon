<script lang="ts" setup>
import ButtonsList from "~/components/containers/ButtonsList.vue";
import TextButton from "~/components/buttons/TextButton.vue";
import { linksService } from "~/services/links/links.service";
import ImageButton from "~/components/buttons/ImageButton.vue";

const $data = useCommonData();
</script>

<template>
  <div class="CreditsWidget">
    <p class="subtitle">Crédits</p>
    <ButtonsList>
      <ImageButton
        title="Créé par Rosabel"
        @click="linksService.changeLocation($data.links.dev, true)"
      >
        <img alt="Dev" :src="$data.links.pfp" >
      </ImageButton>
      <TextButton
        title="Crédits"
        @click="linksService.changeLocation($data.links.credits, true)"
      >
        <img alt="Crédits" src="/icons/credits.svg" >
        <p>Crédits</p>
      </TextButton>
      <TextButton
        title="Contribuer"
        @click="linksService.changeLocation($data.links.github, true)"
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
