<script lang="ts" setup>
import { ref } from 'vue'
import DateWidget from '@/components/widgets/DateWidget.vue'
import TextButton from '@/components/buttons/TextButton.vue'
import ButtonsWidget from '@/components/widgets/ButtonsWidget.vue'
import { cookiesService } from '@/assets/code/cookies/cookies.service'

const COOKIE_NAME = 'event-panel'

const isPanelReduced = ref(cookiesService.getCookieOrFallback(COOKIE_NAME, '1') === '1')

const switchPanel = () => {
  isPanelReduced.value = !isPanelReduced.value
  cookiesService.setCookie(COOKIE_NAME, isPanelReduced.value ? '1' : '0')
}
</script>

<template>
  <div :class="{ reduced: isPanelReduced }" class="QuickPanel">
    <DateWidget :is-reduced="isPanelReduced" />
    <slot v-if="isPanelReduced" name="reduced"></slot>
    <ButtonsWidget :is-reduced="isPanelReduced">
      <TextButton title="Afficher/cacher le panneau" @click="switchPanel()">
        <img :src="`/icons/${isPanelReduced ? 'panel' : 'small'}.png`" alt="Hide" />
      </TextButton>
      <slot name="buttons"></slot>
    </ButtonsWidget>
    <slot v-if="!isPanelReduced" name="hideable"></slot>
  </div>
</template>

<style lang="sass">
.QuickPanel
  display: flex
  flex-direction: column
  justify-content: start
  align-items: stretch
  gap: 24px
  overflow-y: auto
  overflow-x: hidden
  padding: 24px 24px 32px
  background: var(--side)
  transition: var(--trans)

  @media (min-width: 1201px)
    width: 360px

    &.reduced
      width: 88px
      padding: 12px 12px 24px

  @media (max-width: 1200px)
    width: 100%
    border-radius: 0 0 var(--radius-med) var(--radius-med)
</style>
