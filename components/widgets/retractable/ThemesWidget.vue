<script lang="ts" setup>
import { Color, Theme } from "~/services/theme/theme-commons";
import TextButton from "~/components/buttons/TextButton.vue";
import ColorButton from "~/components/buttons/ColorButton.vue";
import ButtonsList from "~/components/containers/ButtonsList.vue";
import { themeService } from "~/services/theme/theme.service";
import { useCommonData } from "~/composables/useCommonData";
import RetractableWidget from "~/components/containers/RetractableWidget.vue";

const $messenger = useMessenger();
const $common = useCommonData();

const setTheme = (theme: string) => {
  themeService.setTheme(theme as Theme);
  $messenger.setMessage($common.bundles.theme.themeChange);
};

const setColor = (color: string) => {
  themeService.setColor(color as Color);
  $messenger.setMessage($common.bundles.theme.colorChange);
};
</script>

<template>
  <RetractableWidget tag="themes" title="Thèmes" image="/images/theme.svg">
    <div class="ThemesWidget">
      <ButtonsList>
        <TextButton no-filter title="Jour" @click="setTheme(Theme.DAY)">
          <img alt="Day" src="/images/day.svg" >
          <p>Jour</p>
        </TextButton>
        <TextButton no-filter title="Nuit" @click="setTheme(Theme.NIGHT)">
          <img alt="Night" src="/images/night.svg" >
          <p>Nuit</p>
        </TextButton>
        <TextButton no-filter title="OLED" @click="setTheme(Theme.OLED)">
          <img alt="OLED" src="/images/oled.svg" >
          <p>OLED</p>
        </TextButton>
        <TextButton no-filter title="Système" @click="setTheme(Theme.SYSTEM)">
          <img alt="System" src="/images/system.svg" >
          <p>Système</p>
        </TextButton>
        <TextButton no-filter title="Temporel" @click="setTheme(Theme.TIME)">
          <img alt="Time" src="/images/time.svg" >
          <p>Temporel</p>
        </TextButton>
      </ButtonsList>
      <p class="subtitle">Teintes de couleur</p>
      <ButtonsList>
        <ColorButton
          title="Turquoise"
          color="#5BA2FF"
          @click="setColor(Color.BLUE)"
        />
        <ColorButton
          title="Violet"
          color="#C368FF"
          @click="setColor(Color.PURPLE)"
        />
        <ColorButton
          title="Rose"
          color="#FF7CCB"
          @click="setColor(Color.PINK)"
        />
        <ColorButton
          title="Rouge"
          color="#FF374B"
          @click="setColor(Color.RED)"
        />
        <ColorButton
          title="Orange"
          color="#FF6B2C"
          @click="setColor(Color.ORANGE)"
        />
        <ColorButton
          title="Pêche"
          color="#FFC490"
          @click="setColor(Color.PEACH)"
        />
        <ColorButton
          title="Jaune"
          color="#EFE81D "
          @click="setColor(Color.YELLOW)"
        />
        <ColorButton
          title="Vert"
          color="#36D26A"
          @click="setColor(Color.GREEN)"
        />
        <ColorButton
          title="Gris"
          color="#606060"
          @click="setColor(Color.BLACK)"
        />
        <ColorButton
          title="Bleu"
          color="#4C52FF"
          @click="setColor(Color.NAVY)"
        />
      </ButtonsList>
    </div>
  </RetractableWidget>
</template>

<style lang="sass">
.ThemesWidget
  display: flex
  flex-direction: column
  justify-content: stretch
  align-items: stretch
  gap: 16px
</style>
