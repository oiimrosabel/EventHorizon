<script setup lang="ts">
import TextButton from '@/components/buttons/TextButton.vue'
import { useWidgets } from '@/stores/useWidgets.ts'

const props = defineProps({
  forceOpen: {
    type: Boolean,
    default: false,
  },
  tag: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: 'Widget',
  },
  image: {
    type: String,
    default: undefined,
  },
  circular: {
    type: Boolean,
    default: false,
  },
})

const $widgets = useWidgets()
$widgets.registerWidget(props.tag)
</script>

<template>
  <div class="RetractableWidget" :class="{ hidden: !$widgets.isDisplayed(tag) }">
    <div>
      <img v-if="image" :class="{ circular: circular }" :src="image" :alt="title" />
      <p class="subtitle">{{ title }}</p>
      <TextButton
        :title="$widgets.isDisplayed(tag) ? 'Minimiser' : 'Afficher'"
        @click="$widgets.switchState(tag)"
      >
        <img :src="`/icons/${$widgets.isDisplayed(tag) ? 'up' : 'down'}.svg`" alt="Toggle" />
      </TextButton>
    </div>
    <slot v-if="$widgets.isDisplayed(tag)" name="default" />
  </div>
</template>

<style lang="sass">
.RetractableWidget
  max-height: 900px
  display: flex
  flex-direction: column
  justify-content: space-between
  align-items: stretch
  padding: 16px
  background: var(--widget)
  border-radius: var(--radius-small)
  gap: 16px
  transition: padding 0.1s linear, max-height 0.75s, background-color 0.25s ease-out

  &.hidden
    padding: 8px 16px
    max-height: 76px
    background: color-mix(in srgb, var(--widget), transparent 50%)

  > div:first-of-type
    display: flex
    flex-direction: row
    justify-content: start
    align-items: center
    gap: 12px

    > p
      flex-grow: 1

    > img
      height: 24px

      &.circular
        border-radius: var(--radius-button)
</style>
