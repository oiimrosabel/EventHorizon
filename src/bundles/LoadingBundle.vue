<script lang="ts" setup>
import MessageTemplate from '@/components/MessageTemplate.vue'

defineProps({
  title: {
    type: String,
    default: 'Chargement...'
  }
})
</script>

<template>
  <MessageTemplate subtitle="Chargement..." image="/images/loading.png" />
</template>
