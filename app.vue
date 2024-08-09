<script lang="ts" setup>
import { themeService } from "@/assets/code/theme/theme.service";
import ThemeCard from "~/cards/ThemeCard.vue";
import LookupCard from "~/cards/LookupCard.vue";
import ShareCard from "~/cards/ShareCard.vue";
import EventCard from "~/bundles/EventCard.vue";
import ButtonsBundle from "~/bundles/ButtonsBundle.vue";

const $cards = useCardDisplay();

useNuxtApp().hook("app:mounted", () =>
  themeService.switchTheme(themeService.getThemeFromCookie()),
);
</script>

<template>
  <ThemeCard v-if="$cards.theme" />
  <LookupCard v-if="$cards.lookup" />
  <ShareCard v-if="$cards.share" />
  <EventCard v-if="$cards.event" />
  <ButtonsBundle />
  <div class="RoutePage">
    <NuxtPage />
  </div>
</template>

<style lang="sass">
.RoutePage
  flex-grow: 1
  max-width: 100%
  overflow: scroll
  display: flex
  flex-direction: row
  justify-content: stretch
  align-items: stretch
  gap: 16px
  padding: 12px
</style>
