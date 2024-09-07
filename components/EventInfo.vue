<script lang="ts" setup>
import { type PropType } from "vue";
import type { Event } from "@/assets/code/calendar/calendar-interfaces";

defineProps({
  event: {
    type: Object as PropType<Event>,
    required: true,
  },
  isHappening: {
    type: Boolean,
    default: false,
  },
});

const SEPARATOR = ", ";
</script>

<template>
  <div class="EventInfo">
    <div>
      <img alt="Day" src="/icons/calendar.svg" />
      <p>{{ event.date.join(" ") }}</p>
    </div>
    <div>
      <img alt="Time" src="/icons/time.svg" />
      <p>
        {{ event.start.join(":") }} &rightarrow; {{ event.end.join(":") }} ({{
          event.duration.join("h")
        }})
      </p>
    </div>
    <div v-if="event.locations.length !== 0">
      <img alt="Location" src="/icons/location.svg" />
      <p>{{ event.locations.join(SEPARATOR) }}</p>
    </div>
    <div v-if="event.teachers.length !== 0">
      <img alt="Teacher" src="/icons/teacher.svg" />
      <p>{{ event.teachers.join(SEPARATOR) }}</p>
    </div>
  </div>
</template>

<style lang="sass">
.EventInfo
  display: flex
  flex-direction: column
  align-items: stretch
  justify-content: start
  gap: 16px

  @media (min-width: 801px)
    padding-left: 16px
    padding-right: 16px

  > div
    display: flex
    flex-direction: row
    justify-content: stretch
    align-items: center
    gap: 12px
    border-radius: var(--radius-button)

    > img
      height: 20px
      filter: var(--filter)

    @media (max-width: 800px)
      > p
        font-size: 0.95em
</style>
