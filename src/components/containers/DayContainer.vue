<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: undefined
  },
  order: {
    type: Number,
    required: true,
    validator: (v: number) => v > 0
  }
})
</script>

<template>
  <div class="DayContainer">
    <h4>{{ title }}</h4>
    <slot></slot>
  </div>
</template>

<style lang="sass">
.DayContainer
  display: flex
  flex-direction: column
  align-items: stretch
  justify-content: start
  gap: 16px
  border-radius: var(--radius-med)

  @media (min-width: 1201px)
    animation: FromAbove ease-in-out 0.25s
    animation-duration: calc(0.3s * v-bind(order))


  @media (max-width: 1200px)
    animation: FromLeft ease-in-out 0.25s
    animation-duration: calc(0.3s * v-bind(order))



  > h4
    text-align: center
</style>
