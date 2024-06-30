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
      <img alt="Theme" src="/images/theme.svg" />
      <h2>Thèmes</h2>
    </template>
    <h4>Thèmes de base</h4>
    <ButtonsList>
      <TextButton @click="themeService.switchTheme(themeNames.DAY)" no-filter>
        <img alt="Sage" src="/images/sage.svg" />
        <p>Sage</p>
      </TextButton>
      <TextButton @click="themeService.switchTheme(themeNames.AFTERNOON)" no-filter>
        <img alt="Solstice" src="/images/solstice.svg" />
        <p>Solstice</p>
      </TextButton>
      <TextButton @click="themeService.switchTheme(themeNames.EVENING)" no-filter>
        <img alt="Stars" src="/images/stars.svg" />
        <p>Constellations</p>
      </TextButton>
      <TextButton @click="themeService.switchTheme(themeNames.NIGHT)" no-filter>
        <img alt="Comet" src="/images/comet.svg" />
        <p>Comète</p>
      </TextButton>
      <TextButton @click="themeService.switchTheme(themeNames.OLED)" no-filter>
        <img alt="OLED" src="/images/oled.svg" />
        <p>OLED</p>
      </TextButton>
    </ButtonsList>
    <h4>Thèmes automatiques</h4>
    <ButtonsList>
      <TextButton @click="themeService.switchTheme(themeNames.SYSTEM)" no-filter>
        <img alt="System" src="/images/system.svg" />
        <p>Système</p>
      </TextButton>
      <TextButton @click="themeService.switchTheme(themeNames.TIME)" no-filter>
        <img alt="Time" src="/images/time.svg" />
        <p>Basé sur le temps</p>
      </TextButton>
    </ButtonsList>
  </OverlayMenu>
</template>
