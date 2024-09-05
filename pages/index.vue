<script lang="ts" setup>
import BreathingPicture from "@/components/BreathingPicture.vue";

import displayData from "@/assets/data/display.json";
import links from "@/assets/data/links.json";
import SearchBar from "@/components/textbars/SearchBar.vue";
</script>

<template>
  <div class="Index">
    <div class="IndexCard">
      <BreathingPicture size="128px">
        <img alt="Logo" src="/images/logo.svg" />
      </BreathingPicture>
      <h1>{{ displayData.home.title }}</h1>
      <SearchBar />
      <footer>
        <p>Fait par <a :href="links.dev">Rosabel</a></p>
        <p>&bull;</p>
        <a :href="links.github">Dépôt du projet</a>
        <p>&bull;</p>
        <a :href="links.credits">Crédits</a>
      </footer>
    </div>
  </div>
</template>

<style lang="sass">
.Index
  flex-grow: 1
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center

  @media (min-width: 801px)
    justify-content: center
    align-items: center

  @media (max-width: 800px)
    justify-content: end
    align-items: stretch

  > .IndexCard
    background: var(--background)
    border-radius: var(--radius-med)
    backdrop-filter: var(--blur)
    display: flex
    flex-direction: column
    align-items: stretch
    gap: 24px
    animation: FromAbove ease-in-out 0.5s

    @media (min-width: 801px)
      min-width: 500px
      padding: 64px

    @media (max-width: 800px)
      padding: 48px 32px 32px

    > .BreathingPicture
      align-self: center

    > *
      text-align: center

footer
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
</style>
