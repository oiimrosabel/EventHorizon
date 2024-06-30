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
  montReduced: '/' + timeRef.toLocaleString(TIME_LOCALE, { month: '2-digit' })
}
</script>

<template>
  <div :class="{ reduced: isReduced }" class="DateWidget">
    <RouterLink class="DateBackground" title="Retour à la page d'accueil" to="/">
      <img alt="Logo" src="/images/calendar.svg" />
    </RouterLink>
    <div v-if="!isReduced" class="DateText displayOnDesktop">
      <p>{{ timeData.day }}</p>
      <h2>{{ timeData.date }}</h2>
      <p>{{ timeData.month }}</p>
    </div>
    <div v-else class="DateText displayOnDesktop">
      <h2>{{ timeData.date }}</h2>
      <p>{{ timeData.montReduced }}</p>
    </div>
    <div class="DateText displayOnMobile">
      <p>{{ timeData.day }}</p>
      <h2>{{ timeData.date }}</h2>
      <p>{{ timeData.month }}</p>
    </div>
  </div>
</template>

<style lang="sass">
.DateWidget
  display: flex
  flex-direction: column
  justify-content: start
  align-items: stretch
  background: var(--surface)
  border-radius: var(--radius-med)

  > .DateBackground
    width: 100%
    height: 7em
    border-radius: var(--radius-med) var(--radius-med) var(--radius-small) var(--radius-small)
    background: var(--bgimg) no-repeat center center
    background-size: cover
    display: flex
    flex-direction: row
    justify-content: center
    align-items: center

    > img
      height: 4em

      &:hover
        scale: 1.1
        transition: var(--trans)

      &:active
        scale: 0.9
        transition: var(--trans)

  > .DateText
    padding: 12px 0
    display: flex
    flex-direction: row
    justify-content: center
    align-items: baseline
    gap: 6px

  @media (min-width: 1201px)
    &.reduced
      border-radius: var(--radius-small)

      > .DateBackground
        height: 5em
        border-radius: var(--radius-small)

        > img
          height: 2em

      > .DateText
        flex-direction: column
        gap: 0
        padding: 6px 0 12px
        align-items: center
</style>
