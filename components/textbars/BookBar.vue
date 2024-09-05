<script lang="ts" setup>
import { ref } from "vue";
import TextButton from "@/components/TextButton.vue";
import { animationService } from "@/assets/code/animations/animations.service";
import { bookmarkService } from "@/assets/code/bookmark/bookmark.service";
import { useRoute } from "vue-router";

const emits = defineEmits(["added"]);

const $bookmark = useBookmarker();

const ERROR_CLASS = "error";
const ERROR_ANIM_DURATION = "0.33s";

const bookName = ref("");
const inputRef = ref(null);

const $route = useRoute();
const calId = $route.params["cal"] as string;

const addBookmark = () => {
  if (
    bookmarkService.isValidBookmarkName(bookName.value) &&
    !bookmarkService.isNameExists(calId)
  ) {
    bookmarkService.addBookmark(bookName.value, calId);
    $bookmark.bookmark = true;
    emits("added");
  } else
    animationService.animateStep([inputRef.value], {
      callback: () => {},
      classTag: ERROR_CLASS,
      duration: ERROR_ANIM_DURATION,
    });
};
</script>

<template>
  <div class="BookBar">
    <input
      ref="inputRef"
      v-model="bookName"
      placeholder="Nom du signet"
      type="text"
      @keydown.enter="addBookmark()"
    />
    <TextButton @click="addBookmark()">
      <img alt="Save" src="/icons/add.svg" />
    </TextButton>
  </div>
</template>

<style lang="sass">
.BookBar
  display: flex
  flex-direction: row
  justify-content: stretch
  align-items: stretch
  gap: 8px

  > input
    flex: 1 1
    background: var(--button)
    border: none
    border-radius: var(--radius-button)
    outline: none
    text-align: center
    color: var(--text)
    transition: var(--trans)
    min-width: 0
    transform-origin: center
    font-family: 'Montserrat', sans-serif
    font-weight: 500

    &.error
      animation: InputError v-bind(ERROR_ANIM_DURATION)

    &:hover
      background: var(--hover)

    &::placeholder
      color: var(--text)
</style>
