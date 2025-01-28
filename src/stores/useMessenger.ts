import type { DurationInSeconds } from '@/code/animation/animation.common'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { executeAfterDelay } from '@/code/animation/animation.main.ts'
import type { TemporaryMessageContent } from '@/code/message/message.commons.ts'

const DEFAULT_WAIT_TIME: DurationInSeconds = '2s'

export const useMessenger = defineStore('messenger', () => {
  const countRef = ref<number>(0)

  const messageRef = ref<TemporaryMessageContent[]>([])

  const duration = DEFAULT_WAIT_TIME

  const messages = computed(() => messageRef.value)

  const count = computed(() => countRef.value)

  const setMessage = (message: string, before = '✅') => {
    messageRef.value.push({
      order: countRef.value,
      content: message,
      before: before,
    })
    countRef.value += 1
    executeAfterDelay(() => {
      if (messageRef.value.length > 0) messageRef.value.shift()
    }, DEFAULT_WAIT_TIME).then()
  }

  return { messages, duration, count, setMessage }
})
