<script lang="ts" setup>
import { themeNames, themeService } from '@/assets/code/theme/theme.service'
import ButtonsList from '@/components/containers/ButtonsList.vue'
import TextButton from '@/components/buttons/TextButton.vue'
import OverlayMenu from '@/components/OverlayMenu.vue'

defineEmits(['hide'])
</script>

<template>
  <OverlayMenu @hide="$emit('hide')">
    <template #title>
      <img alt="Theme" src="/images/theme.png" />
      <h2>Thèmes</h2>
    </template>
    <h4>Thèmes de base</h4>
    <ButtonsList>
      <TextButton @click="themeService.switchTheme(themeNames.DAY)">
        <img alt="Sage" src="/icons/sage.svg" />
        <p>Sage</p>
      </TextButton>
      <TextButton @click="themeService.switchTheme(themeNames.AFTERNOON)">
        <img alt="Solstice" src="/icons/solstice.svg" />
        <p>Solstice</p>
      </TextButton>
      <TextButton @click="themeService.switchTheme(themeNames.EVENING)">
        <img alt="Stars" src="/icons/stars.svg" />
        <p>Constellations</p>
      </TextButton>
      <TextButton @click="themeService.switchTheme(themeNames.NIGHT)">
        <img alt="Comet" src="/icons/comet.svg" />
        <p>Comète</p>
      </TextButton>
      <TextButton @click="themeService.switchTheme(themeNames.OLED)">
        <img alt="OLED" src="/icons/oled.svg" />
        <p>OLED</p>
      </TextButton>
    </ButtonsList>
    <h4>Thèmes automatiques</h4>
    <ButtonsList>
      <TextButton @click="themeService.switchTheme(themeNames.SYSTEM)">
        <img alt="System" src="/icons/system.svg" />
        <p>Système</p>
      </TextButton>
      <TextButton @click="themeService.switchTheme(themeNames.TIME)">
        <img alt="Time" src="/icons/time.svg" />
        <p>Basé sur le temps</p>
      </TextButton>
    </ButtonsList>
  </OverlayMenu>
</template>
