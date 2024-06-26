<script lang="ts" setup>
import { calendarService } from '@/assets/code/calendar/calendar.service'
import type { PropType } from 'vue'
import type { Event } from '@/assets/code/calendar/calendar-interfaces'

const props = defineProps({
  event: {
    type: Object as PropType<Event>,
    required: true
  },
  isHappening: {
    type: Boolean,
    default: false
  }
})

const SEPARATOR = ', '
const PLACEHOLDER = '-'

const locationsText =
  props.event?.locations.length === 0 ? PLACEHOLDER : props.event?.locations.join(SEPARATOR)
const teachersText =
  props.event?.teachers.length === 0 ? PLACEHOLDER : props.event?.teachers.join(SEPARATOR)
</script>

<template>
  <div :class="{ happening: isHappening }" class="EventWidget">
    <h4 :title="event.title" v-html="calendarService.getEventTypeAsSpanner(event.title)"></h4>
    <div>
      <img alt="Time" src="/icons/time.png" />
      <p>{{ event.start }} - {{ event.end }} ({{ event.duration }})</p>
    </div>
    <div>
      <img alt="Location" src="/icons/location.png" />
      <p>{{ locationsText }}</p>
    </div>
    <div>
      <img alt="Teacher" src="/icons/teacher.png" />
      <p>{{ teachersText }}</p>
    </div>
  </div>
</template>

<style lang="sass">
.EventWidget
  display: flex
  flex-direction: column
  align-items: stretch
  justify-content: start
  background: var(--surface)
  padding: 16px 24px
  gap: 12px
  border-radius: var(--radius-small)

  &.happening
    background: color-mix(in srgb, var(--widget) 80%, var(--hover) 20%)

  > h4
    text-align: center
    overflow: hidden
    white-space: nowrap
    text-overflow: ellipsis
    transition: all 0.1s
    border-radius: var(--radius-small)

    &:hover
      padding: 4px
      background: color-mix(in srgb, var(--widget), transparent 33%)
      white-space: wrap

    > span
      opacity: 0.66
      font-size: 0.8em

  > div
    display: flex
    flex-direction: row
    justify-content: start
    align-items: center
    gap: 12px
    border-radius: var(--radius-inf)
    transition: all 0.1s

    > p
      font-size: 0.9em
      overflow: hidden
      white-space: nowrap
      text-overflow: ellipsis
      padding: 0

    &:hover
      padding: 4px 0 4px 10px
      background: color-mix(in srgb, var(--widget), transparent 33%)

      > p
        white-space: wrap


    > img
      height: 1em
      filter: var(--filter)
</style>
