<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: undefined,
  },
  order: {
    type: Number,
    required: true,
    validator: (v: number) => v > 0,
  },
});
</script>

<template>
  <div class="DayContainer">
    <h4>{{ title }}</h4>
    <slot />
  </div>
</template>

<style lang="sass">
.DayContainer
  display: flex
  flex-direction: column
  align-items: stretch
  justify-content: start
  gap: 12px
  padding: 16px
  background: var(--background)
  border-radius: var(--radius-med)

  @media (min-width: 801px)
    flex: 0 0 320px
    max-width: 320px
    animation: FromAbove ease-in-out
    animation-duration: calc(0.1s * v-bind(order))
    height: 100%
    overflow-y: scroll

  @media (max-width: 800px)
    animation: FromLeft ease-in-out
    animation-duration: calc(0.1s * v-bind(order))

  > h4
    text-align: center
    margin-bottom: 2px
</style>
