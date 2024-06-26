<script lang="ts" setup>
import { ref } from 'vue'
import DateWidget from '@/components/widgets/DateWidget.vue'
import RoundButton from '@/components/buttons/RoundButton.vue'
import ButtonsWidget from '@/components/widgets/ButtonsWidget.vue'

const isPanelReduced = ref(true)
</script>

<template>
  <div :class="{ reduced: isPanelReduced }" class="QuickPanel">
    <DateWidget :is-reduced="isPanelReduced" />
    <slot v-if="isPanelReduced" name="reduced"></slot>
    <ButtonsWidget :is-reduced="isPanelReduced">
      <RoundButton title="Afficher/cacher le panneau" @click="isPanelReduced = !isPanelReduced">
        <img :src="`/icons/${isPanelReduced ? 'panel' : 'small'}.png`" alt="Hide" />
      </RoundButton>
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
  padding: 24px
  background: var(--side)

  > *
    animation: Quick ease-out 0.33s

  @media (min-width: 1201px)
    width: 360px

    &.reduced
      width: 96px
      padding: 16px 16px 24px

  @media (max-width: 1200px)
    width: 100%
    border-radius: 0 0 var(--radius-med) var(--radius-med)
</style>
