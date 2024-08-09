<script lang="ts" setup>
import ButtonsList from "~/components/containers/ButtonsList.vue";
import TextButton from "~/components/TextButton.vue";
import CardMenu from "~/components/containers/CardMenu.vue";
import { linksService } from "assets/code/links/links.service";
import { ref } from "vue";
import { animationService } from "assets/code/animations/animations.service";
import displayData from "assets/data/display.json";

const route = useRoute();
const elemRef = ref(null);
const messageRef = ref("");

const executeAnimation = () =>
  animationService.executeAfterDelay([elemRef.value], () => {
    messageRef.value = "";
  });

const shareWrapper = () => {
  linksService
    .shareData(linksService.getFullUrl(), displayData.bundles.share.title)
    .then((r) => {
      messageRef.value = r
        ? displayData.bundles.share.success
        : displayData.bundles.share.failure;
    });
  executeAnimation();
};

const copyWrapper = () => {
  linksService.copyDataToClipboard(linksService.getFullUrl()).then((r) => {
    messageRef.value = r
      ? displayData.bundles.copy.success
      : displayData.bundles.copy.failure;
  });
  executeAnimation();
};

const copyIdWrapper = () => {
  linksService.copyDataToClipboard(route.params["id"] as string).then((r) => {
    messageRef.value = r
      ? displayData.bundles.copy.success
      : displayData.bundles.copy.failure;
  });
  executeAnimation();
};

const $cards = useCardDisplay();
</script>

<template>
  <CardMenu @hide="$cards.share = false">
    <template #title>
      <img alt="Share" src="/images/share.svg" />
      <h2>Partager</h2>
    </template>
    <ButtonsList>
      <TextButton @click="shareWrapper()">
        <img alt="Share" src="/icons/share.svg" />
        <p>Partager</p>
      </TextButton>
      <TextButton @click="copyWrapper()">
        <img alt="Copy" src="/icons/copy.svg" />
        <p>Copier</p>
      </TextButton>
      <TextButton @click="copyIdWrapper()">
        <img alt="Copy" src="/icons/copy.svg" />
        <p>Copier l'ID</p>
      </TextButton>
    </ButtonsList>
    <p v-if="messageRef !== ''" ref="elemRef">
      {{ messageRef }}
    </p>
  </CardMenu>
</template>
