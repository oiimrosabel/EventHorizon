<script lang="ts" setup>
import CardMenu from "@/components/containers/CardMenu.vue";
import BookBar from "@/components/textbars/BookBar.vue";

const $cards = useCardsState();
const hideRef = ref(false);
</script>

<template>
  <CardMenu :enable-hide="hideRef" @hide="$cards.bookmark = false">
    <template #title>
      <img alt="Bookmark" src="/images/bookmark.svg" />
      <h2>Ajouter un signet</h2>
    </template>
    <BookBar @added="hideRef = true" />
  </CardMenu>
</template>
