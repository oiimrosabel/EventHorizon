<script setup>

import Timetable from "@/components/Timetable.vue";
import Today from "@/components/Today.vue";
import {useRoute, useRouter} from "vue-router";
import calendars from "@/assets/json/calendars.json";
import {ref} from "vue";
import Now from "@/components/Now.vue";
import {fetchCal} from "@/assets/js/calendarFetch.js";

const calendar = ref(await fetchCal());

</script>

<template>
  <div id="calendars">
    <div class="shortcut">
      <Now :day-timetable="calendar"/>
      <Today :day-timetable="calendar"/>
    </div>
    <Timetable/>
  </div>
</template>

<style scoped>
@media screen and (min-width: 1025px) {
  #calendars {
    flex: 1 1;

    min-height: 1px;

    display: flex;
    flex-direction: row;
    justify-content: stretch;
    align-items: stretch;
  }

  .shortcut {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: stretch;

    overflow-y: scroll;
    width: 400px;
    border-radius: var(--widget-radius);
  }
}
</style>