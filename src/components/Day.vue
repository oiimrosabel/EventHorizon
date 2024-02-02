<script setup>
import Course from "@/components/Course.vue";
import {isNow} from "@/assets/js/dateUtils.js";

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
            :important="isNow(elem['DTSTART']['hour'],elem['DTEND']['hour'])"
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

    gap: 16px;
    border-radius: var(--widget-radius);
    padding: 24px 16px 16px 16px;

    background: var(--widget);
  }

  .today > h2 {
    text-align: center;
    margin: 0;
  }
}
</style>