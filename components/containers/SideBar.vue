<script lang="ts" setup>
import IndexButton from "@/components/IndexButton.vue";
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
  display: flex
  justify-content: stretch
  align-items: center
  background: var(--widget)
  padding: 16px

  @media (min-width: 801px)
    flex-direction: column
    width: 80px

  @media (max-width: 800px)
    flex-direction: row

  > div
    flex: 1 1

  div
    display: flex
    justify-content: end
    align-items: center
    gap: 12px

    @media (min-width: 801px)
      flex-direction: column

    @media (max-width: 800px)
      flex-direction: row
      flex-wrap: wrap

    hr
      color: var(--font)
      width: 50%
      opacity: 33%
      border-radius: var(--radius-button)

      @media (max-width: 800px)
        display: none
</style>
