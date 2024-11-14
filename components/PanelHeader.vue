<script setup lang="ts">
const $router = useRouter();
const $splash = useSplash();

const goToIndex = () =>
  $splash.fadeIn(() => {
    $router.push("/").then(() => $splash.fadeOut());
  });
</script>

<template>
  <div class="PanelHeader">
    <a @click="goToIndex()">
      <img alt="Index" src="/images/calendar.svg" >
    </a>
  </div>
</template>

<style lang="sass">
.PanelHeader
  z-index: 6
  display: flex
  flex-direction: row
  justify-content: center
  align-items: stretch
  padding: 24px
  margin: 0 -16px -16px
  background: var(--sidebar-bg)
  position: sticky
  top: 0

  > a
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center

    > img
      transition: var(--trans)

      @media (min-width: 801px)
        width: 42px

      @media (max-width: 800px)
        width: 42px

      &:hover
        rotate: 3deg
        scale: 1.05
</style>
