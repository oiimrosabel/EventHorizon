<script lang="ts" setup>
import { calendarService } from "@/assets/code/calendar/calendar.service";
import { type PropType, ref } from "vue";
import type { Event } from "@/assets/code/calendar/calendar-interfaces";
import CardMenu from "~/components/containers/CardMenu.vue";
import EventInfo from "@/components/widgets/EventInfo.vue";

const props = defineProps({
  event: {
    type: Object as PropType<Event>,
    required: true,
  },
  isHappening: {
    type: Boolean,
    default: false,
  },
});

const $cards = useCardDisplay();
const $event = useEventInfoDisplayer();

const SEPARATOR = ", ";
const PLACEHOLDER = "-";

const titleText = calendarService.formatTitle(props.event?.title);
const locationsText =
  props.event?.locations.length === 0
    ? PLACEHOLDER
    : props.event?.locations.join(SEPARATOR);
const teachersText =
  props.event?.teachers.length === 0
    ? PLACEHOLDER
    : props.event?.teachers.join(SEPARATOR);

const showEventInfo = () => {
  $event.isHappening.value = props.isHappening;
  $event.data.value = props.event;
  $event.type.value = props.event?.title[1] ?? "";
  $event.title.value = titleText ?? "";
  $cards.event = true;
};
</script>

<template>
  <div
    :class="{ happening: isHappening }"
    class="EventWidget"
    @click="showEventInfo"
  >
    <h4
      :title="event.title.join(' ')"
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

  &:hover
    background: var(--hover)

  &:active
    background: var(--active)

  &.happening
    background: var(--button)

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
