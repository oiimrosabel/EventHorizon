<script lang="ts" setup>
import { themeNames, themeService } from "assets/code/theme/theme.service";
import ButtonsList from "~/components/containers/ButtonsList.vue";
import TextButton from "~/components/TextButton.vue";
import CardMenu from "~/components/containers/CardMenu.vue";
import { ref } from "vue";
import { animationService } from "assets/code/animations/animations.service";
import displayData from "assets/data/display.json";

const elemRef = ref(null);
const messageRef = ref("");

const themeWrapper = (theme: string) => {
  themeService.switchTheme(theme);
  messageRef.value = displayData.bundles.themeChange;
  animationService.executeAfterDelay([elemRef.value], () => {
    messageRef.value = "";
  });
};

const $cards = useCardDisplay();
</script>

<template>
  <CardMenu @hide="$cards.theme = false">
    <template #title>
      <img alt="Theme" src="/images/theme.svg" />
      <h2>Thèmes</h2>
    </template>
    <h4>Thèmes de base</h4>
    <ButtonsList>
      <TextButton no-filter @click="themeWrapper(themeNames.DAY)">
        <img alt="Sage" src="/images/sage.svg" />
        <p>Sage</p>
      </TextButton>
      <TextButton no-filter @click="themeWrapper(themeNames.AFTERNOON)">
        <img alt="Solstice" src="/images/solstice.svg" />
        <p>Solstice</p>
      </TextButton>
      <TextButton no-filter @click="themeWrapper(themeNames.EVENING)">
        <img alt="Stars" src="/images/stars.svg" />
        <p>Constellations</p>
      </TextButton>
      <TextButton no-filter @click="themeWrapper(themeNames.NIGHT)">
        <img alt="Comet" src="/images/comet.svg" />
        <p>Comète</p>
      </TextButton>
      <TextButton no-filter @click="themeWrapper(themeNames.OLED)">
        <img alt="OLED" src="/images/oled.svg" />
        <p>OLED</p>
      </TextButton>
    </ButtonsList>
    <h4>Thèmes automatiques</h4>
    <ButtonsList>
      <TextButton no-filter @click="themeWrapper(themeNames.SYSTEM)">
        <img alt="System" src="/images/system.svg" />
        <p>Système</p>
      </TextButton>
      <TextButton no-filter @click="themeWrapper(themeNames.TIME)">
        <img alt="Time" src="/images/time.svg" />
        <p>Basé sur le temps</p>
      </TextButton>
    </ButtonsList>
    <p v-if="messageRef !== ''" ref="elemRef">
      {{ messageRef }}
    </p>
  </CardMenu>
</template>
