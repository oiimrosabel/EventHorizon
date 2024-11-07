<script setup lang="ts">
const $messenger = useMessenger();

const messageDuration = $messenger.duration;
const messageBefore = computed(() => `"${$messenger.before} "`);
</script>

<template>
  <div v-if="$messenger.messages.length !== 0" class="TemporaryMessage">
    <p v-for="(e, i) in $messenger.messages" :key="i">{{ e }}</p>
  </div>
</template>

<style lang="sass">
.TemporaryMessage
  display: flex
  flex-direction: column
  justify-content: stretch
  align-items: stretch
  position: sticky

  @media (min-width: 801px)
    gap: 4px
    bottom: 0

  @media (max-width: 800px)
    gap: 8px
    bottom: 16px

  > p
    padding: 10px 20px
    border-radius: var(--radius-button)
    background: color-mix(in srgb, var(--main) 15%, var(--background))
    animation: MessageAnimation ease-in-out v-bind(messageDuration)
    font-weight: 600

    &::before
      content: v-bind(messageBefore)
</style>
