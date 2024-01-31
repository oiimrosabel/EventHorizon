<script setup>

const props = defineProps([
  "customLink"
])

import Timetable from "@/components/Timetable.vue";
import Today from "@/components/Today.vue";
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import Now from "@/components/Now.vue";
import {Calendar} from "@/assets/js/calendarFetch.js";

const cal = useRoute().params.cal;
if (cal === undefined) {
  useRouter().push("/");
}
let calendar;
if (cal === "custom") {
  calendar = new Calendar(props.customLink, true);
} else {
  calendar = new Calendar(cal, false);
}

try {
  calendar.fetch();
} catch (e) {

}

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