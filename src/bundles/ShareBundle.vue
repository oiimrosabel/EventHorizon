<script lang="ts" setup>
import ButtonsList from '@/components/containers/ButtonsList.vue'
import TextButton from '@/components/buttons/TextButton.vue'
import OverlayMenu from '@/components/OverlayMenu.vue'
import { linksService } from '@/assets/code/links/links.service'
import { ref } from 'vue'
import { animationService } from '@/assets/code/animations/animations.service'

defineEmits(['hide'])

const elemRef = ref(null)
const messageRef = ref('')

const shareWrapper = () => {
  linksService.shareData(linksService.getFullUrl()).then((r) => {
    messageRef.value = r ? 'Partagé avec succès' : 'Votre navigateur ne supporte pas le partage.'
  })
  animationService.executeAfterDelay([elemRef.value], () => {
    messageRef.value = ''
  })
}

const copyWrapper = () => {
  linksService.copyDataToClipboard(linksService.getFullUrl()).then((r) => {
    messageRef.value = r ? 'Copié avec succès' : 'Votre navigateur ne supporte pas la copie.'
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
