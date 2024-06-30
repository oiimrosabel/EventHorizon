<script lang="ts" setup>
import { ref } from 'vue'
import DateWidget from '@/components/widgets/DateWidget.vue'
import TextButton from '@/components/buttons/TextButton.vue'
import ButtonsWidget from '@/components/widgets/ButtonsWidget.vue'
import { cookiesService } from '@/assets/code/cookies/cookies.service'
import { animationService } from '@/assets/code/animations/animations.service'

const COOKIE_NAME = 'event-panel'
const COOKIE_ENABLED = 'reduced'
const COOKIE_DISABLED = 'normal'
const ANIM_DURATION = '0.25s'
const ANIM_CLASS_HIDE = 'step1'
const ANIM_CLASS_SHOW = 'step2'

const panelRef = ref(null)

const isPanelReduced = ref(
  cookiesService.getCookieOrFallback(COOKIE_NAME, COOKIE_ENABLED) === COOKIE_ENABLED
)

const switchPanel = () => {
  animationService
    .animateSteps(
      [panelRef.value],
      [
        {
          duration: ANIM_DURATION,
          classTag: ANIM_CLASS_HIDE,
          callback: () => (isPanelReduced.value = !isPanelReduced.value)
        },
        {
          duration: ANIM_DURATION,
          classTag: ANIM_CLASS_SHOW,
          callback: () => {}
        }
      ]
    )
    .then(() =>
      cookiesService.setCookie(COOKIE_NAME, isPanelReduced.value ? COOKIE_ENABLED : COOKIE_DISABLED)
    )
}
</script>

<template>
  <div :class="{ reduced: isPanelReduced }" class="QuickPanel" ref="panelRef">
    <DateWidget :is-reduced="isPanelReduced" />
    <slot v-if="isPanelReduced" name="reduced"></slot>
    <ButtonsWidget :is-reduced="isPanelReduced">
      <TextButton title="Afficher/cacher le panneau" @click="switchPanel()">
        <img :src="`/icons/${isPanelReduced ? 'panel' : 'small'}.svg`" alt="Hide" />
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
  background: var(--background)

  @media (min-width: 1201px)
    width: 360px

    &.step1
      animation: HidePanel ease-in-out v-bind(ANIM_DURATION)

    &.step2
      animation: ShowPanel ease-in-out v-bind(ANIM_DURATION)

    &.reduced
      width: 96px
      padding: 12px 12px 24px

  @media (max-width: 1200px)
    width: 100%
    border-radius: 0 0 var(--radius-med) var(--radius-med)

    &.step1 > *:not(.DateWidget, .ButtonsWidget)
      animation: HideMobilePanel ease-in-out v-bind(ANIM_DURATION)

    &.step2 > *:not(.DateWidget, .ButtonsWidget)
      animation: ShowMobilePanel ease-in-out v-bind(ANIM_DURATION)
</style>
