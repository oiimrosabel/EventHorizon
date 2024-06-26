<script lang="ts" setup>
import { ref } from 'vue'
import LookupBundle from '@/bundles/LookupBundle.vue'
import TextButton from '@/components/buttons/TextButton.vue'
import MessageTemplate from '@/components/MessageTemplate.vue'

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

const sillySecret = (mod: number = 5) =>
  Math.round(Math.random() * mod) === mod ? '/images/oi.png' : '/images/error.png'
</script>

<template>
  <LookupBundle v-if="isLookupShown" @hide="isLookupShown = false" />
  <MessageTemplate
    title="Une erreur est survenue"
    description="Veuillez réessayer."
    :image="sillySecret()"
  >
    <TextButton @click="isLookupShown = true">
      <img alt="Search" src="/icons/search.png" />
      <p>Réssayer</p>
    </TextButton>
    <TextButton @click="$router.push('/')">
      <img alt="Home" src="/icons/home.png" />
      <p>Accueil</p>
    </TextButton>
  </MessageTemplate>
</template>
