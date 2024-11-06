<script lang="ts" setup>
import { calendarService } from "~/services/calendar/calendar.service";
import type { PropType } from "vue";
import type { EDetails } from "~/services/calendar/calendar.common";
import { formatService } from "~/services/format/format.service";

const props = defineProps({
  event: {
    type: Object as PropType<EDetails>,
    default: undefined,
  },
  isHappening: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: "",
  },
});

const progressionValue = props.isHappening
  ? `${calendarService.getProgression(props.event, props.event)}`
  : "0";
</script>

<template>
  <div :class="{ happening: isHappening }" class="EventWidget">
    <template v-if="!event">
      <div class="_eventPlaceholder">
        <img src="/images/done.svg" alt="Done" >
        <p>{{ placeholder }}</p>
      </div>
    </template>
    <template v-else>
      <div v-if="!isHappening" class="_eventTimeline">
        <p>{{ formatService.formatHour(event.start, ":") }}</p>
        <div />
        <p>{{ formatService.formatHour(event.end, ":") }}</p>
      </div>
      <div class="_eventInfo">
        <div>
          <p class="subtitle">
            {{ event.title.type ? `${event.title.type} &bull;` : "" }}
            {{ formatService.formatHour(event.duration, "h", true) }}
          </p>
          <h3 class="title">
            {{ event.title.type ? event.title.domain : event.title.raw }}
          </h3>
        </div>
        <div>
          <div>
            <img src="/icons/location.svg" alt="Location" >
            <div>
              <p v-for="(e, i) in event.locations" :key="i">
                {{ e }}
              </p>
            </div>
          </div>
          <div>
            <img src="/icons/teacher.svg" alt="Teacher" >
            <div>
              <p v-for="(e, i) in event.teachers" :key="i">
                {{ e }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="isHappening" class="_eventProgression">
        <p>
          {{ formatService.formatHour(event.start, ":") }} -
          {{ formatService.formatHour(event.end, ":") }}
        </p>
        <progress max="100" :value="progressionValue" />
        <p>{{ progressionValue }}&percnt;</p>
      </div>
    </template>
  </div>
</template>

<style lang="sass">
.EventWidget
  display: flex
  flex-direction: row
  justify-content: stretch
  align-items: stretch
  gap: 16px
  padding: 16px
  background: var(--widget)
  border-radius: var(--radius-small)

  &.happening
    flex-direction: column
    background: var(--main)
    color: var(--background)
    --filter: var(--happening-filter)

  > ._eventInfo
    display: flex
    flex-direction: column
    justify-content: stretch
    align-items: stretch
    gap: 16px

    > div:first-of-type
      display: flex
      flex-direction: column
      justify-content: start
      align-items: start

    > div:nth-of-type(2)
      display: flex
      flex-direction: column
      justify-content: stretch
      align-items: stretch
      gap: 6px

      > div
        display: flex
        flex-direction: row
        justify-content: start
        align-items: start
        gap: 8px

        > div
          display: flex
          flex-direction: column
          justify-content: start
          align-items: start
          gap: 2px

          > p
            font-size: 0.9em

        > img
          height: 16px
          filter: var(--filter)

  > ._eventTimeline
    display: flex
    flex-direction: column
    justify-content: stretch
    align-items: center
    gap: 8px

    > p
      font-weight: 600
      font-size: 0.9em

    > div
      flex-grow: 1
      width: 2px
      border-radius: var(--radius-button)
      background: var(--main)

  > ._eventProgression
    display: flex
    flex-direction: row
    align-items: center
    justify-content: stretch
    gap: 8px

    > p
      font-size: 0.9em
      font-weight: 600

    > progress
      flex-grow: 1
      background: var(--widget)
      border: none
      height: 4px
      border-radius: var(--radius-button)

      &::-moz-progress-bar, &::-webkit-progress-bar
        border-radius: var(--radius-button)
        background: color-mix(in srgb, var(--main), var(--widget))

  > ._eventPlaceholder
    flex-grow: 1
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    padding: 8px 0
    gap: 8px

    > p
      font-weight: 600

    > img
      height: 36px
</style>
