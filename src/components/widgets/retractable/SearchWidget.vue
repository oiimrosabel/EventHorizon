<script lang="ts" setup>
import TextButton from '@/components/buttons/TextButton.vue'
import RetractableWidget from '@/components/containers/RetractableWidget.vue'
import { useMessenger } from '@/stores/useMessenger.ts'
import { useRoute, useRouter } from 'vue-router'
import { useSplash } from '@/stores/useSplash.ts'
import { ref, useTemplateRef } from 'vue'
import { formatSearchInput } from '@/code/format/format.main.ts'
import { triggerCssAnimation } from '@/code/animation/animation.main.ts'

defineProps({
  isIndex: {
    type: Boolean,
    default: false,
  },
})

const ERROR_CLASS = 'error'
const ERROR_ANIM_DURATION = '0.33s'

const $messenger = useMessenger()
const $route = useRoute()
const $router = useRouter()
const $splash = useSplash()

const calId = ($route.params['cal'] as string) ?? ''

const userInput = ref<string>('')
const inputRef = useTemplateRef<HTMLInputElement>('inputRef')

const goToCalendar = () => {
  const res: string | undefined = formatSearchInput(userInput.value)
  if (res && res !== calId) {
    $splash.fadeIn(() => $router.push(`/${res}`))
  } else {
    $messenger.setMessage(res === calId ? 'EDT déjà sélectionné.' : 'ID incorrect.', '❌')
    triggerCssAnimation([inputRef.value], ERROR_CLASS, ERROR_ANIM_DURATION, () => {
      return
    })
  }
}
</script>

<template>
  <RetractableWidget
    :force-open="isIndex"
    tag="search"
    title="Recherche"
    image="/images/switch.svg"
  >
    <div class="SearchWidget">
      <div class="inputField">
        <input
          ref="inputRef"
          v-model="userInput"
          :class="{ attention: isIndex }"
          placeholder="ID ou URL de l'EDT"
          type="text"
          @keydown.enter="goToCalendar()"
        />
        <TextButton title="Rechercher" @click="goToCalendar()">
          <img alt="Search" src="/icons/search.svg" />
        </TextButton>
      </div>
    </div>
  </RetractableWidget>
</template>

<style lang="sass">
.SearchWidget
  display: flex
  flex-direction: column
  justify-content: stretch
  align-items: stretch
  gap: 16px

  .inputField > input
    &.attention
      animation: InputAttention ease-in-out 1.25s infinite alternate

      &:hover, &active, &:focus
        animation: none

    &.error
      animation: InputError v-bind(ERROR_ANIM_DURATION)
</style>
