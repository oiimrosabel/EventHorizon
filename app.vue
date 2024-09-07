<script lang="ts" setup>
import { themeService } from "@/assets/code/theme/theme.service";
import ThemeCard from "@/cards/ThemeCard.vue";
import LookupCard from "@/cards/LookupCard.vue";
import ShareCard from "@/cards/ShareCard.vue";
import EventCard from "@/cards/EventCard.vue";
import ButtonsBundle from "@/bundles/ButtonsBundle.vue";
import SplashScreen from "@/components/SplashScreen.vue";
import { bookmarkService } from "@/assets/code/bookmark/bookmark.service";
import BookmarksCard from "@/cards/BookmarksCard.vue";

const splashRef = ref(false);

const $cards = useCardsState();

useNuxtApp().hook("app:mounted", () => {
  bookmarkService.fetchBookmarksFromCookies();
  themeService.switchTheme(themeService.getThemeFromCookie());
  themeService.switchColor(themeService.getColorFromCookie());
  setTimeout(() => (splashRef.value = true), 750);
});
</script>

<template>
  <SplashScreen :state="splashRef" />
  <ThemeCard v-if="$cards.theme" />
  <LookupCard v-if="$cards.lookup" />
  <ShareCard v-if="$cards.share" />
  <EventCard v-if="$cards.event" />
  <BookmarksCard v-if="$cards.bookmark" />
  <ButtonsBundle />
  <div class="RoutePage">
    <NuxtPage />
  </div>
</template>

<style lang="sass">
.RoutePage
  flex-grow: 1
  overflow: scroll
  display: flex
  justify-content: stretch
  align-items: stretch
  gap: 16px
  padding: 12px

  @media (min-width: 801px)
    flex-direction: row

  @media (max-width: 800px)
    flex-direction: column
</style>
