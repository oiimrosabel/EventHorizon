import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const DEFAULT_MESSAGE = 'Une erreur inconnue est survenue.'

export const useError = defineStore('error', () => {
  const messageRef = ref<string>(DEFAULT_MESSAGE)

  const message = computed(() => messageRef.value)

  const setMessage = (message: string) => (messageRef.value = message)

  return {
    message,
    setMessage,
  }
})
