<script lang="ts" setup>
import ButtonsList from '@/components/containers/ButtonsList.vue'
import TextButton from '@/components/buttons/TextButton.vue'
import OverlayMenu from '@/components/OverlayMenu.vue'
import { linksService } from '@/assets/code/links/links.service'

defineEmits(['hide'])
</script>

<template>
  <OverlayMenu @hide="$emit('hide')">
    <template #title>
      <img alt="Share" src="/images/share.png" />
      <h2>Partager</h2>
    </template>
    <ButtonsList>
      <TextButton @click="linksService.shareData(linksService.getFullUrl())">
        <img alt="Share" src="/icons/share.svg" />
        <p>Partager</p>
      </TextButton>
      <TextButton @click="linksService.copyDataToClipboard(linksService.getFullUrl())">
        <img alt="Copy" src="/icons/copy.svg" />
        <p>Copier</p>
      </TextButton>
    </ButtonsList>
  </OverlayMenu>
</template>
