<script lang="ts" setup>
import ButtonsList from '@/components/containers/ButtonsList.vue'
import TextButton from '@/components/buttons/TextButton.vue'
import OverlayMenu from '@/components/OverlayMenu.vue'
import { linksService } from '@/assets/code/links/links.service'
import { ref } from 'vue'
import { animationService } from '@/assets/code/animations/animations.service'
import displayData from '@/assets/data/display.json'

defineEmits(['hide'])

const elemRef = ref(null)
const messageRef = ref('')

const shareWrapper = () => {
  linksService.shareData(linksService.getFullUrl(), displayData.bundles.share.title).then((r) => {
    messageRef.value = r ? displayData.bundles.share.success : displayData.bundles.share.failure
  })
  animationService.executeAfterDelay([elemRef.value], () => {
    messageRef.value = ''
  })
}

const copyWrapper = () => {
  linksService.copyDataToClipboard(linksService.getFullUrl()).then((r) => {
    messageRef.value = r ? displayData.bundles.copy.success : displayData.bundles.copy.failure
  })
  animationService.executeAfterDelay([elemRef.value], () => {
    messageRef.value = ''
  })
}
</script>

<template>
  <OverlayMenu @hide="$emit('hide')">
    <template #title>
      <img alt="Share" src="/images/share.svg" />
      <h2>Partager</h2>
    </template>
    <ButtonsList>
      <TextButton @click="shareWrapper()">
        <img alt="Share" src="/icons/share.svg" />
        <p>Partager</p>
      </TextButton>
      <TextButton @click="copyWrapper()">
        <img alt="Copy" src="/icons/copy.svg" />
        <p>Copier</p>
      </TextButton>
    </ButtonsList>
    <p v-if="messageRef !== ''" ref="elemRef">
      {{ messageRef }}
    </p>
  </OverlayMenu>
</template>
