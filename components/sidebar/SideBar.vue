<script setup lang="ts">
import IndexButton from "~/components/sidebar/IndexButton.vue";
</script>

<template>
  <div class="SideBar">
    <IndexButton />
    <div>
      <slot />
    </div>
  </div>
</template>

<style lang="sass">
.SideBar
  position: sticky
  display: flex
  flex-direction: column
  justify-content: space-between
  align-items: center
  width: 80px
  background: var(--widget)
  padding: 16px

  div
    display: flex
    flex-direction: column
    justify-content: start
    align-items: center
    gap: 12px

    hr
      color: var(--font)
      width: 50%
      opacity: 33%
      border-radius: var(--radius-button)
</style>
