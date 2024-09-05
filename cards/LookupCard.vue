<script lang="ts" setup>
import CardMenu from "@/components/containers/CardMenu.vue";
import SearchBar from "@/components/textbars/SearchBar.vue";
import ButtonsList from "@/components/containers/ButtonsList.vue";
import TextButton from "@/components/TextButton.vue";
import { bookmarkService } from "@/assets/code/bookmark/bookmark.service";
import { ref } from "vue";
import { animationService } from "@/assets/code/animations/animations.service";
import displayData from "@/assets/data/display.json";

const $router = useRouter();

const elemRef = ref(null);
const messageRef = ref("");
const hideRef = ref(false);

const $bookmark = useBookmarker();

const bookmarks = ref(bookmarkService.getAllBookmarks());
const isBookmarksDisplayed = ref(!bookmarkService.isEmpty());

const deleteBookmarks = () => {
  bookmarkService.resetBookmarks();
  isBookmarksDisplayed.value = false;
  $bookmark.bookmark = false;
  messageRef.value = displayData.bundles.bookmarksDeletion;
  animationService
    .executeAfterDelay([elemRef.value], () => {
      messageRef.value = "";
    })
    .then();
};

const navigateToBookmark = (elem: string) => {
  $router.push(`/${elem}`);
  hideRef.value = true;
};

const $cards = useCardsState();
</script>

<template>
  <CardMenu :enable-hide="hideRef" @hide="$cards.lookup = false">
    <template #title>
      <img alt="Calendar" src="/images/switch.svg" />
      <h2>Changer d'emploi du temps</h2>
    </template>
    <SearchBar @found="hideRef = true" />
    <p>Cet ID s'obtient en exportant un emploi du temps depuis AdeCampus.</p>
    <template v-if="isBookmarksDisplayed">
      <h4>Sauvegardes</h4>
      <ButtonsList>
        <TextButton
          v-for="(e, i) in bookmarks"
          :key="i"
          :title="e.cal"
          @click="navigateToBookmark(e.cal)"
        >
          <img alt="Calendar" src="/icons/calendar.svg" />
          <p>{{ e.name }}</p>
        </TextButton>
        <TextButton
          class="destructive"
          title="Tout supprimer"
          @click="deleteBookmarks()"
        >
          <img alt="Unmark" src="/icons/unmark.svg" />
        </TextButton>
      </ButtonsList>
    </template>
    <p v-if="messageRef !== ''" ref="elemRef">
      {{ messageRef }}
    </p>
  </CardMenu>
</template>

<style lang="sass">
.destructive > img
  filter: var(--destructive) !important
</style>
