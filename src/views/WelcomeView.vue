<script lang="ts" setup>
import { ref } from 'vue'
import ThemeBundle from '@/bundles/ThemeBundle.vue'
import LookupBundle from '@/bundles/LookupBundle.vue'
import TextButton from '@/components/buttons/TextButton.vue'
import MessageTemplate from '@/components/MessageTemplate.vue'
import FooterBundle from '@/bundles/FooterBundle.vue'

const isThemeShown = ref(false)
const isLookupShown = ref(false)
</script>

<template>
  <ThemeBundle v-if="isThemeShown" @hide="isThemeShown = false" />
  <LookupBundle v-if="isLookupShown" @hide="isLookupShown = false" />
  <MessageTemplate
    subtitle="Bienvenue sur"
    title="EventHorizon"
    description="Parce que AdeCampus est horrible."
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
