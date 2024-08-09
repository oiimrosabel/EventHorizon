<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: undefined,
  },
  description: {
    type: String,
    default: undefined,
  },
  image: {
    type: String,
    default: undefined,
  },
});
</script>

<template>
  <div class="NotificationContainer">
    <div class="NotificationTemplate">
      <img v-if="image" :src="image" alt="Error" />
      <h3 v-if="title">{{ title }}</h3>
      <p v-if="description">{{ description }}</p>
    </div>
  </div>
</template>

<style lang="sass">
.NotificationContainer
  flex-grow: 1
  display: flex
  flex-direction: row
  justify-content: start
  align-items: end
  gap: 32px

.NotificationTemplate
  padding: 24px
  background: var(--background)
  border-radius: var(--radius-small)
  backdrop-filter: var(--blur)
  display: flex
  flex-direction: column
  justify-content: stretch
  align-items: stretch
  gap: 8px
  animation: FromBelow ease-in-out 0.5s

  > img
    align-self: start
    height: 36px
    margin-bottom: 4px
</style>
