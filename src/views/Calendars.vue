<script setup>

import Timetable from "@/components/Timetable.vue";
import Today from "@/components/Today.vue";
import {useRoute, useRouter} from "vue-router";
import calendars from "@/assets/json/calendars.json";
import {ref} from "vue";

async function fetchCal() {
  const route = useRoute();
  const router = useRouter()
  console.log(route)
  let link = calendars[route.params["cal"]]
  if (link === undefined) {
    await router.push("/");
    return null;
  }
  console.log(encodeURIComponent(link.link));
  const response = await fetch("https://horizon.imalonelynerd.fr/api/?url=" + encodeURIComponent(link.link));
  let jsoned = await response.json();
  if (jsoned === undefined || jsoned.hasOwnProperty("error")) {
    return null;
  }
  return jsoned;
}

const calendar = ref(await fetchCal());

</script>

<template>
  <div id="calendars">
    <Today :day-timetable="calendar"/>
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
}
</style>