<script lang="ts" setup>
import { ref } from 'vue'
import LookupBundle from '@/bundles/LookupBundle.vue'
import MessageTemplate from '@/components/MessageTemplate.vue'
import TextButton from '@/components/buttons/TextButton.vue'
import displayData from '@/assets/data/display.json'

const isLookupShown = ref(false)
</script>

<template>
  <LookupBundle v-if="isLookupShown" @hide="isLookupShown = false" />
  <MessageTemplate
    :title="displayData.notFound.title"
    :description="displayData.notFound.description"
    image="/images/error.svg"
  >
    <TextButton @click="isLookupShown = true">
      <img alt="Search" src="/icons/search.svg" />
      <p>Chercher</p>
    </TextButton>
    <TextButton @click="$router.push('/')">
      <img alt="Home" src="/icons/home.svg" />
      <p>Accueil</p>
    </TextButton>
  </MessageTemplate>
</template>
