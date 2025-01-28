import { type DurationInSeconds, SplashState } from '@/code/animation/animation.common'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { executeAfterDelay } from '@/code/animation/animation.main.ts'

export const useSplash = defineStore('splash', () => {
  const stateRef = ref<SplashState>(SplashState.IDLE)
  const locksRef = ref<number>(0)
  const isVisibleRef = ref<boolean>(true)
  const durationRef = ref<number>(0.5)

  const state = computed(() => stateRef.value)
  const isVisible = computed(() => isVisibleRef.value)
  const duration = computed((): DurationInSeconds => `${durationRef.value}s`)

  const lock = () => (locksRef.value += 1)

  const unlock = () => {
    if (locksRef.value > 0) locksRef.value -= 1
  }

  const idle = () => {
    stateRef.value = SplashState.IDLE
    isVisibleRef.value = true
  }

  const hide = () => {
    stateRef.value = SplashState.HIDDEN
    isVisibleRef.value = false
  }

  const fadeIn = (executeAfter?: () => void) => {
    if (locksRef.value !== 0) return
    const exec = () => {
      idle()
      if (executeAfter) executeAfter()
    }
    stateRef.value = SplashState.IN
    isVisibleRef.value = true
    executeAfterDelay(exec, duration.value).then()
  }

  const fadeOut = (executeAfter?: () => void) => {
    if (locksRef.value) return
    const exec = () => {
      hide()
      if (executeAfter) executeAfter()
    }
    stateRef.value = SplashState.OUT
    executeAfterDelay(exec, duration.value).then()
  }

  return {
    state,
    isVisible,
    duration,
    lock,
    unlock,
    fadeIn,
    fadeOut,
  }
})
