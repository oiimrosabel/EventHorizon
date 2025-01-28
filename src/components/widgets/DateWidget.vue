<script lang="ts" setup>
const TIME_LOCALE = 'fr-FR'
const timeRef = new Date()

const timeData = {
  day: timeRef.toLocaleString(TIME_LOCALE, { weekday: 'short' }),
  dayIndex: (timeRef.getDay() - 1) % 7,
  date: timeRef.getDate(),
  month: timeRef.toLocaleString(TIME_LOCALE, { month: 'short' }),
}

const formatDateDots = (current: Date) => {
  const week = []
  const dayIndex = new Date()
  dayIndex.setDate(current.getDate() - Math.abs((current.getDay() - 1) % 7))
  for (let i = 0; i < 7; i++) {
    week.push({
      day: dayIndex.toLocaleString(TIME_LOCALE, { weekday: 'short' }),
      date: dayIndex.getDate(),
      isToday: current.getDay() === dayIndex.getDay(),
    })
    dayIndex.setDate(dayIndex.getDate() + 1)
  }
  return week
}
</script>

<template>
  <div class="DateWidget">
    <div>
      <p class="subtitle">Aujourd'hui</p>
      <h3 class="bigTitle">{{ timeData.day }} {{ timeData.date }} {{ timeData.month }}</h3>
    </div>
    <div>
      <div v-for="(e, i) in formatDateDots(timeRef)" :key="i" :class="{ today: e.isToday }">
        <p>{{ e.day }}</p>
        <h4>{{ e.date }}</h4>
        <span v-if="e.isToday">&bull;</span>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
.DateWidget
  padding: 16px
  background: var(--widget)
  border-radius: var(--radius-small)
  display: flex
  flex-direction: column
  justify-content: stretch
  align-items: stretch
  gap: 16px

  > div:first-of-type
    display: flex
    flex-direction: column
    justify-content: center
    align-items: baseline
    gap: 4px

  > div:nth-of-type(2)
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: start

    > div
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      gap: 4px

      &.today
        > *
          color: var(--main)
          opacity: 1

        > img
          margin-top: 2px
          height: 8px
          opacity: 1

      > *
        opacity: 0.66

      > p
        font-size: 0.9em

      > span
        overflow: hidden
        width: 10px
        height: 10px
        line-height: 6px
        color: var(--active)
        font-size: 36px
        opacity: 0.5
</style>
