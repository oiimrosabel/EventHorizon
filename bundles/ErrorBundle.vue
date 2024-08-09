<script lang="ts" setup>
import { ref } from "vue";
import LookupBundle from "~/cards/LookupCard.vue";
import TextButton from "~/components/TextButton.vue";
import MessageTemplate from "@/components/MessageTemplate.vue";
import { linksService } from "@/assets/code/links/links.service";
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
    :title="displayData.error.title"
    :description="displayData.error.description"
    image="/images/error.svg"
  />
</template>
