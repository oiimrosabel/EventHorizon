<script lang="ts" setup>
import displayData from "@/assets/data/display.json";
</script>

<template>
  <NotificationTemplate
    :title="displayData.loading.title"
    image="/images/loading.svg"
  />
</template>
