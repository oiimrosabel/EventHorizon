<script lang="ts" setup>
import { ELog } from '@/code/calendar/calendar.main.ts'
import { type PropType } from 'vue'

const props = defineProps({
  log: {
    required: true,
    type: Object as PropType<ELog>,
  },
  refreshRate: {
    type: Number,
    default: 0,
  },
})

const formatedRefreshRate =
  props.refreshRate < 60 ? `${props.refreshRate}s` : `~${Math.floor(props.refreshRate / 60)}m`
</script>

<template>
  <div class="CalendarLog">
    <div title="ID de l'EDT">
      <img src="/icons/credits.svg" alt="Calendar" />
      <p>{{ $route.params['cal'] }}</p>
    </div>
    <div title="Date et heure de rafraîchissement">
      <img src="/icons/refresh.svg" alt="Refresh" />
      <p>
        {{ log.dateUpdated.toString(true) }}
        {{ log.timeUpdated.toString() }}
      </p>
    </div>
    <div :title="`Intervalle de rafraîchissement (${refreshRate} secondes)`">
      <img src="/icons/time.svg" alt="Refresh Rate" />
      <p>Rafraîch° : {{ formatedRefreshRate }}</p>
    </div>
    <div title="Nombre de jours affiché">
      <img src="/icons/calendar.svg" alt="Refresh" />
      <p>{{ log.weeks * 7 }} jours</p>
    </div>
  </div>
</template>

<style lang="sass">
.CalendarLog
  display: grid
  grid-template-columns: 1fr 1fr
  grid-auto-rows: 1fr
  flex-direction: column
  justify-content: stretch
  align-items: stretch
  padding: 12px 16px 8px
  column-gap: 0
  row-gap: 8px

  > div
    display: flex
    flex-direction: row
    justify-content: start
    align-items: baseline
    gap: 8px

    > p
      font-size: 12px
      opacity: 0.75

    > img
      height: 10px
      filter: var(--filter)
</style>
