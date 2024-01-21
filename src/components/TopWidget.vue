<script setup>

import {ref} from "vue";
import Button from "@/components/Button.vue";
import {dayAssociation, monthAssociation} from "../assets/js/dateUtils.js";


const date = ref(new Date());


</script>

<template>
  <div class="top">
    <div class="top-date">
      <h1>{{ date.getDate() }}</h1>
      <p>{{ dayAssociation[date.getDay()] }} {{ monthAssociation[date.getMonth()] }} {{ date.getFullYear() }} </p>
    </div>
    <div class="top-buttons">
      <Button text="Partager" image-link="/icons/share.png" :retractable="true"/>
      <Button text="Rafraîchir" image-link="/icons/refresh.png" :retractable="true"/>
      <Button text="Changer" image-link="/icons/switch.png"/>
      <Button text="Thème" image-link="/icons/theme.png" :important="true"/>
    </div>
  </div>
</template>

<style scoped>
@media screen and (min-width: 1025px) {
  .top {
    background: var(--bg-image);
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    padding: 20px;
    border-radius: var(--widget-radius);
  }

  .top-date {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 4px;

    background: var(--widget);
    border-radius: var(--widget-radius);
    padding: 16px;
  }

  .top-date > * {
    margin: 0;
  }

  .top-date > h1 {
    font-size: 3em;
  }

  .top-buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: start;

    gap: 8px;
  }
}
</style>