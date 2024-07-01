<script lang="ts" setup>
defineProps({
  isReduced: {
    type: Boolean,
    default: true
  }
})

const TIME_LOCALE = 'fr-FR'
const timeRef = new Date()
const timeData = {
  day: timeRef.toLocaleString(TIME_LOCALE, { weekday: 'long' }),
  date: timeRef.getDate(),
  month: timeRef.toLocaleString(TIME_LOCALE, { month: 'short' }),
  dayReduced: timeRef.toLocaleString(TIME_LOCALE, { weekday: 'short' })
}
</script>

<template>
  <div
    :class="{ reduced: isReduced }"
    class="DateWidget displayOnDesktop"
    @click="$router.push('/')"
  >
    <template v-if="!isReduced">
      <p>{{ timeData.day }}</p>
      <h2>{{ timeData.date }}</h2>
      <p>{{ timeData.month }}</p>
    </template>
    <template v-else>
      <p>{{ timeData.dayReduced }}</p>
      <h2>{{ timeData.date }}</h2>
    </template>
  </div>
  <div class="DateWidget displayOnMobile">
    <p>{{ timeData.day }}</p>
    <h2>{{ timeData.date }}</h2>
    <p>{{ timeData.month }}</p>
  </div>
</template>

<style lang="sass">
.DateWidget
  display: flex
  flex-direction: row
  justify-content: center
  align-items: baseline
  margin: calc(var(--quick-gap) * -1)
  background: linear-gradient(transparent, var(--background)), var(--bgimg) no-repeat top center
  background-size: cover
  gap: 6px
  padding: var(--quick-gap)
  cursor: pointer

  @media (min-width: 1201px)
    &.reduced
      padding: calc(var(--quick-gap) * 2) 0
      flex-direction: row
      align-items: baseline
</style>
