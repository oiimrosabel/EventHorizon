<script lang="ts" setup>
import { ref } from 'vue'
import ThemeBundle from '@/bundles/ThemeBundle.vue'
import LookupBundle from '@/bundles/LookupBundle.vue'
import TextButton from '@/components/buttons/TextButton.vue'
import MessageTemplate from '@/components/MessageTemplate.vue'
import FooterBundle from '@/bundles/FooterBundle.vue'
import displayData from '@/assets/data/display.json'

const isThemeShown = ref(false)
const isLookupShown = ref(false)
</script>

<template>
  <ThemeBundle v-if="isThemeShown" @hide="isThemeShown = false" />
  <LookupBundle v-if="isLookupShown" @hide="isLookupShown = false" />
  <MessageTemplate
    :subtitle="displayData.home.subtitle"
    :title="displayData.home.title"
    :description="displayData.home.catchprase"
    image="/images/logo.svg"
  >
    <TextButton @click="isLookupShown = true">
      <img alt="Search" src="/icons/search.svg" />
      <p>Rechercher</p>
    </TextButton>
    <TextButton @click="isThemeShown = true">
      <img alt="Theme" src="/icons/theme.svg" />
    </TextButton>
  </MessageTemplate>
  <FooterBundle />
</template>
