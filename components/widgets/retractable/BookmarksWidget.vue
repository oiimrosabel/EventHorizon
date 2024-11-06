<script lang="ts" setup>
import { bookmarkService } from "~/services/bookmark/bookmark.service";
import TextButton from "~/components/buttons/TextButton.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { animationService } from "~/services/animation/animation.service";
import type { Bookmark } from "~/services/bookmark/bookmark.common";
import ButtonsList from "~/components/containers/ButtonsList.vue";
import { useCommonData } from "~/composables/useCommonData";
import RetractableWidget from "~/components/containers/RetractableWidget.vue";

defineProps({
  isIndex: {
    type: Boolean,
    default: false,
  },
});

const $route = useRoute();
const $router = useRouter();
const $messenger = useMessenger();
const $bookmarker = useBookmarker();
const $common = useCommonData();

const calId = ($route.params["cal"] as string) ?? "";

const ERROR_CLASS = "error";
const ERROR_ANIM_DURATION = "0.33s";

const bookName = ref<string>("");
const inputRef = ref<HTMLInputElement | null>(null);

const bookmarks = ref<Bookmark[]>([]);

const updateBookmarks = () =>
  (bookmarks.value = bookmarkService.getAllBookmarks());

const deleteCurrentBookmark = () => {
  bookmarkService.deleteBookmark($bookmarker.bookmarkName);
  $bookmarker.setBookmark(false);
  updateBookmarks();
};

const addBookmark = () => {
  const bookname = bookName.value;
  if (
    bookmarkService.isValidBookmarkName(bookname) &&
    !bookmarkService.doesNameExists(bookname)
  ) {
    bookmarkService.addBookmark(bookname, calId);
    bookName.value = "";
    $bookmarker.setBookmark(true, bookname);
  } else
    animationService.triggerCssAnimation(
      [inputRef.value],
      ERROR_CLASS,
      ERROR_ANIM_DURATION,
      () => {
        return;
      },
    );
  updateBookmarks();
};

const deleteAllBookmarks = () => {
  bookmarkService.resetBookmarks();
  $bookmarker.setBookmark(false);
  $messenger.setMessage($common.bundles.bookmarksDeletion);
  updateBookmarks();
};

const navigateToBookmark = (elem: string) => {
  $router.push(`/${elem}`);
};

onMounted(() => updateBookmarks());
</script>

<template>
  <RetractableWidget
    tag="bookmarks"
    title="Marque-pages"
    image="/images/bookmark.svg"
  >
    <div class="BookmarkWidget">
      <template v-if="!isIndex">
        <div v-if="!$bookmarker.isBookmarked" class="_currentBookmark">
          <div class="inputField">
            <input
              ref="inputRef"
              v-model="bookName"
              placeholder="Nom du signet"
              type="text"
              @keydown.enter="addBookmark()"
            >
            <TextButton title="Ajouter marque-page" @click="addBookmark()">
              <img src="/icons/bookmark.svg" alt="Add" >
            </TextButton>
          </div>
        </div>
        <div v-else class="_currentBookmark">
          <h3 class="bigTitle">{{ $bookmarker.bookmarkName }}</h3>
          <TextButton title="Supprimer" @click="deleteCurrentBookmark()">
            <img src="/icons/unmark.svg" alt="Bookmark" >
          </TextButton>
        </div>
      </template>
      <ButtonsList v-if="bookmarks.length !== 0">
        <TextButton
          v-for="(e, i) in bookmarks"
          :key="i"
          :title="e.cal"
          @click="navigateToBookmark(e.cal)"
        >
          <img alt="Calendar" src="/icons/calendar.svg" >
          <p>{{ e.name }}</p>
        </TextButton>
        <TextButton
          destructive
          title="Tout supprimer"
          @click="deleteAllBookmarks()"
        >
          <img alt="Unmark" src="/icons/unmark.svg" >
        </TextButton>
      </ButtonsList>
      <div v-else class="_noBookmarks">
        <img src="/images/bookmark.svg" alt="Bookmark" >
        <p>Pas de marque-pages</p>
      </div>
    </div>
  </RetractableWidget>
</template>

<style lang="sass">
.BookmarkWidget
  display: flex
  flex-direction: column
  justify-content: stretch
  align-items: stretch
  gap: 16px

  > ._currentBookmark
    display: flex
    flex-direction: row
    justify-content: center
    align-content: center

    > div
      flex-grow: 1

      > input.error
        animation: InputError v-bind(ERROR_ANIM_DURATION)

    > h3
      align-self: center
      flex-grow: 1
      overflow: hidden
      white-space: nowrap
      text-overflow: ellipsis

  > ._noBookmarks
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    padding: 12px 0
    gap: 8px

    > p
      font-weight: 600

    > img
      height: 36px
</style>
