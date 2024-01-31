<script setup>
import Course from "@/components/Course.vue";

defineProps(["dayTimetable"])
</script>

<template>
  <div class="today">
    <h2>Aujourd'hui</h2>
    <Course v-for="elem in dayTimetable"
            :start-date="elem['DTSTART']"
            :end-date="elem['DTEND']"
            :location="elem['LOCATION']"
            :teacher="elem['TEACHER']"
            :title="elem['SUMMARY']"
    />
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