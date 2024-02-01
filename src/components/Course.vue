<script setup>
import {diffTime, removeParenthesis, spanner} from "../assets/js/dateUtils.js";

defineProps([
  "title",
  "startDate",
  "endDate",
  "location",
  "teacher",
  "important"
])
</script>

<template>
  <div class="day" :class="{ 'important' : important !== undefined && important }">
    <h3 v-html="spanner(title)" :title="title"></h3>
    <div>
      <div>
        <img src="/icons/time.png"/>
        <p>{{ startDate['hour'].replace("_", ":") }} → {{ endDate['hour'].replace("_", ":") }}
          ({{ diffTime(startDate['hour'], endDate['hour']) }})</p>
      </div>
      <div>
        <img src="/icons/location.png"/>
        <p>{{ location === '' || location === null ? "(information manquante)" : removeParenthesis(location) }}</p>
      </div>
      <div>
        <img src="/icons/teacher.png"/>
        <p>{{ teacher === '' || teacher === null ? "(information manquante)" : teacher }}</p>
      </div>
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
    border-radius: var(--widget-radius);
    gap: 16px;
    padding: 24px 32px;
    background: var(--event);
  }

  .day > h3 {
    font-size: 1.1em;
    text-align: center;
    min-width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .day * {
    margin: 0;
  }

  .day > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    gap: 12px;
  }

  .day > div > div {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    gap: 8px;
  }

  .day > div > div > img {
    height: 1.33em;
    filter: var(--img-filter);
  }

  .day > div > div > p {
    min-width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .important {
    background: var(--widget-hover) !important;
  }
}
</style>