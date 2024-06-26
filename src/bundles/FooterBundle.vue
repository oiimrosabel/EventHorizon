<script setup lang="ts">
import CustomFooter from '@/components/containers/CustomFooter.vue'
import links from '@/assets/data/links.json'
</script>

<template>
  <CustomFooter>
    <p>Fait par <a :href="links.dev">Nerd</a></p>
    <p>&bull;</p>
    <a :href="links.github">Dépôt du projet</a>
  </CustomFooter>
</template>
