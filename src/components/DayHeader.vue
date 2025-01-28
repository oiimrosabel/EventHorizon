<script setup lang="ts">
import { EDay } from '@/code/calendar/calendar.main.ts'
import type { PropType } from 'vue'

const props = defineProps({
  day: {
    type: Object as PropType<EDay>,
    required: true,
  },
})

const dateAsList = props.day.date.toList()
</script>

<template>
  <div class="DayHeader">
    <div>
      <h3 class="title">{{ dateAsList[0] }}</h3>
      <h1 class="statTitle">{{ dateAsList[1] }}</h1>
      <p>{{ dateAsList[2] }}</p>
    </div>
    <div>
      <div>
        <p>{{ day.length }} cours</p>
      </div>
      <div>
        <p>
          {{ day.duration.toString() }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
.DayHeader
  display: flex
  flex-direction: column
  justify-content: stretch
  align-items: stretch
  position: sticky
  background: var(--background)
  z-index: 5
  gap: 8px
  top: 0

  @media (min-width: 801px)
    padding: 0 16px 12px

  @media (max-width: 800px)
    padding: 12px

  > div:first-of-type
    flex-grow: 1
    display: flex
    flex-direction: row
    align-items: baseline
    justify-content: start
    gap: 4px

  > div:nth-of-type(2)
    display: flex
    flex-direction: row
    align-items: center
    justify-content: start
    gap: 8px

    > div
      font-weight: 600
      padding: 4px 10px
      border-radius: var(--radius-button)

      &:first-of-type
        background: var(--hover)

      &:nth-of-type(2)
        background: var(--active)
</style>
