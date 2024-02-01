<script setup>

import {ref} from "vue";
import Timetable from "@/components/Timetable.vue";
import Day from "@/components/Day.vue";
import {useRoute, useRouter} from "vue-router";
import NextCourse from "@/components/NextCourse.vue";
import {Calendar, CalError} from "@/assets/js/calendarFetch.js";

const props = defineProps([
  "customLink"
])

const isHidden = ref(false);

const cal = useRoute().params.cal;
if (cal === undefined) {
  await useRouter().push("/");
}
let calendar;
if (cal === "custom") {
  calendar = new Calendar(props.customLink, true);
} else {
  calendar = new Calendar(cal, false);
  if (calendar instanceof CalError) {
    console.log(calendar.message);
    //TODO
  }
}

let curevent;
let dayevents;
let nextevent;
let timetable;
let res = await calendar.fetch();
if (res instanceof CalError) {
  console.log(res.message);
  //TODO error
} else {
  curevent = calendar.getCurrentEvent();
  nextevent = calendar.getNextEvent();
  dayevents = calendar.getDay();
  timetable = calendar.getAll();
  timetable.shift();
}
</script>

<template>
  <div id="calendars">
    <div class="shortcut" :class="{ 'hidden' : isHidden }">
      <NextCourse
          :event-info="curevent"
          title="En cours"
          v-if="curevent !== null"
      />
      <NextCourse
          :event-info="nextevent"
          title="Prochain cours"
          v-if="nextevent !== null"
      />
      <Day
          :day-timetable="dayevents"
          v-if="dayevents !== null"/>
      <div class="hide-button" @click="isHidden = !isHidden">
        <img src="/icons/revert.png"/>
        <h3 v-if="!isHidden">Cacher les cours récents...</h3>
      </div>
    </div>
    <Timetable :timetable="timetable"/>
  </div>
</template>

<style scoped>
@media screen and (min-width: 1025px) {
  #calendars {
    flex: 1 1;

    min-height: 1px;
    gap: var(--root-padding);

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
    gap: 16px;
    border-radius: var(--widget-radius);
  }

  .shortcut > *:not(:last-child) {
    width: var(--event-width);
  }

  .hidden {
    display: flex;
    flex-direction: column-reverse;
    overflow: hidden;
  }

  .hidden > *:not(:last-of-type) {
    display: none;
  }

  .hide-button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: stretch;
    background: var(--widget);
    border-radius: var(--button-radius);
    padding: 16px;
    cursor: pointer;
    gap: 12px;
    transition: var(--transition);
  }

  .hide-button:hover {
    background: var(--widget-hover);
  }

  .hide-button > h3 {
    margin: 0;
  }

  .hide-button > img {
    height: 1.5em;
    filter: var(--img-filter);
  }
}
</style>