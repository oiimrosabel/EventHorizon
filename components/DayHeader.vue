<script setup lang="ts">
import type { EDate, EDuration } from "~/services/calendar/calendar.common";
import { formatService } from "~/services/format/format.service";

defineProps({
  title: {
    type: Object as PropType<EDate>,
    default: undefined,
  },
  length: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Object as PropType<EDuration>,
    default: (): EDuration => ({
      h: 0,
      m: 0,
    }),
  },
});
</script>

<template>
  <div class="DayHeader">
    <div>
      <h3 class="title">{{ title.day.nm }}</h3>
      <h1 class="statTitle">{{ title.day.dg }}</h1>
      <p>{{ title.month.nm }}</p>
    </div>
    <div>
      <div>
        <p>{{ length }} cours</p>
      </div>
      <div>
        <p>
          {{ formatService.formatHour(duration, "h", true) }}
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
