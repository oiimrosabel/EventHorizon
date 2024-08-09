<script lang="ts" setup>
import BreathingPicture from "@/components/BreathingPicture.vue";

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
  <div class="MessageTemplate">
    <div class="MessageTitle">
      <BreathingPicture v-if="image" size="128px">
        <img alt="Logo" :src="image" />
      </BreathingPicture>
      <h1 v-if="title">{{ title }}</h1>
      <p v-if="description">{{ description }}</p>
      <slot></slot>
    </div>
  </div>
</template>

<style lang="sass">
.MessageTemplate
  flex-grow: 1
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  gap: 32px
  padding: 32px
  animation: FromBelow ease-in-out 0.5s

  > .MessageTitle
    padding: 64px 48px
    background: var(--background)
    border-radius: var(--radius-med)
    backdrop-filter: var(--blur)
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    gap: 24px
    min-width: 400px

    > *
      text-align: center

    > p
      margin-top: -16px
</style>
