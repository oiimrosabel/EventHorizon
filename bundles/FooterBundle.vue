<script setup lang="ts">
import links from "assets/data/links.json";
</script>

<template>
  <footer class="CustomFooter">
    <p>Fait par <a :href="links.dev">Rosabel</a></p>
    <p>&bull;</p>
    <a :href="links.github">Dépôt du projet</a>
  </footer>
</template>

<style lang="sass">
.CustomFooter
  width: 100%
  display: flex
  justify-content: center
  align-items: center
  gap: 12px
  opacity: 0.66
  font-size: 0.9em

  a
    color: var(--text)
    font-weight: bold
    text-decoration: none
    flex-direction: row

  @media (max-width: 800px)
    flex-direction: column
    gap: 8px

    > *:nth-child(2n)
      display: none
</style>
