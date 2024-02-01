<script setup>
import Course from "@/components/Course.vue";

defineProps([
  "eventInfo",
  "title"
])
</script>

<template>
  <div class="now">
    <h2>{{ title }}</h2>
    <Course
        :title="eventInfo['SUMMARY']"
        :start-date="eventInfo['DTSTART']"
        :end-date="eventInfo['DTEND']"
        :teacher="eventInfo['TEACHER']"
        :location="eventInfo['LOCATION']"
    />
  </div>
</template>

<style scoped>
@media screen and (min-width: 1025px) {
  .now {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: stretch;

    gap: 16px;
    border-radius: var(--widget-radius);
    padding: 24px 16px 16px 16px;

    background: var(--widget);
  }

  .now > h2 {
    text-align: center;
    margin: 0;
  }
}
</style>