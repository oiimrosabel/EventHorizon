<script lang="ts" setup>
import { ref } from "vue";
import LookupBundle from "@/cards/LookupCard.vue";
import displayData from "@/assets/data/display.json";

defineProps({
  title: {
    type: String,
    default: "Erreur",
  },
  description: {
    type: String,
    default: "",
  },
});

const isLookupShown = ref(false);
</script>

<template>
  <LookupBundle v-if="isLookupShown" @hide="isLookupShown = false" />
  <NotificationTemplate
    :description="displayData.error.description"
    :title="displayData.error.title"
    image="/images/error.svg"
  />
</template>
