<script lang="ts" setup></script>

<template>
  <footer class="CustomFooter">
    <p>Fait par <a href="https://github.com/imalonelynerd">Nerd</a></p>
    <p>&bull;</p>
    <a href="https://github.com/imalonelynerd/EventHorizon">Dépôt du projet</a>
  </footer>
</template>

<style lang="sass">
.CustomFooter
  position: absolute
  bottom: 16px
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

  @media (max-width: 1200px)
    flex-direction: column
    gap: 8px

    > *:nth-child(2n)
      display: none
</style>
