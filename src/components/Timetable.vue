<script setup>
import {displayDate} from "../assets/js/dateUtils.js";
import Course from "@/components/Course.vue";

defineProps(["timetable"])
</script>

<template>
  <div class="timetable">
    <div v-for="elem in timetable">
      <h3>{{ displayDate(elem[0]["DTSTART"]["day"], elem[0]["DTSTART"]["date"]) }}</h3>
      <Course v-for="elem2 in elem"
              :start-date="elem2['DTSTART']"
              :end-date="elem2['DTEND']"
              :location="elem2['LOCATION']"
              :teacher="elem2['TEACHER']"
              :title="elem2['SUMMARY']"
      />
    </div>
  </div>
</template>

<style scoped>
@media screen and (min-width: 1025px) {
  .timetable {
    flex: 1 1;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: start;
    overflow-x: scroll;
    overflow-y: hidden;
    background: var(--widget);
    padding: 24px 24px 0;
    gap: 16px;
    border-radius: var(--widget-radius);
  }

  .timetable > div {
    flex: 1 1;
    height: 100%;
    min-width: var(--event-width);
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: stretch;
    gap: 16px;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .timetable > div::-webkit-scrollbar {
    display: none;
  }

  .timetable > div > h3 {
    text-align: center;
    margin: 0.2em 0;
  }
}
</style>