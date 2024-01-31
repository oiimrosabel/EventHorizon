<script setup>
defineProps([
  "title",
  "startDate",
  "endDate",
  "location",
  "teacher",
  "important"
])

function replaceHour(hour) {
  return hour
}
</script>

<template>
  <div class="day">
    <h3>{{ title }}</h3>
    <div>
      <img src="/icons/date.png"/>
      <p>{{ startDate['hour'].replace("_",":") }} → {{ endDate['hour'].replace("_",":") }}</p>
    </div>
    <div>
      <img src="/icons/location.png"/>
      <p>{{ location }}</p>
    </div>
    <div>
      <img src="/icons/teacher.png"/>
      <p>{{ teacher }}</p>
    </div>
  </div>
</template>

<style scoped>
@media screen and (min-width: 1025px) {
  .day {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: stretch;

    gap: 16px;
    padding: 32px;
    background: deeppink;
  }

  .day > h3 {
    text-align: center;
  }

  .day * {
    margin: 0;
  }

  .day > div {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;

    gap: 8px;
  }

  .day > div > img {
    height: 1.5em;
  }
}
</style>