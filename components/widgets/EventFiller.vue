<script lang="ts" setup>
defineProps({
  placeholder: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="EventFiller">
    <img src="/images/done.svg" alt="Done" >
    <p>{{ placeholder }}</p>
  </div>
</template>

<style lang="sass">
.EventFiller
  flex-grow: 1
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  padding: 32px 0
  gap: 8px
  background: color-mix(in srgb, var(--widget), var(--background) 50%)
  border-radius: var(--radius-med)

  > p
    font-weight: 600

  > img
    height: 36px
</style>
