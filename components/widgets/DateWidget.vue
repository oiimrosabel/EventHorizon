<script lang="ts" setup>
const TIME_LOCALE = "fr-FR";
const timeRef = new Date();
const timeData = {
  day: timeRef.toLocaleString(TIME_LOCALE, { weekday: "long" }),
  dayIndex: (timeRef.getDay() - 1) % 7,
  date: timeRef.getDate(),
  month: timeRef.toLocaleString(TIME_LOCALE, { month: "short" }),
};

const days = ["L", "M", "M", "J", "V", "S", "D"];
</script>

<template>
  <div class="DateWidget">
    <div>
      <p>{{ timeData.day }}</p>
      <h2>{{ timeData.date }}</h2>
      <p>{{ timeData.month }}</p>
    </div>
    <div>
      <div
        v-for="(e, i) in days"
        :key="i"
        :class="{ today: timeData.dayIndex === i }"
      >
        <p>{{ e }}</p>
        <img src="/icons/dot.png" alt="Dot" />
      </div>
    </div>
  </div>
</template>

<style lang="sass">
.DateWidget
  padding: 12px 24px
  background: var(--widget)
  border-radius: var(--radius-small)
  display: flex
  flex-direction: column-reverse
  justify-content: stretch
  align-items: stretch
  gap: 16px

  > div:first-of-type
    display: flex
    flex-direction: row
    justify-content: center
    align-items: baseline
    gap: 6px

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
      gap: 8px

      &.today
        > p
          opacity: 1

        > img
          height: 12px
          opacity: 1


      > p
        font-size: 0.9em
        opacity: 0.66

      > img
        filter: var(--filter)
        height: 8px
        opacity: 0.5
</style>
