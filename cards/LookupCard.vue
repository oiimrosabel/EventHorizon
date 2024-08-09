<script lang="ts" setup>
import CardMenu from "~/components/containers/CardMenu.vue";
import SearchBar from "~/components/SearchBar.vue";
import ButtonsList from "~/components/containers/ButtonsList.vue";
import TextButton from "~/components/TextButton.vue";
import { bookmarkService } from "assets/code/bookmark/bookmark.service";
import { linksService } from "assets/code/links/links.service";
import { ref } from "vue";
import { animationService } from "assets/code/animations/animations.service";
import displayData from "assets/data/display.json";

const emits = defineEmits(["cleaned"]);

const bookmarks = bookmarkService.getBookmarks();

const elemRef = ref(null);
const messageRef = ref("");

const isBookmarksDisplayed = ref(bookmarks.length !== 0);

const bookmarksWrapper = () => {
  bookmarkService.deleteAllBookmarks();
  isBookmarksDisplayed.value = false;
  emits("cleaned");
  messageRef.value = displayData.bundles.bookmarksDeletion;
  animationService
    .executeAfterDelay([elemRef.value], () => {
      messageRef.value = "";
    })
    .then();
};

const $cards = useCardDisplay();
</script>

<template>
  <CardMenu @hide="$cards.lookup = false">
    <template #title>
      <img alt="Calendar" src="/images/switch.svg" />
      <h2>Changer d'emploi du temps</h2>
    </template>
    <SearchBar />
    <p>Cet ID s'obtient en exportant un emploi du temps depuis AdeCampus.</p>
    <template v-if="isBookmarksDisplayed">
      <h4>Sauvegardes</h4>
      <ButtonsList>
        <TextButton
          v-for="(e, i) in bookmarks"
          :key="i"
          @click="linksService.changeLocation(`/${e}`)"
        >
          <img src="/icons/calendar.svg" alt="Calendar" />
          <p>{{ e }}</p>
        </TextButton>
        <TextButton @click="bookmarksWrapper()">
          <img alt="Unmark" src="/icons/unmark.svg" />
          <p>Nettoyer</p>
        </TextButton>
      </ButtonsList>
    </template>
    <p v-if="messageRef !== ''" ref="elemRef">
      {{ messageRef }}
    </p>
  </CardMenu>
</template>
