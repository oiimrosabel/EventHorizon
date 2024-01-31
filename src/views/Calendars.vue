<script setup>

const props = defineProps([
  "customLink"
])

import Timetable from "@/components/Timetable.vue";
import Today from "@/components/Today.vue";
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import Now from "@/components/Now.vue";
import {Calendar, CalError} from "@/assets/js/calendarFetch.js";

const cal = useRoute().params.cal;
if (cal === undefined) {
  await useRouter().push("/");
}
let calendar;
if (cal === "custom") {
  calendar = new Calendar(props.customLink, true);
} else {
  calendar = new Calendar(cal, false);
  if(calendar instanceof CalError){
    console.log(calendar.message);
  }
}

const everef = ref(null);
const dayref = ref(null);

let res = await calendar.fetch();
if (res instanceof CalError) {
  console.log(res.message);
  //TODO error
} else {
   everef.value = calendar.getCurrentEvent();
   dayref.value = calendar.getDay();
  console.log(res);
}
</script>

<template>
  <div id="calendars">
    <div class="shortcut">
      <Now :day-timetable="everef"/>
      <Today :day-timetable="dayref"/>
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