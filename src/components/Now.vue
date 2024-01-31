<script setup>
import Course from "@/components/Course.vue";

defineProps([
  "dayTimetable"
])
</script>

<template>
  <div class="now">
    <h2>En cours</h2>
    <Course
        :title="dayTimetable['SUMMARY']"
        :start-date="dayTimetable['DTSTART']"
        :end-date="dayTimetable['DTEND']"
        :teacher="dayTimetable['TEACHER']"
        :location="dayTimetable['LOCATION']"
    />
    <!--div >{{ dayTimetable["2024_01_30_Tue"]["10_15"] }}</--div-->
  </div>
</template>

<style scoped>
@media screen and (min-width: 1025px) {
  .now {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: stretch;

    gap: 8px;
    border-radius: var(--widget-radius);
    padding: 16px;

    background: grey;
  }
}
</style>