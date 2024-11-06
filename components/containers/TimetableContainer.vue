<script setup lang="ts">
import TextButton from "~/components/buttons/TextButton.vue";

const ttRef = ref<HTMLDivElement | null>(null);

const scrollLeft = () => {
  if (ttRef.value) ttRef.value.scrollLeft = 0;
};

const scrollTop = () => {
  document.documentElement.scrollTop = 0;
};
</script>

<template>
  <div ref="ttRef" class="TimetableContainer">
    <slot />
    <TextButton
      title="Revenir au début"
      class="displayOnDesktop"
      @click="scrollLeft()"
    >
      <img src="/icons/back.svg" alt="Back" >
    </TextButton>
    <TextButton
      title="Revenir au début"
      class="displayOnMobile"
      @click="scrollTop()"
    >
      <img src="/icons/top.svg" alt="Back" >
    </TextButton>
  </div>
</template>

<style lang="sass">
.TimetableContainer
  scroll-behavior: smooth
  flex-grow: 1
  display: flex
  background: var(--background)
  padding: 16px

  @media (min-width: 801px)
    margin: 8px 0
    gap: 16px
    flex-direction: row
    overflow: auto
    border-radius: var(--radius-med) 0 0 var(--radius-med)

  @media (max-width: 800px)
    gap: 32px
    flex-direction: column
    border-radius: var(--radius-med) var(--radius-med) 0 0


  > .TextButton
    z-index: 6
    position: fixed
    right: 16px

    @media (min-width: 801px)
      bottom: 24px

    @media (max-width: 800px)
      bottom: 16px
</style>
