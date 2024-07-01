<script lang="ts" setup>
import MessageTemplate from '@/components/MessageTemplate.vue'
import displayData from '@/assets/data/display.json'
</script>

<template>
  <MessageTemplate :subtitle="displayData.loading.title" image="/images/loading.svg" />
</template>
