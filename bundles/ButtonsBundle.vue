<script lang="ts" setup>
import { linksService } from "@/assets/code/links/links.service";
import { useRoute } from "vue-router";
import SideBar from "@/components/containers/SideBar.vue";
import { useBookmarker } from "@/composables/useBookmarker";
import { bookmarkService } from "@/assets/code/bookmark/bookmark.service";

const $route = useRoute();

const $cards = useCardsState();

const $bookmark = useBookmarker();

const editBookmark = () => {
  if ($bookmark.bookmark) {
    bookmarkService.deleteBookmark($route.params["cal"] as string);
    $bookmark.bookmark = false;
  } else $cards.bookmark = true;
};
</script>

<template>
  <SideBar>
    <div v-if="$route.path !== '/'">
      <TextButton title="Partager" @click="$cards.share = true">
        <img alt="Share" src="/icons/share.svg" />
      </TextButton>
      <TextButton
        :title="$bookmark.bookmark ? 'Supprimer' : 'Sauvegarder...'"
        @click="editBookmark()"
      >
        <img
          :src="`/icons/${$bookmark.bookmark ? 'marked' : 'bookmark'}.svg`"
          alt="Bookmark"
        />
      </TextButton>
      <TextButton title="Rafraîchir" @click="linksService.reloadPage()">
        <img alt="Refresh" src="/icons/refresh.svg" />
      </TextButton>
      <hr />
    </div>
    <div>
      <TextButton title="Rechercher" @click="$cards.lookup = true">
        <img alt="Search" src="/icons/search.svg" />
      </TextButton>
      <TextButton title="Thème" @click="$cards.theme = true">
        <img alt="Theme" src="/icons/theme.svg" />
      </TextButton>
    </div>
  </SideBar>
</template>
