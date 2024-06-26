<script lang="ts" setup>
import { ref } from 'vue'
import LookupBundle from '@/bundles/LookupBundle.vue'
import MessageTemplate from '@/components/MessageTemplate.vue'
import TextButton from '@/components/buttons/TextButton.vue'

const isLookupShown = ref(false)
</script>

<template>
  <LookupBundle v-if="isLookupShown" @hide="isLookupShown = false" />
  <MessageTemplate
    title="Erreur 404"
    description="Mauvais chemin, veuillez revenir à l'accueil."
    image="/images/error.png"
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
