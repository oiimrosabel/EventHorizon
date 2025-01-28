<script lang="ts" setup>
import { Color, Theme } from '@/code/theme/theme.commons.ts'
import TextButton from '@/components/buttons/TextButton.vue'
import ColorButton from '@/components/buttons/ColorButton.vue'
import ButtonsList from '@/components/containers/ButtonsList.vue'
import RetractableWidget from '@/components/containers/RetractableWidget.vue'
import { useMessenger } from '@/stores/useMessenger.ts'
import { setColor, setTheme } from '@/code/theme/theme.main.ts'

const $messenger = useMessenger()

const themeChange = (theme: string) => {
  setTheme(theme as Theme)
  $messenger.setMessage('Thème changé avec succès.')
}

const colorChange = (color: string) => {
  setColor(color as Color)
  $messenger.setMessage('Teinte changée avec succès.')
}
</script>

<template>
  <RetractableWidget tag="themes" title="Thèmes" image="/images/theme.svg">
    <div class="ThemesWidget">
      <ButtonsList>
        <TextButton no-filter title="Jour" @click="themeChange(Theme.DAY)">
          <img alt="Day" src="/images/day.svg" />
          <p>Jour</p>
        </TextButton>
        <TextButton no-filter title="Nuit" @click="themeChange(Theme.NIGHT)">
          <img alt="Night" src="/images/night.svg" />
          <p>Nuit</p>
        </TextButton>
        <TextButton no-filter title="OLED" @click="themeChange(Theme.OLED)">
          <img alt="OLED" src="/images/oled.svg" />
          <p>OLED</p>
        </TextButton>
        <TextButton no-filter title="Système" @click="themeChange(Theme.SYSTEM)">
          <img alt="System" src="/images/system.svg" />
          <p>Système</p>
        </TextButton>
        <TextButton no-filter title="Basé sur le temps" @click="themeChange(Theme.TIME)">
          <img alt="Programmé" src="/images/time.svg" />
          <p>Temporel</p>
        </TextButton>
      </ButtonsList>
      <p class="subtitle">Teintes de couleur</p>
      <ButtonsList>
        <ColorButton title="Rouge" color="#FF374B" @click="colorChange(Color.RED)" />
        <ColorButton title="Orange" color="#FF6B2C" @click="colorChange(Color.ORANGE)" />
        <ColorButton title="Pêche" color="#FFC490" @click="colorChange(Color.PEACH)" />
        <ColorButton title="Jaune" color="#EFE81D " @click="colorChange(Color.YELLOW)" />
        <ColorButton title="Vert" color="#36D26A" @click="colorChange(Color.GREEN)" />
        <ColorButton title="Turquoise" color="#5BA2FF" @click="colorChange(Color.BLUE)" />
        <ColorButton title="Bleu" color="#4C52FF" @click="colorChange(Color.NAVY)" />
        <ColorButton title="Violet" color="#C368FF" @click="colorChange(Color.PURPLE)" />
        <ColorButton title="Rose" color="#FF7CCB" @click="colorChange(Color.PINK)" />
        <ColorButton title="Gris" color="#606060" @click="colorChange(Color.BLACK)" />
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
