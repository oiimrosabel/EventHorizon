<script lang="ts" setup>
import { computed, type PropType } from 'vue'
import type { IESummary } from '@/code/calendar/calendar.commons.ts'

const props = defineProps({
  data: {
    type: Object as PropType<IESummary>,
    required: true,
  },
})

const dataTypes = computed(() => props.data.types.entries())
</script>

<template>
  <div class="StatsWidget">
    <div>
      <p class="subtitle">{{ data.duration }} aujourd'hui</p>
      <h3 class="bigTitle">{{ data.length }} cours</h3>
    </div>
    <div>
      <p v-for="(e, i) in dataTypes" :key="i">
        <b>&bull; {{ e[1] }}</b> {{ e[0] }}{{ e[1] == 1 ? '' : 's' }}
      </p>
    </div>
  </div>
</template>

<style lang="sass">
.StatsWidget
  display: flex
  flex-direction: column
  justify-content: stretch
  align-items: stretch
  gap: 16px
  padding: 16px
  background: var(--widget)
  border-radius: var(--radius-small)

  > div:first-of-type
    display: flex
    flex-direction: column
    justify-content: stretch
    align-items: stretch

  > div:nth-of-type(2)
    display: grid
    grid-auto-rows: 1fr
    grid-template-columns: 1fr 1fr
    justify-content: stretch
    align-items: stretch
    gap: 8px
</style>
