<script lang="ts" setup>
import type { FormatedCalendar } from "@/assets/code/calendar/calendar-interfaces";
import type { PropType } from "vue";

defineProps({
  data: {
    type: Object as PropType<FormatedCalendar>,
    required: true,
  },
});
</script>

<template>
  <div v-if="data" class="StatsWidget">
    <div>
      <div>
        <h2>{{ data.length }}</h2>
        <p>cours</p>
      </div>
      <div>
        <h2>{{ data.duration }}</h2>
        <p>aujourd'hui</p>
      </div>
    </div>
    <div>
      <div v-for="(e, i) in data.types" :key="i">
        <h3>{{ e }}</h3>
        <p>{{ i }}s</p>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
.StatsWidget
  display: flex
  flex-direction: column
  justify-content: stretch
  align-items: stretch
  gap: 8px

  > div:first-of-type
    display: grid
    grid-auto-rows: 1fr
    grid-template-columns: 1fr 1fr
    justify-content: stretch
    align-items: stretch
    gap: 8px

    > div
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      gap: 2px
      background: var(--widget)
      padding: 16px 0
      border-radius: var(--radius-small)

  > div:nth-of-type(2)
    display: flex
    flex-direction: row
    justify-content: stretch
    align-items: stretch
    gap: 8px

    > div
      flex-grow: 1
      padding: 8px 0
      background: var(--widget)
      border-radius: var(--radius-small)
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
</style>
