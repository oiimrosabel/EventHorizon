<script setup lang="ts">
import LoadingMessage from "@/bundles/LoadingBundle.vue";
import CalendarContent from "~/bundles/CalendarContent.vue";

definePageMeta({
  validate: async (route) =>
    typeof route.params["cal"] === "string" &&
    /^\d+$/.test(route.params["cal"] as string),
});
</script>

<template>
  <Suspense>
    <template #fallback>
      <LoadingMessage />
    </template>
    <CalendarContent />
  </Suspense>
</template>
