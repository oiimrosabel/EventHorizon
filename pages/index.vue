<script lang="ts" setup>
import FooterBundle from "~/bundles/FooterBundle.vue";
import displayData from "@/assets/data/display.json";
import MessageTemplate from "@/components/MessageTemplate.vue";
</script>

<template>
  <MessageTemplate :title="displayData.home.title" image="/images/logo.svg">
    <FooterBundle />
  </MessageTemplate>
</template>
