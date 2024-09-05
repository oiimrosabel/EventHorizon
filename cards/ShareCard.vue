<script lang="ts" setup>
import ButtonsList from "@/components/containers/ButtonsList.vue";
import TextButton from "@/components/TextButton.vue";
import CardMenu from "@/components/containers/CardMenu.vue";
import { linksService } from "@/assets/code/links/links.service";
import { ref } from "vue";
import { animationService } from "@/assets/code/animations/animations.service";
import displayData from "@/assets/data/display.json";

const $route = useRoute();
const elemRef = ref(null);
const messageRef = ref("");

const executeAnimation = () =>
  animationService.executeAfterDelay([elemRef.value], () => {
    messageRef.value = "";
  });

const shareLink = () => {
  linksService
    .shareData(linksService.getFullUrl(), displayData.bundles.share.title)
    .then((r) => {
      messageRef.value = r
        ? displayData.bundles.share.success
        : displayData.bundles.share.failure;
    });
  executeAnimation();
};

const copyLink = () => {
  linksService.copyDataToClipboard(linksService.getFullUrl()).then((r) => {
    messageRef.value = r
      ? displayData.bundles.copy.success
      : displayData.bundles.copy.failure;
  });
  executeAnimation();
};

const copyCalId = () => {
  linksService.copyDataToClipboard($route.params["cal"] as string).then((r) => {
    messageRef.value = r
      ? displayData.bundles.copy.success
      : displayData.bundles.copy.failure;
  });
  executeAnimation();
};

const $cards = useCardsState();
</script>

<template>
  <CardMenu @hide="$cards.share = false">
    <template #title>
      <img alt="Share" src="/images/share.svg" />
      <h2>Partager</h2>
    </template>
    <h4>Partager</h4>
    <ButtonsList>
      <TextButton @click="shareLink()">
        <img alt="Share" src="/icons/share.svg" />
        <p>Partager</p>
      </TextButton>
    </ButtonsList>
    <h4>Copier</h4>
    <ButtonsList>
      <TextButton @click="copyLink()">
        <img alt="Copy" src="/icons/copy.svg" />
        <p>Copier</p>
      </TextButton>
      <TextButton @click="copyCalId()">
        <img alt="Copy" src="/icons/copy.svg" />
        <p>Copier l'ID</p>
      </TextButton>
    </ButtonsList>
    <p v-if="messageRef !== ''" ref="elemRef">
      {{ messageRef }}
    </p>
  </CardMenu>
</template>
