<script lang="ts" setup>
import { ref } from 'vue'
import TextButton from '@/components/buttons/TextButton.vue'
import { linksService } from '@/assets/code/links/links.service'

const calId = ref('')

const goToCal = () => {
  linksService.changeLocation(`${window.location.origin}/${calId.value}`)
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
    <TextButton @click="goToCal()">
      <img alt="Search" src="/icons/search.png" />
    </TextButton>
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
