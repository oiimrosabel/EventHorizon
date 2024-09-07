<script lang="ts" setup>
import { calendarService } from "@/assets/code/calendar/calendar.service";
import { type PropType } from "vue";
import type { Event } from "@/assets/code/calendar/calendar-interfaces";

const props = defineProps({
  event: {
    type: Object as PropType<Event>,
    required: true,
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

const $cards = useCardsState();
const $event = useEventCard();

const SEPARATOR = ", ";
const PLACEHOLDER = "-";

const locationsText =
  props.event?.locations.length === 0
    ? PLACEHOLDER
    : props.event?.locations.join(SEPARATOR);
const teachersText =
  props.event?.teachers.length === 0
    ? PLACEHOLDER
    : props.event?.teachers.join(SEPARATOR);

const showEventInfo = () => {
  if (!props.event) return;
  $event.isHappening = props.isHappening;
  $event.data = props.event;
  $event.type = calendarService.getCourseType(props.event?.title[1]) ?? "";
  $event.title = props.event?.title[0];
  $cards.event = true;
};
</script>

<template>
  <div
    :class="{ happening: isHappening, clickable: event }"
    class="EventWidget"
    @click="showEventInfo"
  >
    <template v-if="event">
      <h4
        :title="event.title[0]"
        v-html="calendarService.formatTitle(event.title)"
      />
      <div>
        <img alt="Time" src="/icons/time.svg" />
        <p>
          {{ event.start.join(":") }} - {{ event.end.join(":") }} ({{
            event.duration.join("h")
          }})
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
    </template>
    <template v-else>
      <img alt="Calendar" src="/images/done.svg" />
      <p>{{ placeholder }}</p>
    </template>
  </div>
</template>

<style lang="sass">
.EventWidget
  display: flex
  flex-direction: column
  align-items: stretch
  justify-content: start
  background: var(--widget)
  padding: 20px 24px 24px
  gap: 12px
  transition: var(--trans)
  border-radius: var(--radius-small)

  &.happening
    padding-left: 32px
    box-shadow: inset var(--active) 4px 0 0

  &.clickable:hover
    background: var(--hover)

  &.clickable:active
    background: var(--active)

  > img
    height: 32px
    align-self: center

  > p
    font-weight: 600
    text-align: center
    margin-bottom: -4px

  > h4
    text-align: center
    overflow: hidden
    white-space: nowrap
    text-overflow: ellipsis
    border-radius: var(--radius-small)
    margin-bottom: 4px

    > span
      opacity: 0.66
      font-size: 0.8em

  > div
    display: flex
    flex-direction: row
    justify-content: start
    align-items: center
    gap: 12px
    border-radius: var(--radius-button)

    > p
      font-size: 0.9em
      overflow: hidden
      white-space: nowrap
      text-overflow: ellipsis

    > img
      height: 18px
      filter: var(--filter)
</style>
