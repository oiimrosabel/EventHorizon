<script setup>

import {ref} from "vue";
import Timetable from "@/components/Timetable.vue";
import Day from "@/components/Day.vue";
import {useRoute, useRouter} from "vue-router";
import NextCourse from "@/components/NextCourse.vue";
import {Calendar, CalError} from "@/assets/js/calendarFetch.js";
import {deleteCookie, getCookie} from "@/assets/js/cookieUtils.js";
import Error from "@/components/Error.vue";

const isHidden = ref(false);
const isFetched = ref(true);

const error = ref(new CalError(0, "", ""));

let curevent;
let dayevents;
let nextevent;
let timetable;
const cal = useRoute().params.cal;
if (cal === undefined) {
  useRouter().push("/");
}
let calendar;
if (cal === "custom") {
  if (getCookie("customURL") === "") {
    isFetched.value = false;
    error.value = new CalError("+1", "NoCustomURL", "An error occured while getting the custom URL");
  } else {
    calendar = new Calendar(getCookie("customURL"), true);
    deleteCookie("customURL");
  }
} else {
  calendar = new Calendar(cal, false);
  if (calendar instanceof CalError) {
    isFetched.value = false;
    error.value = calendar;
  }
}

if (isFetched.value) {
  let res = await calendar.fetch();
  if (res instanceof CalError) {
    isFetched.value = false;
    error.value = res;
  } else {
    curevent = calendar.getCurrentEvent();
    nextevent = calendar.getNextEvent();
    dayevents = calendar.getDay();
    timetable = calendar.getAll();
    timetable.shift();
  }
}
</script>

<template>
  <Error v-if="!isFetched"
         :name="error.name"
         :code="error.code"
         :message="error.message"
  />
  <div v-if="isFetched" id="calendars">
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
      <div class="hide-button"
           @click="isHidden = !isHidden"
           :class="{'hidden-button' : isHidden}"
      >
        <img v-if="!isHidden" src="/icons/hide.png"/>
        <img v-if="isHidden" src="/icons/revert.png"/>
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

    animation: LeftPanel ease-out 0.5s;
  }

  .shortcut > *:not(:last-child) {
    width: var(--event-width);
  }

  .hidden {
    position: fixed;
    bottom: var(--root-padding);
    left: var(--root-padding);
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

  .hidden-button {
    background: none;
  }
}
</style>