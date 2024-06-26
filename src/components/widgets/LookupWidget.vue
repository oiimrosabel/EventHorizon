<script lang="ts" setup>
import { ref } from 'vue'
import RoundButton from '@/components/buttons/RoundButton.vue'

const calId = ref('')

const goToCal = () => {
  const a = document.createElement('a')
  a.href = `${window.location.origin}/${calId.value}`
  a.click()
}
</script>

<template>
  <div class="LookupWidget">
    <input
      v-model="calId"
      placeholder="ID de l'emploi du temps"
      type="text"
      @keydown.enter="goToCal()"
    />
    <RoundButton @click="goToCal()">
      <img alt="Go" src="/icons/forward.png" />
    </RoundButton>
  </div>
</template>

<style lang="sass">
.LookupWidget
  display: flex
  flex-direction: row
  justify-content: stretch
  align-items: stretch
  gap: 8px

  > input
    flex: 1 1
    background: var(--widget)
    border: none
    border-radius: var(--radius-inf)
    padding: 16px 24px
    outline: none
    text-align: center
    color: var(--text)
    transition: var(--trans)
    min-width: 0

    &:hover
      background: var(--hover)

    &::placeholder
      color: var(--text)
</style>
