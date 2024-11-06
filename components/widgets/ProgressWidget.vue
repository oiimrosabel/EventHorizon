<script lang="ts" setup>
defineProps({
  progression: {
    type: Number,
    default: 0,
  },
});
</script>

<template>
  <div class="ProgressWidget">
    <div>
      <h3 class="statTitle">{{ progression }} &percnt;</h3>
      <p>de la journée complétée</p>
    </div>
    <progress max="100" :value="progression" />
  </div>
</template>

<style lang="sass">
.ProgressWidget
  display: flex
  flex-direction: column
  justify-content: stretch
  align-items: stretch
  padding: 16px
  gap: 16px
  transition: var(--trans)
  border-radius: var(--radius-small)
  background: var(--widget)

  > div
    display: flex
    flex-direction: column
    justify-content: stretch
    align-items: start

  > progress
    background: var(--background)
    border: none
    height: 4px
    border-radius: var(--radius-button)

    &::-moz-progress-bar, &::-webkit-progress-bar
      background: var(--main)
      border-radius: var(--radius-button)
</style>
