<script lang="ts" setup>
import { ref } from 'vue'
import LookupBundle from '@/bundles/LookupBundle.vue'
import TextButton from '@/components/buttons/TextButton.vue'
import MessageTemplate from '@/components/MessageTemplate.vue'
import { linksService } from '@/assets/code/links/links.service'

defineProps({
  title: {
    type: String,
    default: 'Erreur'
  },
  description: {
    type: String,
    default: ''
  }
})

const isLookupShown = ref(false)
</script>

<template>
  <LookupBundle v-if="isLookupShown" @hide="isLookupShown = false" />
  <MessageTemplate
    title="Une erreur est survenue"
    description="Veuillez réessayer."
    image="/images/error.png"
  >
    <TextButton @click="linksService.reloadPage()">
      <img alt="Search" src="/icons/refresh.svg" />
      <p>Réssayer</p>
    </TextButton>
    <TextButton @click="isLookupShown = true">
      <img alt="Search" src="/icons/search.svg" />
      <p>Rechercher</p>
    </TextButton>
    <TextButton @click="$router.push('/')">
      <img alt="Home" src="/icons/home.svg" />
      <p>Accueil</p>
    </TextButton>
  </MessageTemplate>
</template>
