<script setup lang="ts">
import EventInfo from "~/components/widgets/EventInfo.vue";
import CardMenu from "~/components/containers/CardMenu.vue";

const $cards = useCardDisplay();
const $event = useEventInfoDisplayer();
</script>

<template>
  <CardMenu v-if="$cards.event" @hide="$cards.event = false">
    <template #title>
      <img src="/images/calendar.svg" alt="Calendar" />
      <h2 v-html="$event.title.value" />
      <p v-if="$event.type.value !== ''">{{ $event.type.value }}</p>
      <b v-if="$event.isHappening.value">en cours</b>
    </template>
    <EventInfo :event="$event.data.value" />
  </CardMenu>
</template>

<style scoped lang="sass"></style>
