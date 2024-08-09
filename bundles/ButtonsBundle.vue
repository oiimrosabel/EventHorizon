<script setup lang="ts">
import { linksService } from "assets/code/links/links.service";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { bookmarkService } from "assets/code/bookmark/bookmark.service";
import SideBar from "~/components/sidebar/SideBar.vue";

const route = useRoute();
const calId = route.params["cal"] as string;

const $cards = useCardDisplay();

const isBookmarked = ref(bookmarkService.isBooked(calId));

const bookmarkWrapper = () => {
  bookmarkService.toggleBookmark(calId);
  isBookmarked.value = bookmarkService.isBooked(calId);
};
</script>

<template>
  <SideBar>
    <div v-if="$route.path !== '/'">
      <TextButton @click="$cards.share = true" title="Partager">
        <img src="/icons/share.svg" alt="Share" />
      </TextButton>
      <TextButton title="Sauvegarder" @click="bookmarkWrapper()">
        <img
          alt="Bookmark"
          :src="`/icons/${isBookmarked ? 'marked' : 'bookmark'}.svg`"
        />
      </TextButton>
      <TextButton title="Rafraîchir" @click="linksService.reloadPage()">
        <img src="/icons/refresh.svg" alt="Refresh" />
      </TextButton>
      <hr />
    </div>
    <div>
      <TextButton @click="$cards.lookup = true" title="Rechercher">
        <img src="/icons/search.svg" alt="Search" />
      </TextButton>
      <TextButton @click="$cards.theme = true" title="Thème">
        <img src="/icons/theme.svg" alt="Theme" />
      </TextButton>
    </div>
  </SideBar>
</template>
