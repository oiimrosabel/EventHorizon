<script lang="ts" setup>
import OverlayMenu from '@/components/OverlayMenu.vue'
import LookupWidget from '@/components/widgets/LookupWidget.vue'
import ButtonsList from '@/components/containers/ButtonsList.vue'
import TextButton from '@/components/buttons/TextButton.vue'
import { bookmarkService } from '@/assets/code/bookmark/bookmark.service'
import { linksService } from '@/assets/code/links/links.service'
import { ref } from 'vue'

const emits = defineEmits(['hide', 'cleaned'])

const bookmarks = bookmarkService.getBookmarks()

const isBookmarksDisplayed = ref(bookmarks.length !== 0)

const cleanBookmarks = () => {
  bookmarkService.deleteAllBookmarks()
  isBookmarksDisplayed.value = false
  emits('cleaned')
}
</script>

<template>
  <OverlayMenu @hide="$emit('hide')">
    <template #title>
      <img alt="Calendar" src="/images/switch.svg" />
      <h2>Changer d'emploi du temps</h2>
    </template>
    <LookupWidget />
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
        <TextButton @click="cleanBookmarks()">
          <img alt="Unmark" src="/icons/unmark.svg" />
          <p>Nettoyer</p>
        </TextButton>
      </ButtonsList>
    </template>
  </OverlayMenu>
</template>
