<script lang="ts" setup>
import {
  colorNames,
  themeNames,
  themeService,
} from "@/assets/code/theme/theme.service";
import ButtonsList from "@/components/containers/ButtonsList.vue";
import TextButton from "@/components/TextButton.vue";
import CardMenu from "@/components/containers/CardMenu.vue";
import { ref } from "vue";
import { animationService } from "@/assets/code/animations/animations.service";
import displayData from "@/assets/data/display.json";

const elemRef = ref(null);
const messageRef = ref("");

const setTheme = (theme: string) => {
  themeService.switchTheme(theme);
  if (themeService.checkContrast())
    messageRef.value = displayData.bundles.theme.contrastIssues;
  else {
    messageRef.value = displayData.bundles.theme.themeChange;
    animationService.executeAfterDelay([elemRef.value], () => {
      messageRef.value = "";
    });
  }
};

const setColor = (color: string) => {
  themeService.switchColor(color);
  if (themeService.checkContrast())
    messageRef.value = displayData.bundles.theme.contrastIssues;
  else {
    messageRef.value = displayData.bundles.theme.colorChange;
    animationService.executeAfterDelay([elemRef.value], () => {
      messageRef.value = "";
    });
  }
};

const $cards = useCardsState();
</script>

<template>
  <CardMenu @hide="$cards.theme = false">
    <template #title>
      <img alt="Theme" src="/images/theme.svg" />
      <h2>Thèmes</h2>
    </template>
    <h4>Thèmes</h4>
    <ButtonsList>
      <TextButton no-filter @click="setTheme(themeNames.DAY)">
        <img alt="Day" src="/images/day.svg" />
        <p>Jour</p>
      </TextButton>
      <TextButton no-filter @click="setTheme(themeNames.NIGHT)">
        <img alt="Night" src="/images/night.svg" />
        <p>Nuit</p>
      </TextButton>
      <TextButton no-filter @click="setTheme(themeNames.OLED)">
        <img alt="OLED" src="/images/oled.svg" />
        <p>OLED</p>
      </TextButton>
      <TextButton no-filter @click="setTheme(themeNames.SYSTEM)">
        <img alt="System" src="/images/system.svg" />
        <p>Système</p>
      </TextButton>
      <TextButton no-filter @click="setTheme(themeNames.TIME)">
        <img alt="Time" src="/images/time.svg" />
        <p>Temporel</p>
      </TextButton>
    </ButtonsList>
    <h4>Teintes de couleur</h4>
    <ButtonsList>
      <ColorButton @click="setColor(colorNames.BLUE)">
        <img src="/colors/blue.svg" alt="Blue" />
      </ColorButton>
      <ColorButton @click="setColor(colorNames.PURPLE)">
        <img src="/colors/purple.svg" alt="Purple" />
      </ColorButton>
      <ColorButton @click="setColor(colorNames.PINK)">
        <img src="/colors/pink.svg" alt="Pink" />
      </ColorButton>
      <ColorButton @click="setColor(colorNames.RED)">
        <img src="/colors/red.svg" alt="Red" />
      </ColorButton>
      <ColorButton @click="setColor(colorNames.ORANGE)">
        <img src="/colors/orange.svg" alt="Orange" />
      </ColorButton>
      <ColorButton @click="setColor(colorNames.PEACH)">
        <img src="/colors/peach.svg" alt="Peach" />
      </ColorButton>
      <ColorButton @click="setColor(colorNames.YELLOW)">
        <img src="/colors/yellow.svg" alt="Yellow" />
      </ColorButton>
      <ColorButton @click="setColor(colorNames.GREEN)">
        <img src="/colors/green.svg" alt="Green" />
      </ColorButton>
      <ColorButton @click="setColor(colorNames.BLACK)">
        <img src="/colors/black.svg" alt="Black" />
      </ColorButton>
    </ButtonsList>
    <p v-if="messageRef !== ''" ref="elemRef">
      {{ messageRef }}
    </p>
  </CardMenu>
</template>
