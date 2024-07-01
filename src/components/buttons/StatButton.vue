<script setup lang="ts">
defineProps({
  value: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  }
})
</script>

<template>
  <a class="StatButton">
    <h3>{{ value }}</h3>
    <p>{{ desc }}</p>
  </a>
</template>

<style lang="sass">
.StatButton
  min-width: 0
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  padding: 12px 0
  border-radius: var(--radius-small)
  background: var(--surface)
  transition: var(--trans)
  cursor: default

  > p
    font-size: 0.9em
    width: 80%
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
    text-align: center

  &:hover
    background: var(--widget)
</style>
