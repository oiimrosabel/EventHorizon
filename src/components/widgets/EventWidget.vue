<script lang="ts" setup>
import { calendarService } from '@/assets/code/calendar/calendar.service'
import { type PropType, ref } from 'vue'
import type { Event } from '@/assets/code/calendar/calendar-interfaces'
import OverlayMenu from '@/components/OverlayMenu.vue'
import BigEventWidget from '@/components/widgets/BigEventWidget.vue'

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

const isShown = ref(false)

const titleText = calendarService.formatTitle(props.event?.title)
const locationsText =
  props.event?.locations.length === 0 ? PLACEHOLDER : props.event?.locations.join(SEPARATOR)
const teachersText =
  props.event?.teachers.length === 0 ? PLACEHOLDER : props.event?.teachers.join(SEPARATOR)
</script>

<template>
  <OverlayMenu v-if="isShown" @hide="isShown = false">
    <template #title>
      <img src="/images/calendar.svg" alt="Calendar" />
      <h2 v-html="titleText" />
      <p v-if="event.title[1] !== ''">{{ event.title[1] }}</p>
      <b v-if="isHappening">en cours</b>
    </template>
    <BigEventWidget :event="event" />
  </OverlayMenu>
  <div :class="{ happening: isHappening }" class="EventWidget" @click="isShown = true">
    <h4 :title="event.title.join(' ')" v-html="calendarService.formatTitle(event.title)"></h4>
    <div>
      <img alt="Time" src="/icons/time.svg" />
      <p>
        {{ event.start.join(':') }} - {{ event.end.join(':') }} ({{ event.duration.join('h') }})
      </p>
    </div>
    <div>
      <img alt="Location" src="/icons/location.svg" />
      <p>{{ locationsText }}</p>
    </div>
    <div>
      <img alt="Teacher" src="/icons/teacher.svg" />
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
  padding: 24px 32px
  gap: 16px
  transition: var(--trans)
  border-radius: var(--radius-small)

  &:hover
    background: var(--hover)

  &:active
    background: var(--active)

  &.happening
    background: var(--widget)

  > h4
    text-align: center
    overflow: hidden
    white-space: nowrap
    text-overflow: ellipsis
    border-radius: var(--radius-small)

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

    > p
      font-size: 0.9em
      overflow: hidden
      white-space: nowrap
      text-overflow: ellipsis

    > img
      height: 20px
      filter: var(--filter)
</style>
