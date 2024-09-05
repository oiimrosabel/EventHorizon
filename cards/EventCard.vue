<script lang="ts" setup>
import EventInfo from "@/components/EventInfo.vue";
import CardMenu from "@/components/containers/CardMenu.vue";

const $cards = useCardsState();
const $event = useEventCard();
</script>

<template>
  <CardMenu v-if="$cards.event" @hide="$cards.event = false">
    <template #title>
      <img alt="Calendar" src="/images/calendar.svg" />
      <h2 v-html="$event.title" />
      <p v-if="$event.type !== ''">{{ $event.type }}</p>
      <b v-if="$event.isHappening">en cours</b>
    </template>
    <EventInfo :event="$event.data" />
  </CardMenu>
</template>
