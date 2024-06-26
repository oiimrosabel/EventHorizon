<script lang="ts" setup>
import ButtonsList from '@/components/containers/ButtonsList.vue'
import BreathingPicture from '@/components/BreathingPicture.vue'

defineProps({
  title: {
    type: String,
    default: undefined
  },
  subtitle: {
    type: String,
    default: undefined
  },
  description: {
    type: String,
    default: undefined
  },
  image: {
    type: String,
    default: undefined
  }
})
</script>

<template>
  <div class="MessageTemplate">
    <div class="MessageTitle">
      <BreathingPicture size="128px" v-if="image">
        <img alt="Logo" :src="image" />
      </BreathingPicture>
      <div>
        <h3 v-if="subtitle">{{ subtitle }}</h3>
        <h1 v-if="title">{{ title }}</h1>
      </div>
      <p v-if="description">{{ description }}</p>
    </div>
    <ButtonsList>
      <slot></slot>
    </ButtonsList>
  </div>
</template>

<style lang="sass">
.MessageTemplate
  position: absolute
  left: 0
  right: 0
  top: 0
  bottom: 0
  display: flex
  flex-direction: column
  justify-content: center
  align-items: stretch
  gap: 32px
  padding: 32px
  animation: FromBelow ease-in-out 0.5s

  > .MessageTitle
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    gap: 32px

    > *
      text-align: center

    > div
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center

    > p
      margin-top: -16px
</style>
