<script setup>
defineProps(["dayTimetable"])
</script>

<template>
  <div class="today">
    <h2>Aujourd'hui</h2>
    <div v-for="elem in dayTimetable">{{ elem }}</div>
  </div>
</template>

<style scoped>
@media screen and (min-width: 1025px) {
  .today {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: stretch;

    gap: 8px;
    border-radius: var(--widget-radius);
    padding: 16px;

    background: grey;
  }

  .today > div {
    padding: 32px;
    background: deeppink;
  }
}
</style>